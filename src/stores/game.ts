import { derived, type Readable, writable } from 'svelte/store';
import type { Card } from 'scryfall-sdk';
import _ from 'lodash';

type UUID = string;

export interface BoardCard {
    id: string;
    tapped: boolean;
    info: Card;
}

export interface PlayerState {
    id: string;
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

export const currentPlayer: Readable<PlayerState | undefined> = derived(
    gameState,
    $s => $s.players.get($s.currentPlayer)
);

export const otherPlayers: Readable<PlayerState[]> = derived(
    gameState,
    $s => [...$s.players.values()].filter(player => player.id != $s.currentPlayer)
)

export const setCurrentPlayer = (currentPlayer: UUID) => {
    gameState.update((state) => ({ ...state, currentPlayer }));
};

export const addPlayer = (player: PlayerState) => {
    gameState.update((state) => {
        state.players.set(player.id, player);

        return state;
    });
};

export const addCurrentPlayer = (player: PlayerState) => {
    addPlayer(player);
    setCurrentPlayer(player.id);
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