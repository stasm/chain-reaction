import {grow} from "../components/com_grow.js";
import {lifespan} from "../components/com_lifespan.js";
import {render_circle} from "../components/com_render.js";
import {Game} from "../game.js";
import {integer} from "../math/random.js";
import {Blueprint} from "./blu_common.js";

export function create_explosion(game: Game, x: number, y: number) {
    return <Blueprint>{
        Translation: [x, y],
        Using: [render_circle(5, `hsl(${integer(0, 359)}, 90%, 60%)`, 0.5), grow(10), lifespan(3)],
    };
}
