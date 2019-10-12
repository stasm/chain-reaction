import {Get} from "../components/com_index.js";
import {Render} from "../components/com_render.js";
import {Transform} from "../components/com_transform.js";
import {Game} from "../game.js";

const QUERY = Get.Transform | Get.Render;

export function sys_render(game: Game, delta: number) {
    game.Context.resetTransform();
    game.Context.clearRect(0, 0, game.Canvas.width, game.Canvas.height);
    game.Context.fillStyle = "#000";
    game.Context.fillRect(0, 0, game.Canvas.width, game.Canvas.height);

    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            let transform = game[Get.Transform][i];
            let render = game[Get.Render][i];
            draw_circle(game, transform, render);
        }
    }
}

function draw_circle(game: Game, transform: Transform, render: Render) {
    game.Context.setTransform(...transform.World);
    game.Context.fillStyle = render.Color;
    game.Context.beginPath();
    game.Context.arc(0, 0, render.Radius, 0, 2 * Math.PI);
    game.Context.closePath();
    game.Context.fill();
}
