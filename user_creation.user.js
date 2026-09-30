// ==UserScript==
// @name         User Creation Automation
// @namespace    http://tampermonkey.net/
// @version      0.7.7
// @description  Automate user creation from JSON data
// @author       Antigravity
// @match        *://agents.mytour.vn/*
// @match        *://one-dev.tripi.vn/*
// @match        *://portal.mybiztravel.vn/*
// @require      https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.min.js
// @require      https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/javascript/javascript.min.js
// @require      https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/sql/sql.min.js
// @resource     CM_CSS https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.css
// @resource     FA_CSS https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @updateURL    	https://raw.githubusercontent.com/nthungf/tampermonkey-user-creation/refs/heads/master/user_creation.user.js
// @downloadURL  	https://raw.githubusercontent.com/nthungf/tampermonkey-user-creation/refs/heads/master/user_creation.user.js
// ==/UserScript==

(function () {
  "use strict";

  // =========================================================================
  // 1. CONFIGURATION & CONSTANTS
  // =========================================================================
  const SCRIPT_VERSION =
    typeof GM_info !== "undefined" && GM_info?.script?.version ? `v${GM_info.script.version}` : "v0.7.6";

  const CONFIG = {
    DEFAULT_DELAYS: {
      search: 800,
      fill: 300,
      searchResult: 1600,
      openPage: 600,
      dropdown: 1200,
    },
    PATHS: {
      userList: "/generalSetting/userManagement",
      approvalList: "/generalSetting/approval",
      org: "/generalSetting/companyInfomation/company?page=0",
    },
    COMPANIES: {
      dong_a: {
        name: "Đông Á",
        tiers: {
          "550": {
            name: "550k",
            hotel_budget: 550000,
            province_budget: '[{"provinceId":33,"budget":650000},{"provinceId":11,"budget":650000},{"provinceId":50,"budget":650000},{"provinceId":38,"budget":650000},{"provinceId":43,"budget":550000,"districtBudgets":[{"districtId":414,"budget":650000}]},{"provinceId":3,"budget":650000},{"provinceId":1,"budget":550000,"districtBudgets":[{"districtId":275,"budget":650000}]},{"provinceId":42,"budget":550000,"districtBudgets":[{"districtId":382,"budget":600000}]},{"provinceId":6,"budget":550000,"districtBudgets":[{"districtId":344,"budget":600000}]},{"provinceId":2,"budget":550000,"districtBudgets":[{"districtId":501,"budget":600000},{"districtId":446,"budget":600000}]},{"provinceId":20,"budget":550000,"districtBudgets":[{"districtId":155,"budget":600000}]},{"provinceId":32,"budget":550000,"districtBudgets":[{"districtId":50,"budget":600000}]},{"provinceId":15,"budget":550000,"districtBudgets":[{"districtId":686,"budget":600000}]},{"provinceId":10,"budget":550000,"districtBudgets":[{"districtId":235,"budget":600000}]},{"provinceId":7,"budget":550000,"districtBudgets":[{"districtId":667,"budget":600000}]},{"provinceId":34,"budget":550000,"districtBudgets":[{"districtId":239,"budget":600000}]},{"provinceId":5,"budget":550000,"districtBudgets":[{"districtId":494,"budget":600000}]},{"provinceId":16,"budget":550000,"districtBudgets":[{"districtId":574,"budget":600000}]},{"provinceId":24,"budget":550000,"districtBudgets":[{"districtId":35,"budget":600000}]},{"provinceId":55,"budget":550000,"districtBudgets":[{"districtId":567,"budget":600000}]},{"provinceId":40,"budget":550000,"districtBudgets":[{"districtId":72,"budget":600000}]}]',
          },
          "650": {
            name: "650k",
            hotel_budget: 650000,
            province_budget: '[{"provinceId":33,"budget":850000,"districtBudgets":[],"maxHotelStar":5},{"provinceId":11,"budget":850000,"districtBudgets":[],"maxHotelStar":5},{"provinceId":50,"budget":850000,"districtBudgets":[],"maxHotelStar":5},{"provinceId":38,"budget":850000,"districtBudgets":[],"maxHotelStar":5},{"provinceId":43,"budget":650000,"districtBudgets":[{"districtId":414,"budget":850000,"maxHotelStar":5}],"maxHotelStar":5},{"provinceId":3,"budget":850000,"districtBudgets":[],"maxHotelStar":5},{"provinceId":1,"budget":750000,"districtBudgets":[{"districtId":275,"budget":850000,"maxHotelStar":5}],"maxHotelStar":5},{"provinceId":42,"budget":650000,"districtBudgets":[{"districtId":382,"budget":750000,"maxHotelStar":5}],"maxHotelStar":5},{"provinceId":6,"budget":650000,"districtBudgets":[{"districtId":344,"budget":750000,"maxHotelStar":5}],"maxHotelStar":5},{"provinceId":2,"budget":650000,"districtBudgets":[{"districtId":501,"budget":750000,"maxHotelStar":5},{"districtId":446,"budget":750000,"maxHotelStar":5}],"maxHotelStar":5},{"provinceId":20,"budget":650000,"districtBudgets":[{"districtId":155,"budget":750000,"maxHotelStar":5}],"maxHotelStar":5},{"provinceId":32,"budget":650000,"districtBudgets":[{"districtId":50,"budget":750000,"maxHotelStar":5}],"maxHotelStar":5},{"provinceId":15,"budget":650000,"districtBudgets":[{"districtId":686,"budget":750000,"maxHotelStar":5}], "maxHotelStar":5},{"provinceId":10,"budget":650000,"districtBudgets":[{"districtId":235,"budget":750000,"maxHotelStar":5}], "maxHotelStar":5},{"provinceId":7,"budget":650000,"districtBudgets":[{"districtId":667,"budget":750000,"maxHotelStar":5}], "maxHotelStar":5},{"provinceId":34,"budget":650000,"districtBudgets":[{"districtId":239,"budget":750000,"maxHotelStar":5}], "maxHotelStar":5},{"provinceId":5,"budget":650000,"districtBudgets":[{"districtId":494,"budget":750000,"maxHotelStar":5}], "maxHotelStar":5},{"provinceId":16,"budget":650000,"districtBudgets":[{"districtId":574,"budget":750000,"maxHotelStar":5}], "maxHotelStar":5},{"provinceId":24,"budget":650000,"districtBudgets":[{"districtId":35,"budget":750000,"maxHotelStar":5}], "maxHotelStar":5},{"provinceId":55,"budget":650000,"districtBudgets":[{"districtId":567,"budget":750000,"maxHotelStar":5}], "maxHotelStar":5},{"provinceId":40,"budget":650000,"districtBudgets":[{"districtId":72,"budget":750000,"maxHotelStar":5}], "maxHotelStar":5}]',
          },
          "750": {
            name: "750k",
            hotel_budget: 750000,
            province_budget: '[{"provinceId":33,"budget":1100000},{"provinceId":11,"budget":1100000},{"provinceId":50,"budget":1100000},{"provinceId":38,"budget":1100000},{"provinceId":43,"budget":750000,"districtBudgets":[{"districtId":414,"budget":1100000}]},{"provinceId":3,"budget":1100000},{"provinceId":1,"budget":750000,"districtBudgets":[{"districtId":275,"budget":1100000}]},{"provinceId":42,"budget":750000,"districtBudgets":[{"districtId":382,"budget":900000}]},{"provinceId":6,"budget":750000,"districtBudgets":[{"districtId":344,"budget":900000}]},{"provinceId":2,"budget":750000,"districtBudgets":[{"districtId":501,"budget":900000},{"districtId":446,"budget":900000}]},{"provinceId":20,"budget":750000,"districtBudgets":[{"districtId":155,"budget":900000}]},{"provinceId":32,"budget":750000,"districtBudgets":[{"districtId":50,"budget":900000}]},{"provinceId":15,"budget":750000,"districtBudgets":[{"districtId":686,"budget":900000}]},{"provinceId":10,"budget":750000,"districtBudgets":[{"districtId":235,"budget":900000}]},{"provinceId":7,"budget":750000,"districtBudgets":[{"districtId":667,"budget":900000}]},{"provinceId":34,"budget":750000,"districtBudgets":[{"districtId":239,"budget":900000}]},{"provinceId":5,"budget":750000,"districtBudgets":[{"districtId":494,"budget":900000}]},{"provinceId":16,"budget":750000,"districtBudgets":[{"districtId":574,"budget":900000}]},{"provinceId":24,"budget":750000,"districtBudgets":[{"districtId":35,"budget":900000}]},{"provinceId":55,"budget":750000,"districtBudgets":[{"districtId":567,"budget":750000,"maxHotelStar":5}]},{"provinceId":40,"budget":750000,"districtBudgets":[{"districtId":72,"budget":900000}]}]',
          }
        }
      },
      f88: {
        name: "F88",
        tiers: {
          "cap_2": {
            name: "Cấp 2",
            hotel_budget: 2000000,
            province_budget: '[{"provinceId":11,"budget":3500000},{"provinceId":33,"budget":3500000},{"provinceId":1,"budget":3500000},{"provinceId":50,"budget":3500000},{"provinceId":38,"budget":3500000},{"provinceId":3,"budget":3500000}]'
          },
          "cap_3": {
            name: "Cấp 3",
            hotel_budget: 1200000,
            province_budget: '[{"provinceId":11,"budget":1500000},{"provinceId":33,"budget":1500000},{"provinceId":1,"budget":1500000},{"provinceId":50,"budget":1500000},{"provinceId":38,"budget":1500000},{"provinceId":3,"budget":1500000}]'
          },
          "cap_4": {
            name: "Cấp 4",
            hotel_budget: 900000,
            province_budget: '[{"provinceId":11,"budget":1100000},{"provinceId":33,"budget":1100000},{"provinceId":1,"budget":1100000},{"provinceId":50,"budget":1100000},{"provinceId":38,"budget":1100000},{"provinceId":3,"budget":1100000}]'
          },
          "cap_5": {
            name: "Cấp 5",
            hotel_budget: 600000,
            province_budget: '[{"provinceId":11,"budget":700000},{"provinceId":33,"budget":700000},{"provinceId":1,"budget":700000},{"provinceId":50,"budget":700000},{"provinceId":38,"budget":700000},{"provinceId":3,"budget":700000}]'
          }
        }
      }
    },
  };

  const ICONS = {
    COPY: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    CHECK: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  };

  // =========================================================================
  // 2. STORAGE & STATE MANAGEMENT
  // =========================================================================
  const tmStorage = {
    getItem: (k) => {
      if (k === "tm_bot_exec_state" || k === "tm_bot_visible") return sessionStorage.getItem(k);
      const v = GM_getValue(k);
      return typeof v !== "undefined" ? v : null;
    },
    setItem: (k, v) => {
      if (k === "tm_bot_exec_state" || k === "tm_bot_visible") return sessionStorage.setItem(k, String(v));
      return GM_setValue(k, v);
    },
    removeItem: (k) => {
      if (k === "tm_bot_exec_state" || k === "tm_bot_visible") {
        sessionStorage.removeItem(k);
        try { GM_deleteValue(k); } catch (e) { }
        return;
      }
      return GM_deleteValue(k);
    },
  };

  // Clean up any legacy cross-tab visibility value in global GM storage
  try { GM_deleteValue("tm_bot_visible"); } catch (e) { }

  let isBotRunning = false;
  let isBotPaused = false;
  let skipCurrentRequested = false;
  let currentTab = tmStorage.getItem("tm_bot_tab") || "USER";

  let execStats = {
    total: 0,
    current: 0,
    success: 0,
    failed: 0,
    skipped: 0,
  };

  // Map to hold global references to active tab CodeMirror editors
  const editors = {};

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const readDelaySetting = (key, fallback) => {
    const parsed = parseInt(tmStorage.getItem(key) || "", 10);
    return Number.isFinite(parsed) ? clamp(parsed, 100, 10000) : fallback;
  };

  const getSearchDelay = () => readDelaySetting("tm_bot_search_delay", CONFIG.DEFAULT_DELAYS.search);
  const getFillDelay = () => readDelaySetting("tm_bot_fill_delay", CONFIG.DEFAULT_DELAYS.fill);
  const getSearchResultWait = () => readDelaySetting("tm_bot_search_result_wait", CONFIG.DEFAULT_DELAYS.searchResult);
  const getOpenPageDelay = () => readDelaySetting("tm_bot_open_page_delay", CONFIG.DEFAULT_DELAYS.openPage);
  const getDropdownWait = () => readDelaySetting("tm_bot_dropdown_wait", CONFIG.DEFAULT_DELAYS.dropdown);

  // =========================================================================
  // 3. COMMON UTILITIES & LOADER
  // =========================================================================
  let abortManualWait = null;

  const wait = (ms) =>
    new Promise((resolve) => {
      if (!isBotRunning) return resolve();
      const start = Date.now();
      const interval = setInterval(() => {
        if (!isBotRunning || Date.now() - start >= ms) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });

  function purgeExecState() {
    tmStorage.removeItem("tm_bot_exec_state");
    sessionStorage.removeItem("tm_bot_exec_state");
    localStorage.removeItem("tm_bot_exec_state");
    try { GM_deleteValue("tm_bot_exec_state"); } catch (e) { }
    sessionStorage.removeItem("tm_bot_nav_attempt");
  }

  function isAccessDeniedPage() {
    const path = (window.location.pathname || "").toLowerCase();
    const href = (window.location.href || "").toLowerCase();
    if (
      path.includes("/403") ||
      path.includes("/unauthorized") ||
      path.includes("/forbidden") ||
      path.includes("/access-denied") ||
      href.includes("/403")
    ) {
      return true;
    }
    const alertSelectors = [
      ".ant-result-403",
      ".ant-result-error",
      ".MuiAlert-message",
      ".ant-alert-message",
      "h1",
      "h2",
      ".error-page",
    ];
    for (const sel of alertSelectors) {
      const el = document.querySelector(sel);
      if (el && el.offsetParent !== null) {
        const text = (el.textContent || "").toLowerCase();
        if (
          text.includes("403") ||
          text.includes("không có quyền") ||
          text.includes("bạn không có quyền") ||
          text.includes("access denied") ||
          text.includes("unauthorized") ||
          text.includes("permission denied") ||
          text.includes("không được phép")
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function findMenuLink(path) {
    if (!path) return null;
    const cleanPath = path.split("?")[0];

    const linkByHref = document.querySelector(`a[href*="${cleanPath}"]`);
    if (linkByHref && linkByHref.offsetParent !== null) return linkByHref;

    const linkTextMap = {
      "/generalSetting/userManagement": [
        "quản lý người dùng",
        "user management",
        "danh sách người dùng",
        "thành viên",
        "nhân viên",
      ],
      "/generalSetting/approval": [
        "phê duyệt",
        "approval",
        "cấu hình phê duyệt",
        "quy trình phê duyệt",
      ],
      "/generalSetting/companyInfomation": [
        "thông tin công ty",
        "cơ cấu tổ chức",
        "công ty",
        "chi nhánh",
        "phòng ban",
      ],
    };

    for (const [route, keywords] of Object.entries(linkTextMap)) {
      if (cleanPath.includes(route) || route.includes(cleanPath)) {
        const allLinks = Array.from(
          document.querySelectorAll("nav a, aside a, .sidebar a, .MuiDrawer-root a, [role='navigation'] a, a"),
        );
        for (const kw of keywords) {
          const match = allLinks.find(
            (el) => el.offsetParent !== null && el.textContent && el.textContent.toLowerCase().includes(kw),
          );
          if (match) return match;
        }
      }
    }
    return null;
  }

  async function safeNavigate(url, tab = currentTab) {
    if (!isBotRunning) {
      console.log(`[BOT] Aborting navigation to ${url} because bot was stopped.`);
      purgeExecState();
      return false;
    }

    const cleanUrl = url.startsWith("http") ? new URL(url).pathname + new URL(url).search : url;
    const targetPath = cleanUrl.split("?")[0];

    // Already on target page
    if (window.location.pathname.includes(targetPath) || window.location.href.includes(url)) {
      sessionStorage.removeItem("tm_bot_nav_attempt");
      return true;
    }

    // Circuit Breaker: check if previous navigation attempt to this target was redirected away
    const navAttemptStr = sessionStorage.getItem("tm_bot_nav_attempt");
    if (navAttemptStr) {
      try {
        const attempt = JSON.parse(navAttemptStr);
        const isRecent = attempt && attempt.timestamp && (Date.now() - attempt.timestamp < 60000);
        if (isRecent && attempt.targetPath === targetPath) {
          console.error(`[BOT] Circuit breaker triggered! Direct URL "${url}" was redirected away or is restricted.`);
          purgeExecState();
          const errReason = `Access Restricted: Cannot access "${targetPath}". The browser was redirected to "${window.location.pathname}". The current account may lack permissions. Automation stopped to prevent an infinite reload loop.`;
          stopBot(errReason);
          showToast(`Access Restricted: Cannot access ${targetPath}`, "error", 10000);
          return false;
        } else if (!isRecent) {
          sessionStorage.removeItem("tm_bot_nav_attempt");
        }
      } catch (e) {
        sessionStorage.removeItem("tm_bot_nav_attempt");
      }
    }

    // Check if current page already displays an access denied message
    if (isAccessDeniedPage()) {
      console.error(`[BOT] Access Denied page detected prior to navigating to ${url}.`);
      purgeExecState();
      stopBot("Access Denied: Current user lacks permission to access administrative pages.");
      showToast("Access Denied: Permission restricted.", "error", 8000);
      return false;
    }

    // Try finding and clicking in-page sidebar / navigation link first
    const menuLink = findMenuLink(targetPath);
    if (menuLink) {
      console.log(`[BOT] Found in-page navigation link for "${targetPath}". Clicking menu link...`);
      robustClick(menuLink);
      await wait(getOpenPageDelay());
      if (window.location.pathname.includes(targetPath) || window.location.href.includes(url)) {
        console.log(`[BOT] In-page menu navigation succeeded to "${targetPath}".`);
        sessionStorage.removeItem("tm_bot_nav_attempt");
        return true;
      }
    }

    // Record navigation attempt before hard navigate
    sessionStorage.setItem(
      "tm_bot_nav_attempt",
      JSON.stringify({
        targetUrl: url,
        targetPath: targetPath,
        tab: tab,
        originPath: window.location.pathname,
        timestamp: Date.now(),
      }),
    );

    console.log(`[BOT] Navigating to ${url}...`);
    window.location.href = url;
    return true;
  }

  function stopBot(reason = "Automation stopped by user.") {
    isBotRunning = false;
    isBotPaused = false;
    skipCurrentRequested = false;

    // Purge exec state everywhere so reloads or navigation NEVER resume the bot
    purgeExecState();

    if (abortManualWait) {
      abortManualWait();
      abortManualWait = null;
    }
    const reviewCard = document.getElementById("tmManualReviewCard");
    if (reviewCard) reviewCard.remove();

    const statusEl = document.getElementById("tmBotStatus");
    if (statusEl) {
      statusEl.innerHTML = `<i class="fa-solid fa-circle-stop" style="margin-right:4px;"></i>Stopped`;
      statusEl.className = "tm-status tm-status-inline tm-status-ready";
    }
    const icon = document.getElementById("tm-bot-icon");
    if (icon) {
      icon.classList.remove("tm-running");
      icon.classList.remove("tm-stopping");
    }

    document.querySelectorAll(".tm-btn-run").forEach((b) => {
      b.disabled = false;
      b.innerHTML = `<i class="fa-solid fa-play" style="margin-right:4px;"></i>Run`;
    });
    document.querySelectorAll(".tm-btn-pause").forEach((b) => b.classList.remove("tm-visible"));
    document.querySelectorAll(".tm-btn-skip").forEach((b) => b.classList.remove("tm-visible"));
    document.querySelectorAll(".tm-btn-stop").forEach((b) => b.classList.remove("tm-visible"));

    const activePane = document.querySelector(".tm-tab-pane.tm-active");
    if (activePane) enableConfigCheckboxes(activePane);

    appendLog(currentTab, `<i class="fa-solid fa-stop" style="margin-right:4px;"></i>${reason}`, "warn");
    updateHUD(currentTab, execStats, undefined, "Stopped", "idle");
    updateTabRunningIndicators();
  }

  function showToast(msg, type = "info", duration = 2500) {
    let container = document.getElementById("tmToastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "tmToastContainer";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `tm-toast tm-toast-${type}`;
    let icon = '<i class="fa-solid fa-circle-info"></i>';
    if (type === "success") icon = '<i class="fa-solid fa-circle-check"></i>';
    if (type === "error") icon = '<i class="fa-solid fa-circle-xmark"></i>';
    if (type === "warning") icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
    toast.innerHTML = `<span class="tm-toast-icon">${icon}</span><span class="tm-toast-msg">${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("tm-toast-fadeout");
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  function getJsonErrorLocation(str) {
    if (!str || !str.trim()) return null;
    try {
      JSON.parse(str.trim());
      return null;
    } catch (err) {
      let line = 0;
      let ch = 0;
      const posMatch = err.message.match(/at position (\d+)/i);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const lines = str.slice(0, pos).split("\n");
        line = lines.length - 1;
        ch = lines[lines.length - 1].length;
      } else {
        const lineMatch = err.message.match(/line (\d+) column (\d+)/i);
        if (lineMatch) {
          line = Math.max(0, parseInt(lineMatch[1], 10) - 1);
          ch = Math.max(0, parseInt(lineMatch[2], 10) - 1);
        }
      }
      return {
        line,
        ch,
        message: err.message,
        shortMsg:
          err.message
            .replace(/^JSON(?:\.parse|\s*Parse error):\s*/i, "")
            .replace(/\s*(?:in JSON\s*)?at position \d+.*$/i, "")
            .replace(/\s*at line \d+.*$/i, "")
            .trim() || "Invalid syntax",
      };
    }
  }

  function loadStyle(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }

  async function ensureCodeMirrorLoaded() {
    loadStyle("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap");
    loadStyle("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css");

    if (!document.getElementById("tm-fa-css")) {
      try {
        const faCss = GM_getResourceText("FA_CSS");
        if (faCss) {
          GM_addStyle(faCss);
          const faMarker = document.createElement("style");
          faMarker.id = "tm-fa-css";
          document.head.appendChild(faMarker);
        }
      } catch (e) {
        // Fallback loadStyle already invoked above
      }
    }

    if (window.CodeMirror) {
      if (!document.getElementById("tm-cm-css")) {
        try {
          const css = GM_getResourceText("CM_CSS");
          GM_addStyle(css);
          const marker = document.createElement("style");
          marker.id = "tm-cm-css";
          document.head.appendChild(marker);
        } catch (e) {
          console.warn("[BOT] Failed to inject CodeMirror CSS via GM_addStyle. Falling back to dynamic link.", e);
          loadStyle("https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.css");
        }
      }
      return true;
    }
    return false;
  }

  // =========================================================================
  // 4. DOM AUTOMATION ENGINE
  // =========================================================================
  function robustClick(el) {
    if (!el) return;
    el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    el.click();
    el.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
  }

  function setNativeValue(element, value) {
    if (!element) return;
    const previousValue = element.value;
    let prototype = Object.getPrototypeOf(element);
    let prototypeValueSetter = null;

    while (prototype) {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
      if (descriptor && descriptor.set) {
        prototypeValueSetter = descriptor.set;
        break;
      }
      prototype = Object.getPrototypeOf(prototype);
    }

    const valueSetter = Object.getOwnPropertyDescriptor(element, "value")?.set;

    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else if (valueSetter) {
      valueSetter.call(element, value);
    } else {
      element.value = value;
    }

    if (element._valueTracker) {
      element._valueTracker.setValue(previousValue !== value ? previousValue : "");
    }
  }

  async function typeIntoElement(element, value) {
    if (!element) return;
    element.focus();

    if (element.value) {
      setNativeValue(element, "");
      element.dispatchEvent(new Event("input", { bubbles: true }));
      await wait(40);
    }

    setNativeValue(element, value);
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));

    if (element.value !== value) {
      element.select();
      try {
        document.execCommand("insertText", false, value);
      } catch (e) { }
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    }

    await wait(Math.max(100, Math.floor(getFillDelay() / 2)));
  }

  function triggerChange(element) {
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
    element.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
      }),
    );
  }

  async function smartFill(container, value, id, placeholder = null, label = null) {
    if (!value) return;

    let el = null;
    if (id) el = container.querySelector(`#${id}`);
    if (!el && placeholder) {
      el = Array.from(container.querySelectorAll("input, textarea")).find(
        (i) => i.placeholder && i.placeholder.toLowerCase().includes(placeholder.toLowerCase()),
      );
    }
    if (!el && label) {
      const labelEl = Array.from(container.querySelectorAll("label, p, span")).find(
        (l) => l.textContent && l.textContent.toLowerCase().includes(label.toLowerCase()),
      );
      if (labelEl) {
        if (labelEl.htmlFor) el = document.getElementById(labelEl.htmlFor);
        if (!el) el = labelEl.parentElement.querySelector("input, textarea");
      }
    }

    if (el) {
      el.focus();
      setNativeValue(el, value);
      triggerChange(el);
      await wait(Math.max(120, Math.floor(getFillDelay() * 0.7)));
    } else {
      console.warn(`[BOT] Could not find field: ${id || placeholder || label}`);
    }
  }

  async function fillAutocomplete(formContainer, placeholder, value) {
    if (!value) return;
    console.log(`[BOT] [STAGE: START] Filling Autocomplete: "${placeholder}" -> "${value}"`);

    const findInput = () =>
      Array.from(formContainer.querySelectorAll("input")).find((i) =>
        (i.placeholder || "").toLowerCase().includes((placeholder || "").toLowerCase()),
      );

    let input = findInput();
    if (!input) {
      console.warn(`[BOT] [STAGE: ERROR] Input not found for "${placeholder}"`);
      return;
    }

    const fieldRoot = input.closest(".MuiAutocomplete-root") || input.parentElement;
    input.scrollIntoView({ block: "center", behavior: "smooth" });
    await wait(getFillDelay());

    const clearBtn = fieldRoot.querySelector(".MuiAutocomplete-clearIndicator");
    if (clearBtn && clearBtn.offsetParent !== null) {
      console.log("[BOT] Resetting specific field...");
      clearBtn.click();
      await wait(Math.max(120, Math.floor(getFillDelay() * 0.7)));
      input = findInput();
    }

    console.log("[BOT] [STAGE 1: Activation] Opening dropdown...");
    const isOpen = () => input.getAttribute("aria-expanded") === "true" || !!document.querySelector('[role="listbox"]');

    if (!isOpen()) {
      const popupBtn = fieldRoot.querySelector(".MuiAutocomplete-popupIndicator");
      if (popupBtn) {
        popupBtn.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        popupBtn.click();
        await wait(getFillDelay());
      }
    }

    if (!isOpen()) {
      input.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      input.focus();
      input.click();
      await wait(Math.max(250, Math.floor(getFillDelay() * 1.3)));
    }

    console.log("[BOT] [STAGE 2: Typing] Sending search string...");
    setNativeValue(input, "");
    input.dispatchEvent(new Event("input", { bubbles: true }));
    await wait(getFillDelay());

    setNativeValue(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    await wait(getDropdownWait());

    console.log("[BOT] [STAGE 3: Waiting] Polling for listbox...");
    let listbox = null;
    for (let attempt = 0; attempt < 30; attempt++) {
      const controlsId = input.getAttribute("aria-controls");
      if (controlsId) {
        listbox = document.getElementById(controlsId);
      }
      if (!listbox || listbox.offsetParent === null) {
        listbox = document.querySelector('[role="listbox"], .MuiAutocomplete-listbox');
      }

      if (listbox && listbox.offsetParent !== null) {
        if (listbox.textContent.includes("Loading...")) {
          await wait(150);
          continue;
        }
        console.log("[BOT] Listbox confirmed.");
        break;
      }
      if (attempt % 5 === 0) input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
      await wait(150);
    }

    if (!listbox || listbox.offsetParent === null) {
      console.warn("[BOT] [STAGE: TIMEOUT] Dropdown did not appear or is invisible.");
      return;
    }

    console.log("[BOT] [STAGE 4: Selection] Picking item...");
    await wait(Math.max(120, Math.floor(getFillDelay() * 0.7)));

    const options = Array.from(
      listbox.querySelectorAll('[role="option"], .MuiAutocomplete-option, li[class*="option"]'),
    ).filter((el) => {
      const text = el.textContent.trim().toLowerCase();
      return text !== "" && text !== "loading..." && text !== "no options";
    });

    if (options.length > 0) {
      let matchIdx = options.findIndex((o) => o.textContent.trim().toLowerCase() === value.toLowerCase());
      if (matchIdx === -1) matchIdx = 0;

      console.log(`[BOT] Selecting option at index ${matchIdx}: "${options[matchIdx].textContent.trim()}".`);

      const targetOption = options[matchIdx];
      const isAlreadyFocus =
        targetOption.getAttribute("data-focus") === "true" || targetOption.getAttribute("aria-selected") === "true";

      if (!isAlreadyFocus) {
        console.log("[BOT] Moving highlight to target...");
        for (let i = 0; i <= matchIdx; i++) {
          input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
          await wait(Math.max(70, Math.floor(getFillDelay() / 3)));
        }
      } else {
        console.log("[BOT] Target already highlighted, skipping ArrowDown.");
      }

      await wait(Math.max(120, Math.floor(getFillDelay() * 0.7)));
      input.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13,
          bubbles: true,
        }),
      );

      await wait(Math.max(350, Math.floor(getFillDelay() * 2.7)));

      if (document.querySelector('[role="listbox"]') || input.value === "") {
        console.log("[BOT] Selection did not commit via keyboard. Trying mouse fallback...");
        const fallbackOption = options[matchIdx];
        fallbackOption.scrollIntoView({ block: "nearest" });
        await wait(Math.max(80, Math.floor(getFillDelay() / 3)));
        fallbackOption.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        fallbackOption.click();
        await wait(500);
      }
    } else {
      console.warn("[BOT] Listbox found but no valid options found.");
    }
  }

  async function waitManual(message) {
    if (!isBotRunning) return;
    console.log(`[BOT] Pausing for manual intervention: ${message}`);
    return new Promise((resolve) => {
      const statusEl = document.getElementById("tmBotStatus");
      const activePane = document.querySelector(".tm-tab-pane.tm-active");

      if (statusEl) {
        statusEl.innerHTML = `<i class="fa-solid fa-circle-pause" style="margin-right:4px;"></i>Waiting Review`;
        statusEl.className = "tm-status tm-status-inline tm-status-paused";
      }

      if (activePane) {
        const badgeEl = activePane.querySelector(".tm-hud-status-badge");
        if (badgeEl) {
          badgeEl.innerText = "Review";
          badgeEl.className = "tm-hud-status-badge tm-status-paused";
        }
      }

      // Remove any existing manual review card
      const oldCard = document.getElementById("tmManualReviewCard");
      if (oldCard) oldCard.remove();

      const reviewCard = document.createElement("div");
      reviewCard.id = "tmManualReviewCard";
      reviewCard.className = "tm-manual-banner";
      reviewCard.innerHTML = `
        <div class="tm-manual-header">
          <span class="tm-manual-icon"><i class="fa-solid fa-eye" style="color:#b45309;"></i></span>
          <span class="tm-manual-title">Manual Action Required</span>
        </div>
        <div class="tm-manual-desc">${message}</div>
        <button id="tmContinueManual" class="tm-btn tm-btn-run tm-btn-continue-pulse" style="width:100%;">
          <i class="fa-solid fa-play" style="margin-right:6px;"></i>CONTINUE NEXT
        </button>
      `;

      abortManualWait = () => {
        if (reviewCard) reviewCard.remove();
        resolve();
      };

      if (activePane) {
        const hudCard = activePane.querySelector(".tm-hud-card");
        const logContainer = activePane.querySelector(".tm-log-container") || activePane.querySelector(".tm-log");
        if (hudCard) {
          hudCard.insertAdjacentElement("afterend", reviewCard);
        } else if (logContainer) {
          activePane.insertBefore(reviewCard, logContainer);
        } else {
          activePane.appendChild(reviewCard);
        }
      }

      const manualBtn = reviewCard.querySelector("#tmContinueManual");
      manualBtn.onclick = () => {
        abortManualWait = null;
        reviewCard.remove();
        if (statusEl) {
          statusEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px;"></i>Running...`;
          statusEl.className = "tm-status tm-status-inline tm-status-running";
        }
        if (activePane) {
          const badgeEl = activePane.querySelector(".tm-hud-status-badge");
          if (badgeEl) {
            badgeEl.innerText = "Running";
            badgeEl.className = "tm-hud-status-badge tm-status-running";
          }
        }
        console.log("[BOT] Resuming from manual pause.");
        resolve();
      };
    });
  }

  // =========================================================================
  // 5. CORE AUTOMATION WORKFLOWS
  // =========================================================================
  async function processUser(user, dryRun = true) {
    if (!isBotRunning) return false;
    const USER_LIST_PATH = CONFIG.PATHS.userList;

    if (!window.location.pathname.includes(USER_LIST_PATH)) {
      console.log("[BOT] Not on user management page. Navigating...");
      const navSuccess = await safeNavigate(USER_LIST_PATH, "USER");
      if (!navSuccess) return false;
      if (!window.location.pathname.includes(USER_LIST_PATH)) {
        await new Promise(() => { });
        return false;
      }
    }

    const drawer = document.querySelector(".MuiDrawer-paperAnchorRight");
    if (!drawer) {
      const activePanel = document.querySelector('[role="tabpanel"]:not([hidden])') || document;
      const searchInput = activePanel.querySelector("#searchStr") || document.getElementById("searchStr");

      if (searchInput) {
        console.log(`[BOT] Searching for existing user: ${user.email}`);
        await typeIntoElement(searchInput, user.email);
        await wait(getSearchDelay());

        if (searchInput.value !== user.email) {
          console.log(`[BOT] searchInput was cleared/mismatched ("${searchInput.value}"), re-applying "${user.email}"`);
          setNativeValue(searchInput, user.email);
          searchInput.dispatchEvent(new Event("input", { bubbles: true }));
          searchInput.dispatchEvent(new Event("change", { bubbles: true }));
          await wait(150);
        }

        const searchBtn = Array.from(activePanel.querySelectorAll("button")).find(
          (b) => b.textContent && b.textContent.includes("Tìm kiếm"),
        );
        if (searchBtn) {
          console.log("[BOT] Triggering search via Enter and Click...");
          searchInput.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "Enter",
              code: "Enter",
              keyCode: 13,
              which: 13,
              bubbles: true,
            }),
          );
          await wait(Math.max(120, Math.floor(getSearchDelay() / 4)));
          robustClick(searchBtn);
        }
        await wait(getSearchResultWait());

        let resultRow = null;
        const pollAttempts = Math.max(3, Math.ceil(getSearchResultWait() / 300));
        for (let i = 0; i < pollAttempts; i++) {
          const tbody = document.querySelector("tbody.MuiTableBody-root");
          if (tbody) {
            const allRows = Array.from(tbody.querySelectorAll("tr"));
            resultRow = allRows.find((tr) => {
              const text = (tr.textContent || "").toLowerCase();
              return text.includes(user.email.toLowerCase()) && tr.querySelector("td");
            });
            if (!resultRow) {
              const noData =
                (tbody.textContent || "").toLowerCase().includes("không có dữ liệu") ||
                (tbody.textContent || "").toLowerCase().includes("no data");
              if (noData) break;
            }
          }
          if (resultRow) break;
          await wait(300);
        }

        const shouldUpdate = tmStorage.getItem("tm_bot_update_existing") === "true";
        const shouldCreate = tmStorage.getItem("tm_bot_create_missing") !== "false";

        if (resultRow) {
          if (!shouldUpdate) {
            console.log(`[BOT] User ${user.email} exists. (Update disabled) Skipping.`);
            return true;
          }
          console.log("[BOT] User found. Clicking Edit link...");
          const editLink = resultRow.querySelector('a[href*="/update"]');
          const editBtn = editLink || resultRow.querySelector("button");

          if (editLink) {
            editLink.click();
          } else if (editBtn) {
            editBtn.click();
          } else {
            resultRow.click();
          }
          await wait(getOpenPageDelay());
        } else {
          if (!shouldCreate) {
            console.log(`[BOT] User ${user.email} not found. (Create disabled) Skipping.`);
            return true;
          }
          console.log("[BOT] User not found. Creating new...");
          const addBtn = Array.from(document.querySelectorAll("button")).find(
            (b) => b.textContent && b.textContent.includes("Thêm mới"),
          );
          if (addBtn) {
            addBtn.click();
            await wait(getOpenPageDelay());
          } else {
            console.error("[BOT] 'Thêm mới' button not found.");
            return false;
          }
        }
      } else {
        const addBtn = Array.from(document.querySelectorAll("button")).find(
          (b) => b.textContent && b.textContent.includes("Thêm mới"),
        );
        if (!addBtn) {
          await wait(getOpenPageDelay());
          const retryAddBtn = Array.from(document.querySelectorAll("button")).find(
            (b) => b.textContent && b.textContent.includes("Thêm mới"),
          );
          if (retryAddBtn) {
            retryAddBtn.click();
            await wait(getOpenPageDelay());
          } else {
            console.error("[BOT] 'Thêm mới' button not found. Account may lack permission to create users.");
            throw new Error("Could not find 'Thêm mới' button. Account may lack permission to create users or drawer is closed.");
          }
        } else {
          addBtn.click();
          await wait(getOpenPageDelay());
        }
      }
    }

    const form = document.querySelector("form") || document.querySelector(".MuiDrawer-paperAnchorRight form");
    if (!form) throw new Error("Could not find user creation form");

    const emailInput = form.querySelector('input[name="email"]') || form.querySelector('input[type="email"]');
    const isUpdate =
      emailInput &&
      (emailInput.disabled ||
        emailInput.readOnly ||
        (emailInput.value && emailInput.value.toLowerCase() === (user.email || "").toLowerCase()));

    const updateFields = async () => {
      console.log(`[BOT] Filling fields for ${user.email || "new user"}...`);

      if (user.name) await smartFill(form, user.name, "name", "Nhập họ tên");
      if (!isUpdate && user.email) await smartFill(form, user.email, "email", "Nhập địa chỉ email");
      if (user.password) await smartFill(form, user.password, "password", "******");
      if (user.phone) await smartFill(form, user.phone, null, "Nhập số điện thoại");
      if (user.employee_code) await smartFill(form, user.employee_code, "employeeCode", "Nhập mã nhân viên");
      if (user.birthday) await smartFill(form, user.birthday, null, "dd/mm/yyyy");

      if (user.gender) {
        const genderLabel = Array.from(form.querySelectorAll("label, span")).find(
          (el) => el.textContent && el.textContent.trim() === user.gender,
        );
        if (genderLabel) {
          const radio =
            genderLabel.querySelector('input[type="radio"]') ||
            genderLabel.parentElement.querySelector('input[type="radio"]');
          if (radio) radio.click();
        }
      }

      if (user.department) await fillAutocomplete(form, "Chọn phòng ban", user.department);
      if (user.job_title) await fillAutocomplete(form, "Chọn chức vụ", user.job_title);
      if (user.role) await fillAutocomplete(form, "Chọn vai trò", user.role);
      if (user.branch) await fillAutocomplete(form, "Chọn chi nhánh", user.branch);
    };

    await updateFields();
    await wait(800);

    if (!dryRun) {
      const saveBtn = Array.from(document.querySelectorAll("button")).find((b) => {
        const txt = (b.innerText || b.textContent || "").trim();
        return (txt.includes("Lưu lại") || txt === "Lưu") && b.offsetParent !== null;
      });

      if (!saveBtn) throw new Error("Could not find visible 'Lưu lại' button");
      if (saveBtn.disabled) throw new Error("Save button is DISABLED.");

      saveBtn.focus();
      robustClick(saveBtn);
      await wait(2500);

      const confirmBtn = Array.from(document.querySelectorAll("button")).find((b) => {
        const txt = (b.innerText || b.textContent || "").trim();
        return (txt.includes("Đồng ý") || txt.includes("Xác nhận")) && b.offsetParent !== null;
      });

      if (confirmBtn) {
        robustClick(confirmBtn);
        await wait(3000);
      }

      const errors = Array.from(form.querySelectorAll(".Mui-error, .MuiFormHelperText-root"))
        .map((e) => e.textContent.trim())
        .filter((t) => t.length > 0);

      if (errors.length > 0) throw new Error(`Form has errors: ${errors.join(" | ")}`);
    } else {
      await waitManual(`Verify data for <b>${user.name}</b> and SAVE`);
    }
    return true;
  }

  async function processApprovalSync(task, dryRun = true, items, currentIndex, allowCreate = true) {
    const LIST_PATTERN = CONFIG.PATHS.approvalList;
    const currentUrl = window.location.pathname;
    const isFormPage = () =>
      window.location.pathname.includes("createAccount") || window.location.pathname.includes("updateAccount");
    const isListPage = () => window.location.pathname.includes(LIST_PATTERN) && !isFormPage();

    console.log(`[BOT] Sync Context: isForm=${isFormPage()} isList=${isListPage()} URL=${currentUrl}`);

    if (
      !window.location.pathname.includes(LIST_PATTERN) &&
      !window.location.pathname.includes("createAccount") &&
      !window.location.pathname.includes("updateAccount")
    ) {
      console.log("[BOT] Not on approval list or form. Navigating to list...");
      const navSuccess = await safeNavigate(LIST_PATTERN, "SYNC");
      if (!navSuccess) return false;
      if (!window.location.pathname.includes(LIST_PATTERN)) {
        await new Promise(() => { });
        return false;
      }
    }

    if (isListPage()) {
      console.log("[BOT] List page: Searching for account...");
      const accountTab = Array.from(document.querySelectorAll('button[role="tab"]')).find(
        (b) => b.textContent && b.textContent.toLowerCase().includes("tài khoản"),
      );
      if (accountTab && accountTab.getAttribute("aria-selected") !== "true") {
        accountTab.click();
        await wait(1500);
      }

      const activePanel = document.querySelector('[role="tabpanel"]:not([hidden])') || document;
      const searchInput = activePanel.querySelector("#searchStr") || document.getElementById("searchStr");
      if (searchInput) {
        await typeIntoElement(searchInput, task.email);
        await wait(getSearchDelay());

        if (searchInput.value !== task.email) {
          console.log(`[BOT] searchInput was cleared/mismatched ("${searchInput.value}"), re-applying "${task.email}"`);
          setNativeValue(searchInput, task.email);
          searchInput.dispatchEvent(new Event("input", { bubbles: true }));
          searchInput.dispatchEvent(new Event("change", { bubbles: true }));
          await wait(150);
        }

        const searchBtn = Array.from(activePanel.querySelectorAll("button")).find(
          (b) => b.textContent && b.textContent.includes("Tìm kiếm"),
        );
        if (searchBtn) {
          searchInput.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "Enter",
              code: "Enter",
              keyCode: 13,
              which: 13,
              bubbles: true,
            }),
          );
          await wait(Math.max(120, Math.floor(getSearchDelay() / 4)));
          robustClick(searchBtn);
        }
        await wait(getSearchDelay() * 5);
      }

      let resultRow = null;
      for (let i = 0; i < 5; i++) {
        const allRows = Array.from(activePanel.querySelectorAll("tr"));
        resultRow = allRows.find((tr) => {
          const text = (tr.textContent || "").toLowerCase();
          return text.includes(task.email.toLowerCase()) && (tr.querySelector("td") || tr.innerText.includes("@"));
        });
        if (resultRow) break;
        await wait(1000);
      }

      if (resultRow) {
        console.log("[BOT] Account found. Clicking edit...");
        const editBtn =
          resultRow.querySelector('a[href*="/updateAccount"], button:has(svg[data-testid="EditIcon"])') ||
          Array.from(resultRow.querySelectorAll("button")).pop();
        if (editBtn) {
          editBtn.click();
          await wait(2000);
        }
      } else {
        if (!allowCreate) {
          console.log(`[BOT] Account not found for "${task.email}". allowCreate=false, so doing nothing.`);
          const nextIndex = currentIndex + 1;
          if (nextIndex < items.length) {
            tmStorage.setItem(
              "tm_bot_exec_state",
              JSON.stringify({
                items,
                currentIndex: nextIndex,
                isDryRun: dryRun,
                tab: "SYNC",
              }),
            );
          } else {
            tmStorage.removeItem("tm_bot_exec_state");
          }
          return true;
        }
        console.log("[BOT] Account not found. Creating new...");
        const addBtn =
          activePanel.querySelector('a[href*="createAccount"]') ||
          Array.from(activePanel.querySelectorAll("button")).find(
            (b) => b.textContent && b.textContent.includes("Thêm mới") && b.offsetParent !== null,
          );
        if (addBtn) addBtn.click();
        else throw new Error("Could not find Add/Edit button on Sync list page");
      }

      console.log("[BOT] Waiting for form page migration...");
      for (let attempt = 0; attempt < 15; attempt++) {
        if (isFormPage()) break;
        await wait(1000);
      }

      if (!isFormPage()) {
        console.error("[BOT] Form page did not open after selection/creation. Account may lack edit permissions.");
        throw new Error("Could not open approval flow form. Permission denied or target account not editable.");
      }
    }

    console.log("[BOT] Form page reached. Stabilizing...");
    await wait(2000);

    const isCreate = window.location.pathname.includes("createAccount");
    const labels = () => Array.from(document.querySelectorAll("p, span, label, h6"));

    if (isCreate) {
      console.log(`[BOT] Filling Target Account: ${task.email}`);
      const mainAccLabel = labels().find((l) => l.textContent && l.textContent.includes("Tài khoản áp dụng"));
      const mainAccContainer = mainAccLabel ? mainAccLabel.closest("div.sc-dnqmqq") : document;
      await fillAutocomplete(mainAccContainer, "Chọn tài khoản áp dụng", task.email);
      await wait(800);
    }

    if (!isCreate) {
      console.log("[BOT] Cleanup: Removing extra existing steps...");
      for (let attempt = 0; attempt < 10; attempt++) {
        const deleteBtns = Array.from(document.querySelectorAll("button")).filter(
          (b) =>
            (b.textContent || "").includes("Xóa") && b.classList.contains("MuiButton-textSecondary") && b.offsetParent !== null,
        );
        if (deleteBtns.length === 0) break;

        console.log(`[BOT] Deleting step... (${deleteBtns.length} remaining)`);
        deleteBtns[deleteBtns.length - 1].click();
        await wait(1000);
      }
    }

    console.log(`[BOT] Applying ${task.steps.length} steps...`);
    for (let i = 0; i < task.steps.length; i++) {
      const stepNum = i + 1;
      const stepLabelText = `Bước ${stepNum}`;
      const approver = task.steps[i].approver_email;

      let labelEl = labels().find((el) => (el.textContent || "").replace(/\s/g, " ").includes(stepLabelText));

      if (!labelEl) {
        console.log(`[BOT] Step ${stepNum} not visible. Clicking 'Thêm bước'...`);
        const addBtn = Array.from(document.querySelectorAll("button")).find(
          (b) => (b.textContent || "").includes("Thêm bước") && b.offsetParent !== null,
        );
        if (addBtn) {
          addBtn.click();
          await wait(1200);
          labelEl = labels().find((el) => (el.textContent || "").replace(/\s/g, " ").includes(stepLabelText));
        }
      }

      if (labelEl) {
        const stepContainer = labelEl.closest("div.sc-dnqmqq") || labelEl.parentElement.parentElement;
        const autocomplete = stepContainer.querySelector(".MuiAutocomplete-root");
        if (autocomplete) {
          await fillAutocomplete(autocomplete, "", approver);
          await wait(800);
        }
      }
    }

    if (!dryRun) {
      console.log("[BOT] Saving sync flow...");
      const saveBtn = Array.from(document.querySelectorAll("button")).find(
        (b) => (b.innerText || b.textContent || "").includes("Lưu lại") && b.offsetParent !== null,
      );

      if (saveBtn) {
        saveBtn.scrollIntoView({ block: "center" });
        robustClick(saveBtn);
        await wait(1500);
        const confirmBtn = Array.from(document.querySelectorAll("button")).find(
          (b) => (b.innerText || b.textContent || "").includes("Đồng ý") && b.offsetParent !== null,
        );
        if (confirmBtn) robustClick(confirmBtn);
        await wait(3000);
      }
    } else {
      await waitManual(`Verify Sync for <b>${task.email}</b> and SAVE`);
    }

    if (!isBotRunning) {
      tmStorage.removeItem("tm_bot_exec_state");
      sessionStorage.removeItem("tm_bot_exec_state");
      localStorage.removeItem("tm_bot_exec_state");
      return false;
    }

    const stateTab = tmStorage.getItem("tm_bot_tab") || "SYNC";
    const nextIndex = currentIndex + 1;
    if (nextIndex < items.length) {
      tmStorage.setItem(
        "tm_bot_exec_state",
        JSON.stringify({
          items,
          currentIndex: nextIndex,
          isDryRun: dryRun,
          tab: stateTab,
        }),
      );
    } else {
      tmStorage.removeItem("tm_bot_exec_state");
      sessionStorage.removeItem("tm_bot_exec_state");
      localStorage.removeItem("tm_bot_exec_state");
    }

    if (!isBotRunning) {
      tmStorage.removeItem("tm_bot_exec_state");
      sessionStorage.removeItem("tm_bot_exec_state");
      localStorage.removeItem("tm_bot_exec_state");
      return false;
    }

    console.log("[BOT] Sync sequence complete. Returning to list...");
    const navSuccess = await safeNavigate(LIST_PATTERN, "SYNC");
    if (!navSuccess) return false;
    if (!window.location.pathname.includes(LIST_PATTERN)) {
      await new Promise(() => { });
      return false;
    }
    return false;
  }

  async function processOrg(item, dryRun = true) {
    if (!isBotRunning) return false;
    const ORG_PATH = CONFIG.PATHS.org || "/generalSetting/companyInfomation/company?page=0";

    if (!window.location.pathname.includes("/generalSetting/companyInfomation") && !window.location.href.includes("/generalSetting/companyInfomation")) {
      console.log("[BOT] Not on organization page. Navigating to company info...");
      const navSuccess = await safeNavigate(ORG_PATH, "ORG");
      if (!navSuccess) return false;
      if (!window.location.pathname.includes("/generalSetting/companyInfomation") && !window.location.href.includes("/generalSetting/companyInfomation")) {
        await new Promise(() => { });
        return false;
      }
    }

    const tabMap = { BRANCH: 1, DEPARTMENT: 2, JOB_TITLE: 3 };
    const targetTabIndex = tabMap[item.type.toUpperCase()];
    if (targetTabIndex === undefined) throw new Error("Invalid Org type: " + item.type);

    const tabs = Array.from(document.querySelectorAll('button[role="tab"]'));
    if (tabs[targetTabIndex] && tabs[targetTabIndex].getAttribute("aria-selected") !== "true") {
      console.log(`[BOT] Switching to tab: ${item.type}`);
      tabs[targetTabIndex].click();
      await wait(Math.max(1000, Math.floor(getSearchDelay() * 2)));
    }

    const activePanel =
      document.querySelector('[role="tabpanel"]:not([hidden])') ||
      document.querySelector('.react-swipeable-view-container > div:not([aria-hidden="true"])');

    let searchInput = null;
    if (item.type.toUpperCase() === "BRANCH") searchInput = activePanel.querySelector("#name");
    else if (item.type.toUpperCase() === "DEPARTMENT") searchInput = activePanel.querySelector("#departmentName");
    else if (item.type.toUpperCase() === "JOB_TITLE") searchInput = activePanel.querySelector("#name");

    if (searchInput) {
      console.log(`[BOT] Searching for ${item.type}: ${item.name}`);
      searchInput.focus();
      setNativeValue(searchInput, item.name);
      triggerChange(searchInput);
      await wait(1500);
      const searchBtn = Array.from(activePanel.querySelectorAll("button")).find(
        (b) => b.textContent && b.textContent.includes("Tìm kiếm"),
      );
      if (searchBtn) searchBtn.click();
      await wait(getSearchDelay() * 5);
    }

    const trs = Array.from(activePanel.querySelectorAll("tr"));
    const row = trs.find((tr) => (tr.textContent || "").includes(item.name));
    const shouldUpdate = tmStorage.getItem("tm_bot_update_existing") === "true";
    const shouldCreate = tmStorage.getItem("tm_bot_create_missing") !== "false";

    if (row) {
      if (!shouldUpdate) {
        console.log(`[BOT] ${item.type} "${item.name}" already exists. (Update disabled) Skipping.`);
        return true;
      }
      console.log(`[BOT] ${item.type} "${item.name}" exists. Clicking 'Cập nhật'...`);
      const updateBtn =
        Array.from(row.querySelectorAll("button, a, svg, span")).find((el) => {
          const title = el.getAttribute("title") || el.getAttribute("aria-label") || "";
          const content = el.textContent || "";
          return title.includes("Cập nhật") || title.includes("Sửa") || content.includes("Cập nhật");
        }) ||
        row.querySelector("button:last-child") ||
        row.querySelector("a:last-child");

      if (updateBtn) {
        updateBtn.click();
        await wait(2500);
      } else {
        console.warn("[BOT] Found row but no 'Cập nhật' button. Proceeding with creation logic if allowed.");
        if (!shouldCreate) return true;
        const addBtn = Array.from(activePanel.querySelectorAll("button, a")).find(
          (b) => b.textContent && b.textContent.includes("Thêm mới"),
        );
        if (addBtn) {
          addBtn.click();
          await wait(2500);
        }
      }
    } else {
      if (!shouldCreate) {
        console.log(`[BOT] ${item.type} "${item.name}" not found. (Create disabled) Skipping.`);
        return true;
      }
      console.log(`[BOT] ${item.type} "${item.name}" not found. Creating...`);
      const addBtn = Array.from(activePanel.querySelectorAll("button, a")).find(
        (b) => b.textContent && b.textContent.includes("Thêm mới"),
      );
      if (addBtn) {
        addBtn.click();
        await wait(2500);
      } else {
        throw new Error(`Could not find 'Thêm mới' button for ${item.type}`);
      }
    }

    if (item.type.toUpperCase() === "DEPARTMENT" && window.location.pathname.includes("/department/create")) {
      console.log("[BOT] Redirected to department creation page.");
    }

    const dialog = document.querySelector('[role="dialog"]') || document;
    const form =
      dialog.querySelector("form") || dialog.querySelector(".MuiPaper-root form") || document.querySelector("form");

    if (!form) throw new Error("Could not find creation form");

    if (item.type.toUpperCase() === "BRANCH") {
      await smartFill(form, item.name, "name", "Nhập tên chi nhánh");
      if (item.address) await smartFill(form, item.address, "address", "Nhập địa chỉ");
      if (item.taxCode) await smartFill(form, item.taxCode, "taxCode", "Nhập mã số thuế");
    } else if (item.type.toUpperCase() === "DEPARTMENT") {
      await smartFill(form, item.name, "name", "Nhập tên phòng ban");
      if (item.code) await smartFill(form, item.code, "code", "Nhập mã phòng ban");
      if (item.branch) await fillAutocomplete(form, "Chọn chi nhánh", item.branch);
    } else if (item.type.toUpperCase() === "JOB_TITLE") {
      await smartFill(form, item.name, "name", "Nhập tên chức vụ");
    }

    if (!dryRun) {
      const saveBtn = Array.from(form.querySelectorAll("button")).find((b) => {
        const t = b.textContent || "";
        return t.includes("Lưu lại") || t === "Lưu";
      });
      if (saveBtn) {
        saveBtn.click();
        await wait(3000);
      }
    } else {
      await waitManual(`Verify ${item.type}: <b>${item.name}</b> and SAVE`);
    }

    return true;
  }

  async function processCleanup(task, dryRun = true, items, currentIndex) {
    const LIST_PATTERN = CONFIG.PATHS.approvalList;
    const currentUrl = window.location.pathname;

    if (!currentUrl.includes(LIST_PATTERN)) {
      if (!isBotRunning) return false;
      console.log("[BOT] Not on approval page. Navigating...");
      const navSuccess = await safeNavigate(LIST_PATTERN, "CLEANUP");
      if (!navSuccess) return false;
      if (!window.location.pathname.includes(LIST_PATTERN)) {
        await new Promise(() => { });
        return false;
      }
    }

    const userSearch =
      typeof task === "string" ? task : task.email || (task.target_user_emails && task.target_user_emails[0]);
    if (!userSearch) {
      console.error("[BOT] Invalid task for cleanup:", task);
      return true;
    }

    console.log(`[BOT] Smart Cleanup: Processing search "${userSearch}"`);

    const accountTab = Array.from(document.querySelectorAll('button[role="tab"]')).find(
      (b) => b.textContent && b.textContent.toLowerCase().includes("tài khoản"),
    );
    if (accountTab && accountTab.getAttribute("aria-selected") !== "true") {
      accountTab.click();
      await wait(1500);
    }

    const activePanel = document.querySelector('[role="tabpanel"]:not([hidden])') || document;
    const searchInput = activePanel.querySelector("#searchStr") || document.getElementById("searchStr");

    if (searchInput) {
      const currentSearch = searchInput.value.trim();
      if (currentSearch !== userSearch) {
        console.log(`[BOT] Searching for account: ${userSearch}`);
        await typeIntoElement(searchInput, userSearch);
        await wait(getSearchDelay());

        if (searchInput.value !== userSearch) {
          console.log(`[BOT] searchInput was cleared/mismatched ("${searchInput.value}"), re-applying "${userSearch}"`);
          setNativeValue(searchInput, userSearch);
          searchInput.dispatchEvent(new Event("input", { bubbles: true }));
          searchInput.dispatchEvent(new Event("change", { bubbles: true }));
          await wait(150);
        }

        const searchBtn = Array.from(activePanel.querySelectorAll("button")).find((b) => {
          const txt = (b.innerText || b.textContent || "").trim().toLowerCase();
          return (txt.includes("tìm kiếm") || txt.includes("search")) && b.offsetParent !== null;
        });
        if (searchBtn) {
          searchInput.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "Enter",
              code: "Enter",
              keyCode: 13,
              which: 13,
              bubbles: true,
            }),
          );
          await wait(Math.max(120, Math.floor(getSearchDelay() / 4)));
          robustClick(searchBtn);
          await wait(Math.max(getSearchDelay() * 5, 2000));
        }
      } else {
        console.log(`[BOT] Account "${userSearch}" already searched.`);
      }
    }

    let deletionAttempts = new Map();
    let handledRows = new Set();

    while (true) {
      if (!isBotRunning) return false;

      const rows = Array.from(activePanel.querySelectorAll("tr")).filter(
        (tr) => tr.innerText.includes("@") && !handledRows.has(tr),
      );

      if (rows.length === 0) {
        if (deletionAttempts.size === 0) {
          console.log(`[BOT] No existing flows found for "${userSearch}". Nothing to clean up.`);
        } else {
          console.log("[BOT] No more rows found for this search.");
        }
        break;
      }

      const row = rows[0];
      const rowCells = Array.from(row.querySelectorAll("td"));
      const rowText = (
        rowCells[1] ? rowCells[1].innerText : row.innerText.split("\t")[0] || row.innerText.substring(0, 50)
      ).trim();
      const attempts = deletionAttempts.get(rowText) || 0;

      let deleteBtn = Array.from(row.querySelectorAll("button")).find((b) => {
        const svg = b.querySelector("svg");
        if (!svg) return false;
        const path = svg.querySelector("path");
        return (
          path &&
          path.getAttribute("d") &&
          (path.getAttribute("d").startsWith("M5.75") || path.getAttribute("d").startsWith("M15.12"))
        );
      });

      if (deleteBtn && !deleteBtn.disabled && attempts < 1) {
        console.log(`[BOT] Deleting row: ${rowText}`);
        deletionAttempts.set(rowText, attempts + 1);

        if (!dryRun) {
          robustClick(deleteBtn);
          await wait(2000);
          const confirmBtn = Array.from(document.querySelectorAll('button, [role="button"]')).find((b) => {
            const txt = (b.innerText || b.textContent || "").trim().toLowerCase();
            return (txt.includes("đồng ý") || txt.includes("xác nhận") || txt.includes("xóa")) && b.offsetParent !== null;
          });
          if (confirmBtn) {
            robustClick(confirmBtn);
            await wait(3500);
            continue;
          }
        } else {
          await waitManual("Verify deletion and click DELETE/CONFIRM manually");
          break;
        }
      } else {
        console.log(`[BOT] Row persists or protected (${rowText}).`);
        const editBtn =
          row.querySelector('a[href*="/updateAccount"], button:has(svg[data-testid="EditIcon"])') ||
          Array.from(row.querySelectorAll("button")).pop();

        const steps = task.approval_steps || task.steps;
        if (editBtn && typeof task === "object" && steps) {
          console.log(`[BOT] Switching to UPDATE fallback for persistent row: ${rowText}`);
          editBtn.click();
          await wait(2500);
          const syncTask = { email: userSearch, steps: steps };
          const res = await processApprovalSync(syncTask, dryRun, items, currentIndex, false);
          if (res === false) return false;
          console.log(`[BOT] Finished Smart Sync for persistent row: ${userSearch}`);
        } else {
          console.warn(`[BOT] Finished with user (row persists and no sync data): ${userSearch}`);
        }
        break;
      }
    }

    if (!isBotRunning) {
      tmStorage.removeItem("tm_bot_exec_state");
      sessionStorage.removeItem("tm_bot_exec_state");
      localStorage.removeItem("tm_bot_exec_state");
      return false;
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < items.length) {
      tmStorage.setItem(
        "tm_bot_exec_state",
        JSON.stringify({
          items,
          currentIndex: nextIndex,
          isDryRun: dryRun,
          tab: "CLEANUP",
        }),
      );
    } else {
      tmStorage.removeItem("tm_bot_exec_state");
      sessionStorage.removeItem("tm_bot_exec_state");
      localStorage.removeItem("tm_bot_exec_state");
    }

    return true;
  }

  // =========================================================================
  // 6. BOT RUNNER LOOP & HUD CONTROLLER
  // =========================================================================
  function disableConfigCheckboxes(pane) {
    if (!pane) return;
    pane.querySelectorAll(".tm-dryrun-chk, .tm-update-chk, .tm-create-chk").forEach((c) => (c.disabled = true));
  }

  function enableConfigCheckboxes(pane) {
    if (!pane) return;
    pane.querySelectorAll(".tm-dryrun-chk, .tm-update-chk, .tm-create-chk").forEach((c) => (c.disabled = false));
  }

  function updateHUD(tab, stats, currentItemName, statusText, statusType) {
    const pane = document.getElementById(`pane_${tab}`);
    if (!pane) return;

    const hudCard = pane.querySelector(".tm-hud-card");
    const logContainer = pane.querySelector(".tm-log-container");
    if (hudCard) hudCard.style.display = "block";
    if (logContainer) logContainer.style.display = "block";

    const total = stats ? stats.total || 0 : 0;
    const current = stats ? Math.min(total, stats.current || 0) : 0;
    const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

    const fillEl = pane.querySelector(".tm-hud-progress-fill");
    if (fillEl) fillEl.style.width = `${pct}%`;

    const pctEl = pane.querySelector(".tm-hud-pct");
    if (pctEl) pctEl.innerText = `${pct}%`;

    const idxEl = pane.querySelector(".tm-hud-idx");
    if (idxEl) idxEl.innerText = String(current);

    const totalEl = pane.querySelector(".tm-hud-total");
    if (totalEl) totalEl.innerText = String(total);

    const triggerBump = (el, nextVal) => {
      if (!el) return;
      const prevVal = el.innerText;
      if (prevVal !== nextVal && prevVal !== "0") {
        const badge = el.closest(".tm-badge");
        if (badge) {
          badge.classList.remove("tm-bump");
          void badge.offsetWidth;
          badge.classList.add("tm-bump");
        }
      }
      el.innerText = nextVal;
    };

    const successEl = pane.querySelector(".tm-count-success");
    if (successEl) triggerBump(successEl, String((stats && stats.success) || 0));

    const failedEl = pane.querySelector(".tm-count-failed");
    if (failedEl) triggerBump(failedEl, String((stats && stats.failed) || 0));

    const skippedEl = pane.querySelector(".tm-count-skipped");
    if (skippedEl) triggerBump(skippedEl, String((stats && stats.skipped) || 0));

    const badgeEl = pane.querySelector(".tm-hud-status-badge");
    if (badgeEl && statusText) {
      badgeEl.innerText = statusText;
      badgeEl.className = `tm-hud-status-badge tm-status-${statusType || "running"}`;
    }

    const itemNameEl = pane.querySelector(".tm-hud-item-name");
    if (itemNameEl && currentItemName !== undefined) {
      if (currentItemName && statusText && currentItemName.trim().toLowerCase() === statusText.trim().toLowerCase()) {
        // Prevent duplicate status display in item name
      } else {
        itemNameEl.innerText = currentItemName || "—";
        itemNameEl.title = currentItemName || "";
      }
    }

    const errFilterCount = pane.querySelector(".tm-filter-err-count");
    if (errFilterCount) errFilterCount.innerText = String((stats && stats.failed) || 0);

    updateTabRunningIndicators();
  }

  function appendLog(tab, msg, level = "info") {
    const timeStr = new Date().toLocaleTimeString();
    const entry = { time: timeStr, msg, level };

    try {
      const logsJson = sessionStorage.getItem("tm_bot_exec_logs") || "[]";
      const logs = JSON.parse(logsJson);
      logs.push(entry);
      if (logs.length > 500) logs.shift();
      sessionStorage.setItem("tm_bot_exec_logs", JSON.stringify(logs));
    } catch (e) { }

    const pane = document.getElementById(`pane_${tab}`);
    const logEl = pane ? pane.querySelector(".tm-log") : null;
    if (logEl) {
      const entryDiv = document.createElement("div");
      entryDiv.className = `tm-log-entry tm-log-${level}`;
      entryDiv.setAttribute("data-level", level);

      let badgeLabel = level.toUpperCase();
      if (level === "success") badgeLabel = "DONE";
      if (level === "error") badgeLabel = "ERR";
      if (level === "warn") badgeLabel = "WARN";

      entryDiv.innerHTML = `
        <span class="tm-log-time">${timeStr}</span>
        <span class="tm-log-tag tm-tag-${level}">${badgeLabel}</span>
        <span class="tm-log-msg">${msg}</span>
      `;
      logEl.appendChild(entryDiv);

      const isNearBottom = logEl.scrollHeight - logEl.scrollTop - logEl.clientHeight < 70;
      if (isNearBottom) {
        logEl.scrollTop = logEl.scrollHeight;
      }
    }
  }

  function restoreLogs(tab) {
    const pane = document.getElementById(`pane_${tab}`);
    const logEl = pane ? pane.querySelector(".tm-log") : null;
    if (!logEl) return;
    try {
      const logsJson = sessionStorage.getItem("tm_bot_exec_logs");
      if (!logsJson) return;
      const logs = JSON.parse(logsJson);
      logEl.innerHTML = "";
      logs.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.className = `tm-log-entry tm-log-${entry.level}`;
        entryDiv.setAttribute("data-level", entry.level);
        let badgeLabel = entry.level.toUpperCase();
        if (entry.level === "success") badgeLabel = "DONE";
        if (entry.level === "error") badgeLabel = "ERR";
        if (entry.level === "warn") badgeLabel = "WARN";

        entryDiv.innerHTML = `
          <span class="tm-log-time">${entry.time}</span>
          <span class="tm-log-tag tm-tag-${entry.level}">${badgeLabel}</span>
          <span class="tm-log-msg">${entry.msg}</span>
        `;
        logEl.appendChild(entryDiv);
      });
      logEl.scrollTop = logEl.scrollHeight;
    } catch (e) { }
  }

  async function startBotLoop(items, startIndex, isDryRun, tab) {
    const statusEl = document.getElementById("tmBotStatus");
    const activePane = document.getElementById(`pane_${tab}`);
    const startBtn = activePane ? activePane.querySelector(".tm-btn-run") : null;
    const pauseBtn = activePane ? activePane.querySelector(".tm-btn-pause") : null;
    const skipBtn = activePane ? activePane.querySelector(".tm-btn-skip") : null;
    const stopBtn = activePane ? activePane.querySelector(".tm-btn-stop") : null;

    isBotRunning = true;
    isBotPaused = false;
    skipCurrentRequested = false;

    if (startIndex === 0) {
      execStats = { total: items.length, current: 0, success: 0, failed: 0, skipped: 0 };
      sessionStorage.removeItem("tm_bot_exec_logs");
      const logEl = activePane ? activePane.querySelector(".tm-log") : null;
      if (logEl) logEl.innerHTML = "";
    } else {
      if (!execStats || execStats.total !== items.length) {
        execStats = {
          total: items.length,
          current: startIndex,
          success: startIndex,
          failed: 0,
          skipped: 0,
        };
      }
      restoreLogs(tab);
    }

    if (statusEl) {
      statusEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px;"></i>Running...`;
      statusEl.className = "tm-status tm-status-inline tm-status-running";
    }
    if (startBtn) {
      startBtn.disabled = true;
      startBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px;"></i>Running...`;
    }
    if (pauseBtn) {
      pauseBtn.innerHTML = `<i class="fa-solid fa-pause" style="margin-right:4px;"></i>Pause`;
      pauseBtn.classList.add("tm-visible");
    }
    if (skipBtn) {
      skipBtn.innerHTML = `<i class="fa-solid fa-forward-step" style="margin-right:4px;"></i>Skip`;
      skipBtn.classList.add("tm-visible");
    }
    if (stopBtn) {
      stopBtn.innerHTML = `<i class="fa-solid fa-stop" style="margin-right:4px;"></i>Stop`;
      stopBtn.classList.add("tm-visible");
    }

    disableConfigCheckboxes(activePane);
    updateTabRunningIndicators();

    updateHUD(
      tab,
      execStats,
      items[startIndex]?.email || items[startIndex]?.name || `Item ${startIndex + 1}`,
      "Starting",
      "running",
    );

    if (startIndex === 0) appendLog(tab, `Starting ${tab} automation (${items.length} items)...`, "info");
    else appendLog(tab, `Resuming index ${startIndex + 1} of ${items.length}...`, "info");

    for (let i = startIndex; i < items.length; i++) {
      if (!isBotRunning) {
        stopBot();
        break;
      }

      // Handle Skip request
      if (skipCurrentRequested) {
        skipCurrentRequested = false;
        execStats.skipped++;
        execStats.current = i + 1;
        const skipLabel = items[i]?.email || items[i]?.name || `Item ${i + 1}`;
        updateHUD(tab, execStats, skipLabel, "Skipped", "paused");
        appendLog(tab, `<i class="fa-solid fa-forward-step" style="margin-right:4px;"></i>Skipped index ${i + 1}: ${skipLabel}`, "warn");
        continue;
      }

      // Handle Pause request
      if (isBotPaused) {
        updateHUD(tab, execStats, items[i].email || items[i].name, "Paused", "paused");
        if (statusEl) {
          statusEl.innerHTML = `<i class="fa-solid fa-circle-pause" style="margin-right:4px;"></i>Paused`;
          statusEl.className = "tm-status tm-status-inline tm-status-paused";
        }
        while (isBotPaused && isBotRunning && !skipCurrentRequested) {
          await wait(200);
        }
        if (!isBotRunning) {
          stopBot();
          break;
        }
        if (skipCurrentRequested) {
          skipCurrentRequested = false;
          execStats.skipped++;
          execStats.current = i + 1;
          const skipLabel = items[i]?.email || items[i]?.name || `Item ${i + 1}`;
          updateHUD(tab, execStats, skipLabel, "Skipped", "paused");
          appendLog(tab, `<i class="fa-solid fa-forward-step" style="margin-right:4px;"></i>Skipped index ${i + 1}: ${skipLabel}`, "warn");
          continue;
        }
        if (statusEl) {
          statusEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px;"></i>Running...`;
          statusEl.className = "tm-status tm-status-inline tm-status-running";
        }
      }

      const item = items[i];
      const label = item.email || item.name || `Item ${i + 1}`;
      execStats.current = i;
      updateHUD(tab, execStats, label, "Processing", "running");
      appendLog(tab, `Processing (${i + 1}/${items.length}): ${label}`, "info");

      tmStorage.setItem(
        "tm_bot_exec_state",
        JSON.stringify({ items, currentIndex: i, isDryRun, tab, stats: execStats }),
      );

      try {
        let isDone = false;
        if (tab === "USER") {
          isDone = await processUser(item, isDryRun);
        } else if (tab === "ORG") {
          isDone = await processOrg(item, isDryRun);
        } else if (tab === "CLEANUP") {
          isDone = await processCleanup(item, isDryRun, items, i);
        } else {
          isDone = await processApprovalSync(item, isDryRun, items, i);
        }

        if (!isBotRunning) {
          stopBot();
          break;
        }

        if (isDone) {
          execStats.success++;
          execStats.current = i + 1;
          updateHUD(tab, execStats, label, "Done", "running");
          appendLog(tab, `✓ Finished index ${i + 1} (${label})`, "success");

          const nextIdx = i + 1;
          if (nextIdx < items.length) {
            if (isBotRunning) {
              tmStorage.setItem(
                "tm_bot_exec_state",
                JSON.stringify({ items, currentIndex: nextIdx, isDryRun, tab, stats: execStats }),
              );
            }
          } else {
            tmStorage.removeItem("tm_bot_exec_state");
            sessionStorage.removeItem("tm_bot_exec_state");
            localStorage.removeItem("tm_bot_exec_state");
          }
          await wait(2500);
          if (!isBotRunning) {
            stopBot();
            break;
          }
        } else {
          return;
        }
      } catch (err) {
        if (!isBotRunning) {
          stopBot();
          break;
        }
        execStats.failed++;
        execStats.current = i;
        updateHUD(tab, execStats, label, "Error", "paused");
        appendLog(tab, `✗ Error at index ${i + 1} (${label}): ${err.message}`, "error");

        isBotPaused = true;
        if (statusEl) {
          statusEl.innerHTML = `<i class="fa-solid fa-circle-pause" style="margin-right:4px;"></i>Paused on Error`;
          statusEl.className = "tm-status tm-status-inline tm-status-paused";
        }
        if (pauseBtn) pauseBtn.innerHTML = `<i class="fa-solid fa-play" style="margin-right:4px;"></i>Resume`;
        if (startBtn) {
          startBtn.disabled = false;
          startBtn.innerHTML = `<i class="fa-solid fa-play" style="margin-right:4px;"></i>Resume`;
        }
        enableConfigCheckboxes(activePane);

        while (isBotPaused && isBotRunning && !skipCurrentRequested) {
          await wait(250);
        }
        if (!isBotRunning) {
          stopBot();
          return;
        }

        if (skipCurrentRequested) {
          skipCurrentRequested = false;
          execStats.skipped++;
          execStats.current = i + 1;
          updateHUD(tab, execStats, label, "Skipped", "paused");
          appendLog(tab, `<i class="fa-solid fa-forward-step" style="margin-right:4px;"></i>Skipped index ${i + 1}: ${label}`, "warn");
          continue;
        }

        // Retry current item
        i--;
        continue;
      }
    }

    if (isBotRunning) {
      tmStorage.removeItem("tm_bot_exec_state");
      sessionStorage.removeItem("tm_bot_exec_state");
      localStorage.removeItem("tm_bot_exec_state");
      execStats.current = items.length;
      updateHUD(tab, execStats, "All items processed", "Complete", "running");
      appendLog(
        tab,
        `<i class="fa-solid fa-circle-check" style="margin-right:4px;"></i>Completed all ${items.length} items! (<i class="fa-solid fa-check" style="color:var(--color-success);"></i> ${execStats.success} Success | <i class="fa-solid fa-xmark" style="color:var(--color-error);"></i> ${execStats.failed} Errors | <i class="fa-solid fa-forward-step" style="color:var(--color-warning);"></i> ${execStats.skipped} Skipped)`,
        "success",
      );

      if (statusEl) {
        statusEl.innerHTML = `<i class="fa-solid fa-circle-check" style="margin-right:4px;"></i>Complete!`;
        statusEl.className = "tm-status tm-status-inline tm-status-complete";
      }
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.innerHTML = `<i class="fa-solid fa-play" style="margin-right:4px;"></i>Run`;
      }
      if (pauseBtn) pauseBtn.classList.remove("tm-visible");
      if (skipBtn) skipBtn.classList.remove("tm-visible");
      if (stopBtn) stopBtn.classList.remove("tm-visible");
      enableConfigCheckboxes(activePane);

      const icon = document.getElementById("tm-bot-icon");
      if (icon) {
        icon.classList.remove("tm-running");
        icon.classList.add("tm-stopping");
      }
      setTimeout(() => {
        isBotRunning = false;
        if (icon) icon.classList.remove("tm-stopping");
      }, 1200);
    }
  }

  // =========================================================================
  // 7. DATA FORMATTING & SQL GENERATION UTILITIES
  // =========================================================================
  function highlightCode(text, lang) {
    if (!text) return "";
    const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (lang === "json") {
      return escaped.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
          let cls = "hl-num";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) cls = "hl-key";
            else cls = "hl-string";
          } else if (/true|false/.test(match)) {
            cls = "hl-bool";
          } else if (/null/.test(match)) {
            cls = "hl-num";
          }
          return '<span class="' + cls + '">' + match + "</span>";
        },
      );
    } else if (lang === "sql") {
      const keywords =
        /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|AND|OR|JOIN|ON|SET|IN|EXISTS|NOT|CURRENT_TIMESTAMP|INTO|VALUES|CREATE|TABLE|DATABASE|ALTER|DROP|TRUNCATE)\b/gi;
      return escaped
        .replace(/(--.*)/g, '<span class="hl-comment">$1</span>')
        .replace(/('[^']*')/g, '<span class="hl-string">$1</span>')
        .replace(keywords, '<span class="hl-keyword">$1</span>');
    }
    return escaped;
  }

  function flattenData(data, tab) {
    if (tab !== "SYNC" && tab !== "CLEANUP") return Array.isArray(data) ? data : [data];
    const raw = Array.isArray(data) ? data : [data];
    const flat = [];
    raw.forEach((group) => {
      if (group.target_user_emails && Array.isArray(group.target_user_emails)) {
        group.target_user_emails.forEach((email) => {
          flat.push({
            email: email,
            steps: group.approval_steps || group.steps || [],
            notes: group.notes,
          });
        });
      } else if (group.email) {
        flat.push(group);
      }
    });
    return flat;
  }

  const F88_EMAIL_TO_LEVEL = {
    "anhnhp@f88.vn": "cap_5",
    "bichnn@f88.vn": "cap_5",
    "binhltc@f88.vn": "cap_5",
    "binhnx@f88.vn": "cap_4",
    "chungbd2@f88.vn": "cap_5",
    "diemnk@f88.vn": "cap_4",
    "dinhdd2@f88.vn": "cap_5",
    "gamhtk@f88.vn": "cap_5",
    "giangpnt2@f88.vn": "cap_5",
    "haibh@f88.vn": "cap_4",
    "hangnt@f88.vn": "cap_5",
    "hangntm3@f88.vn": "cap_3",
    "hangttm@f88.vn": "cap_5",
    "hangvt2@f88.vn": "cap_5",
    "hannp@f88.vn": "cap_4",
    "hant@f88.vn": "cap_5",
    "hiennt14@f88.vn": "cap_4",
    "hientt2@f88.vn": "cap_5",
    "hieudg@f88.vn": "cap_3",
    "hieudq@f88.vn": "cap_4",
    "hoanglb@f88.vn": "cap_4",
    "huongnt@f88.vn": "cap_4",
    "huongny@f88.vn": "cap_5",
    "huyentt4@f88.vn": "cap_3",
    "khaind2@f88.vn": "cap_5",
    "khoann3@f88.vn": "cap_5",
    "khoidt@f88.vn": "cap_4",
    "khoinx@f88.vn": "cap_5",
    "lamnt@f88.vn": "cap_3",
    "liendn@f88.vn": "cap_4",
    "linhhd3@f88.vn": "cap_5",
    "linhlk@f88.vn": "cap_5",
    "linhnn5@f88.vn": "cap_4",
    "linhpn2@f88.vn": "cap_4",
    "linhtk3@f88.vn": "cap_5",
    "linhtran@f88.vn": "cap_4",
    "loanbtn@f88.vn": "cap_4",
    "lyth@f88.vn": "cap_5",
    "lytt@f88.vn": "cap_4",
    "lyttp@f88.vn": "cap_5",
    "mainht@f88.vn": "cap_5",
    "maintt3@f88.vn": "cap_5",
    "maivtk@f88.vn": "cap_5",
    "manhv@f88.vn": "cap_4",
    "minhnv2@f88.vn": "cap_5",
    "minhpt@f88.vn": "cap_5",
    "myntp@f88.vn": "cap_5",
    "nganpnh@f88.vn": "cap_4",
    "nhannt3@f88.vn": "cap_3",
    "nhanpt2@f88.vn": "cap_4",
    "nhattn2@f88.vn": "cap_5",
    "nhungth3@f88.vn": "cap_5",
    "phuongnh3@f88.vn": "cap_4",
    "phutp@f88.vn": "cap_3",
    "quyenbv@f88.vn": "cap_5",
    "sangnv@f88.vn": "cap_4",
    "sinhnh@f88.vn": "cap_5",
    "tamnm@f88.vn": "cap_3",
    "thaotm2@f88.vn": "cap_2",
    "thientn4@f88.vn": "cap_5",
    "thonght@f88.vn": "cap_5",
    "thuntm6@f88.vn": "cap_5",
    "thuynt16@f88.vn": "cap_5",
    "thuyntt17@f88.vn": "cap_3",
    "tinbn@f88.vn": "cap_2",
    "toandv@f88.vn": "cap_4",
    "toannv2@f88.vn": "cap_3",
    "toantq2@f88.vn": "cap_5",
    "tranghh@f88.vn": "cap_5",
    "tranght2@f88.vn": "cap_5",
    "tranglq@f88.vn": "cap_3",
    "trangnh@f88.vn": "cap_5",
    "tranh3@f88.vn": "cap_5",
    "trannth@f88.vn": "cap_5",
    "trinhpt@f88.vn": "cap_4",
    "trungdv2@f88.vn": "cap_5",
    "trungnd9@f88.vn": "cap_5",
    "truongpq2@f88.vn": "cap_5",
    "tuongdv@f88.vn": "cap_5",
    "viettt2@f88.vn": "cap_2",
    "vinhdq@f88.vn": "cap_4"
  };

  function getF88LevelFromJobTitle(jobTitle) {
    if (!jobTitle) return null;
    const title = jobTitle.trim().toLowerCase();
    if (/(tổng giám đốc|tong giam doc|ceo)/.test(title)) {
      if (!/(phó|pho|trợ lý|tro ly)/.test(title)) return "cap_1";
    }
    if (/(phó tổng giám đốc|pho tong giam doc|giám đốc khối|giam doc khoi|ban kiểm soát|ban kiem soat)/.test(title)) {
      if (!/(trợ lý|tro ly)/.test(title)) return "cap_2";
    }
    if (/(giám đốc|giam doc|phó giám đốc|pho giam doc|kế toán trưởng|ke toan truong|cố vấn|co van)/.test(title)) {
      if (!/(khối|khoi|phó tổng|pho tong|trợ lý|tro ly)/.test(title)) return "cap_3";
    }
    if (/(trưởng phòng|truong phong|phó phòng|pho phong|chuyên gia|chuyen gia|giám sát|giam sat|trưởng nhóm \(bậc 5\)|trợ lý|tro ly|quản lý vùng|quan ly vung|trợ lý giám đốc khối|tro ly giam doc khoi)/.test(title)) {
      return "cap_4";
    }
    if (/(nhân viên|nhan vien|chuyên viên|chuyen vien|thư ký|thu ky|trưởng nhóm|truong nhom|quản lý khu vực|quan ly khu vuc|giao dịch|giao dich|kinh doanh|admin|chuyên viên cao cấp|chuyen vien cao cap|chuyên viên chính|chuyen vien chinh)/.test(title)) {
      return "cap_5";
    }
    return "cap_5";
  }

  function generateBudgetSQL(inputData, companyKey = "dong_a") {
    let output = `-- BATCH BUDGET UPDATE SCRIPT\n-- Generated via Bot UI for ${CONFIG.COMPANIES[companyKey]?.name || companyKey}\n\n`;

    const companyConfig = CONFIG.COMPANIES[companyKey];
    if (!companyConfig) {
      return `-- Error: Company configuration not found for '${companyKey}'`;
    }

    // Standardize inputData to grouped emails by level
    let grouped = {};
    let allEmails = [];
    let businessEmails = [];
    let economyEmails = [];

    if (Array.isArray(inputData)) {
      // It's a flat array of emails or user objects
      inputData.forEach((item) => {
        let email = "";
        let level = null;
        let jobTitle = "";

        if (typeof item === "string") {
          email = item.trim();
          if (companyKey === "f88") {
            level = F88_EMAIL_TO_LEVEL[email] || "cap_5";
          } else {
            // Default level for Dong A if flat email list
            level = "550";
          }
        } else if (item && typeof item === "object") {
          email = (item.email || "").trim();
          if (companyKey === "f88") {
            jobTitle = item.job_title || item.jobTitle || "";
            level = getF88LevelFromJobTitle(jobTitle) || F88_EMAIL_TO_LEVEL[email] || "cap_5";
          } else {
            // Default level for Dong A if job title or level is not explicitly found
            level = item.level || "550";
          }
        }

        if (email && level) {
          if (!grouped[level]) grouped[level] = [];
          grouped[level].push(email);
          allEmails.push(email);

          if (companyKey === "f88") {
            const titleLower = jobTitle.toLowerCase();
            let isBusiness = false;
            if (/(tổng giám đốc|tong giam doc|phó tổng giám đốc|pho tong giam doc|ceo|hđqt|hdqt)/.test(titleLower)) {
              if (!/(trợ lý|tro ly)/.test(titleLower)) {
                isBusiness = true;
              }
            }
            if (isBusiness) {
              businessEmails.push(email);
            } else {
              economyEmails.push(email);
            }
          }
        }
      });
    } else if (inputData && typeof inputData === "object") {
      // It's already grouped by level/tier, e.g. {"cap_5": [...], "550": [...]}
      grouped = inputData;
      // Extract all emails for ticket class settings if f88
      if (companyKey === "f88") {
        for (const level in grouped) {
          const emails = grouped[level] || [];
          emails.forEach((email) => {
            allEmails.push(email);
            // Since we don't have job titles from pre-grouped JSON, default to lookup map
            let isBusiness = false;
            // Let's look up if this email is business class (none in our pre-compiled list, but let's check format)
            if (isBusiness) {
              businessEmails.push(email);
            } else {
              economyEmails.push(email);
            }
          });
        }
      }
    }

    const tiers = companyConfig.tiers;
    for (const level in tiers) {
      const emails = grouped[level] || [];
      if (emails.length === 0) continue;

      const tier = tiers[level];
      if (!tier) continue;

      const emailsSql = emails.map((e) => `'${e}'`).join(", ");
      const provinceBudgetSql = tier.province_budget.replace(/'/g, "''");

      // For F88, we disable allow_all_ticket_classes (set to 0), whereas for Dong A we keep it enabled (1)
      const allowAllTicketVal = companyKey === "f88" ? 0 : 1;
      const updatedByVal = companyKey === "dong_a" ? "Admin Office" : "system";

      output += `-- ========================================\n`;
      output += `-- Automated Budget Update for Tier: ${tier.name}\n`;
      output += `-- ========================================\n`;
      output += `-- 1. Update Global Policies\n`;
      output += `UPDATE user_budget_policies ubp JOIN user u ON ubp.user_id = u.id SET ubp.hotel_budget = ${tier.hotel_budget}, ubp.allow_all_ticket_classes = ${allowAllTicketVal}, ubp.updated_by = '${updatedByVal}', ubp.updated = CURRENT_TIMESTAMP WHERE u.email IN (${emailsSql});\n\n`;
      output += `-- 2. Insert Missing Global Policies\n`;
      output += `INSERT INTO user_budget_policies (company_id, user_id, flight_budget, hotel_budget, budget_per_month, allow_all_ticket_classes, allow_all_airlines, max_hotel_stars, currency_code, status, created_by, updated_by) SELECT u.company_id, u.id, 0, ${tier.hotel_budget}, -1, ${allowAllTicketVal}, 1, 5, 'VND', 0, '${updatedByVal}', '${updatedByVal}' FROM user u WHERE u.email IN (${emailsSql}) AND NOT EXISTS (SELECT 1 FROM user_budget_policies ubp WHERE ubp.user_id = u.id);\n\n`;
      output += `-- 3. Update Regional Overrides\n`;
      output += `UPDATE user_budget_policies_by_regions r JOIN user_budget_policies ubp ON r.policies_id = ubp.id JOIN user u ON ubp.user_id = u.id SET r.budget = ${tier.hotel_budget}, r.province_budget = '${provinceBudgetSql}' WHERE u.email IN (${emailsSql});\n\n`;
      output += `-- 4. Insert Missing Regional Overrides\n`;
      output += `INSERT INTO user_budget_policies_by_regions (policies_id, budget, country_code, product_type, province_budget, max_hotel_star) SELECT ubp.id, ${tier.hotel_budget}, 'VN', 'hotel', '${provinceBudgetSql}', 5 FROM user_budget_policies ubp JOIN user u ON ubp.user_id = u.id WHERE u.email IN (${emailsSql}) AND NOT EXISTS (SELECT 1 FROM user_budget_policies_by_regions r WHERE r.policies_id = ubp.id);\n\n`;
    }

    if (companyKey === "f88" && allEmails.length > 0) {
      const allEmailsSql = allEmails.map((e) => `'${e}'`).join(", ");
      output += `-- ========================================\n`;
      output += `-- Ticket Class Settings Mapping (By Job Title)\n`;
      output += `-- ========================================\n`;
      output += `-- 1. Clear existing ticket class settings\n`;
      output += `DELETE tc FROM user_budget_policies_ticket_class_setting tc JOIN user_budget_policies ubp ON tc.user_budget_policies_id = ubp.id JOIN user u ON ubp.user_id = u.id WHERE u.email IN (${allEmailsSql});\n\n`;

      if (economyEmails.length > 0) {
        const ecoEmailsSql = economyEmails.map((e) => `'${e}'`).join(", ");
        output += `-- 2. Insert Economy (5) for Economy Class job titles\n`;
        output += `INSERT INTO user_budget_policies_ticket_class_setting (user_budget_policies_id, ticket_class_setting_id) SELECT ubp.id, 5 FROM user_budget_policies ubp JOIN user u ON ubp.user_id = u.id WHERE u.email IN (${ecoEmailsSql});\n\n`;
      }

      if (businessEmails.length > 0) {
        const bizEmailsSql = businessEmails.map((e) => `'${e}'`).join(", ");
        output += `-- 3. Insert Economy (5) and Business (7) for Business Class job titles\n`;
        output += `INSERT INTO user_budget_policies_ticket_class_setting (user_budget_policies_id, ticket_class_setting_id) SELECT ubp.id, 5 FROM user_budget_policies ubp JOIN user u ON ubp.user_id = u.id WHERE u.email IN (${bizEmailsSql});\n`;
        output += `INSERT INTO user_budget_policies_ticket_class_setting (user_budget_policies_id, ticket_class_setting_id) SELECT ubp.id, 7 FROM user_budget_policies ubp JOIN user u ON ubp.user_id = u.id WHERE u.email IN (${bizEmailsSql});\n\n`;
      }
    }

    return output;
  }

  // =========================================================================
  // 8. UI COMPONENT & PERSISTENT TAB RENDER ENGINE
  // =========================================================================
  function savePanelState() {
    const panel = document.getElementById("tm-bot-panel");
    if (!panel) return;
    const activePane = panel.querySelector(".tm-tab-pane.tm-active");
    if (activePane) {
      const inputContainer = activePane.querySelector(".tm-input-container");
      if (inputContainer && inputContainer.offsetHeight > 50) {
        tmStorage.setItem(`tm_bot_height_${currentTab.toLowerCase()}_input`, inputContainer.offsetHeight);
      }
      const outputContainer = activePane.querySelector(".tm-output-container");
      if (outputContainer && outputContainer.offsetHeight > 50) {
        tmStorage.setItem(`tm_bot_height_${currentTab.toLowerCase()}_output`, outputContainer.offsetHeight);
      }
    }
    tmStorage.setItem("tm_bot_visible", panel.classList.contains("tm-visible") ? "true" : "false");
    tmStorage.setItem("tm_bot_expanded", panel.classList.contains("tm-expanded") ? "true" : "false");
  }

  function getExecutionHUDHTML(tab, showLog) {
    return `
      <div class="tm-hud-section" id="tmHUD_${tab}">
        <div class="tm-actions">
          <button class="tm-btn tm-btn-run"><i class="fa-solid fa-play" style="margin-right:4px;"></i>Run</button>
          <button class="tm-btn tm-btn-pause ${showLog ? "tm-visible" : ""}" title="Pause or Resume execution"><i class="fa-solid fa-pause" style="margin-right:4px;"></i>Pause</button>
          <button class="tm-btn tm-btn-skip ${showLog ? "tm-visible" : ""}" title="Skip current item"><i class="fa-solid fa-forward-step" style="margin-right:4px;"></i>Skip</button>
          <button class="tm-btn tm-btn-stop ${showLog ? "tm-visible" : ""}" title="Stop execution"><i class="fa-solid fa-stop" style="margin-right:4px;"></i>Stop</button>
        </div>
        <div class="tm-hud-card" style="display:${showLog ? "block" : "none"};">
          <div class="tm-hud-row">
            <div class="tm-hud-label">
              <span class="tm-hud-status-badge tm-status-idle">Ready</span>
              <span class="tm-hud-item-name">No active task</span>
            </div>
            <div class="tm-hud-pct">0%</div>
          </div>
          <div class="tm-hud-progress-track">
            <div class="tm-hud-progress-fill" style="width:0%;"></div>
          </div>
          <div class="tm-hud-counters">
            <span class="tm-hud-counter-text">Item <b class="tm-hud-idx">0</b> / <b class="tm-hud-total">0</b></span>
            <div class="tm-hud-badges">
              <span class="tm-badge tm-badge-success" title="Success count"><i class="fa-solid fa-check" style="margin-right:3px;"></i><span class="tm-count-success">0</span></span>
              <span class="tm-badge tm-badge-error" title="Failed count"><i class="fa-solid fa-xmark" style="margin-right:3px;"></i><span class="tm-count-failed">0</span></span>
              <span class="tm-badge tm-badge-skipped" title="Skipped count"><i class="fa-solid fa-forward-step" style="margin-right:3px;"></i><span class="tm-count-skipped">0</span></span>
            </div>
          </div>
        </div>
        <div class="tm-log-container" style="display:${showLog ? "block" : "none"};">
          <div class="tm-log-toolbar">
            <div class="tm-log-filters">
              <button type="button" class="tm-filter-btn active" data-filter="all">All</button>
              <button type="button" class="tm-filter-btn" data-filter="error">Errors (<span class="tm-filter-err-count">0</span>)</button>
              <button type="button" class="tm-filter-btn" data-filter="success">Success</button>
            </div>
            <div class="tm-log-actions">
              <button type="button" class="tm-log-btn tm-log-copy-btn" title="Copy Log"><i class="fa-solid fa-copy" style="margin-right:3px;"></i>Copy</button>
              <button type="button" class="tm-log-btn tm-log-clear-btn" title="Clear Log"><i class="fa-solid fa-trash-can" style="margin-right:3px;"></i>Clear</button>
            </div>
          </div>
          <div class="tm-log"></div>
        </div>
      </div>
    `;
  }

  function injectUI() {
    if (!document.getElementById("tm-bot-styles")) {
      const style = document.createElement("style");
      style.id = "tm-bot-styles";
      style.textContent = BOT_CSS;
      document.head.appendChild(style);
    }

    const hasSavedState = !!tmStorage.getItem("tm_bot_exec_state");
    let panel = document.getElementById("tm-bot-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "tm-bot-panel";
      document.body.appendChild(panel);

      const isVisible = hasSavedState || tmStorage.getItem("tm_bot_visible") === "true";
      if (isVisible) {
        openPanel();
      }
      if (tmStorage.getItem("tm_bot_expanded") === "true") {
        panel.classList.add("tm-expanded");
      }
    }

    const existingIcon = document.getElementById("tm-bot-icon");
    if (existingIcon) {
      if (existingIcon.parentNode && existingIcon.offsetParent !== null) {
        const isRunning = isBotRunning || hasSavedState;
        if (!existingIcon.classList.contains("tm-stopping")) {
          if (isRunning) existingIcon.classList.add("tm-running");
          else existingIcon.classList.remove("tm-running");
        }
        return;
      } else {
        existingIcon.remove();
      }
    }

    const header = document.querySelector("header");
    if (!header) return;

    const botWrapper = document.createElement("div");
    botWrapper.id = "tm-bot-icon";
    botWrapper.innerHTML = `
      <button title="Automator Panel (${SCRIPT_VERSION})">
        <svg width="20" height="20" viewBox="0 0 24 24" class="tm-modern-icon" fill="currentColor">
          <path d="M11 2L3 13h9v9l8-11h-9V2z"/>
        </svg>
      </button>
      <svg class="tm-border-loader" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="none" stroke="var(--color-success)" stroke-width="3" stroke-linecap="round" pathLength="100" />
      </svg>`;
    /* Layout is handled entirely by the #tm-bot-icon CSS rule */

    const isRunning = isBotRunning || hasSavedState;
    if (isRunning) {
      setTimeout(() => {
        const wrapper = document.getElementById("tm-bot-icon");
        if (wrapper) wrapper.classList.add("tm-running");
      }, 1000);
    }

    const target =
      header.querySelector('div[style*="justify-content: flex-end"]') || header.querySelector("div:last-child");
    if (target) target.appendChild(botWrapper);

    botWrapper.onclick = () => {
      const p = document.getElementById("tm-bot-panel");
      if (p && p.classList.contains("tm-visible")) {
        closePanel();
      } else {
        openPanel();
      }
    };
  }

  function renderPanel() {
    const panel = document.getElementById("tm-bot-panel");
    if (!panel) return;

    const hasSavedState = !!tmStorage.getItem("tm_bot_exec_state");
    const showLog = isBotRunning || hasSavedState;
    const statusText = isBotRunning ? "Running..." : "Ready";
    const statusClass = isBotRunning ? "tm-status-running" : "tm-status-ready";

    const isExpanded = tmStorage.getItem("tm_bot_expanded") === "true";
    if (isExpanded) {
      panel.classList.add("tm-expanded");
    } else {
      panel.classList.remove("tm-expanded");
    }
    const expandIconClass = isExpanded
      ? "fa-solid fa-down-left-and-up-right-to-center"
      : "fa-solid fa-up-right-and-down-left-from-center";

    // Setup Header and Premium Segmented Tab Control
    panel.innerHTML = `
      <div class="tm-ambient-bg" aria-hidden="true">
        <div class="tm-ambient-glow tm-ambient-1"></div>
        <div class="tm-ambient-glow tm-ambient-2"></div>
      </div>
      <div class="tm-header">
        <div class="tm-title">
          <i class="fa-solid fa-bolt tm-modern-icon-text" style="font-size:16px; margin-right:6px;"></i>
          Automator
          <span class="tm-version-badge">${SCRIPT_VERSION}</span>
        </div>
        <div class="tm-header-actions">
          <div class="tm-status tm-status-inline ${statusClass}" id="tmBotStatus">${statusText}</div>
          <button class="tm-header-icon-btn" id="tmExpandPanelBtn" title="Toggle Expanded / Compact Width">
            <i class="${expandIconClass}" id="tmExpandIcon"></i>
          </button>
          <button class="tm-header-icon-btn" id="tmSettingsBtn" title="Speed & Automation Settings">
            <i class="fa-solid fa-gear"></i>
          </button>
          <button class="tm-close" id="tmClosePanel" title="Close Panel">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="tm-tab-bar" role="tablist" aria-label="Automation Modules">
        <div class="tm-tab-pill-indicator"></div>
        <button class="tm-tab-btn" data-tab="USER" role="tab" aria-selected="false" title="User Management Automation">
          <i class="fa-solid fa-user-plus tm-tab-icon"></i>
          <span class="tm-tab-label">User</span>
          <span class="tm-tab-dot"></span>
        </button>
        <button class="tm-tab-btn" data-tab="SYNC" role="tab" aria-selected="false" title="Approval Flow Sync">
          <i class="fa-solid fa-arrows-rotate tm-tab-icon"></i>
          <span class="tm-tab-label">Sync</span>
          <span class="tm-tab-dot"></span>
        </button>
        <button class="tm-tab-btn" data-tab="CLEANUP" role="tab" aria-selected="false" title="Account Cleanup">
          <i class="fa-solid fa-broom tm-tab-icon"></i>
          <span class="tm-tab-label">Cleanup</span>
          <span class="tm-tab-dot"></span>
        </button>
        <button class="tm-tab-btn" data-tab="ORG" role="tab" aria-selected="false" title="Organization Structure">
          <i class="fa-solid fa-sitemap tm-tab-icon"></i>
          <span class="tm-tab-label">Org</span>
          <span class="tm-tab-dot"></span>
        </button>
        <button class="tm-tab-btn" data-tab="BUDGET" role="tab" aria-selected="false" title="Budget SQL Generator">
          <i class="fa-solid fa-wallet tm-tab-icon"></i>
          <span class="tm-tab-label">Budget</span>
          <span class="tm-tab-dot"></span>
        </button>
      </div>
      <div class="tm-tab-contents">
        <!-- USER TAB -->
        <div class="tm-tab-pane" id="pane_USER">
          <div class="tm-options">
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-dryrun-chk" checked>
              <span class="tm-pill-text">Dry Run</span>
            </label>
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-update-chk">
              <span class="tm-pill-text">Update</span>
            </label>
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-create-chk" checked>
              <span class="tm-pill-text">Create</span>
            </label>
            <div style="flex:1; display:flex; justify-content:flex-end;">
              <button class="tm-pill-btn tm-prompt-btn primary"><i class="fa-solid fa-wand-magic-sparkles" style="margin-right:4px;"></i>PROMPT</button>
            </div>
          </div>
          <div class="tm-editor-container tm-input-container" style="height:260px;">
            <textarea class="tm-textarea" id="tmInput_USER" placeholder="Paste user creation JSON data..." spellcheck="false"></textarea>
          </div>
          ${getToolbarHTML()}
          ${getExecutionHUDHTML("USER", showLog && currentTab === "USER")}
        </div>

        <!-- SYNC TAB -->
        <div class="tm-tab-pane" id="pane_SYNC">
          <div class="tm-options">
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-dryrun-chk" checked>
              <span class="tm-pill-text">Dry Run</span>
            </label>
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-update-chk">
              <span class="tm-pill-text">Update</span>
            </label>
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-create-chk" checked>
              <span class="tm-pill-text">Create</span>
            </label>
            <div style="flex:1; display:flex; justify-content:flex-end;">
              <button class="tm-pill-btn tm-prompt-btn primary"><i class="fa-solid fa-wand-magic-sparkles" style="margin-right:4px;"></i>PROMPT</button>
            </div>
          </div>
          <div class="tm-editor-container tm-input-container" style="height:260px;">
            <textarea class="tm-textarea" id="tmInput_SYNC" placeholder="Paste approval flows JSON data..." spellcheck="false"></textarea>
          </div>
          ${getToolbarHTML()}
          ${getExecutionHUDHTML("SYNC", showLog && currentTab === "SYNC")}
        </div>

        <!-- CLEANUP TAB -->
        <div class="tm-tab-pane" id="pane_CLEANUP">
          <div class="tm-options">
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-dryrun-chk" checked>
              <span class="tm-pill-text">Dry Run</span>
            </label>
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-update-chk">
              <span class="tm-pill-text">Update</span>
            </label>
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-create-chk" checked>
              <span class="tm-pill-text">Create</span>
            </label>
            <div style="flex:1; display:flex; justify-content:flex-end;">
              <button class="tm-pill-btn tm-prompt-btn primary"><i class="fa-solid fa-wand-magic-sparkles" style="margin-right:4px;"></i>PROMPT</button>
            </div>
          </div>
          <div class="tm-editor-container tm-input-container" style="height:260px;">
            <textarea class="tm-textarea" id="tmInput_CLEANUP" placeholder="Paste target users JSON to delete/sync..." spellcheck="false"></textarea>
          </div>
          ${getToolbarHTML()}
          ${getExecutionHUDHTML("CLEANUP", showLog && currentTab === "CLEANUP")}
        </div>

        <!-- ORG TAB -->
        <div class="tm-tab-pane" id="pane_ORG">
          <div class="tm-options">
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-dryrun-chk" checked>
              <span class="tm-pill-text">Dry Run</span>
            </label>
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-update-chk">
              <span class="tm-pill-text">Update</span>
            </label>
            <label class="tm-checkbox-container">
              <input type="checkbox" class="tm-create-chk" checked>
              <span class="tm-pill-text">Create</span>
            </label>
            <div style="flex:1; display:flex; justify-content:flex-end;">
              <button class="tm-pill-btn tm-prompt-btn primary"><i class="fa-solid fa-wand-magic-sparkles" style="margin-right:4px;"></i>PROMPT</button>
            </div>
          </div>
          <div class="tm-editor-container tm-input-container" style="height:260px;">
            <textarea class="tm-textarea" id="tmInput_ORG" placeholder="Paste organization hierarchy JSON..." spellcheck="false"></textarea>
          </div>
          ${getToolbarHTML()}
          ${getExecutionHUDHTML("ORG", showLog && currentTab === "ORG")}
        </div>

        <!-- BUDGET TAB -->
        <div class="tm-tab-pane" id="pane_BUDGET">
          <div style="font-size:12px; font-weight:600; margin-bottom:6px; color:#475569;">Company:</div>
          <select class="tm-select" id="tmBudgetCompany">
            <option value="dong_a">Đông Á</option>
            <option value="f88">F88</option>
          </select>
          <div class="tm-options" style="margin-bottom:8px;">
            <label class="tm-checkbox-container">
              <input type="checkbox" id="tmWrapText">
              <span class="tm-pill-text">Wrap Text</span>
            </label>
            <div style="flex:1; display:flex; justify-content:flex-end;">
              <button class="tm-pill-btn tm-prompt-btn primary"><i class="fa-solid fa-wand-magic-sparkles" style="margin-right:4px;"></i>PROMPT</button>
            </div>
          </div>
          <div class="tm-editor-container tm-input-container" style="height:150px;">
            <textarea class="tm-textarea" id="tmInput_BUDGET" placeholder="Paste target_emails.json here..." spellcheck="false"></textarea>
          </div>
          ${getToolbarHTML()}
          <button class="tm-btn tm-btn-run" id="tmGenerateSQL" style="width:100%; margin-top:8px;">GENERATE SQL</button>
          <div class="tm-output-container" style="margin-top: 12px; position: relative;">
            <div style="font-size:11px; font-weight:600; margin-bottom:4px; color:#475569;">Output SQL:</div>
            <div style="position: relative;">
              <button class="tm-copy-btn" id="tmCopySQL">${ICONS.COPY}</button>
              <div class="tm-editor-container tm-output-container" style="height:180px; margin-bottom:0;">
                <textarea class="tm-textarea" id="tmOutput_BUDGET" readonly style="padding-right: 36px;" placeholder="Result SQL will appear here..." spellcheck="false"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- GLOBAL SETTINGS DRAWER -->
      <div class="tm-settings-drawer" id="tmSettingsDrawer">
        <div class="tm-settings-header">
          <div class="tm-settings-title">
            <i class="fa-solid fa-sliders" style="margin-right:8px;"></i>
            Automation Delays (ms)
          </div>
          <button class="tm-close" id="tmCloseSettings" title="Close Settings">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="tm-settings-body">
          <div class="tm-speed-grid">
            <div class="tm-speed-item">
              <label>Search Delay</label>
              <input class="tm-speed-input" id="tmSettingSearchDelay" type="number" min="100" max="10000" step="100" />
            </div>
            <div class="tm-speed-item">
              <label>Fill Delay</label>
              <input class="tm-speed-input" id="tmSettingFillDelay" type="number" min="100" max="10000" step="100" />
            </div>
            <div class="tm-speed-item">
              <label>Search Result Wait</label>
              <input class="tm-speed-input" id="tmSettingSearchResultWait" type="number" min="100" max="10000" step="100" />
            </div>
            <div class="tm-speed-item">
              <label>Open Page Delay</label>
              <input class="tm-speed-input" id="tmSettingOpenPageDelay" type="number" min="100" max="10000" step="100" />
            </div>
            <div class="tm-speed-item" style="grid-column: span 2;">
              <label>Dropdown Wait</label>
              <input class="tm-speed-input" id="tmSettingDropdownWait" type="number" min="100" max="10000" step="100" />
            </div>
          </div>
          <div style="margin-top: 14px; display: flex; justify-content: flex-end;">
            <button class="tm-pill-btn" id="tmResetDelaysBtn" type="button"><i class="fa-solid fa-rotate-left" style="margin-right:4px;"></i>Reset Defaults</button>
          </div>
          <div style="margin-top: 18px; padding-top: 12px; border-top: 1px solid var(--color-border-subtle); text-align: center; font-size: 10px; color: var(--color-text-muted); font-family: 'IBM Plex Mono', monospace;">
            User Creation Automation <span style="font-weight:600; color:var(--color-primary);">${SCRIPT_VERSION}</span>
          </div>
        </div>
      </div>
    `;

    bindTabSwitching();
    bindPanelEvents();
    switchToTab(currentTab);
  }

  function openPanel() {
    let panel = document.getElementById("tm-bot-panel");
    if (!panel) {
      injectUI();
      panel = document.getElementById("tm-bot-panel");
    }
    if (!panel.innerHTML.trim()) {
      renderPanel();
    }
    panel.classList.remove("tm-closing");
    panel.classList.add("tm-visible");
    tmStorage.setItem("tm_bot_visible", "true");

    const iconWrapper = document.getElementById("tm-bot-icon");
    if (iconWrapper) iconWrapper.classList.add("tm-panel-open");

    requestAnimationFrame(() => {
      updateTabPillIndicator(currentTab);
      updateTabRunningIndicators();
    });
  }

  function closePanel() {
    const panel = document.getElementById("tm-bot-panel");
    if (!panel || !panel.classList.contains("tm-visible")) return;

    savePanelState();
    panel.classList.remove("tm-visible");
    panel.classList.add("tm-closing");
    tmStorage.setItem("tm_bot_visible", "false");

    const iconWrapper = document.getElementById("tm-bot-icon");
    if (iconWrapper) iconWrapper.classList.remove("tm-panel-open");

    setTimeout(() => {
      if (panel && !panel.classList.contains("tm-visible")) {
        panel.classList.remove("tm-closing");
      }
    }, 240);
  }

  function getToolbarHTML() {
    return `
      <div class="tm-editor-toolbar">
        <div class="tm-editor-meta-bar">
          <div class="tm-editor-meta"></div>
        </div>
        <div class="tm-editor-tools-row">
          <div class="tm-tools-left">
            <input type="file" accept=".json,.txt" class="tm-file-input" style="display:none;">
            <button title="Import JSON or Text file" class="tm-pill-btn tm-import-btn" type="button"><i class="fa-solid fa-file-import" style="margin-right:4px;"></i>File</button>
            <button title="Clear editor content" class="tm-pill-btn tm-clear-btn" type="button"><i class="fa-solid fa-trash-can" style="margin-right:4px;"></i>Clear</button>
          </div>
          <div class="tm-tools-right">
            <button title="Decrease font" class="tm-pill-btn tm-font-down-btn" type="button">A-</button>
            <button title="Increase font" class="tm-pill-btn tm-font-up-btn" type="button">A+</button>
          </div>
        </div>
        <div class="tm-editor-format-row">
          <button class="tm-editor-btn tm-format-btn" type="button"><i class="fa-solid fa-indent" style="margin-right:5px;"></i>Format</button>
          <button class="tm-editor-btn tm-minify-btn" type="button"><i class="fa-solid fa-compress" style="margin-right:5px;"></i>Minify</button>
        </div>
      </div>
    `;
  }

  function bindTabSwitching() {
    const tabButtons = document.querySelectorAll(".tm-tab-btn");
    tabButtons.forEach((btn) => {
      btn.onclick = () => {
        const target = btn.getAttribute("data-tab");
        switchToTab(target);
      };
    });
  }

  function updateTabRunningIndicators() {
    document.querySelectorAll(".tm-tab-btn").forEach((btn) => {
      const tab = btn.getAttribute("data-tab");
      if (isBotRunning && (currentTab === tab || tmStorage.getItem("tm_bot_tab") === tab)) {
        btn.classList.add("tm-running");
      } else {
        btn.classList.remove("tm-running");
      }
    });
  }

  function updateTabPillIndicator(tabName) {
    const activeBtn = document.querySelector(`.tm-tab-btn[data-tab="${tabName}"]`);
    const indicator = document.querySelector(".tm-tab-pill-indicator");
    if (activeBtn && indicator) {
      indicator.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
      indicator.style.width = `${activeBtn.offsetWidth}px`;
    }
  }

  function switchToTab(tabName) {
    savePanelState();
    const prevTab = currentTab;
    currentTab = tabName;
    tmStorage.setItem("tm_bot_tab", currentTab);

    // Compute slide direction based on tab index order
    const TAB_ORDER = ["USER", "SYNC", "CLEANUP", "ORG", "BUDGET"];
    const prevIdx = TAB_ORDER.indexOf(prevTab);
    const nextIdx = TAB_ORDER.indexOf(tabName);
    const direction = nextIdx >= prevIdx ? "forward" : "backward";

    const tabContents = document.querySelector(".tm-tab-contents");
    if (tabContents) {
      tabContents.setAttribute("data-slide-direction", direction);
    }

    // Update active tab buttons and accessibility states
    document.querySelectorAll(".tm-tab-btn").forEach((btn) => {
      const isTarget = btn.getAttribute("data-tab") === tabName;
      if (isTarget) {
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      }
    });

    // Update active content panes
    document.querySelectorAll(".tm-tab-pane").forEach((pane) => {
      if (pane.id === `pane_${tabName}`) {
        pane.classList.add("tm-active");
      } else {
        pane.classList.remove("tm-active");
      }
    });

    updateTabPillIndicator(tabName);
    updateTabRunningIndicators();

    // Refresh CodeMirror for layout adjustments if initialized
    requestAnimationFrame(() => {
      if (editors[tabName]) {
        try { editors[tabName].refresh(); } catch (e) { }
      }
      if (tabName === "BUDGET" && editors["BUDGET_OUTPUT"]) {
        try { editors["BUDGET_OUTPUT"].refresh(); } catch (e) { }
      }
    });

    restoreLogs(tabName);
    if (execStats && execStats.total > 0) {
      updateHUD(
        tabName,
        execStats,
        undefined,
        isBotRunning ? (isBotPaused ? "Paused" : "Running") : "Ready",
        isBotRunning ? (isBotPaused ? "paused" : "running") : "idle",
      );
    }
  }

  function bindPanelEvents() {
    const panel = document.getElementById("tm-bot-panel");

    // Close panel
    document.getElementById("tmClosePanel").onclick = () => {
      closePanel();
    };

    // Escape key closes settings or panel
    if (!window.__tmEscapeBound) {
      window.__tmEscapeBound = true;
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const p = document.getElementById("tm-bot-panel");
          if (p && p.classList.contains("tm-visible")) {
            const settingsDrawer = document.getElementById("tmSettingsDrawer");
            if (settingsDrawer && settingsDrawer.classList.contains("tm-open")) {
              settingsDrawer.classList.remove("tm-open");
              return;
            }
            closePanel();
          }
        }
      });
    }

    // Expand / Compact panel width
    const expandBtn = document.getElementById("tmExpandPanelBtn");
    if (expandBtn) {
      expandBtn.onclick = () => {
        panel.classList.toggle("tm-expanded");
        const isExpanded = panel.classList.contains("tm-expanded");
        tmStorage.setItem("tm_bot_expanded", isExpanded ? "true" : "false");
        const icon = document.getElementById("tmExpandIcon");
        if (icon) {
          icon.className = isExpanded
            ? "fa-solid fa-down-left-and-up-right-to-center"
            : "fa-solid fa-up-right-and-down-left-from-center";
        }
        updateTabPillIndicator(currentTab);
        setTimeout(() => {
          Object.values(editors).forEach((editor) => {
            try { editor.refresh(); } catch (e) { }
          });
          updateTabPillIndicator(currentTab);
        }, 310);
      };
    }

    window.addEventListener("resize", () => {
      updateTabPillIndicator(currentTab);
    });

    // Global Settings Drawer Toggle & Events
    const settingsDrawer = document.getElementById("tmSettingsDrawer");
    const settingsBtn = document.getElementById("tmSettingsBtn");
    const closeSettingsBtn = document.getElementById("tmCloseSettings");

    const populateSettingsInputs = () => {
      if (!settingsDrawer) return;
      const sDelay = document.getElementById("tmSettingSearchDelay");
      const fDelay = document.getElementById("tmSettingFillDelay");
      const rDelay = document.getElementById("tmSettingSearchResultWait");
      const oDelay = document.getElementById("tmSettingOpenPageDelay");
      const dDelay = document.getElementById("tmSettingDropdownWait");

      if (sDelay) sDelay.value = getSearchDelay();
      if (fDelay) fDelay.value = getFillDelay();
      if (rDelay) rDelay.value = getSearchResultWait();
      if (oDelay) oDelay.value = getOpenPageDelay();
      if (dDelay) dDelay.value = getDropdownWait();
    };

    if (settingsBtn && settingsDrawer) {
      settingsBtn.onclick = () => {
        populateSettingsInputs();
        settingsDrawer.classList.toggle("tm-open");
      };
    }
    if (closeSettingsBtn && settingsDrawer) {
      closeSettingsBtn.onclick = () => {
        settingsDrawer.classList.remove("tm-open");
      };
    }

    const bindSettingInput = (id, key, fallback) => {
      const el = document.getElementById(id);
      if (!el) return;
      const save = () => {
        const val = parseInt(el.value || "", 10);
        const norm = Number.isFinite(val) ? clamp(val, 100, 10000) : fallback;
        el.value = norm;
        tmStorage.setItem(key, String(norm));
      };
      el.onchange = save;
      el.onblur = save;
    };

    bindSettingInput("tmSettingSearchDelay", "tm_bot_search_delay", CONFIG.DEFAULT_DELAYS.search);
    bindSettingInput("tmSettingFillDelay", "tm_bot_fill_delay", CONFIG.DEFAULT_DELAYS.fill);
    bindSettingInput("tmSettingSearchResultWait", "tm_bot_search_result_wait", CONFIG.DEFAULT_DELAYS.searchResult);
    bindSettingInput("tmSettingOpenPageDelay", "tm_bot_open_page_delay", CONFIG.DEFAULT_DELAYS.openPage);
    bindSettingInput("tmSettingDropdownWait", "tm_bot_dropdown_wait", CONFIG.DEFAULT_DELAYS.dropdown);

    const resetDelaysBtn = document.getElementById("tmResetDelaysBtn");
    if (resetDelaysBtn) {
      resetDelaysBtn.onclick = () => {
        tmStorage.setItem("tm_bot_search_delay", String(CONFIG.DEFAULT_DELAYS.search));
        tmStorage.setItem("tm_bot_fill_delay", String(CONFIG.DEFAULT_DELAYS.fill));
        tmStorage.setItem("tm_bot_search_result_wait", String(CONFIG.DEFAULT_DELAYS.searchResult));
        tmStorage.setItem("tm_bot_open_page_delay", String(CONFIG.DEFAULT_DELAYS.openPage));
        tmStorage.setItem("tm_bot_dropdown_wait", String(CONFIG.DEFAULT_DELAYS.dropdown));
        populateSettingsInputs();
        showToast("Delays reset to defaults", "info");
      };
    }

    // Setup input state sync keys
    const tabKeys = {
      USER: "tm_bot_user_json",
      SYNC: "tm_bot_sync_json",
      CLEANUP: "tm_bot_cleanup_json",
      ORG: "tm_bot_org_json",
      BUDGET: "tm_bot_budget_json",
    };

    // Set font sizes
    let fontSize = parseInt(tmStorage.getItem("tm_bot_font_size")) || 11;
    const updateGlobalFontSize = (size) => {
      fontSize = Math.max(8, Math.min(30, size));
      tmStorage.setItem("tm_bot_font_size", fontSize);
      const fs = fontSize + "px";

      panel.querySelectorAll(".tm-textarea").forEach((el) => {
        el.style.fontSize = fs;
      });

      Object.values(editors).forEach((editor) => {
        const cmEl = editor.getWrapperElement();
        cmEl.style.fontSize = fs;
        editor.refresh();
      });
    };

    // Initialize events and editors for each tab
    Object.keys(tabKeys).forEach((tab) => {
      const pane = document.getElementById(`pane_${tab}`);
      const textarea = document.getElementById(`tmInput_${tab}`);
      const editorMeta = pane.querySelector(".tm-editor-meta");
      const storageKey = tabKeys[tab];

      // Read saved value
      const savedVal = tmStorage.getItem(storageKey) || "";
      textarea.value = savedVal;

      let lastErrLine = null;
      const updateMeta = (val) => {
        if (!editorMeta) return;
        const lineCount = val.length === 0 ? 1 : val.split("\n").length;
        const charCount = val.length;
        const trimmed = val.trim();
        let stateHtml = "";
        const cm = editors[tab];

        // Clear previous error line in CodeMirror if any
        if (cm && lastErrLine !== null) {
          cm.removeLineClass(lastErrLine, "background", "tm-cm-error-line");
          lastErrLine = null;
        }

        if (trimmed.length > 0) {
          const errLoc = getJsonErrorLocation(trimmed);
          if (!errLoc) {
            stateHtml = `<span style="color:#059669; font-weight:600; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-circle-check"></i>JSON OK</span>`;
          } else {
            const hasEmails =
              trimmed
                .split(/[\n,]+/)
                .map((e) => e.trim())
                .filter((e) => e.length > 0 && e.includes("@")).length > 0;
            if (hasEmails) {
              stateHtml = `<span style="color:#059669; font-weight:600; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-circle-check"></i>Emails List OK</span>`;
            } else {
              if (cm) {
                lastErrLine = errLoc.line;
                cm.addLineClass(errLoc.line, "background", "tm-cm-error-line");
              }
              stateHtml = `<span class="tm-error-link" title="${errLoc.message} (Click to jump to line ${errLoc.line + 1})"><i class="fa-solid fa-triangle-exclamation" style="flex-shrink:0;"></i><span class="tm-error-text">L${errLoc.line + 1}: ${errLoc.shortMsg}</span></span>`;
            }
          }
        }
        editorMeta.innerHTML = `<span class="tm-meta-stats">Lines ${lineCount} | Chars ${charCount}</span>${stateHtml ? `<span class="tm-meta-sep">|</span>${stateHtml}` : ""}`;

        const errLink = editorMeta.querySelector(".tm-error-link");
        if (errLink && cm && lastErrLine !== null) {
          errLink.onclick = () => {
            cm.setCursor({ line: lastErrLine, ch: 0 });
            cm.scrollIntoView({ line: lastErrLine, ch: 0 }, 60);
            cm.focus();
          };
        }
      };

      const handleContentChange = (val) => {
        tmStorage.setItem(storageKey, val);
        updateMeta(val);
      };

      // Set up CodeMirror
      if (window.CodeMirror) {
        const cm = window.CodeMirror.fromTextArea(textarea, {
          mode: { name: "javascript", json: true },
          lineNumbers: true,
          lineWrapping: tmStorage.getItem("tm_bot_wrap") === "true",
          indentUnit: 4,
          tabSize: 4,
          viewportMargin: Infinity,
          theme: "default",
          extraKeys: {
            Tab: (c) => c.replaceSelection("    ", "end"),
            "Shift-Tab": "indentLess",
          },
        });
        editors[tab] = cm;
        const wrapper = cm.getWrapperElement();
        wrapper.addEventListener("mouseup", savePanelState);

        cm.on("change", () => {
          handleContentChange(cm.getValue());
          if (tab === "BUDGET") {
            const genBtn = document.getElementById("tmGenerateSQL");
            if (genBtn && genBtn.innerText === "SQL GENERATED!") {
              genBtn.innerText = "GENERATE SQL";
              genBtn.style.background = "";
              genBtn.style.color = "";
            }
          }
        });

        cm.on("keydown", (_, e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            const runBtn = pane.querySelector(".tm-btn-run");
            if (runBtn) runBtn.click();
          }
        });

        cm.setValue(savedVal);
      } else {
        // Fallback standard text area behavior
        textarea.oninput = (e) => {
          handleContentChange(e.target.value);
          if (tab === "BUDGET") {
            const genBtn = document.getElementById("tmGenerateSQL");
            if (genBtn && genBtn.innerText === "SQL GENERATED!") {
              genBtn.innerText = "GENERATE SQL";
              genBtn.style.background = "";
              genBtn.style.color = "";
            }
          }
        };
        textarea.onkeydown = (e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const val = textarea.value;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            if (start === end && !e.shiftKey) {
              textarea.value = val.slice(0, start) + "    " + val.slice(end);
              textarea.selectionStart = textarea.selectionEnd = start + 4;
              handleContentChange(textarea.value);
              return;
            }
          }
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            const runBtn = pane.querySelector(".tm-btn-run");
            if (runBtn) runBtn.click();
          }
        };
      }

      // Height restoration
      const container = textarea.closest(".tm-editor-container");
      const savedHeight = tmStorage.getItem(`tm_bot_height_${tab.toLowerCase()}_input`);
      if (savedHeight && parseInt(savedHeight) > 50 && container) {
        container.style.height = savedHeight + "px";
      }

      if (container && window.ResizeObserver) {
        new ResizeObserver((entries) => {
          for (let entry of entries) {
            const h = entry.target.offsetHeight;
            if (h > 50) {
              tmStorage.setItem(`tm_bot_height_${tab.toLowerCase()}_input`, h);
            }
          }
        }).observe(container);
      }

      // Toolbar logic
      const fontDownBtn = pane.querySelector(".tm-font-down-btn");
      if (fontDownBtn) fontDownBtn.onclick = () => updateGlobalFontSize(fontSize - 1);

      const fontUpBtn = pane.querySelector(".tm-font-up-btn");
      if (fontUpBtn) fontUpBtn.onclick = () => updateGlobalFontSize(fontSize + 1);

      const formatBtn = pane.querySelector(".tm-format-btn");
      if (formatBtn) {
        formatBtn.onclick = () => {
          const val = editors[tab] ? editors[tab].getValue() : textarea.value;
          try {
            const beautified = JSON.stringify(JSON.parse(val.trim()), null, 2);
            if (editors[tab]) editors[tab].setValue(beautified);
            else textarea.value = beautified;
            handleContentChange(beautified);
            showToast("JSON formatted", "success");
          } catch (err) {
            showToast(`JSON Format Error: ${err.message}`, "error");
          }
        };
      }

      const minifyBtn = pane.querySelector(".tm-minify-btn");
      if (minifyBtn) {
        minifyBtn.onclick = () => {
          const val = editors[tab] ? editors[tab].getValue() : textarea.value;
          try {
            const minified = JSON.stringify(JSON.parse(val.trim()), null, 0);
            if (editors[tab]) editors[tab].setValue(minified);
            else textarea.value = minified;
            handleContentChange(minified);
            showToast("JSON minified", "success");
          } catch (err) {
            showToast(`JSON Minify Error: ${err.message}`, "error");
          }
        };
      }

      // File Import button & hidden input
      const importBtn = pane.querySelector(".tm-import-btn");
      const fileInput = pane.querySelector(".tm-file-input");
      if (importBtn && fileInput) {
        importBtn.onclick = () => fileInput.click();
        fileInput.onchange = (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (evt) => {
            const content = evt.target.result;
            if (editors[tab]) editors[tab].setValue(content);
            else textarea.value = content;
            handleContentChange(content);
            showToast(`Loaded ${file.name}`, "success");
          };
          reader.onerror = () => showToast("Failed to read file", "error");
          reader.readAsText(file);
          fileInput.value = "";
        };
      }

      // Clear button
      const clearBtn = pane.querySelector(".tm-clear-btn");
      if (clearBtn) {
        clearBtn.onclick = () => {
          if (editors[tab]) editors[tab].setValue("");
          else textarea.value = "";
          handleContentChange("");
          showToast("Editor cleared", "info");
        };
      }

      // Drag and drop file onto editor container
      if (container) {
        container.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.stopPropagation();
          container.classList.add("tm-drag-over");
        });
        container.addEventListener("dragleave", (e) => {
          e.preventDefault();
          e.stopPropagation();
          container.classList.remove("tm-drag-over");
        });
        container.addEventListener("drop", (e) => {
          e.preventDefault();
          e.stopPropagation();
          container.classList.remove("tm-drag-over");
          if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = (evt) => {
              const content = evt.target.result;
              if (editors[tab]) editors[tab].setValue(content);
              else textarea.value = content;
              handleContentChange(content);
              showToast(`Imported ${file.name}`, "success");
            };
            reader.onerror = () => showToast("Failed to read file", "error");
            reader.readAsText(file);
          }
        });
      }

      const promptBtn = pane.querySelector(".tm-prompt-btn");
      if (promptBtn) {
        promptBtn.onclick = async () => {
          let promptText = "";
          if (tab === "USER") {
            promptText =
              "Convert this raw text list of users into a JSON array of objects. Keys: 'name', 'email', 'password', 'phone', 'employee_code', 'department', 'job_title', 'role', 'approving_manager'. DEFAULTS if missing: phone='0123456789', role='Thành viên', password='123456' (or employee code if known). Output ONLY the raw JSON array.";
          } else if (tab === "SYNC") {
            promptText =
              'Convert this data into a JSON array for approval flows. Structure: [{ "target_user_emails": ["user@email.com"], "approval_steps": [{ "step_number": 1, "approver_email": "Email or Name" }] }]. The \'approver_email\' field can contain either an email OR a name. Output ONLY the raw JSON array.';
          } else if (tab === "ORG") {
            promptText =
              "Convert this data into a JSON array of organization units (Branch, Department, Job Title). Keys: 'type' (BRANCH|DEPARTMENT|JOB_TITLE), 'name', 'code' (optional), 'address' (for branch), 'taxCode' (for branch), 'branch' (parent branch for department). Output ONLY the raw JSON array.";
          } else if (tab === "CLEANUP") {
            promptText =
              'Convert this raw text list of users/emails into a JSON array for Smart Cleanup. Use the SYNC format so the bot can fallback to updating if deletion is restricted. Structure: [{ "target_user_emails": ["user@email.com"], "approval_steps": [{ "step_number": 1, "approver_email": "Approver Name/Email" }] }]. Output ONLY the raw JSON array.';
          } else if (tab === "BUDGET") {
            promptText =
              "Convert this data into a JSON object where keys are budget levels (e.g., '550', '650', '750') and values are arrays of email strings. Example: { \"550\": [\"user@email.com\"], \"650\": [] }. Output ONLY the raw JSON.";
          }

          try {
            await navigator.clipboard.writeText(promptText);
            const originalText = promptBtn.innerHTML;
            promptBtn.innerHTML = `<i class="fa-solid fa-check" style="margin-right:4px;"></i>COPIED`;
            promptBtn.style.color = "#059669";
            setTimeout(() => {
              promptBtn.innerHTML = originalText;
              promptBtn.style.color = "";
            }, 1500);
          } catch (err) {
            showToast("Could not copy prompt: " + err, "error");
          }
        };
      }

      // Checkboxes configuration persistence
      const dryRunChk = pane.querySelector(".tm-dryrun-chk");
      const updateChk = pane.querySelector(".tm-update-chk");
      const createChk = pane.querySelector(".tm-create-chk");

      if (dryRunChk) {
        const saved = tmStorage.getItem("tm_bot_dry_run");
        dryRunChk.checked = saved === null ? true : saved === "true" || saved === true;
        dryRunChk.onchange = () => tmStorage.setItem("tm_bot_dry_run", dryRunChk.checked);
      }
      if (updateChk) {
        const saved = tmStorage.getItem("tm_bot_update_existing");
        updateChk.checked = saved === "true" || saved === true;
        updateChk.onchange = () => tmStorage.setItem("tm_bot_update_existing", updateChk.checked);
      }
      if (createChk) {
        const saved = tmStorage.getItem("tm_bot_create_missing");
        createChk.checked = saved === null ? true : saved === "true" || saved === true;
        createChk.onchange = () => tmStorage.setItem("tm_bot_create_missing", createChk.checked);
      }

      // Action triggers
      const runBtn = pane.querySelector(".tm-btn-run");
      const pauseBtn = pane.querySelector(".tm-btn-pause");
      const skipBtn = pane.querySelector(".tm-btn-skip");
      const stopBtn = pane.querySelector(".tm-btn-stop");

      if (runBtn && tab !== "BUDGET") {
        runBtn.onclick = () => {
          if (isBotPaused) {
            isBotPaused = false;
            runBtn.disabled = true;
            runBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px;"></i>Running...`;
            if (pauseBtn) pauseBtn.innerHTML = `<i class="fa-solid fa-pause" style="margin-right:4px;"></i>Pause`;
            const statusEl = document.getElementById("tmBotStatus");
            if (statusEl) {
              statusEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px;"></i>Running...`;
              statusEl.className = "tm-status tm-status-inline tm-status-running";
            }
            updateHUD(tab, execStats, undefined, "Running", "running");
            return;
          }
          try {
            const inputVal = editors[tab] ? editors[tab].getValue() : textarea.value;
            const data = JSON.parse(inputVal);
            const items = flattenData(data, tab);
            console.log(`[BOT] Start! flattened ${items.length} tasks`);
            startBotLoop(items, 0, dryRunChk ? dryRunChk.checked : true, tab);
          } catch (e) {
            showToast("JSON Syntax Error: " + e.message, "error");
          }
        };
      }

      if (pauseBtn && tab !== "BUDGET") {
        pauseBtn.onclick = () => {
          isBotPaused = !isBotPaused;
          const statusEl = document.getElementById("tmBotStatus");
          if (isBotPaused) {
            pauseBtn.innerHTML = `<i class="fa-solid fa-play" style="margin-right:4px;"></i>Resume`;
            if (runBtn) {
              runBtn.disabled = false;
              runBtn.innerHTML = `<i class="fa-solid fa-play" style="margin-right:4px;"></i>Resume`;
            }
            if (statusEl) {
              statusEl.innerHTML = `<i class="fa-solid fa-circle-pause" style="margin-right:4px;"></i>Paused`;
              statusEl.className = "tm-status tm-status-inline tm-status-paused";
            }
            updateHUD(tab, execStats, undefined, "Paused", "paused");
          } else {
            pauseBtn.innerHTML = `<i class="fa-solid fa-pause" style="margin-right:4px;"></i>Pause`;
            if (runBtn) {
              runBtn.disabled = true;
              runBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px;"></i>Running...`;
            }
            if (statusEl) {
              statusEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px;"></i>Running...`;
              statusEl.className = "tm-status tm-status-inline tm-status-running";
            }
            updateHUD(tab, execStats, undefined, "Running", "running");
          }
        };
      }

      if (skipBtn && tab !== "BUDGET") {
        skipBtn.onclick = () => {
          skipCurrentRequested = true;
          if (isBotPaused) {
            isBotPaused = false;
            if (pauseBtn) pauseBtn.innerHTML = `<i class="fa-solid fa-pause" style="margin-right:4px;"></i>Pause`;
            if (runBtn) {
              runBtn.disabled = true;
              runBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px;"></i>Running...`;
            }
          }
        };
      }

      if (stopBtn && tab !== "BUDGET") {
        stopBtn.onclick = () => stopBot();
      }

      // Log toolbar filters & actions
      const filterBtns = pane.querySelectorAll(".tm-filter-btn");
      const logEl = pane.querySelector(".tm-log");
      filterBtns.forEach((btn) => {
        btn.onclick = () => {
          filterBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const filter = btn.getAttribute("data-filter");
          if (logEl) {
            logEl.classList.remove("filter-error", "filter-success");
            if (filter === "error") logEl.classList.add("filter-error");
            else if (filter === "success") logEl.classList.add("filter-success");
          }
        };
      });

      const copyLogBtn = pane.querySelector(".tm-log-copy-btn");
      if (copyLogBtn) {
        copyLogBtn.onclick = () => {
          try {
            const logsJson = sessionStorage.getItem("tm_bot_exec_logs") || "[]";
            const logs = JSON.parse(logsJson);
            const text = logs
              .map((l) => `[${l.time}] [${l.level.toUpperCase()}] ${l.msg.replace(/<[^>]*>?/gm, "")}`)
              .join("\n");
            navigator.clipboard.writeText(text);
            const orig = copyLogBtn.innerHTML;
            copyLogBtn.innerHTML = `<i class="fa-solid fa-check" style="margin-right:3px;"></i>Copied`;
            setTimeout(() => {
              copyLogBtn.innerHTML = orig;
            }, 1500);
          } catch (e) {
            console.warn("[BOT] Could not copy logs to clipboard", e);
          }
        };
      }

      const clearLogBtn = pane.querySelector(".tm-log-clear-btn");
      if (clearLogBtn) {
        clearLogBtn.onclick = () => {
          sessionStorage.removeItem("tm_bot_exec_logs");
          if (logEl) logEl.innerHTML = "";
        };
      }

      updateMeta(savedVal);
    });

    // Special handlers for Budget Tab
    const budgetPane = document.getElementById("pane_BUDGET");
    const budgetOutputTextarea = document.getElementById("tmOutput_BUDGET");
    const budgetSavedOutput = tmStorage.getItem("tm_bot_budget_output") || "";
    budgetOutputTextarea.value = budgetSavedOutput;

    if (window.CodeMirror && budgetOutputTextarea) {
      const cmOutput = window.CodeMirror.fromTextArea(budgetOutputTextarea, {
        mode: "text/x-sql",
        lineNumbers: true,
        lineWrapping: tmStorage.getItem("tm_bot_wrap") === "true",
        readOnly: "nocursor",
        viewportMargin: Infinity,
        theme: "default",
      });
      editors["BUDGET_OUTPUT"] = cmOutput;
      cmOutput.setValue(budgetSavedOutput);
    }

    const wrapCheck = document.getElementById("tmWrapText");
    const updateWrap = () => {
      const isChecked = wrapCheck ? wrapCheck.checked : false;
      tmStorage.setItem("tm_bot_wrap", isChecked);

      panel.querySelectorAll(".tm-textarea").forEach((el) => {
        el.style.whiteSpace = isChecked ? "pre-wrap" : "pre";
      });

      Object.values(editors).forEach((editor) => {
        editor.setOption("lineWrapping", isChecked);
        editor.refresh();
      });
    };

    if (wrapCheck) {
      const savedWrap = tmStorage.getItem("tm_bot_wrap");
      wrapCheck.checked = savedWrap === "true" || savedWrap === true;
      updateWrap();
      wrapCheck.onchange = updateWrap;
    }

    const companySelect = document.getElementById("tmBudgetCompany");
    if (companySelect) {
      const savedCompany = tmStorage.getItem("tm_bot_budget_company");
      if (savedCompany) {
        companySelect.value = savedCompany;
      }
      companySelect.onchange = function () {
        tmStorage.setItem("tm_bot_budget_company", this.value);
      };
    }

    const generateSQLBtn = document.getElementById("tmGenerateSQL");
    if (generateSQLBtn) {
      generateSQLBtn.onclick = () => {
        try {
          const inputVal = editors["BUDGET"] ? editors["BUDGET"].getValue() : document.getElementById("tmInput_BUDGET").value;
          const data = JSON.parse(inputVal);
          const companyVal = companySelect ? companySelect.value : "dong_a";
          const sql = generateBudgetSQL(data, companyVal);

          if (editors["BUDGET_OUTPUT"]) {
            editors["BUDGET_OUTPUT"].setValue(sql);
          } else {
            budgetOutputTextarea.value = sql;
          }

          tmStorage.setItem("tm_bot_budget_output", sql);

          generateSQLBtn.innerText = "SQL GENERATED!";
          generateSQLBtn.style.background = "#059669";
          generateSQLBtn.style.color = "#ffffff";

          const flashTarget = budgetOutputTextarea.closest(".tm-editor-container") || budgetOutputTextarea;
          flashTarget.classList.add("tm-pulse-border");
          setTimeout(() => {
            flashTarget.classList.remove("tm-pulse-border");
          }, 1000);
        } catch (e) {
          console.error(e);
          showToast("Error: " + e.message, "error");
        }
      };
    }

    const copySQLBtn = document.getElementById("tmCopySQL");
    if (copySQLBtn) {
      copySQLBtn.onclick = () => {
        const textToCopy = editors["BUDGET_OUTPUT"] ? editors["BUDGET_OUTPUT"].getValue() : budgetOutputTextarea.value;
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            copySQLBtn.innerHTML = ICONS.CHECK;
            copySQLBtn.classList.add("tm-copied");
            setTimeout(() => {
              copySQLBtn.innerHTML = ICONS.COPY;
              copySQLBtn.classList.remove("tm-copied");
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy SQL script: ", err);
          });
      };
    }

    // Initialize global fonts sizes initially
    updateGlobalFontSize(fontSize);
  }

  // =========================================================================
  // 9. INITIALIZATION & LIFECYCLE
  // =========================================================================
  ensureCodeMirrorLoaded().then((loaded) => {
    if (loaded) {
      const panel = document.getElementById("tm-bot-panel");
      if (panel && panel.classList.contains("tm-visible")) renderPanel();
    }
  });

  setTimeout(() => {
    // 1. Check if the page is an explicit access denied error page
    if (isAccessDeniedPage()) {
      console.error("[BOT] Access Denied page detected on startup. Aborting pending automation.");
      purgeExecState();
      isBotRunning = false;
      injectUI();
      renderPanel();
      showToast("Access Denied: You do not have permission to access this page.", "error", 10000);
      return;
    }

    // 2. Check if a navigation attempt was recently recorded and redirected away
    const navAttemptStr = sessionStorage.getItem("tm_bot_nav_attempt");
    if (navAttemptStr) {
      try {
        const attempt = JSON.parse(navAttemptStr);
        sessionStorage.removeItem("tm_bot_nav_attempt");

        const isRecent = attempt.timestamp && Date.now() - attempt.timestamp < 45000;
        const reachedTarget = attempt.targetPath && window.location.pathname.includes(attempt.targetPath);

        if (isRecent && !reachedTarget) {
          console.error(
            `[BOT] Circuit Breaker: Navigation to "${attempt.targetPath}" was redirected to "${window.location.pathname}". Current user account cannot access this URL.`
          );
          purgeExecState();
          isBotRunning = false;
          isBotPaused = false;

          openPanel();

          if (attempt.tab) {
            currentTab = attempt.tab;
            switchToTab(attempt.tab);
          }
          renderPanel();

          const errMsg = `⛔ Access Restricted: Cannot access "${attempt.targetPath}". The browser was redirected to "${window.location.pathname}". Your account may lack permissions. Automation stopped to prevent an infinite reload loop.`;
          appendLog(attempt.tab || currentTab, errMsg, "error");
          showToast(`Access Restricted: Cannot access ${attempt.targetPath}`, "error", 10000);

          const statusEl = document.getElementById("tmBotStatus");
          if (statusEl) {
            statusEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="margin-right:4px; color:#ef4444;"></i>Access Denied`;
            statusEl.className = "tm-status tm-status-inline tm-status-error";
          }
          return;
        }
      } catch (e) {
        sessionStorage.removeItem("tm_bot_nav_attempt");
      }
    }

    // 3. Normal startup or resume
    const saved = tmStorage.getItem("tm_bot_exec_state");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        isBotRunning = true;
        currentTab = s.tab;
        if (s.stats) execStats = s.stats;
        injectUI();
        renderPanel();
        startBotLoop(s.items, s.currentIndex, s.isDryRun, s.tab);
      } catch (e) {
        purgeExecState();
      }
    } else {
      injectUI();
    }
  }, 1500);

  setInterval(injectUI, 2000);

  // =========================================================================
  // 10. PREMIUM LIGHT MODE & CODEOVERRIDE CSS
  // =========================================================================
  const BOT_CSS = `
    #tm-bot-panel, #tm-bot-icon {
        --color-primary: #ff3366;
        --color-primary-hover: #cc0039;
        --color-primary-rgb: 255, 51, 102;
        
        --color-bg-panel: rgba(255, 255, 255, 0.90);
        --color-bg-header: rgba(255, 255, 255, 0.80);
        --color-bg-tabbar: rgba(241, 245, 249, 0.80);
        --color-bg-tab-active: #ffffff;
        --color-bg-editor: #ffffff;
        --color-bg-log: #ffffff;
        --color-bg-btn-secondary: #ffffff;
        --color-bg-btn-secondary-hover: #f1f5f9;
        
        --color-border-subtle: rgba(148, 163, 184, 0.2);
        --color-border-header: rgba(226, 232, 240, 0.8);
        --color-border-tabbar: rgba(226, 232, 240, 0.5);
        --color-border-input: #cbd5e1;
        
        --color-text-main: #1e293b;
        --color-text-title: #0f172a;
        --color-text-muted: #64748b;
        --color-text-tab: #475569;
        --color-text-btn-secondary: #334155;
        
        --color-success: #059669;
        --color-success-bg: #ecfdf5;
        --color-error: #ef4444;
        --color-error-bg: #fef2f2;
        --color-warning: #d97706;
        --color-warning-bg: #fffbeb;
    }

    #tm-bot-panel {
        display: flex !important;
        flex-direction: column !important;
        visibility: hidden;
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
        transform-origin: top right;
        position: fixed;
        top: 66px;
        right: 20px;
        z-index: 999999;
        width: 420px;
        max-width: calc(100vw - 40px);
        max-height: calc(100vh - 82px);
        background: var(--color-bg-panel);
        backdrop-filter: blur(25px) saturate(180%);
        -webkit-backdrop-filter: blur(25px) saturate(180%);
        box-shadow: 0 20px 48px -8px rgba(15, 23, 42, 0.16), 0 4px 12px rgba(15, 23, 42, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.85);
        border: 1px solid var(--color-border-subtle);
        border-radius: 16px;
        padding: 0;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        color: var(--color-text-main);
        overflow: hidden;
        transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                    visibility 0.22s,
                    width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: width, transform, opacity;
    }
    #tm-bot-panel.tm-visible {
        visibility: visible;
        opacity: 1;
        transform: scale(1) translateY(0);
        transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                    opacity 0.26s cubic-bezier(0.16, 1, 0.3, 1),
                    width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #tm-bot-panel.tm-closing {
        visibility: visible;
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
        transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    #tm-bot-panel.tm-expanded {
        width: 620px;
    }

    /* High-Performance Ambient Mesh Background (Replaces Heavy Stacked Blur Blobs) */
    #tm-bot-panel .tm-ambient-bg {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
        border-radius: 14px;
        opacity: 0.60;
        transform: translateZ(0);
        will-change: transform;
    }
    #tm-bot-panel .tm-ambient-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(35px);
        -webkit-filter: blur(35px);
        transform: translateZ(0);
        will-change: transform;
    }
    #tm-bot-panel .tm-ambient-1 {
        width: 320px;
        height: 320px;
        top: -60px;
        left: -40px;
        background: radial-gradient(circle, rgba(254, 205, 211, 0.70) 0%, rgba(253, 164, 175, 0.30) 45%, transparent 70%);
        animation: tm-ambient-float-1 18s ease-in-out infinite;
    }
    #tm-bot-panel .tm-ambient-2 {
        width: 340px;
        height: 340px;
        bottom: -70px;
        right: -50px;
        background: radial-gradient(circle, rgba(221, 214, 254, 0.65) 0%, rgba(196, 181, 253, 0.25) 45%, transparent 70%);
        animation: tm-ambient-float-2 22s ease-in-out infinite;
    }

    @keyframes tm-ambient-float-1 {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        50% { transform: translate3d(35px, 30px, 0) scale(1.10); }
    }
    @keyframes tm-ambient-float-2 {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1.05); }
        50% { transform: translate3d(-30px, -25px, 0) scale(0.92); }
    }

    /* Pause all background animations when panel is closed to achieve 0 GPU drain */
    #tm-bot-panel:not(.tm-visible) .tm-ambient-bg,
    #tm-bot-panel:not(.tm-visible) .tm-ambient-glow,
    #tm-bot-panel:not(.tm-visible) .tm-hud-progress-fill {
        animation-play-state: paused !important;
    }

    #tm-bot-panel .tm-header,
    #tm-bot-panel .tm-tab-bar,
    #tm-bot-panel .tm-tab-contents {
        position: relative;
        z-index: 1;
    }
    #tm-bot-panel .tm-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: var(--color-bg-header);
        border-bottom: 1px solid var(--color-border-header);
    }
    #tm-bot-panel .tm-header-actions {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    #tm-bot-panel .tm-header .tm-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--color-text-title);
        display: flex;
        align-items: center;
        gap: 6px;
    }
    #tm-bot-panel .tm-version-badge {
        font-size: 10px;
        font-weight: 700;
        font-family: 'IBM Plex Mono', monospace;
        color: var(--color-primary);
        background: rgba(var(--color-primary-rgb), 0.08);
        border: 1px solid rgba(var(--color-primary-rgb), 0.20);
        padding: 1px 6px;
        border-radius: 999px;
        letter-spacing: 0.3px;
        line-height: 1.3;
        display: inline-flex;
        align-items: center;
    }
    #tm-bot-panel .tm-close,
    #tm-bot-panel .tm-header-icon-btn {
        background: none;
        border: none;
        color: var(--color-text-muted);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        padding: 0;
        border-radius: 6px;
        transition: all 0.15s ease;
    }
    #tm-bot-panel .tm-close {
        transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s, background 0.15s;
    }
    #tm-bot-panel .tm-close:hover {
        background: rgba(239, 68, 68, 0.1);
        color: var(--color-error);
        transform: rotate(90deg);
    }
    #tm-bot-panel .tm-header-icon-btn:hover {
        background: var(--color-bg-btn-secondary-hover);
        color: var(--color-text-title);
    }
    #tm-bot-panel .tm-close:active,
    #tm-bot-panel .tm-header-icon-btn:active {
        transform: scale(0.92);
    }
    
    /* =========================================================================
       RENOVATED SEGMENTED DOCK TAB BAR & FLOATING ACTIVE PILL INDICATOR
       ========================================================================= */
    #tm-bot-panel .tm-tab-bar {
        position: relative;
        display: flex;
        align-items: center;
        background: rgba(241, 245, 249, 0.75);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        padding: 3px;
        margin: 10px 16px 2px;
        border-radius: 12px;
        border: 1px solid rgba(203, 213, 225, 0.65);
        box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
        flex-shrink: 0;
        user-select: none;
    }
    #tm-bot-panel .tm-tab-pill-indicator {
        position: absolute;
        top: 3px;
        bottom: 3px;
        left: 0;
        width: 20%;
        background: #ffffff;
        border-radius: 9px;
        border: 1px solid rgba(255, 255, 255, 0.95);
        box-shadow: 0 3px 8px -1px rgba(15, 23, 42, 0.09), 0 1px 3px rgba(15, 23, 42, 0.04);
        transition: transform 0.28s cubic-bezier(0.34, 1.35, 0.64, 1),
                    width 0.28s cubic-bezier(0.34, 1.35, 0.64, 1);
        pointer-events: none;
        z-index: 1;
    }
    #tm-bot-panel .tm-tab-pill-indicator::after {
        content: '';
        position: absolute;
        bottom: 2.5px;
        left: 50%;
        transform: translateX(-50%);
        width: 14px;
        height: 2px;
        background: var(--color-primary);
        border-radius: 99px;
        opacity: 0.9;
        box-shadow: 0 0 6px rgba(255, 51, 102, 0.4);
    }
    #tm-bot-panel .tm-tab-btn {
        position: relative;
        z-index: 2;
        flex: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background: transparent;
        border: none;
        padding: 6.5px 4px;
        font-size: 11.5px;
        font-weight: 600;
        color: var(--color-text-tab);
        cursor: pointer;
        border-radius: 9px;
        transition: color 0.18s ease,
                    background-color 0.18s ease,
                    transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
        text-align: center;
        user-select: none;
        white-space: nowrap;
    }
    #tm-bot-panel .tm-tab-btn:hover:not(.active) {
        color: var(--color-text-title);
        background: rgba(255, 255, 255, 0.5);
    }
    #tm-bot-panel .tm-tab-btn:active {
        transform: scale(0.96);
    }
    #tm-bot-panel .tm-tab-btn.active {
        color: var(--color-text-title);
        font-weight: 700;
        background: transparent;
        box-shadow: none;
    }
    #tm-bot-panel .tm-tab-btn .tm-tab-icon {
        font-size: 11px;
        opacity: 0.7;
        transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
                    opacity 0.2s ease,
                    color 0.2s ease;
        flex-shrink: 0;
    }
    #tm-bot-panel .tm-tab-btn:hover:not(.active) .tm-tab-icon {
        opacity: 0.95;
        transform: translateY(-1px);
    }
    #tm-bot-panel .tm-tab-btn.active .tm-tab-icon {
        color: var(--color-primary);
        opacity: 1;
        transform: scale(1.1);
    }
    #tm-bot-panel .tm-tab-btn .tm-tab-label {
        letter-spacing: 0.15px;
    }
    #tm-bot-panel .tm-tab-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--color-success);
        box-shadow: 0 0 6px rgba(5, 150, 105, 0.6);
        display: inline-block;
        margin-left: 1px;
        opacity: 0;
        transform: scale(0);
        transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    #tm-bot-panel .tm-tab-btn.tm-running .tm-tab-dot {
        opacity: 1;
        transform: scale(1);
        animation: tm-dot-pulse 1.5s ease-in-out infinite;
    }
    @keyframes tm-dot-pulse {
        0%, 100% {
            opacity: 0.45;
            transform: scale(0.85);
            box-shadow: 0 0 4px rgba(5, 150, 105, 0.4);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
            box-shadow: 0 0 8px rgba(5, 150, 105, 0.8);
        }
    }
    
    /* =========================================================================
       RENOVATED DIRECTIONAL TAB SWITCH ANIMATIONS
       ========================================================================= */
    #tm-bot-panel .tm-tab-contents {
        background: transparent;
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
    }
    #tm-bot-panel .tm-tab-pane {
        display: none;
        padding: 12px 16px 16px;
        opacity: 0;
        will-change: transform, opacity;
    }
    #tm-bot-panel .tm-tab-pane.tm-active {
        display: block;
        opacity: 1;
        animation: tm-tab-slide-forward 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    #tm-bot-panel .tm-tab-contents[data-slide-direction="forward"] .tm-tab-pane.tm-active {
        animation: tm-tab-slide-forward 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    #tm-bot-panel .tm-tab-contents[data-slide-direction="backward"] .tm-tab-pane.tm-active {
        animation: tm-tab-slide-backward 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes tm-tab-slide-forward {
        0% {
            opacity: 0;
            transform: translateX(18px) scale(0.99);
        }
        100% {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
    }
    @keyframes tm-tab-slide-backward {
        0% {
            opacity: 0;
            transform: translateX(-18px) scale(0.99);
        }
        100% {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
    }

    /* Sleek Custom Scrollbars for Panel, Logs & Editors */
    #tm-bot-panel .tm-tab-contents::-webkit-scrollbar,
    #tm-bot-panel .tm-log::-webkit-scrollbar,
    #tm-bot-panel .tm-textarea::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    #tm-bot-panel .tm-tab-contents::-webkit-scrollbar-track,
    #tm-bot-panel .tm-log::-webkit-scrollbar-track,
    #tm-bot-panel .tm-textarea::-webkit-scrollbar-track {
        background: transparent;
    }
    #tm-bot-panel .tm-tab-contents::-webkit-scrollbar-thumb,
    #tm-bot-panel .tm-log::-webkit-scrollbar-thumb,
    #tm-bot-panel .tm-textarea::-webkit-scrollbar-thumb {
        background: rgba(148, 163, 184, 0.35);
        border-radius: 999px;
    }
    #tm-bot-panel .tm-tab-contents::-webkit-scrollbar-thumb:hover,
    #tm-bot-panel .tm-log::-webkit-scrollbar-thumb:hover,
    #tm-bot-panel .tm-textarea::-webkit-scrollbar-thumb:hover {
        background: rgba(148, 163, 184, 0.65);
    }
    @keyframes tm-fade-in {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
    }

    #tm-bot-panel .tm-body { padding: 0; }
    
    #tm-bot-panel .tm-editor-container {
        position: relative;
        width: 100%;
        margin-bottom: 8px;
        background: var(--color-bg-editor);
        border: 1px solid var(--color-border-input);
        border-radius: 8px;
        overflow: hidden;
        resize: vertical;
        transition: all 0.2s ease;
    }
    #tm-bot-panel .tm-editor-container:focus-within {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.15);
    }
    #tm-bot-panel .tm-editor-toolbar {
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    #tm-bot-panel .tm-editor-meta-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 3px 2px 6px;
        border-bottom: 1px solid var(--color-border-subtle);
        overflow: hidden;
    }
    #tm-bot-panel .tm-editor-meta {
        font-size: 11px;
        color: var(--color-text-muted);
        font-weight: 500;
        line-height: 1.4;
        display: flex;
        align-items: center;
        gap: 6px;
        width: 100%;
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
    }
    #tm-bot-panel .tm-editor-meta .tm-meta-stats {
        flex-shrink: 0;
    }
    #tm-bot-panel .tm-editor-meta .tm-meta-sep {
        color: var(--color-border-subtle);
        flex-shrink: 0;
        margin: 0 1px;
    }
    #tm-bot-panel .tm-editor-meta .tm-error-link {
        color: var(--color-error);
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
        flex: 1;
        transition: color 0.15s ease;
    }
    #tm-bot-panel .tm-editor-meta .tm-error-link:hover {
        color: #b91c1c;
        text-decoration: underline;
    }
    #tm-bot-panel .tm-editor-meta .tm-error-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    #tm-bot-panel .tm-editor-tools-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
    }
    #tm-bot-panel .tm-tools-left,
    #tm-bot-panel .tm-tools-right {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    #tm-bot-panel .tm-editor-format-row {
        display: flex;
        align-items: center;
        gap: 6px;
    }
    #tm-bot-panel .tm-editor-btn {
        flex: 1;
        height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--color-border-input);
        background: var(--color-bg-btn-secondary);
        color: var(--color-text-btn-secondary);
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        padding: 0 10px;
        cursor: pointer;
        transition: all 0.15s ease;
        box-sizing: border-box;
    }
    #tm-bot-panel .tm-editor-btn:hover {
        background-color: var(--color-bg-btn-secondary-hover);
        border-color: var(--color-text-muted);
        color: var(--color-text-title);
    }
    #tm-bot-panel .tm-editor-btn:active {
        transform: translateY(1px);
    }
    #tm-bot-panel .tm-textarea {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
        background: transparent !important;
        color: var(--color-text-main) !important;
        caret-color: var(--color-text-tab);
        resize: none;
        outline: none !important;
        overflow-y: auto;
        overflow-x: auto;
        border: none !important;
        padding: 8px;
        box-sizing: border-box;
        font-family: 'IBM Plex Mono', monospace !important;
        font-size: 11px;
        line-height: 1.5;
    }
    
    /* CodeMirror Light Theme Overrides */
    #tm-bot-panel .CodeMirror {
        height: 100%;
        background: transparent;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 11px;
        line-height: 1.5;
    }
    #tm-bot-panel .CodeMirror-gutters {
        border-right: 1px solid var(--color-border-header);
        background: var(--color-bg-tabbar);
    }
    #tm-bot-panel .CodeMirror-linenumber {
        color: var(--color-text-muted);
    }
    #tm-bot-panel .CodeMirror .cm-property { color: #d01557; font-weight: 600; }
    #tm-bot-panel .CodeMirror .cm-string { color: #0f766e; }
    #tm-bot-panel .CodeMirror .cm-number { color: #0369a1; }
    #tm-bot-panel .CodeMirror .cm-atom { color: #6d28d9; font-weight: 600; }
    #tm-bot-panel .CodeMirror-selected { background: rgba(var(--color-primary-rgb), 0.15) !important; }
    
    .hl-key { color: #d01557; }
    .hl-string { color: #0f766e; }
    .hl-num { color: #0369a1; }
    .hl-bool { color: #d01557; }
    .hl-keyword { color: #6d28d9; font-weight: 600; }
    .hl-comment { color: var(--color-text-muted); font-style: italic; }
    .hl-bracket { color: var(--color-text-tab); }

    #tm-bot-panel .tm-options {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    #tm-bot-panel .tm-checkbox-container {
        display: inline-block;
        cursor: pointer;
        user-select: none;
    }
    #tm-bot-panel .tm-checkbox-container input {
        display: none;
    }
    #tm-bot-panel .tm-pill-text {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 600;
        color: var(--color-text-tab);
        background-color: var(--color-bg-tabbar);
        border: 1px solid var(--color-border-input);
        border-radius: 12px;
        padding: 3px 8px;
        transition: all 0.15s ease;
    }
    #tm-bot-panel .tm-checkbox-container:hover input:not(:checked) ~ .tm-pill-text {
        background-color: var(--color-bg-btn-secondary-hover);
        color: var(--color-text-title);
    }
    #tm-bot-panel .tm-checkbox-container input:checked ~ .tm-pill-text {
        background-color: var(--color-primary);
        border-color: var(--color-primary);
        color: #fff;
        box-shadow: 0 2px 4px rgba(var(--color-primary-rgb), 0.2);
    }
    #tm-bot-panel .tm-checkbox-container input:disabled ~ .tm-pill-text {
        opacity: 0.5;
        cursor: not-allowed;
    }

    #tm-bot-panel .tm-pill-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 600;
        color: var(--color-text-tab);
        background-color: var(--color-bg-btn-secondary);
        border: 1px solid var(--color-border-input);
        border-radius: 12px;
        padding: 0 8px;
        height: 24px;
        box-sizing: border-box;
        transition: all 0.15s ease;
        cursor: pointer;
    }
    #tm-bot-panel .tm-pill-btn:hover {
        background-color: var(--color-bg-btn-secondary-hover);
        color: var(--color-text-title);
    }
    #tm-bot-panel .tm-pill-btn.primary {
        color: var(--color-primary);
        border-color: rgba(var(--color-primary-rgb), 0.4);
    }
    #tm-bot-panel .tm-pill-btn:active {
        transform: translateY(1px);
    }

    /* Settings Slide-over Drawer */
    #tm-bot-panel .tm-settings-drawer {
        position: absolute;
        inset: 0;
        background: var(--color-bg-panel);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        z-index: 50;
        display: flex;
        flex-direction: column;
        transform: translateX(100%);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
    }
    #tm-bot-panel .tm-settings-drawer.tm-open {
        transform: translateX(0);
        pointer-events: auto;
    }
    #tm-bot-panel .tm-settings-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: var(--color-bg-header);
        border-bottom: 1px solid var(--color-border-header);
    }
    #tm-bot-panel .tm-settings-title {
        font-size: 13px;
        font-weight: 700;
        color: var(--color-text-title);
        display: flex;
        align-items: center;
    }
    #tm-bot-panel .tm-settings-body {
        padding: 16px;
        overflow-y: auto;
        flex: 1;
    }
    #tm-bot-panel .tm-speed-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
    #tm-bot-panel .tm-speed-item {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }
    #tm-bot-panel .tm-speed-item label {
        font-size: 10px;
        color: var(--color-text-muted);
        font-weight: 600;
    }
    #tm-bot-panel .tm-speed-input {
        width: 100%;
        padding: 4px 6px;
        border: 1px solid var(--color-border-input);
        border-radius: 6px;
        font-size: 11px;
        outline: none;
        background: var(--color-bg-btn-secondary);
        color: var(--color-text-main);
        transition: border-color 0.15s, box-shadow 0.15s;
    }
    #tm-bot-panel .tm-speed-input:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.15);
    }

    /* Action Buttons Row with Zero-Shift Spring Morphing */
    #tm-bot-panel .tm-actions {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        width: 100%;
        box-sizing: border-box;
    }
    #tm-bot-panel .tm-btn {
        padding: 7px 10px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-weight: 700;
        font-size: 11px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;
        transition: flex 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                    max-width 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                    opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                    padding 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                    margin 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                    border-color 0.2s ease,
                    transform 0.15s ease,
                    box-shadow 0.2s ease;
    }
    #tm-bot-panel .tm-btn:active:not(:disabled) {
        transform: translateY(1px) scale(0.98);
    }
    #tm-bot-panel .tm-btn-run {
        flex: 2 1 0%;
        width: 100%;
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
        color: #fff;
        box-shadow: 0 2px 8px rgba(var(--color-primary-rgb), 0.25);
    }
    #tm-bot-panel .tm-btn-run:hover:not(:disabled) {
        box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.35);
    }
    #tm-bot-panel .tm-btn-run:disabled {
        background: var(--color-border-header);
        color: var(--color-text-muted);
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
    }
    #tm-bot-panel .tm-btn-pause,
    #tm-bot-panel .tm-btn-skip,
    #tm-bot-panel .tm-btn-stop {
        flex: 0 0 0px;
        max-width: 0px;
        opacity: 0;
        padding-left: 0;
        padding-right: 0;
        margin-left: 0;
        border-width: 0;
        pointer-events: none;
        visibility: hidden;
    }
    #tm-bot-panel .tm-btn-pause.tm-visible,
    #tm-bot-panel .tm-btn-skip.tm-visible,
    #tm-bot-panel .tm-btn-stop.tm-visible {
        flex: 1 1 0%;
        max-width: 90px;
        opacity: 1;
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 6px;
        border-width: 1px;
        pointer-events: auto;
        visibility: visible;
    }
    #tm-bot-panel .tm-btn-pause {
        background: var(--color-warning-bg);
        color: var(--color-warning);
        border-color: rgba(217, 119, 6, 0.3);
    }
    #tm-bot-panel .tm-btn-pause:hover {
        background: rgba(217, 119, 6, 0.18);
    }
    #tm-bot-panel .tm-btn-skip {
        background: var(--color-bg-btn-secondary);
        color: var(--color-text-btn-secondary);
        border-color: var(--color-border-input);
    }
    #tm-bot-panel .tm-btn-skip:hover {
        background: var(--color-bg-btn-secondary-hover);
        color: var(--color-text-title);
    }
    #tm-bot-panel .tm-btn-stop {
        background: var(--color-error-bg);
        color: var(--color-error);
        border-color: rgba(239, 68, 68, 0.3);
    }
    #tm-bot-panel .tm-btn-stop:hover:not(:disabled) {
        background: rgba(239, 68, 68, 0.18);
    }

    /* Execution HUD Card */
    #tm-bot-panel .tm-hud-card {
        background: var(--color-bg-editor);
        border: 1px solid var(--color-border-header);
        border-radius: 8px;
        padding: 9px 12px;
        margin-bottom: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        animation: tm-fade-in 0.2s ease-out;
    }
    #tm-bot-panel .tm-hud-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
    }
    #tm-bot-panel .tm-hud-label {
        display: flex;
        align-items: center;
        gap: 6px;
        overflow: hidden;
        max-width: 78%;
    }
    #tm-bot-panel .tm-hud-status-badge {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        padding: 2px 6px;
        border-radius: 4px;
    }
    #tm-bot-panel .tm-hud-status-badge.tm-status-running {
        background: var(--color-success-bg);
        color: var(--color-success);
    }
    #tm-bot-panel .tm-hud-status-badge.tm-status-paused {
        background: var(--color-warning-bg);
        color: var(--color-warning);
    }
    #tm-bot-panel .tm-hud-status-badge.tm-status-idle {
        background: var(--color-bg-tabbar);
        color: var(--color-text-muted);
    }
    #tm-bot-panel .tm-hud-item-name {
        font-size: 11px;
        font-weight: 600;
        color: var(--color-text-main);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    #tm-bot-panel .tm-hud-pct {
        font-size: 13px;
        font-weight: 800;
        font-family: 'IBM Plex Mono', monospace;
        color: var(--color-primary);
    }
    #tm-bot-panel .tm-hud-progress-track {
        width: 100%;
        height: 6px;
        background: #e2e8f0;
        border-radius: 999px;
        overflow: hidden;
        margin-bottom: 8px;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.06);
    }
    #tm-bot-panel .tm-hud-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #ff3366 0%, #ff758c 50%, #ff3366 100%);
        background-size: 200% 100%;
        border-radius: 999px;
        box-shadow: 0 0 10px rgba(255, 51, 102, 0.45);
        transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        animation: tm-progress-shimmer 2.2s linear infinite;
    }
    @keyframes tm-progress-shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
    }
    #tm-bot-panel .tm-hud-counters {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #tm-bot-panel .tm-hud-counter-text {
        font-size: 11px;
        color: var(--color-text-muted);
    }
    #tm-bot-panel .tm-hud-counter-text b {
        color: var(--color-text-title);
    }
    #tm-bot-panel .tm-hud-badges {
        display: flex;
        gap: 4px;
    }
    #tm-bot-panel .tm-badge {
        font-size: 10px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        gap: 2px;
        transition: transform 0.2s ease;
    }
    @keyframes tm-bump {
        0% { transform: scale(1); }
        40% { transform: scale(1.24); }
        100% { transform: scale(1); }
    }
    #tm-bot-panel .tm-badge.tm-bump {
        animation: tm-bump 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    #tm-bot-panel .tm-badge-success {
        background: var(--color-success-bg);
        color: var(--color-success);
    }
    #tm-bot-panel .tm-badge-error {
        background: var(--color-error-bg);
        color: var(--color-error);
    }
    #tm-bot-panel .tm-badge-skipped {
        background: var(--color-warning-bg);
        color: var(--color-warning);
    }

    /* Enhanced Log Container & Toolbar */
    #tm-bot-panel .tm-log-container {
        margin-top: 8px;
        background: var(--color-bg-log);
        border: 1px solid var(--color-border-header);
        border-radius: 8px;
        overflow: hidden;
    }
    #tm-bot-panel .tm-log-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 8px;
        background: var(--color-bg-header);
        border-bottom: 1px solid var(--color-border-header);
    }
    #tm-bot-panel .tm-log-filters {
        display: flex;
        gap: 3px;
    }
    #tm-bot-panel .tm-filter-btn {
        background: transparent;
        border: 1px solid transparent;
        border-radius: 4px;
        padding: 2px 6px;
        font-size: 10px;
        font-weight: 600;
        color: var(--color-text-muted);
        cursor: pointer;
        transition: all 0.15s ease;
    }
    #tm-bot-panel .tm-filter-btn:hover {
        color: var(--color-text-title);
        background: rgba(0, 0, 0, 0.04);
    }
    #tm-bot-panel .tm-filter-btn.active {
        background: #ffffff;
        border-color: var(--color-border-input);
        color: var(--color-primary);
        box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    #tm-bot-panel .tm-log-actions {
        display: flex;
        gap: 4px;
    }
    #tm-bot-panel .tm-log-btn {
        background: #ffffff;
        border: 1px solid var(--color-border-input);
        border-radius: 4px;
        padding: 2px 6px;
        font-size: 10px;
        font-weight: 600;
        color: var(--color-text-btn-secondary);
        cursor: pointer;
        transition: all 0.15s ease;
    }
    #tm-bot-panel .tm-log-btn:hover {
        background: var(--color-bg-btn-secondary-hover);
        color: var(--color-text-title);
    }
    #tm-bot-panel .tm-log {
        margin: 0;
        font-size: 11px;
        font-family: 'IBM Plex Mono', monospace;
        color: var(--color-text-btn-secondary);
        max-height: 160px;
        overflow-y: auto;
        padding: 8px 10px;
        border: none;
        border-radius: 0;
        background: transparent;
    }
    #tm-bot-panel .tm-log-entry {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        margin-bottom: 3px;
        line-height: 1.45;
        word-break: break-word;
    }
    #tm-bot-panel .tm-log-time {
        color: #94a3b8;
        font-size: 10px;
        flex-shrink: 0;
    }
    #tm-bot-panel .tm-log-tag {
        font-size: 9px;
        font-weight: 700;
        padding: 1px 4px;
        border-radius: 3px;
        flex-shrink: 0;
        text-transform: uppercase;
    }
    #tm-bot-panel .tm-tag-info { background: #e2e8f0; color: #475569; }
    #tm-bot-panel .tm-tag-success { background: #d1fae5; color: #047857; }
    #tm-bot-panel .tm-tag-error { background: #fee2e2; color: #b91c1c; }
    #tm-bot-panel .tm-tag-warn { background: #fef3c7; color: #b45309; }

    #tm-bot-panel .tm-log-msg {
        flex: 1;
    }
    #tm-bot-panel .tm-log.filter-error .tm-log-entry:not([data-level="error"]) {
        display: none !important;
    }
    #tm-bot-panel .tm-log.filter-success .tm-log-entry:not([data-level="success"]) {
        display: none !important;
    }

    /* Premium Status Inline display */
    #tm-bot-panel .tm-status-inline {
        font-size: 11px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 20px;
    }
    #tm-bot-panel .tm-status-ready {
        background: var(--color-bg-tabbar);
        color: var(--color-text-muted);
    }
    #tm-bot-panel .tm-status-running {
        background: var(--color-success-bg);
        color: var(--color-success);
        animation: tm-pulse-running-bg 1.8s ease-in-out infinite;
    }
    #tm-bot-panel .tm-status-paused {
        background: var(--color-warning-bg);
        color: var(--color-warning);
        animation: tm-pulse-paused-bg 1.8s ease-in-out infinite;
    }
    
    #tm-bot-panel .tm-btn-continue-pulse {
        animation: tm-pulse-btn-border 2s infinite;
    }
    @keyframes tm-pulse-btn-border {
        0% { box-shadow: 0 0 0 0px rgba(var(--color-primary-rgb), 0.7); }
        70% { box-shadow: 0 0 0 8px rgba(var(--color-primary-rgb), 0); }
        100% { box-shadow: 0 0 0 0px rgba(var(--color-primary-rgb), 0); }
    }
    
    /* Manual Action Banner for Dry Run */
    #tm-bot-panel .tm-manual-banner {
        background: #fffbeb;
        border: 1px solid #fde68a;
        border-radius: 8px;
        padding: 9px 12px;
        margin: 8px 0;
        box-shadow: 0 2px 6px rgba(217, 119, 6, 0.08);
        animation: tm-fade-in 0.2s ease-out;
    }
    #tm-bot-panel .tm-manual-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 4px;
    }
    #tm-bot-panel .tm-manual-icon {
        font-size: 13px;
        line-height: 1;
    }
    #tm-bot-panel .tm-manual-title {
        font-size: 10px;
        font-weight: 700;
        color: #92400e;
        text-transform: uppercase;
        letter-spacing: 0.4px;
    }
    #tm-bot-panel .tm-manual-desc {
        font-size: 11px;
        line-height: 1.45;
        color: #78350f;
        margin-bottom: 8px;
    }
    #tm-bot-panel .tm-manual-desc b {
        color: #451a03;
        font-weight: 700;
    }

    /* Budget automation view elements */
    #tm-bot-panel .tm-select {
        width: 100%;
        padding: 6px 10px;
        border: 1px solid var(--color-border-input);
        border-radius: 8px;
        font-size: 12px;
        background: var(--color-bg-btn-secondary);
        margin-bottom: 12px;
        outline: none;
        color: var(--color-text-btn-secondary);
    }
    #tm-bot-panel .tm-select:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.15);
    }
    #tm-bot-panel .tm-copy-btn {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 26px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-bg-btn-secondary);
        color: var(--color-text-muted);
        border: 1px solid var(--color-border-input);
        border-radius: 6px;
        cursor: pointer;
        z-index: 2;
        transition: all 0.2s ease;
    }
    #tm-bot-panel .tm-copy-btn:hover {
        background-color: var(--color-bg-btn-secondary-hover);
        color: var(--color-primary);
        border-color: var(--color-primary);
    }
    #tm-bot-panel .tm-copy-btn:active {
        transform: scale(0.92);
    }
    #tm-bot-panel .tm-copy-btn.tm-copied {
        background-color: var(--color-success-bg);
        border-color: var(--color-success);
        color: var(--color-success);
    }

    #tm-bot-icon button {
        position: absolute !important;
        inset: 0 !important;
        margin: auto !important;
        box-sizing: border-box !important;
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%) !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
        border-radius: 50% !important;
        width: 38px !important;
        height: 38px !important;
        padding: 0 !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-shadow: 0 4px 10px rgba(var(--color-primary-rgb), 0.25) !important;
        transition: background-color 0.25s ease-in-out, background 0.25s ease-in-out, box-shadow 0.25s ease-in-out, border-radius 0.25s ease-in-out, transform 0.2s ease-in-out !important;
        outline: none !important;
    }
    #tm-bot-icon button:hover {
        border-radius: 50% !important;
        box-shadow: 0 6px 16px rgba(var(--color-primary-rgb), 0.4) !important;
    }
    #tm-bot-icon button:active {
        transform: scale(0.95) !important;
        box-shadow: 0 2px 4px rgba(var(--color-primary-rgb), 0.2) !important;
    }
    #tm-bot-icon .tm-modern-icon {
        color: #ffffff !important;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15)) !important;
        margin: 0 !important;
        padding: 0 !important;
        display: block !important;
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    #tm-bot-icon.tm-panel-open button {
        box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.35), 0 6px 18px rgba(var(--color-primary-rgb), 0.5) !important;
        transform: scale(1.05) !important;
    }
    #tm-bot-icon.tm-panel-open .tm-modern-icon {
        transform: rotate(14deg) scale(1.05);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }
    @keyframes tm-pop-in {
        0% { opacity: 0; transform: scale(0.6) translate3d(0, 0, 0); }
        100% { opacity: 1; transform: scale(1) translate3d(0, 0, 0); }
    }
    @keyframes tm-pulse-running-bg {
        0%, 100% { box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.4); }
        50% { box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15); }
    }
    @keyframes tm-pulse-paused-bg {
        0%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4); }
        50% { box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15); }
    }
    #tm-bot-icon {
        position: relative !important;
        display: block !important;
        width: 48px !important;
        height: 48px !important;
        overflow: visible !important;
        box-sizing: border-box !important;
        margin: 0 !important;
        padding: 0 !important;
        animation: tm-pop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important;
        will-change: transform;
        backface-visibility: hidden;
    }
    #tm-bot-icon .tm-border-loader {
        position: absolute !important;
        inset: 0 !important;
        margin: auto !important;
        pointer-events: none !important;
        z-index: 100 !important;
        filter: drop-shadow(0 0 3px rgba(5, 150, 105, 0.3)) !important;
        padding: 0 !important;
        opacity: 0;
        transform: scale(0.8) rotate(0deg);
        transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-sizing: border-box !important;
    }
    #tm-bot-icon.tm-running .tm-border-loader {
        opacity: 1;
        filter: drop-shadow(0 0 3px rgba(5, 150, 105, 0.4)) !important;
        animation: tm-rotate-loader-running 1.5s linear infinite !important;
    }
    #tm-bot-icon.tm-stopping .tm-border-loader {
        opacity: 1;
        filter: drop-shadow(0 0 3px rgba(217, 119, 6, 0.4)) !important;
        animation: tm-rotate-loader-running 1.5s linear infinite !important;
    }
    #tm-bot-icon .tm-border-loader circle {
        stroke-dasharray: 0 100 !important;
        stroke-dashoffset: 0;
        stroke-linecap: round !important;
        transition: stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s !important;
    }
    #tm-bot-icon.tm-running .tm-border-loader circle {
        stroke: var(--color-success) !important;
        stroke-dasharray: 30 70 !important;
        transition: stroke 0.3s ease, stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    #tm-bot-icon.tm-stopping .tm-border-loader circle {
        stroke: var(--color-warning) !important;
        stroke-dasharray: 100 0 !important;
        transition: stroke 0.3s ease, stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    #tm-bot-icon button:hover .tm-border-loader circle {
        /* Concentric circle sizing remains consistent */
    }
    @keyframes tm-rotate-loader-running {
        from { transform: rotate(0deg) scale(1); }
        to { transform: rotate(360deg) scale(1); }
    }
    
    @keyframes tm-pulse-border {
        0% { border-color: var(--color-success); box-shadow: 0 0 0 0px rgba(5, 150, 105, 0.4); }
        50% { border-color: var(--color-success); box-shadow: 0 0 0 5px rgba(5, 150, 105, 0.15); }
        100% { border-color: var(--color-border-input); box-shadow: 0 0 0 8px rgba(5, 150, 105, 0); }
    }
    #tm-bot-panel .tm-pulse-border {
        animation: tm-pulse-border 0.8s ease-out;
    }
    .tm-modern-icon-text {
        color: var(--color-primary);
    }

    /* CodeMirror Error Line & Drag Over */
    .tm-cm-error-line {
        background: rgba(239, 68, 68, 0.12) !important;
        border-left: 3px solid var(--color-error) !important;
    }
    .tm-drag-over {
        border-color: var(--color-primary) !important;
        background-color: rgba(255, 51, 102, 0.04) !important;
        box-shadow: 0 0 0 2px rgba(255, 51, 102, 0.2) inset !important;
    }

    /* Toast Notifications */
    #tmToastContainer {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 10000000;
        display: flex;
        flex-direction: column;
        gap: 8px;
        pointer-events: none;
        max-width: 360px;
    }
    .tm-toast {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 9px 14px;
        border-radius: 8px;
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 12px;
        font-weight: 500;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);
        animation: tm-toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
        transition: opacity 0.25s ease, transform 0.25s ease;
        pointer-events: auto;
    }
    .tm-toast-fadeout {
        opacity: 0;
        transform: translateY(6px);
    }
    .tm-toast-icon {
        font-size: 13px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .tm-toast-msg {
        line-height: 1.4;
        word-break: break-word;
    }
    .tm-toast-info {
        background: #1e293b;
        color: #f8fafc;
        border: 1px solid #334155;
    }
    .tm-toast-success {
        background: #064e3b;
        color: #ecfdf5;
        border: 1px solid #059669;
    }
    .tm-toast-error {
        background: #7f1d1d;
        color: #fef2f2;
        border: 1px solid #ef4444;
    }
    .tm-toast-warning {
        background: #78350f;
        color: #fffbeb;
        border: 1px solid #d97706;
    }
    @keyframes tm-toast-in {
        from { opacity: 0; transform: translateY(12px) scale(0.96); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
})();
