// =============================================
// CERTIFICATE.JS — Course Completion Certificate
// =============================================

function renderCertificate(containerId) {
  const profile = getProfile ? getProfile() : null;
  const name = profile ? profile.name : 'Student';
  const today = new Date();
  const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const completed = typeof getCompletedDays === 'function' ? getCompletedDays().length : 0;
  const xp = typeof getTotalXP === 'function' ? getTotalXP() : 0;

  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="cert-wrap" id="certificate-print-area" style="${completed < 120 ? 'opacity: 0.6; filter: grayscale(50%);' : ''}">
      ${completed < 120 ? '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:64px;color:rgba(255,0,0,0.2);font-weight:900;border:8px solid rgba(255,0,0,0.2);padding:16px;z-index:10;pointer-events:none">PREVIEW</div>' : ''}
      <div class="cert-border">
        <div class="cert-corner tl"></div>
        <div class="cert-corner tr"></div>
        <div class="cert-corner bl"></div>
        <div class="cert-corner br"></div>

        <div class="cert-header">
          <div class="cert-logo">🛡️</div>
          <div class="cert-org">SOC ANALYST ACADEMY</div>
          <div class="cert-tagline">Zero to Defender · 120-Day Program</div>
        </div>

        <div class="cert-divider"></div>

        <div class="cert-title-block">
          <div class="cert-title-text">Certificate of Completion</div>
        </div>

        <div class="cert-body">
          <p class="cert-presented">This is to proudly certify that</p>
          <div class="cert-name">${name}</div>
          <p class="cert-desc">has successfully completed the <strong>120-Day SOC Analyst Mastery Program</strong>,
          demonstrating outstanding proficiency in Cybersecurity Fundamentals, Network Security,
          SIEM Operations, Threat Hunting, Malware Analysis, and Incident Response.</p>
        </div>

        <div class="cert-stats-row">
          <div class="cert-stat">
            <div class="cert-stat-val">120</div>
            <div class="cert-stat-lbl">Days Completed</div>
          </div>
          <div class="cert-seal-wrap">
            <div class="cert-seal">
              <div class="cert-seal-inner"><span class="material-symbols-sharp" style="font-size:inherit;vertical-align:middle">workspace_premium</span></div>
              <div class="cert-seal-ring"></div>
            </div>
          </div>
          <div class="cert-stat">
            <div class="cert-stat-val">${xp.toLocaleString()}</div>
            <div class="cert-stat-lbl">XP Earned</div>
          </div>
        </div>

        <div class="cert-divider"></div>

        <div class="cert-footer">
          <div class="cert-sign-block">
            <div class="cert-sign-line"></div>
            <div class="cert-sign-name">SOC Analyst Academy</div>
            <div class="cert-sign-title">Issuing Authority</div>
          </div>
          <div class="cert-id-block">
            <div class="cert-id-val">CERT-SOC-${Date.now().toString(36).toUpperCase()}</div>
            <div class="cert-id-label">Certificate ID</div>
            <div class="cert-id-val" style="margin-top:8px">${date}</div>
            <div class="cert-id-label">Date of Issue</div>
          </div>
        </div>
      </div>
    </div>

    <div class="cert-actions" style="display:flex;gap:12px;justify-content:center">
      ${completed >= 120 
        ? `<button class="quiz-btn primary" onclick="window.print()">🖨️ Download / Print Certificate</button>
           <button class="quiz-btn" style="background:#0a66c2;color:white" onclick="window.open('https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=SOC+Analyst+Academy+Certification&organizationName=SOC+Analyst+Academy&issueYear=${today.getFullYear()}&issueMonth=${today.getMonth()+1}&certUrl=${window.location.origin}', '_blank')">in Add to LinkedIn</button>`
        : `<p style="color:var(--text-secondary)">Complete all 120 days to unlock downloads and LinkedIn export!</p>`
      }
    </div>
  `;
}
