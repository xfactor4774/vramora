// ─── DATA ────────────────────────────────────────────────────────────────────
const CAT_COL = {nvidia:'#5eead4', apple:'#a78bfa', system:'#fb923c', cluster:'#facc15'};
const CAT_LBL = {nvidia:'NVIDIA GPU Rig', apple:'Apple Silicon', system:'Packaged System', cluster:'Mac Mini Cluster'};

const DATA = [
  {id:'rtx3060',  name:'RTX 3060',               cat:'nvidia',cost:1300,vram:12, bw:360, tps7:60, tps70:null,maxB:7,  tdp:220,notes:'12GB VRAM limits to 7B Q4. Budget LLM entry point.'},
  {id:'rtx3080ti',name:'RTX 3080 Ti',             cat:'nvidia',cost:1600,vram:12, bw:912, tps7:108,tps70:null,maxB:7,  tdp:320,notes:'Fast bandwidth, 12GB cap. Best 7B speed but nowhere to grow.'},
  {id:'rtx4080',  name:'RTX 4080',                cat:'nvidia',cost:2100,vram:16, bw:716, tps7:113,tps70:null,maxB:13, tdp:290,notes:'16GB handles 13B. Ada Lovelace efficiency improvements.'},
  {id:'rtx4000a', name:'RTX 4000 Ada (20GB)',     cat:'nvidia',cost:2200,vram:20, bw:360, tps7:65, tps70:null,maxB:13, tdp:200,notes:'Pro workstation card. 20GB VRAM, low power. Bandwidth limited.'},
  {id:'rtx3090',  name:'RTX 3090',                cat:'nvidia',cost:1700,vram:24, bw:936, tps7:121,tps70:null,maxB:30, tdp:490,notes:'The sweet spot. Used ~$900 GPU, 24GB VRAM. Runs 30B Q4. Best bang/buck.'},
  {id:'rtx4090',  name:'RTX 4090',                cat:'nvidia',cost:3500,vram:24, bw:1008,tps7:139,tps70:null,maxB:30, tdp:480,notes:'Fastest single GPU. Still capped at 24GB VRAM, 30B Q4 limit.'},
  {id:'rtxA6000', name:'RTX A6000 (48GB)',        cat:'nvidia',cost:6500,vram:48, bw:768, tps7:107,tps70:22,  maxB:65, tdp:450,notes:'Pro workstation. 48GB single-card VRAM. Runs 65B Q4.'},
  {id:'dual3090', name:'2× RTX 3090',             cat:'nvidia',cost:3400,vram:48, bw:936, tps7:121,tps70:20,  maxB:65, tdp:830,notes:'NVLink: 48GB combined. 65B Q4 ~20 t/s. Excellent 70B value.'},
  {id:'dual4090', name:'2× RTX 4090',             cat:'nvidia',cost:6500,vram:48, bw:1008,tps7:139,tps70:28,  maxB:70, tdp:810,notes:'NVLink, 48GB combined. 70B Q4 ~28 t/s. Speed king.'},
  {id:'tri3090',  name:'3× RTX 3090',             cat:'nvidia',cost:5200,vram:72, bw:936, tps7:121,tps70:40,  maxB:120,tdp:1170,notes:'72GB VRAM. 120B Q4 capable. 124 t/s tg32 on 120B MXFP4 (llama.cpp).'},
  {id:'m3max48',  name:'M3 Max Studio (48GB)',    cat:'apple', cost:3999,vram:48, bw:400, tps7:66, tps70:18,  maxB:65, tdp:50, notes:'Silent, efficient. 48GB unified. $3,999. ~40-50W under LLM load.'},
  {id:'m4max64',  name:'M4 Max Studio (64GB)',    cat:'apple', cost:4999,vram:64, bw:410, tps7:80, tps70:25,  maxB:70, tdp:55, notes:'M4 Max. 64GB unified. Qwen3 30B-A3B >100 t/s via MLX.'},
  {id:'m4max128', name:'M4 Max Studio (128GB)',   cat:'apple', cost:7199,vram:128,bw:546, tps7:80, tps70:40,  maxB:120,tdp:60, notes:'128GB unified memory. Silent powerhouse. Handles 120B Q4.'},
  {id:'m2ultra',  name:'M2 Ultra Studio (192GB)', cat:'apple', cost:6999,vram:192,bw:800, tps7:94, tps70:30,  maxB:180,tdp:90, notes:'192GB unified. 70B prompt eval ~117 t/s. Excellent big-model machine.'},
  {id:'m3ultra',  name:'M3 Ultra Studio (256GB)', cat:'apple', cost:9999,vram:256,bw:819, tps7:105,tps70:71,  maxB:200,tdp:110,notes:'256GB unified. 70 t/s tg32 on 120B MXFP4. Top of Apple lineup.'},
  {id:'m4ultra',  name:'M4 Ultra Studio (est.)',  cat:'apple', cost:8999,vram:192,bw:820, tps7:120,tps70:55,  maxB:180,tdp:100,notes:'M4 Ultra estimated. Best t/s per watt of any platform.'},
  {id:'dgxspark', name:'NVIDIA DGX Spark',        cat:'system',cost:3999,vram:128,bw:275, tps7:60, tps70:39,  maxB:200,tdp:120,notes:'GB10 Grace Blackwell, 128GB LPDDR5. $3,999. NVFP4 unlocks large-model perf. AI lab in a box.'},

  // ── NEW ──
  {id:'rtx5090',  name:'RTX 5090',                cat:'nvidia',cost:4200,vram:32, bw:1792,tps7:186,tps70:null,maxB:30, tdp:575,notes:'Blackwell GB202, 32GB GDDR7, 1792 GB/s bandwidth. $3,999+ street. Blazing fast on 7B–32B. Still 32GB cap — no 70B without multi-GPU.'},
  {id:'dellgb10', name:'Dell Pro Max (GB10)',      cat:'system',cost:4600,vram:128,bw:275, tps7:60, tps70:39,  maxB:200,tdp:125,notes:'Same GB10 Grace Blackwell chip as DGX Spark, 128GB LPDDR5x. $4,600. Ships with DGX OS + NVIDIA AI stack. Slightly pricier than Spark but tighter Dell ecosystem.'},
  {id:'mini4x',   name:'4× Mac Mini M4 Pro (96GB)',cat:'cluster',cost:5200,vram:96, bw:960, tps7:70, tps70:30,  maxB:90, tdp:160,notes:'4× M4 Pro Mac Minis daisy-chained via Thunderbolt 5 (exo/llama.cpp). 96GB combined. Thunderbolt bandwidth is the bottleneck: ~40 GB/s per link. ~70 t/s on 7B single-node; distributed 70B ~30 t/s. DeepSeek 671B ~5 t/s on 8-node cluster.'},
  {id:'mini8x',   name:'8× Mac Mini M4 Pro (192GB)',cat:'cluster',cost:10400,vram:192,bw:1920,tps7:70, tps70:20,  maxB:180,tdp:320,notes:'8× M4 Pro Minis (exo cluster). 192GB combined. Runs DeepSeek 671B at ~5 t/s, Llama 70B ~20 t/s. Thunderbolt inter-node bandwidth severely limits large-model speed. Great for model capacity, not raw speed.'},
];

DATA.forEach(d => {
  d.tpw   = +(d.tps7 / d.tdp).toFixed(2);
  d.value = +(d.tps7 / d.cost * 1000).toFixed(1);
});

// ─── STATE ───────────────────────────────────────────────────────────────────
let activeCats = new Set(['nvidia','apple','system','cluster']);
let activeVram = new Set(['12','24','48','96','192','512']);
let yMode      = 'max_params';
let hlMode     = 'none';
let sortCol    = 'cost';
let sortAsc    = true;
let currentView = 'chart';

function vramBucket(v) {
  if (v <= 12)  return '12';
  if (v <= 24)  return '24';
  if (v <= 48)  return '48';
  if (v <= 96)  return '96';
  if (v <= 192) return '192';
  return '512';
}

function visible() {
  return DATA.filter(d => activeCats.has(d.cat) && activeVram.has(vramBucket(d.vram)));
}

function bubbleR(tps) {
  return tps ? 6 + Math.pow(tps, 0.55) * 0.9 : 6;
}

function getY(d) {
  if (yMode === 'vram') return d.vram;
  if (yMode === 'tps')  return d.tps7;
  if (yMode === 'tpw')  return d.tpw;
  return d.maxB;
}

function isHighlighted(d) {
  if (hlMode === 'none') return false;
  const v = visible();
  if (!v.length) return false;
  const best = {
    best_value: v.reduce((a,x) => x.value > a.value ? x : a),
    fastest:    v.reduce((a,x) => (x.tps7||0) > (a.tps7||0) ? x : a),
    efficient:  v.reduce((a,x) => x.tpw > a.tpw ? x : a),
    most_vram:  v.reduce((a,x) => x.vram > a.vram ? x : a),
  }[hlMode];
  return best && d.id === best.id;
}

// ─── POWER COLOR ─────────────────────────────────────────────────────────────
function pwColorRgb(tdp) {
  const t = Math.min(1, (tdp - 40) / 1160);
  let r, g, b;
  if (t < 0.5) {
    const s = t / 0.5;
    r = Math.round(34  + (234 - 34)  * s);
    g = Math.round(197 + (179 - 197) * s);
    b = Math.round(94  + (8   - 94)  * s);
  } else {
    const s = (t - 0.5) / 0.5;
    r = Math.round(234 + (239 - 234) * s);
    g = Math.round(179 + (68  - 179) * s);
    b = Math.round(8   + (68  - 8)   * s);
  }
  return [r, g, b];
}

function pwColor(tdp, alpha = 0.72) {
  const [r,g,b] = pwColorRgb(tdp);
  return `rgba(${r},${g},${b},${alpha})`;
}

function pwHex(tdp) {
  const [r,g,b] = pwColorRgb(tdp);
  return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
}

// ─── CHART ───────────────────────────────────────────────────────────────────
let chart;

function yAxisLabel() {
  const m = { vram:'VRAM / Unified Memory (GB)', tps:'Tokens/sec at 7B Q4', tpw:'t/s per Watt (7B Q4)', max_params:'Max Model Size (B params, Q4)' };
  return m[yMode] || m.max_params;
}

function yTickFmt(v) {
  if (yMode === 'vram') return v + ' GB';
  if (yMode === 'tps')  return v + ' t/s';
  if (yMode === 'tpw')  return v + ' t/s/W';
  return v + 'B';
}

function initChart() {
  Chart.register(ChartDataLabels);
  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bubble',
    data: { datasets: buildDatasets() },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 220 },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: {
          color: (ctx) => document.body.classList.contains('light') ? '#1a1a2e' : '#e2e2e2',
          font: { size: 9, weight: '600', family: '-apple-system, BlinkMacSystemFont, sans-serif' },
          align: 'top',
          offset: 5,
          clip: false,
          textShadowColor: (ctx) => document.body.classList.contains('light') ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
          textShadowBlur: 3,
          formatter: val => {
            return val._raw.name
              .replace(' Mac Studio', '').replace('Mac Studio ', '')
              .replace('NVIDIA DGX ', 'DGX ')
              .replace(' (est.)', '');
          }
        },
      },
      scales: {
        x: {
          title: { display: true, text: 'System Cost (USD)', color: '#444', font: { size: 10 } },
          ticks: { color: '#3a3a5a', callback: v => '$' + v.toLocaleString() },
          grid: { color: '#16161e' },
          border: { color: '#222' },
        },
        y: {
          title: { display: true, text: yAxisLabel(), color: '#444', font: { size: 10 } },
          ticks: { color: '#3a3a5a', callback: yTickFmt },
          grid: { color: '#16161e' },
          border: { color: '#222' },
        },
      },
      onHover: (event, elements) => {
        const tt = document.getElementById('tt');
        if (!elements.length) { tt.style.display = 'none'; return; }
        const d = chart.data.datasets[elements[0].datasetIndex].data[elements[0].index]._raw;
        const col = pwHex(d.tdp);
        const pct = Math.round(Math.min(100, (d.tdp - 40) / 1160 * 100));
        tt.innerHTML = `
          <div class="tt-name">${d.name}</div>
          <div class="tt-r"><span>💰 Cost</span><span>$${d.cost.toLocaleString()}</span></div>
          <div class="tt-r"><span>🧠 Memory</span><span>${d.vram} GB</span></div>
          <div class="tt-r"><span>⚡ 7B Q4</span><span>${d.tps7} t/s</span></div>
          <div class="tt-r"><span>🐢 70B Q4</span><span>${d.tps70 ? d.tps70 + ' t/s' : 'OOM / N/A'}</span></div>
          <div class="tt-r"><span>📏 Max Model</span><span>~${d.maxB}B (Q4)</span></div>
          <div class="tt-r"><span>🚀 Bandwidth</span><span>${d.bw} GB/s</span></div>
          <div class="tt-r"><span>💡 Value</span><span>${d.value} t/s per $1k</span></div>
          <div class="tt-pw">
            <div class="tt-r" style="margin:0"><span>🔋 Power</span><span>${d.tdp}W system TDP</span></div>
            <div class="tt-pw-bg"><div class="tt-pw-fill" style="width:${pct}%;background:${col}"></div></div>
          </div>
          <div class="tt-r"><span>🌿 Efficiency</span><span>${d.tpw} t/s / W</span></div>
          <span class="tt-tag" style="background:${CAT_COL[d.cat]}22;color:${CAT_COL[d.cat]}">${CAT_LBL[d.cat]}</span>
          <div class="tt-note">${d.notes}</div>
        `;
        tt.style.display = 'block';
        const wrap = document.querySelector('.chart-wrap').getBoundingClientRect();
        let left = event.native.clientX - wrap.left + 14;
        let top  = event.native.clientY - wrap.top  - 20;
        if (left + 245 > wrap.width) left -= 255;
        if (top < 0) top = 6;
        tt.style.left = left + 'px';
        tt.style.top  = top  + 'px';
      },
    }
  });
  document.getElementById('chart').addEventListener('mouseleave', () => {
    document.getElementById('tt').style.display = 'none';
  });
}

function refreshChart() {
  if (!chart) return;
  chart.data.datasets = buildDatasets();
  chart.options.scales.y.title.text = yAxisLabel();
  chart.options.scales.y.ticks.callback = yTickFmt;
  chart.update();
}

// ─── MODELS ("What Can I Run?") ──────────────────────────────────────────────
// Q4 VRAM requirement in GB for each model
const MODELS = [
  { name:'Llama 3.2 1B',       vram: 1  },
  { name:'Llama 3.2 3B',       vram: 2  },
  { name:'Llama 3.1 8B',       vram: 5  },
  { name:'Mistral 7B',         vram: 5  },
  { name:'Gemma 3 9B',         vram: 6  },
  { name:'Llama 3.1 13B',      vram: 8  },
  { name:'Qwen 2.5 14B',       vram: 9  },
  { name:'Gemma 3 27B',        vram: 17 },
  { name:'Qwen 2.5 32B',       vram: 20 },
  { name:'Llama 3.3 70B',      vram: 43 },
  { name:'Qwen 2.5 72B',       vram: 45 },
  { name:'DeepSeek R1 8B',     vram: 5  },
  { name:'DeepSeek R1 14B',    vram: 9  },
  { name:'DeepSeek R1 32B',    vram: 20 },
  { name:'DeepSeek R1 70B',    vram: 43 },
  { name:'DeepSeek V3 671B',   vram: 380},
  { name:'Llama 3.1 405B',     vram: 230},
  { name:'Qwen3 30B-A3B (MoE)',vram: 17 },
  { name:'Mixtral 8×7B',       vram: 28 },
  { name:'Phi-4 14B',          vram: 9  },
  { name:'Command R 35B',      vram: 22 },
  { name:'Gemma 3 12B',        vram: 8  },
];

let selectedModel = null; // null = no filter

function populateModelSelect() {
  const sel = document.getElementById('modelSelect');
  MODELS.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.name;
    opt.textContent = m.name + ` (${m.vram}GB)`;
    sel.appendChild(opt);
  });
}

function getSelectedModelVram() {
  if (!selectedModel) return null;
  return (MODELS.find(m => m.name === selectedModel) || {}).vram || null;
}

// override alpha based on model fit
function modelAlpha(d) {
  const req = getSelectedModelVram();
  if (req === null) return null; // no model selected, use default
  return d.vram >= req ? 0.92 : 0.12; // can run = bright, can't = dimmed
}

function canRunModel(d) {
  const req = getSelectedModelVram();
  if (req === null) return true;
  return d.vram >= req;
}

function clearModel() {
  selectedModel = null;
  document.getElementById('modelSelect').value = '';
  document.getElementById('modelBanner').classList.add('hidden');
  refresh();
}

// ─── URL STATE (shareable links) ─────────────────────────────────────────────
function encodeState() {
  const params = new URLSearchParams();
  params.set('y', yMode);
  params.set('hl', hlMode);
  params.set('view', currentView);
  params.set('cats', [...activeCats].join(','));
  params.set('vram', [...activeVram].join(','));
  if (selectedModel) params.set('model', selectedModel);
  return '#' + params.toString();
}

function decodeState() {
  const hash = location.hash.slice(1);
  if (!hash) return;
  const params = new URLSearchParams(hash);
  if (params.get('y'))    { yMode = params.get('y'); document.getElementById('yMode').value = yMode; }
  if (params.get('hl'))   { hlMode = params.get('hl'); document.getElementById('hlMode').value = hlMode; }
  if (params.get('cats')) {
    activeCats = new Set(params.get('cats').split(','));
    document.querySelectorAll('.cf').forEach(cb => { cb.checked = activeCats.has(cb.dataset.cat); });
  }
  if (params.get('vram')) {
    activeVram = new Set(params.get('vram').split(','));
    document.querySelectorAll('.vf').forEach(cb => { cb.checked = activeVram.has(cb.dataset.vram); });
  }
  if (params.get('model')) {
    selectedModel = params.get('model');
    document.getElementById('modelSelect').value = selectedModel;
    showModelBanner();
  }
  if (params.get('view')) setView(params.get('view'));
}

function pushState() {
  history.replaceState(null, '', encodeState());
}

function copyShareLink() {
  pushState();
  navigator.clipboard.writeText(location.href).then(() => {
    const btn = document.getElementById('shareBtn');
    const orig = btn.textContent;
    btn.textContent = '✅ Copied!';
    setTimeout(() => btn.textContent = orig, 2000);
  });
}

function showModelBanner() {
  const req = getSelectedModelVram();
  if (!req) return;
  const can = DATA.filter(d => d.vram >= req).length;
  const banner = document.getElementById('modelBanner');
  banner.classList.remove('hidden');
  document.getElementById('bannerText').innerHTML =
    `<strong>${selectedModel}</strong> needs ~${req}GB &nbsp;·&nbsp; <span style="color:#5eead4">${can} setups</span> can run it &nbsp;·&nbsp; others are dimmed`;
}

// ─── CHART (updated to support model dimming) ─────────────────────────────────
function buildDatasets() {
  const groups = {};
  visible().forEach(d => {
    if (!groups[d.cat]) groups[d.cat] = [];
    groups[d.cat].push(d);
  });
  return Object.entries(groups).map(([cat, items]) => ({
    label: CAT_LBL[cat],
    data: items.map(d => ({ x: d.cost, y: getY(d), r: bubbleR(d.tps7), _raw: d })),
    backgroundColor: items.map(d => {
      const ma = modelAlpha(d);
      const base = ma !== null ? ma : (isHighlighted(d) ? 0.92 : 0.70);
      return pwColor(d.tdp, base);
    }),
    borderColor: items.map(d => {
      if (!canRunModel(d)) return 'rgba(255,255,255,0.08)';
      return isHighlighted(d) ? '#ffffff' : pwHex(d.tdp);
    }),
    borderWidth: items.map(d => isHighlighted(d) ? 2.5 : 1),
  }));
}

// ─── TABLE (updated to show model compat) ─────────────────────────────────────
function renderTable() {
  const rows = [...visible()];
  rows.sort((a, b) => {
    let av = a[sortCol], bv = b[sortCol];
    if (av == null) av = -Infinity;
    if (bv == null) bv = -Infinity;
    if (typeof av === 'string') return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    return sortAsc ? av - bv : bv - av;
  });

  const req = getSelectedModelVram();
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = rows.map(d => {
    const col   = CAT_COL[d.cat];
    const pct   = Math.round(Math.min(100, (d.tdp - 40) / 1160 * 100));
    const pwc   = pwHex(d.tdp);
    const fits  = req ? d.vram >= req : true;
    const rowStyle = fits ? '' : 'opacity:0.3';
    const fitBadge = req ? `<span style="margin-left:6px;font-size:.58rem;color:${fits?'#5eead4':'#ef4444'}">${fits?'✓ fits':'✗ OOM'}</span>` : '';
    return `
      <tr style="${rowStyle}">
        <td class="nm">${d.name}${fitBadge}</td>
        <td><span class="badge" style="background:${col}22;color:${col}">${CAT_LBL[d.cat]}</span></td>
        <td>$${d.cost.toLocaleString()}</td>
        <td>${d.vram} GB</td>
        <td style="color:#5eead4;font-weight:600">${d.tps7}</td>
        <td>${d.tps70 != null ? d.tps70 : '—'}</td>
        <td>~${d.maxB}B</td>
        <td>
          <div class="pw-cell">
            <div class="pw-bg"><div class="pw-fill" style="width:${pct}%;background:${pwc}"></div></div>
            <span class="pw-val" style="color:${pwc}">${d.tdp}W</span>
          </div>
        </td>
        <td style="color:#a78bfa;font-weight:600">${d.tpw}</td>
        <td style="color:#fb923c;font-weight:600">${d.value}</td>
      </tr>`;
  }).join('');

  document.querySelectorAll('thead th').forEach(th => {
    th.classList.remove('sorted');
    th.querySelector('.sa').textContent = '↕';
  });
  const activeTh = document.querySelector(`thead th[data-col="${sortCol}"]`);
  if (activeTh) {
    activeTh.classList.add('sorted');
    activeTh.querySelector('.sa').textContent = sortAsc ? '↑' : '↓';
  }
}

// ─── STATS ───────────────────────────────────────────────────────────────────
function updateStats() {
  const v = visible();
  if (!v.length) return;
  const bv  = v.reduce((a,x) => x.value > a.value ? x : a);
  const bsp = v.reduce((a,x) => (x.tps7||0) > (a.tps7||0) ? x : a);
  const bef = v.reduce((a,x) => x.tpw > a.tpw ? x : a);
  const bmm = v.reduce((a,x) => x.vram > a.vram ? x : a);
  const bmd = v.reduce((a,x) => x.maxB > a.maxB ? x : a);

  document.getElementById('s-val').textContent  = bv.name;
  document.getElementById('s-val2').textContent = bv.value + ' t/s per $1k';
  document.getElementById('s-spd').textContent  = bsp.name;
  document.getElementById('s-spd2').textContent = bsp.tps7 + ' t/s (7B Q4)';
  document.getElementById('s-eff').textContent  = bef.name;
  document.getElementById('s-eff2').textContent = bef.tpw + ' t/s/W · ' + bef.tdp + 'W TDP';
  document.getElementById('s-mem').textContent  = bmm.name;
  document.getElementById('s-mem2').textContent = bmm.vram + ' GB unified/VRAM';
  document.getElementById('s-mdl').textContent  = bmd.name;
  document.getElementById('s-mdl2').textContent = '~' + bmd.maxB + 'B params at Q4';
}

// ─── VIEW TOGGLE ─────────────────────────────────────────────────────────────
function setView(v) {
  currentView = v;
  document.getElementById('view-chart').classList.toggle('hidden', v !== 'chart');
  document.getElementById('view-table').classList.toggle('hidden', v !== 'table');
  document.getElementById('btn-chart').classList.toggle('active', v === 'chart');
  document.getElementById('btn-table').classList.toggle('active', v === 'table');
  if (v === 'table') renderTable();
}

// ─── REFRESH ALL ─────────────────────────────────────────────────────────────
function refresh() {
  refreshChart();
  if (currentView === 'table') renderTable();
  updateStats();
  pushState();
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────
document.querySelectorAll('.cf').forEach(cb => {
  cb.addEventListener('change', () => {
    if (cb.checked) activeCats.add(cb.dataset.cat);
    else activeCats.delete(cb.dataset.cat);
    refresh();
  });
});

document.querySelectorAll('.vf').forEach(cb => {
  cb.addEventListener('change', () => {
    if (cb.checked) activeVram.add(cb.dataset.vram);
    else activeVram.delete(cb.dataset.vram);
    refresh();
  });
});

document.getElementById('yMode').addEventListener('change', e => { yMode = e.target.value; refresh(); });
document.getElementById('hlMode').addEventListener('change', e => { hlMode = e.target.value; refresh(); });

document.getElementById('modelSelect').addEventListener('change', e => {
  selectedModel = e.target.value || null;
  if (selectedModel) showModelBanner(); else document.getElementById('modelBanner').classList.add('hidden');
  refresh();
});

document.querySelectorAll('thead th[data-col]').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (sortCol === col) sortAsc = !sortAsc;
    else { sortCol = col; sortAsc = true; }
    renderTable();
  });
});

// ─── MODALS ──────────────────────────────────────────────────────────────────
function openModal(id) {
  document.getElementById('modal-' + id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById('modal-' + id).classList.add('hidden');
  document.body.style.overflow = '';
}
function closeModalBackdrop(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['help','changelog'].forEach(id => {
      const el = document.getElementById('modal-' + id);
      if (el && !el.classList.contains('hidden')) closeModal(id);
    });
  }
});

// ─── MOBILE SIDEBAR ──────────────────────────────────────────────────────────
function toggleSidebar() {
  const sb = document.querySelector('.sidebar');
  const btn = document.getElementById('sidebarToggle');
  const open = sb.classList.toggle('open');
  btn.textContent = open ? '✕ Close' : '⚙️ Filters';
}

// ─── THEME ───────────────────────────────────────────────────────────────────
function applyTheme(light) {
  document.body.classList.toggle('light', light);
  document.getElementById('themeBtn').textContent = light ? '🌙 Dark' : '☀️ Light';
  localStorage.setItem('vramora-theme', light ? 'light' : 'dark');
  if (chart) {
    const lc     = light ? '#e8e4de' : '#16161e';
    const tc     = light ? '#b0a090' : '#3a3a5a';
    const titleC = light ? '#9e8e7e' : '#444';
    const bc     = light ? '#e8e4de' : '#222';
    chart.options.scales.x.grid.color   = lc;
    chart.options.scales.y.grid.color   = lc;
    chart.options.scales.x.ticks.color  = tc;
    chart.options.scales.y.ticks.color  = tc;
    chart.options.scales.x.title.color  = titleC;
    chart.options.scales.y.title.color  = titleC;
    chart.options.scales.x.border.color = bc;
    chart.options.scales.y.border.color = bc;
    chart.update();
  }
}

function toggleTheme() {
  applyTheme(!document.body.classList.contains('light'));
}

function applyStoredTheme() {
  const stored = localStorage.getItem('vramora-theme');
  if (stored === 'light') applyTheme(true);
}

// ─── INIT ────────────────────────────────────────────────────────────────────
Chart.register(ChartDataLabels);
populateModelSelect();
decodeState();
initChart();
updateStats();
applyStoredTheme();
