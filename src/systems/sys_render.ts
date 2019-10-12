import {Get} from "../components/com_index.js";
import {RenderCircle, RenderKind, RenderRect} from "../components/com_render.js";
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

            switch (render.Kind) {
                case RenderKind.Rect:
                    draw_rect(game, transform, render);
                    break;
                case RenderKind.Circle:
                    draw_circle(game, transform, render);
                    break;
            }
        }
    }
}

function draw_rect(game: Game, transform: Transform, render: RenderRect) {
    game.Context.setTransform(...transform.World);
    game.Context.fillStyle = render.Color;
    game.Context.fillRect(0, 0, render.Width, render.Height);
}

function draw_circle(game: Game, transform: Transform, render: RenderCircle) {
    game.Context.setTransform(...transform.World);
    game.Context.fillStyle = render.Color;
    game.Context.beginPath();
    game.Context.arc(0, 0, render.Radius, 0, 2 * Math.PI);
    game.Context.closePath();
    game.Context.fill();
}
