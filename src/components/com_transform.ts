import {Entity, Game} from "../game.js";
import {Mat2D, Vec2} from "../math/index.js";
import {create} from "../math/mat2d.js";
import {Get} from "./com_index.js";

export interface Transform {
    readonly EntityId: Entity;
    World: Mat2D;
    Translation: Vec2;
    Dirty: boolean;
}

export function transform(Translation: Vec2 = [0, 0]) {
    return (game: Game, EntityId: Entity) => {
        game.World[EntityId] |= Get.Transform;
        game[Get.Transform][EntityId] = <Transform>{
            EntityId,
            World: create(),
            Translation,
            Dirty: true,
        };
    };
}
