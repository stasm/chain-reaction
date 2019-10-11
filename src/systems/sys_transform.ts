import {Get} from "../components/com_index.js";
import {Transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {
    create,
    from_rotation,
    from_scaling,
    from_translation,
    invert,
    multiply,
} from "../math/mat2d.js";

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

        // TODO Optimize this.
        let translation = from_translation(create(), transform.Translation);
        let rotation = from_rotation(create(), transform.Rotation);
        let scale = from_scaling(create(), transform.Scale);

        multiply(transform.World, translation, rotation);
        multiply(transform.World, transform.World, scale);

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
