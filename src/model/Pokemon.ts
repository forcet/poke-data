import { Ability } from "./Ability.js";
import { Types } from "./Types.js";
import { Weakness } from "./Weakness.js";

export interface Pokemon {
    code: number;
    name: string;
    height: number;   
    weight: number;
    abilities: Ability[];
    category: string,
    description: string,
    image: string,
    imageShiny: string,
    types: Types[],
    weakness: Weakness[]
}