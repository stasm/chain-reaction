import {GameState} from "./actions.js";
import {Blueprint} from "./blueprints/blu_common.js";
import {Collide} from "./components/com_collide.js";
import {Grow} from "./components/com_grow.js";
import {ComponentData, Get} from "./components/com_index.js";
import {Lifespan} from "./components/com_lifespan.js";
import {Move} from "./components/com_move.js";
import {Render} from "./components/com_render.js";
import {transform, Transform} from "./components/com_transform.js";
import {sys_collide} from "./systems/sys_collide.js";
import {sys_control_ball} from "./systems/sys_control_ball.js";
import {sys_control_placement} from "./systems/sys_control_placement.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_grow} from "./systems/sys_grow.js";
import {sys_lifespan} from "./systems/sys_lifespan.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_performance} from "./systems/sys_performance.js";
import {sys_render} from "./systems/sys_render.js";
import {sys_transform} from "./systems/sys_transform.js";
import {sys_ui} from "./systems/sys_ui.js";

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
    public [Get.Collide]: Array<Collide> = [];
    public [Get.Grow]: Array<Grow> = [];
    public [Get.Lifespan]: Array<Lifespan> = [];
    public [Get.Move]: Array<Move> = [];
    public [Get.Render]: Array<Render> = [];
    public [Get.Transform]: Array<Transform> = [];

    // Implement GameState
    public CurrentScene = "title";

    public Canvas: HTMLCanvasElement;
    public Context: CanvasRenderingContext2D;
    public UI: HTMLElement;
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

        this.UI = document.querySelector("main")!;
        this.UI.addEventListener("contextmenu", evt => evt.preventDefault());
        this.UI.addEventListener("mousedown", evt => {
            this.InputState[`mouse_${evt.button}`] = 1;
            this.InputEvent[`mouse_${evt.button}_down`] = 1;
        });
        this.UI.addEventListener("mouseup", evt => {
            this.InputState[`mouse_${evt.button}`] = 0;
            this.InputEvent[`mouse_${evt.button}_up`] = 1;
        });
        this.UI.addEventListener("mousemove", evt => {
            this.InputState.mouse_x = evt.offsetX;
            this.InputState.mouse_y = evt.offsetY;
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
        sys_control_ball(this, delta);
        sys_lifespan(this, delta);
        sys_move(this, delta);
        sys_transform(this, delta);
        sys_grow(this, delta);
        sys_collide(this, delta);
        sys_render(this, delta);
        sys_ui(this, delta);

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

    Add({Translation, Using = []}: Blueprint) {
        let entity = this.CreateEntity();
        transform(Translation)(this, entity);
        for (let mixin of Using) {
            mixin(this, entity);
        }
        return entity;
    }

    Destroy(entity: Entity) {
        this.World[entity] = 0;
    }
}
