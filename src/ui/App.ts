import {GameState} from "../actions.js";
import {Title} from "./Title.js";

export function App(state: GameState): string {
    switch (state.CurrentScene) {
        case "title":
            return Title();
        default:
            return "";
    }
}
