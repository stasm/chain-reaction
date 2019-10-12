import {Entity, Game} from "../game.js";
import {Get} from "./com_index.js";

export type Render = RenderRect | RenderCircle;

export const enum RenderKind {
    Rect,
    Circle,
}

export interface RenderRect {
    EntityId: Entity;
    Kind: RenderKind.Rect;
    Width: number;
    Height: number;
    Color: string;
}

export function render_rect(Width: number, Height: number, Color: string) {
    return (game: Game, EntityId: Entity) => {
        game.World[EntityId] |= Get.Render;
        game[Get.Render][EntityId] = <RenderRect>{
            EntityId,
            Kind: RenderKind.Rect,
            Width,
            Height,
            Color,
        };
    };
}

export interface RenderCircle {
    EntityId: Entity;
    Kind: RenderKind.Circle;
    Radius: number;
    Color: string;
    Alpha: number;
}

export function render_circle(Radius: number, Color: string) {
    return (game: Game, EntityId: Entity) => {
        game.World[EntityId] |= Get.Render;
        game[Get.Render][EntityId] = <RenderCircle>{
            EntityId,
            Kind: RenderKind.Circle,
            Radius,
            Color,
        };
    };
}
