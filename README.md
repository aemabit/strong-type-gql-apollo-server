### STRONG TYPE NODE | GRAPHQL | MONGOOSE

### INIT

- `npm i typescript type-graphql graphql reflect-metadata`
- `npm i --save-dev @types/node`
- `npm i @typegoose/typegoose mongoose connect-mongo`
- `npm i --save-dev @types/mongoose`
- `npm i express jsonwebtoken`
- `npm i -D @types/jsonwebtoken`
- `npm i --save-dev @types/express`
- `npx tsc --init`

##### SAMPLE `tsconfig.json`

```
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "lib": ["dom", "es6", "es2017", "esnext.asynciterable"],
    "sourceMap": true,
    "outDir": "./dist",
    "moduleResolution": "node",
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "resolveJsonModule": true,
    "baseUrl": "."
  },
  "exclude": ["node_modules", "./generated"],
  "include": ["./**/*.ts"]
}
```

#### Custom Script (package.json)

```
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
```

### RUN COMMAND

- `npx graphql-let`
- `npm run dev`

#### SAMPLE CONSOLE

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
We detected TypeScript in your project and created a tsconfig.json file for you.

event - compiled successfully

```

#### SAMPLE `tsconfig.json`

```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": "."
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```
