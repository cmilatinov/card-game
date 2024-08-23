import { derived, writable } from 'svelte/store';

export enum CardType {
    SPELL,
    CREATURE,
    TOKEN
}

export interface Card {
    id: string;
    name: string;
    img: string;
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
    [key: number]: T
}

export interface PlayerState {
    hp: number;
    hand: GameCard[];
    board: Placed<GameCard>;
}

export interface GameState {
    currentPlayer: string,
    players: Record<string, PlayerState>;
}

export const gameState = writable<GameState>({
    currentPlayer: '1',
    players: {
        '1': {
            hp: 0,
            hand: [
                {
                    id: '1',
                    type: CardType.TOKEN,
                    img: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409741&type=card',
                    name: 'BING BONG',
                    type_line: 'Artifact Bing Bong',
                    text: 'Bing Bong Card',
                    tapped: false,
                },
                {
                    id: '2',
                    type: CardType.TOKEN,
                    img: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409741&type=card',
                    name: 'BING BONG',
                    type_line: 'Artifact Bing Bong',
                    text: 'Bing Bong Card',
                    tapped: false,
                },
            ],
            board: {
                4: {
                    id: '3',
                    type: CardType.TOKEN,
                    img: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409741&type=card',
                    name: 'BING BONG',
                    type_line: 'Artifact Bing Bong',
                    text: 'Bing Bong Card',
                    tapped: false,
                }
            }
        }
    },
});

export const currentPlayer = derived(gameState, $s => $s.players[$s.currentPlayer])