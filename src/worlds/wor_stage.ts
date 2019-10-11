import {render_rect} from "../components/com_render.js";
import {Game} from "../game.js";

export function world_stage(game: Game) {
    game.World = [];

    game.Add({
        Translation: [100, 100],
        Using: [render_rect(100, 50, "red")],
    });
}
