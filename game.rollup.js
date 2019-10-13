(function () {
    'use strict';

    function collide(Radius, Kind) {
        return (game, EntityId) => {
            game.World[EntityId] |= 1 /* Collide */;
            game[0 /* Collide */][EntityId] = {
                EntityId,
                Kind,
                Collision: false,
                Center: [0, 0],
                Radius,
            };
        };
    }

    function move(angle, Speed) {
        return (game, entity) => {
            game.World[entity] |= 8 /* Move */;
            game[3 /* Move */][entity] = {
                Direction: [Math.cos(angle), Math.sin(angle)],
                Speed,
            };
        };
    }

    function render_circle(Radius, Color) {
        return (game, EntityId) => {
            game.World[EntityId] |= 16 /* Render */;
            game[4 /* Render */][EntityId] = {
                EntityId,
                Radius,
                Color,
            };
        };
    }

    function integer(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function float(min = 0, max = 1) {
        return Math.random() * (max - min) + min;
    }

    function create_ball(game, x, y) {
        return {
            Translation: [x, y],
            Using: [
                render_circle(10, `hsla(${integer(0, 359)}, 90%, 60%, 0.5)`),
                move(float(0, 2 * Math.PI), 200),
                collide(10, 0 /* Ball */),
            ],
        };
    }

    function world_stage(game, ball_count) {
        game.World = [];
        for (let i = 0; i < ball_count; i++) {
            game.Add(create_ball(game, integer(1, game.Canvas.width - 1), integer(1, game.Canvas.height - 1)));
        }
    }

    function dispatch(game, action, args) {
        switch (action) {
            case 1 /* GoToPlay */:
                game.CurrentScene = "play";
                let ball_count = args[0];
                console.log(ball_count);
                requestAnimationFrame(() => world_stage(game, ball_count));
                break;
        }
    }

    function create() {
        return [1, 0, 0, 1, 0, 0];
    }
    function from_translation(out, v) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        out[4] = v[0];
        out[5] = v[1];
        return out;
    }

    function transform(Translation = [0, 0]) {
        return (game, EntityId) => {
            game.World[EntityId] |= 32 /* Transform */;
            game[5 /* Transform */][EntityId] = {
                EntityId,
                World: create(),
                Translation,
                Dirty: true,
            };
        };
    }

    function distance(a, b) {
        let x = b[0] - a[0];
        let y = b[1] - a[1];
        return Math.hypot(x, y);
    }

    const QUERY = 32 /* Transform */ | 1 /* Collide */;
    function sys_collide(game, delta) {
        // Collect all colliders.
        let balls = [];
        let explosions = [];
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY) === QUERY) {
                let transform = game[5 /* Transform */][i];
                let collider = game[0 /* Collide */][i];
                collider.Collision = false;
                collider.Center[0] = transform.Translation[0];
                collider.Center[1] = transform.Translation[1];
                switch (collider.Kind) {
                    case 0 /* Ball */:
                        balls.push(collider);
                        break;
                    case 1 /* Explosion */:
                        explosions.push(collider);
                        break;
                }
            }
        }
        for (let i = 0; i < explosions.length; i++) {
            check_collisions(explosions[i], balls);
        }
    }
    /**
     * Check for collisions between a given collider and other colliders.
     *
     * @param game The game instance.
     * @param collider The current collider.
     * @param colliders Other colliders to test against.
     */
    function check_collisions(collider, colliders) {
        for (let i = 0; i < colliders.length; i++) {
            let other = colliders[i];
            if (circles_intersect(collider, other)) {
                collider.Collision = true;
                other.Collision = true;
            }
        }
    }
    function circles_intersect(a, b) {
        return distance(a.Center, b.Center) < a.Radius + b.Radius;
    }

    function grow(Speed) {
        return (game, entity) => {
            game.World[entity] |= 2 /* Grow */;
            game[1 /* Grow */][entity] = {
                Speed,
            };
        };
    }

    function lifespan(Max = Infinity) {
        return (game, entity) => {
            game.World[entity] |= 4 /* Lifespan */;
            game[2 /* Lifespan */][entity] = {
                Max,
                Age: 0,
            };
        };
    }

    const QUERY$1 = 32 /* Transform */ | 8 /* Move */ | 1 /* Collide */;
    function sys_control_ball(game, delta) {
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$1) === QUERY$1) {
                update(game, i);
            }
        }
    }
    function update(game, entity, delta) {
        let transform = game[5 /* Transform */][entity];
        let move = game[3 /* Move */][entity];
        if (transform.Translation[0] < 0 || transform.Translation[0] > game.Canvas.width) {
            move.Direction[0] = -move.Direction[0];
        }
        if (transform.Translation[1] < 0 || transform.Translation[1] > game.Canvas.height) {
            move.Direction[1] = -move.Direction[1];
        }
        let collide = game[0 /* Collide */][entity];
        if (collide.Collision) {
            // Transform the ball into an explosion.
            game.World[entity] &= ~8 /* Move */;
            game[0 /* Collide */][entity].Kind = 1 /* Explosion */;
            grow(40)(game, entity);
            lifespan(3)(game, entity);
        }
    }

    function create_explosion(game, x, y) {
        return {
            Translation: [x, y],
            Using: [
                render_circle(5, `hsla(${integer(0, 359)}, 90%, 60%, 0.5)`),
                collide(5, 1 /* Explosion */),
                grow(40),
                lifespan(3),
            ],
        };
    }

    function sys_control_placement(game, delta) {
        if (game.CurrentScene === "play" && game.InputEvent.mouse_0_up) {
            game.Add(create_explosion(game, game.InputState.mouse_x, game.InputState.mouse_y));
        }
    }

    let tick_span = document.getElementById("tick");
    let fps_span = document.getElementById("fps");
    function sys_framerate(game, delta) {
        if (tick_span) {
            tick_span.textContent = (delta * 1000).toFixed(1);
        }
        if (fps_span) {
            fps_span.textContent = (1 / delta).toFixed();
        }
    }

    const QUERY$2 = 32 /* Transform */ | 2 /* Grow */ | 16 /* Render */ | 1 /* Collide */;
    function sys_grow(game, delta) {
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$2) == QUERY$2) {
                update$1(game, i, delta);
            }
        }
    }
    function update$1(game, entity, delta) {
        let grow = game[1 /* Grow */][entity];
        let render = game[4 /* Render */][entity];
        render.Radius += grow.Speed * delta;
        let collide = game[0 /* Collide */][entity];
        collide.Radius += grow.Speed * delta;
    }

    const QUERY$3 = 32 /* Transform */ | 4 /* Lifespan */;
    function sys_lifespan(game, delta) {
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$3) == QUERY$3) {
                update$2(game, i, delta);
            }
        }
    }
    function update$2(game, entity, delta) {
        let lifespan = game[2 /* Lifespan */][entity];
        lifespan.Age += delta;
        if (lifespan.Age > lifespan.Max) {
            game.Destroy(entity);
        }
    }

    const QUERY$4 = 32 /* Transform */ | 8 /* Move */;
    function sys_move(game, delta) {
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$4) === QUERY$4) {
                update$3(game, i, delta);
            }
        }
    }
    function update$3(game, entity, delta) {
        let transform = game[5 /* Transform */][entity];
        let move = game[3 /* Move */][entity];
        transform.Translation[0] += move.Direction[0] * move.Speed * delta;
        transform.Translation[1] += move.Direction[1] * move.Speed * delta;
        transform.Dirty = true;
    }

    function sys_performance(game, delta, target) {
        if (target) {
            target.textContent = delta.toFixed(1);
        }
    }

    const QUERY$5 = 32 /* Transform */ | 16 /* Render */;
    function sys_render(game, delta) {
        game.Context.resetTransform();
        game.Context.clearRect(0, 0, game.Canvas.width, game.Canvas.height);
        game.Context.fillStyle = "#000";
        game.Context.fillRect(0, 0, game.Canvas.width, game.Canvas.height);
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$5) === QUERY$5) {
                let transform = game[5 /* Transform */][i];
                let render = game[4 /* Render */][i];
                draw_circle(game, transform, render);
            }
        }
    }
    function draw_circle(game, transform, render) {
        game.Context.setTransform(...transform.World);
        game.Context.fillStyle = render.Color;
        game.Context.beginPath();
        game.Context.arc(0, 0, render.Radius, 0, 2 * Math.PI);
        game.Context.closePath();
        game.Context.fill();
    }

    const QUERY$6 = 32 /* Transform */;
    function sys_transform(game, delta) {
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$6) === QUERY$6) {
                update$4(game[5 /* Transform */][i]);
            }
        }
    }
    function update$4(transform) {
        if (transform.Dirty) {
            transform.Dirty = false;
            from_translation(transform.World, transform.Translation);
        }
    }

    function shift(values) {
        let value = values.shift();
        if (value === false || value === undefined) {
            return "";
        }
        else if (Array.isArray(value)) {
            return value.join("");
        }
        else {
            return value;
        }
    }
    function html(strings, ...values) {
        return strings.reduce((out, cur) => out + shift(values) + cur);
    }

    function Title() {
        return html `
        <div style="margin-top: 10vh; font: 20vmin sans-serif;">
            <span>Chain</span><br><span>Reaction</span>
        </div>
        <div style="margin-top: 10vh; font: 10vmin sans-serif;">
            <button onclick="$(${1 /* GoToPlay */}, [10])">
                <span>Play Now</span>
            </button>
            <button onclick="$(${1 /* GoToPlay */}, [100])">
                <span>One Hundred<span>
            </button>
            <button onclick="$(${1 /* GoToPlay */}, [1000])">
                <span>One Thousand</span>
            </button>
        </div>
    `;
    }

    function App(state) {
        switch (state.CurrentScene) {
            case "title":
                return Title();
            default:
                return "";
        }
    }

    let prev;
    function sys_ui(game, delta) {
        let next = App(game);
        if (next !== prev) {
            game.UI.innerHTML = prev = next;
        }
    }

    var _a, _b, _c, _d, _e, _f;
    const MAX_ENTITIES = 10000;
    class Game {
        constructor() {
            this.World = [];
            // Implement ComponentData
            this[_a] = [];
            this[_b] = [];
            this[_c] = [];
            this[_d] = [];
            this[_e] = [];
            this[_f] = [];
            // Implement GameState
            this.CurrentScene = "title";
            this.InputState = { mouse_x: 0, mouse_y: 0 };
            this.InputEvent = { mouse_x: 0, mouse_y: 0, wheel_y: 0 };
            this.RAF = 0;
            document.addEventListener("visibilitychange", () => document.hidden ? this.Stop() : this.Start());
            this.Canvas = document.querySelector("canvas");
            this.Canvas.width = window.innerWidth;
            this.Canvas.height = window.innerHeight;
            this.UI = document.querySelector("main");
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
            this.Context = this.Canvas.getContext("2d");
        }
        CreateEntity(mask = 0) {
            for (let i = 0; i < MAX_ENTITIES; i++) {
                if (!this.World[i]) {
                    this.World[i] = mask;
                    return i;
                }
            }
            throw new Error("No more entities available.");
        }
        Update(delta) {
            let now = performance.now();
            sys_control_placement(this);
            sys_control_ball(this);
            sys_lifespan(this, delta);
            sys_move(this, delta);
            sys_transform(this);
            sys_grow(this, delta);
            sys_collide(this);
            sys_render(this);
            sys_ui(this);
            // Performance.
            sys_performance(this, performance.now() - now, document.querySelector("#frame"));
            sys_framerate(this, delta);
            for (let name in this.InputEvent) {
                this.InputEvent[name] = 0;
            }
        }
        Start() {
            let last = performance.now();
            let tick = (now) => {
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
        Add({ Translation, Using = [] }) {
            let entity = this.CreateEntity();
            transform(Translation)(this, entity);
            for (let mixin of Using) {
                mixin(this, entity);
            }
            return entity;
        }
        Destroy(entity) {
            this.World[entity] = 0;
        }
    }
    _a = 0 /* Collide */, _b = 1 /* Grow */, _c = 2 /* Lifespan */, _d = 3 /* Move */, _e = 4 /* Render */, _f = 5 /* Transform */;

    let game = new Game();
    world_stage(game, 10);
    game.Start();
    // @ts-ignore
    window.$ = (...args) => dispatch(game, ...args);
    // @ts-ignore
    window.game = game;

}());
