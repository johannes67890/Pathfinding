// src/custom.d.ts
declare module "*.svg" {
  const content: any;
  export default content;
}

export interface MarkdownType {
  path: string;
  frontmatter?: {
    title: string;
    date: string;
  };
}
declare module "*.md" {
  const content: MarkdownType;
  export default content;
}