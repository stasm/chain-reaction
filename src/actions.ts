import {Game} from "./game.js";
import {world_stage} from "./worlds/wor_stage.js";

export interface GameState {
    CurrentScene: string;
}

export const enum Action {
    ChangeScene,
}

export function dispatch(game: Game, action: Action, args: Array<unknown>) {
    switch (action) {
        case Action.ChangeScene:
            game.CurrentScene = "play";
            requestAnimationFrame(() => world_stage(game, 100));
            break;
    }
}
