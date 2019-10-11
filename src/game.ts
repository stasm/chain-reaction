import {GameState} from "./actions.js";
import {Blueprint} from "./blueprints/blu_common.js";
import {ComponentData, Get} from "./components/com_index.js";
import {Lifespan} from "./components/com_lifespan.js";
import {Move} from "./components/com_move.js";
import {Render} from "./components/com_render.js";
import {transform, Transform} from "./components/com_transform.js";
import {sys_control_placement} from "./systems/sys_control_placement.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_lifespan} from "./systems/sys_lifespan.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_performance} from "./systems/sys_performance.js";
import {sys_render} from "./systems/sys_render.js";
import {sys_transform} from "./systems/sys_transform.js";

const MAX_ENTITIES = 10000;

export type Entity = number;

export interface InputState {
    [k: string]: number;
    mouse_x: number;
    mouse_y: number;
}

export interface InputEvent {
    [k: string]: number;
    mouse_x: number;
    mouse_y: number;
    wheel_y: number;
}

export class Game implements ComponentData, GameState {
    public World: Array<number> = [];

    // Implement ComponentData
    public [Get.Lifespan]: Array<Lifespan> = [];
    public [Get.Move]: Array<Move> = [];
    public [Get.Render]: Array<Render> = [];
    public [Get.Transform]: Array<Transform> = [];

    public Canvas: HTMLCanvasElement;
    public Context: CanvasRenderingContext2D;
    public InputState: InputState = {mouse_x: 0, mouse_y: 0};
    public InputEvent: InputEvent = {mouse_x: 0, mouse_y: 0, wheel_y: 0};

    private RAF: number = 0;

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? this.Stop() : this.Start()
        );

        this.Canvas = document.querySelector("canvas")!;
        this.Canvas.width = window.innerWidth;
        this.Canvas.height = window.innerHeight;

        window.addEventListener("keydown", evt => (this.InputState[evt.code] = 1));
        window.addEventListener("keyup", evt => (this.InputState[evt.code] = 0));
        this.Canvas.addEventListener("contextmenu", evt => evt.preventDefault());
        this.Canvas.addEventListener("mousedown", evt => {
            this.InputState[`mouse_${evt.button}`] = 1;
            this.InputEvent[`mouse_${evt.button}_down`] = 1;
        });
        this.Canvas.addEventListener("mouseup", evt => {
            this.InputState[`mouse_${evt.button}`] = 0;
            this.InputEvent[`mouse_${evt.button}_up`] = 1;
        });
        this.Canvas.addEventListener("mousemove", evt => {
            this.InputState.mouse_x = evt.offsetX;
            this.InputState.mouse_y = evt.offsetY;
            this.InputEvent.mouse_x = evt.movementX;
            this.InputEvent.mouse_y = evt.movementY;
        });
        this.Canvas.addEventListener("wheel", evt => {
            this.InputEvent.wheel_y = evt.deltaY;
        });

        this.Context = this.Canvas.getContext("2d")!;
    }

    CreateEntity(mask: number = 0) {
        for (let i = 0; i < MAX_ENTITIES; i++) {
            if (!this.World[i]) {
                this.World[i] = mask;
                return i;
            }
        }
        throw new Error("No more entities available.");
    }

    Update(delta: number) {
        let now = performance.now();

        sys_control_placement(this, delta);
        sys_lifespan(this, delta);
        sys_move(this, delta);
        sys_transform(this, delta);
        sys_render(this, delta);

        // Performance.
        sys_performance(this, performance.now() - now, document.querySelector("#frame"));
        sys_framerate(this, delta);

        for (let name in this.InputEvent) {
            this.InputEvent[name] = 0;
        }
    }

    Start() {
        let last = performance.now();
        let tick = (now: number) => {
            let delta = (now - last) / 1000;
            this.Update(delta);

            last = now;
            this.RAF = requestAnimationFrame(tick);
        };

        this.Stop();
        tick(last);
    }

    Stop() {
        cancelAnimationFrame(this.RAF);
    }

    Add({Translation, Rotation, Scale, Using = [], Children = []}: Blueprint) {
        let entity = this.CreateEntity();
        transform(Translation, Rotation, Scale)(this, entity);
        for (let mixin of Using) {
            mixin(this, entity);
        }
        let entity_transform = this[Get.Transform][entity];
        for (let subtree of Children) {
            let child = this.Add(subtree);
            let child_transform = this[Get.Transform][child];
            child_transform.Parent = entity_transform;
            entity_transform.Children.push(child_transform);
        }
        return entity;
    }

    Destroy(entity: Entity) {
        let mask = this.World[entity];
        if (mask & (1 << Get.Transform)) {
            for (let child of this[Get.Transform][entity].Children) {
                this.Destroy(child.EntityId);
            }
        }
        this.World[entity] = 0;
    }
}
