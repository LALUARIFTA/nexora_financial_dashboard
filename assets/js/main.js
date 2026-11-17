    const STORAGE_KEY = 'nexora_treasury_state_v1';

    // Crisp Circular SVG Flags
    const FLAG_SVGS = {
      USD: `<svg viewBox="0 0 24 24" class="w-full h-full"><circle cx="12" cy="12" r="12" fill="#FFFFFF"/><path d="M0 4h24v2.5H0zm0 5h24v2.5H0zm0 5h24v2.5H0zm0 5h24v2.5H0z" fill="#DC2626"/><rect width="12" height="12" fill="#1D4ED8"/><circle cx="4" cy="4" r="1" fill="#FFF"/><circle cx="8" cy="4" r="1" fill="#FFF"/><circle cx="6" cy="6.5" r="1" fill="#FFF"/><circle cx="4" cy="9" r="1" fill="#FFF"/><circle cx="8" cy="9" r="1" fill="#FFF"/></svg>`,
      EUR: `<svg viewBox="0 0 24 24" class="w-full h-full"><rect width="24" height="8" y="0" fill="#18181B"/><rect width="24" height="8" y="8" fill="#DC2626"/><rect width="24" height="8" y="16" fill="#F59E0B"/></svg>`,
      GBP: `<svg viewBox="0 0 24 24" class="w-full h-full"><rect width="24" height="24" fill="#1E3A8A"/><path d="M0 0l24 24M24 0L0 24" stroke="#FFF" stroke-width="4"/><path d="M0 0l24 24M24 0L0 24" stroke="#DC2626" stroke-width="2"/><path d="M12 0v24M0 12h24" stroke="#FFF" stroke-width="6"/><path d="M12 0v24M0 12h24" stroke="#DC2626" stroke-width="3.5"/></svg>`,
      JPY: `<svg viewBox="0 0 24 24" class="w-full h-full"><rect width="24" height="24" fill="#F8FAFC"/><circle cx="12" cy="12" r="5.5" fill="#DC2626"/></svg>`,
      CAD: `<svg viewBox="0 0 24 24" class="w-full h-full"><rect width="6" height="24" x="0" fill="#DC2626"/><rect width="12" height="24" x="6" fill="#FFF"/><rect width="6" height="24" x="18" fill="#DC2626"/><circle cx="12" cy="12" r="3" fill="#DC2626"/></svg>`,
      SGD: `<svg viewBox="0 0 24 24" class="w-full h-full"><rect width="24" height="12" y="0" fill="#DC2626"/><rect width="24" height="12" y="12" fill="#FFF"/><circle cx="7.5" cy="6" r="3" fill="#FFF"/><circle cx="8.8" cy="6" r="2.4" fill="#DC2626"/></svg>`
    };

    const CURRENCY_RATES = {
      USD: { symbol: '$', rate: 1 },
      EUR: { symbol: '€', rate: 0.92 },
      GBP: { symbol: '£', rate: 0.79 }
    };

    // 8-Month Profit & Loss Chart Data (matching screenshot proportions)
    const CHART_DATA = [
      { month: 'Jan', loss: 22500, profit: 14000 },
      { month: 'Feb', loss: 17500, profit: 24500 },
      { month: 'Mar', loss: 14500, profit: 21000 },
      { month: 'Apr', loss: 21000, profit: 18000 },
      { month: 'May', loss: 17500, profit: 25500 },
      { month: 'Jun', loss: 28000, profit: 20500 },
      { month: 'Jul', loss: 21500, profit: 19500 },
      { month: 'Aug', loss: 15000, profit: 18500 }
    ];

    // Default Initial State (1:1 faithful to screenshot values)
    function getDefaultState() {
      return {
        theme: 'light',
        displayCurrency: 'USD',
        baseBalance: 689372.00,
        kpi: {
          earnings: 950,
          spending: 700,
          income: 1050,
          revenue: 850
        },
        spendingLimit: {
          used: 1400.00,
          max: 5500.00
        },
        wallets: [
          { code: 'USD', symbol: '$', balance: 22678.00, limitText: 'Limit is $10k a month', active: true },
          { code: 'EUR', symbol: '€', balance: 18345.00, limitText: 'Limit is €8k a month', active: true },
          { code: 'GBP', symbol: '£', balance: 15000.00, limitText: 'Limit is £7.5k a month', active: false },
          { code: 'JPY', symbol: '¥', balance: 2450000, limitText: 'Limit is ¥1.5M a month', active: true },
          { code: 'CAD', symbol: 'C$', balance: 19420.00, limitText: 'Limit is C$12k a month', active: true },
          { code: 'SGD', symbol: 'S$', balance: 31800.00, limitText: 'Limit is S$15k a month', active: true }
        ],
        cards: [
          { id: 'card-1', label: 'Nexora Obsidian', last4: '6782', exp: '09/29', cvv: '611', active: true, theme: 'obsidian' },
          { id: 'card-2', label: 'Nexora Indigo', last4: '4356', exp: '11/28', cvv: '849', active: true, theme: 'indigo' }
        ],
        activities: [
          { id: 'INV_000076', title: 'Mobile App Purchase', price: 25500, status: 'Completed', date: '17 Apr, 2026 03:45 PM', icon: 'app', flow: 'expense', selected: false },
          { id: 'INV_000075', title: 'Hotel Booking', price: 32750, status: 'Pending', date: '15 Apr, 2026 11:30 AM', icon: 'hotel', flow: 'expense', selected: false },
          { id: 'INV_000074', title: 'Flight Ticket Booking', price: 40200, status: 'Completed', date: '15 Apr, 2026 12:00 PM', icon: 'flight', flow: 'expense', selected: false },
          { id: 'INV_000073', title: 'Grocery Purchase', price: 50200, status: 'In Progress', date: '14 Apr, 2026 09:15 PM', icon: 'grocery', flow: 'expense', selected: true },
          { id: 'INV_000072', title: 'Software License', price: 15900, status: 'Completed', date: '10 Apr, 2026 06:00 AM', icon: 'software', flow: 'expense', selected: false },
          { id: 'INV_000071', title: 'Enterprise Cloud Retainer', price: 48000, status: 'Completed', date: '08 Apr, 2026 04:20 PM', icon: 'software', flow: 'income', selected: false },
          { id: 'INV_000070', title: 'Executive Summit Flight', price: 12400, status: 'Completed', date: '06 Apr, 2026 01:10 PM', icon: 'flight', flow: 'expense', selected: false },
          { id: 'INV_000069', title: 'Q1 Partner Settlement', price: 64500, status: 'Completed', date: '04 Apr, 2026 09:00 AM', icon: 'app', flow: 'income', selected: false },
          { id: 'INV_000068', title: 'Zurich Boutique Hotel', price: 18900, status: 'Pending', date: '02 Apr, 2026 07:45 PM', icon: 'hotel', flow: 'expense', selected: false },
          { id: 'INV_000067', title: 'Design Systems Suite', price: 9800, status: 'In Progress', date: '01 Apr, 2026 10:30 AM', icon: 'software', flow: 'expense', selected: false }
        ]
      };
    }

    let appState = loadState();
    let tableFilter = {
      search: '',
      status: 'ALL',
      sortField: null,
      sortAsc: true,
      page: 1,
      pageSize: 5
    };
    let pendingDeleteIds = [];

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {
        console.warn('Could not load localStorage state', e);
      }
      return getDefaultState();
    }

    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      } catch (e) {
        console.warn('Could not save state', e);
      }
    }

    /* ==========================================================================
       THEME & NAVIGATION CONTROLLERS
       ========================================================================== */
    function setTheme(mode) {
      appState.theme = mode;
      const htmlEl = document.documentElement;
      const lightBtn = document.getElementById('lightModeBtn');
      const darkBtn = document.getElementById('darkModeBtn');

      if (mode === 'dark') {
        htmlEl.classList.add('dark');
        darkBtn.className = 'w-9 h-9 rounded-full flex items-center justify-center bg-[#1E2536] text-amber-400 shadow-xs transition-all';
        lightBtn.className = 'w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all';
      } else {
        htmlEl.classList.remove('dark');
        lightBtn.className = 'w-9 h-9 rounded-full flex items-center justify-center bg-[#F4F5F8] text-slate-900 shadow-2xs transition-all';
        darkBtn.className = 'w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all';
      }
      saveState();
    }

    function toggleTheme() {
      setTheme(appState.theme === 'dark' ? 'light' : 'dark');
    }

    function switchTab(tabName) {
      // Update Views
      document.querySelectorAll('.spa-view').forEach(view => view.classList.add('hidden'));
      const targetView = document.getElementById(`view-${tabName}`);
      if (targetView) targetView.classList.remove('hidden');

      // Update Top Pill Buttons
      document.querySelectorAll('.top-nav-pill').forEach(btn => {
        const isActive = btn.dataset.tab === tabName;
        if (isActive) {
          btn.classList.add('bg-[#4F46E5]', 'text-white', 'shadow-sm', 'shadow-indigo-500/25');
          btn.classList.remove('text-slate-500', 'dark:text-slate-400', 'bg-white', 'dark:bg-[#131722]');
        } else {
          btn.classList.remove('bg-[#4F46E5]', 'text-white', 'shadow-sm', 'shadow-indigo-500/25');
          btn.classList.add('text-slate-500', 'dark:text-slate-400');
        }
      });

      // Update Left Sidebar Active Circle
      document.querySelectorAll('.side-nav-btn').forEach(btn => {
        const isActive = btn.dataset.sideTab === tabName;
        if (isActive) {
          btn.className = 'side-nav-btn w-10 h-10 rounded-full flex items-center justify-center bg-[#4F46E5] text-white shadow-md shadow-indigo-500/25 transition-all';
        } else {
          btn.className = 'side-nav-btn w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-[#4F46E5] hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-all';
        }
      });

      closeMobileDrawer();
      renderSecondaryViews();
    }

    /* ==========================================================================
       CURRENCY & COUNT-UP ANIMATION
       ========================================================================== */
    function formatMoney(amount, currencyCode = 'USD', decimals = 2) {
      const cfg = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.USD;
      const converted = amount * cfg.rate;
      return cfg.symbol + converted.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }

    function animateValue(el, targetText) {
      if (!el) return;
      el.style.opacity = '0.65';
      el.style.transform = 'translateY(2px)';
      setTimeout(() => {
        el.textContent = targetText;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 110);
    }

    function setDisplayCurrency(code) {
      appState.displayCurrency = code;
      saveState();
      closeAllPopovers();
      renderBalanceAndKPIs();
      showToast(`Display currency switched to ${code}`, 'info');
    }

    function renderBalanceAndKPIs() {
      const code = appState.displayCurrency;
      document.getElementById('selectedCurrencyCode').textContent = code;
      document.getElementById('selectedCurrencyFlag').innerHTML = FLAG_SVGS[code];

      // Populate currency dropdown option flags
      ['USD', 'EUR', 'GBP'].forEach(c => {
        const optEl = document.getElementById(`flag-opt-${c}`);
        if (optEl) optEl.innerHTML = FLAG_SVGS[c];
      });

      const balanceEl = document.getElementById('totalBalanceDisplay');
      balanceEl.style.transition = 'all 0.2s ease';
      animateValue(balanceEl, formatMoney(appState.baseBalance, code, 2));

      document.getElementById('kpiEarnings').textContent = formatMoney(appState.kpi.earnings, code, 0);
      document.getElementById('kpiSpending').textContent = formatMoney(appState.kpi.spending, code, 0);
      document.getElementById('kpiIncome').textContent = formatMoney(appState.kpi.income, code, 0);
      document.getElementById('kpiRevenue').textContent = formatMoney(appState.kpi.revenue, code, 0);

      // Spending Limit Progress
      const pct = Math.min(100, Math.max(4, (appState.spendingLimit.used / appState.spendingLimit.max) * 100));
      document.getElementById('spendingProgressBar').style.width = `${pct.toFixed(2)}%`;
      document.getElementById('spendingUsedText').textContent = formatMoney(appState.spendingLimit.used, 'USD', 2);
      document.getElementById('spendingMaxText').textContent = formatMoney(appState.spendingLimit.max, 'USD', 2);
    }

    /* ==========================================================================
       WALLETS & VIRTUAL CARDS RENDERING
       ========================================================================== */
    function renderWallets() {
      const grid = document.getElementById('overviewWalletsGrid');
      const topThree = appState.wallets.slice(0, 3);

      grid.innerHTML = topThree.map((w, idx) => `
        <div class="rounded-[16px] p-2.5 bg-[#F8F9FB] dark:bg-[#1A202E] border border-slate-100/90 dark:border-slate-800/80 hover:border-indigo-200 dark:hover:border-slate-700 transition relative">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full overflow-hidden shrink-0 inline-flex">${FLAG_SVGS[w.code]}</span>
              <span class="text-[11.5px] font-semibold text-slate-700 dark:text-slate-200">${w.code}</span>
            </div>
            <button type="button" onclick="toggleWalletStatus(${idx})" title="Toggle Active/Inactive Status"
              class="text-slate-400 hover:text-slate-700 dark:hover:text-white p-0.5 rounded">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
              </svg>
            </button>
          </div>
          <p class="text-[13px] font-bold text-slate-900 dark:text-white mt-2.5 tracking-tight truncate">
            ${w.symbol}${w.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p class="text-[9.5px] text-slate-400 mt-0.5 truncate">${w.limitText}</p>
          <p class="text-[10.5px] font-semibold mt-1.5 ${w.active ? 'text-emerald-500' : 'text-rose-500'}">
            ${w.active ? 'Active' : 'Inactive'}
          </p>
        </div>
      `).join('');
    }

    function toggleWalletStatus(idx) {
      appState.wallets[idx].active = !appState.wallets[idx].active;
      saveState();
      renderWallets();
      renderSecondaryViews();
      showToast(`${appState.wallets[idx].code} wallet marked as ${appState.wallets[idx].active ? 'Active' : 'Inactive'}`, 'info');
    }

    function renderCards() {
      const container = document.getElementById('overviewCardsGrid');
      const visibleCards = appState.cards.slice(0, 2);

      container.innerHTML = visibleCards.map((card, i) => {
        if (card.theme === 'obsidian') {
          return `
            <div class="rounded-[18px] p-4 bg-gradient-to-br from-[#23252A] via-[#18191D] to-[#111215] obsidian-card-grid text-white h-[156px] flex flex-col justify-between relative overflow-hidden shadow-sm group">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-white/75" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" d="M8.5 14.5a5 5 0 010-5m3 7.5a9 9 0 010-10m3 12.5a13 13 0 010-15" />
                  </svg>
                  <span class="bg-white text-slate-900 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">Active</span>
                </div>
                <div class="flex items-center -space-x-2">
                  <span class="w-5 h-5 rounded-full bg-rose-500/90 inline-block"></span>
                  <span class="w-5 h-5 rounded-full bg-[#F59E0B]/90 inline-block"></span>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-1 text-[10px] pt-4">
                <div class="col-span-6">
                  <p class="text-white/50 text-[9px]">Card Number</p>
                  <p class="font-semibold tracking-wider text-[11px] mt-0.5">**** **** ${card.last4}</p>
                </div>
                <div class="col-span-3">
                  <p class="text-white/50 text-[9px]">EXP</p>
                  <p class="font-semibold text-[11px] mt-0.5">${card.exp}</p>
                </div>
                <div class="col-span-3">
                  <p class="text-white/50 text-[9px]">CVV</p>
                  <p class="font-semibold text-[11px] mt-0.5">${card.cvv}</p>
                </div>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="rounded-[18px] p-4 bg-gradient-to-br from-[#4F46E5] via-[#5950F2] to-[#7C3AED] text-white h-[156px] flex flex-col justify-between relative overflow-hidden shadow-sm">
              <!-- Decorative Sparkles -->
              <svg class="w-4 h-4 text-[#F59E0B] absolute left-6 top-14 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2z"/>
              </svg>
              <svg class="w-2.5 h-2.5 text-white/70 absolute left-12 top-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2z"/>
              </svg>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-white/80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" d="M8.5 14.5a5 5 0 010-5m3 7.5a9 9 0 010-10m3 12.5a13 13 0 010-15" />
                  </svg>
                  <span class="bg-white text-slate-900 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">Active</span>
                </div>
                <span class="text-[10px] font-bold tracking-wider uppercase text-amber-300">NEXORA</span>
              </div>

              <div class="flex items-end justify-between text-[10px]">
                <div>
                  <p class="text-white/65 text-[9px]">Card Number</p>
                  <p class="font-semibold tracking-wider text-[11px] mt-0.5">**** **** ${card.last4}</p>
                </div>
                <div>
                  <p class="text-white/65 text-[9px]">EXP</p>
                  <p class="font-semibold text-[11px] mt-0.5">${card.exp}</p>
                </div>
              </div>
            </div>
          `;
        }
      }).join('');
    }

    /* ==========================================================================
       PROFIT AND LOSS INTERACTIVE STACKED BAR CHART
       ========================================================================== */
    function renderProfitLossChart() {
      const container = document.getElementById('profitLossBars');
      const maxVal = 50000;

      container.innerHTML = CHART_DATA.map((item, idx) => {
        const lossPct = (item.loss / maxVal) * 100;
        const profitPct = (item.profit / maxVal) * 100;
        return `
          <div
            onmouseenter="showChartTooltip('${item.month}', ${item.profit}, ${item.loss})"
            onmouseleave="hideChartTooltip()"
            class="h-full flex flex-col justify-end items-center gap-[3px] group cursor-pointer bar-animate"
            style="animation-delay: ${idx * 0.05}s"
          >
            <!-- Top Striped Royal Indigo Profit Segment -->
            <div style="height: ${profitPct}%"
              class="w-full max-w-[24px] rounded-[6px] profit-bar-pattern group-hover:ring-2 group-hover:ring-[#F59E0B] transition-all"></div>
            <!-- Bottom Solid Obsidian/Slate Loss Segment -->
            <div style="height: ${lossPct}%"
              class="w-full max-w-[24px] rounded-[6px] bg-[#18191D] dark:bg-slate-400 group-hover:opacity-90 transition-all"></div>
          </div>
        `;
      }).join('');
    }

    function showChartTooltip(month, profit, loss) {
      const tip = document.getElementById('chartTooltip');
      document.getElementById('tooltipMonth').textContent = `${month} 2026`;
      document.getElementById('tooltipProfit').textContent = `Profit: $${profit.toLocaleString()}`;
      document.getElementById('tooltipLoss').textContent = `Loss: $${loss.toLocaleString()}`;
      tip.classList.remove('hidden');
    }

    function hideChartTooltip() {
      document.getElementById('chartTooltip').classList.add('hidden');
    }

    /* ==========================================================================
       RECENT ACTIVITIES CRUD TABLE (SEARCH, FILTER, SORT, PAGINATE, BULK DELETE)
       ========================================================================== */
    function getActivityBadgeIcon(type) {
      switch (type) {
        case 'app':
          return `<span class="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 text-[#4F46E5] flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </span>`;
        case 'hotel':
          return `<span class="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-500/15 text-sky-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          </span>`;
        case 'flight':
          return `<span class="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-500/15 text-violet-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </span>`;
        case 'grocery':
          return `<span class="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-500/15 text-[#F59E0B] flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </span>`;
        default:
          return `<span class="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-500/15 text-rose-500 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </span>`;
      }
    }

    function getStatusIndicator(status) {
      if (status === 'Completed') {
        return `<span class="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>Completed</span>`;
      }
      if (status === 'Pending') {
        return `<span class="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200"><span class="w-2 h-2 rounded-full bg-rose-500"></span>Pending</span>`;
      }
      return `<span class="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200"><span class="w-2 h-2 rounded-full bg-[#F59E0B]"></span>In Progress</span>`;
    }

    function getFilteredSortedActivities() {
      let list = [...appState.activities];

      if (tableFilter.search.trim()) {
        const q = tableFilter.search.toLowerCase();
        list = list.filter(a =>
          a.id.toLowerCase().includes(q) ||
          a.title.toLowerCase().includes(q) ||
          a.status.toLowerCase().includes(q)
        );
      }

      if (tableFilter.status !== 'ALL') {
        list = list.filter(a => a.status === tableFilter.status);
      }

      if (tableFilter.sortField) {
        const field = tableFilter.sortField;
        const dir = tableFilter.sortAsc ? 1 : -1;
        list.sort((a, b) => {
          if (field === 'price') return (a.price - b.price) * dir;
          return String(a[field]).localeCompare(String(b[field])) * dir;
        });
      }

      return list;
    }

    function renderActivitiesTable() {
      const tbody = document.getElementById('activitiesTableBody');
      const filtered = getFilteredSortedActivities();
      const totalItems = filtered.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / tableFilter.pageSize));
      if (tableFilter.page > totalPages) tableFilter.page = totalPages;

      const startIdx = (tableFilter.page - 1) * tableFilter.pageSize;
      const pageItems = filtered.slice(startIdx, startIdx + tableFilter.pageSize);

      document.getElementById('activityCountBadge').textContent = totalItems;
      document.getElementById('paginationSummary').textContent = totalItems === 0
        ? 'No matching activities found'
        : `Showing ${startIdx + 1}–${Math.min(startIdx + tableFilter.pageSize, totalItems)} of ${totalItems} activities`;
      document.getElementById('pageIndicator').textContent = `${tableFilter.page} / ${totalPages}`;
      document.getElementById('prevPageBtn').disabled = tableFilter.page <= 1;
      document.getElementById('nextPageBtn').disabled = tableFilter.page >= totalPages;

      // Update Bulk Delete button visibility
      const selectedCount = appState.activities.filter(a => a.selected).length;
      const bulkBtn = document.getElementById('bulkDeleteBtn');
      document.getElementById('selectedRowsCount').textContent = selectedCount;
      if (selectedCount > 0) {
        bulkBtn.classList.remove('hidden');
        bulkBtn.classList.add('inline-flex');
      } else {
        bulkBtn.classList.add('hidden');
        bulkBtn.classList.remove('inline-flex');
      }

      // Master checkbox state
      const selectAllEl = document.getElementById('selectAllCheckbox');
      selectAllEl.checked = pageItems.length > 0 && pageItems.every(item => item.selected);

      if (pageItems.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="7" class="py-10 text-center text-slate-400 text-[13px]">
              No transactions match your current filter. Click <strong>+ Add</strong> to create one.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = pageItems.map(item => `
        <tr class="hover:bg-slate-50/90 dark:hover:bg-[#1A202E]/70 transition ${item.selected ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''}">
          <td class="py-3.5 pl-4 pr-2">
            <input type="checkbox" ${item.selected ? 'checked' : ''} onchange="toggleRowSelection('${item.id}', this.checked)"
              class="nexora-checkbox" aria-label="Select ${item.id}" />
          </td>
          <td class="py-3.5 px-3 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">${item.id}</td>
          <td class="py-3.5 px-3 whitespace-nowrap">
            <div class="flex items-center gap-2.5">
              ${getActivityBadgeIcon(item.icon)}
              <span class="font-medium text-slate-800 dark:text-slate-200">${item.title}</span>
            </div>
          </td>
          <td class="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
            $${item.price.toLocaleString('en-US')}
          </td>
          <td class="py-3.5 px-3 whitespace-nowrap">
            ${getStatusIndicator(item.status)}
          </td>
          <td class="py-3.5 px-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">${item.date}</td>
          <td class="py-3.5 pl-2 pr-4 text-right relative">
            <button type="button" onclick="toggleRowMenu(event, '${item.id}')" aria-label="Row actions"
              class="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
              </svg>
            </button>
            <div id="row-menu-${item.id}" class="row-action-menu hidden absolute right-4 mt-1 w-36 bg-white dark:bg-[#1A202E] rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-30 text-left">
              <button type="button" onclick="openEditActivityModal('${item.id}')" class="w-full px-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                ✎ Edit Record
              </button>
              <button type="button" onclick="cycleActivityStatus('${item.id}')" class="w-full px-3 py-1.5 text-[12px] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                ↻ Cycle Status
              </button>
              <button type="button" onclick="openSingleDeleteConfirm('${item.id}')" class="w-full px-3 py-1.5 text-[12px] text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 font-medium">
                🗑 Delete
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    function handleSearchInput(val) {
      tableFilter.search = val;
      tableFilter.page = 1;
      renderActivitiesTable();
    }

    function handleStatusFilter(val) {
      tableFilter.status = val;
      tableFilter.page = 1;
      renderActivitiesTable();
    }

    function sortActivities(field) {
      if (tableFilter.sortField === field) {
        tableFilter.sortAsc = !tableFilter.sortAsc;
      } else {
        tableFilter.sortField = field;
        tableFilter.sortAsc = true;
      }
      renderActivitiesTable();
    }

    function changePage(delta) {
      tableFilter.page += delta;
      renderActivitiesTable();
    }

    function toggleRowSelection(id, checked) {
      const target = appState.activities.find(a => a.id === id);
      if (target) target.selected = checked;
      saveState();
      renderActivitiesTable();
    }

    function toggleSelectAll(checked) {
      const filtered = getFilteredSortedActivities();
      const startIdx = (tableFilter.page - 1) * tableFilter.pageSize;
      const pageItems = filtered.slice(startIdx, startIdx + tableFilter.pageSize);
      pageItems.forEach(item => {
        const real = appState.activities.find(a => a.id === item.id);
        if (real) real.selected = checked;
      });
      saveState();
      renderActivitiesTable();
    }

    /* ==========================================================================
       CRUD OPERATIONS (CREATE, UPDATE, DELETE, QUICK TRANSFER/REQUEST)
       ========================================================================== */
    function openActivityModal() {
      document.getElementById('activityModalTitle').textContent = 'Add New Activity';
      document.getElementById('editActivityIndex').value = '-1';
      document.getElementById('activityForm').reset();
      openModal('activityModal');
    }

    function openEditActivityModal(id) {
      closeAllPopovers();
      const idx = appState.activities.findIndex(a => a.id === id);
      if (idx === -1) return;
      const item = appState.activities[idx];

      document.getElementById('activityModalTitle').textContent = `Edit ${item.id}`;
      document.getElementById('editActivityIndex').value = idx;
      document.getElementById('inputActivityTitle').value = item.title;
      document.getElementById('inputActivityPrice').value = item.price;
      document.getElementById('inputActivityStatus').value = item.status;
      document.getElementById('inputActivityIcon').value = item.icon;
      document.getElementById('inputActivityFlow').value = item.flow || 'expense';
      openModal('activityModal');
    }

    function saveActivityForm(e) {
      e.preventDefault();
      const idx = parseInt(document.getElementById('editActivityIndex').value, 10);
      const title = document.getElementById('inputActivityTitle').value.trim();
      const price = parseFloat(document.getElementById('inputActivityPrice').value);
      const status = document.getElementById('inputActivityStatus').value;
      const icon = document.getElementById('inputActivityIcon').value;
      const flow = document.getElementById('inputActivityFlow').value;

      if (!title || isNaN(price) || price <= 0) return;

      if (idx === -1) {
        // Create new ID
        const nextNum = 77 + appState.activities.length;
        const newId = `INV_${String(nextNum).padStart(6, '0')}`;
        const nowStr = '16 Nov, 2026 09:00 AM';
        appState.activities.unshift({
          id: newId,
          title,
          price,
          status,
          date: nowStr,
          icon,
          flow,
          selected: false
        });

        // Synchronize balance & KPIs
        if (flow === 'income') {
          appState.baseBalance += price;
          appState.kpi.income += Math.round(price / 10);
          appState.kpi.earnings += Math.round(price / 12);
        } else {
          appState.baseBalance = Math.max(0, appState.baseBalance - price);
          appState.kpi.spending += Math.round(price / 10);
          appState.spendingLimit.used = Math.min(appState.spendingLimit.max, appState.spendingLimit.used + Math.round(price / 20));
        }

        showToast(`Created ${newId} (${title})`, 'success');
      } else {
        // Update existing
        const prev = appState.activities[idx];
        const diff = price - prev.price;
        if (flow === 'income') {
          appState.baseBalance += diff;
        } else {
          appState.baseBalance = Math.max(0, appState.baseBalance - diff);
        }
        appState.activities[idx] = { ...prev, title, price, status, icon, flow };
        showToast(`Updated ${prev.id} successfully`, 'success');
      }

      saveState();
      closeModal('activityModal');
      renderAll();
    }

    function cycleActivityStatus(id) {
      closeAllPopovers();
      const order = ['Completed', 'Pending', 'In Progress'];
      const item = appState.activities.find(a => a.id === id);
      if (!item) return;
      const nextIdx = (order.indexOf(item.status) + 1) % order.length;
      item.status = order[nextIdx];
      saveState();
      renderAll();
      showToast(`${id} status changed to ${item.status}`, 'info');
    }

    function openSingleDeleteConfirm(id) {
      closeAllPopovers();
      pendingDeleteIds = [id];
      document.getElementById('deleteConfirmMessage').textContent = `Remove ${id} from Recent Activities? Your Total Balance will automatically adjust.`;
      openModal('deleteConfirmModal');
    }

    function openBulkDeleteConfirm() {
      const selected = appState.activities.filter(a => a.selected).map(a => a.id);
      if (selected.length === 0) return;
      pendingDeleteIds = selected;
      document.getElementById('deleteConfirmMessage').textContent = `Delete ${selected.length} selected activity record(s)? This action updates your treasury metrics.`;
      openModal('deleteConfirmModal');
    }

    document.getElementById('confirmDeleteActionBtn').addEventListener('click', () => {
      if (pendingDeleteIds.length === 0) return;
      appState.activities = appState.activities.filter(a => !pendingDeleteIds.includes(a.id));
      saveState();
      closeModal('deleteConfirmModal');
      renderAll();
      showToast(`Deleted ${pendingDeleteIds.length} record(s)`, 'amber');
      pendingDeleteIds = [];
    });

    /* ==========================================================================
       QUICK TRANSFER / REQUEST, NEW CARD & SPENDING LIMIT MODALS
       ========================================================================== */
    function openQuickActionModal(mode) {
      document.getElementById('quickActionMode').value = mode;
      document.getElementById('quickActionTitle').textContent = mode === 'Transfer' ? 'Instant Treasury Transfer' : 'Request Client Settlement';
      document.getElementById('quickSubmitBtn').textContent = mode === 'Transfer' ? 'Send Transfer' : 'Send Request';
      document.getElementById('quickCounterparty').value = '';
      document.getElementById('quickAmount').value = '';
      openModal('quickActionModal');
    }

    function submitQuickAction(e) {
      e.preventDefault();
      const mode = document.getElementById('quickActionMode').value;
      const party = document.getElementById('quickCounterparty').value.trim();
      const amount = parseFloat(document.getElementById('quickAmount').value);
      if (!party || isNaN(amount) || amount <= 0) return;

      const nextNum = 77 + appState.activities.length;
      const newId = `INV_${String(nextNum).padStart(6, '0')}`;

      if (mode === 'Transfer') {
        appState.baseBalance = Math.max(0, appState.baseBalance - amount);
        appState.spendingLimit.used = Math.min(appState.spendingLimit.max, appState.spendingLimit.used + amount);
        appState.kpi.spending += Math.round(amount / 10);
        appState.activities.unshift({
          id: newId,
          title: `Transfer to ${party}`,
          price: amount,
          status: 'Completed',
          date: '16 Nov, 2026 09:05 AM',
          icon: 'app',
          flow: 'expense',
          selected: false
        });
        showToast(`Transferred $${amount.toLocaleString()} to ${party}`, 'success');
      } else {
        appState.baseBalance += amount;
        appState.kpi.income += Math.round(amount / 10);
        appState.kpi.earnings += Math.round(amount / 10);
        appState.activities.unshift({
          id: newId,
          title: `Request from ${party}`,
          price: amount,
          status: 'Pending',
          date: '16 Nov, 2026 09:05 AM',
          icon: 'software',
          flow: 'income',
          selected: false
        });
        showToast(`Payment request of $${amount.toLocaleString()} sent to ${party}`, 'info');
      }

      saveState();
      closeModal('quickActionModal');
      renderAll();
    }

    function openAddCardModal() {
      document.getElementById('newCardLabel').value = '';
      document.getElementById('newCardDigits').value = '';
      openModal('addCardModal');
    }

    function submitNewCard(e) {
      e.preventDefault();
      const label = document.getElementById('newCardLabel').value.trim();
      const digits = document.getElementById('newCardDigits').value.trim();
      const theme = document.getElementById('newCardTheme').value;

      appState.cards.unshift({
        id: `card-${Date.now()}`,
        label,
        last4: digits,
        exp: '11/30',
        cvv: String(Math.floor(100 + Math.random() * 899)),
        active: true,
        theme
      });

      saveState();
      closeModal('addCardModal');
      renderAll();
      showToast(`Issued virtual card •••• ${digits}`, 'success');
    }

    function openLimitModal() {
      document.getElementById('modalLimitInput').value = appState.spendingLimit.max;
      openModal('limitModal');
    }

    function submitNewLimit(e) {
      e.preventDefault();
      const val = parseFloat(document.getElementById('modalLimitInput').value);
      if (isNaN(val) || val < 500) return;
      appState.spendingLimit.max = val;
      saveState();
      closeModal('limitModal');
      renderBalanceAndKPIs();
      showToast(`Monthly spending limit updated to $${val.toLocaleString()}`, 'success');
    }

    /* ==========================================================================
       SECONDARY VIEWS RENDERING (ACTIVITY, MANAGE, REPORTS)
       ========================================================================== */
    function renderSecondaryViews() {
      // 1. Activity View Totals & Full Table
      const completedSum = appState.activities.filter(a => a.status === 'Completed').reduce((s, a) => s + a.price, 0);
      const progressSum = appState.activities.filter(a => a.status === 'In Progress').reduce((s, a) => s + a.price, 0);
      const pendingSum = appState.activities.filter(a => a.status === 'Pending').reduce((s, a) => s + a.price, 0);

      document.getElementById('ledgerCompletedTotal').textContent = `$${completedSum.toLocaleString()}`;
      document.getElementById('ledgerProgressTotal').textContent = `$${progressSum.toLocaleString()}`;
      document.getElementById('ledgerPendingTotal').textContent = `$${pendingSum.toLocaleString()}`;

      const fullLedger = document.getElementById('fullLedgerContainer');
      fullLedger.innerHTML = `
        <table class="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr class="bg-[#F8F9FB] dark:bg-[#1A202E] text-slate-500 text-[12px] font-medium border-b border-slate-100 dark:border-slate-800">
              <th class="py-3 px-4">Order ID</th>
              <th class="py-3 px-4">Activity</th>
              <th class="py-3 px-4">Amount</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-[13px]">
            ${appState.activities.map(item => `
              <tr>
                <td class="py-3 px-4 font-medium">${item.id}</td>
                <td class="py-3 px-4 font-medium">${item.title}</td>
                <td class="py-3 px-4 font-semibold">$${item.price.toLocaleString()}</td>
                <td class="py-3 px-4">${getStatusIndicator(item.status)}</td>
                <td class="py-3 px-4 text-slate-400">${item.date}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      // 2. Manage View: All 6 Wallets & Cards
      document.getElementById('allSixWalletsGrid').innerHTML = appState.wallets.map((w, idx) => `
        <div class="rounded-2xl p-4 bg-[#F8F9FB] dark:bg-[#1A202E] border border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-full overflow-hidden shrink-0">${FLAG_SVGS[w.code]}</span>
            <div>
              <p class="text-[14px] font-bold text-slate-900 dark:text-white">${w.code} Treasury</p>
              <p class="text-[12px] text-slate-400">${w.limitText}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-[15px] font-bold text-slate-900 dark:text-white">${w.symbol}${w.balance.toLocaleString()}</p>
            <button type="button" onclick="toggleWalletStatus(${idx})" class="text-[11px] font-semibold ${w.active ? 'text-emerald-500' : 'text-rose-500'} hover:underline">
              ${w.active ? 'Active' : 'Inactive'}
            </button>
          </div>
        </div>
      `).join('');

      document.getElementById('manageCardsGrid').innerHTML = appState.cards.map(c => `
        <div class="rounded-2xl p-4 bg-gradient-to-br ${c.theme === 'obsidian' ? 'from-[#23252A] to-[#111215]' : 'from-[#4F46E5] to-[#7C3AED]'} text-white flex flex-col justify-between h-36">
          <div class="flex justify-between items-center">
            <span class="text-[12px] font-semibold">${c.label}</span>
            <span class="bg-white text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
          </div>
          <div class="flex justify-between items-end">
            <span class="font-mono text-[13px] tracking-widest">•••• •••• ${c.last4}</span>
            <span class="text-[11px] text-white/75">EXP ${c.exp}</span>
          </div>
        </div>
      `).join('');

      // 3. Reports View Table
      document.getElementById('reportsTableBody').innerHTML = CHART_DATA.map(row => {
        const net = row.profit - row.loss;
        return `
          <tr>
            <td class="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">${row.month} 2026</td>
            <td class="py-3 px-4 font-medium text-[#4F46E5]">$${row.profit.toLocaleString()}</td>
            <td class="py-3 px-4 font-medium text-slate-600 dark:text-slate-400">$${row.loss.toLocaleString()}</td>
            <td class="py-3 px-4 font-bold ${net >= 0 ? 'text-emerald-600' : 'text-rose-500'}">${net >= 0 ? '+' : ''}$${net.toLocaleString()}</td>
            <td class="py-3 px-4"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600">Audited</span></td>
          </tr>
        `;
      }).join('');
    }

    /* ==========================================================================
       UI UTILITIES: POPOVERS, MODALS, TOASTS, CSV EXPORT & RESET
       ========================================================================== */
    function openModal(id) {
      const m = document.getElementById(id);
      m.classList.remove('hidden');
      m.classList.add('flex');
    }

    function closeModal(id) {
      const m = document.getElementById(id);
      m.classList.add('hidden');
      m.classList.remove('flex');
    }

    function togglePopover(id) {
      const target = document.getElementById(id);
      const isHidden = target.classList.contains('hidden');
      closeAllPopovers();
      if (isHidden) target.classList.remove('hidden');
    }

    function toggleRowMenu(event, id) {
      event.stopPropagation();
      const menu = document.getElementById(`row-menu-${id}`);
      const isHidden = menu.classList.contains('hidden');
      closeAllPopovers();
      if (isHidden) menu.classList.remove('hidden');
    }

    function closeAllPopovers() {
      ['notifPopover', 'infoPopover', 'profilePopover', 'currencyPopover'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
      });
      document.querySelectorAll('.row-action-menu').forEach(el => el.classList.add('hidden'));
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('button') && !e.target.closest('#notifPopover') && !e.target.closest('#infoPopover') && !e.target.closest('#profilePopover') && !e.target.closest('#currencyPopover')) {
        closeAllPopovers();
      }
    });

    function showToast(message, type = 'success') {
      const container = document.getElementById('toastContainer');
      const dotColor = type === 'success' ? 'bg-emerald-400' : type === 'amber' ? 'bg-[#F59E0B]' : 'bg-[#6366F1]';
      const toast = document.createElement('div');
      toast.className = 'pointer-events-auto bg-slate-900 text-white text-[12.5px] font-medium px-4 py-3 rounded-2xl shadow-xl border border-slate-700/80 flex items-center gap-2.5 animate-stagger-1';
      toast.innerHTML = `<span class="w-2 h-2 rounded-full ${dotColor} shrink-0"></span><span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(6px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => toast.remove(), 260);
      }, 3000);
    }

    function focusGlobalSearch() {
      switchTab('overview');
      const input = document.getElementById('activitySearchInput');
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function markNotificationsRead() {
      document.getElementById('notifDot').classList.add('hidden');
      closeAllPopovers();
      showToast('All notifications marked as read', 'info');
    }

    function copyReferralCode() {
      const text = document.getElementById('referralCodeText').textContent;
      const temp = document.createElement('textarea');
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showToast('Referral code copied to clipboard!', 'success');
    }

    function saveAccountSettings(e) {
      e.preventDefault();
      const newLimit = parseFloat(document.getElementById('accountLimitInput').value);
      const newCurr = document.getElementById('accountCurrencySelect').value;
      if (!isNaN(newLimit) && newLimit >= 500) appState.spendingLimit.max = newLimit;
      appState.displayCurrency = newCurr;
      saveState();
      renderAll();
      showToast('Account & treasury preferences saved', 'success');
    }

    function exportActivitiesCSV() {
      const headers = ['Order ID', 'Activity', 'Price (USD)', 'Status', 'Date'];
      const rows = appState.activities.map(a => [a.id, `"${a.title}"`, a.price, a.status, `"${a.date}"`]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nexora-activities-2026.csv';
      link.click();
      URL.revokeObjectURL(url);
      showToast('Exported nexora-activities-2026.csv', 'success');
    }

    function resetDemoData() {
      localStorage.removeItem(STORAGE_KEY);
      appState = getDefaultState();
      tableFilter = { search: '', status: 'ALL', sortField: null, sortAsc: true, page: 1, pageSize: 5 };
      document.getElementById('activitySearchInput').value = '';
      document.getElementById('activityStatusFilter').value = 'ALL';
      setTheme('light');
      renderAll();
      showToast('Demo workspace restored to initial state', 'amber');
    }

    // Mobile Sidebar Drawer Controls
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const leftSidebar = document.getElementById('leftSidebar');
    const mobileBackdrop = document.getElementById('mobileBackdrop');

    mobileMenuBtn.addEventListener('click', () => {
      leftSidebar.classList.remove('-translate-x-full');
      mobileBackdrop.classList.remove('hidden');
    });

    function closeMobileDrawer() {
      leftSidebar.classList.add('-translate-x-full');
      mobileBackdrop.classList.add('hidden');
    }

    // Master Render
    function renderAll() {
      renderBalanceAndKPIs();
      renderWallets();
      renderCards();
      renderProfitLossChart();
      renderActivitiesTable();
      renderSecondaryViews();
    }

    // Initialize Application on Load
    window.addEventListener('DOMContentLoaded', () => {
      setTheme(appState.theme || 'light');
      renderAll();
    });
