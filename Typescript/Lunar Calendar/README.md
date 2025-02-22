# README

## File: tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "es2015",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "sourceMap": true,
    "declaration": true,
    "declarationDir": "./dist/types"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## File: package.json

```json
{
  "name": "lunar-calendar",
  "version": "1.0.0",
  "description": "A TypeScript implementation of a lunar calendar",
  "main": "dist/index.js",
  "types": "dist/types/index.d.ts",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "start": "serve"
  },
  "keywords": [
    "lunar",
    "calendar",
    "moon",
    "phases",
    "typescript"
  ],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "serve": "^14.2.0",
    "typescript": "^5.0.4"
  }
}
```

## File: src/index.ts

```typescript
import LunarCalendar from './lunar-calendar';

document.addEventListener('DOMContentLoaded', () => {
  new LunarCalendar('lunar-calendar');
});

export default LunarCalendar;
```

## File: build-steps.md
### Building and Using the Lunar Calendar TypeScript Project

### Project Structure
```
lunar-calendar/
├── src/
│   ├── lunar-calendar.ts    # Main calendar implementation
│   ├── index.ts             # Entry point
│   └── styles.css           # Styles (optional, can be included in HTML)
├── dist/                    # Compiled output (generated)
├── public/
│   └── index.html           # HTML file to display the calendar
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project configuration
```

### Setting Up the Project

1. **Create the project structure:**
   ```bash
   mkdir -p lunar-calendar/src lunar-calendar/public
   cd lunar-calendar
   ```

2. **Initialize the project:**
   ```bash
   npm init -y
   ```

3. **Install dependencies:**
   ```bash
   npm install --save-dev typescript serve
   ```

4. **Copy the files:**
   - `lunar-calendar.ts` into `src/`
   - `index.ts` into `src/`
   - `styles.css` into `src/` (optional)
   - `index.html` into `public/`
   - `tsconfig.json` into the project root
   - Update `package.json` with the provided content

### Building the Project

1. **Compile the TypeScript code:**
   ```bash
   npm run build
   ```

2. **Start a development server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000` to see the calendar.

## Using as a Module

If you want to use this as a module in another project:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Import in your project:**
   ```javascript
   import LunarCalendar from 'lunar-calendar';
   
   // Initialize with the ID of your container element
   new LunarCalendar('calendar-container');
   ```

### Customization

#### Custom Styling

You can customize the styles by:
1. Modifying `src/styles.css`
2. Including a custom stylesheet in your HTML and overriding the default styles

#### API Options

The `LunarCalendar` class provides the following methods:

- `constructor(elementId: string)` - Initializes the calendar in the specified container
- `refresh()` - Manually refreshes the calendar
- `generateCalendar(year: number)` - Generates the calendar for a specific year

## How to Transpile TypeScript into JavaScript

To convert (transpile) TypeScript code into JavaScript, you'll need to follow these steps:

## Method 1: Using the TypeScript Compiler (tsc)

### Step 1: Install TypeScript
First, install TypeScript globally or in your project:

```bash
# Global installation
npm install -g typescript

# Project installation
npm install --save-dev typescript
```

### Step 2: Create a TypeScript Configuration File
Create a `tsconfig.json` file in your project root:

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 3: Transpile Your Code
Run the TypeScript compiler:

```bash
# If installed globally
tsc

# If installed locally in your project
npx tsc
```

Your transpiled JavaScript files will be placed in the `dist` directory (or whatever you specified in `outDir`).

## Method 2: Using Build Tools

### Option A: Webpack with ts-loader

1. Install required packages:
```bash
npm install --save-dev webpack webpack-cli typescript ts-loader
```

2. Configure webpack (`webpack.config.js`):
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

3. Run webpack:
```bash
npx webpack
```

### Option B: Using Babel

1. Install required packages:
```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-typescript @babel/preset-env
```

2. Create a Babel configuration file (`.babelrc`):
```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ]
}
```

3. Run Babel:
```bash
npx babel src --out-dir dist --extensions ".ts,.tsx"
```

## Method 3: Online Transpilers

For quick testing, you can use online transpilers:

1. [TypeScript Playground](https://www.typescriptlang.org/play/)
2. [Babel REPL](https://babeljs.io/repl)

## Method 4: Integrated Development Environment (IDE)

Many IDEs like VS Code, WebStorm, or Visual Studio can automatically transpile TypeScript to JavaScript when you save your files.

In VS Code:
1. Open your project
2. Press `Ctrl+Shift+B` (or `Cmd+Shift+B` on macOS)
3. Select "tsc: watch - tsconfig.json" to automatically transpile on save

## Continuous Development Workflow

For ongoing development, set up a watch process:

```bash
# Using tsc watch mode
tsc --watch

# Or add a script in package.json
# "scripts": { "watch": "tsc --watch" }
# Then run:
npm run watch
```

This will automatically transpile your TypeScript files whenever you make changes.

## Power by Claude AI
