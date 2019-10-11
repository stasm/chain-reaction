import {create_ball} from "../blueprints/blu_ball.js";
import {Game} from "../game.js";

export function sys_control_placement(game: Game, delta: number) {
    if (game.InputEvent.mouse_0_up) {
        game.Add(create_ball(game, game.InputState.mouse_x, game.InputState.mouse_y));
    }
}
