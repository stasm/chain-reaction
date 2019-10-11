import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {Get} from "./com_index.js";

export interface Move {
    /** Units per second. */
    readonly Speed: number;
    Directions: Array<Vec2>;
}

export function move(Speed: number = 3.5) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= 1 << Get.Move;
        game[Get.Move][entity] = <Move>{
            Speed,
            Directions: [],
        };
    };
}
