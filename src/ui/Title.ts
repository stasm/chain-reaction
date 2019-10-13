import {Action} from "../actions.js";
import {html} from "./html.js";

export function Title() {
    return html`
        <div style="margin-top: 10vh; font: 20vmin sans-serif;">
            <span>Chain</span><br><span>Reaction</span>
        </div>
        <div style="margin-top: 10vh; font: 10vmin sans-serif;">
            <button onclick="$(${Action.GoToPlay}, [10])">
                <span>Play Now</span>
            </button>
            <button onclick="$(${Action.GoToPlay}, [100])">
                <span>One Hundred<span>
            </button>
            <button onclick="$(${Action.GoToPlay}, [1000])">
                <span>One Thousand</span>
            </button>
        </div>
    `;
}
