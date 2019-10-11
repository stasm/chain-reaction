import {move} from "../components/com_move.js";
import {render_circle} from "../components/com_render.js";
import {Game} from "../game.js";
import {float, integer} from "../math/random.js";

export function world_stage(game: Game) {
    game.World = [];

    for (let i = 0; i < 10; i++) {
        game.Add({
            Translation: [integer(1, game.Canvas.width - 1), integer(1, game.Canvas.height - 1)],
            Using: [
                render_circle(10, `hsl(${integer(0, 359)}, 90%, 60%)`, 0.5),
                move(float(0, 2 * Math.PI), 200),
            ],
        });
    }
}
