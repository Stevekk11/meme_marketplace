export type MemeCategory = 'animals' | 'celebrities' | 'gaming' | 'school' | 'random';

export interface Meme {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    boxCount: number;
    rating: 1 | 2 | 3 | 4 | 5;
    category: MemeCategory;
}
