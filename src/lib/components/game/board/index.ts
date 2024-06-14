import Board from './board.svelte';
import type { Readable } from 'svelte/store';

export interface BoardContext {
    boardSize: {
        x: Readable<number>
        y: Readable<number>
    },
    gridSize: {
        cellX: Readable<number>
        cellY: Readable<number>
    }
}

export { Board };
