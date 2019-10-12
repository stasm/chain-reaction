import {Get} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Get.Transform | Get.Grow | Get.Render;

export function sys_grow(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let grow = game[Get.Grow][entity];
    let transform = game[Get.Transform][entity];
    transform.Scale[0] += grow.Speed * delta;
    transform.Scale[1] += grow.Speed * delta;
    transform.Dirty = true;
}
