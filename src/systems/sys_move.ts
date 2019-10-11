import {Get} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Get.Transform | Get.Move;

export function sys_move(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let transform = game[Get.Transform][entity];
    let move = game[Get.Move][entity];

    transform.Translation[0] += move.Direction[0] * move.Speed * delta;
    transform.Translation[1] += move.Direction[1] * move.Speed * delta;
    transform.Dirty = true;

    if (transform.Translation[0] < 0 || transform.Translation[0] > game.Canvas.width) {
        move.Direction[0] = -move.Direction[0];
    }

    if (transform.Translation[1] < 0 || transform.Translation[1] > game.Canvas.height) {
        move.Direction[1] = -move.Direction[1];
    }
}
