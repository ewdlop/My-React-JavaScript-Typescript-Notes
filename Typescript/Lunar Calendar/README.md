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
