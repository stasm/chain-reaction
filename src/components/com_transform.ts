import {Entity, Game} from "../game.js";
import {Mat2D, Rad, Vec2} from "../math/index.js";
import {create} from "../math/mat2d.js";
import {Get} from "./com_index.js";

export interface Transform {
    /** Absolute matrix relative to the world. */
    World: Mat2D;
    /** World to self matrix. */
    Self: Mat2D;
    /** Local translation relative to the parent. */
    Translation: Vec2;
    /** Local rotation relative to the parent. */
    Rotation: Rad;
    /** Local scale relative to the parent. */
    Scale: Vec2;
    /** This Transform's entity id. */
    readonly EntityId: Entity;
    Parent?: Transform;
    Children: Array<Transform>;
    Dirty: boolean;
}

export function transform(Translation: Vec2 = [0, 0], Rotation: Rad = 0, Scale: Vec2 = [1, 1]) {
    return (game: Game, EntityId: Entity) => {
        game.World[EntityId] |= Get.Transform;
        game[Get.Transform][EntityId] = <Transform>{
            EntityId,
            World: create(),
            Self: create(),
            Translation,
            Rotation,
            Scale,
            Children: [],
            Dirty: true,
        };
    };
}

/**
 * Get all component instances of a given type from the current entity and all
 * its children.
 *
 * @param game Game object which stores the component data.
 * @param transform The transform to traverse.
 * @param mask Component mask to look for.
 */
export function* components_of_type<T>(
    game: Game,
    transform: Transform,
    mask: Get
): IterableIterator<T> {
    if (game.World[transform.EntityId] & mask) {
        yield (game[mask][transform.EntityId] as unknown) as T;
    }
    for (let child of transform.Children) {
        yield* components_of_type<T>(game, child, mask);
    }
}
