import React, { Suspense } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingCircle, {
  LoadingComponent,
} from "src/components/static/LoadingScreen";
import { WatermarkSkeleton } from "../components/static/Watermark";

const Home = () => {

  return (
    <>
      <TestHome />
    </>
  );
};



const TestHome = () => {
  const Watermark = React.lazy(() => import("../components/static/Watermark"));

  return (
    <>
      <SkeletonTheme baseColor="#d9d9d9">
          <Suspense fallback={<WatermarkSkeleton />}>
            <Watermark />
          </Suspense>
      </SkeletonTheme>
    </>
  );
}


export default Home;
