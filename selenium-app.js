// ==========================================================================
// STATE MANAGEMENT & DATA — SELENIUM TRAINING DECK
// ==========================================================================
let currentSlide = 1;
const totalSlides = 27;
let isPlaying = false;
let playInterval = null;
const playSpeed = 5000; // 5 seconds per slide

// Slide Metadata for dropdown selector
const slidesMetadata = [
  { id: 1,  title: "01. Title: Selenium WebDriver Training" },
  { id: 2,  title: "02. Course Overview (TOC)" },
  { id: 3,  title: "03. Day 01 — Intro: Selenium Ecosystem & Architecture" },
  { id: 4,  title: "04. Day 01 — What is Selenium?" },
  { id: 5,  title: "05. Day 01 — The Evolution of Selenium" },
  { id: 6,  title: "06. Day 01 — Selenium Suite Components (Interactive)" },
  { id: 7,  title: "07. Day 01 — Selenium 4 vs Selenium 3" },
  { id: 8,  title: "08. Day 01 — W3C WebDriver Protocol & Communication" },
  { id: 9,  title: "09. Day 01 — Advantages, Limitations & Possibilities" },
  { id: 10, title: "10. Day 01 — Selenium vs Playwright vs Cypress" },
  { id: 11, title: "11. Day 01 — Client-Server → Selenium Architecture" },
  { id: 12, title: "12. Day 01 — Selenium 4 Architecture Diagram (Interactive)" },
  { id: 13, title: "13. Day 01 — Request Flow: How Selenium Handles Commands" },
  { id: 14, title: "14. Day 02 — Intro (Placeholder)" },
  { id: 15, title: "15. Day 02 — Content (Placeholder)" },
  { id: 16, title: "16. Day 03 — Intro (Placeholder)" },
  { id: 17, title: "17. Day 03 — Content (Placeholder)" },
  { id: 18, title: "18. Day 04 — Intro (Placeholder)" },
  { id: 19, title: "19. Day 04 — Content (Placeholder)" },
  { id: 20, title: "20. Day 05 — Intro (Placeholder)" },
  { id: 21, title: "21. Day 05 — Content (Placeholder)" },
  { id: 22, title: "22. Day 06 — Intro (Placeholder)" },
  { id: 23, title: "23. Day 06 — Content (Placeholder)" },
  { id: 24, title: "24. Day 07 — Intro (Placeholder)" },
  { id: 25, title: "25. Day 07 — Content (Placeholder)" },
  { id: 26, title: "26. Key Takeaways & Summary" },
  { id: 27, title: "27. End: Questions & Thank You" }
];

// ==========================================================================
// DAY 01 — SELENIUM 4 ARCHITECTURE LAYER DATA (Slide 12 Interactive)
// ==========================================================================
const archLayerData = {
  test: {
    title: "Your Test Code",
    phase: "Layer 1 — Application Layer",
    color: "#065A82",
    desc: "This is YOUR code — the automation script you write in your chosen language. Selenium provides <strong>language bindings</strong> (libraries) for Java, Python, C#, JavaScript, Ruby, and Kotlin. Your script calls WebDriver API methods like <code>driver.findElement()</code>, <code>element.click()</code>, <code>driver.get(url)</code>. These are just normal method calls — Selenium internally translates them into HTTP requests behind the scenes. At this stage nothing has been sent to the browser yet.",
    analogy: "🧑‍💻 Think of this as a customer placing an order at a restaurant. You say \"I want the login button clicked\" — you don't need to know anything about how the kitchen (browser) actually does it.",
    code: `// Java\nWebDriver driver = new ChromeDriver();\ndriver.get("https://example.com/login");\nWebElement btn = driver.findElement(By.id("login-btn"));\nbtn.click();\n\n// Python\ndriver = webdriver.Chrome()\ndriver.get("https://example.com/login")\nbtn = driver.find_element(By.ID, "login-btn")\nbtn.click()`
  },
  binding: {
    title: "Selenium Language Bindings",
    phase: "Layer 2 — Translation Layer",
    color: "#1C7293",
    desc: "The Selenium library installed in your project (e.g. <code>selenium-java.jar</code>, <code>selenium</code> pip package) acts as a <strong>translator</strong>. It takes your method calls and converts them into standardised HTTP/REST requests following the W3C WebDriver format. It attaches the session ID to the URL, sets the HTTP method (POST/GET/DELETE), and serialises your command parameters into a JSON body ready to send to the driver.",
    analogy: "🗣️ Think of this as a bilingual translator. You speak Java/Python, but the browser driver only speaks W3C HTTP protocol. The binding translates your high-level method call into the exact HTTP request format the driver understands.",
    code: `// What the binding builds internally:\nPOST http://localhost:9515/session/{id}/element\nContent-Type: application/json\n\n{\n  "using": "id",\n  "value": "login-btn"\n}\n\n// For a click after finding the element:\nPOST /session/{id}/element/{elemId}/click\n{}`
  },
  protocol: {
    title: "W3C WebDriver Protocol",
    phase: "Layer 3 — Communication Standard",
    color: "#9B59B6",
    desc: "The <strong>W3C WebDriver Protocol</strong> is the official web standard (published as a W3C Recommendation in 2018) that defines exactly how browser automation works. It specifies all HTTP endpoints, JSON request/response formats, and error codes. It replaced the old, non-standard \"JSON Wire Protocol\" from Selenium 3. Because it's a universal standard, <strong>any W3C-compliant language binding works with any W3C-compliant browser driver</strong> — mix and match freely!",
    analogy: "📋 Think of it as a standardised menu at a franchise restaurant. Every location (browser driver) must offer the same dishes (endpoints) in the same format — so any waiter (language binding) can work at any location worldwide.",
    code: `// W3C WebDriver standard endpoints:\nPOST /session                     → Create browser session\nDELETE /session/{id}              → Quit / close session\nPOST /session/{id}/url            → Navigate to URL\nPOST /session/{id}/element        → Find element\nPOST /session/{id}/elements       → Find multiple elements\nPOST /session/{id}/element/{id}/click  → Click element\nGET  /session/{id}/title          → Get page title\nGET  /session/{id}/url            → Get current URL`
  },
  driver: {
    title: "Browser Driver Process",
    phase: "Layer 4 — Bridge Layer",
    color: "#D95D39",
    desc: "The browser driver is a <strong>standalone executable</strong> that runs as an HTTP server on your machine (typically <code>localhost:9515</code> for ChromeDriver). It listens for W3C WebDriver HTTP requests from your test script, translates them into the browser's own internal protocol — CDP for Chrome/Edge, Marionette for Firefox, WebKit Remote Debug for Safari — and forwards commands to the actual browser process. Each browser vendor maintains their own driver.",
    analogy: "🧑‍🍳 Think of the driver as the head chef. It receives your standardised order (HTTP request), and translates it into specific kitchen instructions (CDP/Marionette) that the kitchen (browser) understands — handling all the internal complexity so you don't have to.",
    code: `// ChromeDriver listens at:\nhttp://localhost:9515\n\n// And translates to Chrome DevTools Protocol (CDP):\n{\n  "method": "Runtime.evaluate",\n  "params": {\n    "expression": "document.querySelector('#login-btn')"\n  }\n}\n// Then for click:\n{\n  "method": "Input.dispatchMouseEvent",\n  "params": { "type":"mousePressed", "button":"left" }\n}`
  },
  browser: {
    title: "Browser",
    phase: "Layer 5 — Execution Layer",
    color: "#0F6E56",
    desc: "The real browser (Chrome, Firefox, Edge, Safari) is the final layer where automation <strong>actually happens</strong>. The browser driver communicates with it through an internal debugging protocol. Chrome and Edge use the <strong>Chrome DevTools Protocol (CDP)</strong>. Firefox uses <strong>Marionette</strong>. Safari uses the <strong>WebKit Remote Debug protocol</strong>. The browser performs the actual action on the real web page (clicking, typing, navigating) and returns the result back up the entire chain to your test script.",
    analogy: "🍳 The browser is the kitchen. It receives internal cooking instructions (CDP/Marionette), actually prepares the dish (clicks the button on the real page), and reports back to the chef (driver) when done. The response then travels all the way back to you.",
    code: `// Browser (Chrome) processes via CDP:\n→ Receives: Runtime.evaluate → finds element\n→ Receives: Input.dispatchMouseEvent → click\n\n// Response travels back through all layers:\nBrowser → ChromeDriver (CDP response)\n  → Language Binding (HTTP 200 OK + JSON)\n    → Your Test Code (method returns)\n\n// Total round-trip: typically 20–100ms locally`
  },
  manager: {
    title: "Selenium Manager",
    phase: "Add-on — Zero-Config Driver Management (Selenium 4.6+)",
    color: "#BA7517",
    desc: "Selenium Manager is a <strong>command-line utility bundled directly inside the Selenium library</strong> (since version 4.6). When your test starts, if no driver is configured, Selenium Manager automatically detects your installed browser version, downloads the exact matching driver binary from official sources, caches it locally, and wires it up — <strong>all without a single line of configuration code</strong>. It eliminates the #1 beginner pain point: \"I installed Selenium but ChromeDriver version mismatch error!\"",
    analogy: "🤖 Think of Selenium Manager as a smart personal assistant. Before you even ask, it checks what car you have (Chrome version), finds the right key (driver binary), and has it ready for you — you just turn it on and go.",
    code: `// Before Selenium Manager (Selenium 3 era):\nSystem.setProperty("webdriver.chrome.driver",\n  "C:/drivers/chromedriver.exe"); // manual!\n\n// With Selenium Manager (Selenium 4.6+):\nWebDriver driver = new ChromeDriver();\n// That's it! Manager handles everything:\n// → Detects Chrome 124 installed\n// → Downloads ChromeDriver 124.x\n// → Caches to ~/.cache/selenium/\n// → Configures path automatically`
  },
  grid: {
    title: "Selenium Grid 4",
    phase: "Optional — Distributed Parallel Execution",
    color: "#1C7293",
    desc: "Selenium Grid is an optional infrastructure layer that lets you run your tests <strong>in parallel across multiple machines and browsers simultaneously</strong>. Your test script sends WebDriver HTTP requests to the Grid Router (instead of directly to a local driver). The Router distributes sessions to registered Nodes — each Node hosts a driver and browser. Grid 4 supports Standalone, Hub-Node, and Fully Distributed modes. It's <strong>Docker and Kubernetes-native</strong> for cloud-scale testing.",
    analogy: "🏭 Think of Grid as a multi-kitchen restaurant chain. Instead of one chef (driver) in one kitchen (machine), you have dozens of kitchens processing orders simultaneously — the same order format (W3C protocol), just massively parallel!",
    code: `// Test script targets Grid URL instead of localhost:\nRemoteWebDriver driver = new RemoteWebDriver(\n  new URL("http://grid-hub:4444"),\n  new ChromeOptions()\n);\n\n// Grid handles routing:\n→ Router receives session request\n→ Distributor assigns to free Node\n→ Node creates ChromeDriver + Chrome\n→ Commands flow through Grid → Node → Driver → Browser\n→ Run 50+ parallel sessions simultaneously`
  }
};

// ==========================================================================
// DAY 01 — REQUEST FLOW STEP DATA (Slide 13 Interactive)
// ==========================================================================
const rflowStepsData = [
  {
    step: 1,
    title: "Write the Test Command",
    phase: "Your Test Script — Application Layer",
    activeActors: [0],
    returnActors: [],
    activeArrows: [],
    explain: "You write a single line of code: <code>driver.findElement(By.id(\"login\")).click()</code>. This calls a method on the <code>driver</code> object provided by the Selenium library. It looks just like any other method call in your language. <strong>At this point, nothing has been sent anywhere yet</strong> — the Selenium library received your instruction and is now preparing to send it as an HTTP request to the browser driver.",
    wire: `// Java:\nWebElement btn =\n  driver.findElement(By.id("login"));\nbtn.click();\n\n// Python:\nbtn = driver.find_element(By.ID, "login")\nbtn.click()\n\n// The driver object is your\n// entry point into Selenium.`
  },
  {
    step: 2,
    title: "Language Binding Builds HTTP Request",
    phase: "Selenium Library — Serialises to W3C Format",
    activeActors: [0, 1],
    returnActors: [],
    activeArrows: [0],
    explain: "The Selenium language binding (the library in your project) receives your method call and <strong>converts it into an HTTP/REST request</strong> following the W3C WebDriver standard. It builds the URL with the session ID, sets the HTTP method (POST), and serialises the locator strategy and value as a JSON body. This is the command that will be physically sent over the network to ChromeDriver.",
    wire: `// Binding constructs this HTTP request:\nPOST http://localhost:9515/\n  session/abc123xyz/element\nContent-Type: application/json\n\n{\n  "using": "id",\n  "value": "login"\n}\n\n// Session ID is created when\n// you call new ChromeDriver().`
  },
  {
    step: 3,
    title: "HTTP Request Sent to ChromeDriver",
    phase: "W3C WebDriver Protocol — HTTP/REST over localhost",
    activeActors: [1, 2],
    returnActors: [],
    activeArrows: [1],
    explain: "The HTTP POST request travels over the <strong>localhost loopback network</strong> (no internet needed!) to ChromeDriver's HTTP server running on port 9515. ChromeDriver is a standalone executable started automatically by Selenium Manager (Selenium 4.6+) when you create a <code>new ChromeDriver()</code> instance. It acts as a server — always listening for incoming W3C WebDriver commands.",
    wire: `// HTTP over localhost loopback:\nPOST http://127.0.0.1:9515/\n  session/abc123xyz/element\n\n// ChromeDriver receives and parses:\n→ Strategy: "id"\n→ Value:    "login"\n→ Session:  "abc123xyz"\n\n// Port 9515: ChromeDriver default\n// Port 4444: Selenium Grid default\n// Port 7055: GeckoDriver default`
  },
  {
    step: 4,
    title: "ChromeDriver Translates to CDP",
    phase: "Browser Driver → Chrome DevTools Protocol (Internal)",
    activeActors: [2, 3],
    returnActors: [],
    activeArrows: [2],
    explain: "ChromeDriver translates the W3C WebDriver \"find element\" command into a <strong>Chrome DevTools Protocol (CDP)</strong> command. CDP is Chrome's own internal debugging protocol — a WebSocket-based API giving deep access to the browser's internals. ChromeDriver sends a <code>Runtime.evaluate</code> or <code>DOM.querySelector</code> CDP call to the Chrome browser process over an already-open WebSocket connection. This is completely invisible to your test code!",
    wire: `// CDP command sent to Chrome\n// over WebSocket:\n{\n  "id": 42,\n  "method": "Runtime.evaluate",\n  "params": {\n    "expression":\n      "document.querySelector('#login')"\n  }\n}\n\n// WebSocket stays open for the\n// entire test session duration.`
  },
  {
    step: 5,
    title: "Browser Finds the Element",
    phase: "Chrome Browser — Executes DOM Query on Real Page",
    activeActors: [3],
    returnActors: [],
    activeArrows: [],
    explain: "The Chrome browser executes the DOM query on the currently loaded web page. It searches the page's <strong>Document Object Model (DOM)</strong> for the element with <code>id=\"login\"</code>. Chrome returns an internal object reference (node handle / object ID) back to ChromeDriver via CDP. The element is now identified and ready for the click action. If the element doesn't exist, Chrome returns null and you get a <code>NoSuchElementException</code>.",
    wire: `// Chrome returns CDP response:\n{\n  "id": 42,\n  "result": {\n    "result": {\n      "type": "node",\n      "objectId": "23:1:1",\n      "description": "button#login"\n    }\n  }\n}\n\n// objectId is Chrome's internal\n// handle to the DOM element.`
  },
  {
    step: 6,
    title: "Click Command Sent to Browser",
    phase: "ChromeDriver Dispatches Mouse Click via CDP",
    activeActors: [2, 3],
    returnActors: [],
    activeArrows: [2],
    explain: "ChromeDriver now sends the <strong>click action</strong> to Chrome using CDP's <code>Input.dispatchMouseEvent</code>. It calculates the center coordinates of the element (from the element's bounding box), then dispatches a mousedown event followed by a mouseup event — <strong>simulating a real physical mouse click</strong>. This triggers all native browser click handling: event listeners, form submissions, link navigations — exactly as if a real user clicked.",
    wire: `// CDP dispatches the click:\n{\n  "method": "Input.dispatchMouseEvent",\n  "params": {\n    "type": "mousePressed",\n    "button": "left",\n    "x": 152,\n    "y": 304,\n    "clickCount": 1,\n    "modifiers": 0\n  }\n}\n// Followed by mouseReleased event\n// to complete the click cycle.`
  },
  {
    step: 7,
    title: "Response Returns to Test Script",
    phase: "Browser → Driver → Binding → Your Code (Full Round-Trip)",
    activeActors: [0, 1, 2, 3],
    returnActors: [0, 1, 2, 3],
    activeArrows: [0, 1, 2],
    explain: "The browser confirms the click was performed. The <strong>success response travels back through every layer</strong>: Chrome confirms the action → ChromeDriver receives the CDP success → ChromeDriver sends <code>HTTP 200 OK</code> with <code>{\"value\": null}</code> back to the language binding → the binding's <code>click()</code> method returns normally → your test script continues to the next line. The full round-trip completes in <strong>20–100ms</strong> for local automation!",
    wire: `// ChromeDriver HTTP response:\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "value": null\n}\n\n// null value = void return\n// (click has no return value)\n\n// Your test script resumes:\nassertEquals("Dashboard",\n  driver.getTitle()); // next step!`
  }
];

// ==========================================================================
// DAY 01 — SELENIUM COMPONENTS DATA (Slide 6 Interactive Dashboard)
// ==========================================================================
const seleniumComponentsData = {
  webdriver: {
    name: "WebDriver",
    icon: "terminal",
    tagline: "Core Browser Automation API",
    description: "The heart of the Selenium suite. WebDriver provides a language-level API for creating and running browser automation scripts. It controls browsers natively through vendor-supplied browser drivers using the W3C WebDriver Protocol over HTTP/REST. Unlike old Selenium RC, WebDriver does not inject JavaScript into the page — it communicates with the browser at the OS level.",
    features: [
      "Supports Java, Python, C#, JavaScript (Node.js), Ruby, Kotlin",
      "Controls Chrome, Firefox, Edge, and Safari natively",
      "Full W3C WebDriver Protocol compliance (Selenium 4+)",
      "Supports headless browser mode for CI/CD pipelines",
      "Element interaction: click, type, drag, scroll, hover",
      "Window, tab, frame and alert handling APIs",
      "JavaScript execution via JavascriptExecutor interface",
      "Relative locators: above(), below(), near(), toLeftOf(), toRightOf()",
      "Screenshot capture at window, viewport, and element levels",
      "Chrome DevTools Protocol (CDP) integration for network/console access"
    ],
    drivers: "ChromeDriver · GeckoDriver (Firefox) · EdgeDriver · SafariDriver",
    useCase: "Primary tool for writing automated functional, regression, and system tests for web applications."
  },
  grid: {
    name: "Selenium Grid",
    icon: "network",
    tagline: "Distributed & Parallel Test Execution",
    description: "Selenium Grid allows test suites to be distributed and executed in parallel across multiple machines, operating systems, and browser combinations simultaneously. Selenium Grid 4 (released with Selenium 4 in 2021) is a complete architectural rewrite — departing from the old single Hub model and introducing flexible deployment modes including Standalone, Hub-Node, and Fully Distributed.",
    features: [
      "Parallel execution across multiple nodes — dramatically reduces test runtime",
      "Three deployment modes: Standalone, Hub-Node, Fully Distributed",
      "Docker and Kubernetes-native support for cloud-scale deployment",
      "Dynamic node auto-registration and heartbeat-based health checks",
      "Built-in session queue with configurable timeout and concurrency limits",
      "Built-in observability: OpenTelemetry tracing, Prometheus metrics endpoints",
      "Live Grid UI dashboard at http://localhost:4444/ui for real-time monitoring",
      "Support for any WebDriver-compatible browser on registered nodes",
      "Relay Node support for routing mobile test sessions via Appium"
    ],
    drivers: "Any WebDriver-compatible browser on registered Grid nodes (ChromeDriver, GeckoDriver, EdgeDriver, etc.)",
    useCase: "Reduces overall test suite execution time from hours to minutes by running tests in parallel across multiple browser/OS combinations."
  },
  ide: {
    name: "Selenium IDE",
    icon: "mouse-pointer-2",
    tagline: "Record-and-Playback Browser Extension",
    description: "A browser extension available for Chrome and Firefox that provides a visual record-and-playback interface for creating automated tests without writing code. It captures browser interactions, generates test scripts, and can export those scripts in multiple programming languages. Ideal for rapid test prototyping, quick demonstrations, and onboarding non-programmers to browser automation concepts.",
    features: [
      "Available as Chrome and Firefox browser extension (no install beyond the browser)",
      "Point-and-click record-and-playback interface",
      "Export scripts to Java (JUnit/TestNG), Python, C#, JavaScript, Ruby, and more",
      "Supports control flow: if/else conditionals, while loops, forEach iterations",
      "SIDE Runner — a CLI tool to run .side project files in CI pipelines",
      "Test suites for grouping and organising multiple test cases",
      "Variables, parameters, and dynamic data support",
      "Screenshot capture on failure for debugging",
      "Backup/restore test projects as portable .side JSON files"
    ],
    drivers: "No external driver required — runs inside the browser extension directly",
    useCase: "Rapid test prototyping, demo preparation, exploratory test capture, and onboarding non-technical stakeholders to automation concepts."
  },
  manager: {
    name: "Selenium Manager",
    icon: "package-2",
    tagline: "Zero-Config Driver Management",
    description: "Introduced in Selenium 4.6 (released late 2022), Selenium Manager is a command-line utility bundled directly with the Selenium client libraries. It automatically detects the installed browser version on the test machine, downloads the matching driver binary from official sources, caches it locally, and configures the driver path — all transparently without any code changes. This eliminates the single biggest friction point that plagued all Selenium projects.",
    features: [
      "Auto-detects installed browser version (Chrome, Firefox, Edge)",
      "Downloads the exact matching driver binary automatically",
      "Caches downloaded drivers in a local cache directory for reuse",
      "Bundled with Selenium 4.6+ — no additional installation or configuration",
      "Supports ChromeDriver, GeckoDriver, and EdgeDriver out of the box",
      "Resolves the historical #1 beginner problem: manual driver version mismatch",
      "Automatically handles PATH environment variable setup for drivers",
      "Cross-platform: Windows, macOS, and Linux",
      "Works transparently — existing test code requires zero changes"
    ],
    drivers: "Auto-manages ChromeDriver, GeckoDriver (Firefox), and EdgeDriver",
    useCase: "Zero-config setup for new Selenium projects — install Selenium, open your IDE, and start writing tests. No manual driver downloads ever again."
  }
};

// ==========================================================================
// INITIALIZATION & DOM SETUP
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Populate Slide Selector Dropdown
  const slideSelect = document.getElementById("slide-select");
  slidesMetadata.forEach(slide => {
    const option = document.createElement("option");
    option.value = slide.id;
    option.textContent = slide.title;
    slideSelect.appendChild(option);
  });

  // Attach Navigation Event Listeners
  document.getElementById("prev-btn").addEventListener("click", showPrevSlide);
  document.getElementById("next-btn").addEventListener("click", showNextSlide);

  // Attach Utility Event Listeners
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  document.getElementById("fullscreen-toggle").addEventListener("click", toggleFullscreen);
  document.getElementById("play-btn").addEventListener("click", togglePlay);
  document.getElementById("help-btn").addEventListener("click", openHelpModal);
  document.getElementById("close-modal-btn").addEventListener("click", closeHelpModal);

  // Close modal on backdrop click
  document.getElementById("help-modal").addEventListener("click", (e) => {
    if (e.target.id === "help-modal") closeHelpModal();
  });

  // Dropdown slide selector
  slideSelect.addEventListener("change", (e) => {
    goToSlide(parseInt(e.target.value));
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeyDown);

  // Initialise Slide 6 Interactive Component Dashboard with WebDriver selected
  selectSeleniumComponent("webdriver");

  // Initialise Slide 12 Architecture Diagram with Test Code layer selected
  selectArchLayer("test");

  // Initialise Slide 13 Request Flow with Step 1
  rflowGoToStep(1);

  // Render the first slide
  updateSlidesUI();
});

// ==========================================================================
// NAVIGATION
// ==========================================================================
function updateSlidesUI() {
  // Hide all slides
  document.querySelectorAll(".slide").forEach(slide => slide.classList.remove("active"));

  // Show current slide
  const activeSlide = document.getElementById(`slide-${currentSlide}`);
  if (activeSlide) {
    activeSlide.classList.add("active");
    activeSlide.scrollTop = 0;
  }

  // Progress bar
  const pct = ((currentSlide - 1) / (totalSlides - 1)) * 100;
  document.getElementById("progress-bar").style.width = `${pct}%`;

  // Counter label
  document.getElementById("slide-index").textContent = `Slide ${currentSlide} of ${totalSlides}`;

  // Sync dropdown
  document.getElementById("slide-select").value = currentSlide;
}

function goToSlide(num) {
  if (num >= 1 && num <= totalSlides) {
    currentSlide = num;
    updateSlidesUI();
  }
}

function showNextSlide() {
  if (currentSlide < totalSlides) {
    currentSlide++;
    updateSlidesUI();
  } else {
    if (isPlaying) togglePlay();
  }
}

function showPrevSlide() {
  if (currentSlide > 1) {
    currentSlide--;
    updateSlidesUI();
  }
}

// ==========================================================================
// AUTO-PLAY
// ==========================================================================
function togglePlay() {
  const playBtn  = document.getElementById("play-btn");
  const playIcon  = playBtn.querySelector(".icon-play");
  const pauseIcon = playBtn.querySelector(".icon-pause");

  if (isPlaying) {
    clearInterval(playInterval);
    playInterval = null;
    isPlaying = false;
    playIcon.style.display  = "block";
    pauseIcon.style.display = "none";
    playBtn.title = "Auto-Play Slideshow (P)";
  } else {
    isPlaying = true;
    playIcon.style.display  = "none";
    pauseIcon.style.display = "block";
    playBtn.title = "Pause Slideshow (P)";
    playInterval = setInterval(showNextSlide, playSpeed);
  }
}

// ==========================================================================
// SELENIUM 4 ARCHITECTURE INTERACTIVE DIAGRAM — SLIDE 12
// ==========================================================================
window.selectArchLayer = function (key) {
  const colorMap = {
    test: 'test', binding: 'binding', driver: 'driver', browser: 'browser', protocol: 'protocol'
  };

  // Remove active state from all layer cards
  document.querySelectorAll('.arch-layer-card').forEach(c => {
    c.classList.remove('active', 'arch-active-test', 'arch-active-binding',
      'arch-active-driver', 'arch-active-browser', 'arch-active-protocol');
  });
  // Remove active state from extra badges
  document.querySelectorAll('.arch-extra-badge').forEach(b => b.classList.remove('active'));

  // Apply active state
  const cardEl = document.getElementById(`arch-layer-${key}`);
  if (cardEl) {
    if (cardEl.classList.contains('arch-layer-card')) {
      cardEl.classList.add('active');
      if (colorMap[key]) cardEl.classList.add(`arch-active-${colorMap[key]}`);
    } else {
      cardEl.classList.add('active');
    }
  }

  const data = archLayerData[key];
  const detailBox = document.getElementById('arch-detail-box');
  if (!detailBox || !data) return;

  detailBox.innerHTML = `
    <div class="arch-detail-title">${data.title}</div>
    <div style="font-size:10px;color:${data.color};font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">${data.phase}</div>
    <div class="arch-detail-section">
      <div class="arch-detail-section-label">How it Works</div>
      <p>${data.desc}</p>
    </div>
    <div class="arch-detail-analogy-box">
      <span class="alabel">Real-World Analogy</span>
      ${data.analogy}
    </div>
    <div class="arch-detail-code">
      <span class="clabel">Code / Protocol Example</span>${data.code}</div>
  `;

  // Re-render Lucide icons in injected content if any
  if (window.lucide) lucide.createIcons({ attrs: {}, nameAttr: "data-lucide" });
};

// ==========================================================================
// REQUEST FLOW INTERACTIVE — SLIDE 13
// ==========================================================================
let currentRflowStep = 1;
const RFLOW_TOTAL = 7;

function rflowRender() {
  const step = rflowStepsData[currentRflowStep - 1];
  if (!step) return;

  // Update actor highlights
  [0, 1, 2, 3].forEach(idx => {
    const el = document.getElementById(`rflow-actor-${idx}`);
    if (!el) return;
    el.classList.remove('is-active', 'is-return');
    if (step.returnActors && step.returnActors.includes(idx)) el.classList.add('is-return');
    else if (step.activeActors.includes(idx)) el.classList.add('is-active');
  });

  // Update arrow highlights
  [0, 1, 2].forEach(idx => {
    const el = document.getElementById(`rflow-arrow-${idx}`);
    if (!el) return;
    el.classList.remove('arrow-fwd', 'arrow-ret');
    if (step.activeArrows.includes(idx)) {
      el.classList.add(step.returnActors && step.returnActors.length > 0 ? 'arrow-ret' : 'arrow-fwd');
    }
  });

  // Update step buttons
  document.querySelectorAll('.rflow-step-btn').forEach((btn, idx) => {
    btn.classList.remove('active', 'done');
    if (idx + 1 === currentRflowStep) btn.classList.add('active');
    else if (idx + 1 < currentRflowStep) btn.classList.add('done');
  });

  // Update progress label
  const prog = document.getElementById('rflow-progress');
  if (prog) prog.textContent = `Step ${currentRflowStep} of ${RFLOW_TOTAL}`;

  // Update prev/next buttons
  const prevBtn = document.getElementById('rflow-prev-btn');
  const nextBtn = document.getElementById('rflow-next-btn');
  if (prevBtn) prevBtn.disabled = (currentRflowStep === 1);
  if (nextBtn) nextBtn.disabled = (currentRflowStep === RFLOW_TOTAL);

  // Update detail card
  const detail = document.getElementById('rflow-detail');
  if (detail) {
    detail.innerHTML = `
      <div class="rflow-detail-header">
        <div class="rflow-step-circle">${step.step}</div>
        <div class="rflow-detail-title-col">
          <div class="rflow-detail-title">${step.title}</div>
          <div class="rflow-detail-phase">${step.phase}</div>
        </div>
      </div>
      <div class="rflow-detail-body">
        <div class="rflow-explain">${step.explain}</div>
        <div class="rflow-wire"><span class="wlabel">HTTP / Protocol Example</span>${step.wire}</div>
      </div>
    `;
  }
}

window.rflowGoToStep = function (n) {
  if (n >= 1 && n <= RFLOW_TOTAL) {
    currentRflowStep = n;
    rflowRender();
  }
};
window.rflowNext = function () { rflowGoToStep(currentRflowStep + 1); };
window.rflowPrev = function () { rflowGoToStep(currentRflowStep - 1); };

// ==========================================================================
// SELENIUM COMPONENTS INTERACTIVE DASHBOARD — SLIDE 6
// ==========================================================================
window.selectSeleniumComponent = function (key) {
  // Update active node highlight
  document.querySelectorAll(".sel-component-node").forEach(n => n.classList.remove("active"));
  const activeNode = document.getElementById(`comp-${key}`);
  if (activeNode) activeNode.classList.add("active");

  const data = seleniumComponentsData[key];
  const container = document.getElementById("sel-component-details-container");
  if (!container || !data) return;

  const featureItems = data.features.map(f => `<li>${f}</li>`).join("");

  container.innerHTML = `
    <div class="comp-details-layout">
      <div class="comp-details-left">
        <div class="comp-details-header">
          <i data-lucide="${data.icon}"></i>
          <div>
            <h3>${data.name}</h3>
            <div class="comp-tagline">${data.tagline}</div>
          </div>
        </div>
        <p class="comp-desc-text">${data.description}</p>
        <div class="comp-usecase-box">
          <strong>Primary Use Case:</strong> ${data.useCase}
        </div>
        <div class="comp-drivers-badge">Drivers: ${data.drivers}</div>
      </div>
      <div class="comp-details-right">
        <h4 style="font-family:var(--font-family-title);font-size:13px;font-weight:600;margin-bottom:10px;display:flex;align-items:center;gap:7px;">
          <i data-lucide="list-checks" style="width:15px;height:15px;color:var(--secondary);"></i>
          Key Features &amp; Capabilities
        </h4>
        <ul class="comp-features-list">${featureItems}</ul>
      </div>
    </div>
  `;

  // Re-render icons inside the injected HTML
  lucide.createIcons({ attrs: { class: "lucide-custom" }, nameAttr: "data-lucide" });
};

// ==========================================================================
// THEME TOGGLE
// ==========================================================================
function toggleTheme() {
  const html = document.documentElement;
  html.setAttribute("data-theme", html.getAttribute("data-theme") === "dark" ? "light" : "dark");
}

// ==========================================================================
// FULLSCREEN
// ==========================================================================
function toggleFullscreen() {
  const fullIcon = document.querySelector(".icon-max");
  const minIcon  = document.querySelector(".icon-min");

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
      .then(() => { fullIcon.style.display = "none"; minIcon.style.display = "block"; })
      .catch(err => console.error(`Fullscreen error: ${err.message}`));
  } else {
    document.exitFullscreen()
      .then(() => { fullIcon.style.display = "block"; minIcon.style.display = "none"; });
  }
}

document.addEventListener("fullscreenchange", () => {
  const fullIcon = document.querySelector(".icon-max");
  const minIcon  = document.querySelector(".icon-min");
  if (!document.fullscreenElement) {
    fullIcon.style.display = "block";
    minIcon.style.display  = "none";
  } else {
    fullIcon.style.display = "none";
    minIcon.style.display  = "block";
  }
});

// ==========================================================================
// HELP MODAL
// ==========================================================================
function openHelpModal()  { document.getElementById("help-modal").classList.add("active"); }
function closeHelpModal() { document.getElementById("help-modal").classList.remove("active"); }

// ==========================================================================
// KEYBOARD SHORTCUTS
// ==========================================================================
function handleKeyDown(e) {
  if (e.target.tagName === "SELECT" || e.target.tagName === "INPUT") return;

  switch (e.key) {
    case "ArrowRight":
    case " ":
    case "PageDown":
      e.preventDefault();
      showNextSlide();
      break;
    case "ArrowLeft":
    case "PageUp":
      e.preventDefault();
      showPrevSlide();
      break;
    case "Home":
      e.preventDefault();
      goToSlide(1);
      break;
    case "End":
      e.preventDefault();
      goToSlide(totalSlides);
      break;
    case "f":
    case "F":
      e.preventDefault();
      toggleFullscreen();
      break;
    case "l":
    case "L":
      e.preventDefault();
      toggleTheme();
      break;
    case "p":
    case "P":
      e.preventDefault();
      togglePlay();
      break;
    case "h":
    case "H":
      e.preventDefault();
      const modal = document.getElementById("help-modal");
      if (modal.classList.contains("active")) closeHelpModal(); else openHelpModal();
      break;
    case "Escape":
      closeHelpModal();
      break;
  }
}
