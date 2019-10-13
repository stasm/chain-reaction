import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {Get, Has} from "./com_index.js";

export interface Collide {
    readonly EntityId: Entity;
    Kind: CollideKind;
    Collision: boolean;
    Center: Vec2;
    Radius: number;
}

export const enum CollideKind {
    Ball,
    Explosion,
}

export function collide(Radius: number, Kind: CollideKind) {
    return (game: Game, EntityId: Entity) => {
        game.World[EntityId] |= Has.Collide;
        game[Get.Collide][EntityId] = <Collide>{
            EntityId,
            Kind,
            Collision: false,
            Center: [0, 0],
            Radius,
        };
    };
}
