import {Get} from "../components/com_index.js";
import {Transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {from_translation, invert, multiply, rotate, scale} from "../math/mat2d.js";

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
        set_children_as_dirty(transform);

        from_translation(transform.World, transform.Translation);
        rotate(transform.World, transform.World, transform.Rotation);
        scale(transform.World, transform.World, transform.Scale);

        if (transform.Parent) {
            multiply(transform.World, transform.Parent.World, transform.World);
        }

        invert(transform.Self, transform.World);
    }
}

function set_children_as_dirty(transform: Transform) {
    for (let child of transform.Children) {
        child.Dirty = true;
        set_children_as_dirty(child);
    }
}
