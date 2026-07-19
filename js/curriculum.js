// =============================================
// SOC ANALYST CURRICULUM — 120 Days
// Basic → Intermediate → Advanced
// =============================================

const CURRICULUM = {
  phases: [
    {
      id: 1,
      title: "Phase 1: Foundations",
      subtitle: "Networking, Linux, Windows & Cybersecurity Basics",
      color: "#00ff88",
      days: "1–30",
      weeks: [
        {
          id: 1,
          title: "Week 1: Networking Fundamentals",
          image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 1,
              topic: "OSI Model — The 7 Layers Explained",
              description: "Understand how data travels through networks using the OSI model. This is the absolute foundation of networking.",
              duration: "45 min",
              difficulty: "Beginner",
              video: {
                title: "OSI Model Explained | Real World Example",
                channel: "NetworkChuck",
                url: "https://www.youtube.com/watch?v=vv4y_uOneC0",
                embed: "https://www.youtube.com/embed/vv4y_uOneC0"
              },
              resources: [
                { title: "OSI Model – Cloudflare Learning", url: "https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/", type: "article" },
                { title: "TryHackMe – Pre-Security Path", url: "https://tryhackme.com/path/outline/presecurity", type: "lab" },
                { title: "Professor Messer – OSI Model", url: "https://www.professormesser.com/network-plus/n10-008/n10-008-video/osi-model/", type: "video" }
              ],
              xp: 50
            },
            {
              day: 2,
              topic: "TCP/IP Model & IP Addressing",
              description: "Learn the practical TCP/IP protocol suite that the internet actually runs on, plus IPv4/IPv6 addressing.",
              duration: "50 min",
              difficulty: "Beginner",
              video: {
                title: "TCP/IP Model Explained",
                channel: "Professor Messer",
                url: "https://www.youtube.com/watch?v=OTwp3xtd4dg",
                embed: "https://www.youtube.com/embed/OTwp3xtd4dg"
              },
              resources: [
                { title: "TCP/IP Guide – No Starch Press", url: "http://www.tcpipguide.com/free/index.htm", type: "article" },
                { title: "Subnetting Practice", url: "https://subnettingpractice.com/", type: "tool" },
                { title: "TryHackMe – What is Networking?", url: "https://tryhackme.com/room/whatisnetworking", type: "lab" }
              ],
              xp: 50
            },
            {
              day: 3,
              topic: "DNS — Domain Name System Deep Dive",
              description: "DNS is critical for SOC analysts — attackers abuse it constantly. Learn how DNS works and why it matters for security.",
              duration: "40 min",
              difficulty: "Beginner",
              video: {
                title: "DNS Explained in 100 Seconds",
                channel: "Fireship",
                url: "https://www.youtube.com/watch?v=UVR9lhUGAyU",
                embed: "https://www.youtube.com/embed/UVR9lhUGAyU"
              },
              resources: [
                { title: "How DNS Works – dnsimple", url: "https://howdns.works/", type: "article" },
                { title: "TryHackMe – DNS in Detail", url: "https://tryhackme.com/room/dnsindetail", type: "lab" },
                { title: "DNS Security – Cloudflare", url: "https://www.cloudflare.com/learning/dns/dns-security/", type: "article" }
              ],
              xp: 50
            },
            {
              day: 4,
              topic: "HTTP/HTTPS & Web Traffic Basics",
              description: "Web traffic is the most common attack vector. Learn HTTP methods, headers, status codes and TLS.",
              duration: "45 min",
              difficulty: "Beginner",
              video: {
                title: "HTTP Crash Course & Exploration",
                channel: "Traversy Media",
                url: "https://www.youtube.com/watch?v=iYM2zFP3Zn0",
                embed: "https://www.youtube.com/embed/iYM2zFP3Zn0"
              },
              resources: [
                { title: "HTTP – MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", type: "article" },
                { title: "TryHackMe – HTTP in Detail", url: "https://tryhackme.com/room/httpindetail", type: "lab" },
                { title: "HTTPS Explained – SSL.com", url: "https://www.ssl.com/faqs/faq-what-is-https/", type: "article" }
              ],
              xp: 50
            },
            {
              day: 5,
              topic: "Ports & Protocols — What SOC Analysts Must Know",
              description: "Learn the most important ports (22, 80, 443, 445, 3389...) and protocols that appear in logs daily.",
              duration: "40 min",
              difficulty: "Beginner",
              video: {
                title: "Common Network Ports Every Hacker Must Know",
                channel: "David Bombal",
                url: "https://www.youtube.com/watch?v=kCuyS7ihr_E",
                embed: "https://www.youtube.com/embed/kCuyS7ihr_E"
              },
              resources: [
                { title: "Common Ports Cheat Sheet", url: "https://www.stationx.net/common-ports-cheat-sheet/", type: "article" },
                { title: "IANA Port Numbers", url: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml", type: "reference" },
                { title: "TryHackMe – Intro to Networking", url: "https://tryhackme.com/room/introtolan", type: "lab" }
              ],
              xp: 50
            },
            {
              day: 6,
              topic: "Firewalls & Network Security Basics",
              description: "Understand how firewalls work, stateful vs stateless inspection, and how they generate logs for SOC teams.",
              duration: "45 min",
              difficulty: "Beginner",
              video: {
                title: "Firewalls Explained | Network Security",
                channel: "NetworkChuck",
                url: "https://www.youtube.com/watch?v=9GZlVOafYTg",
                embed: "https://www.youtube.com/embed/9GZlVOafYTg"
              },
              resources: [
                { title: "Firewall – Cloudflare Learning", url: "https://www.cloudflare.com/learning/security/what-is-a-firewall/", type: "article" },
                { title: "TryHackMe – Extending Your Network", url: "https://tryhackme.com/room/extendingyournetwork", type: "lab" }
              ],
              xp: 50
            },
            {
              day: 7,
              topic: "Week 1 Review & Networking Quiz",
              description: "Consolidate your Week 1 knowledge. Take the networking quiz on TryHackMe and practice subnetting.",
              duration: "60 min",
              difficulty: "Beginner",
              video: {
                title: "Networking Fundamentals — Full Revision",
                channel: "Professor Messer",
                url: "https://www.youtube.com/watch?v=qiQR5rTSshw",
                embed: "https://www.youtube.com/embed/qiQR5rTSshw"
              },
              resources: [
                { title: "TryHackMe – Pre-Security Path (complete week)", url: "https://tryhackme.com/path/outline/presecurity", type: "lab" },
                { title: "Subnetting Quiz", url: "https://subnettingpractice.com/quiz.html", type: "tool" }
              ],
              xp: 100
            }
          ]
        },
        {
          id: 2,
          title: "Week 2: Linux Command Line",
          image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 8,
              topic: "Linux Introduction — Why SOC Analysts Need It",
              description: "Most security tools run on Linux. Learn the file system, basic commands, and why Linux is essential for SOC work.",
              duration: "60 min",
              difficulty: "Beginner",
              video: {
                title: "Linux for Ethical Hackers (Full Course Beginner)",
                channel: "The Cyber Mentor",
                url: "https://www.youtube.com/watch?v=U1w4T03B30I",
                embed: "https://www.youtube.com/embed/U1w4T03B30I"
              },
              resources: [
                { title: "OverTheWire: Bandit (Linux Wargame)", url: "https://overthewire.org/wargames/bandit/", type: "lab" },
                { title: "TryHackMe – Linux Fundamentals Part 1", url: "https://tryhackme.com/room/linuxfundamentalspart1", type: "lab" },
                { title: "Linux Cheatsheet – SANS", url: "https://www.sans.org/security-resources/sec560/misc_tools_sheet_v1.pdf", type: "reference" }
              ],
              xp: 60
            },
            {
              day: 9,
              topic: "Linux File System & Permissions",
              description: "Understand Linux directory structure, file permissions (chmod, chown), and how attackers exploit misconfigured permissions.",
              duration: "50 min",
              difficulty: "Beginner",
              video: {
                title: "Linux File System & Permissions Explained",
                channel: "NetworkChuck",
                url: "https://www.youtube.com/watch?v=YFPgKr6uDWA",
                embed: "https://www.youtube.com/embed/YFPgKr6uDWA"
              },
              resources: [
                { title: "TryHackMe – Linux Fundamentals Part 2", url: "https://tryhackme.com/room/linuxfundamentalspart2", type: "lab" },
                { title: "OverTheWire Bandit – Level 5+", url: "https://overthewire.org/wargames/bandit/bandit5.html", type: "lab" }
              ],
              xp: 60
            },
            {
              day: 10,
              topic: "Essential Linux Commands for Security",
              description: "grep, awk, sed, find, netstat — master the commands that SOC analysts use daily to investigate incidents.",
              duration: "55 min",
              difficulty: "Beginner",
              video: {
                title: "Linux Commands Every Hacker Needs to Know",
                channel: "David Bombal",
                url: "https://www.youtube.com/watch?v=gd7BXuUQ91w",
                embed: "https://www.youtube.com/embed/gd7BXuUQ91w"
              },
              resources: [
                { title: "Linux Command Line – explainshell.com", url: "https://explainshell.com/", type: "tool" },
                { title: "TryHackMe – Linux Fundamentals Part 3", url: "https://tryhackme.com/room/linuxfundamentalspart3", type: "lab" },
                { title: "Bash Scripting Cheatsheet", url: "https://devhints.io/bash", type: "reference" }
              ],
              xp: 60
            },
            {
              day: 11,
              topic: "Log Files in Linux — Where Attackers Leave Traces",
              description: "Learn /var/log structure — auth.log, syslog, kern.log. Practice reading real log files to spot suspicious activity.",
              duration: "55 min",
              difficulty: "Beginner",
              video: {
                title: "Linux Log Files Explained for Security",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=qkAdIqAn4XM",
                embed: "https://www.youtube.com/embed/qkAdIqAn4XM"
              },
              resources: [
                { title: "Understanding Linux Log Files", url: "https://www.loggly.com/ultimate-guide/linux-logging-with-the-systemd-journal/", type: "article" },
                { title: "Blue Team Labs Online", url: "https://blueteamlabs.online/", type: "lab" }
              ],
              xp: 60
            },
            {
              day: 12,
              topic: "Bash Scripting for Security Automation",
              description: "Write basic bash scripts to automate log parsing, IP lookups, and alert generation — a huge SOC time-saver.",
              duration: "60 min",
              difficulty: "Beginner",
              video: {
                title: "Bash Scripting Full Course (3 hours)",
                channel: "Joe Collins",
                url: "https://www.youtube.com/watch?v=e7BufAVwDiM",
                embed: "https://www.youtube.com/embed/e7BufAVwDiM"
              },
              resources: [
                { title: "Bash Scripting Tutorial – Ryan's Tutorials", url: "https://ryanstutorials.net/bash-scripting-tutorial/", type: "article" },
                { title: "ShellCheck – bash script linter", url: "https://www.shellcheck.net/", type: "tool" }
              ],
              xp: 60
            },
            {
              day: 13,
              topic: "Networking Tools: netstat, ss, nmap basics",
              description: "Use Linux networking tools to investigate active connections, open ports, and map your own network.",
              duration: "50 min",
              difficulty: "Beginner",
              video: {
                title: "Nmap Tutorial to find Network Vulnerabilities",
                channel: "NetworkChuck",
                url: "https://www.youtube.com/watch?v=4t4kBkMsDbQ",
                embed: "https://www.youtube.com/embed/4t4kBkMsDbQ"
              },
              resources: [
                { title: "TryHackMe – Nmap Room", url: "https://tryhackme.com/room/furthernmap", type: "lab" },
                { title: "Nmap Reference Guide", url: "https://nmap.org/book/man.html", type: "reference" }
              ],
              xp: 60
            },
            {
              day: 14,
              topic: "Week 2 Review — Linux Challenges",
              description: "Complete the OverTheWire Bandit challenge (levels 0-15) to solidify your Linux command line skills.",
              duration: "90 min",
              difficulty: "Beginner",
              video: {
                title: "OverTheWire Bandit Walkthrough",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=RUorAzaDftg",
                embed: "https://www.youtube.com/embed/RUorAzaDftg"
              },
              resources: [
                { title: "OverTheWire: Bandit", url: "https://overthewire.org/wargames/bandit/", type: "lab" },
                { title: "TryHackMe – Linux Modules", url: "https://tryhackme.com/module/linux-fundamentals", type: "lab" }
              ],
              xp: 100
            }
          ]
        },
        {
          id: 3,
          title: "Week 3: Windows Security Fundamentals",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 15,
              topic: "Windows Architecture & Security Model",
              description: "Understand Windows OS internals — processes, registry, services — from a security perspective.",
              duration: "55 min",
              difficulty: "Beginner",
              video: {
                title: "Windows for Hackers — Basics",
                channel: "The Cyber Mentor",
                url: "https://www.youtube.com/watch?v=sW10TlZF62w",
                embed: "https://www.youtube.com/embed/sW10TlZF62w"
              },
              resources: [
                { title: "TryHackMe – Windows Fundamentals 1", url: "https://tryhackme.com/room/windowsfundamentals1xbx", type: "lab" },
                { title: "Microsoft Security Documentation", url: "https://docs.microsoft.com/en-us/windows/security/", type: "reference" }
              ],
              xp: 60
            },
            {
              day: 16,
              topic: "Windows Event Logs — The SOC Analyst's Bible",
              description: "Windows Event IDs are critical for detection. Learn 4624 (logon), 4625 (failed logon), 4688 (process creation), etc.",
              duration: "60 min",
              difficulty: "Beginner",
              video: {
                title: "Windows Event Logs for Security Monitoring",
                channel: "13Cubed",
                url: "https://www.youtube.com/watch?v=llMT_hZcf7k",
                embed: "https://www.youtube.com/embed/llMT_hZcf7k"
              },
              resources: [
                { title: "Ultimate Windows Security – Event IDs", url: "https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/", type: "reference" },
                { title: "TryHackMe – Windows Event Logs", url: "https://tryhackme.com/room/windowseventlogs", type: "lab" },
                { title: "SANS Windows Event Log Cheat Sheet", url: "https://www.sans.org/blog/the-windows-event-log-primer/", type: "article" }
              ],
              xp: 70
            },
            {
              day: 17,
              topic: "Active Directory — Enterprise Network Backbone",
              description: "95% of enterprises use Active Directory. Learn users, groups, GPO, and why AD is attackers' prime target.",
              duration: "65 min",
              difficulty: "Beginner",
              video: {
                title: "Active Directory Basics",
                channel: "The Cyber Mentor",
                url: "https://www.youtube.com/watch?v=pKtDQtsubio",
                embed: "https://www.youtube.com/embed/pKtDQtsubio"
              },
              resources: [
                { title: "TryHackMe – Active Directory Basics", url: "https://tryhackme.com/room/winadbasics", type: "lab" },
                { title: "AD Security Blog", url: "https://adsecurity.org/", type: "reference" }
              ],
              xp: 70
            },
            {
              day: 18,
              topic: "PowerShell for Security Professionals",
              description: "PowerShell is used by both defenders and attackers. Learn how to use it for system investigation and detection.",
              duration: "55 min",
              difficulty: "Beginner",
              video: {
                title: "PowerShell for Pentesters",
                channel: "TCM Security",
                url: "https://www.youtube.com/watch?v=bGwLWhbRt5o",
                embed: "https://www.youtube.com/embed/bGwLWhbRt5o"
              },
              resources: [
                { title: "TryHackMe – Hacking with PowerShell", url: "https://tryhackme.com/room/powershell", type: "lab" },
                { title: "PowerShell Security Cheatsheet", url: "https://github.com/cobbr/PSAmsi/wiki/PowerShell-Security-Cheatsheet", type: "reference" }
              ],
              xp: 70
            },
            {
              day: 19,
              topic: "Windows Registry & Persistence Mechanisms",
              description: "Learn how attackers establish persistence via registry run keys, scheduled tasks, and startup folders.",
              duration: "50 min",
              difficulty: "Beginner",
              video: {
                title: "Windows Persistence Techniques",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=posgOIGPf7Y",
                embed: "https://www.youtube.com/embed/posgOIGPf7Y"
              },
              resources: [
                { title: "MITRE ATT&CK – Persistence", url: "https://attack.mitre.org/tactics/TA0003/", type: "reference" },
                { title: "TryHackMe – Windows PrivEsc", url: "https://tryhackme.com/room/windows10privesc", type: "lab" }
              ],
              xp: 70
            },
            {
              day: 20,
              topic: "Sysinternals Suite — Investigation Toolkit",
              description: "Microsoft Sysinternals tools (Process Explorer, Autoruns, TCPView) are essential for Windows live investigation.",
              duration: "55 min",
              difficulty: "Beginner",
              video: {
                title: "Sysinternals Suite Overview",
                channel: "13Cubed",
                url: "https://www.youtube.com/watch?v=A_TPZxuTzBU",
                embed: "https://www.youtube.com/embed/A_TPZxuTzBU"
              },
              resources: [
                { title: "Sysinternals Download – Microsoft", url: "https://docs.microsoft.com/en-us/sysinternals/downloads/sysinternals-suite", type: "tool" },
                { title: "Sysinternals Usage Guide", url: "https://adamtheautomator.com/sysinternals/", type: "article" }
              ],
              xp: 70
            },
            {
              day: 21,
              topic: "Week 3 Review — Windows Security Lab",
              description: "Complete TryHackMe Windows rooms and practice reading Windows Event Logs from real samples.",
              duration: "90 min",
              difficulty: "Beginner",
              video: {
                title: "Windows Security Full Review",
                channel: "Professor Messer",
                url: "https://www.youtube.com/watch?v=qTpmDVQauYA",
                embed: "https://www.youtube.com/embed/qTpmDVQauYA"
              },
              resources: [
                { title: "TryHackMe – Windows Fundamentals 2", url: "https://tryhackme.com/room/windowsfundamentals2x0x", type: "lab" },
                { title: "TryHackMe – Windows Fundamentals 3", url: "https://tryhackme.com/room/windowsfundamentals3xzx", type: "lab" }
              ],
              xp: 100
            }
          ]
        },
        {
          id: 4,
          title: "Week 4: Cybersecurity Fundamentals",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 22,
              topic: "CIA Triad, Attack Types & Threat Landscape",
              description: "Confidentiality, Integrity, Availability — the core of all security. Learn major attack categories.",
              duration: "45 min",
              difficulty: "Beginner",
              video: {
                title: "CIA Triad & Security Fundamentals",
                channel: "Professor Messer",
                url: "https://www.youtube.com/watch?v=AJTJN4wDBM8",
                embed: "https://www.youtube.com/embed/AJTJN4wDBM8"
              },
              resources: [
                { title: "TryHackMe – Intro to Cybersecurity", url: "https://tryhackme.com/path/outline/introtocyber", type: "lab" },
                { title: "NIST Cybersecurity Glossary", url: "https://csrc.nist.gov/glossary", type: "reference" }
              ],
              xp: 50
            },
            {
              day: 23,
              topic: "MITRE ATT&CK Framework — Attacker Playbook",
              description: "The most important framework in SOC work. Learn Tactics, Techniques, and Procedures (TTPs) that real attackers use.",
              duration: "60 min",
              difficulty: "Beginner",
              video: {
                title: "MITRE ATT&CK Framework Explained",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=QLwEcG0eCXo",
                embed: "https://www.youtube.com/embed/QLwEcG0eCXo"
              },
              resources: [
                { title: "MITRE ATT&CK Website", url: "https://attack.mitre.org/", type: "reference" },
                { title: "ATT&CK Navigator", url: "https://mitre-attack.github.io/attack-navigator/", type: "tool" },
                { title: "TryHackMe – MITRE Room", url: "https://tryhackme.com/room/mitre", type: "lab" }
              ],
              xp: 70
            },
            {
              day: 24,
              topic: "Cyber Kill Chain & Attack Lifecycle",
              description: "Learn Lockheed Martin's Cyber Kill Chain to understand how an attack unfolds from Reconnaissance to Exfiltration.",
              duration: "45 min",
              difficulty: "Beginner",
              video: {
                title: "Cyber Kill Chain Explained",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=II91fiUax2g",
                embed: "https://www.youtube.com/embed/II91fiUax2g"
              },
              resources: [
                { title: "Lockheed Martin – Cyber Kill Chain", url: "https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html", type: "article" },
                { title: "TryHackMe – Cyber Kill Chain", url: "https://tryhackme.com/room/cyberkillchainzmt", type: "lab" }
              ],
              xp: 60
            },
            {
              day: 25,
              topic: "Common Attacks: Phishing, Malware, Ransomware",
              description: "Deep dive into the most common attack types SOC analysts investigate daily.",
              duration: "55 min",
              difficulty: "Beginner",
              video: {
                title: "How Ransomware Works — A Technical Look",
                channel: "The PC Security Channel",
                url: "https://www.youtube.com/watch?v=ORhRYS6oFT8",
                embed: "https://www.youtube.com/embed/ORhRYS6oFT8"
              },
              resources: [
                { title: "Phishing Analysis – Any.run", url: "https://any.run/", type: "tool" },
                { title: "VirusTotal", url: "https://www.virustotal.com/", type: "tool" },
                { title: "TryHackMe – Phishing Analysis", url: "https://tryhackme.com/room/phishingemails1tryoe", type: "lab" }
              ],
              xp: 60
            },
            {
              day: 26,
              topic: "Vulnerability Management Overview",
              description: "Learn CVEs, CVSS scoring, patch management cycles, and how vulnerabilities are tracked and prioritized.",
              duration: "45 min",
              difficulty: "Beginner",
              video: {
                title: "Vulnerability Management Explained",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=R1kFnVtPRf4",
                embed: "https://www.youtube.com/embed/R1kFnVtPRf4"
              },
              resources: [
                { title: "NVD – National Vulnerability Database", url: "https://nvd.nist.gov/", type: "reference" },
                { title: "CVE Details", url: "https://www.cvedetails.com/", type: "tool" }
              ],
              xp: 50
            },
            {
              day: 27,
              topic: "Cryptography Basics for Security Analysts",
              description: "Understand encryption, hashing, PKI and TLS — you'll see these constantly in network traffic and logs.",
              duration: "50 min",
              difficulty: "Beginner",
              video: {
                title: "Cryptography Full Course",
                channel: "Professor Messer",
                url: "https://www.youtube.com/watch?v=AQDCe585Lnc",
                embed: "https://www.youtube.com/embed/AQDCe585Lnc"
              },
              resources: [
                { title: "Crypto101 – Free Crypto Book", url: "https://www.crypto101.io/", type: "article" },
                { title: "TryHackMe – Encryption – Crypto 101", url: "https://tryhackme.com/room/encryptioncrypto101", type: "lab" }
              ],
              xp: 50
            },
            {
              day: 28,
              topic: "SOC Roles, Tiers & Career Path",
              description: "Understand the SOC team structure: Tier 1 Analyst (Triage), Tier 2 (Investigation), Tier 3 (Threat Hunting). Where do you fit?",
              duration: "40 min",
              difficulty: "Beginner",
              video: {
                title: "How to Start a Career in Cybersecurity — SOC Analyst",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=8hc0OKGQh8s",
                embed: "https://www.youtube.com/embed/8hc0OKGQh8s"
              },
              resources: [
                { title: "SOC Analyst Career Guide", url: "https://www.cybersecurityeducation.org/careers/security-operations-center-analyst/", type: "article" },
                { title: "Cybersecurity Career Roadmap", url: "https://pauljerimy.com/security-certification-roadmap/", type: "reference" }
              ],
              xp: 50
            },
            {
              day: 29,
              topic: "Compliance & Security Frameworks (NIST, ISO 27001)",
              description: "Learn the compliance frameworks SOC teams operate within — NIST CSF, ISO 27001, SOC 2, and more.",
              duration: "45 min",
              difficulty: "Beginner",
              video: {
                title: "NIST Cybersecurity Framework Explained",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=J9ToNuwmyF0",
                embed: "https://www.youtube.com/embed/J9ToNuwmyF0"
              },
              resources: [
                { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", type: "reference" },
                { title: "ISO 27001 Overview", url: "https://www.iso.org/isoiec-27001-information-security.html", type: "reference" }
              ],
              xp: 50
            },
            {
              day: 30,
              topic: "Phase 1 Capstone — Foundations Review",
              description: "You've completed Phase 1! Take the TryHackMe Pre-Security path certificate assessment and celebrate your first milestone.",
              duration: "90 min",
              difficulty: "Beginner",
              video: {
                title: "CompTIA Security+ Full Course (Foundations Review)",
                channel: "Professor Messer",
                url: "https://www.youtube.com/watch?v=9Hd8QJmZykY",
                embed: "https://www.youtube.com/embed/9Hd8QJmZykY"
              },
              resources: [
                { title: "TryHackMe – SOC Level 1 Path Start", url: "https://tryhackme.com/path/outline/soclevel1", type: "lab" },
                { title: "Blue Team Labs Online – Free Challenges", url: "https://blueteamlabs.online/home/challenges", type: "lab" }
              ],
              xp: 150
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Phase 2: Core SOC Skills",
      subtitle: "SIEM, Log Analysis, Incident Response & Threat Intelligence",
      color: "#00ccff",
      days: "31–60",
      weeks: [
        {
          id: 5,
          title: "Week 5: SIEM Fundamentals",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 31,
              topic: "What is a SIEM? Architecture & Use Cases",
              description: "Security Information and Event Management — the central platform of every SOC. Learn what it does and why.",
              duration: "50 min",
              difficulty: "Intermediate",
              video: {
                title: "What is SIEM? | Security Operations Center",
                channel: "IBM Technology",
                url: "https://www.youtube.com/watch?v=oBMNsEOzPOE",
                embed: "https://www.youtube.com/embed/oBMNsEOzPOE"
              },
              resources: [
                { title: "SIEM Explained – Gartner", url: "https://www.gartner.com/en/information-technology/glossary/security-information-and-event-management-siem", type: "article" },
                { title: "TryHackMe – SIEM Overview", url: "https://tryhackme.com/room/siem", type: "lab" }
              ],
              xp: 70
            },
            {
              day: 32,
              topic: "Splunk Fundamentals — Search & Reporting",
              description: "Splunk is the #1 SIEM in enterprise. Learn SPL (Search Processing Language) to query logs like a pro.",
              duration: "70 min",
              difficulty: "Intermediate",
              video: {
                title: "Splunk Tutorial for Beginners",
                channel: "Simplilearn",
                url: "https://www.youtube.com/watch?v=ssVnFRVBXcE",
                embed: "https://www.youtube.com/embed/ssVnFRVBXcE"
              },
              resources: [
                { title: "Splunk Free Training", url: "https://education.splunk.com/free-courses", type: "course" },
                { title: "TryHackMe – Splunk: Basics", url: "https://tryhackme.com/room/splunk101", type: "lab" },
                { title: "Splunk SPL Cheatsheet", url: "https://www.splunk.com/pdfs/solution-guides/splunk-quick-reference-guide.pdf", type: "reference" }
              ],
              xp: 80
            },
            {
              day: 33,
              topic: "Splunk — Creating Dashboards & Alerts",
              description: "Build Splunk dashboards to visualize security data and create alerts that fire when suspicious events occur.",
              duration: "65 min",
              difficulty: "Intermediate",
              video: {
                title: "Splunk Dashboards and Alerts",
                channel: "Splunk Official",
                url: "https://www.youtube.com/watch?v=Cw3-VGQkp3o",
                embed: "https://www.youtube.com/embed/Cw3-VGQkp3o"
              },
              resources: [
                { title: "TryHackMe – Splunk 2", url: "https://tryhackme.com/room/splunk2gcd5", type: "lab" },
                { title: "Splunk Security Essentials App", url: "https://splunkbase.splunk.com/app/3435/", type: "tool" }
              ],
              xp: 80
            },
            {
              day: 34,
              topic: "ELK Stack (Elasticsearch, Logstash, Kibana)",
              description: "Open-source alternative to Splunk. ELK Stack is widely used for log management and SIEM functionality.",
              duration: "70 min",
              difficulty: "Intermediate",
              video: {
                title: "ELK Stack Tutorial for Beginners",
                channel: "Amigoscode",
                url: "https://www.youtube.com/watch?v=trs1VjDU5bA",
                embed: "https://www.youtube.com/embed/trs1VjDU5bA"
              },
              resources: [
                { title: "Elastic SIEM Guide", url: "https://www.elastic.co/guide/en/security/current/index.html", type: "reference" },
                { title: "TryHackMe – Investigating with ELK 101", url: "https://tryhackme.com/room/investigatingwithelk101", type: "lab" }
              ],
              xp: 80
            },
            {
              day: 35,
              topic: "Microsoft Sentinel — Cloud SIEM",
              description: "Azure Sentinel is Microsoft's cloud-native SIEM. Learn KQL (Kusto Query Language) for log analysis.",
              duration: "65 min",
              difficulty: "Intermediate",
              video: {
                title: "Microsoft Sentinel Tutorial",
                channel: "Microsoft Security",
                url: "https://www.youtube.com/watch?v=e0K-A5GJ2C8",
                embed: "https://www.youtube.com/embed/e0K-A5GJ2C8"
              },
              resources: [
                { title: "Microsoft Learn – Sentinel", url: "https://learn.microsoft.com/en-us/azure/sentinel/", type: "course" },
                { title: "KQL Quick Reference", url: "https://learn.microsoft.com/en-us/azure/data-explorer/kql-quick-reference", type: "reference" }
              ],
              xp: 80
            },
            {
              day: 36,
              topic: "SIEM Use Cases & Detection Rules",
              description: "Learn how to write detection rules in SIEM tools using Sigma rule format — the universal detection language.",
              duration: "60 min",
              difficulty: "Intermediate",
              video: {
                title: "Sigma Rules Explained",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=CEjksMvGjfA",
                embed: "https://www.youtube.com/embed/CEjksMvGjfA"
              },
              resources: [
                { title: "Sigma Rules GitHub", url: "https://github.com/SigmaHQ/sigma", type: "reference" },
                { title: "Sigma HQ – Detection Rules", url: "https://sigmahq.io/", type: "tool" }
              ],
              xp: 80
            },
            {
              day: 37,
              topic: "Week 5 Review — SIEM Hands-on Lab",
              description: "Complete TryHackMe SOC Level 1 SIEM modules and practice writing your first detection rules.",
              duration: "90 min",
              difficulty: "Intermediate",
              video: {
                title: "Splunk Boss of the SOC Walkthrough",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=4B1HEFxFkac",
                embed: "https://www.youtube.com/embed/4B1HEFxFkac"
              },
              resources: [
                { title: "Splunk Boss of the SOC Dataset", url: "https://github.com/splunk/botsv3", type: "lab" },
                { title: "TryHackMe – SOC Level 1 Path", url: "https://tryhackme.com/path/outline/soclevel1", type: "lab" }
              ],
              xp: 120
            }
          ]
        },
        {
          id: 6,
          title: "Week 6: Log Analysis & Correlation",
          image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 38,
              topic: "Log Analysis Fundamentals — Reading Raw Logs",
              description: "Learn to read and parse firewall logs, web server logs, and system logs manually without a SIEM.",
              duration: "55 min",
              difficulty: "Intermediate",
              video: {
                title: "Log Analysis for Beginners",
                channel: "Security Blue Team",
                url: "https://www.youtube.com/watch?v=EEADPatZBiw",
                embed: "https://www.youtube.com/embed/EEADPatZBiw"
              },
              resources: [
                { title: "Blue Team Labs – Log Analysis Challenges", url: "https://blueteamlabs.online/home/challenges", type: "lab" },
                { title: "Loggly Log Analysis Guide", url: "https://www.loggly.com/ultimate-guide/", type: "article" }
              ],
              xp: 70
            },
            {
              day: 39,
              topic: "Windows Event Log Analysis in Depth",
              description: "Deep dive into Windows Security events. Practice identifying brute force, lateral movement, and privilege escalation in logs.",
              duration: "65 min",
              difficulty: "Intermediate",
              video: {
                title: "Windows Event Log Analysis for SOC Analysts",
                channel: "13Cubed",
                url: "https://www.youtube.com/watch?v=llMT_hZcf7k",
                embed: "https://www.youtube.com/embed/llMT_hZcf7k"
              },
              resources: [
                { title: "Chainsaw – Windows Log Analysis Tool", url: "https://github.com/WithSecureLabs/chainsaw", type: "tool" },
                { title: "Hayabusa – Windows Log Fast Forensics", url: "https://github.com/Yamato-Security/hayabusa", type: "tool" },
                { title: "TryHackMe – Windows Event Logs", url: "https://tryhackme.com/room/windowseventlogs", type: "lab" }
              ],
              xp: 80
            },
            {
              day: 40,
              topic: "Network Log Analysis — Firewall & IDS Logs",
              description: "Analyze Snort/Suricata IDS alerts, firewall deny rules, and correlate with other log sources.",
              duration: "60 min",
              difficulty: "Intermediate",
              video: {
                title: "Snort IDS Tutorial for Beginners",
                channel: "NetworkChuck",
                url: "https://www.youtube.com/watch?v=jMBrFzMdRh4",
                embed: "https://www.youtube.com/embed/jMBrFzMdRh4"
              },
              resources: [
                { title: "Snort Documentation", url: "https://www.snort.org/documents", type: "reference" },
                { title: "TryHackMe – Snort", url: "https://tryhackme.com/room/snort", type: "lab" }
              ],
              xp: 80
            },
            {
              day: 41,
              topic: "Log Correlation — Connecting the Dots",
              description: "Learn how to correlate events across multiple log sources to identify a complete attack chain.",
              duration: "60 min",
              difficulty: "Intermediate",
              video: {
                title: "Security Event Correlation and SIEM",
                channel: "Cybrary",
                url: "https://www.youtube.com/watch?v=hReVQ8lGXec",
                embed: "https://www.youtube.com/embed/hReVQ8lGXec"
              },
              resources: [
                { title: "SANS Log Management Poster", url: "https://www.sans.org/security-resources/posters/log-management-poster/135/download", type: "reference" },
                { title: "TryHackMe – ItsyBitsy (Log Analysis)", url: "https://tryhackme.com/room/itsybitsy", type: "lab" }
              ],
              xp: 80
            },
            {
              day: 42,
              topic: "Alert Triage — True vs False Positives",
              description: "The core daily task of a Tier 1 SOC analyst. Learn structured triage methodology to quickly classify alerts.",
              duration: "55 min",
              difficulty: "Intermediate",
              video: {
                title: "Alert Triage and False Positive Reduction",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=oNIJs1L8g9Y",
                embed: "https://www.youtube.com/embed/oNIJs1L8g9Y"
              },
              resources: [
                { title: "SOC Alert Triage Process", url: "https://www.cisa.gov/sites/default/files/publications/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf", type: "reference" },
                { title: "Blue Team Labs Online – Triage Labs", url: "https://blueteamlabs.online/", type: "lab" }
              ],
              xp: 80
            },
            {
              day: 43,
              topic: "Building a Home SOC Lab",
              description: "Set up your own free home lab: Security Onion, pfSense, and vulnerable VMs to practice detection.",
              duration: "120 min",
              difficulty: "Intermediate",
              video: {
                title: "Build a SOC Home Lab from Scratch",
                channel: "Tyler Ramsbey",
                url: "https://www.youtube.com/watch?v=5CdZBoRgLfM",
                embed: "https://www.youtube.com/embed/5CdZBoRgLfM"
              },
              resources: [
                { title: "Security Onion", url: "https://securityonionsolutions.com/", type: "tool" },
                { title: "VulnHub – Vulnerable VMs", url: "https://www.vulnhub.com/", type: "lab" },
                { title: "DFIR.training – Lab Setup Guide", url: "https://dfir.training/", type: "article" }
              ],
              xp: 100
            },
            {
              day: 44,
              topic: "Week 6 Review — Log Analysis CTF",
              description: "Complete Blue Team Labs Online log analysis challenges to test your new skills.",
              duration: "90 min",
              difficulty: "Intermediate",
              video: {
                title: "Log Analysis CTF Walkthrough",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=Pxqbe5NMXEM",
                embed: "https://www.youtube.com/embed/Pxqbe5NMXEM"
              },
              resources: [
                { title: "Blue Team Labs – Log Analysis Category", url: "https://blueteamlabs.online/home/challenges?category=log+analysis", type: "lab" },
                { title: "CyberDefenders – Free SOC Challenges", url: "https://cyberdefenders.org/blueteam-ctf-challenges/", type: "lab" }
              ],
              xp: 120
            }
          ]
        },
        {
          id: 7,
          title: "Week 7: Incident Response",
          image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 45,
              topic: "Incident Response Lifecycle — NIST Framework",
              description: "Learn the 4 phases: Preparation, Detection & Analysis, Containment & Eradication, Recovery. This is the SOC playbook.",
              duration: "55 min",
              difficulty: "Intermediate",
              video: {
                title: "Incident Response Explained | NIST Framework",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=CkLCuLHn0YE",
                embed: "https://www.youtube.com/embed/CkLCuLHn0YE"
              },
              resources: [
                { title: "NIST Incident Response Guide (SP 800-61)", url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf", type: "reference" },
                { title: "TryHackMe – Incident Response and Forensics", url: "https://tryhackme.com/module/incident-response-and-forensics", type: "lab" }
              ],
              xp: 80
            },
            {
              day: 46,
              topic: "Playbooks & Runbooks — Standardizing Response",
              description: "Learn to follow and write incident response playbooks for common scenarios: phishing, ransomware, data breach.",
              duration: "50 min",
              difficulty: "Intermediate",
              video: {
                title: "SOC Playbook Creation — Best Practices",
                channel: "Security Blue Team",
                url: "https://www.youtube.com/watch?v=IfRQCqHfXo4",
                embed: "https://www.youtube.com/embed/IfRQCqHfXo4"
              },
              resources: [
                { title: "Incident Response Playbook Templates – GitHub", url: "https://github.com/certsocietegenerale/IRM", type: "reference" },
                { title: "SANS Incident Response Checklist", url: "https://www.sans.org/media/score/checklists/IR-Checklist.pdf", type: "reference" }
              ],
              xp: 80
            },
            {
              day: 47,
              topic: "Phishing Investigation — Full Workflow",
              description: "End-to-end phishing incident: email header analysis, URL defanging, IOC extraction, and reporting.",
              duration: "65 min",
              difficulty: "Intermediate",
              video: {
                title: "Phishing Email Analysis — Full Walkthrough",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=ypxRGsaByOI",
                embed: "https://www.youtube.com/embed/ypxRGsaByOI"
              },
              resources: [
                { title: "MXToolbox – Email Header Analyzer", url: "https://mxtoolbox.com/EmailHeaders.aspx", type: "tool" },
                { title: "TryHackMe – Phishing Emails 1-5", url: "https://tryhackme.com/room/phishingemails1tryoe", type: "lab" },
                { title: "PhishTool", url: "https://www.phishtool.com/", type: "tool" }
              ],
              xp: 80
            },
            {
              day: 48,
              topic: "Malware Incident Response",
              description: "How to respond when malware is detected: isolation, evidence preservation, IOC extraction, and remediation.",
              duration: "60 min",
              difficulty: "Intermediate",
              video: {
                title: "Malware Incident Response Steps",
                channel: "13Cubed",
                url: "https://www.youtube.com/watch?v=3EwudMV1QkM",
                embed: "https://www.youtube.com/embed/3EwudMV1QkM"
              },
              resources: [
                { title: "Cuckoo Sandbox – Malware Analysis", url: "https://cuckoosandbox.org/", type: "tool" },
                { title: "ANY.RUN Interactive Sandbox", url: "https://any.run/", type: "tool" },
                { title: "TryHackMe – Malware Analysis", url: "https://tryhackme.com/room/malmalintroductory", type: "lab" }
              ],
              xp: 80
            },
            {
              day: 49,
              topic: "Ticket Management & Documentation",
              description: "SOC work lives in ticketing systems (TheHive, ServiceNow, Jira). Learn documentation best practices for IR tickets.",
              duration: "45 min",
              difficulty: "Intermediate",
              video: {
                title: "TheHive Security Incident Platform",
                channel: "TheHive Project",
                url: "https://www.youtube.com/watch?v=GFDlv3YPxW4",
                embed: "https://www.youtube.com/embed/GFDlv3YPxW4"
              },
              resources: [
                { title: "TheHive Project", url: "https://thehive-project.org/", type: "tool" },
                { title: "IR Documentation Templates", url: "https://github.com/counteractive/incident-response-plan-template", type: "reference" }
              ],
              xp: 70
            },
            {
              day: 50,
              topic: "Business Continuity & Post-Incident Review",
              description: "Learn how to write Post-Incident Reports (PIR), conduct lessons-learned sessions, and improve defenses.",
              duration: "45 min",
              difficulty: "Intermediate",
              video: {
                title: "Post Incident Review Best Practices",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=4_MUFIvKFIo",
                embed: "https://www.youtube.com/embed/4_MUFIvKFIo"
              },
              resources: [
                { title: "SANS – Post Incident Review Guide", url: "https://www.sans.org/blog/using-the-post-incident-review/", type: "article" }
              ],
              xp: 70
            },
            {
              day: 51,
              topic: "Week 7 Review — IR Simulation",
              description: "Complete a full incident response simulation on CyberDefenders — identify, contain, and report a simulated attack.",
              duration: "120 min",
              difficulty: "Intermediate",
              video: {
                title: "Incident Response Scenario Walkthrough",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=nEz-GULZp64",
                embed: "https://www.youtube.com/embed/nEz-GULZp64"
              },
              resources: [
                { title: "CyberDefenders – IR Challenges", url: "https://cyberdefenders.org/blueteam-ctf-challenges/", type: "lab" },
                { title: "TryHackMe – Incident Handling with Splunk", url: "https://tryhackme.com/room/splunk201", type: "lab" }
              ],
              xp: 150
            }
          ]
        },
        {
          id: 8,
          title: "Week 8: Threat Intelligence",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 52,
              topic: "Threat Intelligence Fundamentals",
              description: "Learn the Threat Intelligence lifecycle: Planning, Collection, Analysis, Dissemination. Strategic vs Tactical vs Operational TI.",
              duration: "55 min",
              difficulty: "Intermediate",
              video: {
                title: "Threat Intelligence Explained",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=0fG5C6B3bIY",
                embed: "https://www.youtube.com/embed/0fG5C6B3bIY"
              },
              resources: [
                { title: "TryHackMe – Threat Intelligence Tools", url: "https://tryhackme.com/room/threatinteltools", type: "lab" },
                { title: "SANS Threat Intelligence Primer", url: "https://www.sans.org/reading-room/whitepapers/threatintelligence/", type: "article" }
              ],
              xp: 80
            },
            {
              day: 53,
              topic: "IOC Analysis — Indicators of Compromise",
              description: "Learn to work with IPs, domains, file hashes, URLs as IOCs. Use threat intel platforms to enrich alerts.",
              duration: "60 min",
              difficulty: "Intermediate",
              video: {
                title: "IOC Analysis with VirusTotal & Shodan",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=qH5gv0oBNzA",
                embed: "https://www.youtube.com/embed/qH5gv0oBNzA"
              },
              resources: [
                { title: "VirusTotal", url: "https://www.virustotal.com/", type: "tool" },
                { title: "Shodan.io", url: "https://www.shodan.io/", type: "tool" },
                { title: "AbuseIPDB", url: "https://www.abuseipdb.com/", type: "tool" },
                { title: "ThreatFox – Abuse.ch IOC Database", url: "https://threatfox.abuse.ch/", type: "tool" }
              ],
              xp: 80
            },
            {
              day: 54,
              topic: "MISP — Malware Information Sharing Platform",
              description: "MISP is the open-source threat intelligence sharing platform used by SOC teams worldwide.",
              duration: "60 min",
              difficulty: "Intermediate",
              video: {
                title: "MISP Platform Overview",
                channel: "MISP Project",
                url: "https://www.youtube.com/watch?v=00jq7Gbqdz8",
                embed: "https://www.youtube.com/embed/00jq7Gbqdz8"
              },
              resources: [
                { title: "MISP Project", url: "https://www.misp-project.org/", type: "tool" },
                { title: "TryHackMe – MISP Room", url: "https://tryhackme.com/room/misp", type: "lab" }
              ],
              xp: 80
            },
            {
              day: 55,
              topic: "Dark Web Intelligence & Threat Feeds",
              description: "Learn how SOC teams monitor dark web forums, threat actor feeds, and free/paid TI sources.",
              duration: "50 min",
              difficulty: "Intermediate",
              video: {
                title: "Dark Web Monitoring for SOC Teams",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=kLe_8bNi4mI",
                embed: "https://www.youtube.com/embed/kLe_8bNi4mI"
              },
              resources: [
                { title: "AlienVault OTX (Free TI)", url: "https://otx.alienvault.com/", type: "tool" },
                { title: "Malware Bazaar", url: "https://bazaar.abuse.ch/", type: "tool" },
                { title: "Feodo Tracker", url: "https://feodotracker.abuse.ch/", type: "tool" }
              ],
              xp: 80
            },
            {
              day: 56,
              topic: "Threat Actor Tracking & APT Groups",
              description: "Learn about Advanced Persistent Threats (APTs), nation-state actors, and how to track specific threat groups.",
              duration: "55 min",
              difficulty: "Intermediate",
              video: {
                title: "APT Groups and Cyber Threat Actors",
                channel: "The PC Security Channel",
                url: "https://www.youtube.com/watch?v=0x14U6uJrqM",
                embed: "https://www.youtube.com/embed/0x14U6uJrqM"
              },
              resources: [
                { title: "MITRE ATT&CK – Groups", url: "https://attack.mitre.org/groups/", type: "reference" },
                { title: "Mandiant APT Profiles", url: "https://www.mandiant.com/resources/apt-groups", type: "reference" }
              ],
              xp: 80
            },
            {
              day: 57,
              topic: "OSINT for SOC Analysts",
              description: "Open Source Intelligence: use free tools to investigate IPs, domains, and people during incident investigations.",
              duration: "60 min",
              difficulty: "Intermediate",
              video: {
                title: "OSINT for Beginners — Full Course",
                channel: "TCM Security",
                url: "https://www.youtube.com/watch?v=qwA6MmbeGNo",
                embed: "https://www.youtube.com/embed/qwA6MmbeGNo"
              },
              resources: [
                { title: "OSINT Framework", url: "https://osintframework.com/", type: "tool" },
                { title: "Maltego Community Edition", url: "https://www.maltego.com/downloads/", type: "tool" },
                { title: "TryHackMe – OSINT Room", url: "https://tryhackme.com/room/ohsint", type: "lab" }
              ],
              xp: 80
            },
            {
              day: 58,
              topic: "Week 8 Review — TI Investigation Lab",
              description: "Complete a threat intelligence investigation: receive an IP, trace it to a threat group, and write a TI report.",
              duration: "90 min",
              difficulty: "Intermediate",
              video: {
                title: "Threat Intelligence Report Writing",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=ndXGYoJmjMg",
                embed: "https://www.youtube.com/embed/ndXGYoJmjMg"
              },
              resources: [
                { title: "CyberDefenders – TI Challenges", url: "https://cyberdefenders.org/blueteam-ctf-challenges/", type: "lab" },
                { title: "TryHackMe – Threat Intelligence for SOC", url: "https://tryhackme.com/module/threat-intelligence", type: "lab" }
              ],
              xp: 150
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Phase 3: Intermediate Tools",
      subtitle: "Network Analysis, Malware, Vulnerability Management & SOAR",
      color: "#ff6b35",
      days: "61–90",
      weeks: [
        {
          id: 9,
          title: "Week 9: Network Traffic Analysis",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 61,
              topic: "Wireshark Fundamentals — Packet Capture",
              description: "Learn to capture and analyze network packets with Wireshark. Essential for investigating network-based attacks.",
              duration: "70 min",
              difficulty: "Intermediate",
              video: {
                title: "Wireshark Full Tutorial for Beginners",
                channel: "David Bombal",
                url: "https://www.youtube.com/watch?v=lb1Dw0elw0Q",
                embed: "https://www.youtube.com/embed/lb1Dw0elw0Q"
              },
              resources: [
                { title: "TryHackMe – Wireshark Basics", url: "https://tryhackme.com/room/wiresharkthebasics", type: "lab" },
                { title: "Wireshark Display Filter Reference", url: "https://www.wireshark.org/docs/dfref/", type: "reference" },
                { title: "PacketLife – Sample Captures", url: "https://packetlife.net/captures/", type: "lab" }
              ],
              xp: 90
            },
            {
              day: 62,
              topic: "Wireshark — Detecting Attacks in Traffic",
              description: "Use Wireshark to identify port scans, ARP poisoning, DNS exfiltration, and C2 communication patterns.",
              duration: "65 min",
              difficulty: "Intermediate",
              video: {
                title: "Detecting Network Attacks with Wireshark",
                channel: "David Bombal",
                url: "https://www.youtube.com/watch?v=GMNOT1aZmD8",
                embed: "https://www.youtube.com/embed/GMNOT1aZmD8"
              },
              resources: [
                { title: "TryHackMe – Wireshark: Packet Operations", url: "https://tryhackme.com/room/wiresharkpacketoperations", type: "lab" },
                { title: "Malware Traffic Analysis – Sample PCAPs", url: "https://www.malware-traffic-analysis.net/", type: "lab" }
              ],
              xp: 90
            },
            {
              day: 63,
              topic: "Zeek (Bro) Network Security Monitor",
              description: "Zeek generates rich network metadata logs used by Security Onion. Learn Zeek log structure for SOC investigations.",
              duration: "60 min",
              difficulty: "Intermediate",
              video: {
                title: "Zeek Network Monitoring Tutorial",
                channel: "Security Onion Solutions",
                url: "https://www.youtube.com/watch?v=Kxe0Gl0CiXY",
                embed: "https://www.youtube.com/embed/Kxe0Gl0CiXY"
              },
              resources: [
                { title: "Zeek Documentation", url: "https://docs.zeek.org/en/master/", type: "reference" },
                { title: "TryHackMe – Zeek Room", url: "https://tryhackme.com/room/zeekbro", type: "lab" }
              ],
              xp: 90
            },
            {
              day: 64,
              topic: "Suricata — Network IDS/IPS",
              description: "Suricata is the industry-standard open-source IDS/IPS. Learn to write Suricata rules and analyze its alerts.",
              duration: "65 min",
              difficulty: "Intermediate",
              video: {
                title: "Suricata IDS Tutorial",
                channel: "Lawrence Systems",
                url: "https://www.youtube.com/watch?v=S0-vsjhPDN0",
                embed: "https://www.youtube.com/embed/S0-vsjhPDN0"
              },
              resources: [
                { title: "Suricata Documentation", url: "https://suricata.readthedocs.io/", type: "reference" },
                { title: "TryHackMe – Suricata Room", url: "https://tryhackme.com/room/suricata", type: "lab" },
                { title: "Emerging Threats – Suricata Rules", url: "https://rules.emergingthreats.net/", type: "tool" }
              ],
              xp: 90
            },
            {
              day: 65,
              topic: "Security Onion — Full SOC Platform",
              description: "Security Onion combines Zeek, Suricata, Elasticsearch, and more into a complete network security monitoring platform.",
              duration: "90 min",
              difficulty: "Intermediate",
              video: {
                title: "Security Onion 2 Full Tutorial",
                channel: "Security Onion Solutions",
                url: "https://www.youtube.com/watch?v=Idk7dTYJcRk",
                embed: "https://www.youtube.com/embed/Idk7dTYJcRk"
              },
              resources: [
                { title: "Security Onion Documentation", url: "https://docs.securityonion.net/", type: "reference" },
                { title: "Security Onion Free Download", url: "https://securityonionsolutions.com/software/", type: "tool" }
              ],
              xp: 100
            },
            {
              day: 66,
              topic: "NetFlow & Traffic Analysis at Scale",
              description: "Understand NetFlow/IPFIX for high-level network visibility. Used in large SOC environments for traffic baseline analysis.",
              duration: "50 min",
              difficulty: "Intermediate",
              video: {
                title: "NetFlow Explained",
                channel: "NetworkChuck",
                url: "https://www.youtube.com/watch?v=6lA_Aokm-3M",
                embed: "https://www.youtube.com/embed/6lA_Aokm-3M"
              },
              resources: [
                { title: "ntopng – NetFlow Analyzer", url: "https://www.ntop.org/products/traffic-analysis/ntop/", type: "tool" },
                { title: "ARGUS – Audit Record Generation", url: "https://openargus.org/", type: "tool" }
              ],
              xp: 80
            },
            {
              day: 67,
              topic: "Week 9 Review — PCAP Challenge",
              description: "Analyze real-world malware PCAPs from Malware-Traffic-Analysis.net and identify the attack chain.",
              duration: "120 min",
              difficulty: "Intermediate",
              video: {
                title: "PCAP Challenge Walkthrough",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=b5DQLH5iuDo",
                embed: "https://www.youtube.com/embed/b5DQLH5iuDo"
              },
              resources: [
                { title: "Malware Traffic Analysis – Exercises", url: "https://www.malware-traffic-analysis.net/training-exercises.html", type: "lab" },
                { title: "CyberDefenders – Network Forensics", url: "https://cyberdefenders.org/blueteam-ctf-challenges/?category=network-forensics", type: "lab" }
              ],
              xp: 150
            }
          ]
        },
        {
          id: 10,
          title: "Week 10: Endpoint Detection & Malware Analysis",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 68,
              topic: "EDR Solutions — CrowdStrike, SentinelOne, Defender",
              description: "Endpoint Detection & Response tools are the eyes on every workstation. Learn how EDR differs from antivirus.",
              duration: "55 min",
              difficulty: "Intermediate",
              video: {
                title: "EDR vs Antivirus — What's the Difference?",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=Wg4Mb4ORp3A",
                embed: "https://www.youtube.com/embed/Wg4Mb4ORp3A"
              },
              resources: [
                { title: "Microsoft Defender for Endpoint Docs", url: "https://docs.microsoft.com/en-us/microsoft-365/security/defender-endpoint/", type: "reference" },
                { title: "TryHackMe – Microsoft Defender for Endpoint", url: "https://tryhackme.com/room/microsoftdefenderforendpoint", type: "lab" }
              ],
              xp: 90
            },
            {
              day: 69,
              topic: "Malware Analysis Basics — Static Analysis",
              description: "Learn to examine malware without running it: strings, file headers, imports, and YARA rules.",
              duration: "70 min",
              difficulty: "Intermediate",
              video: {
                title: "Malware Analysis — Static Analysis",
                channel: "TCM Security",
                url: "https://www.youtube.com/watch?v=vBjBqFGLGR0",
                embed: "https://www.youtube.com/embed/vBjBqFGLGR0"
              },
              resources: [
                { title: "TryHackMe – Malware Analysis — Static", url: "https://tryhackme.com/room/malmalintroductory", type: "lab" },
                { title: "PEstudio – Malware Analysis Tool", url: "https://www.winitor.com/", type: "tool" },
                { title: "YARA Rules – GitHub", url: "https://github.com/VirusTotal/yara", type: "tool" }
              ],
              xp: 100
            },
            {
              day: 70,
              topic: "Dynamic Malware Analysis — Sandboxes",
              description: "Run malware in safe sandboxes to observe behavior: registry changes, network connections, file drops.",
              duration: "65 min",
              difficulty: "Intermediate",
              video: {
                title: "Dynamic Malware Analysis with ANY.RUN",
                channel: "The Cyber Mentor",
                url: "https://www.youtube.com/watch?v=FiGFc_5TJKI",
                embed: "https://www.youtube.com/embed/FiGFc_5TJKI"
              },
              resources: [
                { title: "ANY.RUN Sandbox", url: "https://any.run/", type: "tool" },
                { title: "Hybrid Analysis", url: "https://www.hybrid-analysis.com/", type: "tool" },
                { title: "Joe Sandbox Community", url: "https://www.joesandbox.com/", type: "tool" }
              ],
              xp: 100
            },
            {
              day: 71,
              topic: "YARA Rules — Detection Engineering",
              description: "Write YARA rules to detect malware families based on byte patterns, strings, and file characteristics.",
              duration: "65 min",
              difficulty: "Intermediate",
              video: {
                title: "YARA Rules for Malware Hunters",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=p2nj-BKB2fs",
                embed: "https://www.youtube.com/embed/p2nj-BKB2fs"
              },
              resources: [
                { title: "YARA Documentation", url: "https://yara.readthedocs.io/", type: "reference" },
                { title: "Malpedia – Malware Database", url: "https://malpedia.caad.fkie.fraunhofer.de/", type: "reference" }
              ],
              xp: 100
            },
            {
              day: 72,
              topic: "Ransomware Analysis & Response",
              description: "Analyze ransomware behavior, identify the strain, find encryption artifacts, and execute the ransomware playbook.",
              duration: "70 min",
              difficulty: "Intermediate",
              video: {
                title: "Ransomware Deep Dive — Technical Analysis",
                channel: "The PC Security Channel",
                url: "https://www.youtube.com/watch?v=rTMOEF8xMlE",
                embed: "https://www.youtube.com/embed/rTMOEF8xMlE"
              },
              resources: [
                { title: "ID Ransomware – Identify Your Strain", url: "https://id-ransomware.malwarehunterteam.com/", type: "tool" },
                { title: "No More Ransom – Decryptors", url: "https://www.nomoreransom.org/", type: "tool" }
              ],
              xp: 100
            },
            {
              day: 73,
              topic: "Process Injection & Living Off the Land (LOLBAS)",
              description: "Understand advanced evasion techniques: process hollowing, DLL injection, and legitimate tool abuse (LOLBins).",
              duration: "60 min",
              difficulty: "Intermediate",
              video: {
                title: "Process Injection Techniques",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=dEJOLEKn1OY",
                embed: "https://www.youtube.com/embed/dEJOLEKn1OY"
              },
              resources: [
                { title: "LOLBAS Project", url: "https://lolbas-project.github.io/", type: "reference" },
                { title: "GTFOBins (Linux LOL)", url: "https://gtfobins.github.io/", type: "reference" }
              ],
              xp: 100
            },
            {
              day: 74,
              topic: "Week 10 Review — Malware Analysis Challenge",
              description: "Analyze a real malware sample using static and dynamic analysis techniques on CyberDefenders.",
              duration: "120 min",
              difficulty: "Intermediate",
              video: {
                title: "Malware Analysis CTF Walkthrough",
                channel: "TCM Security",
                url: "https://www.youtube.com/watch?v=8QBYe4Bx7f8",
                embed: "https://www.youtube.com/embed/8QBYe4Bx7f8"
              },
              resources: [
                { title: "CyberDefenders – Malware Analysis Challenges", url: "https://cyberdefenders.org/blueteam-ctf-challenges/?category=malware-analysis", type: "lab" },
                { title: "Blue Team Labs – Malware Category", url: "https://blueteamlabs.online/home/challenges?category=malware+analysis", type: "lab" }
              ],
              xp: 150
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Phase 4: Advanced SOC",
      subtitle: "Threat Hunting, DFIR, Cloud Security & Certification Prep",
      color: "#cc00ff",
      days: "91–120",
      weeks: [
        {
          id: 13,
          title: "Week 13: Threat Hunting",
          image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 91,
              topic: "Threat Hunting Fundamentals — Proactive Defense",
              description: "Move beyond reactive alerting. Learn hypothesis-driven threat hunting to find attackers before they cause damage.",
              duration: "60 min",
              difficulty: "Advanced",
              video: {
                title: "Threat Hunting for Beginners",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=EaT3MHkAa9c",
                embed: "https://www.youtube.com/embed/EaT3MHkAa9c"
              },
              resources: [
                { title: "Threat Hunting with ELK Workshop", url: "https://www.elastic.co/security-labs/threat-hunting", type: "course" },
                { title: "TryHackMe – Threat Hunting", url: "https://tryhackme.com/room/threathunting", type: "lab" },
                { title: "SQRRL Threat Hunting Reference", url: "https://www.threathunting.net/sqrrl-archive", type: "reference" }
              ],
              xp: 120
            },
            {
              day: 92,
              topic: "Hunting with MITRE ATT&CK",
              description: "Use ATT&CK techniques as hunt hypotheses. Map detections to specific techniques and find coverage gaps.",
              duration: "65 min",
              difficulty: "Advanced",
              video: {
                title: "Using MITRE ATT&CK for Threat Hunting",
                channel: "Red Canary",
                url: "https://www.youtube.com/watch?v=gEd-3UAaVf8",
                embed: "https://www.youtube.com/embed/gEd-3UAaVf8"
              },
              resources: [
                { title: "Red Canary Threat Detection Report", url: "https://redcanary.com/threat-detection-report/", type: "reference" },
                { title: "ATT&CK Navigator", url: "https://mitre-attack.github.io/attack-navigator/", type: "tool" }
              ],
              xp: 120
            },
            {
              day: 93,
              topic: "PowerShell & WMI Hunting",
              description: "Hunt for malicious PowerShell execution and WMI abuse — two of the most common attacker techniques.",
              duration: "65 min",
              difficulty: "Advanced",
              video: {
                title: "Hunting Malicious PowerShell",
                channel: "13Cubed",
                url: "https://www.youtube.com/watch?v=bGwLWhbRt5o",
                embed: "https://www.youtube.com/embed/bGwLWhbRt5o"
              },
              resources: [
                { title: "Sysmon Configuration – SwiftOnSecurity", url: "https://github.com/SwiftOnSecurity/sysmon-config", type: "tool" },
                { title: "TryHackMe – Sysmon", url: "https://tryhackme.com/room/sysmon", type: "lab" }
              ],
              xp: 120
            },
            {
              day: 94,
              topic: "Sysmon — Enhanced Windows Visibility",
              description: "Deploy and tune Sysmon for high-fidelity endpoint visibility. Write Sysmon rules to detect specific TTPs.",
              duration: "70 min",
              difficulty: "Advanced",
              video: {
                title: "Sysmon Full Tutorial for SOC Analysts",
                channel: "13Cubed",
                url: "https://www.youtube.com/watch?v=7dEfKn70HCI",
                embed: "https://www.youtube.com/embed/7dEfKn70HCI"
              },
              resources: [
                { title: "Olaf Hartong – Sysmon Modular Config", url: "https://github.com/olafhartong/sysmon-modular", type: "tool" },
                { title: "TryHackMe – Sysmon Room", url: "https://tryhackme.com/room/sysmon", type: "lab" }
              ],
              xp: 120
            },
            {
              day: 95,
              topic: "Lateral Movement Hunting",
              description: "Detect Pass-the-Hash, Pass-the-Ticket, PsExec, and other lateral movement techniques in logs and traffic.",
              duration: "70 min",
              difficulty: "Advanced",
              video: {
                title: "Lateral Movement Detection",
                channel: "TCM Security",
                url: "https://www.youtube.com/watch?v=FmcDaVHpcRY",
                embed: "https://www.youtube.com/embed/FmcDaVHpcRY"
              },
              resources: [
                { title: "MITRE – Lateral Movement Tactics", url: "https://attack.mitre.org/tactics/TA0008/", type: "reference" },
                { title: "CyberDefenders – Lateral Movement Challenges", url: "https://cyberdefenders.org/", type: "lab" }
              ],
              xp: 120
            },
            {
              day: 96,
              topic: "C2 Communication Detection",
              description: "Identify Command & Control traffic: beacon patterns, domain generation algorithms (DGA), and DNS tunneling.",
              duration: "65 min",
              difficulty: "Advanced",
              video: {
                title: "Detecting C2 Beaconing",
                channel: "John Hammond",
                url: "https://www.youtube.com/watch?v=pA1MfbkLe-Y",
                embed: "https://www.youtube.com/embed/pA1MfbkLe-Y"
              },
              resources: [
                { title: "RITA – Real Intelligence Threat Analytics", url: "https://github.com/activecm/rita", type: "tool" },
                { title: "DGA Detective", url: "https://dgadetector.dga.damnvulnerable.website/", type: "tool" }
              ],
              xp: 120
            },
            {
              day: 97,
              topic: "Week 13 Review — Full Threat Hunt",
              description: "Execute a complete threat hunt on a simulated environment using Splunk or ELK, document findings.",
              duration: "120 min",
              difficulty: "Advanced",
              video: {
                title: "Full Threat Hunt Walkthrough",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=0fG5C6B3bIY",
                embed: "https://www.youtube.com/embed/0fG5C6B3bIY"
              },
              resources: [
                { title: "TryHackMe – Threat Hunting Path", url: "https://tryhackme.com/module/threat-hunting", type: "lab" },
                { title: "CyberDefenders – Hunt Challenges", url: "https://cyberdefenders.org/blueteam-ctf-challenges/", type: "lab" }
              ],
              xp: 200
            }
          ]
        },
        {
          id: 14,
          title: "Week 14–16: DFIR, Cloud Security & Cert Prep",
          image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=400&q=80",
          days: [
            {
              day: 105,
              topic: "Digital Forensics Fundamentals (DFIR)",
              description: "Learn disk forensics, memory forensics, and evidence preservation principles using Autopsy and Volatility.",
              duration: "75 min",
              difficulty: "Advanced",
              video: {
                title: "Digital Forensics Full Course",
                channel: "13Cubed",
                url: "https://www.youtube.com/watch?v=QR3xHXGH3VM",
                embed: "https://www.youtube.com/embed/QR3xHXGH3VM"
              },
              resources: [
                { title: "TryHackMe – Digital Forensics", url: "https://tryhackme.com/room/digitalforensiccase001b", type: "lab" },
                { title: "Autopsy Digital Forensics Tool", url: "https://www.autopsy.com/", type: "tool" },
                { title: "Volatility Framework", url: "https://www.volatilityfoundation.org/", type: "tool" }
              ],
              xp: 150
            },
            {
              day: 112,
              topic: "Cloud Security Monitoring (AWS/Azure)",
              description: "Learn CloudTrail, Azure Activity Logs, and how SOC teams monitor cloud environments for threats.",
              duration: "70 min",
              difficulty: "Advanced",
              video: {
                title: "AWS Security Monitoring for SOC Analysts",
                channel: "Cloud Security Podcast",
                url: "https://www.youtube.com/watch?v=W7od5bFc_bA",
                embed: "https://www.youtube.com/embed/W7od5bFc_bA"
              },
              resources: [
                { title: "AWS Security Hub", url: "https://aws.amazon.com/security-hub/", type: "reference" },
                { title: "CloudGoat – Vulnerable AWS Lab", url: "https://github.com/RhinoSecurityLabs/cloudgoat", type: "lab" },
                { title: "TryHackMe – AWS Rooms", url: "https://tryhackme.com/room/awss3service", type: "lab" }
              ],
              xp: 150
            },
            {
              day: 116,
              topic: "Certification Roadmap — CompTIA Security+, CySA+, BTL1",
              description: "Plan your certification path. Security+ validates foundations, CySA+ is SOC-focused, BTL1 is a practical SOC cert.",
              duration: "45 min",
              difficulty: "Advanced",
              video: {
                title: "Best SOC Analyst Certifications in 2024",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=FNkYMtB8_xY",
                embed: "https://www.youtube.com/embed/FNkYMtB8_xY"
              },
              resources: [
                { title: "CompTIA Security+ Exam Guide", url: "https://www.comptia.org/certifications/security", type: "reference" },
                { title: "Security Blue Team BTL1", url: "https://securityblue.team/btl1", type: "course" },
                { title: "Professor Messer Security+ Free Course", url: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/", type: "course" }
              ],
              xp: 100
            },
            {
              day: 120,
              topic: `<span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">workspace_premium</span> GRADUATION DAY — You're a SOC Analyst!`,
              description: "You've completed the 120-day journey from zero to SOC Analyst! Apply for BTL1 certification, build your portfolio, and start applying for jobs.",
              duration: "60 min",
              difficulty: "Advanced",
              video: {
                title: "How to Get Your First SOC Analyst Job",
                channel: "Simply Cyber",
                url: "https://www.youtube.com/watch?v=8hc0OKGQh8s",
                embed: "https://www.youtube.com/embed/8hc0OKGQh8s"
              },
              resources: [
                { title: "Security Blue Team – BTL1 Certification", url: "https://securityblue.team/btl1", type: "course" },
                { title: "LinkedIn – SOC Analyst Jobs", url: "https://www.linkedin.com/jobs/search/?keywords=soc+analyst", type: "reference" },
                { title: "Build Your Security Portfolio – Guide", url: "https://github.com/nicolejaneway/nileguide", type: "reference" }
              ],
              xp: 500
            }
          ]
        }
      ]
    }
  ]
};

// Flatten all days for easy access
function getAllDays() {
  const days = [];
  CURRICULUM.phases.forEach(phase => {
    phase.weeks.forEach(week => {
      week.days.forEach(day => {
        days.push({ ...day, phaseId: phase.id, phaseTitle: phase.title, phaseColor: phase.color, weekTitle: week.title });
      });
    });
  });
  return days.sort((a, b) => a.day - b.day);
}

function getDayData(dayNum) {
  return getAllDays().find(d => d.day === dayNum);
}

function getTodayDayNumber() {
  const startDate = localStorage.getItem('soc_start_date');
  if (!startDate) return 1;
  const start = new Date(startDate);
  const today = new Date();
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
  return Math.min(diff, 120);
}

// curriculum.js loaded as plain script - functions available globally
