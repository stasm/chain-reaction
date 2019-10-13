import {Collide} from "./com_collide";
import {Grow} from "./com_grow";
import {Lifespan} from "./com_lifespan";
import {Move} from "./com_move";
import {Render} from "./com_render";
import {Transform} from "./com_transform";

export const enum Get {
    Collide,
    Grow,
    Lifespan,
    Move,
    Render,
    Transform,
}

export const enum Has {
    Collide = 1 << Get.Collide,
    Grow = 1 << Get.Grow,
    Lifespan = 1 << Get.Lifespan,
    Move = 1 << Get.Move,
    Render = 1 << Get.Render,
    Transform = 1 << Get.Transform,
}

export interface ComponentData {
    [Get.Collide]: Array<Collide>;
    [Get.Grow]: Array<Grow>;
    [Get.Lifespan]: Array<Lifespan>;
    [Get.Move]: Array<Move>;
    [Get.Render]: Array<Render>;
    [Get.Transform]: Array<Transform>;
}
