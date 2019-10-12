import {Collide} from "./com_collide";
import {ControlBall} from "./com_control_ball";
import {Grow} from "./com_grow";
import {Lifespan} from "./com_lifespan";
import {Move} from "./com_move";
import {Render} from "./com_render";
import {Transform} from "./com_transform";

export const enum Get {
    Collide = 1,
    ControlBall = 2,
    Grow = 4,
    Lifespan = 8,
    Move = 16,
    Render = 32,
    Transform = 64,
}

export interface ComponentData {
    [Get.Collide]: Array<Collide>;
    [Get.ControlBall]: Array<ControlBall>;
    [Get.Grow]: Array<Grow>;
    [Get.Lifespan]: Array<Lifespan>;
    [Get.Move]: Array<Move>;
    [Get.Render]: Array<Render>;
    [Get.Transform]: Array<Transform>;
}
