/**
 * The JSON encode/decode feature
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
(function(S){var b={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\': '\\\\'},q=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function a(s){return s.replace(q,function(c){return b[c]||'\\u'+('0000'+c.charCodeAt(0).toString(16)).slice(-4)})};S.toJSON=function(){return '"'+a(this)+'"'}})(String.prototype);(function(D){var z=function(n){return(n<10?'0':'')+n};D.toJSON=function(){return this.getUTCFullYear()+'-'+z(this.getUTCMonth()+1)+'-'+z(this.getUTCDate())+'T'+z(this.getUTCHours())+':'+z(this.getUTCMinutes())+':'+z(this.getUTCSeconds())+'Z'}})(Date.prototype);Number.prototype.toJSON=function(){return String(this+0)};Boolean.prototype.toJSON=function(){return String(this)};Array.prototype.toJSON=function(){return '['+this.map(JSON.encode).join(',')+']'};if(window['Hash'])window['Hash'].prototype.toJSON=function(){return window['JSON'].encode(this.toObject())};var JSON={encode:function(v){var r;if(v===null)r='null';else if(v.toJSON)r=v.toJSON();else if(isHash(v)){r=[];for(var k in v)r.push(k.toJSON()+":"+JSON.encode(v[k]));r='{'+r+'}'}else throw "JSON can't encode: "+v;return r},cx:/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,decode:function(s){if(isString(s)&&s){s=s.replace(JSON.cx,function(b){return '\\u'+('0000'+b.charCodeAt(0).toString(16)).slice(-4)});if(/^[\],:{}\s]*$/.test(s.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'')))return eval('('+s+')')}throw "JSON parse error: "+s}};if(window['Cookie'])(function(C){var a=C.set,o=C.get;$ext(C,{set:function(v){return a.call(this,JSON.encode(v))},get:function(){return JSON.decode(o.call(this))}})})(Cookie.prototype);Xhr.prototype.sanitizedJSON=function(){try{return JSON.decode(this.text)}catch(e){if(this.secureJSON)throw e;else return null}};