YUI.add("history-html5",function(C){var B=C.HistoryBase;function A(){A.superclass.constructor.apply(this,arguments);}C.extend(A,B,{_init:function(D){},_storeState:function(E,D){}},{NAME:"historyhtml5"});C.HistoryHTML5=A;if(!C.History&&B.html5){C.History=A;}},"@VERSION@",{requires:["history-base"],supersedes:["history-deprecated"]});