import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {Get} from "./com_index.js";

export interface Move {
    Direction: Vec2;
    /** Units per second. */
    Speed: number;
}

export function move(angle: number, Speed: number) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Get.Move;
        game[Get.Move][entity] = <Move>{
            Direction: <Vec2>[Math.cos(angle), Math.sin(angle)],
            Speed,
        };
    };
}
