# Microfrontend Project with React, Angular and Vue

This is a microfrontend project combining three technologies: React, Angular and Vue using Webpack Module Federation.

- **`host-app`**: The parent application to manage the child applications `(React 18 + TypeScript)`
- **`react-child`**: A React-based child application `(React 18 + TypeScript)`
- **`vue-child`**: A Vue-based child application `(Vue 3 + TypeScript)`
- **`angular-child`**: An Angular-based child application `(Angular 16 + TypeScript)`.

## Usage

1. Clone this project
2. Run React child application: `cd /react-child` then `yarn install` then `yarn start`
3. Run Angular child application: `cd /angular-child` then `yarn install` then `yarn start`
4. Run Vue child application: `cd /vue-child` then `yarn install` then `yarn start`
5. Run Parent application: `cd /host-app` then `yarn install` then `yarn start`
