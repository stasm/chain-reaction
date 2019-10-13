import {create_ball} from "../blueprints/blu_ball.js";
import {Game} from "../game.js";
import {integer} from "../math/random.js";

export function world_stage(game: Game, ball_count: number) {
    game.World = [];

    for (let i = 0; i < ball_count; i++) {
        game.Add(
            create_ball(game, integer(1, game.Canvas.width - 1), integer(1, game.Canvas.height - 1))
        );
    }
}
