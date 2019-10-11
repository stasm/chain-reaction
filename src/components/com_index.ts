import {Lifespan} from "./com_lifespan";
import {Move} from "./com_move";
import {Render} from "./com_render";
import {Transform} from "./com_transform";

export const enum Get {
    Lifespan = 1,
    Move = 2,
    Render = 4,
    Transform = 8,
}

export interface ComponentData {
    [Get.Lifespan]: Array<Lifespan>;
    [Get.Move]: Array<Move>;
    [Get.Render]: Array<Render>;
    [Get.Transform]: Array<Transform>;
}
