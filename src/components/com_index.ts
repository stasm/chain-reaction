import {Move} from "./com_move";
import {Render} from "./com_render";
import {Transform} from "./com_transform";

export const enum Get {
    Move = 1,
    Render = 2,
    Transform = 4,
}

export interface ComponentData {
    [Get.Move]: Array<Move>;
    [Get.Render]: Array<Render>;
    [Get.Transform]: Array<Transform>;
}
