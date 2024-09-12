import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkCodeTitles from "remark-flexible-code-titles";
import "highlight.js/styles/default.css";
import "../../markdown.css";

interface MarkdownProperties {
  title?: string;
  date?: Date;
  cites?: Cite[];
contributors?: string;
}

interface Cite {
    title: string;
    url: string;

}

const MarkdownWrapper: React.FC<{
  file: string;
  properties?: MarkdownProperties;
}> = ({ file, properties }) => (
    <div>
      <ReactMarkdown
      className="markdown"
        rehypePlugins={[[rehypeKatex, { output: "mathml" }], [rehypeHighlight, {clipboard: true}]]}
        remarkPlugins={[remarkGfm, remarkMath, remarkCodeTitles]}
        // eslint-disable-next-line react/no-children-prop
        children={file}
      />
      <div>
        {properties?.title && <h1>{properties.title}</h1>}
        {properties?.date && <p>{properties.date.toDateString()}</p>}
      </div>
    </div>
);

export default MarkdownWrapper;
