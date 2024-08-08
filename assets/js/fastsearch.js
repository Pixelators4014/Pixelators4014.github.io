(()=>{"use strict";function t(t){return Array.isArray?Array.isArray(t):"[object Array]"===c(t)}function e(t){return"string"==typeof t}function n(t){return"number"==typeof t}function s(t){return"object"==typeof t}function i(t){return null!=t}function r(t){return!t.trim().length}function c(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const o=t=>`Missing ${t} property in key`,a=t=>`Property 'weight' in key '${t}' must be a positive integer`,h=Object.prototype.hasOwnProperty;class l{constructor(t){this._keys=[],this._keyMap={};let e=0;t.forEach((t=>{let n=u(t);this._keys.push(n),this._keyMap[n.id]=n,e+=n.weight})),this._keys.forEach((t=>{t.weight/=e}))}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function u(n){let s=null,i=null,r=null,c=1,l=null;if(e(n)||t(n))r=n,s=d(n),i=g(n);else{if(!h.call(n,"name"))throw new Error(o("name"));const t=n.name;if(r=t,h.call(n,"weight")&&(c=n.weight,c<=0))throw new Error(a(t));s=d(t),i=g(t),l=n.getFn}return{path:s,id:i,weight:c,src:r,getFn:l}}function d(e){return t(e)?e:e.split(".")}function g(e){return t(e)?e.join("."):e}var f={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(r,o){let a=[],h=!1;const l=(r,o,u)=>{if(i(r))if(o[u]){const d=r[o[u]];if(!i(d))return;if(u===o.length-1&&(e(d)||n(d)||function(t){return!0===t||!1===t||function(t){return s(t)&&null!==t}(t)&&"[object Boolean]"==c(t)}(d)))a.push(function(t){return null==t?"":function(t){if("string"==typeof t)return t;let e=t+"";return"0"==e&&1/t==-1/0?"-0":e}(t)}(d));else if(t(d)){h=!0;for(let t=0,e=d.length;t<e;t+=1)l(d[t],o,u+1)}else o.length&&l(d,o,u+1)}else a.push(r)};return l(r,e(o)?o.split("."):o,0),h?a:a[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};const p=/[^ ]+/g;class m{constructor({getFn:t=f.getFn,fieldNormWeight:e=f.fieldNormWeight}={}){this.norm=function(t=1,e=3){const n=new Map,s=Math.pow(10,e);return{get(e){const i=e.match(p).length;if(n.has(i))return n.get(i);const r=1/Math.pow(i,.5*t),c=parseFloat(Math.round(r*s)/s);return n.set(i,c),c},clear(){n.clear()}}}(e,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach(((t,e)=>{this._keysMap[t.id]=e}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,e(this.docs[0])?this.docs.forEach(((t,e)=>{this._addString(t,e)})):this.docs.forEach(((t,e)=>{this._addObject(t,e)})),this.norm.clear())}add(t){const n=this.size();e(t)?this._addString(t,n):this._addObject(t,n)}removeAt(t){this.records.splice(t,1);for(let e=t,n=this.size();e<n;e+=1)this.records[e].i-=1}getValueForItemAtKeyId(t,e){return t[this._keysMap[e]]}size(){return this.records.length}_addString(t,e){if(!i(t)||r(t))return;let n={v:t,i:e,n:this.norm.get(t)};this.records.push(n)}_addObject(n,s){let c={i:s,$:{}};this.keys.forEach(((s,o)=>{let a=s.getFn?s.getFn(n):this.getFn(n,s.path);if(i(a))if(t(a)){let n=[];const s=[{nestedArrIndex:-1,value:a}];for(;s.length;){const{nestedArrIndex:c,value:o}=s.pop();if(i(o))if(e(o)&&!r(o)){let t={v:o,i:c,n:this.norm.get(o)};n.push(t)}else t(o)&&o.forEach(((t,e)=>{s.push({nestedArrIndex:e,value:t})}))}c.$[o]=n}else if(e(a)&&!r(a)){let t={v:a,n:this.norm.get(a)};c.$[o]=t}})),this.records.push(c)}toJSON(){return{keys:this.keys,records:this.records}}}function y(t,e,{getFn:n=f.getFn,fieldNormWeight:s=f.fieldNormWeight}={}){const i=new m({getFn:n,fieldNormWeight:s});return i.setKeys(t.map(u)),i.setSources(e),i.create(),i}function M(t,{errors:e=0,currentLocation:n=0,expectedLocation:s=0,distance:i=f.distance,ignoreLocation:r=f.ignoreLocation}={}){const c=e/t.length;if(r)return c;const o=Math.abs(s-n);return i?c+o/i:o?1:c}const x=32;function L(t){let e={};for(let n=0,s=t.length;n<s;n+=1){const i=t.charAt(n);e[i]=(e[i]||0)|1<<s-n-1}return e}class k{constructor(t,{location:e=f.location,threshold:n=f.threshold,distance:s=f.distance,includeMatches:i=f.includeMatches,findAllMatches:r=f.findAllMatches,minMatchCharLength:c=f.minMatchCharLength,isCaseSensitive:o=f.isCaseSensitive,ignoreLocation:a=f.ignoreLocation}={}){if(this.options={location:e,threshold:n,distance:s,includeMatches:i,findAllMatches:r,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:a},this.pattern=o?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const h=(t,e)=>{this.chunks.push({pattern:t,alphabet:L(t),startIndex:e})},l=this.pattern.length;if(l>x){let t=0;const e=l%x,n=l-e;for(;t<n;)h(this.pattern.substr(t,x),t),t+=x;if(e){const t=l-x;h(this.pattern.substr(t),t)}}else h(this.pattern,0)}searchIn(t){const{isCaseSensitive:e,includeMatches:n}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let e={isMatch:!0,score:0};return n&&(e.indices=[[0,t.length-1]]),e}const{location:s,distance:i,threshold:r,findAllMatches:c,minMatchCharLength:o,ignoreLocation:a}=this.options;let h=[],l=0,u=!1;this.chunks.forEach((({pattern:e,alphabet:d,startIndex:g})=>{const{isMatch:p,score:m,indices:y}=function(t,e,n,{location:s=f.location,distance:i=f.distance,threshold:r=f.threshold,findAllMatches:c=f.findAllMatches,minMatchCharLength:o=f.minMatchCharLength,includeMatches:a=f.includeMatches,ignoreLocation:h=f.ignoreLocation}={}){if(e.length>x)throw new Error("Pattern length exceeds max of 32.");const l=e.length,u=t.length,d=Math.max(0,Math.min(s,u));let g=r,p=d;const m=o>1||a,y=m?Array(u):[];let L;for(;(L=t.indexOf(e,p))>-1;){let t=M(e,{currentLocation:L,expectedLocation:d,distance:i,ignoreLocation:h});if(g=Math.min(t,g),p=L+l,m){let t=0;for(;t<l;)y[L+t]=1,t+=1}}p=-1;let k=[],v=1,S=l+u;const _=1<<l-1;for(let s=0;s<l;s+=1){let r=0,o=S;for(;r<o;)M(e,{errors:s,currentLocation:d+o,expectedLocation:d,distance:i,ignoreLocation:h})<=g?r=o:S=o,o=Math.floor((S-r)/2+r);S=o;let a=Math.max(1,d-o+1),f=c?u:Math.min(d+o,u)+l,x=Array(f+2);x[f+1]=(1<<s)-1;for(let r=f;r>=a;r-=1){let c=r-1,o=n[t.charAt(c)];if(m&&(y[c]=+!!o),x[r]=(x[r+1]<<1|1)&o,s&&(x[r]|=(k[r+1]|k[r])<<1|1|k[r+1]),x[r]&_&&(v=M(e,{errors:s,currentLocation:c,expectedLocation:d,distance:i,ignoreLocation:h}),v<=g)){if(g=v,p=c,p<=d)break;a=Math.max(1,2*d-p)}}if(M(e,{errors:s+1,currentLocation:d,expectedLocation:d,distance:i,ignoreLocation:h})>g)break;k=x}const w={isMatch:p>=0,score:Math.max(.001,v)};if(m){const t=function(t=[],e=f.minMatchCharLength){let n=[],s=-1,i=-1,r=0;for(let c=t.length;r<c;r+=1){let c=t[r];c&&-1===s?s=r:c||-1===s||(i=r-1,i-s+1>=e&&n.push([s,i]),s=-1)}return t[r-1]&&r-s>=e&&n.push([s,r-1]),n}(y,o);t.length?a&&(w.indices=t):w.isMatch=!1}return w}(t,e,d,{location:s+g,distance:i,threshold:r,findAllMatches:c,minMatchCharLength:o,includeMatches:n,ignoreLocation:a});p&&(u=!0),l+=m,p&&y&&(h=[...h,...y])}));let d={isMatch:u,score:u?l/this.chunks.length:1};return u&&n&&(d.indices=h),d}}class v{constructor(t){this.pattern=t}static isMultiMatch(t){return S(t,this.multiRegex)}static isSingleMatch(t){return S(t,this.singleRegex)}search(){}}function S(t,e){const n=t.match(e);return n?n[1]:null}class _ extends v{constructor(t,{location:e=f.location,threshold:n=f.threshold,distance:s=f.distance,includeMatches:i=f.includeMatches,findAllMatches:r=f.findAllMatches,minMatchCharLength:c=f.minMatchCharLength,isCaseSensitive:o=f.isCaseSensitive,ignoreLocation:a=f.ignoreLocation}={}){super(t),this._bitapSearch=new k(t,{location:e,threshold:n,distance:s,includeMatches:i,findAllMatches:r,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class w extends v{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e,n=0;const s=[],i=this.pattern.length;for(;(e=t.indexOf(this.pattern,n))>-1;)n=e+i,s.push([e,n-1]);const r=!!s.length;return{isMatch:r,score:r?0:1,indices:s}}}const C=[class extends v{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const e=t===this.pattern;return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},w,class extends v{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},class extends v{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends v{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends v{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[t.length-this.pattern.length,t.length-1]}}},class extends v{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const e=-1===t.indexOf(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},_],I=C.length,E=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,b=new Set([_.type,w.type]);const $=[];function A(t,e){for(let n=0,s=$.length;n<s;n+=1){let s=$[n];if(s.condition(t,e))return new s(t,e)}return new k(t,e)}const O="$and",F="$path",R=t=>!(!t[O]&&!t.$or),N=t=>({[O]:Object.keys(t).map((e=>({[e]:t[e]})))});function j(n,i,{auto:r=!0}={}){const c=n=>{let o=Object.keys(n);const a=(t=>!!t[F])(n);if(!a&&o.length>1&&!R(n))return c(N(n));if((e=>!t(e)&&s(e)&&!R(e))(n)){const t=a?n[F]:o[0],s=a?n.$val:n[t];if(!e(s))throw new Error((t=>`Invalid value for key ${t}`)(t));const c={keyId:g(t),pattern:s};return r&&(c.searcher=A(s,i)),c}let h={children:[],operator:o[0]};return o.forEach((e=>{const s=n[e];t(s)&&s.forEach((t=>{h.children.push(c(t))}))})),h};return R(n)||(n=N(n)),c(n)}function W(t,e){const n=t.matches;e.matches=[],i(n)&&n.forEach((t=>{if(!i(t.indices)||!t.indices.length)return;const{indices:n,value:s}=t;let r={indices:n,value:s};t.key&&(r.key=t.key.src),t.idx>-1&&(r.refIndex=t.idx),e.matches.push(r)}))}function T(t,e){e.score=t.score}class K{constructor(t,e={},n){this.options={...f,...e},this.options.useExtendedSearch,this._keyStore=new l(this.options.keys),this.setCollection(t,n)}setCollection(t,e){if(this._docs=t,e&&!(e instanceof m))throw new Error("Incorrect 'index' type");this._myIndex=e||y(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){i(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=(()=>!1)){const e=[];for(let n=0,s=this._docs.length;n<s;n+=1){const i=this._docs[n];t(i,n)&&(this.removeAt(n),n-=1,s-=1,e.push(i))}return e}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:s=-1}={}){const{includeMatches:i,includeScore:r,shouldSort:c,sortFn:o,ignoreFieldNorm:a}=this.options;let h=e(t)?e(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return function(t,{ignoreFieldNorm:e=f.ignoreFieldNorm}){t.forEach((t=>{let n=1;t.matches.forEach((({key:t,norm:s,score:i})=>{const r=t?t.weight:null;n*=Math.pow(0===i&&r?Number.EPSILON:i,(r||1)*(e?1:s))})),t.score=n}))}(h,{ignoreFieldNorm:a}),c&&h.sort(o),n(s)&&s>-1&&(h=h.slice(0,s)),function(t,e,{includeMatches:n=f.includeMatches,includeScore:s=f.includeScore}={}){const i=[];return n&&i.push(W),s&&i.push(T),t.map((t=>{const{idx:n}=t,s={item:e[n],refIndex:n};return i.length&&i.forEach((e=>{e(t,s)})),s}))}(h,this._docs,{includeMatches:i,includeScore:r})}_searchStringList(t){const e=A(t,this.options),{records:n}=this._myIndex,s=[];return n.forEach((({v:t,i:n,n:r})=>{if(!i(t))return;const{isMatch:c,score:o,indices:a}=e.searchIn(t);c&&s.push({item:t,idx:n,matches:[{score:o,value:t,norm:r,indices:a}]})})),s}_searchLogical(t){const e=j(t,this.options),n=(t,e,s)=>{if(!t.children){const{keyId:n,searcher:i}=t,r=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(e,n),searcher:i});return r&&r.length?[{idx:s,item:e,matches:r}]:[]}const i=[];for(let r=0,c=t.children.length;r<c;r+=1){const c=t.children[r],o=n(c,e,s);if(o.length)i.push(...o);else if(t.operator===O)return[]}return i},s=this._myIndex.records,r={},c=[];return s.forEach((({$:t,i:s})=>{if(i(t)){let i=n(e,t,s);i.length&&(r[s]||(r[s]={idx:s,item:t,matches:[]},c.push(r[s])),i.forEach((({matches:t})=>{r[s].matches.push(...t)})))}})),c}_searchObjectList(t){const e=A(t,this.options),{keys:n,records:s}=this._myIndex,r=[];return s.forEach((({$:t,i:s})=>{if(!i(t))return;let c=[];n.forEach(((n,s)=>{c.push(...this._findMatches({key:n,value:t[s],searcher:e}))})),c.length&&r.push({idx:s,item:t,matches:c})})),r}_findMatches({key:e,value:n,searcher:s}){if(!i(n))return[];let r=[];if(t(n))n.forEach((({v:t,i:n,n:c})=>{if(!i(t))return;const{isMatch:o,score:a,indices:h}=s.searchIn(t);o&&r.push({score:a,key:e,value:t,idx:n,norm:c,indices:h})}));else{const{v:t,n:i}=n,{isMatch:c,score:o,indices:a}=s.searchIn(t);c&&r.push({score:o,key:e,value:t,norm:i,indices:a})}return r}}K.version="7.0.0",K.createIndex=y,K.parseIndex=function(t,{getFn:e=f.getFn,fieldNormWeight:n=f.fieldNormWeight}={}){const{keys:s,records:i}=t,r=new m({getFn:e,fieldNormWeight:n});return r.setKeys(s),r.setIndexRecords(i),r},K.config=f,K.parseQuery=j,function(...t){$.push(...t)}(class{constructor(t,{isCaseSensitive:e=f.isCaseSensitive,includeMatches:n=f.includeMatches,minMatchCharLength:s=f.minMatchCharLength,ignoreLocation:i=f.ignoreLocation,findAllMatches:r=f.findAllMatches,location:c=f.location,threshold:o=f.threshold,distance:a=f.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:n,minMatchCharLength:s,findAllMatches:r,ignoreLocation:i,location:c,threshold:o,distance:a},this.pattern=e?t:t.toLowerCase(),this.query=function(t,e={}){return t.split("|").map((t=>{let n=t.trim().split(E).filter((t=>t&&!!t.trim())),s=[];for(let t=0,i=n.length;t<i;t+=1){const i=n[t];let r=!1,c=-1;for(;!r&&++c<I;){const t=C[c];let n=t.isMultiMatch(i);n&&(s.push(new t(n,e)),r=!0)}if(!r)for(c=-1;++c<I;){const t=C[c];let n=t.isSingleMatch(i);if(n){s.push(new t(n,e));break}}}return s}))}(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:s}=this.options;t=s?t:t.toLowerCase();let i=0,r=[],c=0;for(let s=0,o=e.length;s<o;s+=1){const o=e[s];r.length=0,i=0;for(let e=0,s=o.length;e<s;e+=1){const s=o[e],{isMatch:a,indices:h,score:l}=s.search(t);if(!a){c=0,i=0,r.length=0;break}if(i+=1,c+=l,n){const t=s.constructor.type;b.has(t)?r=[...r,...h]:r.push(h)}}if(i){let t={isMatch:!0,score:c/i};return n&&(t.indices=r),t}}return{isMatch:!1,score:1}}});const q={fuseOpts:{},cx:"f388e696a33d54890"};let z,H=document.getElementById("searchResults"),B=document.getElementById("searchInput"),J=document.getElementById("searchButton");function P(){if(console.log("Searching..."),H.hidden=!1,H.innerHTML='<div role="status">\n            <span class="sr-only">Searching ...</span>\n        </div>',""!==B.value){let t="https://customsearch.googleapis.com/customsearch/v1?";t+="cx="+q.cx,t+="&q="+B.value,t+="&key=AIzaSyC6y55s4OqQkyT4tp_ePjKShK7s3hRWGKc";let e=new XMLHttpRequest;e.onreadystatechange=function(t){if(4===e.readyState&&200===e.status){let t,n=JSON.parse(e.responseText);for(t of(H.innerHTML="",n.items)){console.log(t);let e=document.createElement("a");e.classList.add("block","w-full","px-4","py-2","border-b","cursor-pointer","text-black","dark:text-white","hover:text-black","hover:dark:text-white","hover:bg-slate-600"),e.href=t.link,e.ariaLabel=t.title;let n=document.createElement("div");n.innerHTML=`<h3 class="text-lg font-semibold">${t.htmlTitle}</h3>`;let s=document.createElement("div");s.classList.add("text-sm","font-normal"),s.innerHTML=`<p class="hover:text-text-primary-light hover:dark:text-text-primary-dark">${t.htmlSnippet}</p>`,e.appendChild(n),e.appendChild(s),H.appendChild(e)}}},e.open("GET",t),e.send()}}window.onload=function(){let t=new XMLHttpRequest;t.onreadystatechange=function(){if(4===t.readyState)if(200===t.status){let e=JSON.parse(t.responseText);if(e){let t={distance:100,threshold:.4,ignoreLocation:!0,keys:["title","permalink","summary","content"]};q.fuseOpts&&(t={isCaseSensitive:q.fuseOpts.iscasesensitive??!1,includeScore:q.fuseOpts.includescore??!1,includeMatches:q.fuseOpts.includematches??!1,minMatchCharLength:q.fuseOpts.minmatchcharlength??1,shouldSort:q.fuseOpts.shouldsort??!0,findAllMatches:q.fuseOpts.findallmatches??!1,keys:q.fuseOpts.keys??["title","permalink","summary","content"],location:q.fuseOpts.location??0,threshold:q.fuseOpts.threshold??.4,distance:q.fuseOpts.distance??100,ignoreLocation:q.fuseOpts.ignorelocation??!0}),console.log("Fuse.js search initialized"),z=new K(e,t)}}else console.log(t.responseText)},t.open("GET","../index.json"),t.send()},B.onkeydown=function(t){"Enter"===t.key&&P()},J.onclick=function(){P()}})();