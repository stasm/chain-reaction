!function(){function t(t,i){return(n,e)=>{n.t[e]|=1,n[0][e]={i:e,o:i,s:0,u:[0,0],h:t}}}function i(t,i){return(n,e)=>{n.t[e]|=16,n[4][e]={i:e,h:t,l:i}}}function n(t=0,i=1){return Math.floor(Math.random()*(i-t+1)+t)}function e(t=0,i=1){return Math.random()*(i-t)+t}function o(o,s,r){return{m:[s,r],p:[i(10,`hsla(${n(0,359)}, 90%, 60%, 0.5)`),(u=e(0,2*Math.PI),(t,i)=>{t.t[i]|=8,t[3][i]={v:[Math.cos(u),Math.sin(u)],g:200}}),t(10,0)]};var u}function s(t,i){t.t=[];for(let e=0;e<i;e++)t.$(o(0,n(1,t._.width-1),n(1,t._.height-1)))}function r(t,i){for(let o=0;o<i.length;o++){let s=i[o];(function(t,i){return Math.hypot(i[0]-t[0],i[1]-t[1])})((n=t).u,(e=s).u)<n.h+e.h&&(t.s=1,s.s=1)}var n,e}function u(t){return(i,n)=>{i.t[n]|=2,i[1][n]={g:t}}}function a(t=1/0){return(i,n)=>{i.t[n]|=4,i[2][n]={M:t,A:0}}}function h(t,i,n){let e=t[5][i],o=t[3][i];(e.m[0]<0||e.m[0]>t._.width)&&(o.v[0]=-o.v[0]),(e.m[1]<0||e.m[1]>t._.height)&&(o.v[1]=-o.v[1]),t[0][i].s&&(t.t[i]&=-9,t[0][i].o=1,u(40)(t,i),a(3)(t,i))}function c(t,i,n){let e=t[1][i];t[4][i].h+=e.g*n,t[0][i].h+=e.g*n}function f(t,i,n){let e=t[2][i];e.A+=n,e.A>e.M&&t.k(i)}function l(t,i,n){let e=t[5][i],o=t[3][i];e.m[0]+=o.v[0]*o.g*n,e.m[1]+=o.v[1]*o.g*n,e.C=1}function d(t,i,n){t.S.setTransform(...i.t),t.S.fillStyle=n.l,t.S.beginPath(),t.S.arc(0,0,n.h,0,2*Math.PI),t.S.closePath(),t.S.fill()}function m(t){var i,n;t.C&&(t.C=0,n=t.m,(i=t.t)[0]=1,i[1]=0,i[2]=0,i[3]=1,i[4]=n[0],i[5]=n[1])}function p(t,...i){return t.reduce((t,n)=>t+function(t){let i=t.shift();return 0==i||void 0===i?"":Array.isArray(i)?i.join(""):i}(i)+n)}function v(t){switch(t.T){case"title":return p`<div style="margin-top: 10vh; font: 20vmin sans-serif;"><div style="margin-top: 1px"><span>Chain</span></div><div style="margin-top: 1px"><span>Reaction</span></div></div><div style="margin-top: 10vh; font: 20vmin sans-serif;"><div style="margin-top: 3px"><button onclick="$(${1}, [10])">10</button><br /></div><div style="margin-top: 3px"><button onclick="$(${1}, [100])">100</button><br /></div><div style="margin-top: 3px"><button onclick="$(${1}, [1000])">1000</button><br /></div></div>`;default:return""}}let y,w=document.getElementById("tick"),b=document.getElementById("fps"),g=new class{constructor(){this.t=[],this[0]=[],this[1]=[],this[2]=[],this[3]=[],this[4]=[],this[5]=[],this.T="title",this.U={mouse_x:0,mouse_y:0},this.InputEvent={mouse_x:0,mouse_y:0,wheel_y:0},this.D=0,document.addEventListener("visibilitychange",()=>document.hidden?this.F():this.I()),this._=document.querySelector("canvas"),this._.width=window.innerWidth,this._.height=window.innerHeight,this.R=document.querySelector("main"),this.R.addEventListener("contextmenu",t=>t.preventDefault()),this.R.addEventListener("mousedown",t=>{this.U[`mouse_${t.button}`]=1,this.InputEvent[`mouse_${t.button}_down`]=1}),this.R.addEventListener("mouseup",t=>{this.U[`mouse_${t.button}`]=0,this.InputEvent[`mouse_${t.button}_up`]=1}),this.R.addEventListener("mousemove",t=>{this.U.mouse_x=t.offsetX,this.U.mouse_y=t.offsetY}),this.S=this._.getContext("2d")}q(t=0){for(let i=0;i<1e4;i++)if(!this.t[i])return this.t[i]=t,i;throw Error("No more entities available.")}K(e){let o=performance.now();(function(e,o){"play"===e.T&&e.InputEvent.mouse_0_up&&e.$({m:[e.U.mouse_x,e.U.mouse_y],p:[i(5,`hsla(${n(0,359)}, 90%, 60%, 0.5)`),t(5,1),u(40),a(3)]})})(this),function(t,i){for(let i=0;i<t.t.length;i++)41==(41&t.t[i])&&h(t,i)}(this),function(t,i){for(let n=0;n<t.t.length;n++)36==(36&t.t[n])&&f(t,n,i)}(this,e),function(t,i){for(let n=0;n<t.t.length;n++)40==(40&t.t[n])&&l(t,n,i)}(this,e),function(t,i){for(let i=0;i<t.t.length;i++)32==(32&t.t[i])&&m(t[5][i])}(this),function(t,i){for(let n=0;n<t.t.length;n++)51==(51&t.t[n])&&c(t,n,i)}(this,e),function(t,i){let n=[],e=[];for(let i=0;i<t.t.length;i++)if(33==(33&t.t[i])){let o=t[5][i],s=t[0][i];switch(s.s=0,s.u[0]=o.m[0],s.u[1]=o.m[1],s.o){case 0:n.push(s);break;case 1:e.push(s)}}for(let t=0;t<e.length;t++)r(e[t],n)}(this),function(t,i){t.S.resetTransform(),t.S.clearRect(0,0,t._.width,t._.height),t.S.fillStyle="#000",t.S.fillRect(0,0,t._.width,t._.height);for(let i=0;i<t.t.length;i++)48==(48&t.t[i])&&d(t,t[5][i],t[4][i])}(this),function(t,i){let n=v(t);n!==y&&(t.R.innerHTML=y=n)}(this),function(t,i,n){n&&(n.textContent=i.toFixed(1))}(0,performance.now()-o,document.querySelector("#frame")),function(t,i){w&&(w.textContent=(1e3*i).toFixed(1)),b&&(b.textContent=(1/i).toFixed())}(0,e);for(let t in this.InputEvent)this.InputEvent[t]=0}I(){let t=performance.now(),i=n=>{this.K((n-t)/1e3),t=n,this.D=requestAnimationFrame(i)};this.F(),i(t)}F(){cancelAnimationFrame(this.D)}$({m:t,p:i=[]}){let n=this.q();!function(t=[0,0]){return(i,n)=>{i.t[n]|=32,i[5][n]={i:n,t:[1,0,0,1,0,0],m:t,C:1}}}(t)(this,n);for(let t of i)t(this,n);return n}k(t){this.t[t]=0}};s(g,10),g.I(),window.$=(...t)=>(function(t,i,n){switch(i){case 1:t.T="play";let i=n[0];requestAnimationFrame(()=>s(t,i))}})(g,...t),window.game=g}();