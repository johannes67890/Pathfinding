import React from "react";
import { HeaderGrid } from "src/components/static/Headers";
import GridContexts from "src/components/tools/grid/context/GridContexts";
import Grid from "src/components/tools/grid/Grid";

function GridTool() {
  <GridContexts>
    <HeaderGrid />
    <Grid />
  </GridContexts>;
}

export default GridTool;
