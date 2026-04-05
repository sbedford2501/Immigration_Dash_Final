// ── Global defaults ───────────────────────────────────────────────────────────
Chart.defaults.color = '#8892a4';
Chart.defaults.borderColor = '#2e3350';
Chart.defaults.font.family = "'Segoe UI', system-ui, sans-serif";
Chart.defaults.font.size = 11;

const COLORS = {
  blue:'#4f8ef7', green:'#34d399', amber:'#f59e0b', red:'#f87171',
  purple:'#a78bfa', orange:'#fb923c', teal:'#2dd4bf', pink:'#f472b6',
  lime:'#a3e635', sky:'#38bdf8'
};
const REGION_COLORS = {
  Africa:COLORS.amber, Asia:COLORS.blue, Europe:COLORS.purple,
  NorthAmerica:COLORS.green, SouthAmerica:COLORS.orange, Oceania:COLORS.teal
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt     = n => n >= 1e6 ? (n/1e6).toFixed(2)+'M' : n >= 1e3 ? (n/1e3).toFixed(0)+'K' : n.toLocaleString();
const fmtFull = n => n.toLocaleString();
function hexAlpha(hex, a) {
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}
function lineDataset(label, data, color, fill=false, extra={}) {
  return { label, data, borderColor:color, backgroundColor:fill?hexAlpha(color,.15):'transparent',
    borderWidth:2, pointRadius:3, pointHoverRadius:5, tension:0.3, fill, ...extra };
}
function barDataset(label, data, color) {
  return { label, data, backgroundColor:hexAlpha(color,.8), borderColor:color, borderWidth:1, borderRadius:3 };
}

const TT = {
  plugins: {
    tooltip: {
      backgroundColor:'#1a1d27', borderColor:'#2e3350', borderWidth:1,
      titleColor:'#e2e8f0', bodyColor:'#8892a4', padding:10,
      callbacks:{ label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y != null ? ctx.parsed.y.toLocaleString() : ''}` }
    },
    legend:{ labels:{ boxWidth:12, padding:16 } }
  }
};
const NO_LEGEND = { plugins:{ ...TT.plugins, legend:{ display:false } } };

const baseScales = {
  x:{ grid:{ color:'#2e3350' }, ticks:{ maxRotation:45 } },
  y:{ grid:{ color:'#2e3350' }, ticks:{ callback: v => fmt(v) } }
};

// ── Tab navigation ────────────────────────────────────────────────────────────
document.querySelectorAll('#nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#nav button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ── KPI Cards ─────────────────────────────────────────────────────────────────
const k = immigrationData.kpi2022;
document.getElementById('kpi-lpr').textContent = k.lpr.toLocaleString();
document.getElementById('kpi-nat').textContent = k.naturalizations.toLocaleString();
document.getElementById('kpi-ref').textContent = k.refugees.toLocaleString();
document.getElementById('kpi-asy').textContent = k.asylumGranted.toLocaleString();

// ── Annotation plugin helper (inline, no external dep) ───────────────────────
// We draw high/low labels using Chart.js afterDraw plugin per chart instance.
function highLowPlugin(data, color) {
  const vals = data.map(d => d.total ?? d);
  const maxVal = Math.max(...vals), minVal = Math.min(...vals);
  const maxIdx = vals.indexOf(maxVal), minIdx = vals.indexOf(minVal);
  return {
    id: 'highLow',
    afterDatasetsDraw(chart) {
      const { ctx, scales:{ x, y } } = chart;
      [[maxIdx, maxVal, '▲ High'], [minIdx, minVal, '▼ Low']].forEach(([idx, val, lbl]) => {
        const xPos = x.getPixelForIndex(idx);
        const yPos = y.getPixelForValue(val);
        ctx.save();
        ctx.fillStyle = color;
        ctx.font = 'bold 10px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        const isHigh = lbl.includes('High');
        ctx.fillText(`${lbl}: ${fmt(val)}`, xPos, yPos + (isHigh ? -8 : 14));
        ctx.restore();
      });
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// OVERVIEW CHARTS
// ═══════════════════════════════════════════════════════════════════════════════

// LPR overview — no legend, high/low labels
const lprData = immigrationData.lprTotal;
new Chart(document.getElementById('overviewLPR'), {
  type: 'line',
  data: {
    labels: lprData.map(d => d.year),
    datasets: [lineDataset('Green Cards', lprData.map(d => d.total), COLORS.blue, true)]
  },
  options: { responsive:true, maintainAspectRatio:false, scales:baseScales, ...NO_LEGEND },
  plugins: [highLowPlugin(lprData, COLORS.blue)]
});

// Naturalizations overview — no legend, high/low labels, full range 2000–2022
const natAll = immigrationData.naturalizations.filter(d => d.year >= 2000);
new Chart(document.getElementById('overviewNat'), {
  type: 'bar',
  data: {
    labels: natAll.map(d => d.year),
    datasets: [barDataset('Naturalizations', natAll.map(d => d.total), COLORS.green)]
  },
  options: { responsive:true, maintainAspectRatio:false, scales:baseScales, ...NO_LEGEND },
  plugins: [highLowPlugin(natAll, COLORS.green)]
});

// Refugee overview
new Chart(document.getElementById('overviewRef'), {
  type: 'line',
  data: {
    labels: immigrationData.refugeeArrivals.map(d => d.year),
    datasets: [lineDataset('Refugee Arrivals', immigrationData.refugeeArrivals.map(d => d.total), COLORS.amber, true)]
  },
  options: { responsive:true, maintainAspectRatio:false, scales:baseScales, ...TT }
});

// Asylum overview
new Chart(document.getElementById('overviewAsy'), {
  type: 'line',
  data: {
    labels: immigrationData.asylumGranted.map(d => d.year),
    datasets: [
      lineDataset('Total Granted', immigrationData.asylumGranted.map(d => d.total), COLORS.red, true),
      lineDataset('Affirmative',   immigrationData.asylumGranted.map(d => d.affirmative), COLORS.purple),
      lineDataset('Defensive',     immigrationData.asylumGranted.map(d => d.defensive), COLORS.orange)
    ]
  },
  options: { responsive:true, maintainAspectRatio:false, scales:baseScales, ...TT }
});

// ═══════════════════════════════════════════════════════════════════════════════
// REFUGEE CHARTS
// ═══════════════════════════════════════════════════════════════════════════════

const refData  = immigrationData.refugeeArrivals;
const refYears = refData.map(d => d.year);
const refVals  = refData.map(d => d.total);
const refAvg   = Math.round(refVals.reduce((a,b) => a+b, 0) / refVals.length);

// Administration shading plugin
let showDem = false, showRep = false;

function adminShadingPlugin() {
  return {
    id: 'adminShading',
    beforeDraw(chart) {
      if (!showDem && !showRep) return;
      const { ctx, scales:{ x, y } } = chart;
      const top = y.top, bottom = y.bottom;
      immigrationData.administrations.forEach(adm => {
        if (adm.party === 'D' && !showDem) return;
        if (adm.party === 'R' && !showRep) return;
        const startIdx = refYears.indexOf(adm.start);
        const endIdx   = refYears.indexOf(Math.min(adm.end, refYears[refYears.length-1]));
        if (startIdx < 0) return;
        const x1 = x.getPixelForIndex(Math.max(startIdx, 0));
        const x2 = x.getPixelForIndex(Math.min(endIdx >= 0 ? endIdx : refYears.length-1, refYears.length-1));
        ctx.save();
        ctx.fillStyle = adm.party === 'D' ? 'rgba(79,142,247,0.12)' : 'rgba(248,113,113,0.12)';
        ctx.fillRect(x1, top, x2 - x1, bottom - top);
        ctx.fillStyle = adm.party === 'D' ? 'rgba(79,142,247,0.7)' : 'rgba(248,113,113,0.7)';
        ctx.font = '9px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(adm.name, (x1+x2)/2, top + 10);
        ctx.restore();
      });
    }
  };
}

const refChart = new Chart(document.getElementById('refTimeline'), {
  type: 'bar',
  data: {
    labels: refYears,
    datasets: [
      barDataset('Refugee Arrivals', refVals, COLORS.amber),
      {
        label: `Average (${fmt(refAvg)})`,
        data: refYears.map(() => refAvg),
        type: 'line',
        borderColor: COLORS.teal,
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: 0,
        fill: false,
        tension: 0
      }
    ]
  },
  options: {
    responsive:true, maintainAspectRatio:false,
    scales: baseScales,
    plugins: {
      ...TT.plugins,
      legend: { display: false }
    }
  },
  plugins: [adminShadingPlugin()]
});

// Toggle buttons
document.getElementById('toggleDem').addEventListener('click', function() {
  showDem = !showDem;
  this.classList.toggle('active-dem', showDem);
  refChart.update();
});
document.getElementById('toggleRep').addEventListener('click', function() {
  showRep = !showRep;
  this.classList.toggle('active-rep', showRep);
  refChart.update();
});

// By region stacked
const rr = immigrationData.refugeeByRegion;
new Chart(document.getElementById('refRegion'), {
  type: 'bar',
  data: {
    labels: rr.years,
    datasets: [
      barDataset('Africa',        rr.Africa,       REGION_COLORS.Africa),
      barDataset('Asia',          rr.Asia,         REGION_COLORS.Asia),
      barDataset('Europe',        rr.Europe,       REGION_COLORS.Europe),
      barDataset('North America', rr.NorthAmerica, REGION_COLORS.NorthAmerica),
      barDataset('South America', rr.SouthAmerica, REGION_COLORS.SouthAmerica)
    ]
  },
  options: {
    responsive:true, maintainAspectRatio:false,
    scales:{ ...baseScales, x:{...baseScales.x,stacked:true}, y:{...baseScales.y,stacked:true} },
    ...TT
  }
});

// Top nationalities
const rn = immigrationData.refugeeTopNationalities2022;
new Chart(document.getElementById('refNat'), {
  type: 'bar',
  data: {
    labels: rn.map(d => d.country),
    datasets: [barDataset('Arrivals', rn.map(d => d.arrivals), COLORS.amber)]
  },
  options: {
    indexAxis:'y', responsive:true, maintainAspectRatio:false,
    scales:{ x:{grid:{color:'#2e3350'},ticks:{callback:v=>fmt(v)}}, y:{grid:{color:'#2e3350'}} },
    ...NO_LEGEND
  }
});

// Refugee table
(function() {
  const t = document.getElementById('refTable');
  const max = Math.max(...rn.map(d => d.arrivals));
  t.innerHTML = `<thead><tr><th>#</th><th>Country</th><th class="num">Arrivals</th><th>Share</th></tr></thead>`;
  const tb = document.createElement('tbody');
  rn.forEach((d,i) => {
    const pct = ((d.arrivals/25519)*100).toFixed(1);
    const w = Math.round((d.arrivals/max)*120);
    tb.innerHTML += `<tr><td>${i+1}</td><td>${d.country}</td><td class="num">${fmtFull(d.arrivals)}</td>
      <td><div class="bar-cell"><div class="mini-bar" style="width:${w}px;background:${COLORS.amber}"></div><span>${pct}%</span></div></td></tr>`;
  });
  t.appendChild(tb);
})();

// ═══════════════════════════════════════════════════════════════════════════════
// ASYLUM CHARTS  — with country filter
// ═══════════════════════════════════════════════════════════════════════════════

const asyData = immigrationData.asylumGranted;
const asyNatData = immigrationData.asylumTopNationalities2022;

// Populate country filter dropdown
const asyFilter = document.getElementById('asyCountryFilter');
const asyCountries = [...new Set(asyNatData.map(d => d.country))].sort();
asyCountries.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c; opt.textContent = c;
  asyFilter.appendChild(opt);
});

// Timeline chart (uses full historical data — filter shows note only)
const asyTimelineChart = new Chart(document.getElementById('asyTimeline'), {
  type: 'line',
  data: {
    labels: asyData.map(d => d.year),
    datasets: [
      { label:'Affirmative', data:asyData.map(d=>d.affirmative), borderColor:COLORS.purple,
        backgroundColor:hexAlpha(COLORS.purple,.3), borderWidth:2, pointRadius:3, tension:0.3, fill:true },
      { label:'Defensive',   data:asyData.map(d=>d.defensive),   borderColor:COLORS.orange,
        backgroundColor:hexAlpha(COLORS.orange,.3), borderWidth:2, pointRadius:3, tension:0.3, fill:true }
    ]
  },
  options:{ responsive:true, maintainAspectRatio:false, scales:baseScales, ...TT }
});

// Nationality bar chart (filterable)
let asyNatChart = new Chart(document.getElementById('asyNat'), {
  type: 'bar',
  data: {
    labels: asyNatData.map(d => d.country),
    datasets: [barDataset('Affirmative Grants', asyNatData.map(d => d.granted), COLORS.purple)]
  },
  options: {
    indexAxis:'y', responsive:true, maintainAspectRatio:false,
    scales:{ x:{grid:{color:'#2e3350'},ticks:{callback:v=>fmt(v)}}, y:{grid:{color:'#2e3350'}} },
    ...NO_LEGEND
  }
});

// Pie chart
const asyPieChart = new Chart(document.getElementById('asyPie'), {
  type: 'doughnut',
  data: {
    labels: ['Affirmative (USCIS)', 'Defensive (Courts)'],
    datasets: [{
      data: [14134, 22481],
      backgroundColor: [hexAlpha(COLORS.purple,.8), hexAlpha(COLORS.orange,.8)],
      borderColor: [COLORS.purple, COLORS.orange], borderWidth:2
    }]
  },
  options: {
    responsive:true, maintainAspectRatio:false,
    plugins:{
      tooltip:{ backgroundColor:'#1a1d27', borderColor:'#2e3350', borderWidth:1,
        titleColor:'#e2e8f0', bodyColor:'#8892a4', padding:10,
        callbacks:{ label: ctx => ` ${ctx.label}: ${ctx.parsed.toLocaleString()}` } },
      legend:{ position:'bottom', labels:{ boxWidth:12, padding:16 } }
    }
  }
});

// Filter handler — filters the nationality bar chart and shows a note
asyFilter.addEventListener('change', function() {
  const val = this.value;
  const note = document.getElementById('asyFilterNote');
  let filtered;
  if (val === 'all') {
    filtered = asyNatData;
    note.textContent = '';
  } else {
    filtered = asyNatData.filter(d => d.country === val);
    note.textContent = filtered.length ? `Showing ${val} — ${filtered[0].granted.toLocaleString()} affirmative grants in FY 2022` : 'No data for selected country in top-10.';
  }
  asyNatChart.data.labels = filtered.map(d => d.country);
  asyNatChart.data.datasets[0].data = filtered.map(d => d.granted);
  asyNatChart.update();
});

// Asylum table
(function() {
  const t = document.getElementById('asyTable');
  const rows = asyData.slice().reverse();
  t.innerHTML = `<thead><tr><th>Year</th><th class="num">Total</th><th class="num">Affirmative</th><th class="num">Defensive</th><th>Aff. Share</th></tr></thead>`;
  const tb = document.createElement('tbody');
  rows.forEach(d => {
    const pct = ((d.affirmative/d.total)*100).toFixed(1);
    const w = Math.round((d.affirmative/d.total)*80);
    tb.innerHTML += `<tr><td>${d.year}</td><td class="num">${fmtFull(d.total)}</td>
      <td class="num">${fmtFull(d.affirmative)}</td><td class="num">${fmtFull(d.defensive)}</td>
      <td><div class="bar-cell"><div class="mini-bar" style="width:${w}px;background:${COLORS.purple}"></div><span>${pct}%</span></div></td></tr>`;
  });
  t.appendChild(tb);
})();

// ═══════════════════════════════════════════════════════════════════════════════
// LPR CHARTS
// ═══════════════════════════════════════════════════════════════════════════════

// Timeline — no legend
const lprTimelineData = immigrationData.lprTotal;
new Chart(document.getElementById('lprTimeline'), {
  type: 'line',
  data: {
    labels: lprTimelineData.map(d => d.year),
    datasets: [lineDataset('Green Cards', lprTimelineData.map(d => d.total), COLORS.blue, true)]
  },
  options: { responsive:true, maintainAspectRatio:false, scales:baseScales, ...NO_LEGEND }
});

// Class of admission stacked
const lc = immigrationData.lprByClass;
new Chart(document.getElementById('lprClass'), {
  type: 'bar',
  data: {
    labels: lc.years,
    datasets: [
      barDataset('Immediate Relatives', lc.immediateRelatives, COLORS.blue),
      barDataset('Family Sponsored',    lc.familySponsored,    COLORS.green),
      barDataset('Employment Based',    lc.employmentBased,    COLORS.amber),
      barDataset('Diversity',           lc.diversity,          COLORS.purple),
      barDataset('Refugees/Asylees',    lc.refugeesAsylees,    COLORS.red)
    ]
  },
  options: {
    responsive:true, maintainAspectRatio:false,
    scales:{ ...baseScales, x:{...baseScales.x,stacked:true}, y:{...baseScales.y,stacked:true} },
    ...TT
  }
});

// By region
const lr = immigrationData.lprByRegion;
new Chart(document.getElementById('lprRegion'), {
  type: 'line',
  data: {
    labels: lr.years,
    datasets: [
      lineDataset('Africa',        lr.Africa,       REGION_COLORS.Africa),
      lineDataset('Asia',          lr.Asia,         REGION_COLORS.Asia),
      lineDataset('Europe',        lr.Europe,       REGION_COLORS.Europe),
      lineDataset('North America', lr.NorthAmerica, REGION_COLORS.NorthAmerica),
      lineDataset('South America', lr.SouthAmerica, REGION_COLORS.SouthAmerica)
    ]
  },
  options:{ responsive:true, maintainAspectRatio:false, scales:baseScales, ...TT }
});

// Top countries
const lc2 = immigrationData.lprTopCountries2022;
new Chart(document.getElementById('lprCountry'), {
  type: 'bar',
  data: {
    labels: lc2.map(d => d.country),
    datasets: [barDataset('LPR Admissions', lc2.map(d => d.total), COLORS.blue)]
  },
  options: {
    indexAxis:'y', responsive:true, maintainAspectRatio:false,
    scales:{ x:{grid:{color:'#2e3350'},ticks:{callback:v=>fmt(v)}}, y:{grid:{color:'#2e3350'}} },
    ...NO_LEGEND
  }
});

// State table
(function() {
  const t = document.getElementById('lprStateTable');
  const data = immigrationData.lprByState2022.sort((a,b) => b.total - a.total);
  const max = data[0].total;
  t.innerHTML = `<thead><tr><th>#</th><th>State</th><th class="num">LPR Admissions</th><th>Share of Total</th></tr></thead>`;
  const tb = document.createElement('tbody');
  data.forEach((d,i) => {
    const pct = ((d.total/1018349)*100).toFixed(1);
    const w = Math.round((d.total/max)*140);
    tb.innerHTML += `<tr><td>${i+1}</td><td>${d.state}</td><td class="num">${fmtFull(d.total)}</td>
      <td><div class="bar-cell"><div class="mini-bar" style="width:${w}px;background:${COLORS.blue}"></div><span>${pct}%</span></div></td></tr>`;
  });
  t.appendChild(tb);
})();

// ═══════════════════════════════════════════════════════════════════════════════
// NATURALIZATION CHARTS
// ═══════════════════════════════════════════════════════════════════════════════

// Build refugee-eligible-for-citizenship overlay:
// Refugees become eligible after 5 years as LPR (1 yr to LPR + 5 yr wait = ~6 yrs after arrival).
// We use a simplified model: refugees who arrived in year Y are eligible to naturalize in year Y+6.
// We map this onto the naturalization chart years.
const natYears = immigrationData.naturalizations.map(d => d.year);
const refByYear = {};
immigrationData.refugeeArrivals.forEach(d => { refByYear[d.year] = d.total; });

// For each naturalization year, look up refugee arrivals 6 years prior
const refEligible = natYears.map(yr => {
  const arrivalYr = yr - 6;
  return refByYear[arrivalYr] || null;
});

// Naturalizations timeline — no legend, with refugee eligible dotted overlay
new Chart(document.getElementById('natTimeline'), {
  type: 'line',
  data: {
    labels: natYears,
    datasets: [
      {
        label: 'Persons who Received Citizenship',
        data: immigrationData.naturalizations.map(d => d.total),
        borderColor: COLORS.green,
        backgroundColor: hexAlpha(COLORS.green, 0.15),
        borderWidth: 2, pointRadius: 3, tension: 0.3, fill: true
      },
      {
        label: 'Refugees eligible for citizenship that year (arrived ~6 yrs prior)',
        data: refEligible,
        borderColor: COLORS.amber,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: 4,
        pointStyle: 'circle',
        pointBackgroundColor: COLORS.amber,
        tension: 0.3,
        fill: false
      }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    scales: baseScales,
    plugins: {
      tooltip: {
        backgroundColor:'#1a1d27', borderColor:'#2e3350', borderWidth:1,
        titleColor:'#e2e8f0', bodyColor:'#8892a4', padding:10,
        callbacks:{ label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y != null ? ctx.parsed.y.toLocaleString() : 'N/A'}` }
      },
      legend: {
        display: true,
        labels: {
          boxWidth: 14, padding: 14,
          generateLabels(chart) {
            return chart.data.datasets.map((ds, i) => ({
              text: ds.label,
              fillStyle: ds.borderColor,
              strokeStyle: ds.borderColor,
              lineWidth: 2,
              lineDash: ds.borderDash || [],
              hidden: false,
              datasetIndex: i
            }));
          }
        }
      }
    }
  }
});

// By region stacked
const nr = immigrationData.naturalizationsByRegion;
new Chart(document.getElementById('natRegion'), {
  type: 'bar',
  data: {
    labels: nr.years,
    datasets: [
      barDataset('Africa',        nr.Africa,       REGION_COLORS.Africa),
      barDataset('Asia',          nr.Asia,         REGION_COLORS.Asia),
      barDataset('Europe',        nr.Europe,       REGION_COLORS.Europe),
      barDataset('North America', nr.NorthAmerica, REGION_COLORS.NorthAmerica),
      barDataset('South America', nr.SouthAmerica, REGION_COLORS.SouthAmerica)
    ]
  },
  options: {
    responsive:true, maintainAspectRatio:false,
    scales:{ ...baseScales, x:{...baseScales.x,stacked:true}, y:{...baseScales.y,stacked:true} },
    ...TT
  }
});

// Top countries
const nc = immigrationData.naturalizationTopCountries2022;
new Chart(document.getElementById('natCountry'), {
  type: 'bar',
  data: {
    labels: nc.map(d => d.country),
    datasets: [barDataset('Naturalizations', nc.map(d => d.total), COLORS.green)]
  },
  options: {
    indexAxis:'y', responsive:true, maintainAspectRatio:false,
    scales:{ x:{grid:{color:'#2e3350'},ticks:{callback:v=>fmt(v)}}, y:{grid:{color:'#2e3350'}} },
    ...NO_LEGEND
  }
});

// Naturalization table
(function() {
  const t = document.getElementById('natTable');
  const data = nc.slice().sort((a,b) => b.total - a.total);
  const max = data[0].total;
  t.innerHTML = `<thead><tr><th>#</th><th>Country</th><th class="num">Naturalizations</th><th>Share</th></tr></thead>`;
  const tb = document.createElement('tbody');
  data.forEach((d,i) => {
    const pct = ((d.total/969380)*100).toFixed(1);
    const w = Math.round((d.total/max)*130);
    tb.innerHTML += `<tr><td>${i+1}</td><td>${d.country}</td><td class="num">${fmtFull(d.total)}</td>
      <td><div class="bar-cell"><div class="mini-bar" style="width:${w}px;background:${COLORS.green}"></div><span>${pct}%</span></div></td></tr>`;
  });
  t.appendChild(tb);
})();

// ═══════════════════════════════════════════════════════════════════════════════
// PDF EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
document.getElementById('exportPDF').addEventListener('click', async () => {
  const btn = document.getElementById('exportPDF');
  const labelEl = document.getElementById('exportLabel');
  const iconEl  = document.getElementById('exportIcon');
  btn.classList.add('loading');
  labelEl.textContent = 'Building PDF…';
  iconEl.classList.add('spin');

  try {
    const { jsPDF } = window.jspdf;
    const PAGE_W = 297, PAGE_H = 210, MARGIN = 10, CONTENT_W = PAGE_W - MARGIN * 2;
    const activeTab = document.querySelector('.tab-panel.active');
    const activeBtn = document.querySelector('#nav button.active');
    const tabLabel  = activeBtn ? activeBtn.textContent.trim() : 'Dashboard';
    const pdf = new jsPDF({ orientation:'landscape', unit:'mm', format:'a4' });

    function drawHeader(pdf, title, pageNum) {
      pdf.setFillColor(26,29,39);
      pdf.rect(0,0,PAGE_W,14,'F');
      pdf.setTextColor(226,232,240); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
      pdf.text('Humanitarian Arrivals to the U.S. and Adjustment of Status Over Time', MARGIN, 9);
      pdf.setFont('helvetica','normal'); pdf.setTextColor(136,146,164);
      pdf.text(title, PAGE_W/2, 9, { align:'center' });
      pdf.text(`Page ${pageNum}  |  Source: DHS / OHS Statistics`, PAGE_W-MARGIN, 9, { align:'right' });
    }

    async function capture(el) {
      const canvas = await html2canvas(el, { scale:2, useCORS:true, backgroundColor:'#1a1d27', logging:false, windowWidth:1400 });
      return { dataUrl:canvas.toDataURL('image/png'), w:canvas.width, h:canvas.height };
    }

    const blocks = Array.from(activeTab.querySelectorAll('.kpi-grid,.insight,.explainer-grid,.spotlight,.refugee-share-bar,.chart-card,.filter-row'));
    let pageNum = 1, cursorY = 16;
    drawHeader(pdf, tabLabel, pageNum);

    for (const block of blocks) {
      if (!block.offsetParent && block.offsetHeight === 0) continue;
      const img = await capture(block);
      const imgH = CONTENT_W * (img.h / img.w);
      if (cursorY + imgH > PAGE_H - MARGIN) {
        pdf.addPage(); pageNum++; cursorY = 16;
        drawHeader(pdf, tabLabel, pageNum);
      }
      pdf.addImage(img.dataUrl, 'PNG', MARGIN, cursorY, CONTENT_W, imgH);
      cursorY += imgH + 4;
    }

    pdf.save(`Humanitarian_Dashboard_${tabLabel.replace(/\s+/g,'_').slice(0,40)}_FY2022.pdf`);
  } catch(err) {
    console.error('PDF export failed:', err);
    alert('PDF export failed. Please try again.');
  } finally {
    btn.classList.remove('loading');
    labelEl.textContent = 'Export PDF';
    iconEl.classList.remove('spin');
  }
});
