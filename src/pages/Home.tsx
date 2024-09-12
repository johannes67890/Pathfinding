import React, { Suspense } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MarkdownWrapper from "src/components/static/MarkdownWrapper";
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
    </SkeletonTheme>
  );
}

export default Home;
