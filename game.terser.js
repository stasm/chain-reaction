!function(){function t(t,i,n){for(let s=0;s<n;s++){let n=i[s];(function(t,i){return Math.hypot(i[0]-t[0],i[1]-t[1])})((e=t).t,(o=n).t)<e.i+o.i&&(t.o.push(n),n.o.push(t))}var e,o}function i(t){return(i,n)=>{i.s[n]|=2,i[2][n]={h:t}}}function n(t=1/0){return(i,n)=>{i.s[n]|=4,i[4][n]={u:t,l:0}}}function e(t,e,o){let s=t[32][e],r=t[8][e];(s.m[0]<0||s.m[0]>t.p.width)&&(r._[0]=-r._[0]),(s.m[1]<0||s.m[1]>t.p.height)&&(r._[1]=-r._[1]);let h=t[1][e];for(let o=0;o<h.o.length;o++)2&t.s[h.o[o].M]&&(t.s[e]&=-9,i(40)(t,e),n(3)(t,e))}function o(t){return(i,n)=>{i.s[n]|=1,i[1][n]={M:n,o:[],t:[0,0],i:t}}}function s(t,i){return(n,e)=>{n.s[e]|=16,n[16][e]={M:e,i:t,v:i}}}function r(t=0,i=1){return Math.floor(Math.random()*(i-t+1)+t)}function h(t=0,i=1){return Math.random()*(i-t)+t}function u(t,i,n){let e=t[2][i];t[16][i].i+=e.h*n,t[1][i].i+=e.h*n}function f(t,i,n){let e=t[4][i];e.l+=n,e.l>e.u&&t.$(i)}function c(t,i,n){let e=t[32][i],o=t[8][i];e.m[0]+=o._[0]*o.h*n,e.m[1]+=o._[1]*o.h*n,e.g=1}function a(t,i,n){t.A.setTransform(...i.s),t.A.fillStyle=n.v,t.A.beginPath(),t.A.arc(0,0,n.i,0,2*Math.PI),t.A.closePath(),t.A.fill()}function l(t){var i,n;t.g&&(t.g=0,n=t.m,(i=t.s)[0]=1,i[1]=0,i[2]=0,i[3]=1,i[4]=n[0],i[5]=n[1])}function d(t,i,n){return{m:[i,n],C:[s(10,`hsla(${r(0,359)}, 90%, 60%, 0.5)`),(e=h(0,2*Math.PI),(t,i)=>{t.s[i]|=8,t[8][i]={_:[Math.cos(e),Math.sin(e)],h:200}}),o(10)]};var e}let m=document.getElementById("tick"),w=document.getElementById("fps"),y=new class{constructor(){this.s=[],this[1]=[],this[2]=[],this[4]=[],this[8]=[],this[16]=[],this[32]=[],this.S={mouse_x:0,mouse_y:0},this.InputEvent={mouse_x:0,mouse_y:0,wheel_y:0},this.T=0,document.addEventListener("visibilitychange",()=>document.hidden?this.U():this.k()),this.p=document.querySelector("canvas"),this.p.width=window.innerWidth,this.p.height=window.innerHeight,window.addEventListener("keydown",t=>this.S[t.code]=1),window.addEventListener("keyup",t=>this.S[t.code]=0),this.p.addEventListener("contextmenu",t=>t.preventDefault()),this.p.addEventListener("mousedown",t=>{this.S[`mouse_${t.button}`]=1,this.InputEvent[`mouse_${t.button}_down`]=1}),this.p.addEventListener("mouseup",t=>{this.S[`mouse_${t.button}`]=0,this.InputEvent[`mouse_${t.button}_up`]=1}),this.p.addEventListener("mousemove",t=>{this.S.mouse_x=t.offsetX,this.S.mouse_y=t.offsetY,this.InputEvent.mouse_x=t.movementX,this.InputEvent.mouse_y=t.movementY}),this.p.addEventListener("wheel",t=>{this.InputEvent.wheel_y=t.deltaY}),this.A=this.p.getContext("2d")}D(t=0){for(let i=0;i<1e4;i++)if(!this.s[i])return this.s[i]=t,i;throw Error("No more entities available.")}I(h){let d=performance.now();(function(t,e){t.InputEvent.mouse_0_up&&t.F({m:[t.S.mouse_x,t.S.mouse_y],C:[s(5,`hsla(${r(0,359)}, 90%, 60%, 0.5)`),o(5),i(40),n(3)]})})(this),function(t,i){for(let i=0;i<t.s.length;i++)41==(41&t.s[i])&&e(t,i)}(this),function(t,i){for(let n=0;n<t.s.length;n++)36==(36&t.s[n])&&f(t,n,i)}(this,h),function(t,i){for(let n=0;n<t.s.length;n++)40==(40&t.s[n])&&c(t,n,i)}(this,h),function(t,i){for(let i=0;i<t.s.length;i++)32==(32&t.s[i])&&l(t[32][i])}(this),function(t,i){for(let n=0;n<t.s.length;n++)51==(51&t.s[n])&&u(t,n,i)}(this,h),function(i,n){let e=[];for(let t=0;t<i.s.length;t++)if(33==(33&i.s[t])){let n=i[32][t],o=i[1][t];o.o=[],o.t=[n.m[0],n.m[1]],e.push(o)}for(let i=0;i<e.length;i++)t(e[i],e,i)}(this),function(t,i){t.A.resetTransform(),t.A.clearRect(0,0,t.p.width,t.p.height),t.A.fillStyle="#000",t.A.fillRect(0,0,t.p.width,t.p.height);for(let i=0;i<t.s.length;i++)48==(48&t.s[i])&&a(t,t[32][i],t[16][i])}(this),function(t,i,n){n&&(n.textContent=i.toFixed(1))}(0,performance.now()-d,document.querySelector("#frame")),function(t,i){m&&(m.textContent=(1e3*i).toFixed(1)),w&&(w.textContent=(1/i).toFixed())}(0,h);for(let t in this.InputEvent)this.InputEvent[t]=0}k(){let t=performance.now(),i=n=>{this.I((n-t)/1e3),t=n,this.T=requestAnimationFrame(i)};this.U(),i(t)}U(){cancelAnimationFrame(this.T)}F({m:t,C:i=[]}){let n=this.D();!function(t=[0,0]){return(i,n)=>{i.s[n]|=32,i[32][n]={M:n,s:[1,0,0,1,0,0],m:t,g:1}}}(t)(this,n);for(let t of i)t(this,n);return n}$(t){this.s[t]=0}};!function(t){t.s=[];for(let i=0;i<50;i++)t.F(d(0,r(1,t.p.width-1),r(1,t.p.height-1)))}(y),y.k(),window.$=(...t)=>void 0,window.game=y}();
