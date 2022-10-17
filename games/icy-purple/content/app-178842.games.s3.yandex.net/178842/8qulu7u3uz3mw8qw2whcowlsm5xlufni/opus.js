!function(){"use strict";var e=!1,n=0,o=1,t=2,r=500,i=Math.min(4,navigator.hardwareConcurrency||2),l=window.cr_opusWasmScriptUrl||"opus.wasm.js",u=n,a=[],c=[],s=0,f=[],d=!0,p=null,w=!1,h=null;function g(){e&&console.log.apply(console,arguments)}function m(n){e&&console.takeHeapSnapshot(n)}function v(){e&&console.profileEnd("audio")}function y(r){var a,c,s;u==n&&(u=o,d&&(g("Initialising multi-worker opus decoder"),e&&console.profile("audio"),m("init"),a=function(e,n){if(e)throw new Error(e);for(var o=r||i;o--;)W(n);u=t,U()},c=/(iphone|ipod|ipad)/i.test(navigator.userAgent),s=!!window.cordova,c&&s?h?a(null,h):D(l,function(e,n){e?a(e):(h=URL.createObjectURL(new Blob(['self["IS_WKWEBVIEW"] = true;\n',n])),a(null,h))}):window.cr_opusWasmBinaryUrl?h?a(null,h):fetch(l).then(function(e){return e.text()}).then(function(e){var n='self["cr_opusWasmBinaryUrl"] = "'+window.cr_opusWasmBinaryUrl+'";\n';h=URL.createObjectURL(new Blob([n,e])),a(null,h)}).catch(function(e){a(e)}):a(null,l)))}function b(){if(u==t){g("Destroying opus decoder"),L();for(var o=0,r=f.length;o<r;o++)f[o].terminate();u=n,a.length=0,c.length=0,s=0,f.length=0,m("destroy"),e&&setTimeout(v,5e3),e&&setTimeout(m,5e3,"after completion")}}function U(){var e,n,o,t;if(d){var r=f.length;if(a.length)for(L();a.length;)t=(e=a.pop())[0],n=e[1],o=e[2],f[t%r].postMessage({id:t,buffer:n},[n]),c.push([t,o])}}function D(e,n){var o=window.cordova.file.applicationDirectory+"www/"+e;window.resolveLocalFileSystemURL(o,function(e){e.file(function(e){var t=new FileReader;t.onload=function(){n(null,t.result)},t.onerror=function(){n("Failed to read "+o)},t.readAsArrayBuffer(e)})})}function W(e){var n=new Worker(e);f.push(n),n.onmessage=k}function B(e,n,o,t){for(var i,l=0,u=c.length;l<u;l++)if(c[l][0]==e){i=c[l],c.splice(l,1);break}if(!i)throw new Error("No job with ID "+e);i[1](n,o,t),0==c.length&&(w||(p&&L(),g("Starting idle timer"),m("idle"),p=setTimeout(O,r)))}d&&(window.OpusDecoder=function(e,o){a.unshift([s++,e,o]),u==t?U():u==n&&y()},window.OpusDecoder.Initialise=function(e){w=!0,y(e)},window.OpusDecoder.Destroy=function(){b()},window.OpusDecoder.type="concurrent");var k=function(e){var n=e.data,o=n.id;switch(n.type){case"request":!function(e,n,o){D(e,function(e,t){e?n.postMessage({type:"request",id:o,error:e}):n.postMessage({type:"request",id:o,buffer:t},[t])})}(n.url,this,o);break;case"error":B(o,n.value,null);break;case"complete":B(o,null,n.value,n.time)}};function L(){p&&(g("Cancelling idle timer"),clearTimeout(p),p=null)}var O=function(){p&&(g("Completing idle timer"),p=null,b())}}();