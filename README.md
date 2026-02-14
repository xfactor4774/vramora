# ⚡ VRAMora

**Interactive bubble chart for comparing local LLM inference hardware.**

🔗 **[vramora.com](https://vramora.com)** (launching soon)

---

## What is this?

VRAMora helps you answer the two most common local AI hardware questions:

- **"What's the best setup for my budget?"** — compare cost, speed, memory, and power draw across 21+ hardware configs
- **"Can I run \[model\]?"** — select a model, see which setups have enough VRAM to run it

## Features

- 📊 **Bubble chart** — X = cost, Y = max model size, bubble size = tokens/sec, color = power draw (green → red)
- 📋 **Sortable table** — every spec in one view, click any column to sort
- 🔍 **"What can I run?"** — pick a model, incompatible hardware dims out instantly
- 🔗 **Shareable links** — every filter state is encoded in the URL, copy and share
- ⚡ **Power efficiency** — see t/s per watt, not just raw speed
- 🌿 **Green vs red** — Apple Silicon sits quietly at 50W while 3× RTX 3090 pulls 1170W

## Hardware covered

| Category | Setups |
|---|---|
| NVIDIA single GPU | RTX 3060, 3080 Ti, 4080, 4000 Ada, 3090, 4090, 5090, A6000 |
| NVIDIA multi-GPU | 2× 3090, 2× 4090, 3× 3090 |
| Apple Silicon | M3 Max, M4 Max (64/128GB), M2 Ultra, M3 Ultra, M4 Ultra Mac Studios |
| Packaged systems | NVIDIA DGX Spark, Dell Pro Max GB10 |
| Mac Mini clusters | 4× and 8× M4 Pro via Thunderbolt (exo) |

## Data sources

Benchmarks from [llama.cpp](https://github.com/ggml-org/llama.cpp), [hardware-corner.net](https://www.hardware-corner.net/guides/gpu-benchmark-large-language-models/), [LMSYS DGX Spark review](https://lmsys.org/blog/2025-10-13-nvidia-dgx-spark/), [Phoronix Dell Pro Max GB10](https://www.phoronix.com/review/dell-pro-max-gb10-llama-cpp), and community benchmarks. Prices are full-system estimates as of Feb 2026.

## Contributing

See a wrong number? Got a setup missing? Open an issue or PR — hardware data lives in `app.js` under the `DATA` array. Each entry looks like:

```js
{ id:'rtx3090', name:'RTX 3090', cat:'nvidia',
  cost:1700, vram:24, bw:936, tps7:121, tps70:null,
  maxB:30, tdp:490,
  notes:'The sweet spot. Used ~$900 GPU, 24GB VRAM. Runs 30B Q4.' }
```

## Stack

Pure HTML + JS. No build step, no framework, no backend. Chart.js for the bubble chart.

## License

MIT
