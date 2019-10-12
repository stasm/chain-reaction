import {Get} from "../components/com_index.js";
import {Transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {from_translation} from "../math/mat2d.js";

const QUERY = Get.Transform;

export function sys_transform(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game[Get.Transform][i]);
        }
    }
}

function update(transform: Transform) {
    if (transform.Dirty) {
        transform.Dirty = false;
        from_translation(transform.World, transform.Translation);
    }
}
