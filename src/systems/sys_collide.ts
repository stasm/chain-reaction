import {Collide, CollideKind} from "../components/com_collide.js";
import {Get, Has} from "../components/com_index.js";
import {Game} from "../game.js";
import {distance} from "../math/vec2.js";

const QUERY = Has.Transform | Has.Collide;

export function sys_collide(game: Game, delta: number) {
    // Collect all colliders.
    let balls: Array<Collide> = [];
    let explosions: Array<Collide> = [];
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            let transform = game[Get.Transform][i];
            let collider = game[Get.Collide][i];

            collider.Collision = false;
            collider.Center[0] = transform.Translation[0];
            collider.Center[1] = transform.Translation[1];

            switch (collider.Kind) {
                case CollideKind.Ball:
                    balls.push(collider);
                    break;
                case CollideKind.Explosion:
                    explosions.push(collider);
                    break;
            }
        }
    }

    for (let i = 0; i < explosions.length; i++) {
        check_collisions(explosions[i], balls);
    }
}

/**
 * Check for collisions between a given collider and other colliders.
 *
 * @param game The game instance.
 * @param collider The current collider.
 * @param colliders Other colliders to test against.
 */
function check_collisions(collider: Collide, colliders: Array<Collide>) {
    for (let i = 0; i < colliders.length; i++) {
        let other = colliders[i];
        if (circles_intersect(collider, other)) {
            collider.Collision = true;
            other.Collision = true;
        }
    }
}

function circles_intersect(a: Collide, b: Collide) {
    return distance(a.Center, b.Center) < a.Radius + b.Radius;
}
