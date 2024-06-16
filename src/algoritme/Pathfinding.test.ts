import {describe, expect, test, beforeEach} from '@jest/globals';
import Digraph  from './structures/Digraph';
import DirectedEdge from './structures/DirectedEdge';
import { CellProps } from '../components/Cell';
import Pathfinding from './Pathfinding';

let G: Digraph;
let Dijkstra: Pathfinding;
let cells: CellProps[] = [
    {id: 0 ,row: 0, col: 0, weight: 1},
    {id: 1 ,row: 0, col: 1, weight: 1},
    {id: 2 ,row: 0, col: 2, weight: 1},
    {id: 3 ,row: 1, col: 0, weight: 1},
    {id: 4 ,row: 1, col: 1, weight: 1},
    {id: 5 ,row: 1, col: 2, weight: 1},
    {id: 6 ,row: 2, col: 0, weight: 1},
    {id: 7 ,row: 2, col: 1, weight: 1},
    {id: 8 ,row: 2, col: 2, weight: 1},
];
let startCell: CellProps = cells[0];
let finishCell: CellProps = cells[2];


beforeEach(() => {
    G = new Digraph(cells);   
    G.addEdge(new DirectedEdge(cells[0].id, cells[1].id, 1)); 
    G.addEdge(new DirectedEdge(cells[1].id, cells[2].id, 2));
    G.addEdge(new DirectedEdge(cells[1].id, cells[7].id, 3));
    G.addEdge(new DirectedEdge(cells[1].id, cells[4].id, 3));
    G.addEdge(new DirectedEdge(cells[2].id, cells[3].id, 5)); 
    G.addEdge(new DirectedEdge(cells[3].id, cells[4].id, 4));
    G.addEdge(new DirectedEdge(cells[4].id, cells[3].id, 2));
    G.addEdge(new DirectedEdge(cells[6].id, cells[7].id, 1));
    G.addEdge(new DirectedEdge(cells[7].id, cells[4].id, 4)); 


    Dijkstra = new Pathfinding(G, startCell, finishCell);
});

describe('Dijkstra', () => {
    
    test('PathTo', () => {
        let path = Dijkstra.pathTo(finishCell.id);
        let expectedPath = [
            new DirectedEdge(0, 1, 1),
            new DirectedEdge(1, 2, 2)
        ];
        expect(path).toEqual(expectedPath);
    });
    test('PathTo V.2', () => {
        finishCell = cells[3];
        let path = Dijkstra.pathTo(finishCell.id);
        let expectedPath = [
            new DirectedEdge(0, 1, 1),
            new DirectedEdge(1, 4, 3),
            new DirectedEdge(4, 3, 2)
        ];
        expect(path).toEqual(expectedPath);
    });
    test('PathTo misc.', () => {
        expect(() => Dijkstra.pathTo(10)).toThrow("No path to vertex");
        expect(() => Dijkstra.pathTo(6)).toThrow("No path to vertex");
    });

    test('Relax', () => {});
});