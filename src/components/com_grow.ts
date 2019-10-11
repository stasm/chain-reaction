import {Entity, Game} from "../game.js";
import {Get} from "./com_index.js";

export interface Grow {
    Speed: number;
}

export function grow(Speed: number) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Get.Grow;
        game[Get.Grow][entity] = <Grow>{
            Speed,
        };
    };
}
