import {collide} from "../components/com_collide.js";
import {control_ball} from "../components/com_control_ball.js";
import {move} from "../components/com_move.js";
import {render_circle} from "../components/com_render.js";
import {Game} from "../game.js";
import {float, integer} from "../math/random.js";
import {Blueprint} from "./blu_common.js";

export function create_ball(game: Game, x: number, y: number) {
    return <Blueprint>{
        Translation: [x, y],
        Using: [
            control_ball(),
            render_circle(10, `hsl(${integer(0, 359)}, 90%, 60%)`, 0.5),
            move(float(0, 2 * Math.PI), 200),
            collide(10),
        ],
    };
}
