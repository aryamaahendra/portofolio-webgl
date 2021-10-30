var G=Object.defineProperty;var W=(s,e,a)=>e in s?G(s,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[e]=a;var h=(s,e,a)=>(W(s,typeof e!="symbol"?e+"":e,a),a);import{V as y,S as J,C as q,R as $,P as Y,W as X,T as K,G as Q,a as Z,b as L,c,M as O,A as ee,B as te,d as ae,r as d,o as ne,g as C,e as se,f as b,h as E,i as l,t as m,w as R,F as oe,j as S,k as re}from"./vendor.f14a7c38.js";const ie=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}};ie();const le=`
uniform float time;
varying vec2 vUv;
varying vec3 vNormal;
uniform vec2 aOffset;
float PI = 3.1415926535897932384626433832795;

void main() {
   vUv = uv;
   vNormal = normalize(normalMatrix * normal);
   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
`,he=`
uniform sampler2D aTexture;
uniform float onHover;
uniform vec3 cAtmosphere;
uniform vec2 aOffset;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
   float intensity = 1. - dot(vNormal, vec3(0.0, 0.0, 1.0));
   vec3 atmosphere = cAtmosphere * pow(intensity, 1.25);
   vec4 planet = texture2D(aTexture, vUv);
   // gl_FragColor = planet;
   gl_FragColor = vec4(atmosphere + planet.xyz, 1.);
}
`,ce=`
uniform float time;
varying vec2 vUv;
varying vec3 vNormal;
uniform vec2 aOffset;
float PI = 3.1415926535897932384626433832795;

void main() {
   vUv = uv;
   vNormal = normalize(normalMatrix * normal);
   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
`,de=`
uniform sampler2D aTexture;
uniform vec3 cAtmosphere;
uniform float onHover;
uniform vec2 aOffset;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
   float intensity = 0.4 - dot(vNormal, vec3(0.0, 0.0, 1.0));
   gl_FragColor = vec4(cAtmosphere, 1.) * pow(intensity, 2.);
}
`;class ue{constructor(e){h(this,"mouse",new y);h(this,"startMouse",new y);h(this,"scene",new J);h(this,"camera");h(this,"renderer");h(this,"clock",new q);h(this,"planets",[]);h(this,"planetMaterials",[]);h(this,"atmosphreMaterials",[]);h(this,"raycaster",new $);this.camera=new Y(30,window.innerWidth/window.innerHeight,.01,100),this.camera.position.x=0,this.camera.position.y=0,this.camera.position.z=14,this.scene.add(this.camera),this.renderer=new X({antialias:!0,canvas:e,alpha:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(0,0),this.loatLight(),this.loadPlanet(),this.clock.start(),this.loadPlanetstexture()}loadPlanetstexture(){const e=["sun.jpg","mercury.jpg","venus.jpg","earth.jpg","mars.jpg","jupiter.jpg","saturn.jpg","uranus.jpg","neptune.jpg"],a=[new c(1,.57,.129),new c(.498,.498,.498),new c(.6,.286,.09),new c(.3,.6,1),new c(.815,.388,.25),new c(.6,.477,.286),new c(.988,.917,.811),new c(.6,.6,1),new c(0,0,1)],t=new K;for(let n=0;n<e.length;n++)t.load(`/assets/img/${e[n]}`,o=>{this.planetMaterials[n].uniforms.aTexture.value=o,this.planetMaterials[n].uniforms.cAtmosphere.value=a[n],this.atmosphreMaterials[n].uniforms.cAtmosphere.value=a[n]})}loadPlanet(){for(let e=0;e<9;e++){const a=new Q,t=new Z(1,64,64),n=new L({extensions:{derivatives:!0},uniforms:{aTexture:{value:null},aOffset:{value:new y},cAtmosphere:{value:new c},time:{value:0},onHover:{value:0}},vertexShader:le,fragmentShader:he});this.planetMaterials.push(n);const o=new O(t,n);a.add(o);const i=new L({extensions:{derivatives:!0},uniforms:{aOffset:{value:new y},cAtmosphere:{value:new c},time:{value:0},onHover:{value:0}},vertexShader:ce,fragmentShader:de,blending:ee,side:te});this.atmosphreMaterials.push(i);const p=new O(t,i);p.scale.set(1.15,1.15,1.15),a.add(p),a.position.x=(e-3)*3.5,a.position.y=1,this.scene.add(a),this.planets.push(a)}}loatLight(){}planetSelected(e){for(let a=0;a<this.planets.length;a++)a!==e&&(this.planets[a].visible=!1);this.planets[e].position.x=3,this.planets[e].position.y=0,this.planets[e].scale.set(2.5,2.5,2.5)}backSelectPlanet(){for(let e=0;e<this.planets.length;e++)this.planets[e].visible=!0,this.planets[e].position.y=1}isMouseOnObject(e){return this.raycaster.intersectObjects(this.planets[e].children).length>0}windowResized(){this.camera.aspect=window.innerWidth/window.innerHeight,this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1)),this.camera.updateProjectionMatrix()}render(e,a){if(this.clock.getElapsedTime(),this.raycaster.setFromCamera(this.mouse,this.camera),a){const t=-Math.round(e)+3;this.planets[t].rotation.y+=(this.startMouse.x-this.planets[t].rotation.y)*.025,this.planets[t].rotation.x<=.5&&this.planets[t].rotation.x>=-.5&&(this.planets[t].rotation.x+=(this.startMouse.y-this.planets[t].rotation.x)*.025),this.planets[t].rotation.x>.5&&(this.planets[t].rotation.x=.5),this.planets[t].rotation.x<-.5&&(this.planets[t].rotation.x=-.5)}else{for(let t=0;t<this.planets.length;t++){const n=-e+3;let o=Math.min(Math.abs(n-t),1);o=1-o**2;const i=1+.45*o;this.planets[t].position.x=(t-3)*3.85+e*3.85,this.planets[t].scale.set(i,i,i)}this.planets[-Math.round(e)+3].rotation.y-=.005}this.renderer.render(this.scene,this.camera)}}const x=["The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma,[18][19] heated to incandescence by nuclear fusion reactions in its core, radiating the energy mainly as visible light, ultraviolet light, and infrared radiation. It is by far the most important source of energy for life on Earth. Its diameter is about 1.39 million kilometres (864,000 miles), or 109 times that of Earth. Its mass is about 330,000 times that of Earth; it accounts for about 99.86% of the total mass of the Solar System.[20] Roughly three quarters of the Sun's mass consists of hydrogen (~73%); the rest is mostly helium (~25%), with much smaller quantities of heavier elements, including oxygen, carbon, neon and iron.","Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. It is named after the Roman god Mercurius (Mercury), god of commerce, messenger of the gods, and mediator between gods and mortals, corresponding to the Greek god Hermes (\u1F19\u03C1\u03BC\u1FC6\u03C2). Like Venus, Mercury orbits the Sun within Earth's orbit as an inferior planet, and its apparent distance from the Sun as viewed from Earth never exceeds 28\xB0. This proximity to the Sun means the planet can only be seen near the western horizon after sunset or the eastern horizon before sunrise, usually in twilight. At this time, it may appear as a bright star-like object, but is more difficult to observe than Venus. From Earth, the planet telescopically displays the complete range of phases, similar to Venus and the Moon, which recurs over its synodic period of approximately 116 days.","Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasions, visible to the naked eye in broad daylight.[17][18] Venus lies within Earth's orbit, and so never appears to venture far from the Sun, either setting in the west just after dusk or rising in the east a little while before dawn. Venus orbits the Sun every 224.7 Earth days.[19] It has a synodic day length of 117 Earth days and a sidereal rotation period of 243 Earth days. As a consequence, it takes longer to rotate about its axis than any other planet in the Solar System, and does so in the opposite direction to all but Uranus. This means the Sun rises in the west and sets in the east.[20] Venus does not have any moons, a distinction it shares only with Mercury among the planets in the Solar System.","Earth is the third planet from the Sun and the only astronomical object known to harbour and support life. 29.2% of Earth's surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere. Much of Earth's polar regions are covered in ice. Earth's outer layer is divided into several rigid tectonic plates that migrate across the surface over many millions of years, while its interior remains active with a solid iron inner core, a liquid outer core that generates Earth's magnetic field, and a convective mantle that drives plate tectonics.","Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the Red Planet.[17][18] The latter refers to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance (as shown), that is distinctive among the astronomical bodies visible to the naked eye.[19] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.","Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, but slightly less than one-thousandth the mass of the Sun. Jupiter is the third-brightest natural object in the Earth's night sky after the Moon and Venus. It has been observed since pre-historic times and is named after the Roman god Jupiter, the king of the gods, because of its observed size.","Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth.[22][23] It only has one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive.[24][25][26] Saturn is named after the Roman god of wealth and agriculture. Its astronomical symbol (\u2644) has been traced back to the Greek Oxyrhynchus Papyri, where it can be seen to be a Greek kappa-rho with a cross-bar, as an abbreviation for \u039A\u03C1\u03BF\u03BD\u03BF\u03C2 (Cronos), the Greek name for the planet.[27] It later came to look like a lower-case Greek eta, with the cross added at the top in the 16th century.","Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the great-grandfather of Ares (Mars), grandfather of Zeus (Jupiter) and father of Cronus (Saturn). It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is similar in composition to Neptune, and both have bulk chemical compositions which differ from that of the larger gas giants Jupiter and Saturn. For this reason, scientists often classify Uranus and Neptune as ice giants to distinguish them from the other giant planets. Uranus's atmosphere is similar to Jupiter's and Saturn's in its primary composition of hydrogen and helium, but it contains more ices such as water, ammonia, and methane, along with traces of other hydrocarbons.[17] It has the coldest planetary atmosphere in the Solar System, with a minimum temperature of 49 K (\u2212224 \xB0C; \u2212371 \xB0F), and has a complex, layered cloud structure with water thought to make up the lowest clouds and methane the uppermost layer of clouds.[17] The interior of Uranus is mainly composed of ices and rock.","Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, slightly more massive than its near-twin Uranus. Neptune is denser and physically smaller than Uranus because its greater mass causes more gravitational compression of its atmosphere. The planet orbits the Sun once every 164.8 years at an average distance of 30.1 AU (4.5 billion km; 2.8 billion mi). It is named after the Roman god of the sea and has the astronomical symbol \u2646, a stylised version of the god Neptune's trident or the Greek letter psi."];var me=(s,e)=>{for(const[a,t]of e)s[a]=t;return s};const pe=ae({setup(){const s=d(),e=d("Scroll to change planet");let a,t=0,n=0,o=0;const i=d(!1),p=d(!1);let M=!1,f=!1;const u={x:0,y:0},g={x:0,y:0},w={x:0,y:0},I=.1,z=["sun","mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"];let j=d("earh"),P=d(x[3].substr(0,250)+"..."),_=d(x[3]);ne(()=>{console.log(V()),V()==="desktop"&&(A(),p.value=!0,a=new ue(s.value),window.addEventListener("resize",N),window.addEventListener("wheel",T),window.addEventListener("mousedown",r=>{M=a.isMouseOnObject(-n+3),w.x=r.clientX-innerWidth/2,w.y=r.clientY-innerHeight/2,g.x=u.x,g.y=u.y}),window.addEventListener("mousemove",B),window.addEventListener("mouseup",r=>{M=!1}),U())});const A=()=>{const r=C.timeline();r.to(".note-container",{transform:"translate(-50%, 25%)",duration:1.5}),r.to(".note-container",{transform:"translate(-50%, -150%)",duration:1},">4.5")};se(()=>{window.removeEventListener("resize",N)});const T=r=>{f||(o+=r.deltaY*5e-4)},B=r=>{if(M){const k=r.clientX-innerWidth/2,v=r.clientY-innerHeight/2;u.x=g.x+(k-w.x)*.01,u.y=g.y+(v-w.y)*.01,a.startMouse.x=u.x,a.startMouse.y=u.y}a.mouse.x=r.clientX/window.innerWidth*2-1,a.mouse.y=-(r.clientY/window.innerHeight)*2+1},N=()=>{a.windowResized()},D=()=>{f=!0;const r=C.timeline();r.to(".transition-box",{transform:"translate(0, 0%)",duration:1,ease:"power4.out",onComplete:()=>{a.planetSelected(-n+3),i.value=!0}}),r.to(".transition-box",{transform:"translate(0, 100%)",duration:2,ease:"power4.in",onComplete:()=>{e.value="Drag planet to rotate",A()}},"-=.5")},H=()=>{const r=C.timeline();r.to(".transition-box",{transform:"translate(0, 0%)",duration:1,ease:"power4.out",onComplete:()=>{a.backSelectPlanet(),f=!1,i.value=!1}}),r.to(".transition-box",{transform:"translate(0, -100%)",duration:2,ease:"power4.in"},"-=.5")},V=()=>{const r=window.matchMedia("(max-device-width: 1050px) and (max-device-height: 1400px)");window.matchMedia("(max-device-width: 1400px) and (max-device-height: 1050px)");const k=window.matchMedia("(max-device-width: 600px) and (max-device-height: 900px)");let v="desktop";return F(r)&&(v="tablet-potrait"),F(k)&&(v="mobile"),v},F=r=>!!r.matches,U=()=>{f||(t+=o,o*=.75,t=(1-I)*t+I*Math.round(t),t<-5.399999&&(t=-5.399999),t>3.3999999&&(t=3.399999),Math.round(t)!==n&&(n=Math.round(t),j.value=z[-n+3],P.value=x[-n+3].substr(0,250)+"...",_.value=x[-n+3])),a.render(t,f),window.requestAnimationFrame(U)};return{canvas:s,planet:j,planetDesc:P,readMore:D,hideContent:i,planetDetails:_,backSelecPlanet:H,isDesktop:p,noteMsg:e}}}),fe=l("div",{class:"transition-box"},null,-1),ve={key:0,class:"only-for-pc"},ge=l("h1",null,"Only For PC",-1),we=[ge],ye={class:"note-container"},be={ref:"canvas",class:"webgl"},Se={key:1,class:"content_wrapper"},xe={class:"wrapper"},Me={key:2,class:"content-details-container"},ke={class:"content-details"},Ce={class:"title-wrapper"},Ee=l("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"long-arrow-alt-left",class:"svg-inline--fa fa-long-arrow-alt-left fa-w-14",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"},[l("path",{fill:"currentColor",d:"M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"})],-1),Ie=[Ee];function je(s,e,a,t,n,o){return S(),b(oe,null,[fe,s.isDesktop?E("",!0):(S(),b("div",ve,we)),l("div",ye,[l("p",null,m(s.noteMsg),1)]),l("canvas",be,null,512),s.hideContent?E("",!0):(S(),b("div",Se,[l("div",xe,[l("h1",null,m(s.planet),1),l("p",null,m(s.planetDesc),1),l("a",{href:"#",onClick:e[0]||(e[0]=R((...i)=>s.readMore&&s.readMore(...i),["prevent"]))},"More about "+m(s.planet),1)])])),s.hideContent?(S(),b("div",Me,[l("div",ke,[l("div",Ce,[l("a",{href:"#",onClick:e[1]||(e[1]=R((...i)=>s.backSelecPlanet&&s.backSelecPlanet(...i),["prevent"]))},Ie),l("h1",null,m(s.planet),1)]),l("p",null,m(s.planetDetails),1)])])):E("",!0)],64)}var Pe=me(pe,[["render",je]]);re(Pe).mount("#app");