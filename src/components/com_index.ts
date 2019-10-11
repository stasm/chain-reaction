import {Grow} from "./com_grow";
import {Lifespan} from "./com_lifespan";
import {Move} from "./com_move";
import {Render} from "./com_render";
import {Transform} from "./com_transform";

export const enum Get {
    Grow = 1,
    Lifespan = 2,
    Move = 4,
    Render = 8,
    Transform = 16,
}

export interface ComponentData {
    [Get.Grow]: Array<Grow>;
    [Get.Lifespan]: Array<Lifespan>;
    [Get.Move]: Array<Move>;
    [Get.Render]: Array<Render>;
    [Get.Transform]: Array<Transform>;
}
