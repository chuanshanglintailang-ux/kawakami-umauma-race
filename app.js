'use strict';
import { firebaseConfig } from './firebase-config.js';
const $=id=>document.getElementById(id);
const horses=[
{name:'イクイノックス',rating:100,style:'先行',speed:100,stamina:99,kick:99,start:94,mud:92,best:[1800,2500]},
{name:'ディープインパクト',rating:100,style:'追込',speed:100,stamina:98,kick:100,start:88,mud:90,best:[1800,3200]},
{name:'オルフェーヴル',rating:99,style:'追込',speed:98,stamina:100,kick:99,start:83,mud:96,best:[2000,3200]},
{name:'アーモンドアイ',rating:100,style:'差し',speed:100,stamina:94,kick:100,start:93,mud:90,best:[1600,2400]},
{name:'キタサンブラック',rating:99,style:'逃げ',speed:96,stamina:100,kick:94,start:99,mud:93,best:[2000,3200]},
{name:'コントレイル',rating:98,style:'差し',speed:98,stamina:97,kick:99,start:91,mud:89,best:[1800,3000]},
{name:'ジェンティルドンナ',rating:98,style:'先行',speed:98,stamina:98,kick:97,start:95,mud:92,best:[1800,2500]},
{name:'ウオッカ',rating:98,style:'差し',speed:99,stamina:93,kick:99,start:90,mud:90,best:[1600,2400]},
{name:'ロードカナロア',rating:98,style:'先行',speed:100,stamina:80,kick:99,start:98,mud:94,best:[1000,1600]},
{name:'エルコンドルパサー',rating:98,style:'先行',speed:97,stamina:98,kick:97,start:95,mud:97,best:[1600,2500]},
{name:'テイエムオペラオー',rating:98,style:'先行',speed:95,stamina:100,kick:96,start:96,mud:95,best:[2000,3200]},
{name:'ナリタブライアン',rating:98,style:'先行',speed:98,stamina:99,kick:98,start:94,mud:94,best:[1800,3200]},
{name:'シンボリルドルフ',rating:98,style:'先行',speed:97,stamina:100,kick:96,start:97,mud:93,best:[2000,3200]},
{name:'ミスターシービー',rating:96,style:'追込',speed:96,stamina:98,kick:99,start:82,mud:91,best:[1800,3200]},
{name:'トウカイテイオー',rating:97,style:'先行',speed:98,stamina:96,kick:98,start:94,mud:91,best:[1800,2500]},
{name:'スペシャルウィーク',rating:97,style:'差し',speed:96,stamina:99,kick:97,start:89,mud:92,best:[2000,3200]},
{name:'グラスワンダー',rating:97,style:'先行',speed:98,stamina:96,kick:98,start:94,mud:95,best:[1600,2500]},
{name:'サイレンススズカ',rating:97,style:'逃げ',speed:100,stamina:91,kick:96,start:100,mud:92,best:[1600,2200]},
{name:'メジロマックイーン',rating:97,style:'先行',speed:94,stamina:100,kick:93,start:96,mud:96,best:[2200,3200]},
{name:'ゴールドシップ',rating:97,style:'追込',speed:94,stamina:100,kick:97,start:77,mud:100,best:[2200,3200]},
{name:'ブエナビスタ',rating:97,style:'差し',speed:98,stamina:96,kick:100,start:88,mud:91,best:[1600,2500]},
{name:'ジャスタウェイ',rating:97,style:'差し',speed:100,stamina:91,kick:100,start:88,mud:93,best:[1600,2200]},
{name:'モーリス',rating:97,style:'先行',speed:100,stamina:88,kick:99,start:95,mud:94,best:[1400,2000]},
{name:'グランアレグリア',rating:98,style:'差し',speed:100,stamina:83,kick:100,start:91,mud:91,best:[1200,2000]},
{name:'ドウデュース',rating:97,style:'差し',speed:98,stamina:97,kick:100,start:87,mud:90,best:[1600,2500]},
{name:'リバティアイランド',rating:96,style:'差し',speed:98,stamina:96,kick:99,start:89,mud:90,best:[1600,2500]},
{name:'ソダシ',rating:95,style:'先行',speed:97,stamina:89,kick:95,start:97,mud:94,best:[1400,2000]},
{name:'デアリングタクト',rating:96,style:'差し',speed:96,stamina:96,kick:98,start:89,mud:95,best:[1600,2500]},
{name:'ラヴズオンリーユー',rating:96,style:'差し',speed:96,stamina:96,kick:98,start:90,mud:91,best:[1800,2500]},
{name:'クロノジェネシス',rating:97,style:'先行',speed:96,stamina:99,kick:96,start:95,mud:100,best:[1800,2500]},
{name:'リスグラシュー',rating:97,style:'差し',speed:97,stamina:98,kick:99,start:88,mud:95,best:[1600,2500]},
{name:'エフフォーリア',rating:96,style:'先行',speed:97,stamina:97,kick:97,start:94,mud:90,best:[1800,2500]},
{name:'タイトルホルダー',rating:96,style:'逃げ',speed:94,stamina:100,kick:91,start:100,mud:96,best:[2200,3200]},
{name:'サトノダイヤモンド',rating:96,style:'差し',speed:95,stamina:99,kick:97,start:89,mud:91,best:[2000,3200]},
{name:'シュヴァルグラン',rating:95,style:'先行',speed:93,stamina:100,kick:94,start:93,mud:93,best:[2200,3200]},
{name:'エピファネイア',rating:96,style:'先行',speed:96,stamina:99,kick:96,start:94,mud:96,best:[2000,3200]},
{name:'キズナ',rating:95,style:'差し',speed:96,stamina:97,kick:98,start:88,mud:92,best:[1800,2500]},
{name:'キングカメハメハ',rating:97,style:'先行',speed:99,stamina:94,kick:98,start:96,mud:93,best:[1600,2400]},
{name:'ハーツクライ',rating:96,style:'差し',speed:96,stamina:99,kick:98,start:88,mud:94,best:[2000,3200]},
{name:'ゼンノロブロイ',rating:95,style:'先行',speed:95,stamina:99,kick:95,start:94,mud:91,best:[2000,3200]},
{name:'アドマイヤムーン',rating:95,style:'差し',speed:97,stamina:95,kick:98,start:89,mud:94,best:[1600,2400]},
{name:'ダイワスカーレット',rating:97,style:'逃げ',speed:98,stamina:96,kick:96,start:100,mud:94,best:[1600,2500]},
{name:'メイショウサムソン',rating:95,style:'先行',speed:94,stamina:100,kick:93,start:96,mud:98,best:[2000,3200]},
{name:'ヴィクトワールピサ',rating:96,style:'先行',speed:96,stamina:97,kick:96,start:95,mud:96,best:[1800,2500]},
{name:'エイシンフラッシュ',rating:95,style:'差し',speed:96,stamina:95,kick:99,start:88,mud:93,best:[1800,2500]},
{name:'フェノーメノ',rating:95,style:'先行',speed:94,stamina:100,kick:94,start:94,mud:91,best:[2200,3200]},
{name:'ジャングルポケット',rating:95,style:'差し',speed:96,stamina:98,kick:98,start:88,mud:93,best:[2000,2500]},
{name:'マンハッタンカフェ',rating:95,style:'差し',speed:93,stamina:100,kick:96,start:86,mud:92,best:[2200,3200]},
{name:'アグネスタキオン',rating:96,style:'先行',speed:99,stamina:94,kick:99,start:95,mud:93,best:[1600,2400]},
{name:'クロフネ',rating:97,style:'先行',speed:99,stamina:92,kick:98,start:97,mud:100,best:[1400,2100]},
{name:'アグネスデジタル',rating:96,style:'差し',speed:98,stamina:90,kick:98,start:90,mud:100,best:[1200,2000]},
{name:'カネヒキリ',rating:95,style:'先行',speed:96,stamina:94,kick:94,start:96,mud:100,best:[1400,2100]},
{name:'ヴァーミリアン',rating:95,style:'先行',speed:95,stamina:97,kick:94,start:95,mud:100,best:[1600,2400]},
{name:'ホッコータルマエ',rating:95,style:'先行',speed:94,stamina:98,kick:92,start:96,mud:100,best:[1600,2400]},
{name:'コパノリッキー',rating:95,style:'逃げ',speed:97,stamina:94,kick:91,start:100,mud:99,best:[1400,2100]},
{name:'クリソベリル',rating:96,style:'先行',speed:96,stamina:96,kick:95,start:96,mud:100,best:[1600,2100]},
{name:'レモンポップ',rating:97,style:'先行',speed:99,stamina:88,kick:97,start:98,mud:100,best:[1200,1800]},
{name:'フォーエバーヤング',rating:98,style:'先行',speed:98,stamina:96,kick:98,start:97,mud:100,best:[1600,2100]},
{name:'オジュウチョウサン',rating:95,style:'先行',speed:89,stamina:100,kick:91,start:96,mud:100,best:[2500,4300]},
{name:'タイキシャトル',rating:97,style:'先行',speed:100,stamina:86,kick:99,start:98,mud:96,best:[1200,1600]},
{name:'サクラバクシンオー',rating:96,style:'逃げ',speed:100,stamina:78,kick:96,start:100,mud:92,best:[1000,1400]},
{name:'デュランダル',rating:95,style:'追込',speed:99,stamina:81,kick:100,start:78,mud:90,best:[1000,1600]},
{name:'カレンチャン',rating:95,style:'先行',speed:99,stamina:79,kick:96,start:98,mud:96,best:[1000,1400]},
{name:'ストレイトガール',rating:94,style:'差し',speed:98,stamina:80,kick:98,start:91,mud:94,best:[1000,1600]},
{name:'ミッキーアイル',rating:94,style:'逃げ',speed:99,stamina:82,kick:94,start:100,mud:91,best:[1200,1600]},
{name:'ファインニードル',rating:94,style:'先行',speed:98,stamina:80,kick:95,start:97,mud:97,best:[1000,1400]},
{name:'ダノンスマッシュ',rating:94,style:'先行',speed:98,stamina:81,kick:96,start:96,mud:93,best:[1000,1400]},
{name:'ナランフレグ',rating:92,style:'追込',speed:96,stamina:82,kick:99,start:79,mud:97,best:[1000,1400]},
{name:'ナムラクレア',rating:95,style:'差し',speed:99,stamina:80,kick:99,start:92,mud:97,best:[1000,1400]},
{name:'サトノレーヴ',rating:95,style:'先行',speed:99,stamina:80,kick:96,start:98,mud:92,best:[1000,1400]},
{name:'ノースフライト',rating:95,style:'先行',speed:99,stamina:86,kick:98,start:96,mud:91,best:[1400,1800]},
{name:'ニホンピロウイナー',rating:95,style:'先行',speed:99,stamina:84,kick:96,start:97,mud:92,best:[1400,1800]},
{name:'ダイワメジャー',rating:96,style:'先行',speed:98,stamina:91,kick:95,start:98,mud:95,best:[1400,2000]},
{name:'ハットトリック',rating:94,style:'差し',speed:98,stamina:86,kick:99,start:87,mud:90,best:[1400,1800]},
{name:'ロゴタイプ',rating:94,style:'先行',speed:96,stamina:92,kick:94,start:97,mud:94,best:[1600,2000]},
{name:'インディチャンプ',rating:95,style:'差し',speed:99,stamina:87,kick:98,start:90,mud:91,best:[1400,1800]},
{name:'ソングライン',rating:96,style:'差し',speed:99,stamina:88,kick:99,start:89,mud:94,best:[1400,1800]},
{name:'セリフォス',rating:95,style:'差し',speed:99,stamina:86,kick:99,start:88,mud:90,best:[1400,1800]},
{name:'ジャンタルマンタル',rating:96,style:'先行',speed:100,stamina:87,kick:97,start:97,mud:89,best:[1400,1800]},
{name:'ソウルラッシュ',rating:95,style:'差し',speed:98,stamina:88,kick:98,start:89,mud:100,best:[1400,1800]},
{name:'エアグルーヴ',rating:96,style:'先行',speed:97,stamina:96,kick:97,start:94,mud:92,best:[1800,2500]},
{name:'ヒシアマゾン',rating:95,style:'差し',speed:96,stamina:96,kick:98,start:88,mud:95,best:[1600,2500]},
{name:'ファビラスラフイン',rating:94,style:'先行',speed:96,stamina:94,kick:96,start:94,mud:90,best:[1600,2400]},
{name:'スティルインラブ',rating:94,style:'差し',speed:95,stamina:94,kick:97,start:89,mud:92,best:[1600,2500]},
{name:'アパパネ',rating:95,style:'先行',speed:96,stamina:94,kick:96,start:95,mud:92,best:[1600,2400]},
{name:'メジロドーベル',rating:95,style:'差し',speed:95,stamina:96,kick:97,start:87,mud:93,best:[1600,2500]},
{name:'スイープトウショウ',rating:95,style:'追込',speed:95,stamina:95,kick:100,start:80,mud:94,best:[1600,2500]},
{name:'ショウナンパンドラ',rating:95,style:'差し',speed:95,stamina:96,kick:98,start:87,mud:93,best:[1800,2500]},
{name:'マリアライト',rating:94,style:'差し',speed:93,stamina:98,kick:96,start:86,mud:100,best:[2000,2500]},
{name:'スターズオンアース',rating:96,style:'差し',speed:97,stamina:97,kick:99,start:89,mud:92,best:[1600,2500]},
{name:'チェルヴィニア',rating:95,style:'差し',speed:96,stamina:97,kick:98,start:88,mud:92,best:[1800,2500]},
{name:'レガレイラ',rating:95,style:'追込',speed:96,stamina:97,kick:100,start:83,mud:95,best:[1800,2500]},
{name:'クロワデュノール',rating:97,style:'先行',speed:98,stamina:98,kick:96,start:96,mud:90,best:[1800,2500]},
{name:'ダノンデサイル',rating:96,style:'先行',speed:96,stamina:99,kick:94,start:95,mud:92,best:[2000,2500]},
{name:'ミュージアムマイル',rating:95,style:'差し',speed:97,stamina:92,kick:98,start:90,mud:90,best:[1600,2200]},
{name:'マスカレードボール',rating:96,style:'差し',speed:96,stamina:96,kick:100,start:88,mud:89,best:[1800,2400]},
{name:'エリキング',rating:92,style:'差し',speed:93,stamina:95,kick:97,start:87,mud:91,best:[1800,2400]},
{name:'ショウヘイ',rating:92,style:'先行',speed:94,stamina:95,kick:93,start:95,mud:89,best:[1800,2400]},
{name:'メイショウタバル',rating:94,style:'逃げ',speed:96,stamina:94,kick:88,start:100,mud:97,best:[1800,2400]},
{name:'ベラジオオペラ',rating:95,style:'先行',speed:96,stamina:94,kick:95,start:97,mud:91,best:[1800,2200]},
{name:'ジャスティンパレス',rating:95,style:'差し',speed:93,stamina:100,kick:95,start:87,mud:92,best:[2200,3200]},
{name:'アーバンシック',rating:94,style:'差し',speed:92,stamina:99,kick:96,start:86,mud:91,best:[2200,3200]},
{name:'シンエンペラー',rating:94,style:'先行',speed:94,stamina:98,kick:93,start:95,mud:90,best:[2000,2500]},
{name:'ドゥレッツァ',rating:95,style:'先行',speed:94,stamina:100,kick:95,start:94,mud:91,best:[2200,3200]},
{name:'タスティエーラ',rating:94,style:'先行',speed:94,stamina:97,kick:94,start:95,mud:91,best:[2000,2500]},
{name:'シャフリヤール',rating:95,style:'差し',speed:96,stamina:96,kick:98,start:88,mud:89,best:[1800,2500]},
{name:'パンサラッサ',rating:95,style:'逃げ',speed:98,stamina:92,kick:89,start:100,mud:96,best:[1600,2200]},
{name:'ジャックドール',rating:94,style:'逃げ',speed:96,stamina:94,kick:91,start:99,mud:92,best:[1800,2200]},
{name:'ポタジェ',rating:92,style:'先行',speed:92,stamina:95,kick:91,start:95,mud:91,best:[1800,2200]},
{name:'ジオグリフ',rating:93,style:'先行',speed:94,stamina:93,kick:93,start:96,mud:96,best:[1600,2200]},
{name:'ドリームジャーニー',rating:95,style:'追込',speed:94,stamina:97,kick:100,start:78,mud:94,best:[1800,2500]},
{name:'ナカヤマフェスタ',rating:94,style:'差し',speed:93,stamina:98,kick:96,start:87,mud:98,best:[2000,2500]},
{name:'マツリダゴッホ',rating:94,style:'先行',speed:94,stamina:96,kick:93,start:96,mud:92,best:[2000,2500]},
{name:'ラッキーライラック',rating:95,style:'先行',speed:96,stamina:95,kick:96,start:95,mud:92,best:[1600,2400]},
{name:'サートゥルナーリア',rating:96,style:'先行',speed:98,stamina:94,kick:98,start:94,mud:91,best:[1800,2400]},
{name:'ワールドプレミア',rating:94,style:'差し',speed:92,stamina:100,kick:95,start:85,mud:91,best:[2200,3200]},
{name:'フィエールマン',rating:95,style:'差し',speed:93,stamina:100,kick:97,start:86,mud:92,best:[2200,3200]},
{name:'ディープボンド',rating:93,style:'先行',speed:91,stamina:100,kick:91,start:96,mud:100,best:[2200,3200]},
{name:'テーオーロイヤル',rating:94,style:'先行',speed:92,stamina:100,kick:93,start:95,mud:95,best:[2400,3400]},
{name:'ブローザホーン',rating:94,style:'差し',speed:92,stamina:99,kick:97,start:85,mud:100,best:[2200,3200]}
];
const venues={
'東京':{turn:'左',shape:'oval',straight:526},'中山':{turn:'右',shape:'oval',straight:310},'阪神':{turn:'右',shape:'oval',straight:474},'京都':{turn:'右',shape:'oval',straight:404},'中京':{turn:'左',shape:'oval',straight:413},'新潟':{turn:'左',shape:'oval',straight:659}
};
const races=[{name:'日本ダービー',distance:2400},{name:'有馬記念',distance:2500},{name:'天皇賞（秋）',distance:2000},{name:'安田記念',distance:1600},{name:'スプリンターズS',distance:1200},{name:'宝塚記念',distance:2200},{name:'天皇賞（春）',distance:3200},{name:'大阪杯',distance:2000},{name:'ジャパンC',distance:2400}];
const colors=['#fff','#111','#d92727','#2668d8','#f0ca25','#31a85a','#ef7a18','#ef93bd','#7b3eb3','#26a9b8','#795548','#8bc34a'];
function frameTextColor(number){return [2,3,4,6,8,9,11,12].includes(number)?'#fff':'#111'}
let state={wallet:10000,raceNo:1,mode:'solo',isHost:false,roomCode:null,userId:crypto.randomUUID(),field:[],race:null,venue:'東京',going:'良',betType:'win',selection:[],stake:500,adjustTarget:null,seed:1,result:[],ticketOdds:0};
let dbApi=null,roomUnsub=null;
function init(){Object.keys(venues).forEach(v=>$('venue').add(new Option(v,v)));races.forEach((r,i)=>$('racePreset').add(new Option(`${r.name} 芝${r.distance}m`,i)));load();bind();initFirebase();}
function bind(){
$('themeBtn').onclick=toggleTheme;$('soloModeBtn').onclick=()=>openSetup('solo');$('hostModeBtn').onclick=()=>openSetup('host');$('joinModeBtn').onclick=()=>show('joinPanel');document.querySelectorAll('.back-home').forEach(b=>b.onclick=()=>show('homePanel'));
$('generateBtn').onclick=generateRace;$('toBetBtn').onclick=()=>{renderOdds();show('betPanel')};$('rerollBtn').onclick=generateRace;
document.querySelectorAll('.bet-tabs button').forEach(b=>b.onclick=()=>setBetType(b.dataset.bet));$('stake').oninput=updateTicket;$('submitBetBtn').onclick=submitBet;
$('nextRaceBtn').onclick=()=>{state.raceNo++;state.result=[];state.selection=[];show('setupPanel')};$('resetBtn').onclick=()=>{state.wallet=10000;saveWallet();show('homePanel')};
$('joinRoomBtn').onclick=joinRoom;$('hostStartBtn').onclick=hostStartOnline;$('copyRoomBtn').onclick=()=>navigator.clipboard?.writeText(state.roomCode||'');
document.addEventListener('dblclick',e=>e.preventDefault(),{passive:false});
}
function show(id){document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));$(id).classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}function openSetup(mode){state.mode=mode;state.isHost=mode==='host';$('setupModeLabel').textContent=mode==='solo'?'SOLO':'ONLINE HOST';show('setupPanel')}
function load(){state.wallet=+(localStorage.getItem('umaumawallet')||10000);$('wallet').textContent=state.wallet.toLocaleString('ja-JP');document.body.dataset.theme=localStorage.getItem('kawakamitheme')||'dark';updateThemeBtn()}function saveWallet(){localStorage.setItem('umaumawallet',state.wallet);$('wallet').textContent=state.wallet.toLocaleString('ja-JP')}function toggleTheme(){document.body.dataset.theme=document.body.dataset.theme==='dark'?'light':'dark';localStorage.setItem('kawakamitheme',document.body.dataset.theme);updateThemeBtn()}function updateThemeBtn(){$('themeBtn').textContent=document.body.dataset.theme==='dark'?'☀ 明るい版':'☾ かっこいい版'}
function seeded(seed){let x=seed>>>0;return()=>((x=(x*1664525+1013904223)>>>0)/4294967296)}
function generateRace(){state.venue=$('venue').value;state.race=races[+$('racePreset').value];state.going=$('going').value;state.seed=Math.floor(Math.random()*2**31);const rnd=seeded(state.seed),size=+$('fieldSize').value;const pool=[...horses].sort(()=>rnd()-.5).slice(0,size);state.field=pool.map((h,i)=>({...h,number:i+1,adj:{speed:0,stamina:0,kick:0,start:0,mud:0}}));recalculate();drawGuide();show('guidePanel');if(state.mode==='host'&&dbApi)createRoom();}
function effective(h,key){return h[key]+(h.adj?.[key]||0)}
function recalculate(){const D=state.race.distance;const goingPenalty={良:0,稍重:1,重:2.5,不良:4}[state.going];let raw=state.field.map(h=>{const dist=h.best[0]<=D&&D<=h.best[1]?5:-Math.min(8,Math.abs(D-(D<h.best[0]?h.best[0]:h.best[1]))/150);const mud=(effective(h,'mud')-90)*goingPenalty*.08;const base=h.rating*.55+effective(h,'speed')*.18+effective(h,'stamina')*.12+effective(h,'kick')*.1+effective(h,'start')*.05+dist+mud;return Math.exp((base-90)/8)});const sum=raw.reduce((a,b)=>a+b,0);state.field.forEach((h,i)=>{h.winProb=raw[i]/sum;h.odds=Math.max(1.3,Math.round((.8/h.winProb)*10)/10)});}
function roundedRect(ctx,x,y,w,h,r){
 const rr=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();
}
function drawCourse(ctx,markers=[],progress=0,guide=false){
 const w=ctx.canvas.width,h=ctx.canvas.height;ctx.clearRect(0,0,w,h);
 const startX=w*.105,goalX=w*.895,top=h*.18,bottom=h*.82,trackH=bottom-top;
 const laneCount=Math.max(8,markers.length||10),laneH=trackH/laneCount;
 const bg=ctx.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#6eb0dd');bg.addColorStop(.38,'#9ed2ef');bg.addColorStop(.39,'#245a2c');bg.addColorStop(1,'#123b1d');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
 // 芝の直線コース
 ctx.fillStyle='#eee4c8';roundedRect(ctx,startX-26,top-24,(goalX-startX)+52,trackH+48,28);ctx.fill();
 const turf=ctx.createLinearGradient(0,top,0,bottom);turf.addColorStop(0,'#4caa59');turf.addColorStop(1,'#28773b');ctx.fillStyle=turf;roundedRect(ctx,startX-14,top-13,(goalX-startX)+28,trackH+26,22);ctx.fill();
 ctx.strokeStyle='rgba(255,255,255,.42)';ctx.lineWidth=2;
 for(let i=1;i<laneCount;i++){const y=top+i*laneH;ctx.beginPath();ctx.moveTo(startX,y);ctx.lineTo(goalX,y);ctx.stroke()}
 // START（左）
 ctx.strokeStyle='#ffe22e';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(startX,top-20);ctx.lineTo(startX,bottom+20);ctx.stroke();
 // GOAL（右・白黒）
 const cell=Math.max(10,Math.min(18,laneH*.42));for(let row=0;row<Math.ceil(trackH/cell);row++){for(let col=0;col<2;col++){ctx.fillStyle=(row+col)%2?'#111':'#fff';ctx.fillRect(goalX+col*cell-cell,top+row*cell,cell,cell)}}
 if(guide){markerText(ctx,'START',startX,top-62,'center');markerText(ctx,'GOAL',goalX,bottom+62,'center');
   ctx.fillStyle='rgba(0,0,0,.62)';roundedRect(ctx,w*.25,h*.035,w*.5,h*.09,16);ctx.fill();ctx.fillStyle='#fff';ctx.font=`800 ${Math.max(22,w*.028)}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('START から GOAL へ一直線',w*.5,h*.08);
 }
 markers.forEach(m=>{
   const p=Math.max(0,Math.min(1,m.p));const x=startX+(goalX-startX)*p;
   const laneIndex=Math.max(0,Math.min(laneCount-1,m.lane));const y=top+(laneIndex+.5)*laneH;
   const r=Math.max(13,Math.min(21,w*.018));
   const isChosen=state.selection[0]===m.number;
   if(isChosen){ctx.save();ctx.shadowColor='#ffe36b';ctx.shadowBlur=22;ctx.fillStyle='rgba(255,226,46,.35)';ctx.beginPath();ctx.arc(x,y,r+8,0,Math.PI*2);ctx.fill();ctx.restore()}
   ctx.fillStyle=colors[(m.number-1)%colors.length];ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle=isChosen?'#ffe22e':'#fff';ctx.lineWidth=isChosen?6:3;ctx.stroke();
   ctx.fillStyle=frameTextColor(m.number);ctx.font=`900 ${Math.max(14,r*.95)}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(m.number,x,y);
 });
 ctx.textAlign='start';ctx.textBaseline='alphabetic';return {startX,goalX,top,bottom};
}
function markerText(ctx,text,x,y,align='center'){
 ctx.textAlign=align;ctx.textBaseline='middle';ctx.font=`900 ${Math.max(22,ctx.canvas.width*.027)}px sans-serif`;ctx.lineWidth=7;ctx.strokeStyle='#101010';ctx.fillStyle='#ffe52e';ctx.strokeText(text,x,y);ctx.fillText(text,x,y);
}
function drawGuide(){drawCourse($('guideCanvas').getContext('2d'),[],0,true);$('guideTitle').textContent=`${state.race.name}・${state.venue} 芝${state.race.distance}m`;$('guideDescription').textContent=`ゲームでは見やすさを優先した直線コースで表現します。左のSTARTから右のGOALまで、約30秒かけて滑らかに進みます。`;}
function setBetType(){state.betType='win';state.selection=[];$('selectionHelp').textContent='1頭選択してください';renderOdds();updateTicket()}
function renderOdds(){recalculate();$('raceNo').textContent=`第${state.raceNo}競走`;$('raceTitle').textContent=state.race.name;$('conditions').textContent=`${state.venue} 芝${state.race.distance}m・${state.going}・${venues[state.venue].turn}回り`;$('oddsBoard').innerHTML=state.field.map(h=>`<button class="horse-row ${state.selection.includes(h.number)?'selected':''}" data-n="${h.number}"><span class="number" style="background:${colors[(h.number-1)%colors.length]};color:${frameTextColor(h.number)}">${h.number}</span><span><b>${h.name}</b><span class="horse-meta">${h.style}　能力${h.rating}</span></span><span class="odds"><b>${h.odds.toFixed(1)}</b><span class="horse-meta">単勝</span></span></button>`).join('');document.querySelectorAll('.horse-row').forEach(el=>el.onclick=()=>chooseHorse(+el.dataset.n));}
function chooseHorse(n){state.selection=state.selection[0]===n?[]:[n];state.adjustTarget=n;renderOdds();renderParamEditor();updateTicket()}
function renderParamEditor(){const h=state.field.find(x=>x.number===state.adjustTarget);if(!h){$('parameterEditor').innerHTML='<p class="note">出走馬をタップすると編集できます。</p>';return}const labels={speed:'スピード',stamina:'スタミナ',kick:'末脚',start:'スタート',mud:'道悪'};$('parameterEditor').innerHTML=`<h4>${h.number}番 ${h.name}</h4>${Object.keys(labels).map(k=>`<div class="param-row"><span>${labels[k]}</span><button data-k="${k}" data-d="-1">−</button><span class="param-value">${h.adj[k]>=0?'+':''}${h.adj[k]}（${effective(h,k)}）</span><button data-k="${k}" data-d="1">＋</button></div>`).join('')}<div id="paramTotal" class="param-total ${Object.values(h.adj).reduce((a,b)=>a+b,0)===0?'ok':'bad'}">調整合計：${Object.values(h.adj).reduce((a,b)=>a+b,0)}（レース開始時は0にしてください）</div>`;document.querySelectorAll('.param-row button').forEach(b=>b.onclick=()=>adjustParam(h,b.dataset.k,+b.dataset.d));}
function adjustParam(h,k,d){const next=h.adj[k]+d;if(next<-3||next>3)return;h.adj[k]=next;const total=Object.values(h.adj).reduce((a,b)=>a+b,0);if(Math.abs(total)>3){h.adj[k]-=d;return}recalculate();renderOdds();renderParamEditor();updateTicket()}
function comboOdds(){const h=state.field.find(x=>x.number===state.selection[0]);return h?.odds||0}
function updateTicket(){state.betType='win';state.stake=Math.max(0,+$('stake').value||0);const balanced=state.field.every(h=>Object.values(h.adj||{}).reduce((a,b)=>a+b,0)===0),ok=state.selection.length===1&&state.stake>=100&&state.stake<=state.wallet&&balanced;const n=state.selection[0],h=state.field.find(x=>x.number===n);$('selectedTicket').textContent=h?`${n} ${h.name}`:'未選択';state.ticketOdds=comboOdds();$('estimatedOdds').textContent=state.ticketOdds?`${state.ticketOdds.toFixed(1)}倍`:'--';$('estimatedPayout').textContent=state.ticketOdds?`${Math.floor(state.stake*state.ticketOdds).toLocaleString('ja-JP')}pt`:'--';$('submitBetBtn').disabled=!ok;$('submitBetBtn').textContent=!balanced?'能力調整の合計を0にしてください':(state.mode==='solo'?'単勝でレース開始':'単勝で投票');}
function submitBet(){
 if($('submitBetBtn').disabled)return;
 state.wallet-=state.stake;saveWallet();
 if(state.mode==='solo')countdownThenRace(Date.now()+3200);else submitOnlineBet();
}
function enterRaceMode(){document.body.classList.add('race-running')}
function leaveRaceMode(){document.body.classList.remove('race-running')}
function countdownThenRace(startAt){
 if($('countdownPanel').classList.contains('active')||$('racePanel').classList.contains('active'))return;
 show('countdownPanel');
 const tick=()=>{const left=Math.ceil((startAt-Date.now())/1000);$('countdownNumber').textContent=left>0?left:'START';if(left<=0){setTimeout(()=>{enterRaceMode();show('racePanel');runSimulation()},220);return}setTimeout(tick,100)};tick();
}
function updateChosenHorseBanner(){
 const h=state.field.find(x=>x.number===state.selection[0]);
 const banner=$('chosenHorseBanner');
 if(!banner)return;
 if(!h){banner.hidden=true;return}
 banner.hidden=false;
 const number=$('chosenHorseNumber');
 number.textContent=`${h.number}番`;
 number.style.background=colors[(h.number-1)%colors.length];
 number.style.color=frameTextColor(h.number);
 $('chosenHorseName').textContent=`${h.name}です`;
}
function runSimulation(){
 const canvas=$('track'),ctx=canvas.getContext('2d'),D=state.race.distance,rnd=seeded(state.seed);
 const DISPLAY_DURATION=30,officialSecs=estimateRaceSeconds(D);
 let wallStart=null,previousTs=null,finished=false,lastCall=-1,stripNodes=null;
 // 馬券の選択は結果に一切影響させない。能力・適性・当日の乱数だけで着順を決める。
 const runners=state.field.map((h,i)=>{
  const ability=(h.winProb||1/state.field.length)*100;
  const dayForm=(rnd()-.5)*18;
  const score=ability+dayForm+(effective(h,'speed')-93)*.45+(effective(h,'stamina')-92)*.20;
  const styleBias=h.style==='逃げ'?.034:h.style==='先行'?.018:h.style==='差し'?-0.010:-0.022;
  return {...h,p:0,displayP:0,lane:i,finish:null,score,
   phase1:rnd()*Math.PI*2,phase2:rnd()*Math.PI*2,phase3:rnd()*Math.PI*2,
   amp1:.034+rnd()*.026,amp2:.018+rnd()*.022,amp3:.010+rnd()*.014,
   styleBias,currentKmh:0};
 });
 const ranked=[...runners].sort((a,b)=>b.score-a.score);
 ranked.forEach((h,rank)=>{
  h.finishWall=29.20+rank*.052+rnd()*.035;
  h.officialFinish=officialSecs+rank*.10+rnd()*.075;
  h.finalRank=rank;
 });
 $('liveTitle').textContent=state.race.name;
 $('liveConditions').textContent=`${state.venue} 芝${D}m・${state.going}・約30秒レース`;
 updateChosenHorseBanner();
 stripNodes=drawPositionStrip(runners,null);

 function smoothstep(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
 function frame(ts){
  if(wallStart===null){wallStart=ts;previousTs=ts}
  const dt=Math.min(.05,Math.max(.001,(ts-previousTs)/1000));previousTs=ts;
  const wall=Math.min(32,(ts-wallStart)/1000);
  runners.forEach(h=>{
   if(h.finish!==null){h.p=1;h.displayP+=(1-h.displayP)*(1-Math.exp(-10*dt));return}
   const t=Math.max(0,Math.min(1,wall/h.finishWall));
   const envelope=Math.sin(Math.PI*t);
   const battleWave=(Math.sin(t*Math.PI*7+h.phase1)*h.amp1+
                     Math.sin(t*Math.PI*13+h.phase2)*h.amp2+
                     Math.sin(t*Math.PI*19+h.phase3)*h.amp3)*envelope;
   const earlyStyle=h.style==='逃げ'?h.styleBias*(1-smoothstep(t/.60))*envelope:
                    h.style==='先行'?h.styleBias*(1-t)*envelope:0;
   const lateStyle=h.style==='差し'?.034*smoothstep((t-.34)/.58)*envelope:
                   h.style==='追込'?.052*smoothstep((t-.45)/.50)*envelope:0;
   const settle=smoothstep((t-.86)/.14);
   const rankOffset=((runners.length-1-h.finalRank)-(runners.length-1)/2)*.0017*settle;
   let target=t+battleWave+earlyStyle+lateStyle+rankOffset;
   target=Math.max(0,Math.min(.9995,target));
   // 数字が飛ばないよう、時間ベースの追従速度で補間する。
   h.p=Math.max(h.p,target);
   const follow=1-Math.exp(-7.5*dt);
   h.displayP+=Math.max(0,h.p-h.displayP)*follow;
   const surge=Math.max(0,(h.p-h.displayP))*430;
   const phaseSpeed=53+9*Math.sin(Math.PI*t)+(effective(h,'speed')-93)*.30+surge;
   h.currentKmh=Math.max(46,Math.min(73,phaseSpeed));
   if(wall>=h.finishWall){h.p=1;h.finish=h.officialFinish}
  });
  const order=[...runners].sort((a,b)=>b.displayP-a.displayP || b.score-a.score);
  drawCourse(ctx,runners.map(h=>({...h,p:h.displayP})),order[0].displayP,false);
  drawPositionStrip(runners,stripNodes);
  const leaderProgress=order[0].displayP;
  $('remaining').textContent=`${Math.max(0,Math.round(D*(1-leaderProgress)/50)*50)}m`;
  $('leader').textContent=`先頭：${order[0].number}番 ${order[0].name}`;
  $('speedKmh').textContent=`${order[0].currentKmh.toFixed(1)}km/h`;
  $('elapsed').textContent=formatTime(officialSecs*Math.min(1,wall/DISPLAY_DURATION));
  const call=Math.min(9,Math.floor(leaderProgress*10));
  if(call!==lastCall){lastCall=call;$('commentary').textContent=comment(call,order,D)}
  if(runners.every(r=>r.finish!==null)||wall>31.4){
   if(!finished){finished=true;state.result=[...runners].sort((a,b)=>(a.finish??999)-(b.finish??999));setTimeout(showResult,700)}
   return;
  }
  requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);
}
function estimateRaceSeconds(D){const table={1200:68,1600:94,2000:120,2200:132,2400:145,2500:151,3200:198};return table[D]||D/16.5}
function drawPositionStrip(runners,nodes){
 const strip=$('positionStrip');
 if(!nodes||nodes.length!==runners.length){
  strip.innerHTML='';
  nodes=runners.map(h=>{
   const el=document.createElement('span');el.className=`pos-ball track-pos${state.selection[0]===h.number?' chosen':''}`;el.textContent=h.number;
   el.style.background=colors[(h.number-1)%colors.length];el.style.color=frameTextColor(h.number);
   strip.appendChild(el);return el;
  });
 }
 runners.forEach((h,i)=>{
  const progress=Math.max(0,Math.min(1,h.displayP??h.p));
  // CSSのleft固定を使わず、transformだけを毎フレーム更新する。
  nodes[i].style.setProperty('--race-x',`${7+progress*86}%`);
  nodes[i].style.zIndex=String(10+Math.round(progress*100));
  nodes[i].title=`進行率${Math.round(progress*100)}%`;
 });
 return nodes;
}
function comment(c,o,D){
 const sel=state.selection[0],sh=o.find(h=>h.number===sel),pos=sh?o.indexOf(sh)+1:'--';
 const lines=[
  `スタート！ ${o[0].number}番${o[0].name}が飛び出した！`,
  `${o[1].number}番${o[1].name}が一気に並びかける！`,
  `早くも先頭交代！ ${o[0].number}番が前へ！`,
  `中盤に入り各馬が激しく位置を入れ替える！`,
  `予想した馬は現在${pos}番手。まだまだ大混戦！`,
  `残り${Math.round(D*.45/100)*100}m！ 外から数頭が一気に進出！`,
  `先頭がまた替わった！ ${o[0].number}番${o[0].name}！`,
  `最後の直線！ ${o[0].number}番と${o[1].number}番が並んだ！`,
  `残り200m！ 後方から${o[Math.min(2,o.length-1)].number}番も猛追！`,
  `ゴール前！ ${o[0].number}番${o[0].name}がわずかに先頭！`
 ];
 return lines[Math.min(c,lines.length-1)];
}
function hitTicket(){return state.result[0]?.number===state.selection[0]}
function showResult(){leaveRaceMode();show('resultPanel');const hit=hitTicket(),pay=hit?Math.floor(state.stake*state.ticketOdds):0;if(hit)state.wallet+=pay;saveWallet();$('finishList').innerHTML=state.result.map((h,i)=>`<div class="finish-row"><span class="rank">${i+1}着</span><span class="number" style="background:${colors[(h.number-1)%colors.length]};color:${frameTextColor(h.number)}">${h.number}</span><span><b>${h.name}</b><span class="horse-meta">${h.style}</span></span><b>${formatTime(h.finish||0)}</b></div>`).join('');const label='単勝';$('payout').className=`payout ${hit?'win':'lose'}`;$('payout').innerHTML=hit?`${label} 的中！<strong>+${pay.toLocaleString('ja-JP')} pt</strong>購入 ${state.stake.toLocaleString('ja-JP')}pt × ${state.ticketOdds.toFixed(1)}倍`:`${label} 不的中<strong>-${state.stake.toLocaleString('ja-JP')} pt</strong>勝ち馬：${state.result[0].number}番 ${state.result[0].name}`;}
function formatTime(s){return `${Math.floor(s/60)}:${(s%60).toFixed(1).padStart(4,'0')}`}
async function initFirebase(){const ok=firebaseConfig.apiKey&&firebaseConfig.databaseURL&&firebaseConfig.projectId;if(!ok){$('onlineStatus').textContent='オンライン機能：Firebase設定後に利用できます';return}try{const appMod=await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js'),dbMod=await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js');const app=appMod.initializeApp(firebaseConfig),db=dbMod.getDatabase(app);dbApi={...dbMod,db};$('onlineStatus').textContent='オンライン機能：接続済み'}catch(e){console.error(e);$('onlineStatus').textContent='オンライン機能：接続エラー'}}
async function createRoom(){state.roomCode=String(Math.floor(100000+Math.random()*900000));const data={status:'betting',race:{venue:state.venue,going:state.going,race:state.race,field:state.field,seed:state.seed,raceNo:state.raceNo},players:{[state.userId]:{name:'主催者',isHost:true,ready:false}}};await dbApi.set(dbApi.ref(dbApi.db,`rooms/${state.roomCode}`),data);subscribeRoom();renderLobby(data)}
function renderLobby(room){show('lobbyPanel');$('roomCodeDisplay').textContent=state.roomCode;$('lobbyRaceTitle').textContent=state.race.name;$('lobbyConditions').textContent=`${state.venue} 芝${state.race.distance}m・${state.going}`;const ps=Object.values(room.players||{});$('participantList').innerHTML=ps.map(p=>`<div class="participant"><b>${escapeHtml(p.name)}</b><span>${p.ready?'投票完了':'選択中'}</span></div>`).join('');$('hostStartBtn').disabled=!ps.every(p=>p.ready)}
async function joinRoom(){if(!dbApi){$('joinMessage').textContent='Firebase設定が必要です。';return}const code=$('roomCodeInput').value.trim(),name=$('joinName').value.trim()||'ゲスト';const snap=await dbApi.get(dbApi.ref(dbApi.db,`rooms/${code}`));if(!snap.exists()){$('joinMessage').textContent='ルームが見つかりません。';return}state.roomCode=code;state.mode='online';state.isHost=false;applyRoom(snap.val().race);await dbApi.set(dbApi.ref(dbApi.db,`rooms/${code}/players/${state.userId}`),{name,isHost:false,ready:false});subscribeRoom();drawGuide();show('guidePanel')}
function applyRoom(r){state.venue=r.venue;state.going=r.going;state.race=r.race;state.field=r.field;state.seed=r.seed;state.raceNo=r.raceNo}
async function submitOnlineBet(){await dbApi.set(dbApi.ref(dbApi.db,`rooms/${state.roomCode}/players/${state.userId}/bet`),{type:state.betType,selection:state.selection,stake:state.stake,odds:state.ticketOdds});await dbApi.set(dbApi.ref(dbApi.db,`rooms/${state.roomCode}/players/${state.userId}/ready`),true);$('waitingTicket').textContent=$('selectedTicket').textContent;$('waitingText').textContent=`ルーム ${state.roomCode}`;show('waitingPanel')}
function subscribeRoom(){if(roomUnsub)roomUnsub();roomUnsub=dbApi.onValue(dbApi.ref(dbApi.db,`rooms/${state.roomCode}`),snap=>{if(!snap.exists())return;const room=snap.val();if(state.isHost)renderLobby(room);if(room.status==='countdown'&&room.startAt&&!$('racePanel').classList.contains('active')&&!$('countdownPanel').classList.contains('active'))countdownThenRace(room.startAt)})}
async function hostStartOnline(){await dbApi.update(dbApi.ref(dbApi.db,`rooms/${state.roomCode}`),{status:'countdown',startAt:Date.now()+5000})}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
init();
