import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface Grow {
    Speed: number;
}

export function grow(Speed: number) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.Grow;
        game[Get.Grow][entity] = <Grow>{
            Speed,
        };
    };
}
