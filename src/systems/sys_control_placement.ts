import {move} from "../components/com_move.js";
import {render_circle} from "../components/com_render.js";
import {Game} from "../game.js";
import {float, integer} from "../math/random.js";

export function sys_control_placement(game: Game, delta: number) {
    if (game.InputEvent.mouse_0_up) {
        game.Add({
            Translation: [game.InputState.mouse_x, game.InputState.mouse_y],
            Using: [
                render_circle(10, `hsl(${integer(0, 359)}, 90%, 60%)`, 0.5),
                move(float(0, 2 * Math.PI), 200),
            ],
        });
    }
}
