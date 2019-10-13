import {Game} from "./game.js";
import {world_stage} from "./worlds/wor_stage.js";

export interface GameState {
    CurrentScene: string;
}

export const enum Action {
    GoToPlay = 1,
}

export function dispatch(game: Game, action: Action, args: Array<unknown>) {
    switch (action) {
        case Action.GoToPlay:
            game.CurrentScene = "play";
            let ball_count = args[0] as number;
            console.log(ball_count);
            requestAnimationFrame(() => world_stage(game, ball_count));
            break;
    }
}
