import { writable } from 'svelte/store';

export enum CardType {
    SPELL,
    CREATURE,
    TOKEN
}

export interface Card {
    name: string;
    type: CardType;
    type_line: string;
    text: string;
    tapped: boolean;
}

export interface CreatureCard extends Card {
    type: CardType.CREATURE;
    cost: string;
    power: string;
    toughness: string;
}

export interface SpellCard extends Card {
    type: CardType.SPELL;
    cost: string;
}

export interface TokenCard extends Card {
    type: CardType.TOKEN;
}

export type GameCard = CreatureCard | SpellCard | TokenCard;

export interface Placed<T extends Card> {
    card: T,
    position: { x: number, y: number };
}

export interface PlayerState {
    hp: number;
    hand: GameCard[];
    board: Placed<GameCard>[];
}

export interface GameState {
    players: Record<string, PlayerState>;
}

export const gameState = writable<GameState>({
    players: {
        '1': {
            hp: 0,
            hand: [],
            board: []
        },
        '2': {
            hp: 0,
            hand: [],
            board: []
        },
        '3': {
            hp: 0,
            hand: [],
            board: []
        }
    },
});