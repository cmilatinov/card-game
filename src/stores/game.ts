import { derived, type Readable, writable } from 'svelte/store';
import type { Card } from 'scryfall-sdk';
import { string } from 'zod';

type UUID = string;

export interface BoardCard {
    id: string;
    tapped: boolean;
    info: Card;
}

export interface PlayerState {
    hp: number;
    hand: Card[];
    board: Map<number, BoardCard>;
}

export interface GameState {
    currentPlayer: UUID,
    players: Map<UUID, PlayerState>;
}

export const gameState = writable<GameState>({
    currentPlayer: '',
    players: new Map<UUID, PlayerState>()
});

export interface Player {
    id: string;
    state: PlayerState;
}

export const currentPlayer: Readable<Player | undefined> = derived(gameState, $s => {
    const player = $s.players.get($s.currentPlayer);
    if (!player) {
        return;
    }

    return { id: $s.currentPlayer, state: player };
});

export const otherPlayers: Readable<Player[]> = derived(gameState, $s => {
    const players: Player[] = [];

    for (const [id, state] of $s.players.entries()) {
        if ($s.currentPlayer !== id) {
            players.push({ id, state });
        }
    }

    return players;
});

export const setCurrentPlayer = (currentPlayer: UUID) => {
    gameState.update((state) => ({ ...state, currentPlayer }));
};

export const addPlayer = (id: UUID, player: PlayerState = { hp: 100, board: new Map<number, BoardCard>, hand: [] }) => {
    gameState.update((state) => {
        state.players.set(id, player);

        return state;
    });
};

export const addCurrentPlayer = (id: UUID, player: PlayerState = {
    hp: 100,
    board: new Map<number, BoardCard>,
    hand: []
}) => {
    addPlayer(id, player);
    setCurrentPlayer(id);
};

export const setCardOnBoard = (playerId: UUID, boardIdx: number, card: BoardCard) => {
    gameState.update((state) => {
        const player = state.players.get(playerId);
        if (player) {
            player.board.set(boardIdx, card);
        }

        return state;
    });
};

export const addCardToHand = (playerId: UUID, card: Card) => {
    gameState.update((state) => {
        const player = state.players.get(playerId);
        if (player) {
            player.hand.push(card);
            state.players.set(playerId, player);
        }

        return state;
    });
};