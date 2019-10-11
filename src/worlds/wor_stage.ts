import {move} from "../components/com_move.js";
import {render_circle, render_rect} from "../components/com_render.js";
import {Game} from "../game.js";

export function world_stage(game: Game) {
    game.World = [];

    game.Add({
        Translation: [100, 100],
        Using: [render_rect(100, 50, "red", 0.3)],
    });

    game.Add({
        Translation: [200, 175],
        Using: [render_circle(50, "blue", 0.3), move(1, 100)],
    });
}
