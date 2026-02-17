// ─── DATA ────────────────────────────────────────────────────────────────────
const CAT_COL = {nvidia:'#5eead4', apple:'#a78bfa', system:'#fb923c', cluster:'#facc15', amd:'#ef4444'};
const CAT_LBL = {nvidia:'NVIDIA GPU Rig', apple:'Apple Silicon', system:'Packaged System', cluster:'Mac Mini Cluster', amd:'AMD GPU'};

const DATA = [
  // gpuCost = GPU card(s) only; cost = full system (GPU + platform)
  // For Apple/packaged/cluster: gpuCost === cost (no separable GPU swap)
  {id:'rtx3060',  name:'RTX 3060',               cat:'nvidia',cost:600,  gpuCost:170,  vram:12, bw:360,  tps7:60,  tps70:null,maxB:7,  tdp:220, notes:'12GB VRAM limits to 7B Q4. Budget LLM entry point. Used GPU ~$160–180 + budget platform ~$430.'},
  {id:'rtx3080ti',name:'RTX 3080 Ti',             cat:'nvidia',cost:950,  gpuCost:410,  vram:12, bw:912,  tps7:108, tps70:null,maxB:7,  tdp:320, notes:'Fast bandwidth, 12GB cap. Blinding 7B speed but nowhere to grow. Used GPU ~$400–420 + mid platform ~$530.'},
  {id:'rtx4080',  name:'RTX 4080',                cat:'nvidia',cost:1500, gpuCost:850,  vram:16, bw:716,  tps7:113, tps70:null,maxB:13, tdp:290, notes:'16GB handles 13B. Ada Lovelace efficiency improvements. GPU ~$850 new + platform ~$650.'},
  {id:'rtx4000a', name:'RTX 4000 Ada (20GB)',     cat:'nvidia',cost:1900, gpuCost:1200, vram:20, bw:360,  tps7:65,  tps70:null,maxB:13, tdp:200, notes:'Pro workstation card. 20GB VRAM, very low power. Bandwidth-limited. Used GPU ~$1,200 + workstation platform ~$700.'},
  {id:'rtx3090',  name:'RTX 3090',                cat:'nvidia',cost:1200, gpuCost:725,  vram:24, bw:936,  tps7:121, tps70:null,maxB:30, tdp:490, notes:'The sweet spot. Used GPU ~$700–750, 24GB VRAM. Runs 30B Q4. Outstanding bang/buck at this price.'},
  {id:'rtx4090',  name:'RTX 4090',                cat:'nvidia',cost:2500, gpuCost:1900, vram:24, bw:1008, tps7:139, tps70:null,maxB:30, tdp:480, notes:'Fastest single consumer GPU. GPU ~$1,800–2,000 street + platform ~$700. Still 24GB VRAM cap.'},
  {id:'rtxA6000', name:'RTX A6000 (48GB)',        cat:'nvidia',cost:2900, gpuCost:2200, vram:48, bw:768,  tps7:107, tps70:22,  maxB:65, tdp:450, notes:'Pro workstation. 48GB single-card VRAM — no NVLink needed. Used GPU ~$2,200 + workstation ~$700. Runs 65B Q4.'},
  {id:'dual3090', name:'2× RTX 3090',             cat:'nvidia',cost:2250, gpuCost:1550, vram:48, bw:936,  tps7:121, tps70:20,  maxB:65, tdp:830, notes:'NVLink bridge: 48GB combined. Used GPUs ~$1,450 + NVLink ~$100 + platform ~$700. 65B Q4 ~20 t/s. Incredible value.'},
  {id:'dual4090', name:'2× RTX 4090',             cat:'nvidia',cost:4800, gpuCost:3800, vram:48, bw:1008, tps7:139, tps70:28,  maxB:70, tdp:810, notes:'NVLink, 48GB combined. GPUs ~$3,800 + platform ~$1,000. 70B Q4 ~28 t/s. Speed king.'},
  {id:'tri3090',  name:'3× RTX 3090',             cat:'nvidia',cost:3100, gpuCost:2250, vram:72, bw:936,  tps7:121, tps70:40,  maxB:120,tdp:1170,notes:'72GB VRAM. Used GPUs ~$2,150 + bridges + HEDT platform ~$950. 120B Q4 capable. 124 t/s tg32 on 120B MXFP4 (llama.cpp).'},
  {id:'m3max48',  name:'M3 Max Studio (48GB)',    cat:'apple', cost:3999, gpuCost:3999, vram:48, bw:400,  tps7:66,  tps70:18,  maxB:65, tdp:50,  notes:'Silent, efficient. 48GB unified. $3,999. ~40-50W under LLM load.'},
  {id:'m4max64',  name:'M4 Max Studio (64GB)',    cat:'apple', cost:4999, gpuCost:4999, vram:64, bw:410,  tps7:80,  tps70:25,  maxB:70, tdp:55,  notes:'M4 Max. 64GB unified. Qwen3 30B-A3B >100 t/s via MLX.'},
  {id:'m4max128', name:'M4 Max Studio (128GB)',   cat:'apple', cost:7199, gpuCost:7199, vram:128,bw:546,  tps7:80,  tps70:40,  maxB:120,tdp:60,  notes:'128GB unified memory. Silent powerhouse. Handles 120B Q4.'},
  {id:'m2ultra',  name:'M2 Ultra Studio (192GB)', cat:'apple', cost:6999, gpuCost:6999, vram:192,bw:800,  tps7:94,  tps70:30,  maxB:180,tdp:90,  notes:'192GB unified. 70B prompt eval ~117 t/s. Excellent big-model machine.'},
  {id:'m3ultra',  name:'M3 Ultra Studio (256GB)', cat:'apple', cost:9999, gpuCost:9999, vram:256,bw:819,  tps7:105, tps70:71,  maxB:200,tdp:110, notes:'256GB unified. 70 t/s tg32 on 120B MXFP4. Top of Apple lineup.'},
  {id:'m3ultra512',name:'M3 Ultra Studio (512GB)', cat:'apple', cost:14999,gpuCost:14999,vram:512,bw:890,  tps7:115, tps70:15,  maxB:400,tdp:120, notes:'512GB unified memory. 890 GB/s bandwidth. Runs DeepSeek R1 671B Q4 at ~18 t/s, Llama 70B Q4 ~12–18 t/s. DeepSeek V3 671B (MLX 4-bit) ~19 t/s. The only single workstation that can run 400B+ models. $14,999. Silent, 120W TDP.'},
  {id:'m4ultra',  name:'M4 Ultra Studio (est.)',  cat:'apple', cost:8999, gpuCost:8999, vram:192,bw:820,  tps7:120, tps70:55,  maxB:180,tdp:100, notes:'M4 Ultra estimated. Best t/s per watt of any platform.'},
  {id:'dgxspark', name:'NVIDIA DGX Spark',        cat:'system',cost:3999, gpuCost:3999, vram:128,bw:275,  tps7:60,  tps70:39,  maxB:200,tdp:120, notes:'GB10 Grace Blackwell, 128GB LPDDR5. $3,999. NVFP4 unlocks large-model perf. AI lab in a box.'},

  // ── NEW ──
  {id:'rtx5090',  name:'RTX 5090',                cat:'nvidia',cost:4700, gpuCost:4000, vram:32, bw:1792, tps7:186, tps70:null,maxB:30, tdp:575, notes:'Blackwell GB202, 32GB GDDR7, 1792 GB/s bandwidth. GPU ~$3,999–4,000 street + platform ~$700. Blazing fast on 7B–32B. Still 32GB cap — no 70B without multi-GPU.'},
  {id:'dellgb10', name:'Dell Pro Max (GB10)',      cat:'system',cost:4600, gpuCost:4600, vram:128,bw:275,  tps7:60,  tps70:39,  maxB:200,tdp:125, notes:'Same GB10 Grace Blackwell chip as DGX Spark, 128GB LPDDR5x. $4,600. Ships with DGX OS + NVIDIA AI stack. Slightly pricier than Spark but tighter Dell ecosystem.'},
  {id:'strixhalo',name:'Ryzen AI Max+ 395 (Strix Halo)', cat:'system',cost:1999,gpuCost:1999,vram:128,bw:215,  tps7:47,  tps70:5,   maxB:120,tdp:120, notes:'AMD Ryzen AI Max+ 395 — 40-CU RDNA 3.5 iGPU, 128GB LPDDR5x-8000 unified memory. Framework Desktop $1,999. ~215 GB/s effective bandwidth. 7B Q4 ~47 t/s (Vulkan), 70B Q4 ~5 t/s (ROCm/Vulkan — drivers still maturing). Runs Qwen3-30B-A3B MoE at ~72 t/s. Exceptional value-per-dollar; ROCm ecosystem improving fast. ⚠️ LLMlimitation: ROCm still has fewer optimizations than CUDA; some models may run slower or have compatibility issues.'},

  // ── AMD RDNA 4 ──
  {id:'rx9070xt', name:'RX 9070 XT',                 cat:'amd',cost:1300, gpuCost:900,  vram:16, bw:1120, tps7:120, tps70:null,maxB:13, tdp:304, notes:'RDNA 4 flagship, 16GB GDDR6, 1120 GB/s. ~$900 street. Strong rasterization, but ROCm/LLVM drivers for LLM inference are still early — expect ~20-30% slower than equivalent NVIDIA on llama.cpp. Great for 7B, limited for 13B+.'},
  {id:'rx9070',   name:'RX 9070',                    cat:'amd',cost:1100, gpuCost:750,  vram:16, bw:960,  tps7:105, tps70:null,maxB:13, tdp:260, notes:'RDNA 4 mid-range, 16GB GDDR6, 960 GB/s. ~$750 street. Similar LLM caveats as 9070 XT — ROCm support improving but not yet on par with NVIDIA. Good 7B runner, 13B marginal.'},

  // ── AMD RDNA 3 ──
  {id:'rx7900xtx',name:'RX 7900 XTX',                cat:'amd',cost:1400, gpuCost:950,  vram:24, bw:960,  tps7:95,  tps70:null,maxB:24, tdp:355, notes:'RDNA 3 flagship, 24GB GDDR6, 960 GB/s. ~$950 used. Best AMD VRAM-per-dollar. ⚠️ LLMlimitation: ROCm drivers less mature than NVIDIA — expect ~20-40% slower token throughput. 24GB handles 24B Q4 but speed lags behind equivalent NVIDIA.'},
  {id:'rx7900xt', name:'RX 7900 XT',                 cat:'amd',cost:1100, gpuCost:700,  vram:20, bw:720,  tps7:80,  tps70:null,maxB:13, tdp:300, notes:'RDNA 3, 20GB GDDR6, 720 GB/s. ~$700 used. Decent 7B/13B option but ROCm limitations apply. Lower bandwidth than XTX hurts larger models.'},
  {id:'rx7800xt', name:'RX 7800 XT',                 cat:'amd',cost:700,  gpuCost:400,  vram:16, bw:624,  tps7:72,  tps70:null,maxB:13, tdp:263, notes:'RDNA 3, 16GB GDDR6, 624 GB/s. ~$400 used. Budget 16GB option. ⚠️ LLMlimitation: ROCm inference still maturing; CUDA quantization (Q4, Q5, Q8) support varies. Works for 7B, 13B pushy.'},
  {id:'rx7700xt', name:'RX 7700 XT',                 cat:'amd',cost:550,  gpuCost:320,  vram:12, bw:432,  tps7:60,  tps70:null,maxB:7,  tdp:245, notes:'RDNA 3, 12GB GDDR6, 432 GB/s. ~$320 used. Budget option. 12GB VRAM caps to 7B. LLM performance limited by both VRAM and ROCm maturity vs NVIDIA.'},
  {id:'rx7600xt', name:'RX 7600 XT',                 cat:'amd',cost:400,  gpuCost:250,  vram:16, bw:512,  tps7:55,  tps70:null,maxB:13, tdp:190, notes:'RDNA 3, 16GB GDDR6, 512 GB/s. ~$250 used. Budget 16GB option. ⚠️ LLMlimitation: Lower TDP but also lower ROCm optimization. Fine for 7B Q4, 13B struggles with bandwidth.'},
  {id:'rx7600',   name:'RX 7600',                    cat:'amd',cost:300,  gpuCost:180,  vram:8,  bw:288,  tps7:45,  tps70:null,maxB:7,  tdp:165, notes:'RDNA 3, 8GB GDDR6, 288 GB/s. ~$180 used. Entry-level. 8GB caps to 7B. Not ideal for LLMs given VRAM ceiling.'},

  // ── AMD RDNA 2 (older, limited) ──
  {id:'rx6950xt', name:'RX 6950 XT',                 cat:'amd',cost:800,  gpuCost:500,  vram:16, bw:576,  tps7:65,  tps70:null,maxB:13, tdp:335, notes:'RDNA 2 flagship, 16GB GDDR6, 576 GB/s. ~$500 used. Older architecture, less efficient. ⚠️ LLMlimitation: ROCm 5.x has RDNA2 support but far fewer optimizations. 7B viable, 13B marginal.'},
  {id:'rx6800xt', name:'RX 6800 XT',                 cat:'amd',cost:650,  gpuCost:400,  vram:16, bw:512,  tps7:60,  tps70:null,maxB:13, tdp:300, notes:'RDNA 2, 16GB GDDR6, 512 GB/s. ~$400 used. Similar LLM constraints as 6950 XT — older ROCm support, lower bandwidth.'},
  {id:'rx6700xt', name:'RX 6700 XT',                 cat:'amd',cost:350,  gpuCost:180,  vram:12, bw:384,  tps7:45,  tps70:null,maxB:7,  tdp:230, notes:'RDNA 2, 12GB GDDR6, 384 GB/s. ~$180 used. Budget 12GB. 7B cap, not great for LLMs vs NVIDIA alternatives.'},
  {id:'mini4x',   name:'4× Mac Mini M4 Pro (96GB)', cat:'cluster',cost:5200, gpuCost:5200, vram:96, bw:960,  tps7:70,  tps70:30,  maxB:90, tdp:160, notes:'4× M4 Pro Mac Minis daisy-chained via Thunderbolt 5 (exo/llama.cpp). 96GB combined. Thunderbolt bandwidth is the bottleneck: ~40 GB/s per link. ~70 t/s on 7B single-node; distributed 70B ~30 t/s. DeepSeek 671B ~5 t/s on 8-node cluster.'},
  {id:'mini8x',   name:'8× Mac Mini M4 Pro (192GB)',cat:'cluster',cost:10400,gpuCost:10400,vram:192,bw:1920, tps7:70,  tps70:20,  maxB:180,tdp:320, notes:'8× M4 Pro Minis (exo cluster). 192GB combined. Runs DeepSeek 671B at ~5 t/s, Llama 70B ~20 t/s. Thunderbolt inter-node bandwidth severely limits large-model speed. Great for model capacity, not raw speed.'},
];

// Round a float model size cleanly: 7.1000000000005 → 7.1, 6.999999 → 7
function roundModelSize(n) {
  if (n == null) return n;
  // Round to 1 decimal, then strip trailing .0
  const r = Math.round(n * 10) / 10;
  return r % 1 === 0 ? Math.round(r) : r;
}

DATA.forEach(d => {
  d.tpw = +(d.tps7 / d.tdp).toFixed(2);
  // value is recomputed dynamically via getEffectiveCost — init with system cost
  d.value = +(d.tps7 / d.cost * 1000).toFixed(1);
  // Sanitise maxB in case of float drift
  d.maxB = roundModelSize(d.maxB);
});

// ─── STATE ───────────────────────────────────────────────────────────────────
let activeCats  = new Set(['nvidia','amd','apple','system','cluster']);
let activeVram  = new Set(['12','24','48','96','192','512']);
let yMode       = 'max_params';
let hlMode      = 'none';
let sortCol     = 'cost';
let sortAsc     = true;
let currentView = 'chart';
let gpuOnlyMode = false; // toggle: GPU-only cost vs full system cost
let compareMode = 'model'; // 'model' (current) or 'hardware' (new mode)
let selectedHardware = []; // array of hardware IDs for hardware mode
let panModeActive = false; // touch pan lock — off by default so scroll works normally

// Model sizes for hardware comparison mode (log-ish scale)
const MODEL_SIZES = [1, 3, 7, 13, 30, 70, 120, 200, 400];

// Estimate t/s for a given hardware config and model size
// Uses interpolation between known benchmarks when available
function getEstimatedTps(hw, paramB) {
  // Check VRAM constraint: Q4 needs ~0.6 GB per billion params (with overhead)
  const vramNeeded = paramB * 0.6;
  if (vramNeeded > hw.vram) return null; // OOM
  
  // Use actual benchmark if we have it
  if (paramB === 7 && hw.tps7) return hw.tps7;
  if (paramB === 70 && hw.tps70) return hw.tps70;
  
  const bytesPerParam = 0.5; // Q4
  
  // If we have both 7B and 70B benchmarks, interpolate/extrapolate using log scale
  // t/s roughly follows: tps ∝ 1/params (linear in log-log space)
  if (hw.tps7 && hw.tps70) {
    // Log-linear interpolation between known points
    const log7 = Math.log(7), log70 = Math.log(70);
    const logTps7 = Math.log(hw.tps7), logTps70 = Math.log(hw.tps70);
    const logParam = Math.log(paramB);
    
    // slope in log-log space
    const slope = (logTps70 - logTps7) / (log70 - log7);
    const logTps = logTps7 + slope * (logParam - log7);
    
    return Math.round(Math.exp(logTps));
  }
  
  // Fallback: estimate from bandwidth with calibrated efficiency
  const theoretical = hw.bw / (paramB * bytesPerParam);
  let efficiency = 0.45; // default
  if (hw.tps7) {
    const theoretical7B = hw.bw / (7 * bytesPerParam);
    efficiency = hw.tps7 / theoretical7B;
  }
  
  return Math.round(theoretical * efficiency);
}

// Returns the cost to use for X-axis / value calculations
function getEffectiveCost(d) {
  return gpuOnlyMode ? d.gpuCost : d.cost;
}

function xAxisLabel() {
  return gpuOnlyMode ? 'GPU Cost Only (USD)' : 'System Cost (USD)';
}

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

function getEffectiveValue(d) {
  return +(d.tps7 / getEffectiveCost(d) * 1000).toFixed(1);
}

function isHighlighted(d) {
  if (hlMode === 'none') return false;
  const v = visible();
  if (!v.length) return false;
  const best = {
    best_value: v.reduce((a,x) => getEffectiveValue(x) > getEffectiveValue(a) ? x : a),
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

function resetZoom() {
  if (chart) chart.resetZoom();
  document.getElementById('resetZoomBtn').style.display = 'none';
}

function zoomIn() {
  if (chart) {
    chart.zoom(1.3);
    document.getElementById('resetZoomBtn').style.display = '';
  }
}

function zoomOut() {
  if (chart) {
    chart.zoom(0.7);
    document.getElementById('resetZoomBtn').style.display = '';
  }
}

function togglePanMode() {
  panModeActive = !panModeActive;
  const btn = document.getElementById('panModeBtn');
  btn.textContent = panModeActive ? '✋ Pan: ON' : '✋ Pan';
  btn.style.background = panModeActive ? '#7c6af7' : '';
  btn.style.color = panModeActive ? '#fff' : '';
  btn.style.borderColor = panModeActive ? '#7c6af7' : '';
}

// Inline plugin: fills chart canvas with a background color
const chartBgPlugin = {
  id: 'chartBg',
  beforeDraw(chart) {
    const light = document.body.classList.contains('light');
    const ctx = chart.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = light ? '#faf9f7' : '#111118';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

function initChart() {
  if (chart) { chart.destroy(); chart = null; }
  Chart.register(ChartDataLabels);
  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bubble',
    data: { datasets: buildDatasets() },
    plugins: [chartBgPlugin],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 220 },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        zoom: {
          zoom: {
            wheel: { enabled: false },               // disabled — use buttons instead
            drag:  { enabled: false },               // no drag-to-zoom box
            pinch: { enabled: true },                // pinch = zoom on trackpad/mobile
            mode: 'xy',
            onZoomComplete: () => { document.getElementById('resetZoomBtn').style.display = ''; },
          },
          pan: {
            enabled: true,
            mode: 'xy',
            threshold: 10,
            // Block single-finger touch pan (interferes with scroll), allow mouse drag
            // Multi-touch (pinch) is handled by zoom, not pan
            onPanStart: ({ event }) => {
              // Allow mouse drag always
              if (event.pointerType === 'mouse') return true;
              // Touch: only allow if pan mode is active
              if (event.pointerType === 'touch' && !panModeActive) return false;
              return true;
            },
            onPanComplete: () => { document.getElementById('resetZoomBtn').style.display = ''; },
          },
          limits: {
            x: { min: 0, max: 20000, minRange: 50 },
            y: { min: 0, max: 600, minRange: 2 },
          },
        },
        datalabels: {
          color: (ctx) => document.body.classList.contains('light') ? '#1a1a2e' : '#ffffff',
          font: { size: 9, weight: '700', family: '-apple-system, BlinkMacSystemFont, sans-serif' },
          align: 'top',
          offset: 6,
          clip: false,
          backgroundColor: (ctx) => document.body.classList.contains('light') ? 'rgba(255,255,255,0.82)' : 'rgba(12,12,18,0.78)',
          borderRadius: 3,
          padding: { top: 2, bottom: 2, left: 4, right: 4 },
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
          title: { display: true, text: xAxisLabel(), color: '#888', font: { size: 10 } },
          ticks: { color: '#aaa', callback: v => '$' + v.toLocaleString(), maxTicksLimit: 8 },
          grid: { color: '#1e1e2e' },
          border: { color: '#2a2a3a' },
          bounds: 'ticks',
          afterBuildTicks: scale => {
            if (!scale.ticks.length) return;
            const range = scale.max - scale.min || 1;
            const mag = Math.pow(10, Math.floor(Math.log10(range)) - 1);
            scale.min = Math.max(0, Math.floor(scale.min / mag) * mag);
            scale.max = Math.min(200000, Math.ceil(scale.max / mag) * mag);
          },
        },
        y: {
          title: { display: true, text: yAxisLabel(), color: '#888', font: { size: 10 } },
          ticks: { color: '#aaa', callback: yTickFmt, maxTicksLimit: 8 },
          grid: { color: '#1e1e2e' },
          border: { color: '#2a2a3a' },
          bounds: 'ticks',
          afterBuildTicks: scale => {
            if (!scale.ticks.length) return;
            const range = scale.max - scale.min || 1;
            const mag = Math.pow(10, Math.floor(Math.log10(range)) - 1);
            scale.min = Math.max(0, Math.floor(scale.min / mag) * mag);
            scale.max = Math.min(2000, Math.ceil(scale.max / mag) * mag);
          },
        },
      },
      onHover: (event, elements) => {
        const tt = document.getElementById('tt');
        if (!elements.length) { tt.style.display = 'none'; return; }
        const d = chart.data.datasets[elements[0].datasetIndex].data[elements[0].index]._raw;
        const col = pwHex(d.tdp);
        const pct = Math.round(Math.min(100, (d.tdp - 40) / 1160 * 100));
        const effCost = getEffectiveCost(d);
        const costLine = gpuOnlyMode
          ? `<div class="tt-r"><span>🎮 GPU Cost</span><span>$${d.gpuCost.toLocaleString()}</span></div>
             <div class="tt-r"><span>💰 System Cost</span><span>$${d.cost.toLocaleString()}</span></div>`
          : `<div class="tt-r"><span>💰 System Cost</span><span>$${d.cost.toLocaleString()}</span></div>`;
        tt.innerHTML = `
          <div class="tt-name">${d.name}</div>
          ${costLine}
          <div class="tt-r"><span>🧠 Memory</span><span>${d.vram} GB</span></div>
          <div class="tt-r"><span>⚡ 7B Q4</span><span>${d.tps7} t/s</span></div>
          <div class="tt-r"><span>🐢 70B Q4</span><span>${d.tps70 ? d.tps70 + ' t/s' : 'OOM / N/A'}</span></div>
          <div class="tt-r"><span>📏 Max Model</span><span>~${d.maxB}B (Q4)</span></div>
          <div class="tt-r"><span>🚀 Bandwidth</span><span>${d.bw} GB/s</span></div>
          <div class="tt-r"><span>💡 Value</span><span>${getEffectiveValue(d)} t/s per $1k</span></div>
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
  chart.options.scales.x.title.text = xAxisLabel();
  chart.resetZoom();
  document.getElementById('resetZoomBtn').style.display = 'none';
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

// ─── HARDWARE MODE ───────────────────────────────────────────────────────────
function populateHardwareSelect() {
  const list = document.getElementById('hwDropdownList');
  DATA.forEach(d => {
    const item = document.createElement('label');
    item.className = 'hw-dropdown-item';
    item.dataset.id = d.id;
    item.innerHTML = `
      <input type="checkbox" value="${d.id}">
      <span class="hw-dot" style="background:${CAT_COL[d.cat]}"></span>
      <span>${d.name} (${d.vram}GB)</span>
    `;
    item.querySelector('input').addEventListener('change', onHwCheckChange);
    list.appendChild(item);
  });
}

function toggleHwDropdown() {
  const menu = document.getElementById('hwDropdownMenu');
  menu.classList.toggle('hidden');
}

// Close dropdown when clicking outside
document.addEventListener('click', e => {
  const dropdown = document.querySelector('.hw-dropdown');
  const menu = document.getElementById('hwDropdownMenu');
  if (dropdown && !dropdown.contains(e.target) && menu && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
  }
});

function onHwCheckChange() {
  updateHwDropdownLabel();
  rebuildChart();
  pushState();
}

function updateHwDropdownLabel() {
  const checked = document.querySelectorAll('#hwDropdownList input:checked');
  const label = document.getElementById('hwDropdownLabel');
  if (checked.length === 0) {
    label.textContent = 'Select hardware...';
  } else if (checked.length <= 2) {
    const names = [...checked].map(cb => {
      const hw = DATA.find(d => d.id === cb.value);
      return hw ? hw.name.replace('RTX ', '').replace(' Studio', '').replace(' (est.)', '') : cb.value;
    });
    label.textContent = names.join(', ');
  } else {
    label.textContent = `${checked.length} selected`;
  }
  // Update selected state styling
  document.querySelectorAll('.hw-dropdown-item').forEach(item => {
    item.classList.toggle('selected', item.querySelector('input').checked);
  });
}

function selectAllHw() {
  document.querySelectorAll('#hwDropdownList input').forEach(cb => cb.checked = true);
  onHwCheckChange();
}

function clearAllHw() {
  document.querySelectorAll('#hwDropdownList input').forEach(cb => cb.checked = false);
  onHwCheckChange();
}

function setCompareMode(mode) {
  compareMode = mode;
  document.getElementById('btn-mode-model').classList.toggle('active', mode === 'model');
  document.getElementById('btn-mode-hardware').classList.toggle('active', mode === 'hardware');
  document.getElementById('modelModeControls').classList.toggle('hidden', mode !== 'model');
  document.getElementById('hardwareModeControls').classList.toggle('hidden', mode !== 'hardware');
  document.getElementById('hwEstimateNote').classList.toggle('hidden', mode !== 'hardware');

  // Clear model banner when switching modes
  if (mode === 'hardware') {
    document.getElementById('modelBanner').classList.add('hidden');
    // Auto-select defaults on first entry so chart isn't blank
    const already = getSelectedHardwareIds();
    if (!already.length) {
      const defaults = ['rtx3090', 'rtx4090', 'm4max64', 'dgxspark'];
      document.querySelectorAll('#hwDropdownList input').forEach(cb => {
        if (defaults.includes(cb.value)) cb.checked = true;
      });
      updateHwDropdownLabel();
    }
  }

  rebuildChart();
  pushState();
}

function getSelectedHardwareIds() {
  const checked = document.querySelectorAll('#hwDropdownList input:checked');
  return [...checked].map(cb => cb.value);
}

function buildHardwareDatasets() {
  const hwIds = getSelectedHardwareIds();
  if (!hwIds.length) return [];
  
  // Color palette for multiple hardware lines
  const colors = ['#5eead4', '#a78bfa', '#fb923c', '#facc15', '#f472b6', '#60a5fa', '#4ade80', '#fbbf24'];
  
  return hwIds.map((id, idx) => {
    const hw = DATA.find(d => d.id === id);
    if (!hw) return null;
    
    const color = colors[idx % colors.length];
    const dataPoints = [];
    const oomPoints = []; // for dashed OOM line
    
    let hitOom = false;
    MODEL_SIZES.forEach(paramB => {
      const tps = getEstimatedTps(hw, paramB);
      if (tps !== null && !hitOom) {
        dataPoints.push({ x: paramB, y: tps });
      } else {
        hitOom = true;
        // Estimate what it *would* be if we had infinite VRAM (dashed line)
        const bytesPerParam = 0.5;
        const theoretical = hw.bw / (paramB * bytesPerParam);
        let efficiency = 0.45;
        if (hw.tps7) {
          const theoretical7B = hw.bw / (7 * bytesPerParam);
          efficiency = hw.tps7 / theoretical7B;
        }
        oomPoints.push({ x: paramB, y: Math.round(theoretical * efficiency) });
      }
    });
    
    const datasets = [{
      label: hw.name,
      data: dataPoints,
      borderColor: color,
      backgroundColor: color + '33',
      borderWidth: 2.5,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointStyle: 'circle',
      tension: 0.3,
      fill: false,
      datalabels: {
        display: (ctx) => {
          // Only label the last visible data point (max model size)
          return ctx.dataIndex === ctx.dataset.data.length - 1;
        },
        color: color,
        font: { size: 9, weight: '700' },
        align: 'right',
        offset: 6,
        backgroundColor: (ctx) => document.body.classList.contains('light') ? 'rgba(255,255,255,0.85)' : 'rgba(12,12,18,0.80)',
        borderRadius: 3,
        padding: { top: 2, bottom: 2, left: 4, right: 4 },
        formatter: (val, ctx) => ctx.dataset.label.replace(' (est.)', ''),
      },
    }];

    // Add OOM dashed line if applicable
    if (oomPoints.length > 0 && dataPoints.length > 0) {
      // Connect last valid point to OOM line
      const lastValid = dataPoints[dataPoints.length - 1];
      datasets.push({
        label: hw.name + ' (OOM)',
        data: [lastValid, ...oomPoints],
        borderColor: color + '66',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 4,
        pointHoverRadius: 6,
        pointStyle: 'circle',
        tension: 0.3,
        fill: false,
        datalabels: { display: false },
      });
    }
    
    return datasets;
  }).filter(Boolean).flat();
}

function rebuildChart() {
  // Chart.js v4 does not support mutating chart.config.type after creation.
  // Destroy and recreate with the correct type whenever the mode changes.
  if (chart) { chart.destroy(); chart = null; }

  const light = document.body.classList.contains('light');
  const ctx = document.getElementById('chart').getContext('2d');

  if (compareMode === 'hardware') {
    chart = new Chart(ctx, {
      type: 'line',
      data: { datasets: buildHardwareDatasets() },
      plugins: [chartBgPlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 200 },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: light ? '#3d2b1a' : '#bbb',
              font: { size: 11 },
              filter: item => !item.text.includes('(OOM)'),
            },
          },
          tooltip: { enabled: false },
          datalabels: { display: true },
          zoom: {
            zoom: {
              wheel: { enabled: false },             // disabled — use buttons instead
              drag:  { enabled: false },
              pinch: { enabled: true },
              mode: 'xy',
              onZoomComplete: () => { document.getElementById('resetZoomBtn').style.display = ''; },
            },
            pan: {
              enabled: true,
              mode: 'xy',
              threshold: 10,
              onPanStart: ({ event }) => {
                if (event.pointerType === 'mouse') return true;
                if (event.pointerType === 'touch' && !panModeActive) return false;
                return true;
              },
              onPanComplete: () => { document.getElementById('resetZoomBtn').style.display = ''; },
            },
            limits: {
              x: { min: 0.5, max: 500, minRange: 1 },
              y: { min: 0, max: 300, minRange: 2 },
            },
          },
        },
        scales: {
          x: {
            type: 'logarithmic',
            grid: { color: light ? '#e8e4de' : '#1e1e2e' },
            border: { color: light ? '#e8e4de' : '#2a2a3a' },
            title: { display: true, text: 'Model Size (Billion Parameters)', color: light ? '#9e8e7e' : '#888', font: { size: 10 } },
            ticks: {
              color: light ? '#b0a090' : '#aaa',
              maxTicksLimit: 8,
              callback: v => {
                const clean = [1, 3, 7, 13, 30, 70, 120, 200, 400];
                return clean.includes(v) ? v + 'B' : '';
              },
            },
          },
          y: {
            grid: { color: light ? '#e8e4de' : '#1e1e2e' },
            border: { color: light ? '#e8e4de' : '#2a2a3a' },
            title: { display: true, text: 'Estimated Tokens/sec (Q4)', color: light ? '#9e8e7e' : '#888', font: { size: 10 } },
            ticks: { color: light ? '#b0a090' : '#aaa', maxTicksLimit: 8, callback: v => v + ' t/s' },
            afterBuildTicks: scale => {
              if (!scale.ticks.length) return;
              const range = scale.max - scale.min || 1;
              const mag = Math.pow(10, Math.floor(Math.log10(range)) - 1);
              scale.min = Math.max(0, Math.floor(scale.min / mag) * mag);
              scale.max = Math.min(2000, Math.ceil(scale.max / mag) * mag);
            },
          },
        },
        onHover: (event, elements) => {
          const tt = document.getElementById('tt');
          if (!elements.length) { tt.style.display = 'none'; return; }
          const el = elements[0];
          const ds = chart.data.datasets[el.datasetIndex];
          const pt = ds.data[el.dataIndex];
          if (!pt) { tt.style.display = 'none'; return; }
          const isOom = ds.label.includes('(OOM)');
          tt.innerHTML = `
            <div class="tt-name">${ds.label.replace(' (OOM)', '')}</div>
            <div class="tt-r"><span>📏 Model Size</span><span>${roundModelSize(pt.x)}B params</span></div>
            <div class="tt-r"><span>⚡ Est. t/s</span><span>${Math.round(pt.y)} t/s${isOom ? ' <span style="color:#ef4444;font-size:.65rem">(OOM)</span>' : ''}</span></div>
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
      },
    });
  } else {
    initChart(); // recreate bubble chart (initChart now destroy-first)
  }

  document.getElementById('resetZoomBtn').style.display = 'none';
}

// ─── URL STATE (shareable links) ─────────────────────────────────────────────
function encodeState() {
  const params = new URLSearchParams();
  params.set('mode', compareMode);
  params.set('y', yMode);
  params.set('hl', hlMode);
  params.set('view', currentView);
  params.set('cats', [...activeCats].join(','));
  params.set('vram', [...activeVram].join(','));
  if (selectedModel) params.set('model', selectedModel);
  if (gpuOnlyMode)   params.set('gpuonly', '1');
  if (compareMode === 'hardware') {
    const hwIds = getSelectedHardwareIds();
    if (hwIds.length) params.set('hw', hwIds.join(','));
  }
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
  if (params.get('gpuonly') === '1') {
    gpuOnlyMode = true;
    document.getElementById('costMode').checked = true;
  }
  if (params.get('mode') === 'hardware') {
    compareMode = 'hardware';
    document.getElementById('btn-mode-model').classList.remove('active');
    document.getElementById('btn-mode-hardware').classList.add('active');
    document.getElementById('modelModeControls').classList.add('hidden');
    document.getElementById('hardwareModeControls').classList.remove('hidden');
    document.getElementById('hwEstimateNote').classList.remove('hidden');
    if (params.get('hw')) {
      const hwIds = params.get('hw').split(',');
      document.querySelectorAll('#hwDropdownList input').forEach(cb => {
        cb.checked = hwIds.includes(cb.value);
      });
      updateHwDropdownLabel();
    }
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
    data: items.map(d => ({ x: getEffectiveCost(d), y: getY(d), r: bubbleR(d.tps7), _raw: d })),
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
        <td>${gpuOnlyMode
          ? `<span title="System: $${d.cost.toLocaleString()}">$${d.gpuCost.toLocaleString()} <span style="font-size:.6rem;color:#555">(GPU)</span></span>`
          : `$${d.cost.toLocaleString()}`}</td>
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
        <td style="color:#fb923c;font-weight:600">${getEffectiveValue(d)}</td>
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
  const bv  = v.reduce((a,x) => getEffectiveValue(x) > getEffectiveValue(a) ? x : a);
  const bsp = v.reduce((a,x) => (x.tps7||0) > (a.tps7||0) ? x : a);
  const bef = v.reduce((a,x) => x.tpw > a.tpw ? x : a);
  const bmm = v.reduce((a,x) => x.vram > a.vram ? x : a);
  const bmd = v.reduce((a,x) => x.maxB > a.maxB ? x : a);

  document.getElementById('s-val').textContent  = bv.name;
  document.getElementById('s-val2').textContent = getEffectiveValue(bv) + ' t/s per $1k';
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
// Use event delegation to support both sidebar and mobile drawer
document.addEventListener('change', e => {
  if (e.target.classList.contains('cf')) {
    if (e.target.checked) activeCats.add(e.target.dataset.cat);
    else activeCats.delete(e.target.dataset.cat);
    // Sync checkbox state across drawer and sidebar
    document.querySelectorAll(`.cf[data-cat="${e.target.dataset.cat}"]`).forEach(cb => cb.checked = e.target.checked);
    refresh();
  }
  if (e.target.classList.contains('vf')) {
    if (e.target.checked) activeVram.add(e.target.dataset.vram);
    else activeVram.delete(e.target.dataset.vram);
    // Sync checkbox state across drawer and sidebar
    document.querySelectorAll(`.vf[data-vram="${e.target.dataset.vram}"]`).forEach(cb => cb.checked = e.target.checked);
    refresh();
  }
});

document.getElementById('yMode').addEventListener('change', e => { yMode = e.target.value; refresh(); });
document.getElementById('hlMode').addEventListener('change', e => { hlMode = e.target.value; refresh(); });

document.getElementById('costMode').addEventListener('change', e => {
  gpuOnlyMode = e.target.checked;
  localStorage.setItem('vramora-costmode', gpuOnlyMode ? '1' : '0');
  refresh();
});

document.getElementById('modelSelect').addEventListener('change', e => {
  selectedModel = e.target.value || null;
  if (selectedModel) showModelBanner(); else document.getElementById('modelBanner').classList.add('hidden');
  refresh();
});

// Hardware selection handled via onHwCheckChange()

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

// Mobile drawer toggle (full-screen on mobile)
function toggleDrawer() {
  const drawer = document.getElementById('sidebarDrawer');
  const isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open');
  
  // Sync cost mode checkbox
  const costMain = document.getElementById('costMode');
  const costDrawer = document.getElementById('costModeDrawer');
  if (costDrawer) costDrawer.checked = costMain ? costMain.checked : false;
  
  // Prevent body scroll when drawer is open
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

// Sync drawer checkbox changes back to main
document.addEventListener('DOMContentLoaded', () => {
  const costDrawer = document.getElementById('costModeDrawer');
  const costMain = document.getElementById('costMode');
  if (costDrawer && costMain) {
    costDrawer.addEventListener('change', () => {
      costMain.checked = costDrawer.checked;
      costMain.dispatchEvent(new Event('change'));
    });
    // Sync initial state
    costDrawer.checked = costMain.checked;
  }
});

// ─── THEME ───────────────────────────────────────────────────────────────────
function applyTheme(light) {
  document.body.classList.toggle('light', light);
  document.getElementById('themeBtn').textContent = light ? '🌙 Dark' : '☀️ Light';
  localStorage.setItem('vramora-theme', light ? 'light' : 'dark');
  if (chart) {
    const lc     = light ? '#e8e4de' : '#1e1e2e';
    const tc     = light ? '#b0a090' : '#aaa';
    const titleC = light ? '#9e8e7e' : '#888';
    const bc     = light ? '#e8e4de' : '#2a2a3a';
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
function applyStoredCostMode() {
  // URL hash takes priority over localStorage
  const hashHasGpuOnly = location.hash.includes('gpuonly=1');
  if (!hashHasGpuOnly && localStorage.getItem('vramora-costmode') === '1') {
    gpuOnlyMode = true;
    document.getElementById('costMode').checked = true;
  }
}

Chart.register(ChartDataLabels);
if (typeof ChartZoom !== 'undefined') Chart.register(ChartZoom);
populateModelSelect();
populateHardwareSelect();
applyStoredCostMode();
decodeState();
initChart();
// If hardware mode was set via URL, rebuild chart after init
if (compareMode === 'hardware') {
  rebuildChart();
}
updateStats();
applyStoredTheme();
