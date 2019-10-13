import {Collide} from "../components/com_collide.js";
import {Get, Has} from "../components/com_index.js";
import {Game} from "../game.js";
import {distance} from "../math/vec2.js";

const QUERY = Has.Transform | Has.Collide;

export function sys_collide(game: Game, delta: number) {
    // Collect all colliders.
    let colliders: Array<Collide> = [];
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            let transform = game[Get.Transform][i];
            let collider = game[Get.Collide][i];

            collider.Collisions = [];
            collider.Center = [transform.Translation[0], transform.Translation[1]];
            colliders.push(collider);
        }
    }

    // Check collisions, once for each pair of colliders.
    for (let i = 0; i < colliders.length; i++) {
        check_collisions(colliders[i], colliders, i);
    }
}

/**
 * Check for collisions between a given collider and all other colliders. We
 * only need to check a pair of colliders once. Varying length allows to skip
 * half of the NxN checks matrix.
 *
 * @param game The game instance.
 * @param collider The current collider.
 * @param colliders Other colliders to test against.
 * @param length How many colliders to check.
 */
function check_collisions(collider: Collide, colliders: Array<Collide>, length: number) {
    for (let i = 0; i < length; i++) {
        let other = colliders[i];
        if (circles_intersect(collider, other)) {
            collider.Collisions.push(other);
            other.Collisions.push(collider);
        }
    }
}

function circles_intersect(a: Collide, b: Collide) {
    return distance(a.Center, b.Center) < a.Radius + b.Radius;
}
