import {Entity, Game} from "../game";
import {Vec2} from "../math";

type Mixin = (game: Game, entity: Entity) => void;

export interface Blueprint {
    Translation?: Vec2;
    Rotation?: number;
    Scale?: Vec2;
    Using?: Array<Mixin>;
    Children?: Array<Blueprint>;
}
