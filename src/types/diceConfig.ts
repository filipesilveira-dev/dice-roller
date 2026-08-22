import type { DiceFaces } from "./dice";

export interface DiceConfig{
    id: string;
    // quantidade de faces do dado
    faces: DiceFaces;
    // valor sorteado que será utilizado no estado global
    value: number | null;
}