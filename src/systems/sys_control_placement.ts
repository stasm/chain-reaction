import {create_explosion} from "../blueprints/blu_explosion.js";
import {Game} from "../game.js";

export function sys_control_placement(game: Game, delta: number) {
    if (game.InputEvent.mouse_0_up) {
        game.Add(create_explosion(game, game.InputState.mouse_x, game.InputState.mouse_y));
    }
}
