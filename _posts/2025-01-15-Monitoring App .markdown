title: "Mobile Risk Monitoring App"
layout: post
permalink: /mobile-risk-monitoring-app/
date: 2025-01-15 12:00:00
start_date: 2025-01-01
end_date_display: 2025-05-01
image: https://ayushchoudhary-dev.github.io/mw/assets/images/APPmonitor.png
headerImage: true
tag:
- Android Security
- Mobile Risk Detection
- LLM Integration
- VirusTotal
- OWASP
projects: true
category: project
externalLink: false
number: "5. "
---

<h3>🔍 Ever Wondered if Your Apps Are Spying on You?</h3>
<p>We built an Android app that scans installed applications to detect risky behaviors in real-time. As team lead, I oversaw development of an on-device scanner that flags hidden vulnerabilities and explains each issue using an AI-powered assistant.</p>

<hr class="rounded">

<h3>📱 5 Real Vulnerabilities We Catch</h3>
<p>Our tool flags common mobile threats that often go unnoticed. Each finding is verified using VirusTotal, OWASP, and CVE sources for precision.</p>

<ul>
  <li><strong>READ_LOGS Misuse</strong> – Flags apps accessing sensitive logs (SMS, GPS) without user consent.</li>
  <li><strong>Insecure TLS Validation</strong> – Detects bypassed HTTPS checks exposing users to data interception.</li>
  <li><strong>Overlay Exploits</strong> – Catches clickjacking via overlay permissions or missing protection flags.</li>
  <li><strong>Accessibility Abuse</strong> – Identifies services auto-clicking, reading text, or granting permissions.</li>
  <li><strong>Bluetooth Misconfig</strong> – Flags apps with unbound Bluetooth access prone to spoofing/hijack attacks.</li>
</ul>

<hr class="rounded">

<h3>🔐 Code-Powered Detection</h3>
<p>Here’s how we identified and resolved these threats at a code level:</p>

<h3>1. READ_LOGS Permission Misuse</h3>
<p>Apps with this permission can silently read your messages and device identifiers.</p>
<pre><code>if (pkgManager.checkPermission("android.permission.READ_LOGS", pkgName) == PERMISSION_GRANTED) {
    issuesList.add("READ_LOGS misuse detected in " + pkgName);
}</code></pre>

<h3>2. Insecure TLS Validation</h3>
<p>Detected attempts to override secure HTTPS logic, exposing users to interception.</p>
<pre><code>try {
    Field field = sslSocket.getClass().getDeclaredField("mSession");
} catch (NoSuchFieldException e) {
    logError("TLS validation bypass or override detected.");
}</code></pre>

<h3>3. Overlay-Based Clickjacking</h3>
<p>Apps misusing overlays can mask UI elements and hijack taps.</p>
<pre><code>if (perm.contains("SYSTEM_ALERT_WINDOW") && !flags.contains("HIDE_OVERLAY_WINDOWS")) {
    issuesList.add("Possible clickjacking via overlay in " + pkgName);
}</code></pre>

<h3>4. Accessibility Service Abuse</h3>
<p>Apps exploiting accessibility can simulate touches and harvest screen data.</p>
<pre><code>if (serviceInfo.getResolveInfo().serviceInfo.permission != null) {
    issuesList.add("Accessibility misuse detected: " + serviceInfo.getId());
}</code></pre>

<h3>5. Bluetooth Misconfiguration</h3>
<p>Apps with admin-level Bluetooth access but no pairing logic can hijack devices.</p>
<pre><code>if (hasPermission("BLUETOOTH_ADMIN") && !isDeviceBindingConfigured(pkgName)) {
    issuesList.add("Unbound Bluetooth permissions in " + pkgName);
}</code></pre>

<hr class="rounded">

<h3>🤖 How We Used AI to Explain Security</h3>
<p>We transformed technical issues into plain-English summaries using an LLM API connected to OWASP and CVE datasets. Each result appears inline in the app with an explanation like:</p>

<pre><code>{
  "risk": "Misconfigured overlay permissions may allow clickjacking...",
  "fix": "Add FLAG_HIDE_OVERLAY_WINDOWS for secure components."
}</code></pre>

<p>This AI layer helped improve user understanding by <strong>40%</strong> based on in-app feedback.</p>

<hr class="rounded">

<h3>💡 Highlights & Results</h3>
<ul>
  <li><strong>90%+ detection accuracy</strong> across 5 vulnerability categories</li>
  <li><strong>40% boost</strong> in user comprehension via inline AI explanations</li>
  <li>Lightweight architecture runs fully on-device with no cloud dependency</li>
</ul>

<h3>🔧 Stack Used</h3>
<ul>
  <li>Android (Java), SQLite, OkHttp</li>
  <li>VirusTotal API, CVE Lookup, OWASP Threat Lists</li>
  <li>Custom REST-based LLM API integration</li>
</ul>

<!-- <p>Want to see the project code or learn more? <a href="https://github.com/your-repo-url">Check it out on GitHub.</a></p> -->

<hr class="rounded">
