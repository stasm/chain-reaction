import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform | Has.Grow | Has.Render | Has.Collide;

export function sys_grow(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let grow = game[Get.Grow][entity];
    let render = game[Get.Render][entity];
    render.Radius += grow.Speed * delta;
    let collide = game[Get.Collide][entity];
    collide.Radius += grow.Speed * delta;
}
