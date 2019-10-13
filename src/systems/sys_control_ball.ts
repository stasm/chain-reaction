import {CollideKind} from "../components/com_collide.js";
import {grow} from "../components/com_grow.js";
import {Get, Has} from "../components/com_index.js";
import {lifespan} from "../components/com_lifespan.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform | Has.Move | Has.Collide;

export function sys_control_ball(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let transform = game[Get.Transform][entity];
    let move = game[Get.Move][entity];

    if (transform.Translation[0] < 0 || transform.Translation[0] > game.Canvas.width) {
        move.Direction[0] = -move.Direction[0];
    }

    if (transform.Translation[1] < 0 || transform.Translation[1] > game.Canvas.height) {
        move.Direction[1] = -move.Direction[1];
    }

    let collide = game[Get.Collide][entity];
    if (collide.Collision) {
        // Transform the ball into an explosion.
        game.World[entity] &= ~Has.Move;
        game[Get.Collide][entity].Kind = CollideKind.Explosion;
        grow(40)(game, entity);
        lifespan(3)(game, entity);
    }
}
