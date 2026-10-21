/**
 * Interactive Developer CLI Terminal Engine
 * 100% Custom JavaScript - Zero Dependencies
 * Hasibur Rahman Shanto - Senior Full-Stack Portfolio
 */

(function () {
    'use strict';

    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const terminalForm = document.getElementById('terminal-form');
    const clearBtn = document.getElementById('terminal-clear-btn');
    const pills = document.querySelectorAll('.cmd-pill');

    if (!terminalBody || !terminalInput || !terminalForm) return;

    // Command History
    const history = [];
    let historyIndex = -1;

    // System Responses
    const COMMANDS = {
        help: `
Available Commands:
  <span class="terminal-highlight">whoami</span>       : Developer profile, experience overview & engineering mindset
  <span class="terminal-highlight">skills</span>       : Full technical stack (Backend, DB, Frontend, DevOps, APIs)
  <span class="terminal-highlight">architecture</span> : Real problems solved, 42% latency cut & multi-tenant design
  <span class="terminal-highlight">projects</span>     : Flagship enterprise systems (BNSMSoft, WebRTC, EduTab, etc.)
  <span class="terminal-highlight">experience</span>   : Work history (WanIT BD LTD, Deelko LTD, Softvence Agency)
  <span class="terminal-highlight">resume / cv</span>  : Direct link to official resume (PDF)
  <span class="terminal-highlight">contact</span>      : Direct communication links (Email, Phone, GitHub, LinkedIn)
  <span class="terminal-highlight">clear</span>        : Clears the terminal screen
`,

        resume: `
<span class="terminal-success">[OFFICIAL RESUME & CV]</span>
Direct PDF File: <a href="assets/docs/Hasibur_Rahman_Shanto_Resume.pdf" target="_blank" class="terminal-highlight">Hasibur_Rahman_Shanto_Resume.pdf</a> (Click to open)
`,

        cv: `
<span class="terminal-success">[OFFICIAL RESUME & CV]</span>
Direct PDF File: <a href="assets/docs/Hasibur_Rahman_Shanto_Resume.pdf" target="_blank" class="terminal-highlight">Hasibur_Rahman_Shanto_Resume.pdf</a> (Click to open)
`,

        whoami: `
<span class="terminal-success">HASIBUR RAHMAN SHANTO</span>
Role       : Full-Stack Software Developer | Senior Laravel & Systems Engineer
Experience : 4+ Years of Professional Enterprise Production Engineering
Location   : Dhaka, Bangladesh
Philosophy : "I prioritize clean architecture, query optimization with EXPLAIN,
             asynchronous Redis queues, and resilient payment idempotency."
`,

        skills: `
<span class="terminal-highlight">[BACKEND & FRAMEWORKS]</span>
  • Modern PHP 8, Laravel 10 to 13, Horizon, Queues, Context, Pennant, PHP Attributes
  • Clean Architecture, Repositories & Service Design Patterns, SOLID Principles

<span class="terminal-highlight">[DATABASE & CACHING]</span>
  • MySQL high-concurrency schema modeling, deadlock resolution, composite indexes
  • Redis caching layers, async queues, Redis Pub/Sub messaging

<span class="terminal-highlight">[FRONTEND & UI]</span>
  • Vue.js, Inertia.js, Alpine.js, JavaScript (ES6+), Tailwind CSS, Bootstrap 5

<span class="terminal-highlight">[DEVOPS & SERVERS]</span>
  • Docker & Docker Compose, Ubuntu Linux VPS, Nginx reverse proxy tuning, CI/CD

<span class="terminal-highlight">[APIS & REAL-TIME]</span>
  • WebRTC audio/video calling, WebSockets, Stripe, bKash, SSLCommerz, OpenAI/Gemini
`,

        architecture: `
<span class="terminal-warning">[ENTERPRISE PROBLEMS SOLVED]</span>
1. <span class="terminal-highlight">42% Latency Reduction:</span> Offloaded heavy BI exports and report generation
   to Laravel Queues & Redis background workers so APIs respond instantaneously.
2. <span class="terminal-highlight">Database Optimization:</span> Profiled slow queries using EXPLAIN, applied composite
   indexes & eager loading to prevent N+1 queries and eliminate table deadlocks.
3. <span class="terminal-highlight">Idempotent Payments:</span> Built webhook signature verification & idempotency keys
   for Stripe, bKash & SSLCommerz to prevent duplicate charges.
4. <span class="terminal-highlight">Multi-Tenancy:</span> Dedicated database isolation per company, custom subdomains,
   and tier-based subscription feature flag gating.
`,

        projects: `
<span class="terminal-success">[FLAGSHIP ENTERPRISE PROJECTS]</span>
1. <span class="terminal-highlight">BNSMSoft:</span> Multi-Tenant SaaS ERP, POS & Business Suite (Laravel, Vue.js, Redis, Docker)
2. <span class="terminal-highlight">Real-Time WebRTC Calling & Chat:</span> 1-on-1 audio/video, screen sharing, Redis Pub/Sub
3. <span class="terminal-highlight">EduTab:</span> High-concurrency school result engine; cut DB load by 60% with chunked queues
4. <span class="terminal-highlight">Construction Logistics ERP:</span> Machinery leasing, site requests & biometric attendance
5. <span class="terminal-highlight">Manufacturing Workflow ERP:</span> Production stages, inventory deduction & cost variance
6. <span class="terminal-highlight">Omnichannel POS Sync:</span> 2-way real-time stock sync between store counters and web
7. <span class="terminal-highlight">Courier Logistics Engine:</span> Automated dispatch, label printing & COD reconciliation
`,

        experience: `
<span class="terminal-highlight">[PROFESSIONAL WORK HISTORY]</span>
• <span class="terminal-success">WanIT BD LTD</span> (2025 – Present) | Senior Software Developer
  High-scale ERP, Redis queue offloading (42% latency cut), Docker & Nginx deployments.
• <span class="terminal-success">Deelko LTD</span> (2023 – 2025) | Software Developer
  Retail POS, barcode scanner integration, multi-branch inventory, MySQL query optimization.
• <span class="terminal-success">Softvence Agency</span> (2022 – 2023) | Laravel Developer
  International client platforms, booking portals, REST APIs secured with Sanctum & JWT.
`,

        contact: `
<span class="terminal-success">[DIRECT COMMUNICATIONS]</span>
Email    : <a href="mailto:Shantorhaman81@gmail.com" class="terminal-highlight">Shantorhaman81@gmail.com</a>
Phone    : <a href="tel:+8801738450807" class="terminal-highlight">+880 1738-450807</a>
Location : Dhaka, Bangladesh
GitHub   : <a href="https://github.com/hrshanto807" target="_blank" class="terminal-highlight">github.com/hrshanto807</a>
LinkedIn : <a href="https://linkedin.com/in/hrsanto" target="_blank" class="terminal-highlight">linkedin.com/in/hrsanto</a>
`
    };

    function appendOutput(cmd, outputHtml) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `
            <div>
                <span class="terminal-prompt">hasibur@workstation</span>:<span class="terminal-path">~/portfolio</span>$ 
                <span class="terminal-cmd-echo">${escapeHtml(cmd)}</span>
            </div>
            <div class="terminal-output">${outputHtml}</div>
        `;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function executeCommand(rawCmd) {
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        history.push(cmd);
        historyIndex = history.length;

        if (cmd === 'clear') {
            terminalBody.innerHTML = '';
            return;
        }

        if (COMMANDS[cmd]) {
            appendOutput(cmd, COMMANDS[cmd]);
        } else {
            appendOutput(cmd, `<span class="terminal-warning">zsh: command not found: ${escapeHtml(cmd)}</span>. Type <span class="terminal-highlight">help</span> for available commands.`);
        }
    }

    terminalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = terminalInput.value;
        executeCommand(value);
        terminalInput.value = '';
    });

    // History Navigation with Up/Down Arrow
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = history[historyIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                terminalInput.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                terminalInput.value = '';
            }
            e.preventDefault();
        }
    });

    // Suggested Pills Click Listener
    pills.forEach((pill) => {
        pill.addEventListener('click', () => {
            const cmd = pill.getAttribute('data-cmd');
            if (cmd) {
                executeCommand(cmd);
                terminalInput.focus();
            }
        });
    });

    // Clear Button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            terminalBody.innerHTML = '';
            terminalInput.focus();
        });
    }

    // Initial greeting in terminal
    executeCommand('whoami');
})();

