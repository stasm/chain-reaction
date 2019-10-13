import {Action} from "../actions.js";
import {html} from "./html.js";

export function Title() {
    return html`
        <div style="font: 20vmin/1.2 sans-serif;">
            <div style="margin-top: 10vh">
                <span>Chain</span><br />
                <span>Reaction</span>
            </div>
            <div style="margin-top: 10vh">
                <button onclick="$(${Action.GoToPlay}, [10])">10</button><br />
                <button onclick="$(${Action.GoToPlay}, [100])">100</button><br />
                <button onclick="$(${Action.GoToPlay}, [1000])">1000</button><br />
            </div>
        </div>
    `;
}
