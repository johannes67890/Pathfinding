import React from "react";
import { CellProps } from "../components/Cell";

export function Astar(
  closestCell: CellProps,
  finishCell: CellProps,
  unvisitedNodes: CellProps[],
  visitedCellsInOrder: CellProps[]
) {
  const gCost = closestCell.cost.gCost + manhattan(closestCell, finishCell);
  const hCost = manhattan(closestCell, finishCell);

  let isBestCost = false;

  if (
    !unvisitedNodes.find(
      (unvisitedcell) =>
        unvisitedcell.col === closestCell.col &&
        unvisitedcell.row === closestCell.row
    )
  ) {
    isBestCost = true;
    closestCell.cost.hCost = manhattan(closestCell, finishCell);
    closestCell.isVisited = true;
    return visitedCellsInOrder.push(closestCell);
  } else if (gCost < closestCell.cost.gCost) {
    isBestCost = true;
  }

  if (isBestCost) {
    closestCell.cost.gCost = gCost;
    closestCell.cost.hCost = hCost;
    closestCell.cost.fCost = gCost + hCost;
    closestCell.isVisited = true;
  }
  //console.log(gCost);
}

function manhattan(CurrCell: CellProps, finishCell: CellProps) {
  const h =
    Math.abs(CurrCell.row - finishCell.row) +
    Math.abs(CurrCell.col - finishCell.col);
  return h;
}
