import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface Render {
    EntityId: Entity;
    Radius: number;
    Color: string;
    Alpha: number;
}

export function render_circle(Radius: number, Color: string) {
    return (game: Game, EntityId: Entity) => {
        game.World[EntityId] |= Has.Render;
        game[Get.Render][EntityId] = <Render>{
            EntityId,
            Radius,
            Color,
        };
    };
}
