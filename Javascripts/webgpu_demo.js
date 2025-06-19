<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebGPU Triangle Example</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #1a1a1a;
            color: #fff;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        canvas {
            border: 2px solid #333;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .info {
            margin-bottom: 20px;
            text-align: center;
        }
        .error {
            color: #ff6b6b;
            padding: 20px;
            border: 1px solid #ff6b6b;
            border-radius: 4px;
            margin: 20px;
        }
    </style>
</head>
<body>
    <div class="info">
        <h1>WebGPU Triangle Demo</h1>
        <p>An animated, colorful triangle rendered with WebGPU</p>
    </div>
    
    <canvas id="canvas" width="800" height="600"></canvas>
    
    <script>
        async function main() {
            // Check WebGPU support
            if (!navigator.gpu) {
                document.body.innerHTML = '<div class="error">WebGPU is not supported in this browser. Try Chrome Canary with --enable-unsafe-webgpu flag.</div>';
                return;
            }

            // Get canvas and context
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('webgpu');

            if (!context) {
                document.body.innerHTML = '<div class="error">Failed to get WebGPU context.</div>';
                return;
            }

            // Request adapter and device
            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) {
                document.body.innerHTML = '<div class="error">Failed to get WebGPU adapter.</div>';
                return;
            }

            const device = await adapter.requestDevice();

            // Configure the canvas
            const format = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
                device: device,
                format: format,
            });

            // Vertex shader source
            const vertexShaderSource = `
                struct VertexOutput {
                    @builtin(position) position: vec4<f32>,
                    @location(0) color: vec3<f32>,
                }

                struct Uniforms {
                    time: f32,
                }

                @group(0) @binding(0) var<uniform> uniforms: Uniforms;

                @vertex
                fn main(@location(0) position: vec2<f32>, @location(1) color: vec3<f32>) -> VertexOutput {
                    var output: VertexOutput;
                    
                    // Rotate the triangle based on time
                    let angle = uniforms.time;
                    let cos_a = cos(angle);
                    let sin_a = sin(angle);
                    
                    let rotated_x = position.x * cos_a - position.y * sin_a;
                    let rotated_y = position.x * sin_a + position.y * cos_a;
                    
                    output.position = vec4<f32>(rotated_x, rotated_y, 0.0, 1.0);
                    output.color = color;
                    
                    return output;
                }
            `;

            // Fragment shader source
            const fragmentShaderSource = `
                @fragment
                fn main(@location(0) color: vec3<f32>) -> @location(0) vec4<f32> {
                    return vec4<f32>(color, 1.0);
                }
            `;

            // Create shaders
            const vertexShader = device.createShaderModule({
                code: vertexShaderSource,
            });

            const fragmentShader = device.createShaderModule({
                code: fragmentShaderSource,
            });

            // Vertex data (position and color)
            const vertices = new Float32Array([
                // Position (x, y)    Color (r, g, b)
                 0.0,  0.5,          1.0, 0.0, 0.0,  // Top vertex - red
                -0.5, -0.5,          0.0, 1.0, 0.0,  // Bottom left - green
                 0.5, -0.5,          0.0, 0.0, 1.0,  // Bottom right - blue
            ]);

            // Create vertex buffer
            const vertexBuffer = device.createBuffer({
                size: vertices.byteLength,
                usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            });

            device.queue.writeBuffer(vertexBuffer, 0, vertices);

            // Create uniform buffer for time
            const uniformBuffer = device.createBuffer({
                size: 4, // float32
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });

            // Create bind group layout
            const bindGroupLayout = device.createBindGroupLayout({
                entries: [{
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: 'uniform',
                    },
                }],
            });

            // Create bind group
            const bindGroup = device.createBindGroup({
                layout: bindGroupLayout,
                entries: [{
                    binding: 0,
                    resource: {
                        buffer: uniformBuffer,
                    },
                }],
            });

            // Create render pipeline
            const renderPipeline = device.createRenderPipeline({
                layout: device.createPipelineLayout({
                    bindGroupLayouts: [bindGroupLayout],
                }),
                vertex: {
                    module: vertexShader,
                    entryPoint: 'main',
                    buffers: [{
                        arrayStride: 5 * 4, // 5 floats * 4 bytes each
                        attributes: [
                            {
                                shaderLocation: 0, // position
                                offset: 0,
                                format: 'float32x2',
                            },
                            {
                                shaderLocation: 1, // color
                                offset: 2 * 4,
                                format: 'float32x3',
                            },
                        ],
                    }],
                },
                fragment: {
                    module: fragmentShader,
                    entryPoint: 'main',
                    targets: [{
                        format: format,
                    }],
                },
                primitive: {
                    topology: 'triangle-list',
                },
            });

            // Animation loop
            let startTime = Date.now();
            
            function render() {
                const currentTime = (Date.now() - startTime) / 1000;
                
                // Update uniform buffer with current time
                const timeData = new Float32Array([currentTime]);
                device.queue.writeBuffer(uniformBuffer, 0, timeData);

                // Create command encoder
                const commandEncoder = device.createCommandEncoder();
                
                // Begin render pass
                const textureView = context.getCurrentTexture().createView();
                const renderPass = commandEncoder.beginRenderPass({
                    colorAttachments: [{
                        view: textureView,
                        clearValue: { r: 0.1, g: 0.1, b: 0.1, a: 1.0 },
                        loadOp: 'clear',
                        storeOp: 'store',
                    }],
                });

                // Set pipeline and draw
                renderPass.setPipeline(renderPipeline);
                renderPass.setBindGroup(0, bindGroup);
                renderPass.setVertexBuffer(0, vertexBuffer);
                renderPass.draw(3); // 3 vertices for triangle
                renderPass.end();

                // Submit commands
                device.queue.submit([commandEncoder.finish()]);
                
                requestAnimationFrame(render);
            }

            // Start rendering
            render();
        }

        // Initialize when page loads
        main().catch(console.error);
    </script>
</body>
</html>
