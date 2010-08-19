YUI.add("transition-timer",function(C){var A="transition:propertyEnd",B=C.Transition;C.mix(B.prototype,{_start:function(){if(B.useNative){this._runNative();}else{this._runTimer();}},_runTimer:function(){var D=this;D._initAttrs();B._running[C.stamp(D)]=D;D._startTime=new Date();B._startTimer();},_end:function(){delete B._running[C.stamp(this)];this._running=false;this._startTime=null;},_runFrame:function(){var D=new Date()-this._startTime;this._runAttrs(D);},_runAttrs:function(H){var K=this,I=K._node,O=C.stamp(I),R=B._nodeAttrs[O],G=B.behaviors,L=false,E=false,S=K._callback,D,F,J,Q,N,P,T,M;for(D in R){F=R[D];if((F&&F.transition===K)){P=F.duration;N=F.delay;Q=H/1000;T=H;J=(M in G&&"set" in G[M])?G[M].set:B.DEFAULT_SETTER;L=(T>=P);if(T>P){T=P;}if(!N||H>=N){J(K,D,F.from,F.to,T-N,P-N,F.easing,F.unit);if(L){delete R[D];K._count--;if(!E&&K._count<=0){E=true;K._end();if(S){K._callback=null;S.call(I,{elapsedTime:(H-N)/1000});}}}}}}},_initAttrs:function(){var K=this,F=B.behaviors,M=C.stamp(this._node),R=B._nodeAttrs[M],E,J,L,O,H,D,Q,G,I;for(D in R){E=R[D];if(R.hasOwnProperty(D)&&(E&&E.transition===K)){J=E.duration*1000;L=E.delay*1000;O=E.easing;H=E.value;G=(D in F&&"get" in F[D])?F[D].get(K,D):B.DEFAULT_GETTER(K,D);var P=B.RE_UNITS.exec(G);var N=B.RE_UNITS.exec(H);G=P?P[1]:G;I=N?N[1]:H;Q=N?N[2]:P?P[2]:"";if(!Q&&B.RE_DEFAULT_UNIT.test(D)){Q=B.DEFAULT_UNIT;}if(!G||!I){return;}if(typeof O==="string"){if(O.indexOf("cubic-bezier")>-1){O=O.substring(13,O.length-1).split(",");}else{if(B.easings[O]){O=B.easings[O];}}}E.from=G;E.to=I;E.unit=Q;E.easing=O;E.duration=J;E.delay=L;}}},destroy:function(){this.detachAll();this._node=null;}},true);C.mix(C.Transition,{_runtimeAttrs:{},RE_DEFAULT_UNIT:/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,DEFAULT_UNIT:"px",intervalTime:20,behaviors:{left:{get:function(E,D){return C.DOM._getAttrOffset(E._node._node,D);}}},DEFAULT_SETTER:function(G,H,J,K,M,F,I,L){J=Number(J);K=Number(K);var E=G._node,D=B.cubicBezier(I,M/F);D=J+D[0]*(K-J);if(H in E._node.style||H in C.DOM.CUSTOM_STYLES){L=L||"";E.setStyle(H,D+L);}else{if(E._node.attributes[H]){E.setAttribute(H,D);}else{E.set(H,D);}}},DEFAULT_GETTER:function(F,D){var E=F._node,G="";if(D in E._node.style||D in C.DOM.CUSTOM_STYLES){G=E.getComputedStyle(D);}else{if(E._node.attributes[D]){G=E.getAttribute(D);}else{G=E.get(D);}}return G;},_startTimer:function(){if(!B._timer){B._timer=setInterval(B._runFrame,B.intervalTime);}},_stopTimer:function(){clearInterval(B._timer);B._timer=null;},_runFrame:function(){var D=true,E;for(E in B._running){if(B._running[E]._runFrame){D=false;B._running[E]._runFrame();}}if(D){B._stopTimer();}},cubicBezier:function(X,S){var b=0,L=0,a=X[0],K=X[1],Z=X[2],J=X[3],Y=1,I=0,W=Y-3*Z+3*a-b,V=3*Z-6*a+3*b,U=3*a-3*b,T=b,R=I-3*J+3*K-L,Q=3*J-6*K+3*L,P=3*K-3*L,O=L,N=(((W*S)+V)*S+U)*S+T,M=(((R*S)+Q)*S+P)*S+O;return[N,M];},easings:{ease:[0.25,0,1,0.25],linear:[0,0,1,1],"ease-in":[0.42,0,1,1],"ease-out":[0,0,0.58,1],"ease-in-out":[0.42,0,0.58,1]},_running:{},_timer:null,RE_UNITS:/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/},true);B.behaviors.top=B.behaviors.bottom=B.behaviors.right=B.behaviors.left;C.Transition=B;},"@VERSION@",{requires:["transition-native","node-style"]});