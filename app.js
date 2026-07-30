'use strict';
const $=id=>document.getElementById(id);
const ABILITIES=['speed','stamina','kick','start','mud'];
const ABILITY_LABEL={speed:'スピード',stamina:'スタミナ',kick:'末脚',start:'スタート',mud:'道悪'};
const RACE_DURATION=27;
const COLORS=['#fff','#222','#e33','#176ad4','#f5d22d','#29a85a','#f08ac1','#f18222','#8e54ca','#69c7d7','#ddd','#7b4b25'];
const VENUES={東京:{turn:'左'},中山:{turn:'右'},阪神:{turn:'右'},京都:{turn:'右'},中京:{turn:'左'},新潟:{turn:'左'},札幌:{turn:'右'},函館:{turn:'右'},福島:{turn:'右'},小倉:{turn:'右'}};
const RACES=[
{name:'フェブラリーステークス',distance:1600,venue:'東京'},
{name:'高松宮記念',distance:1200,venue:'中京'},
{name:'大阪杯',distance:2000,venue:'阪神'},
{name:'桜花賞',distance:1600,venue:'阪神'},
{name:'皐月賞',distance:2000,venue:'中山'},
{name:'天皇賞（春）',distance:3200,venue:'京都'},
{name:'NHKマイルカップ',distance:1600,venue:'東京'},
{name:'ヴィクトリアマイル',distance:1600,venue:'東京'},
{name:'オークス',distance:2400,venue:'東京'},
{name:'日本ダービー',distance:2400,venue:'東京'},
{name:'安田記念',distance:1600,venue:'東京'},
{name:'宝塚記念',distance:2200,venue:'阪神'},
{name:'スプリンターズステークス',distance:1200,venue:'中山'},
{name:'秋華賞',distance:2000,venue:'京都'},
{name:'菊花賞',distance:3000,venue:'京都'},
{name:'天皇賞（秋）',distance:2000,venue:'東京'},
{name:'エリザベス女王杯',distance:2200,venue:'京都'},
{name:'マイルチャンピオンシップ',distance:1600,venue:'京都'},
{name:'ジャパンカップ',distance:2400,venue:'東京'},
{name:'チャンピオンズカップ',distance:1800,venue:'中京'},
{name:'有馬記念',distance:2500,venue:'中山'}];
const JOCKEYS=[
{id:'take-yutaka',name:'武 豊',era:'現役',type:'天才肌',bonus:{speed:2,stamina:0,kick:1,start:1,mud:-1}},
{id:'lemaire',name:'C.ルメール',era:'現役',type:'万能型',bonus:{speed:1,stamina:1,kick:2,start:0,mud:0}},
{id:'kawada',name:'川田 将雅',era:'現役',type:'先行巧者',bonus:{speed:1,stamina:0,kick:0,start:2,mud:1}},
{id:'tosaki',name:'戸崎 圭太',era:'現役',type:'安定型',bonus:{speed:1,stamina:1,kick:1,start:1,mud:0}},
{id:'ikezoe',name:'池添 謙一',era:'現役',type:'大舞台型',bonus:{speed:0,stamina:0,kick:2,start:0,mud:1}},
{id:'yokoyama-n',name:'横山 典弘',era:'現役',type:'戦術型',bonus:{speed:0,stamina:2,kick:1,start:-1,mud:1}},
{id:'iwata-y',name:'岩田 康誠',era:'現役',type:'勝負型',bonus:{speed:1,stamina:0,kick:2,start:0,mud:1}},
{id:'matsuyama',name:'松山 弘平',era:'現役',type:'積極型',bonus:{speed:1,stamina:1,kick:0,start:2,mud:-1}},
{id:'sakai',name:'坂井 瑠星',era:'現役',type:'攻撃型',bonus:{speed:2,stamina:0,kick:0,start:2,mud:-1}},
{id:'yokoyama-t',name:'横山 武史',era:'現役',type:'バランス型',bonus:{speed:1,stamina:1,kick:1,start:1,mud:0}},
{id:'yokoyama-k',name:'横山 和生',era:'現役',type:'長距離型',bonus:{speed:0,stamina:2,kick:1,start:1,mud:0}},
{id:'hamanaka',name:'浜中 俊',era:'現役',type:'瞬発型',bonus:{speed:1,stamina:-1,kick:2,start:1,mud:0}},
{id:'kitamura-y',name:'北村 友一',era:'現役',type:'差し型',bonus:{speed:0,stamina:1,kick:2,start:0,mud:1}},
{id:'wada',name:'和田 竜二',era:'現役',type:'粘り型',bonus:{speed:0,stamina:2,kick:0,start:1,mud:1}},
{id:'miura',name:'三浦 皇成',era:'現役',type:'スピード型',bonus:{speed:2,stamina:0,kick:1,start:1,mud:-1}},
{id:'tanabe',name:'田辺 裕信',era:'現役',type:'自在型',bonus:{speed:1,stamina:1,kick:1,start:0,mud:1}},
{id:'uchida',name:'内田 博幸',era:'現役',type:'パワー型',bonus:{speed:0,stamina:1,kick:1,start:0,mud:2}},
{id:'tsumura',name:'津村 明秀',era:'現役',type:'末脚型',bonus:{speed:0,stamina:0,kick:2,start:1,mud:1}},
{id:'sugawara',name:'菅原 明良',era:'現役',type:'成長型',bonus:{speed:1,stamina:1,kick:1,start:1,mud:0}},
{id:'nishimura',name:'西村 淳也',era:'現役',type:'先行型',bonus:{speed:1,stamina:1,kick:0,start:2,mud:0}},
{id:'danno',name:'団野 大成',era:'現役',type:'勝負型',bonus:{speed:1,stamina:0,kick:2,start:1,mud:0}},
{id:'sasaki',name:'佐々木 大輔',era:'現役',type:'積極型',bonus:{speed:1,stamina:1,kick:0,start:2,mud:0}},
{id:'okabe',name:'岡部 幸雄',era:'レジェンド',type:'名人型',bonus:{speed:1,stamina:2,kick:1,start:0,mud:0}},
{id:'shibata-m',name:'柴田 政人',era:'レジェンド',type:'剛腕型',bonus:{speed:0,stamina:2,kick:1,start:1,mud:0}},
{id:'kawachi',name:'河内 洋',era:'レジェンド',type:'クラシック型',bonus:{speed:1,stamina:1,kick:2,start:0,mud:0}},
{id:'minai',name:'南井 克巳',era:'レジェンド',type:'追込型',bonus:{speed:0,stamina:1,kick:2,start:-1,mud:2}},
{id:'matoba',name:'的場 均',era:'レジェンド',type:'職人型',bonus:{speed:0,stamina:2,kick:1,start:0,mud:1}},
{id:'tabara',name:'田原 成貴',era:'レジェンド',type:'天才型',bonus:{speed:1,stamina:-1,kick:2,start:1,mud:1}},
{id:'ando',name:'安藤 勝己',era:'レジェンド',type:'豪腕型',bonus:{speed:1,stamina:1,kick:1,start:0,mud:2}},
{id:'ebina',name:'蛯名 正義',era:'レジェンド',type:'大舞台型',bonus:{speed:0,stamina:1,kick:2,start:0,mud:1}},
{id:'fukunaga',name:'福永 祐一',era:'レジェンド',type:'理論型',bonus:{speed:1,stamina:1,kick:2,start:0,mud:0}},
{id:'shii',name:'四位 洋文',era:'レジェンド',type:'末脚型',bonus:{speed:0,stamina:0,kick:2,start:0,mud:1}},
{id:'fuji',name:'藤田 伸二',era:'レジェンド',type:'勝負型',bonus:{speed:1,stamina:1,kick:1,start:1,mud:0}},
{id:'matsunaga',name:'松永 幹夫',era:'レジェンド',type:'牝馬巧者',bonus:{speed:1,stamina:0,kick:2,start:1,mud:0}},
{id:'yasuda',name:'安田 隆行',era:'レジェンド',type:'短距離型',bonus:{speed:2,stamina:-1,kick:1,start:2,mud:0}},
{id:'nohirai',name:'野平 祐二',era:'歴史的名手',type:'万能型',bonus:{speed:1,stamina:1,kick:1,start:1,mud:0}},
{id:'yasuda-t',name:'保田 隆芳',era:'歴史的名手',type:'クラシック型',bonus:{speed:0,stamina:2,kick:1,start:1,mud:0}},
{id:'kaga',name:'加賀 武見',era:'歴史的名手',type:'闘志型',bonus:{speed:1,stamina:1,kick:1,start:0,mud:1}},
{id:'detto-ri',name:'L.デットーリ',era:'海外名手',type:'世界級',bonus:{speed:1,stamina:1,kick:2,start:1,mud:-1}},
{id:'moore',name:'R.ムーア',era:'海外名手',type:'剛腕型',bonus:{speed:1,stamina:1,kick:1,start:0,mud:2}},
{id:'moreira',name:'J.モレイラ',era:'海外名手',type:'魔術師型',bonus:{speed:2,stamina:0,kick:2,start:1,mud:-1}},
{id:'lane',name:'D.レーン',era:'海外名手',type:'万能型',bonus:{speed:1,stamina:1,kick:1,start:1,mud:0}},
{id:'c-demuro',name:'C.デムーロ',era:'海外名手',type:'瞬発型',bonus:{speed:1,stamina:0,kick:2,start:1,mud:0}},
{id:'peslier',name:'O.ペリエ',era:'海外名手',type:'大舞台型',bonus:{speed:1,stamina:1,kick:2,start:0,mud:0}}
];
const CUSTOM_JOCKEY_TYPES={
'バランス型':{speed:1,stamina:1,kick:1,start:1,mud:0},
'スピード型':{speed:2,stamina:0,kick:1,start:1,mud:-1},
'スタート型':{speed:1,stamina:0,kick:0,start:2,mud:1},
'末脚型':{speed:0,stamina:0,kick:2,start:1,mud:1},
'スタミナ型':{speed:0,stamina:2,kick:1,start:0,mud:1},
'道悪型':{speed:0,stamina:1,kick:0,start:0,mud:2}
};
const LEGENDS=[
['イクイノックス',100,'先行',100,99,99,94,92,1800,2500],['ディープインパクト',100,'追込',100,98,100,88,90,1800,3200],['オルフェーヴル',99,'追込',98,100,99,83,96,2000,3200],['アーモンドアイ',100,'差し',100,94,100,93,90,1600,2400],['キタサンブラック',99,'逃げ',96,100,94,99,93,2000,3200],['コントレイル',98,'差し',98,97,99,91,89,1800,3000],['ジェンティルドンナ',98,'先行',98,98,97,95,92,1800,2500],['ウオッカ',98,'差し',99,93,99,90,90,1600,2400],['ダイワスカーレット',98,'逃げ',97,97,95,99,93,1600,2500],['ロードカナロア',98,'先行',100,80,99,98,94,1000,1600],['エルコンドルパサー',98,'先行',97,98,97,95,97,1600,2500],['テイエムオペラオー',98,'先行',95,100,96,96,95,2000,3200],['ナリタブライアン',98,'先行',98,99,98,94,94,1800,3200],['シンボリルドルフ',98,'先行',97,100,96,97,93,2000,3200],['トウカイテイオー',97,'先行',98,96,98,94,91,1800,2500],['スペシャルウィーク',97,'差し',96,99,97,89,92,2000,3200],['グラスワンダー',97,'先行',98,96,98,94,95,1600,2500],['サイレンススズカ',97,'逃げ',100,91,96,100,92,1600,2200],['メジロマックイーン',97,'先行',94,100,93,96,96,2400,3200],['タイキシャトル',97,'先行',100,85,98,97,95,1200,1600],['クロフネ',97,'先行',99,92,98,96,98,1400,2100],['ゴールドシップ',97,'追込',93,100,97,75,98,2200,3200],['ブエナビスタ',97,'差し',97,96,100,87,92,1600,2400],['モーリス',97,'先行',99,91,99,95,94,1600,2000],['グランアレグリア',97,'差し',100,86,100,92,91,1200,1600],['ドウデュース',97,'差し',98,96,99,90,91,1800,2500],['リバティアイランド',97,'差し',98,95,99,91,90,1600,2400],['タイトルホルダー',96,'逃げ',95,100,92,99,95,2200,3200],['エフフォーリア',96,'先行',97,96,97,94,91,1800,2500],['ソダシ',95,'先行',97,89,95,96,95,1400,2000],['デアリングタクト',96,'差し',96,96,98,88,96,1600,2400],['シュネルマイスター',95,'差し',98,87,98,89,91,1400,1800],['パンサラッサ',95,'逃げ',98,91,91,100,93,1600,2000],['ジャスタウェイ',96,'差し',99,92,100,89,90,1600,2200],['ハーツクライ',96,'差し',96,98,98,88,92,2000,2500],['キングカメハメハ',97,'先行',98,96,97,96,94,1600,2400],['ゼンノロブロイ',96,'先行',96,98,96,95,92,2000,2500],['アグネスタキオン',97,'先行',99,94,99,94,96,1800,2400],['マンハッタンカフェ',96,'差し',94,100,97,86,94,2400,3200],['ナリタトップロード',95,'先行',94,99,94,95,94,2200,3200],['エアグルーヴ',96,'先行',96,96,97,94,93,1800,2400],['マヤノトップガン',96,'自在',96,99,97,91,95,2000,3200],['ビワハヤヒデ',96,'先行',96,100,95,97,94,2000,3200],['ミホノブルボン',96,'逃げ',97,97,92,100,94,1800,3000],['メジロライアン',94,'先行',94,97,94,95,93,2000,2500],['オグリキャップ',98,'先行',98,97,98,96,96,1600,2500],['タマモクロス',97,'差し',96,99,98,88,97,2000,3200],['スーパークリーク',96,'先行',94,100,94,95,96,2400,3200],['イナリワン',96,'差し',95,100,97,87,96,2200,3200],['ミスターシービー',96,'追込',96,98,99,82,91,1800,3200],['カツラギエース',94,'逃げ',94,96,92,99,93,1800,2500],['ハイセイコー',95,'先行',95,97,94,96,96,1600,2500],['シンザン',98,'先行',97,100,96,96,98,1800,3200],['セントライト',96,'先行',95,100,94,96,95,1800,3200],['テンポイント',97,'先行',96,100,96,97,95,2000,3200],['トウショウボーイ',96,'逃げ',98,94,95,99,93,1600,2500],['マルゼンスキー',98,'逃げ',100,93,98,100,94,1400,2400],['シービークロス',94,'追込',94,97,97,83,95,1800,2600],['ニホンピロウイナー',95,'先行',99,84,97,98,94,1200,1600],['サクラバクシンオー',96,'逃げ',100,78,98,100,94,1000,1400],['ノースフライト',95,'差し',99,85,98,91,93,1200,1600],['デュランダル',96,'追込',99,83,100,82,92,1200,1600],['カレンチャン',95,'先行',99,80,96,99,94,1000,1400],['ストレイトガール',94,'差し',98,82,97,91,93,1000,1600],['アドマイヤムーン',96,'差し',97,94,98,89,96,1600,2400],['スイープトウショウ',95,'追込',95,93,100,80,95,1600,2400],['ダンスインザムード',94,'先行',96,91,95,95,92,1600,2000],['ラインクラフト',94,'先行',97,87,96,96,91,1400,1800],['シーザリオ',97,'差し',98,95,99,89,93,1800,2400],['エピファネイア',97,'先行',98,98,97,92,95,2000,3000],['サートゥルナーリア',96,'先行',98,93,98,94,90,1800,2400],['ラヴズオンリーユー',96,'差し',97,95,98,90,92,1800,2400],['クロノジェネシス',97,'先行',96,98,97,94,99,2000,2500],['レイパパレ',94,'逃げ',96,93,94,98,98,1800,2200],['スタニングローズ',93,'先行',94,93,93,96,92,1800,2200],['スターズオンアース',96,'差し',97,96,98,88,92,1800,2500],['ナミュール',95,'差し',98,89,99,87,91,1400,2000],['セリフォス',95,'差し',99,85,98,90,91,1400,1800],['ジャンタルマンタル',96,'先行',99,89,97,97,92,1400,2000],['クロワデュノール',97,'先行',98,97,97,96,92,1800,2500],['ベラジオオペラ',95,'先行',96,95,95,96,93,1800,2200],['レガレイラ',96,'差し',97,96,99,87,94,1800,2500],['ドゥレッツァ',96,'先行',96,99,96,94,93,2200,3200],['ジャスティンパレス',95,'差し',95,99,97,88,92,2200,3200],['ブローザホーン',94,'差し',94,98,97,85,99,2200,3200],['テーオーロイヤル',95,'先行',94,100,95,93,96,2400,3400],['ソウルラッシュ',95,'差し',98,88,98,89,98,1400,1800],['ロマンチックウォリアー',98,'先行',98,97,98,96,95,1600,2200],['ウシュバテソーロ',97,'追込',96,98,100,82,98,1800,2400],['レモンポップ',97,'先行',99,93,96,99,97,1200,1800],['ホッコータルマエ',96,'先行',95,98,95,96,98,1800,2400],['コパノリッキー',96,'逃げ',97,95,94,99,97,1600,2200],['ヴァーミリアン',96,'先行',95,98,96,95,98,1800,2400],['カネヒキリ',96,'先行',97,96,96,96,97,1600,2200],['アドマイヤドン',95,'先行',95,97,95,96,96,1600,2200],['トランセンド',95,'逃げ',96,96,93,99,97,1600,2200],['スマートファルコン',96,'逃げ',98,96,94,100,98,1600,2200],['インティ',94,'逃げ',97,92,92,100,96,1600,2000],['オジュウチョウサン',96,'先行',92,100,94,96,99,2400,4200]
].map(x=>({name:x[0],rating:x[1],style:x[2]==='自在'?'先行':x[2],speed:x[3],stamina:x[4],kick:x[5],start:x[6],mud:x[7],best:[x[8],x[9]]}));
const state={screen:'home',history:[],mode:'party',wallet:+localStorage.getItem('kawakami-wallet')||10000,player:null,points:{speed:0,stamina:0,kick:0,start:0,mud:0},raceNo:1,venue:'東京',race:RACES[9],going:'良',fieldSize:10,field:[],betType:'win',selection:null,stake:500,result:[],seed:Date.now(),peer:null,hostConn:null,connections:new Map(),members:new Map(),roomCode:'',hostPeerId:'',isHost:false,racePayload:null,replay:false,selectedJockeyId:'take-yutaka',raceRuntime:null,whipSeen:new Set(),partyEntries:[],partyIndex:0,partyPoints:{speed:0,stamina:0,kick:0,start:0,mud:0},partyEditing:false,navToken:0,tournament:{total:1,current:1,schedule:[],scores:{},rounds:[]},roundSettled:false};
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function normalizeCode(s){return String(s||'').normalize('NFKC').trim().replace(/[\s　]+/g,'-').replace(/[^\p{L}\p{N}_-]/gu,'').slice(0,40)}
function makeRoomToken(){const a=new Uint32Array(3);if(window.crypto?.getRandomValues)crypto.getRandomValues(a);else for(let i=0;i<a.length;i++)a[i]=(Math.random()*0xffffffff)>>>0;return Array.from(a,n=>n.toString(36).padStart(7,'0')).join('').slice(0,20)}
function roomKey(code){let h=2166136261;for(const ch of code){h^=ch.codePointAt(0);h=Math.imul(h,16777619)}return `kawakami-v26-${(h>>>0).toString(36)}`}
function inviteUrl(){const u=new URL(location.href);u.search='';u.searchParams.set('join',state.roomCode);u.searchParams.set('peer',state.hostPeerId||peerId(state.roomCode));return u.toString()}
function saveWallet(){localStorage.setItem('kawakami-wallet',state.wallet);$('wallet').textContent=state.wallet.toLocaleString('ja-JP')}
function show(id,push=true){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$(id).classList.add('active');if(push&&state.screen!==id)state.history.push(state.screen);state.screen=id;$('backBtn').hidden=id==='home';$('homeBtn').hidden=id==='home';scrollTo(0,0)}
function stopCurrentFlow(){state.navToken++;state.raceRuntime=null;try{if(audioContext&&audioContext.state==='running')audioContext.suspend()}catch(e){}}
function goHome(){stopCurrentFlow();if(state.isHost||state.hostConn)leaveRoom();state.history=[];show('home',false)}
function goBack(){stopCurrentFlow();const prev=state.history.pop();if(prev)show(prev,false);else show('home',false)}
function seeded(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function setupSelects(){for(const id of ['partyVenue','partyNextVenue'])$(id).innerHTML=Object.keys(VENUES).map(v=>`<option>${v}</option>`).join('');for(const id of ['partyRace','partyNextRace'])$(id).innerHTML=RACES.map((r,i)=>`<option value="${i}" ${i===9?'selected':''}>${r.name}（${r.distance}m）</option>`).join('');$('partyVenue').value='東京';$('customJockeyType').innerHTML=Object.keys(CUSTOM_JOCKEY_TYPES).map(x=>`<option>${x}</option>`).join('');$('partyFamousHorse').innerHTML=LEGENDS.map((h,i)=>`<option value="${i}">${escapeHtml(h.name)}（${h.style}）</option>`).join('');$('partyFamousJockey').innerHTML=JOCKEYS.map(j=>`<option value="${j.id}">${escapeHtml(j.name)}（${j.era}・${j.type}）</option>`).join('');renderHostSchedule()}
function renderHostSchedule(){const count=Math.max(1,Math.min(10,+$('hostRaceCount').value||1));const defaults=[9,11,20,18,5,14,15,0,2,8];$('hostSchedule').innerHTML=Array.from({length:count},(_,i)=>`<div class="schedule-row"><b>第${i+1}R</b><select class="schedule-venue">${Object.keys(VENUES).map(v=>`<option ${v===(RACES[defaults[i]??9]?.venue||'東京')?'selected':''}>${v}</option>`).join('')}</select><select class="schedule-race">${RACES.map((r,ri)=>`<option value="${ri}" ${ri===(defaults[i]??9)?'selected':''}>${r.name}（${r.distance}m）</option>`).join('')}</select></div>`).join('')}
function randomPoints(target,type='ランダム'){ABILITIES.forEach(k=>target[k]=0);const presets={バランス型:[2,2,2,2,2],スピード型:[5,1,2,2,0],スタミナ型:[1,5,2,1,1],末脚型:[1,2,5,1,1],スタート型:[2,1,1,5,1],道悪型:[1,2,1,1,5]};const vals=presets[type];if(vals){ABILITIES.forEach((k,i)=>target[k]=vals[i]);return}for(let i=0;i<10;i++)target[ABILITIES[Math.floor(Math.random()*ABILITIES.length)]]++}
function renderAbilityEditor(containerId,leftId,target,rerender){const used=Object.values(target).reduce((a,b)=>a+b,0);$(leftId).textContent=10-used;$(containerId).innerHTML=ABILITIES.map(k=>{const n=90+target[k];return `<div class="ability-row"><b>${ABILITY_LABEL[k]}</b><button data-k="${k}" data-d="-1">−</button><div><div class="score">${n}</div><div class="ability-bar"><i style="width:${n}%"></i></div></div><button data-k="${k}" data-d="1">＋</button></div>`}).join('');$(`${containerId}`).querySelectorAll('.ability-row button').forEach(b=>b.onclick=()=>{const k=b.dataset.k,d=+b.dataset.d,current=Object.values(target).reduce((a,c)=>a+c,0);if(d>0&&current>=10)return;if(d<0&&target[k]<=0)return;target[k]+=d;rerender()})}
function renderAbility(){renderAbilityEditor('abilityEditor','pointsLeft',state.points,renderAbility)}
function renderPartyAbility(){renderAbilityEditor('partyAbilityEditor','partyPointsLeft',state.partyPoints,renderPartyAbility)}
function createPlayer(){const horse=$('horseName').value.trim(),used=Object.values(state.points).reduce((a,b)=>a+b,0);if(!horse){$('createError').textContent='馬の名前を入力してな。';return null}if(used!==10){$('createError').textContent='追加10ポイントを全部使い切ってな。';return null}$('createError').textContent='';const jockeyName=$('customJockeyName').value.trim();if(!jockeyName){$('createError').textContent='オンライン騎手の名前も入力してな。';return null}const jt=$('customJockeyType').value;return{id:crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random(),name:'オンライン参加者',horse,style:$('horseStyle').value,abilities:Object.fromEntries(ABILITIES.map(k=>[k,90+state.points[k]])),jockey:{id:'custom-'+Date.now(),name:jockeyName,era:'オリジナル',type:jt,bonus:{...CUSTOM_JOCKEY_TYPES[jt]}}}}
function beginCreate(mode){state.mode=mode;state.points={speed:0,stamina:0,kick:0,start:0,mud:0};$('createTitle').textContent=mode==='host'?'主催する馬を作る':'参加する馬を作る';renderAbility();show('horseCreate')}
function onCreateNext(){const p=createPlayer();if(!p)return;state.player=p;if(state.mode==='host')show('hostSetup');else joinRoom()}
function chosenRace(prefix){if(prefix==='host'){const first=readHostSchedule()[0]||{venue:'東京',race:RACES[9]};return{venue:first.venue,race:first.race,going:$('hostGoing').value,fieldSize:+$('hostFieldSize').value}}const idx=+$(`${prefix}Race`).value;return{venue:$(`${prefix}Venue`).value,race:RACES[idx],going:$(`${prefix}Going`).value,fieldSize:+$(`${prefix}FieldSize`).value}}
function readHostSchedule(){return [...document.querySelectorAll('.schedule-row')].map(row=>({venue:row.querySelector('.schedule-venue').value,race:RACES[+row.querySelector('.schedule-race').value]}))}
function setRunnerJockey(h,j){h.jockey={...j,bonus:{...j.bonus}};ABILITIES.forEach(k=>h[k]=Math.max(70,Math.min(105,(h['base'+k[0].toUpperCase()+k.slice(1)]??h[k])+Number(j.bonus[k]||0))));h.rating=Math.round(ABILITIES.reduce((a,k)=>a+h[k],0)/ABILITIES.length);return h}
function legendToRunner(h,i,j){const r={number:i+1,name:h.name,owner:'名馬',style:h.style,baseSpeed:h.speed,baseStamina:h.stamina,baseKick:h.kick,baseStart:h.start,baseMud:h.mud,best:h.best,isPlayer:false};return setRunnerJockey(r,j)}
function playerToRunner(p,i){const a=p.abilities,r={number:i+1,name:p.horse,owner:p.name,style:p.style,baseSpeed:a.speed,baseStamina:a.stamina,baseKick:a.kick,baseStart:a.start,baseMud:a.mud,best:[1200,3200],isPlayer:true,playerId:p.id};return setRunnerJockey(r,p.jockey||{id:'custom',name:'オリジナル騎手',era:'オリジナル',type:'バランス型',bonus:CUSTOM_JOCKEY_TYPES['バランス型']})}
function shuffled(arr,rnd){return arr.map(v=>[rnd(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}
function makeField(players=[]){const rnd=seeded(state.seed);const selected=[];players.forEach(p=>selected.push(playerToRunner(p,selected.length)));const pool=shuffled(LEGENDS,rnd),jp=shuffled(JOCKEYS,rnd);while(selected.length<state.fieldSize){const h=pool.shift();if(!selected.some(x=>x.name===h.name))selected.push(legendToRunner(h,selected.length,jp[selected.length%jp.length]))}selected.forEach((h,i)=>h.number=i+1);state.field=selected;calculateProbabilities()}
function baseScore(h){const D=state.race.distance,mid=(h.best[0]+h.best[1])/2,range=Math.max(500,(h.best[1]-h.best[0])/2),distFit=Math.max(-8,6-Math.abs(D-mid)/range*7);const longW=Math.max(0,Math.min(1,(D-1200)/2000));const shortW=1-longW;let score=h.speed*.29+h.stamina*(.19+.22*longW)+h.kick*.25+h.start*(.16*shortW+.05)+h.rating*.08+distFit;const goingWeight={良:0,稍重:.05,重:.10,不良:.16}[state.going];score+=h.mud*goingWeight;score+=({逃げ:state.venue==='東京'?-1:1,先行:1,差し:state.venue==='東京'?2:0,追込:state.venue==='東京'?2:-1}[h.style]||0);return score}
function calculateProbabilities(){const scores=state.field.map(baseScore),max=Math.max(...scores),weights=scores.map(s=>Math.exp((s-max)/5.2)),sum=weights.reduce((a,b)=>a+b,0);state.field.forEach((h,i)=>{h.power=scores[i];h.winProb=weights[i]/sum;h.placeProb=Math.min(.88,h.winProb*2.2+.08);h.winOdds=Math.max(1.2,Math.min(99.9,.82/h.winProb));h.placeOdds=Math.max(1.1,Math.min(20,.78/h.placeProb))})}
function conditionText(){return `${state.venue} 芝${state.race.distance}m・${state.going}・${VENUES[state.venue].turn}回り`}
function bonusText(j){return ABILITIES.map(k=>{const v=Number(j.bonus?.[k]||0);return v?`${ABILITY_LABEL[k]}${v>0?'+':''}${v}`:''}).filter(Boolean).join(' / ')||'能力補正なし'}
function renderJockeyPicker(){const panel=$('jockeyPanel'),h=state.field.find(x=>x.number===state.selection);if(!h){panel.hidden=true;return}panel.hidden=false;if(state.mode!=='solo'){panel.innerHTML=`<h3>騎手</h3><div class="jockey-current"><b>${escapeHtml(h.jockey?.name||'未設定')}</b><small>${escapeHtml(h.jockey?.type||'')}・${escapeHtml(bonusText(h.jockey||{bonus:{}}))}</small></div><p class="hint">オンラインでは各プレイヤーが作成した騎手が自分の馬に騎乗します。</p>`;return}panel.innerHTML=`<h3>騎手を選ぶ</h3><label><select id="jockeySelect">${JOCKEYS.map(j=>`<option value="${j.id}" ${h.jockey?.id===j.id?'selected':''}>${escapeHtml(j.name)}（${j.era}・${j.type}）</option>`).join('')}</select></label><div class="jockey-current"><b>${escapeHtml(h.jockey.name)}</b><small>${escapeHtml(bonusText(h.jockey))}</small></div><p class="hint">騎手能力はゲーム用の架空設定です。変更すると勝率とオッズを再計算します。</p>`;const sel=$('jockeySelect');sel.onchange=()=>{const j=JOCKEYS.find(x=>x.id===sel.value);if(j){setRunnerJockey(h,j);state.selectedJockeyId=j.id;calculateProbabilities();renderBet()}}}
function renderBet(){calculateProbabilities();$('raceLabel').textContent=`第${state.raceNo}競走`;$('raceTitle').textContent=state.race.name;$('raceConditions').textContent=conditionText();const top=[...state.field].sort((a,b)=>b.winProb-a.winProb)[0];$('bestChance').innerHTML=`能力予測1位<br><b>${top.number}番 ${escapeHtml(top.name)}</b><br>${(top.winProb*100).toFixed(1)}%`;$('winTab').classList.toggle('active',state.betType==='win');$('placeTab').classList.toggle('active',state.betType==='place');$('oddsList').innerHTML=state.field.map(h=>`<button class="horse-row ${state.selection===h.number?'selected':''}" data-n="${h.number}"><span class="horse-num" style="background:${COLORS[(h.number-1)%COLORS.length]};color:${h.number===2?'white':'#111'}">${h.number}</span><span class="horse-info"><b>${escapeHtml(h.name)}</b><small>${escapeHtml(h.owner)}・${h.style}・騎手 ${escapeHtml(h.jockey?.name||'未設定')}・能力${h.rating}</small></span><span class="horse-odds"><b>${(state.betType==='win'?h.winOdds:h.placeOdds).toFixed(1)}倍</b><small>${state.betType==='win'?'勝率':'複勝率'} ${(100*(state.betType==='win'?h.winProb:h.placeProb)).toFixed(1)}%</small></span></button>`).join('');document.querySelectorAll('.horse-row').forEach(b=>b.onclick=()=>{state.selection=+b.dataset.n;renderBet();updateTicket()});renderJockeyPicker();updateTicket();show('bet')}
function availablePoints(){if(state.mode==='host'||state.mode==='join')return Number(state.tournament?.scores?.[state.player?.id]??10000);return state.wallet}
function updateTicket(){const h=state.field.find(x=>x.number===state.selection);state.stake=Math.max(0,+$('stake').value||0);if(!h){$('ticketName').textContent='馬を選択';$('ticketOdds').textContent='--';$('ticketPayout').textContent='--';$('raceStartBtn').disabled=true;return}const odds=state.betType==='win'?h.winOdds:h.placeOdds;$('ticketName').textContent=`${state.betType==='win'?'単勝':'複勝'} ${h.number}番 ${h.name}`;$('ticketOdds').textContent=`${odds.toFixed(1)}倍`;$('ticketPayout').textContent=`${Math.floor(state.stake*odds).toLocaleString('ja-JP')}pt`;$('raceStartBtn').disabled=state.stake<100||state.stake>availablePoints()}
function setBet(type){state.betType=type;state.selection=null;renderBet()}
async function startFromBet(){updateTicket();if($('raceStartBtn').disabled)return;await unlockAudio();if(state.mode!=='host'&&state.mode!=='join'){state.wallet-=state.stake;saveWallet();}if(state.mode==='join'){sendHost({type:'ready',playerId:state.player.id,selection:state.selection,betType:state.betType,stake:state.stake});show('waiting')}else if(state.mode==='host'){state.members.get(state.player.id).ready={selection:state.selection,betType:state.betType,stake:state.stake};broadcastMembers();const waiting=[...state.members.values()].filter(m=>!m.ready);if(waiting.length){alert(`まだ${waiting.length}人が馬券を確定していません。全員の準備完了後にもう一度押してな。`);state.members.get(state.player.id).ready=null;broadcastMembers();return}prepareOnlineRace()}else startCountdown({seed:state.seed,field:state.field,startAt:Date.now()+3300})}
function createRoom(){$('hostError').textContent='';const schedule=readHostSchedule();if(!schedule.length){$('hostError').textContent='開催レースを1つ以上選んでな。';return}Object.assign(state,chosenRace('host'));state.raceNo=1;state.tournament={total:schedule.length,current:1,schedule:schedule.map(x=>({venue:x.venue,race:x.race})),scores:{[state.player.id]:10000},rounds:[]};state.roundSettled=false;state.roomCode=makeRoomToken();state.isHost=true;state.mode='host';state.members=new Map([[state.player.id,{...state.player,ready:null,host:true,tournamentPoints:10000}]]);openHostPeer()}
function peerId(code){return roomKey(normalizeCode(code))}
function openHostPeer(){cleanupPeer();$('lobbyStatus').textContent='ルームを作成しています…';show('lobby');renderLobby();if(typeof Peer==='undefined'){$('lobbyStatus').textContent='通信ライブラリを読み込めませんでした。Safariのコンテンツブロッカーを一度OFFにして再読み込みしてな。';return}try{const id=peerId(state.roomCode);state.hostPeerId=id;state.peer=new Peer(id,{debug:1});const timer=setTimeout(()=>{if(!state.peer?.open)$('lobbyStatus').textContent='作成に時間がかかっています。通信を切り替えるか再読み込みしてな。'},12000);state.peer.on('open',()=>{clearTimeout(timer);$('lobbyStatus').textContent='ルームを作成しました。QRコードを共有して友達の参加を待っています。';$('startOnlineBtn').hidden=false;renderQr();renderLobby()});state.peer.on('connection',conn=>{conn.on('open',()=>{state.connections.set(conn.peer,conn);conn.on('data',data=>hostReceive(conn,data));conn.on('close',()=>removeByConn(conn));conn.on('error',()=>removeByConn(conn));conn.send({type:'hello',room:state.roomCode,config:raceConfig(),members:[...state.members.values()]})})});state.peer.on('disconnected',()=>{$('lobbyStatus').textContent='通信が一時的に切れました。再接続しています…';setTimeout(()=>{try{state.peer?.reconnect()}catch(e){}},700)});state.peer.on('error',e=>{clearTimeout(timer);const msg={"unavailable-id":'ルームIDが重複しました。もう一度ルームを作り直してな。',"network":'ネットワークに接続できません。Wi-Fiとモバイル通信を切り替えて試してな。',"server-error":'通信サーバーが混雑しています。少し待ってもう一度試してな。',"browser-incompatible":'このブラウザではオンライン通信を利用できません。Safariで開いてな。'}[e.type];$('lobbyStatus').textContent=msg||`ルーム作成に失敗しました（${e.type||'通信エラー'}）。`})}catch(e){$('lobbyStatus').textContent='オンライン機能の開始に失敗しました。Safariでページを再読み込みしてな。'}}
function joinRoom(){
 const code=normalizeCode(state.roomCode),target=normalizeCode(state.hostPeerId)||peerId(code);
 if(code.length<8||target.length<4){alert('参加用QRコードが正しくありません。');goHome();return}
 state.roomCode=code;state.hostPeerId=target;state.isHost=false;state.mode='join';show('lobby');renderLobby();cleanupPeer();
 if(typeof Peer==='undefined'){$('lobbyStatus').textContent='通信ライブラリを読み込めませんでした。Safariで再読み込みしてな。';return}
 let attempt=0,connected=false;
 const connect=()=>{
  if(connected||attempt>=3)return;attempt++;$('lobbyStatus').textContent=`主催者に接続しています…（${attempt}/3）`;
  try{
   if(state.peer)state.peer.destroy();state.peer=new Peer(undefined,{debug:1});
   state.peer.on('open',()=>{
    const conn=state.peer.connect(target,{reliable:true,serialization:'json'});state.hostConn=conn;
    const timer=setTimeout(()=>{if(!connected){try{conn.close()}catch(e){};setTimeout(connect,700)}},9000);
    conn.on('open',()=>{connected=true;clearTimeout(timer);$('lobbyStatus').textContent='接続しました。参加情報を送信しています…';conn.on('data',joinReceive);conn.on('close',()=>{$('lobbyStatus').textContent='主催者との接続が切れました。'});conn.on('error',()=>{$('lobbyStatus').textContent='通信中にエラーが発生しました。'});conn.send({type:'join',player:state.player,invite:code,clientVersion:28})});
    conn.on('error',()=>{clearTimeout(timer);if(!connected)setTimeout(connect,700)});
   });
   state.peer.on('error',e=>{if(!connected&&attempt<3)setTimeout(connect,700);else $('lobbyStatus').textContent=`参加できませんでした（${e.type||'通信エラー'}）。主催者がロビーを開いたままか確認してな。`});
  }catch(e){if(attempt<3)setTimeout(connect,700);else $('lobbyStatus').textContent='オンライン機能を開始できませんでした。'}
 };
 connect()
}
function hostReceive(conn,data){if(!data||!data.type)return;if(data.type==='join'){const p=data.player;if(!p||!p.id||data.invite!==state.roomCode)return;state.members.set(p.id,{...p,ready:null,connPeer:conn.peer,tournamentPoints:state.tournament.scores[p.id]??10000});state.tournament.scores[p.id]=state.tournament.scores[p.id]??10000;conn.playerId=p.id;broadcastMembers();renderLobby()}if(data.type==='ready'){const m=state.members.get(data.playerId);if(m){m.ready={selection:data.selection,betType:data.betType,stake:data.stake};broadcastMembers();renderLobby()}}if(data.type==='profileUpdate'){const m=state.members.get(data.playerId);if(m){m.name=data.name;m.horse=data.horse;m.ready=null;if(state.player?.id===m.id)state.player={...state.player,name:data.name,horse:data.horse};broadcastMembers();renderLobby()}}if(data.type==='whip'){broadcast(data);applyWhipEvent(data)}}
function joinReceive(data){if(!data||!data.type)return;if(data.type==='hello'){Object.assign(state,data.config);state.members=new Map(data.members.map(m=>[m.id,m]));$('lobbyStatus').textContent='ルームに参加しました。';renderLobby()}if(data.type==='members'){state.members=new Map(data.members.map(m=>[m.id,m]));renderLobby()}if(data.type==='goBet'){Object.assign(state,data.config);state.seed=data.seed;state.field=data.field;state.selection=null;state.betType='win';renderBet()}if(data.type==='startRace'){state.racePayload=data.payload;startCountdown(data.payload)}if(data.type==='whip')applyWhipEvent(data);if(data.type==='roundStanding'){state.tournament=data.tournament;renderTournamentRanking();}if(data.type==='nextRound'){Object.assign(state,data.config);state.members=new Map(data.members.map(m=>[m.id,m]));state.selection=null;state.result=[];renderLobby();show('lobby')}if(data.type==='finalStanding'){state.tournament=data.tournament;showTournamentFinal()}if(data.type==='roomClosed'){$('lobbyStatus').textContent='主催者がルームを終了しました。'}}
function raceConfig(){return{venue:state.venue,race:state.race,going:state.going,fieldSize:state.fieldSize,raceNo:state.raceNo,tournament:state.tournament}}
function broadcast(data){state.connections.forEach(c=>{if(c.open)c.send(data)})}
function sendHost(data){if(state.hostConn&&state.hostConn.open)state.hostConn.send(data)}
function broadcastMembers(){broadcast({type:'members',members:[...state.members.values()]})}
function removeByConn(conn){if(conn.playerId)state.members.delete(conn.playerId);state.connections.delete(conn.peer);broadcastMembers();renderLobby()}
function renderLobby(){if(!state.roomCode)return;const t=state.tournament||{current:1,total:1};$('tournamentProgress').innerHTML=`<div><small>TOURNAMENT</small>第${t.current||1}レース / 全${t.total||1}レース</div><div>${state.isHost?'主催中':'参加中'}</div>`;$('lobbyRaceTitle').textContent=state.race?state.race.name:'レース情報を待っています';$('lobbyConditions').textContent=state.race?conditionText():'';$('lobbyMembers').innerHTML=[...state.members.values()].map((m,i)=>`<div class="member"><span class="badge">${i+1}</span><div><b>${escapeHtml(m.horse)}</b><small>${m.style}・騎手 ${escapeHtml(m.jockey?.name||'未設定')}${m.host?'・主催者':''}</small></div><span><b>${Number(state.tournament?.scores?.[m.id]??m.tournamentPoints??10000).toLocaleString('ja-JP')}pt</b><small>${m.ready?'✅ 馬券確定':'待機中'}</small></span></div>`).join('')||'<p class="hint">参加者情報を待っています。</p>';$('startOnlineBtn').hidden=!state.isHost}
function renderQr(){const url=inviteUrl();$('qr').innerHTML='';if(window.QRCode)new QRCode($('qr'),{text:url,width:154,height:154,correctLevel:QRCode.CorrectLevel.H});$('shareBtn').dataset.url=url}
function hostGoBet(){state.seed=Date.now();const scheduled=state.tournament.schedule[(state.tournament.current||1)-1];if(scheduled){state.venue=scheduled.venue;state.race=scheduled.race;state.raceNo=state.tournament.current}const players=shuffled([...state.members.values()],seeded(state.seed+77));makeField(players);const data={type:'goBet',config:raceConfig(),seed:state.seed,field:state.field};broadcast(data);state.selection=null;state.betType='win';state.roundSettled=false;renderBet()}
function prepareOnlineRace(){const payload={seed:state.seed,field:state.field,startAt:Date.now()+4000,config:raceConfig()};broadcast({type:'startRace',payload});startCountdown(payload)}
function leaveRoom(){if(state.isHost)broadcast({type:'roomClosed'});cleanupPeer();state.members.clear();state.roomCode='';state.hostPeerId='';state.isHost=false;show('home')}
function cleanupPeer(){try{if(state.hostConn)state.hostConn.close();state.connections.forEach(c=>c.close());if(state.peer)state.peer.destroy()}catch(e){}state.peer=null;state.hostConn=null;state.connections=new Map()}
let audioContext=null;
function getAudioContext(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;if(!audioContext)audioContext=new C();return audioContext}catch(e){return null}}
async function unlockAudio(){try{const ac=getAudioContext();if(!ac)return false;if(ac.state==='suspended')await ac.resume();const o=ac.createOscillator(),g=ac.createGain();g.gain.value=.00001;o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+.02);return ac.state==='running'}catch(e){return false}}
function fanfareTheme(name){
 const east=['日本ダービー','皐月賞','天皇賞（秋）','ジャパンカップ','安田記念','NHKマイルC'];
 const west=['宝塚記念','大阪杯','桜花賞','菊花賞','天皇賞（春）'];
 const grand=['有馬記念'];
 if(grand.includes(name))return{label:'GRAND PRIX BRASS FANFARE',tempo:126,key:53,phrase:[0,7,12,16,19,16,12,14,17,21,24,19,24,28]};
 if(west.includes(name))return{label:'WEST G1 BRASS FANFARE',tempo:138,key:55,phrase:[0,5,9,12,9,14,17,21,19,17,21,24,26,24]};
 if(east.includes(name))return{label:'EAST G1 BRASS FANFARE',tempo:144,key:58,phrase:[0,4,7,12,11,14,19,16,19,23,21,24,28,24]};
 return{label:'CHAMPIONSHIP BRASS FANFARE',tempo:140,key:57,phrase:[0,4,7,12,9,14,17,21,19,16,21,24,26,24]}
}
async function playOriginalFanfare(raceName){
 const th=fanfareTheme(raceName);const fanfareLabel=$('fanfareLabel');if(fanfareLabel)fanfareLabel.textContent=th.label;
 try{const ac=getAudioContext();if(!ac)return false;if(ac.state==='suspended'){try{await ac.resume()}catch(e){return false}}if(ac.state!=='running')return false;
 const beat=60/th.tempo,t0=ac.currentTime+.08,dur=th.phrase.length*beat;
 const master=ac.createGain(),comp=ac.createDynamicsCompressor(),reverb=ac.createConvolver();
 const ir=ac.createBuffer(2,ac.sampleRate*.95,ac.sampleRate);for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2.8)}reverb.buffer=ir;
 const dry=ac.createGain(),wet=ac.createGain();dry.gain.value=.82;wet.gain.value=.22;master.connect(dry);master.connect(reverb);reverb.connect(wet);dry.connect(comp);wet.connect(comp);comp.connect(ac.destination);
 master.gain.setValueAtTime(.0001,t0);master.gain.exponentialRampToValueAtTime(.34,t0+.07);master.gain.setValueAtTime(.34,t0+dur-.45);master.gain.exponentialRampToValueAtTime(.0001,t0+dur+.55);
 const horn=(m,start,len,vol,bright=1)=>{const f=440*Math.pow(2,((m-69)/12)),mix=ac.createGain(),bp=ac.createBiquadFilter(),lp=ac.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1000+bright*650;bp.Q.value=.75;lp.type='lowpass';lp.frequency.value=3200+bright*900;mix.connect(bp);bp.connect(lp);lp.connect(master);[0,1,2].forEach((k)=>{const o=ac.createOscillator(),g=ac.createGain();o.type=k===0?'sawtooth':k===1?'square':'triangle';o.frequency.setValueAtTime(f*(1+[0,.0035,-.004][k]),start);g.gain.setValueAtTime(.0001,start);g.gain.exponentialRampToValueAtTime(vol*[1,.22,.16][k],start+.025+k*.006);g.gain.exponentialRampToValueAtTime(vol*[.62,.12,.09][k],start+len*.72);g.gain.exponentialRampToValueAtTime(.0001,start+len);o.connect(g);g.connect(mix);o.start(start);o.stop(start+len+.04)});};
 const timp=(start,strong=false)=>{const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(strong?105:125,start);o.frequency.exponentialRampToValueAtTime(58,start+.18);g.gain.setValueAtTime(.0001,start);g.gain.exponentialRampToValueAtTime(strong?.22:.10,start+.008);g.gain.exponentialRampToValueAtTime(.0001,start+.42);o.connect(g);g.connect(master);o.start(start);o.stop(start+.45)};
 th.phrase.forEach((n,i)=>{const st=t0+i*beat,len=beat*(i===th.phrase.length-1?2.1:.92);horn(th.key+n,st,len,.095,i%4===3?1.4:1);if(i%2===0)horn(th.key+n-12,st,len*1.08,.034,.5);if(i%4===0)timp(st,true);else if(i%2===0)timp(st,false)});
 [0,4,8,12].forEach(i=>{if(i>=th.phrase.length)return;const st=t0+i*beat;[th.key-12,th.key-5,th.key].forEach((m,j)=>horn(m,st,beat*3.3,.025/(j+1),.25))});
 await new Promise(r=>setTimeout(r,Math.min(7200,(dur+.7)*1000)));return true
 }catch(e){console.warn('fanfare failed',e);return false}
}
function renderStartingGate(field){const gate=$('startingGate');gate.classList.remove('open');gate.innerHTML=field.map(h=>`<div class="gate-stall"><span class="gate-num" style="background:${COLORS[(h.number-1)%COLORS.length]};color:${h.number===2?'#fff':'#111'}">${h.number}</span><div class="gate-horse">🐎</div><i></i></div>`).join('')}

async function playRaceFanfare(raceName){try{return await playOriginalFanfare(raceName)}catch(e){console.warn(e);return false}}

function playGateBang(){
 const ac=getAudioContext();if(!ac)return;
 const t=ac.currentTime+.015,master=ac.createGain();master.connect(ac.destination);master.gain.setValueAtTime(.9,t);master.gain.exponentialRampToValueAtTime(.0001,t+.22);
 const noise=ac.createBuffer(1,Math.floor(ac.sampleRate*.22),ac.sampleRate),d=noise.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3.2);
 const src=ac.createBufferSource(),hp=ac.createBiquadFilter();src.buffer=noise;hp.type='highpass';hp.frequency.value=650;src.connect(hp);hp.connect(master);src.start(t);
 const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.setValueAtTime(145,t);o.frequency.exponentialRampToValueAtTime(62,t+.13);g.gain.setValueAtTime(.7,t);g.gain.exponentialRampToValueAtTime(.0001,t+.18);o.connect(g);g.connect(master);o.start(t);o.stop(t+.2)
}
function drawRaceScene(ctx,runners,{gateOpen=0,showGate=false}={}){
 const w=ctx.canvas.width,h=ctx.canvas.height;ctx.clearRect(0,0,w,h);
 const sky=ctx.createLinearGradient(0,0,0,h*.45);sky.addColorStop(0,'#82c9ff');sky.addColorStop(1,'#e8f5ff');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h*.35);
 ctx.fillStyle='#1f7c42';ctx.fillRect(0,h*.35,w,h*.65);ctx.fillStyle='#c69a61';ctx.fillRect(0,h*.48,w,h*.47);
 for(let i=0;i<=runners.length;i++){const y=h*.48+i*(h*.47/runners.length);ctx.strokeStyle='#ffffff88';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
 const start=w*.10,goal=w*.93,trackW=goal-start;
 ctx.fillStyle='#ffe34f';ctx.fillRect(start-5,h*.42,10,h*.55);
 for(let y=h*.42;y<h*.97;y+=20){ctx.fillStyle=((y/20)|0)%2?'#fff':'#111';ctx.fillRect(goal-7,y,14,20)}
 const horseScale=Math.max(.75,Math.min(1.25,w/1050));
 const gateHorseX=start-(38*horseScale); // 鼻先までスタートラインの手前に収める
 runners.forEach((r,i)=>{const lane=Number.isFinite(r.lane)?r.lane:i;const laneY=h*.48+(lane+.5)*(h*.47/runners.length);const x=gateHorseX+trackW*Math.max(0,r.display||0);drawHorse(ctx,x,laneY,r,lane)});
 if(showGate){
   const stallW=Math.max(28,w*.048),gateX=gateHorseX-stallW*.28,gateTop=h*.46,gateBottom=h*.95;
   ctx.fillStyle='#c7d0ca';ctx.fillRect(gateX-stallW*.55,gateTop,stallW*1.18,gateBottom-gateTop);ctx.strokeStyle='#eef4f0';ctx.lineWidth=3;ctx.strokeRect(gateX-stallW*.55,gateTop,stallW*1.18,gateBottom-gateTop);
   const ease=1-Math.pow(1-Math.max(0,Math.min(1,gateOpen)),3),doorShift=ease*stallW*.92;
   ctx.strokeStyle='#7e8c84';ctx.lineWidth=Math.max(3,w*.006);for(let k=-2;k<=2;k++){const x=gateX+k*stallW*.12;ctx.beginPath();ctx.moveTo(x-doorShift,gateTop);ctx.lineTo(x-doorShift,gateBottom);ctx.stroke();ctx.beginPath();ctx.moveTo(x+doorShift,gateTop);ctx.lineTo(x+doorShift,gateBottom);ctx.stroke()}
 }
 ctx.fillStyle='#103d22';ctx.fillRect(0,h*.95,w,h*.05);ctx.fillStyle='#fff';ctx.font=`700 ${Math.max(16,w*.018)}px sans-serif`;ctx.fillText('START',start-30,h*.44);ctx.fillText('GOAL',goal-28,h*.44)
}
function drawPreRaceGate(ctx,runners,open=0){drawRaceScene(ctx,runners,{gateOpen:open,showGate:true})}

async function startCountdown(payload){
 const token=++state.navToken;state.racePayload=payload;state.seed=payload.seed;state.field=payload.field;Object.assign(state,payload.config||{});show('race');
 $('liveTitle').textContent=state.race.name;$('liveCond').textContent=conditionText();$('remaining').textContent=`${state.race.distance}m`;$('commentary').textContent='全馬ゲートイン。ファンファーレ演奏を開始します。';$('leaderText').innerHTML='<span>全馬ゲート内で待機中</span>';$('clock').textContent='0:00.0';$('whipPanel').hidden=true;
 const canvas=$('track'),ctx=canvas.getContext('2d');resizeCanvas(canvas);const preview=payload.field.map((h,i)=>({...h,display:0,lane:i}));drawPreRaceGate(ctx,preview,0);
 let played=false;
 try{await unlockAudio();if(token!==state.navToken)return;$('leaderText').innerHTML='<span>🎺 ファンファーレ演奏中</span>';$('commentary').textContent='全馬ゲートイン。ファンファーレ演奏中です。';played=await Promise.race([playRaceFanfare(state.race.name),new Promise(resolve=>setTimeout(()=>resolve(false),8500))])}catch(e){console.warn('race fanfare error',e)}
 if(token!==state.navToken)return;
 if(!played){$('commentary').textContent='ファンファーレ演奏を終え、まもなく発走します。';await new Promise(r=>setTimeout(r,700))}
 if(token!==state.navToken)return;
 $('commentary').textContent='パンッ！ ゲートオープン！';$('leaderText').innerHTML='<span>スタート！</span>';
 try{await unlockAudio();playGateBang()}catch(e){console.warn('gate sound error',e)}
 runRace(payload,token)
}
function officialPlan(field,seed){
 const rnd=seeded(seed^0x9e3779b9);
 // 能力は勝ちやすさへ反映するが、着順を固定しない。
 // レースごとの展開・位置取り・当日の揺らぎを別々に加え、全枠に全着順の可能性を持たせる。
 const rows=field.map((h,gateIndex)=>{
  const ability=baseScore(h);
  const condition=(rnd()+rnd()+rnd()-1.5)*18;
  const tactics=(rnd()-.5)*24;
  const breakLuck=(rnd()-.5)*14;
  const tieBreaker=rnd()*1e-4;
  return {h,gateIndex,score:ability*.72+condition+tactics+breakLuck+tieBreaker}
 }).sort((a,b)=>b.score-a.score);
 const winnerTime=26.80+rnd()*.35;
 // 毎回差も変える。1〜3着は見分けられる僅差、後続も同じ間隔にはしない。
 let gap=0;
 return rows.map((x,rank)=>{
  if(rank>0){
   const min=rank===1?.24:rank===2?.20:.14;
   const spread=rank<3?.34:.30;
   gap+=min+rnd()*spread;
  }
  return {...x.h,gateIndex:x.gateIndex,finalRank:rank,finishWall:winnerTime+gap}
 })
}
function styleBand(style,phase){
 // 前半は脚質を強く維持し、中盤から差し・追込が進出する。
 if(phase<.36){
  if(style==='逃げ')return .060;
  if(style==='先行')return .030;
  if(style==='差し')return -.018;
  if(style==='追込')return -.045;
 }
 if(phase<.72){
  const u=(phase-.36)/.36;
  if(style==='逃げ')return .060-.072*u;
  if(style==='先行')return .030-.012*u;
  if(style==='差し')return -.018+.050*u;
  if(style==='追込')return -.045+.080*u;
 }
 const u=(phase-.72)/.28;
 if(style==='逃げ')return -.012-.012*u;
 if(style==='先行')return .018-.005*u;
 if(style==='差し')return .032+.016*u;
 if(style==='追込')return .035+.030*u;
 return 0
}
function buildRaceTimeline(runners,seed,distance){
 const rnd=seeded(seed^0x37a11ce);
 // 1.5秒ごとの密なアンカーで、加速差による抜きつ抜かれつを滑らかに描く。
 const times=[];for(let t=0;t<=RACE_DURATION+.0001;t+=.9)times.push(+t.toFixed(2));
 const compressionStart=Math.max(.50,1-700/distance);
 const sameStyleIndex={};
 runners.forEach(r=>{const k=r.style;const n=sameStyleIndex[k]||0;sameStyleIndex[k]=n+1;r.rivalIndex=n});
 runners.forEach((r,idx)=>{
  const pts=[];
  let prev=0;
  const phaseA=rnd()*Math.PI*2,phaseB=rnd()*Math.PI*2,phaseC=rnd()*Math.PI*2;
  const surgeAt1=.18+rnd()*.18,surgeAt2=.43+rnd()*.20,surgeAt3=.70+rnd()*.16;
  const surge1=(rnd()-.36)*.050,surge2=(rnd()-.42)*.060,surge3=(rnd()-.45)*.070;
  times.forEach((t,k)=>{
   const ph=t/RACE_DURATION;
   let raw=ph;
   // 脚質の基本隊列。終盤まで特徴を残しつつ、徐々に差を縮める。
   const comp=smooth((ph-compressionStart)/Math.max(.08,1-compressionStart));
   raw+=styleBand(r.style,ph)*(1-comp*.72);
   // 同脚質同士の競り合い。位相をずらし、何度も前後関係が入れ替わる。
   const rivalry=Math.sin(ph*13.5+phaseA+r.rivalIndex*1.7)*(.020+.012*Math.sin(Math.PI*ph));
   // 全体のうねりと個別の加速。瞬間移動ではなく連続曲線になる。
   const wave2=Math.sin(ph*22+phaseB)*.012*Math.sin(Math.PI*ph);
   const wave3=Math.sin(ph*7.5+phaseC)*.010*Math.sin(Math.PI*ph);
   const bell=(x,c,w)=>Math.exp(-Math.pow((x-c)/w,2));
   raw+=rivalry+wave2+wave3+surge1*bell(ph,surgeAt1,.075)+surge2*bell(ph,surgeAt2,.085)+surge3*bell(ph,surgeAt3,.075);
   // 残り700mから馬群を詰めるが、横一列には吸着させない。
   const rankGap=r.finalRank*.0065;
   const packTarget=ph-rankGap;
   raw=raw*(1-comp*.58)+packTarget*(comp*.58);
   // 残り300mは一番激しく。偶数・奇数だけでなく個体ごとに違う波を重ねる。
   if(ph>=.875&&ph<.978){
    const heat=Math.sin((ph-.875)/.103*Math.PI);
    raw+=heat*(Math.sin(phaseA+r.finalRank*1.3)*.017+Math.cos(phaseB+r.number)*.009);
   }
   // 最後50mだけ公式着順へ自然に収束。1〜3着は肉眼で分かる僅差。
   const finalMix=smooth((ph-.978)/.022);
   const finalTarget=ph-r.finalRank*.0078;
   raw=raw*(1-finalMix)+finalTarget*finalMix;
   if(k===times.length-1)raw=Math.max(.94,1-r.finalRank*.0078);
   // 各馬自身は必ず前進。相対速度差で追い抜きが起きる。
   const minStep=k===0?0:.0065;
   raw=Math.max(prev+minStep,raw);
   raw=Math.min(k===times.length-1?1:0.993,raw);
   pts.push(raw);prev=raw;
  });
  r.timeline={times,points:pts};
 })
}
function sampleTimeline(r,wall){
 const {times,points}=r.timeline;
 if(wall<=0)return 0;
 for(let i=1;i<times.length;i++){
  if(wall<=times[i]){
   const u=smooth((wall-times[i-1])/(times[i]-times[i-1]));
   return points[i-1]+(points[i]-points[i-1])*u
  }
 }
 const atEnd=points[points.length-1];
 if(wall<r.finishWall){
  const u=(wall-RACE_DURATION)/Math.max(.08,r.finishWall-RACE_DURATION);
  return atEnd+(1.002-atEnd)*Math.max(0,Math.min(1,u))
 }
 return 1.002+Math.min(.024,(wall-r.finishWall)*.018)
}
function controlledRunner(runners){if(state.mode==='solo')return runners.find(r=>r.number===state.selection);return runners.find(r=>r.playerId===state.player?.id)}
function applyWhipEvent(data){if(!data?.tapId||state.whipSeen.has(data.tapId))return;state.whipSeen.add(data.tapId);const rt=state.raceRuntime;if(!rt)return;const r=rt.runners.find(x=>data.playerId?x.playerId===data.playerId:x.number===data.number);if(!r||r.finish||r.display<.76)return;r.whipTaps=(r.whipTaps||0)+1;const benefit=r.whipTaps<=8?.045:r.whipTaps<=12?.022:.006;r.finishWall=Math.max(rt.wall+.55,r.finishWall-benefit);r.whipFlash=performance.now()+180}
function tapWhip(){if(state.mode!=='host'&&state.mode!=='join')return;const rt=state.raceRuntime;if(!rt)return;const r=controlledRunner(rt.runners);if(!r||r.finish||r.display<.76)return;const data={type:'whip',tapId:`${state.player?.id||'solo'}-${Date.now()}-${Math.random()}`,playerId:r.playerId||null,number:r.number};applyWhipEvent(data);if(state.mode==='join')sendHost(data);else if(state.mode==='host')broadcast(data)}
function runRace(payload,token=state.navToken){
 const canvas=$('track'),ctx=canvas.getContext('2d');resizeCanvas(canvas);
 const plan=officialPlan(payload.field,payload.seed),rnd=seeded(payload.seed^0x51f15e);
 const laneByNumber=new Map(payload.field.map((h,i)=>[h.number,i]));
 const runners=plan.map((h,i)=>({...h,display:0,finish:false,lane:laneByNumber.get(h.number)??h.gateIndex??i,whipTaps:0,actualFinish:null,lastDisplay:0,visualSpeed:1/RACE_DURATION}));
 buildRaceTimeline(runners,payload.seed,state.race.distance);
 state.whipSeen=new Set();state.raceRuntime={runners,wall:0};
 const dots=makeProgress(runners);$('liveTitle').textContent=state.race.name;$('liveCond').textContent=conditionText();
 const chosen=controlledRunner(runners),banner=$('myHorseBanner');
 if(chosen&&(state.mode==='host'||state.mode==='join'||state.mode==='party')){banner.hidden=false;banner.innerHTML=`あなたが選んだのは <span style="background:${COLORS[(chosen.number-1)%COLORS.length]};color:${chosen.number===2?'#fff':'#111'}">${chosen.number}</span>番 <b>${escapeHtml(chosen.name)}</b>`}else banner.hidden=true;
 $('whipPanel').hidden=true;
 const lastFinish=Math.max(...runners.map(r=>r.finishWall));
 let sequenceStart=null,raceStart=null,lastFrame=null,lastCall=-1,done=false,lastLeader=null;
 function frame(ts){
  if(token!==state.navToken)return;
  if(sequenceStart===null)sequenceStart=ts;
  const sequence=(ts-sequenceStart)/1000;
  const gateOpen=Math.min(1,sequence/.55),launch=Math.max(0,Math.min(1,(sequence-.55)/.90));
  if(sequence<1.45){
   const eased=launch*launch*(3-2*launch);
   runners.forEach(h=>h.display=.0035*eased);
   drawRaceScene(ctx,runners,{gateOpen,showGate:true});updateProgress(dots,runners);$('remaining').textContent=`${state.race.distance}m`;requestAnimationFrame(frame);return
  }
  if(raceStart===null){raceStart=ts;lastFrame=ts;$('commentary').textContent='スタート！ 全馬が滑らかに加速していきます。'}
  const wall=(ts-raceStart)/1000;state.raceRuntime.wall=wall;
  const dt=Math.min(.05,Math.max(.001,(ts-lastFrame)/1000));lastFrame=ts;
  runners.forEach(h=>{
   const sampled=sampleTimeline(h,wall);
   const ahead=sampleTimeline(h,wall+.14);
   // 目標曲線の傾きから速度を作り、加減速を滑らかにする。全馬の最低速度を保証。
   const curveSpeed=Math.max(.016,(ahead-sampled)/.14);
   const chase=(sampled-h.display)*1.9;
   const desired=Math.max(.016,Math.min(.090,curveSpeed+chase));
   const accel=desired>h.visualSpeed?3.8:2.6;
   h.visualSpeed+=(desired-h.visualSpeed)*Math.min(1,accel*dt);
   h.visualSpeed=Math.max(.016,Math.min(.090,h.visualSpeed));
   h.lastDisplay=h.display;
   h.display+=h.visualSpeed*dt;
   // 目標より大幅に遅れた時だけ、見えない程度に追従させる。瞬間移動はさせない。
   if(sampled-h.display>.025)h.display+=Math.min(.004,(sampled-h.display)*.08);
   if(!h.finish&&h.display>=1){h.finish=true;h.actualFinish=wall;h.display=Math.max(1,h.display)}
  });
  drawRaceScene(ctx,runners,{showGate:false});updateProgress(dots,runners);
  const order=[...runners].sort((a,b)=>b.display-a.display||a.finishWall-b.finishWall),lead=order[0],control=controlledRunner(runners);
  $('clock').textContent=`0:${Math.min(59.9,wall).toFixed(1).padStart(4,'0')}`;
  $('remaining').textContent=`${Math.max(0,Math.round(state.race.distance*(1-Math.min(1,lead.display))))}m`;
  const leaderColor=COLORS[(lead.number-1)%COLORS.length];$('leaderText').innerHTML=`<span class="leader-num" style="background:${leaderColor};color:${lead.number===2?'#fff':'#111'}">${lead.number}</span><span>先頭 ${escapeHtml(lead.name)}</span>`;
  const whipReady=(state.mode==='host'||state.mode==='join')&&control&&!control.finish&&control.display>=.76;$('whipPanel').hidden=!whipReady;if(whipReady)$('whipHorse').textContent=`${control.number}番 ${control.name}を追う！`;
  const call=Math.floor(wall/2.8);
  const remaining=Math.max(0,state.race.distance*(1-Math.min(1,lead.display)));
  const leaderChanged=lastLeader!==null&&lastLeader!==lead.number;lastLeader=lead.number;
  if(call!==lastCall||leaderChanged){
   lastCall=call;
   if(remaining<=55)$('commentary').textContent=`ゴール目前！ ${order[0].number}番と${order[1]?.number||order[0].number}番が僅差、わずかに${order[0].number}番が前！`;
   else if(remaining<=300)$('commentary').textContent=`残り300m！ ${order[0].name}、${order[1]?.name||''}、${order[2]?.name||''}が走りながら激しく抜きつ抜かれつ！`;
   else if(remaining<=700)$('commentary').textContent=`残り700m！ 馬群が徐々に詰まり、${lead.name}を各馬が追う！`;
   else if(leaderChanged)$('commentary').textContent=`${lead.number}番${lead.name}が前へ！ 先頭が入れ替わった！`;
   else $('commentary').textContent=commentary(call,order)
  }
  if(runners.every(h=>h.finish)||wall>lastFinish+1){
   if(!done){done=true;$('whipPanel').hidden=true;const sorted=[...runners].sort((a,b)=>(a.actualFinish??a.finishWall)-(b.actualFinish??b.finishWall)||a.number-b.number);const base=estimateSeconds(state.race.distance),first=(sorted[0].actualFinish??sorted[0].finishWall);state.result=sorted.map(h=>({...h,officialTime:base+((h.actualFinish??h.finishWall)-first)}));state.raceRuntime=null;setTimeout(showResult,900)}return
  }
  requestAnimationFrame(frame)
 }
 requestAnimationFrame(frame)
}
function smooth(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function styleOffset(style,t){
 const early=smooth(t/.24),mid=smooth((t-.24)/.42),late=smooth((t-.66)/.24),final=smooth((t-.86)/.14);
 if(style==='逃げ')return .25*early-.04*mid-.18*late-.06*final;
 if(style==='先行')return .13*early+.035*mid-.055*late+.025*final;
 if(style==='差し')return -.10*early-.035*mid+.15*late+.035*final;
 if(style==='追込')return -.18*early-.08*mid+.21*late+.12*final;
 return 0
}
function raceDramaOffset(r,t){
 const phase1=Math.sin((t*5.5+r.dramaPhase)*Math.PI)*(.018+.018*Math.sin(Math.PI*t));
 const surge1=r.surgeA*Math.exp(-Math.pow((t-r.surgeAtA)/.09,2));
 const surge2=r.surgeB*Math.exp(-Math.pow((t-r.surgeAtB)/.075,2));
 const fade=r.fadePower*smooth((t-r.fadeAt)/Math.max(.08,1-r.fadeAt));
 return phase1+surge1+surge2-fade
}
function resizeCanvas(canvas){const dpr=Math.min(2,devicePixelRatio||1),rect=canvas.getBoundingClientRect();canvas.width=Math.max(800,Math.round(rect.width*dpr));canvas.height=Math.max(520,Math.round(rect.height*dpr))}
function drawTrack(ctx,runners){const w=ctx.canvas.width,h=ctx.canvas.height;ctx.clearRect(0,0,w,h);const sky=ctx.createLinearGradient(0,0,0,h*.45);sky.addColorStop(0,'#82c9ff');sky.addColorStop(1,'#e8f5ff');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h*.35);ctx.fillStyle='#1f7c42';ctx.fillRect(0,h*.35,w,h*.65);ctx.fillStyle='#c69a61';ctx.fillRect(0,h*.48,w,h*.47);for(let i=0;i<=runners.length;i++){const y=h*.48+i*(h*.47/runners.length);ctx.strokeStyle='#ffffff88';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}const start=w*.07,goal=w*.93;ctx.fillStyle='#ffe34f';ctx.fillRect(start-5,h*.42,10,h*.55);for(let y=h*.42;y<h*.97;y+=20){ctx.fillStyle=((y/20)|0)%2?'#fff':'#111';ctx.fillRect(goal-7,y,14,20)}runners.forEach((r,i)=>{const lane=Number.isFinite(r.lane)?r.lane:i;const laneY=h*.48+(lane+.5)*(h*.47/runners.length),x=start+(goal-start)*r.display;drawHorse(ctx,x,laneY,r,lane)});ctx.fillStyle='#103d22';ctx.fillRect(0,h*.95,w,h*.05);ctx.fillStyle='#fff';ctx.font=`700 ${Math.max(16,w*.018)}px sans-serif`;ctx.fillText('START',start-30,h*.44);ctx.fillText('GOAL',goal-28,h*.44)}
function drawHorse(ctx,x,y,r,i){const scale=Math.max(.75,Math.min(1.25,ctx.canvas.width/1050));ctx.save();ctx.translate(x,y);ctx.fillStyle='#4b2c18';ctx.beginPath();ctx.ellipse(0,0,25*scale,12*scale,0,0,Math.PI*2);ctx.fill();ctx.fillRect(13*scale,-9*scale,17*scale,8*scale);ctx.beginPath();ctx.arc(29*scale,-9*scale,7*scale,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#2f1b10';ctx.lineWidth=4*scale;const phase=performance.now()/80+i;for(const dx of [-13,10]){ctx.beginPath();ctx.moveTo(dx*scale,8*scale);ctx.lineTo((dx+Math.sin(phase)*8)*scale,24*scale);ctx.stroke()}ctx.fillStyle=COLORS[(r.number-1)%COLORS.length];ctx.beginPath();ctx.arc(-1*scale,-15*scale,10*scale,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle=r.number===2?'#fff':'#111';ctx.font=`900 ${12*scale}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(r.number,-1*scale,-15*scale);if(r.whipFlash&&performance.now()<r.whipFlash){ctx.strokeStyle='#ffe45b';ctx.lineWidth=4*scale;ctx.beginPath();ctx.moveTo(-8*scale,-25*scale);ctx.lineTo(12*scale,-38*scale);ctx.stroke()}ctx.restore()}
function makeProgress(runners){const box=$('progressTrack');box.innerHTML='';const map=new Map();runners.forEach((r,i)=>{const d=document.createElement('div');d.className='progress-dot';d.textContent=r.number;d.style.background=COLORS[(r.number-1)%COLORS.length];d.style.color=r.number===2?'white':'#111';const lane=Number.isFinite(r.lane)?r.lane:i;d.style.top=`${12+(lane/(runners.length-1||1))*76}%`;box.appendChild(d);map.set(r.number,d)});updateProgress(map,runners);return map}
function updateProgress(map,runners){runners.forEach(r=>{const el=map.get(r.number);if(el)el.style.left=`${7+r.display*86}%`})}
function commentary(c,o){const a=o[0],b=o[1]||o[0],c3=o[2]||b;const esc=o.find(x=>x.style==='逃げ'),front=o.find(x=>x.style==='先行'),closer=[...o].reverse().find(x=>x.style==='追込')||o.find(x=>x.style==='差し');return [
`スタート！ ${esc?`${esc.number}番${esc.name}がロケットスタート！ 一気に先頭へ！`:`${a.number}番${a.name}が好発！`}`,
`${esc?`${esc.name}が大逃げ！ 後続を何馬身も引き離した！`:`${a.name}が先頭、${front?.name||b.name}が好位！`}`,
`先頭争いが激しい！ ${a.name}、${b.name}、${c3.name}が目まぐるしく入れ替わる！`,
`${esc?`${esc.name}のリードが縮まり始めた！`:`${a.name}がペースを上げる！`} 後方勢も動いた！`,
`残り半分！ ${closer?`${closer.name}が最後方から一気に進出！`:`馬群が一団となって直線へ！`}`,
`直線勝負！ ${closer?`${closer.number}番${closer.name}が大外から猛烈な脚！`:`${b.name}が先頭へ並びかける！`}`,
`ゴール前は大混戦！ ${a.name}、${b.name}、${c3.name}、ほとんど並んだ！`,
`ゴール！ ${a.number}番${a.name}か！ 写真判定級の大接戦！`][Math.min(7,c)]}
function estimateSeconds(d){return({1200:68,1600:94,1800:108,2000:120,2200:132,2400:145,2500:151,3000:185,3200:198}[d]||d/16.5)}
function settleTournament(result){
 if(!state.isHost||state.roundSettled)return;state.roundSettled=true;
 const round={raceNo:state.tournament.current,raceName:state.race.name,results:result.slice(0,3).map(x=>({number:x.number,name:x.name})),bets:[]};
 for(const m of state.members.values()){
  const ready=m.ready;let before=Number(state.tournament.scores[m.id]??10000),after=before,pay=0,hit=false;
  if(ready){const selected=result.find(h=>h.number===ready.selection),rank=result.findIndex(h=>h.number===ready.selection)+1,odds=selected?(ready.betType==='win'?selected.winOdds:selected.placeOdds):0;hit=ready.betType==='win'?rank===1:rank>0&&rank<=3;pay=hit?Math.floor(ready.stake*odds):0;after=Math.max(0,before-ready.stake+pay)}
  state.tournament.scores[m.id]=after;m.tournamentPoints=after;round.bets.push({playerId:m.id,horse:m.horse,before,after,pay,hit,stake:ready?.stake||0});
 }
 state.tournament.rounds.push(round);broadcast({type:'roundStanding',tournament:state.tournament});broadcastMembers();renderTournamentRanking();
}
function sortedStandings(){return [...state.members.values()].map(m=>({...m,points:Number(state.tournament?.scores?.[m.id]??10000)})).sort((a,b)=>b.points-a.points||String(a.horse).localeCompare(String(b.horse),'ja'))}
function renderTournamentRanking(){const box=$('roundRanking');if(!box)return;const rows=sortedStandings();box.hidden=false;box.innerHTML=`<h3>第${state.tournament.current}レース終了時点 総合ランキング</h3>${rows.map((m,i)=>`<div class="ranking-row"><span class="ranking-place">${i+1}</span><span><b>${escapeHtml(m.horse)}</b><small>騎手 ${escapeHtml(m.jockey?.name||'未設定')}</small></span><span class="ranking-points">${m.points.toLocaleString('ja-JP')}pt</span></div>`).join('')}`}
function showTournamentFinal(){show('tournamentFinal');const rows=sortedStandings(),champ=rows[0];$('championBanner').innerHTML=champ?`<div class="crown">👑</div><small>総合優勝</small><h2>${escapeHtml(champ.horse)}</h2><p>騎手 ${escapeHtml(champ.jockey?.name||'未設定')}</p><b>${champ.points.toLocaleString('ja-JP')}pt</b>`:'結果がありません';$('finalRanking').innerHTML=rows.map((m,i)=>`<div class="ranking-row"><span class="ranking-place">${i+1}</span><span><b>${escapeHtml(m.horse)}</b><small>${i===0?'大会チャンピオン':'総合順位'}</small></span><span class="ranking-points">${m.points.toLocaleString('ja-JP')}pt</span></div>`).join('');$('roundHistory').innerHTML=`<h3>全${state.tournament.total}レース結果</h3>${(state.tournament.rounds||[]).map(r=>`<div class="round-chip"><span>第${r.raceNo}R ${escapeHtml(r.raceName)}</span><b>1着 ${escapeHtml(r.results?.[0]?.name||'---')}</b></div>`).join('')}`}
function showResult(){show('result');const result=state.result;$('resultList').innerHTML=result.map((h,i)=>`<div class="result-row"><span class="place">${i+1}着</span><span class="horse-num" style="background:${COLORS[(h.number-1)%COLORS.length]};color:${h.number===2?'white':'#111'}">${h.number}</span><span><b>${escapeHtml(h.name)}</b><small>${escapeHtml(h.owner)}・${h.style}・騎手 ${escapeHtml(h.jockey?.name||'未設定')}</small></span><span class="time">${formatTime(h.officialTime)}${i?` +${(h.officialTime-result[0].officialTime).toFixed(2)}`:''}</span></div>`).join('');$('roundRanking').hidden=true;
 if(state.mode==='party'){$('nextBtn').textContent='パーティーモードをもう一度';$('payoutBox').classList.add('win');$('payoutBox').innerHTML=`<b>🏆 優勝 ${result[0].number}番 ${escapeHtml(result[0].name)}</b><br>騎手 ${escapeHtml(result[0].jockey?.name||'未設定')}`;return}
 const selected=result.find(h=>h.number===state.selection),rank=result.findIndex(h=>h.number===state.selection)+1,hit=state.betType==='win'?rank===1:rank>0&&rank<=3,odds=selected?(state.betType==='win'?selected.winOdds:selected.placeOdds):0,pay=hit?Math.floor(state.stake*odds):0;
 if(state.mode==='host'||state.mode==='join'){$('payoutBox').classList.toggle('win',hit);$('payoutBox').innerHTML=selected?`<b>${state.betType==='win'?'単勝':'複勝'} ${selected.number}番 ${escapeHtml(selected.name)}</b><br>${hit?`🎉 的中！ 払戻 ${pay.toLocaleString('ja-JP')}pt`:'不的中'}<br><small>大会ポイントは総合ランキングへ反映されます。</small>`:'馬券なし';if(state.isHost)settleTournament(result);else renderTournamentRanking();const final=(state.tournament.current>=state.tournament.total);$('nextBtn').textContent=final?'総合結果発表へ':'次のレースへ';$('nextBtn').hidden=state.mode==='join';$('replayBtn').hidden=state.mode==='join';if(state.mode==='join')$('payoutBox').innerHTML+=`<br><small>主催者が次のレースへ進むと自動で切り替わります。</small>`;return}
 if(pay){state.wallet+=pay;saveWallet()}$('payoutBox').classList.toggle('win',hit);$('payoutBox').innerHTML=selected?`<b>${state.betType==='win'?'単勝':'複勝'} ${selected.number}番 ${escapeHtml(selected.name)}</b><br>${hit?`🎉 的中！ 払戻 ${pay.toLocaleString('ja-JP')}pt`:'不的中'}<br><small>現在の所持ポイント ${state.wallet.toLocaleString('ja-JP')}pt</small>`:'馬券なし'}
function formatTime(sec){const m=Math.floor(sec/60),s=sec-m*60;return `${m}:${s.toFixed(1).padStart(4,'0')}`}
function nextRace(){
 if(state.mode==='party'){$('partyNextVenue').value=state.venue;$('partyNextRace').value=String(Math.max(0,RACES.findIndex(r=>r.name===state.race.name)));$('partyNextGoing').value=state.going;show('partyNext');return}
 if(state.mode==='host'||state.mode==='join'){
  if(!state.isHost)return;
  if(state.tournament.current>=state.tournament.total){broadcast({type:'finalStanding',tournament:state.tournament});showTournamentFinal();return}
  state.tournament.current++;state.raceNo=state.tournament.current;const scheduled=state.tournament.schedule[state.tournament.current-1];state.venue=scheduled.venue;state.race=scheduled.race;state.selection=null;state.result=[];state.seed=Date.now();state.members.forEach(m=>m.ready=null);const msg={type:'nextRound',config:raceConfig(),members:[...state.members.values()]};broadcast(msg);broadcastMembers();renderLobby();show('lobby');return
 }
 state.raceNo++;state.selection=null;state.result=[];state.seed=Date.now();show('home')}
function replay(){state.seed=Date.now()+Math.floor(Math.random()*1000000);const payload={seed:state.seed,field:state.field,startAt:Date.now()+1500,config:raceConfig()};startCountdown(payload)}
function shareRoom(){const url=$('shareBtn').dataset.url||inviteUrl();if(navigator.share)navigator.share({title:'川上ウマウマレース',text:'QR招待からオンライン大会に参加してな！',url}).catch(()=>{});else navigator.clipboard?.writeText(url)}

function startPartySetup(){state.mode='party';state.partyEntries=[];state.partyIndex=0;state.partyEditing=false;state.selection=null;state.result=[];show('partySetup')}
function beginPartyEntries(){const idx=+$('partyRace').value;state.mode='party';state.partyEntries=[];state.partyIndex=0;state.partyEditing=false;state.venue=$('partyVenue').value;state.race=RACES[idx];state.going=$('partyGoing').value;state.fieldSize=+$('partyFieldSize').value;state.seed=Date.now();showPartyHandoff()}
function showPartyHandoff(){$('partyTurnNumber').textContent=state.partyIndex+1;show('partyHandoff')}
function togglePartySources(){const horseCustom=$('partyHorseSource').value==='custom',jockeyCustom=$('partyJockeySource').value==='custom';$('partyFamousHorseWrap').hidden=horseCustom;$('partyCustomHorseWrap').hidden=!horseCustom;$('partyFamousJockeyWrap').hidden=jockeyCustom;$('partyCustomJockeyWrap').hidden=!jockeyCustom}
function pointsFromLegend(h){const raw=[h.speed,h.stamina,h.kick,h.start,h.mud].map(v=>Math.max(0,v-90)),sum=raw.reduce((a,b)=>a+b,0)||1;let vals=raw.map(v=>Math.floor(v/sum*10));let used=vals.reduce((a,b)=>a+b,0);const order=raw.map((v,i)=>[v/sum*10-vals[i],i]).sort((a,b)=>b[0]-a[0]);for(let n=0;used<10;n++,used++)vals[order[n%order.length][1]]++;ABILITIES.forEach((k,i)=>state.partyPoints[k]=vals[i])}
function applyFamousHorse(){const h=LEGENDS[+$('partyFamousHorse').value]||LEGENDS[0];$('partyStyle').value=h.style;pointsFromLegend(h);renderPartyAbility()}
function openPartyEntry(){
 $('partyEntryNumber').textContent=state.partyIndex+1;
 const e=state.partyEditing?state.partyEntries[state.partyIndex]:null;
 $('partyHorseSource').value=e?.horseSource||'famous';$('partyJockeySource').value=e?.jockeySource||'famous';
 $('partyHorseName').value=e?.horseSource==='custom'?e.horse:'';$('partyJockeyName').value=e?.jockeySource==='custom'?e.jockey:'';
 $('partyStyle').value=e?.style||'先行';$('partyHorseType').value=e?.type||'バランス型';
 if(e?.horseSource==='famous'){const hi=LEGENDS.findIndex(h=>h.name===e.horse);$('partyFamousHorse').selectedIndex=hi>=0?hi:Math.min(state.partyIndex,LEGENDS.length-1)}else $('partyFamousHorse').selectedIndex=Math.min(state.partyIndex,LEGENDS.length-1);
 if(e?.jockeyId){const ji=JOCKEYS.findIndex(j=>j.id===e.jockeyId);$('partyFamousJockey').selectedIndex=ji>=0?ji:Math.min(state.partyIndex,JOCKEYS.length-1)}else $('partyFamousJockey').selectedIndex=Math.min(state.partyIndex,JOCKEYS.length-1);
 state.partyPoints={speed:0,stamina:0,kick:0,start:0,mud:0};
 if(e)ABILITIES.forEach(k=>state.partyPoints[k]=Math.max(0,(e.abilities?.[k]||90)-90));
 togglePartySources();if(!e&&$('partyHorseSource').value==='famous')applyFamousHorse();else renderPartyAbility();
 $('partyEntryError').textContent='';show('partyEntry')
}
function savePartyEntry(){const horseSource=$('partyHorseSource').value,jockeySource=$('partyJockeySource').value;const famousHorse=LEGENDS[+$('partyFamousHorse').value];const famousJockey=JOCKEYS.find(j=>j.id===$('partyFamousJockey').value);const horse=horseSource==='famous'?famousHorse?.name:$('partyHorseName').value.trim();const jockey=jockeySource==='famous'?famousJockey?.name:$('partyJockeyName').value.trim();const used=Object.values(state.partyPoints).reduce((a,b)=>a+b,0);if(!horse||!jockey){$('partyEntryError').textContent='馬と騎手を選ぶか、名前を入力してな。';return}if(used!==10){$('partyEntryError').textContent='追加10ポイントを全部使い切ってな。';return}if(state.partyEntries.some((x,i)=>x.horse===horse&&(!state.partyEditing||i!==state.partyIndex))){$('partyEntryError').textContent='同じ馬名がすでに使われています。別の馬を選んでな。';return}const entry={number:state.partyIndex+1,horse,jockey,style:$('partyStyle').value,type:$('partyHorseType').value,horseSource,jockeySource,jockeyId:famousJockey?.id||null,abilities:Object.fromEntries(ABILITIES.map(k=>[k,90+state.partyPoints[k]]))};if(state.partyEditing)state.partyEntries[state.partyIndex]=entry;else state.partyEntries.push(entry);$('partyHorseName').value='';$('partyJockeyName').value='';state.partyPoints={speed:0,stamina:0,kick:0,start:0,mud:0};$('partyAbilityEditor').innerHTML='';state.partyIndex++;if(state.partyIndex<state.fieldSize)showPartyHandoff();else{state.partyEditing=false;$('partyReadyCount').textContent=state.fieldSize;show('partyReady')}}
function partyRunner(e){const a=e.abilities,j=e.jockeyId?JOCKEYS.find(x=>x.id===e.jockeyId):null;return setRunnerJockey({number:e.number,name:e.horse,owner:e.horseSource==='famous'?'名馬セレクト':'オリジナル馬',style:e.style,baseSpeed:a.speed,baseStamina:a.stamina,baseKick:a.kick,baseStart:a.start,baseMud:a.mud,best:[1000,3600],isPlayer:true,playerId:`party-${e.number}`},j||{id:`party-j-${e.number}`,name:e.jockey,era:'オリジナル',type:'パーティー',bonus:{speed:0,stamina:0,kick:0,start:0,mud:0}})}
async function revealPartyRace(){await unlockAudio();state.field=state.partyEntries.map(partyRunner);calculateProbabilities();startCountdown({seed:state.seed,field:state.field,startAt:Date.now()+4200,config:raceConfig()})}
function startPartyNext(edit){
 const idx=+$('partyNextRace').value;state.venue=$('partyNextVenue').value;state.race=RACES[idx];state.going=$('partyNextGoing').value;state.seed=Date.now();state.raceNo++;
 if(edit){state.partyEditing=true;state.partyIndex=0;showPartyHandoff()}else revealPartyRace()
}
function openOnlineEdit(){
 if(!state.player)return;
 $('onlinePlayerName').value=state.player.name==='オンライン参加者'?'':(state.player.name||'');
 $('onlineHorseName').value=state.player.horse||'';$('onlineEditError').textContent='';show('onlineEdit')
}
function saveOnlineEdit(){
 const name=$('onlinePlayerName').value.trim(),horse=$('onlineHorseName').value.trim();
 if(!name||!horse){$('onlineEditError').textContent='自分の名前と馬名を両方入力してな。';return}
 state.player={...state.player,name,horse};
 if(state.isHost){const m=state.members.get(state.player.id);if(m){m.name=name;m.horse=horse;m.ready=null}broadcastMembers();renderLobby()}
 else sendHost({type:'profileUpdate',playerId:state.player.id,name,horse});
 show('lobby')
}
function clearJoinUrl(){try{history.replaceState({},'',location.pathname)}catch(e){}}
function parseJoin(){const p=new URLSearchParams(location.search),code=normalizeCode(p.get('join')),peer=normalizeCode(p.get('peer'));if(code){state.mode='join';state.roomCode=code;state.hostPeerId=peer||peerId(code);show('joinConfirm',false)}}
document.addEventListener('pointerdown',()=>{unlockAudio()}, {capture:true,passive:true});
$('backBtn').onclick=goBack;$('homeBtn').onclick=goHome;$('randomAbilityBtn').onclick=()=>{randomPoints(state.points);renderAbility()};$('partyRandomAbilityBtn').onclick=()=>{randomPoints(state.partyPoints,$('partyHorseType').value);renderPartyAbility()};$('partyHorseType').onchange=()=>{randomPoints(state.partyPoints,$('partyHorseType').value);renderPartyAbility()};$('partyHorseSource').onchange=()=>{togglePartySources();if($('partyHorseSource').value==='famous')applyFamousHorse()};$('partyFamousHorse').onchange=applyFamousHorse;$('partyJockeySource').onchange=togglePartySources;$('partyBtn').onclick=startPartySetup;$('partySetupBtn').onclick=beginPartyEntries;$('partyOpenEntryBtn').onclick=openPartyEntry;$('partyEntryDoneBtn').onclick=savePartyEntry;$('partyRevealBtn').onclick=revealPartyRace;$('partyKeepBtn').onclick=()=>startPartyNext(false);$('partyEditBtn').onclick=()=>startPartyNext(true);$('hostBtn').onclick=()=>beginCreate('host');$('joinYesBtn').onclick=()=>{clearJoinUrl();beginCreate('join')};$('joinNoBtn').onclick=()=>{clearJoinUrl();state.roomCode='';state.mode='party';show('home',false)};$('createNextBtn').onclick=onCreateNext;$('hostRaceCount').onchange=renderHostSchedule;$('createRoomBtn').onclick=createRoom;$('winTab').onclick=()=>setBet('win');$('placeTab').onclick=()=>setBet('place');$('stake').oninput=updateTicket;$('raceStartBtn').onclick=startFromBet;$('editOnlineBtn').onclick=openOnlineEdit;$('onlineEditSaveBtn').onclick=saveOnlineEdit;$('startOnlineBtn').onclick=hostGoBet;$('shareBtn').onclick=shareRoom;$('leaveRoomBtn').onclick=leaveRoom;$('nextBtn').onclick=nextRace;$('replayBtn').onclick=replay;$('whipBtn').onclick=tapWhip;$('resetWalletBtn').onclick=()=>{state.wallet=10000;saveWallet()};$('finalHomeBtn').onclick=goHome;window.addEventListener('beforeunload',()=>{if(state.isHost)broadcast({type:'roomClosed'});cleanupPeer()});window.addEventListener('resize',()=>{if(state.screen==='race')resizeCanvas($('track'))});
setupSelects();renderAbility();saveWallet();show('home',false);parseJoin();
