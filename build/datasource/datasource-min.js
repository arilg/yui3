YUI.add("datasource-base",function(D){D.namespace("DataSource");var C=D.DataSource,A=D.Lang,B=function(){B.superclass.constructor.apply(this,arguments);};D.mix(C,{_tId:0,ERROR_DATANULL:0,ERROR_DATAINVALID:1});D.mix(B,{NAME:"DataSource.Base",ATTRS:{source:{value:null},ERROR_DATAINVALID:{value:"Invalid data"},ERROR_DATANULL:{value:"Null data"}},issueCallback:function(F){if(F.callback){var G=F.callback.scope||window,E=(F.error&&F.callback.failure)||F.callback.success;if(E){E.apply(G,[F]);}}}});D.extend(B,D.Base,{_queue:null,initializer:function(){this._queue={interval:null,conn:null,requests:[]};this._initEvents();},destructor:function(){},_initEvents:function(){this.publish("request",{defaultFn:this._handleRequest});this.publish("data",{defaultFn:this._handleData});this.publish("response",{defaultFn:this._handleResponse});},_handleRequest:function(F,G){var E=this.get("source");if(A.isUndefined(E)){G.error=true;}if(G.error){this.fire("error",null,G);}this.fire("data",null,D.mix(G,{data:E}));},_handleData:function(E,F){F.results=F.data;if(!F.results){F.results=[];}if(!F.meta){F.meta={};}this.fire("response",null,F);},_handleResponse:function(E,F){B.issueCallback(F);},sendRequest:function(E,G){var F=C._tId++;this.fire("request",null,{tId:F,request:E,callback:G});return F;}});C.Base=B;},"@VERSION@",{requires:["base"]});YUI.add("datasource-local",function(B){var A=B.Lang,C=function(){C.superclass.constructor.apply(this,arguments);};B.mix(C,{NAME:"DataSource.Local",ATTRS:{}});B.extend(C,B.DataSource.Base,{});B.DataSource.Local=C;},"@VERSION@",{requires:["datasource-base"]});YUI.add("datasource-xhr",function(C){var A=C.Lang,B=function(){B.superclass.constructor.apply(this,arguments);};C.mix(B,{NAME:"DataSource.XHR",ATTRS:{io:{value:C.io}}});C.extend(B,C.DataSource.Base,{_handleRequest:function(F,G){var E=this.get("source"),D={on:{success:function(J,H,I){this.fire("data",null,C.mix(I,{data:H}));},failure:function(J,H,I){I.error=true;this.fire("error",null,C.mix(I,{data:H}));this.fire("data",null,C.mix(I,{data:H}));}},context:this,arguments:{tId:G.tId,request:G.request,callback:G.callback}};this.get("io")(E,D);return G.tId;}});C.DataSource.XHR=B;},"@VERSION@",{requires:["datasource-base"]});YUI.add("datasource-cache",function(D){var C=D.Lang,B=D.DataSource.Base,A=function(){};A.ATTRS={cache:{value:null,validator:function(E){return((E instanceof D.Cache)||(E===null));},set:function(E){this.on("request",this._beforeRequest);this.on("response",this._beforeResponse);}}};A.prototype={_beforeRequest:function(F,G){var E=(this.get("cache")&&this.get("cache").retrieve(G.request,G.callback))||null;if(E&&E.response){F.stopImmediatePropagation();this.fire("response",null,D.mix(G,E.response));}},_beforeResponse:function(E,F){if(this.get("cache")){this.get("cache").add(F.request,F,(F.callback&&F.callback.argument));}}};D.Base.build(B,[A],{dynamic:false});},"@VERSION@",{requires:["datasource-base"]});YUI.add("datasource-dataparser",function(D){var C=D.Lang,B=D.DataSource.Base,A=function(){};A.ATTRS={parser:{value:null,validator:function(E){return((E instanceof D.DataParser.Base)||(E===null));}}};A.prototype={_handleData:function(F,G){var E=(this.get("parser")&&this.get("parser").parse(G.data));if(!E){E={meta:{},results:G.data};}this.fire("response",null,D.mix(G,E));}};D.Base.build(B,[A],{dynamic:false});},"@VERSION@",{requires:["datasource","dataparser"]});YUI.add("datasource-polling",function(D){var B=D.Lang,A=D.DataSource.Base,C=function(){};C.prototype={_intervals:null,setInterval:function(G,F,I){if(B.isNumber(G)&&(G>=0)){var E=this,H=setInterval(function(){E.sendRequest(F,I);},G);if(!this._intervals){this._intervals=[];}this._intervals.push(H);return H;}else{}},clearInterval:function(G){var F=this._intervals||[],E=F.length-1;for(;E>-1;E--){if(F[E]===G){F.splice(E,1);clearInterval(G);}}}};D.Base.build(A,[C],{dynamic:false});},"@VERSION@",{requires:["datasource-base"]});YUI.add("datasource",function(A){},"@VERSION@",{use:["datasource-base","datasource-local","datasource-xhr","datasource-cache","datasource-dataparser","datasource-polling"]});