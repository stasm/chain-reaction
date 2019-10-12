import {Entity, Game} from "../game.js";
import {Get} from "./com_index.js";

export interface ControlBall {}

export function control_ball() {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Get.ControlBall;
        game[Get.ControlBall][entity] = <ControlBall>{};
    };
}
