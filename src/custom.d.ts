// src/custom.d.ts
// To import SVG files, you need to declare a module in a custom.d.ts file in the src/utils directory.
declare module "*.svg" {
    const content: any;
    export default content;
}