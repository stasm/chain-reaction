import {Action} from "../actions.js";
import {html} from "./html.js";

export function Title() {
    return html`
        <div style="font: 20vmin sans-serif;">
            <div style="margin-top: 10vh">
                <span>Chain</span><br />
                <span>Reaction</span>
            </div>
            <div style="margin-top: 10vh">
                <button onclick="$(${Action.ChangeScene}, 'play')">Play</button>
            </div>
        </div>
    `;
}
