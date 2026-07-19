// =============================================
// COMPETITIVE-TEST.JS — Timed Competitive Exam
// =============================================

const COMP_QUESTION_BANK = [
  { q: "What does SOC stand for?", opts: ["Security Operations Center","System Operations Console","Secure Online Channel","Server Operations Control"], ans: 0 },
  { q: "Which layer of the OSI model handles IP addressing?", opts: ["Data Link","Network","Transport","Session"], ans: 1 },
  { q: "What is a SIEM used for?", opts: ["Encrypting data","Aggregating and analyzing security logs","Blocking malware","Patching systems"], ans: 1 },
  { q: "Which protocol uses port 443?", opts: ["HTTP","FTP","HTTPS","SSH"], ans: 2 },
  { q: "What is a zero-day vulnerability?", opts: ["A vulnerability with no known patch","A vulnerability patched on day zero","A bug that only works at midnight","An unimportant vulnerability"], ans: 0 },
  { q: "What does IOC stand for in threat intelligence?", opts: ["Internet Operations Center","Indicator of Compromise","Internal Organization Control","Incident Operations Command"], ans: 1 },
  { q: "Which tool is used for packet capture and analysis?", opts: ["Metasploit","Wireshark","Nessus","Burp Suite"], ans: 1 },
  { q: "What is the primary goal of the Kill Chain model?", opts: ["Securing databases","Describing attacker tactics stage by stage","Penetration testing","Network monitoring"], ans: 1 },
  { q: "What does MITRE ATT&CK represent?", opts: ["A firewall configuration standard","A knowledge base of adversary tactics and techniques","An antivirus framework","A SIEM product"], ans: 1 },
  { q: "What is lateral movement in an attack?", opts: ["Attacker moves from one internal system to another","Attacker deletes logs","Attacker downloads malware","Attacker scans external IPs"], ans: 0 },
  { q: "Which of these is a type of malware that holds data for ransom?", opts: ["Worm","Trojan","Ransomware","Spyware"], ans: 2 },
  { q: "What does 'phishing' mean?", opts: ["A type of DoS attack","Tricking users into revealing credentials via fake emails","Scanning open ports","Injecting SQL code"], ans: 1 },
  { q: "What does DFIR stand for?", opts: ["Digital Firewall Incident Response","Digital Forensics and Incident Response","Data Flow Incident Review","Dynamic Forensic Investigation Report"], ans: 1 },
  { q: "What is a honeypot used for?", opts: ["Storing backups","Decoy system to attract and study attackers","Encrypting network traffic","Filtering spam"], ans: 1 },
  { q: "Which protocol does DNS use by default?", opts: ["TCP","UDP","ICMP","HTTP"], ans: 1 },
  { q: "What is privilege escalation?", opts: ["Creating new user accounts","Gaining higher permissions than initially granted","Deleting system files","Installing software"], ans: 1 },
  { q: "What is a DDoS attack?", opts: ["Encrypting a single target's data","Overwhelming a target with traffic from multiple sources","Bypassing authentication","Stealing SSH keys"], ans: 1 },
  { q: "What does TTP stand for in cybersecurity?", opts: ["Technical Testing Platform","Tactics, Techniques, and Procedures","Threat Tracking Protocol","Test, Train, Perform"], ans: 1 },
  { q: "What is the purpose of a firewall?", opts: ["Store data securely","Monitor CPU usage","Control incoming and outgoing network traffic","Scan for malware"], ans: 2 },
  { q: "What is SQL injection?", opts: ["Malicious code injected into SQL queries","A type of DDoS attack","A network scanning method","A social engineering tactic"], ans: 0 },
  { q: "What does VPN stand for?", opts: ["Virtual Private Network","Verified Public Node","Virtual Protocol Node","Vendor Protection Network"], ans: 0 },
  { q: "What is an APT (Advanced Persistent Threat)?", opts: ["A one-time malware attack","A long-term targeted attack by a skilled adversary","A type of phishing email","A firewall bypass technique"], ans: 1 },
  { q: "What is the difference between authentication and authorization?", opts: ["They are the same","Auth verifies identity, authorization grants permissions","Authorization verifies identity, auth grants permissions","Neither is related to security"], ans: 1 },
  { q: "Which framework provides a common language for describing security controls?", opts: ["MITRE ATT&CK","NIST Cybersecurity Framework","Wireshark","Splunk"], ans: 1 },
  { q: "What is a brute force attack?", opts: ["Trying all possible passwords until one works","Sending spam emails","Injecting malicious scripts","Intercepting network traffic"], ans: 0 },
  { q: "What does MFA stand for?", opts: ["Malware File Analyzer","Multi-Factor Authentication","Managed Firewall Access","Main Frame Application"], ans: 1 },
  { q: "What is the CIA triad?", opts: ["Central Intelligence Agency model","Confidentiality, Integrity, Availability","Control, Inspect, Analyze","Compliance, Integrity, Access"], ans: 1 },
  { q: "Which port does SSH use by default?", opts: ["21","23","22","80"], ans: 2 },
  { q: "What is a rootkit?", opts: ["A type of firewall","Malware that hides its presence on a system","A network scanner","A vulnerability assessment tool"], ans: 1 },
  { q: "What does OSINT stand for?", opts: ["Open Source Intelligence","Online Security Intelligence Network","Operational Security Integration","Open System Internet Protocol"], ans: 0 },
  { q: "What is a man-in-the-middle attack?", opts: ["Attacker intercepts communication between two parties","Attacker floods a server with traffic","Attacker guesses passwords","Attacker sends phishing emails"], ans: 0 },
  { q: "What is threat hunting?", opts: ["Blocking known malware signatures","Proactively searching for hidden threats in a network","Patching vulnerabilities","Setting up honeypots"], ans: 1 },
  { q: "What is a CVE number?", opts: ["A certificate for ethical hackers","A unique identifier for known security vulnerabilities","A firewall rule ID","A SIEM alert code"], ans: 1 },
  { q: "What does EDR stand for?", opts: ["Endpoint Detection and Response","Enterprise Data Recovery","Encrypted Data Repository","Event-Driven Response"], ans: 0 },
  { q: "What is log correlation in a SIEM?", opts: ["Encrypting log files","Linking related events across multiple sources to detect threats","Deleting old logs","Compressing log storage"], ans: 1 },
  { q: "What is a playbook in SOC?", opts: ["A book of network diagrams","A predefined set of steps to respond to a specific threat","A list of approved software","A network topology map"], ans: 1 },
  { q: "What is sandboxing in malware analysis?", opts: ["Running malware in an isolated environment","Storing malware samples","Blocking malware at the gateway","Encrypting malware signatures"], ans: 0 },
  { q: "What does SOAR stand for?", opts: ["Security Operations and Response","Security Orchestration, Automation, and Response","System Operations Audit Report","Security Output and Analysis Review"], ans: 1 },
  { q: "What is the purpose of an IDS?", opts: ["Encrypt network traffic","Block all incoming traffic","Detect suspicious activity or policy violations","Assign IP addresses"], ans: 2 },
  { q: "What is a botnet?", opts: ["A type of antivirus","A network of compromised computers controlled by an attacker","A secure VPN network","A cloud firewall"], ans: 1 },
  { q: "What is port scanning used for?", opts: ["Encrypting packets","Discovering open ports and services on a target system","Blocking traffic","Monitoring bandwidth"], ans: 1 },
  { q: "What is spear phishing?", opts: ["Mass phishing emails","A targeted phishing attack aimed at a specific individual","A type of malware","A network attack"], ans: 1 },
  { q: "What is the purpose of network segmentation?", opts: ["Increase internet speed","Limit the spread of attacks by dividing the network into zones","Encrypt all traffic","Assign user roles"], ans: 1 },
  { q: "What does TTL stand for in networking?", opts: ["Time to Live","Transfer Token Limit","Total Traffic Load","Tunnel Transfer Layer"], ans: 0 },
  { q: "What is OSINT used for in SOC?", opts: ["Monitoring internal logs","Gathering intelligence from public sources","Encrypting data","Patching systems"], ans: 1 },
  { q: "What is ARP spoofing?", opts: ["Sending fake ARP messages to link attacker's MAC to a legitimate IP","A type of brute force","A SQL injection variant","A DoS attack type"], ans: 0 },
  { q: "Which of these is a behavioral IOC?", opts: ["A known malware hash","Unusual outbound traffic at 3 AM","A patched CVE","A firewall rule"], ans: 1 },
  { q: "What is the difference between IDS and IPS?", opts: ["They are identical","IDS detects, IPS detects and blocks","IPS only detects","IDS blocks traffic"], ans: 1 },
  { q: "What is a tabletop exercise?", opts: ["A type of penetration test","A discussion-based simulation of an incident scenario","A firewall audit","A malware scan"], ans: 1 },
  { q: "What does the 'P' stand for in APT?", opts: ["Protocol","Persistent","Privileged","Proxied"], ans: 1 }
];

let compTimer = null;
let compTimeLeft = 0;
let compQuestions = [];
let compAnswers = [];
let compCurrentQ = 0;
let compTestId = null;

function shuffleArray(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function startCompetitiveTest(testId) {
  compTestId = testId;
  compQuestions = shuffleArray(COMP_QUESTION_BANK).slice(0, 30);
  compAnswers = new Array(30).fill(null);
  compCurrentQ = 0;
  compTimeLeft = 30 * 60; // 30 minutes in seconds

  document.getElementById('quiz-modal').classList.remove('hidden');
  renderCompQuestion();
  startCompTimer();
}

function startCompTimer() {
  if (compTimer) clearInterval(compTimer);
  compTimer = setInterval(() => {
    compTimeLeft--;
    const timerEl = document.getElementById('comp-timer');
    if (timerEl) {
      const mins = Math.floor(compTimeLeft / 60).toString().padStart(2, '0');
      const secs = (compTimeLeft % 60).toString().padStart(2, '0');
      timerEl.innerHTML = `<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">timer</span> ${mins}:${secs}`;
      if (compTimeLeft <= 300) timerEl.style.color = 'var(--coral)';
    }
    if (compTimeLeft <= 0) {
      clearInterval(compTimer);
      submitCompTest();
    }
  }, 1000);
}

function renderCompQuestion() {
  const qData = compQuestions[compCurrentQ];
  const content = document.getElementById('quiz-content');
  const pct = Math.round(((compCurrentQ) / compQuestions.length) * 100);

  content.innerHTML = `
    <div class="quiz-header">
      <div class="comp-header-row">
        <h2><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">swords</span> Competitive Exam</h2>
        <div id="comp-timer" class="comp-timer"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">timer</span> 30:00</div>
      </div>
      <div class="quiz-progress">Question ${compCurrentQ + 1} of ${compQuestions.length}</div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${pct}%"></div>
      </div>
    </div>
    <div class="quiz-question">${qData.q}</div>
    <div class="quiz-options">
      ${qData.opts.map((opt, i) => {
        const selected = compAnswers[compCurrentQ] === i;
        return `<button class="quiz-opt-btn ${selected ? 'comp-selected' : ''}" onclick="selectCompAnswer(${i})">${opt}</button>`;
      }).join('')}
    </div>
    <div class="comp-nav-row">
      ${compCurrentQ > 0 ? `<button class="quiz-btn secondary" onclick="compNavPrev()">← Previous</button>` : '<div></div>'}
      ${compCurrentQ < compQuestions.length - 1
        ? `<button class="quiz-btn primary" onclick="compNavNext()">Next →</button>`
        : `<button class="quiz-btn primary" onclick="submitCompTest()" style="background:var(--coral)">Submit Exam</button>`
      }
    </div>
  `;
}

function selectCompAnswer(index) {
  compAnswers[compCurrentQ] = index;
  renderCompQuestion();
}

function compNavPrev() {
  if (compCurrentQ > 0) { compCurrentQ--; renderCompQuestion(); }
}

function compNavNext() {
  if (compCurrentQ < compQuestions.length - 1) { compCurrentQ++; renderCompQuestion(); }
}

function submitCompTest() {
  if (compTimer) clearInterval(compTimer);

  let score = 0;
  compQuestions.forEach((q, i) => {
    if (compAnswers[i] === q.ans) score++;
  });

  const pct = Math.round((score / compQuestions.length) * 100);
  const passed = pct >= 60;

  if (typeof saveCompResult === 'function') saveCompResult(score, compQuestions.length, compTestId);

  const content = document.getElementById('quiz-content');
  const userRank = typeof getUserRank === 'function' ? getUserRank() : '—';

  content.innerHTML = `
    <div class="quiz-results">
      <h2><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">swords</span> Exam Complete!</h2>
      <div class="quiz-score ${passed ? 'pass' : 'fail'}">${score} / ${compQuestions.length}</div>
      <div class="comp-pct-badge ${passed ? 'pass' : 'fail'}">${pct}%</div>
      <p>${passed ? '🎉 Excellent! You passed the competitive exam.' : '💪 Keep studying! You need 60% to pass.'}</p>
      <div class="comp-rank-row">
        <div class="comp-rank-box">
          <div class="comp-rank-num">#${userRank}</div>
          <div class="comp-rank-lbl">Your Leaderboard Rank</div>
        </div>
      </div>
      <div class="quiz-actions">
        <button class="quiz-btn secondary" onclick="closeQuiz(); window.goToView && window.goToView('leaderboard')">View Leaderboard</button>
        <button class="quiz-btn primary" onclick="closeQuiz()">Close</button>
      </div>
    </div>
  `;
}

window.startCompetitiveTest = startCompetitiveTest;
window.selectCompAnswer = selectCompAnswer;
window.compNavPrev = compNavPrev;
window.compNavNext = compNavNext;
window.submitCompTest = submitCompTest;
