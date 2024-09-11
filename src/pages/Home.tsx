import React, { Suspense } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from 'rehype-highlight'
import remarkCodeTitles from "remark-flexible-code-titles";
import "./markdown.css";
import 'highlight.js/styles/default.css';
import rehypeKatex from 'rehype-katex'
import markdown from "../models/mark.md";
import { WatermarkSkeleton } from "../components/static/Watermark";

function Home() {
  return <TestHome />;
}


function TestHome() {
  const Watermark = React.lazy(() => import("../components/static/Watermark"));

  return (
    <SkeletonTheme baseColor="#d9d9d9">
      <Suspense fallback={<WatermarkSkeleton />}>
        <Watermark />
      </Suspense>
      <div className="markdown">
        <ReactMarkdown rehypePlugins={[[rehypeKatex, {output: "mathml"}], rehypeHighlight]} remarkPlugins={[remarkGfm, remarkMath, remarkCodeTitles]} children={markdown} />
      </div>
    </SkeletonTheme>
  );
}

export default Home;
