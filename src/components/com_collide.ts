import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {Get, Has} from "./com_index.js";

export interface Collide {
    readonly EntityId: Entity;
    Collisions: Array<Collide>;
    Center: Vec2;
    Radius: number;
}

export function collide(Radius: number) {
    return (game: Game, EntityId: Entity) => {
        game.World[EntityId] |= Has.Collide;
        game[Get.Collide][EntityId] = <Collide>{
            EntityId,
            Collisions: [],
            Center: [0, 0],
            Radius,
        };
    };
}
