import {Collide} from "./com_collide";
import {Grow} from "./com_grow";
import {Lifespan} from "./com_lifespan";
import {Move} from "./com_move";
import {Render} from "./com_render";
import {Transform} from "./com_transform";

export const enum Get {
    Collide = 1,
    Grow = 2,
    Lifespan = 4,
    Move = 8,
    Render = 16,
    Transform = 32,
}

export interface ComponentData {
    [Get.Collide]: Array<Collide>;
    [Get.Grow]: Array<Grow>;
    [Get.Lifespan]: Array<Lifespan>;
    [Get.Move]: Array<Move>;
    [Get.Render]: Array<Render>;
    [Get.Transform]: Array<Transform>;
}
