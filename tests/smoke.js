const fs=require('fs'),vm=require('vm');
const R=process.env.REPO||'/home/claude/toiec990';
const els={};const mk=id=>({id,style:{},hidden:false,value:'',innerHTML:'',textContent:'',setAttribute(){},getAttribute(){return null},querySelectorAll(){return[]}});
const g=id=>els[id]||(els[id]=Object.assign(mk(id),{classList:{add(){}}}));
const sb={console,Math,Date,JSON,Set,Map,Object,Array,String,Number,RegExp,Promise,setTimeout,clearTimeout,setInterval,clearInterval,
document:{getElementById:g,querySelectorAll:()=>[0,1,2,3].map(()=>({classList:{add(){}},textContent:'',disabled:false})),createElement:()=>mk('t'),addEventListener(){},body:mk('b'),documentElement:mk('h'),createTreeWalker:()=>({nextNode:()=>false})},
localStorage:{getItem:()=>null,setItem(){},removeItem(){}},MutationObserver:class{observe(){}disconnect(){}takeRecords(){return[]}},NodeFilter:{SHOW_TEXT:4},
alert(){},confirm(){return true},speechSynthesis:{cancel(){},speak(){},getVoices:()=>[]},SpeechSynthesisUtterance:class{constructor(t){this.text=t}},URL:{createObjectURL(){}},Blob:class{},FileReader:class{},fetch:()=>Promise.reject(new Error('offline'))};
sb.window=sb;sb.window.scrollTo=()=>{};sb.window.addEventListener=()=>{};
const ctx=vm.createContext(sb);
vm.runInContext(fs.readFileSync(R+'/vocab.js','utf8'),ctx);
vm.runInContext(fs.readFileSync(R+'/index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],ctx);
let bad=0;
for (const r of ['home','vocab','grammar','reading','listen','dictation','mock','fulltest','analysis','parts','content','ai']) {
  try { vm.runInContext(`route('${r}')`,ctx); const h=g('app').innerHTML; if(!h||/undefined|NaN/.test(h.replace(/<option[^>]*>/g,''))) {bad++; console.log('suspicious', r);} else console.log('ok  ', r, h.length);}
  catch(e){bad++; console.log('FAIL', r, e.message);}
}
vm.runInContext(`route('reading'); pickAt(0,0); toggleScroll(); nextQ();`,ctx); console.log('ok   reading pick/next');
vm.runInContext(`route('listen'); toggleRealListen(false); toggleRealListen(true);`,ctx); console.log('ok   listen toggle');
process.exitCode = bad?1:0;
