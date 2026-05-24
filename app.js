// ==========================================================================
// STATE MANAGEMENT & DATA
// ==========================================================================
let currentSlide = 1;
const totalSlides = 20;
let isPlaying = false;
let playInterval = null;
const playSpeed = 5000; // 5 seconds per slide

// Slides Metadata for dropdown selector
const slidesMetadata = [
  { id: 1, title: "01. Title: Software Testing Fundamentals" },
  { id: 2, title: "02. Session Overview (TOC)" },
  { id: 3, title: "03. What is Software Testing?" },
  { id: 4, title: "04. Testing Types (Micro to Macro)" },
  { id: 5, title: "05. 7 Principles of Testing (Part 1)" },
  { id: 6, title: "06. 7 Principles of Testing (Part 2)" },
  { id: 7, title: "07. Intro to STLC" },
  { id: 8, title: "08. STLC Flow - Interactive Dashboard" },
  { id: 9, title: "09. STLC Phase 1: Requirement Analysis" },
  { id: 10, title: "10. STLC Phase 2: Test Planning" },
  { id: 11, title: "11. STLC Phase 3: Test Case Design" },
  { id: 12, title: "12. STLC Phase 4: Test Env Setup" },
  { id: 13, title: "13. STLC Phase 5: Test Execution" },
  { id: 14, title: "14. STLC Phase 6: Test Closure" },
  { id: 15, title: "15. Intro to SDLC" },
  { id: 16, title: "16. SDLC Core Phases & QA Sync" },
  { id: 17, title: "17. Comparison: STLC vs SDLC" },
  { id: 18, title: "18. Enterprise Agile & AI Integrations" },
  { id: 19, title: "19. Key Takeaways Summary" },
  { id: 20, title: "20. End: Questions & Thank You" }
];

// Interactive STLC Phases Data for Slide 8 Dashboard
const stlcPhasesData = {
  1: {
    phase: "Phase 1",
    name: "Requirement Analysis",
    entry: "Finalized BRD, Functional Specifications (FRS), or approved agile User Stories.",
    exit: "Approved Requirement Traceability Matrix (RTM), mapped test scenarios, and stakeholder clarifications closed.",
    activities: [
      "Analyze requirements for testability, logic gaps, or ambiguities.",
      "Identify scope and types of testing required (Functional, API, Performance, Security).",
      "Collaborate with Product Owners and Business Analysts to resolve open gaps.",
      "Draft the initial version of the Requirement Traceability Matrix (RTM)."
    ],
    example: "<strong>Banking App Case (Temenos T24):</strong> In a cash transfer user story, QA queries: 'What is the system timeout limit for high-value transfers?' This gets specified in requirements before developers begin coding."
  },
  2: {
    phase: "Phase 2",
    name: "Test Planning",
    entry: "Signed-off Requirement Analysis documents, approved RTM, and allocated QA resources.",
    exit: "Reviewed & approved Test Strategy / Test Plan documents, tool choices locked, and budget signed-off.",
    activities: [
      "Define exact project test scope, boundaries, and exclusions.",
      "Perform test effort estimation using Work Breakdown Structures (WBS) or PERT.",
      "Select automation, performance, and defect management toolstacks.",
      "Draft testing schedules, environment pipelines, and release gates."
    ],
    example: "<strong>E-Commerce Scale (Flipkart):</strong> QA drafts a performance test plan defining load injections to replicate 10,000 requests/sec with p99 latency target < 500ms for Big Billion Days sales."
  },
  3: {
    phase: "Phase 3",
    name: "Test Case Design",
    entry: "Approved Test Plan, stable product architectural designs, and finalized RTM.",
    exit: "Reviewed & approved test cases, functional automation scripts in git repository, and sanitized test data datasets.",
    activities: [
      "Write detailed manual test cases specifying prerequisites, inputs, steps, and expected outputs.",
      "Prepare and store test datasets (clean sandbox users, mock bank profiles, API responses).",
      "Author automated scripting codebases in parallel sprints.",
      "Conduct peer reviews of test scenarios to guarantee maximum test coverage."
    ],
    example: "<strong>DocuSign AI Extraction:</strong> QA designs functional test cases including positive (clean PDF documents), negative (password-protected PDFs), and edge scenarios (extremely large files, skewed mobile photos)."
  },
  4: {
    phase: "Phase 4",
    name: "Test Environment Setup",
    entry: "Stable Test Cases, defined environmental architecture, and approved deployment processes.",
    exit: "Stable and fully deployed QA sandbox, static test data injected, and passed Smoke Test verification.",
    activities: [
      "Provision QA cloud hardware and environmental dependencies.",
      "Deploy code builds using Docker, Kubernetes, or automated pipelines.",
      "Sanitize and load test data into test databases.",
      "Run initial **Smoke Tests** to confirm database connectivity, APIs, and overall environment sanity."
    ],
    example: "<strong>Healthcare Epic FHIR Engine:</strong> QA spins up an ephemeral QA sandbox using Terraform, loaded with synthesized HIPAA-compliant patient mock histories, integrated with simulated hospital endpoints."
  },
  5: {
    phase: "Phase 5",
    name: "Test Execution & Bug Tracking",
    entry: "Passed Smoke Tests, approved test cases, deployed build, and loaded test data.",
    exit: "95%+ of tests executed, all blocker/critical bugs resolved and verified, and regression suite passed.",
    activities: [
      "Execute manual and automated test suites across specified configurations.",
      "Log detailed defects in JIRA / Azure DevOps with replica steps, logs, and screenshots.",
      "Lead triage discussions to assign appropriate severity and priority.",
      "Re-test fixes and execute extensive regression packages to prevent side-effects."
    ],
    example: "<strong>AI Chatbot Prompt testing:</strong> QA runs automated checks to evaluate hallucination rates, safety blockades, prompt injection vulnerabilities, and response latencies using Promptfoo/Ragas."
  },
  6: {
    phase: "Phase 6",
    name: "Test Closure & Reporting",
    entry: "Execution complete, exit criteria metrics met, and blocker defects formally closed or deferred.",
    exit: "Signed-off Test Closure Report, archived environments, and retrospective meeting concluded.",
    activities: [
      "Build live test metrics dashboards (Grafana, Jira release hub).",
      "Author and publish the **Test Closure Report** summarizing execution results.",
      "Conduct sprint retrospectives to analyze defects, leaks, and process improvements.",
      "De-provision temporary environments and archive test codebases."
    ],
    example: "<strong>Enterprise ERP Upgrade:</strong> Closure report details 1,240 cases run, 97.2% pass rate, 43 total bugs logged, 40 closed, 3 deferred. Metrics are sent to the Release Gating Committee for production deployment clearance."
  }
};

// ==========================================================================
// INITIALIZATION & DOM SELECTIONS
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

  // Attach Event Listeners
  document.getElementById("prev-btn").addEventListener("click", showPrevSlide);
  document.getElementById("next-btn").addEventListener("click", showNextSlide);
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  document.getElementById("fullscreen-toggle").addEventListener("click", toggleFullscreen);
  document.getElementById("play-btn").addEventListener("click", togglePlay);
  document.getElementById("help-btn").addEventListener("click", openHelpModal);
  document.getElementById("close-modal-btn").addEventListener("click", closeHelpModal);
  document.getElementById("help-modal").addEventListener("click", (e) => {
    if (e.target.id === "help-modal") closeHelpModal();
  });
  
  slideSelect.addEventListener("change", (e) => {
    goToSlide(parseInt(e.target.value));
  });

  // Keyboard Event Listener
  document.addEventListener("keydown", handleKeyDown);

  // Initialize Slide 8 STLC Interactive Dashboard
  selectStlcPhase(1);

  // Render Current Slide
  updateSlidesUI();
});

// ==========================================================================
// NAVIGATION LOGIC
// ==========================================================================
function updateSlidesUI() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach(slide => slide.classList.remove("active"));
  
  const currentActiveSlide = document.getElementById(`slide-${currentSlide}`);
  if (currentActiveSlide) {
    currentActiveSlide.classList.add("active");
  }

  // Update Progress Bar
  const progressBar = document.getElementById("progress-bar");
  const progressPercent = ((currentSlide - 1) / (totalSlides - 1)) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Update Bottom Slide Index text
  document.getElementById("slide-index").textContent = `Slide ${currentSlide} of ${totalSlides}`;

  // Update Slide Selector
  document.getElementById("slide-select").value = currentSlide;

  // Header/Footer active states
  if (currentSlide === 1 || currentSlide === totalSlides || currentSlide === 7 || currentSlide === 15) {
    // Splash/Title slides could have special classes if needed
  }
}

function goToSlide(slideNum) {
  if (slideNum >= 1 && slideNum <= totalSlides) {
    currentSlide = slideNum;
    updateSlidesUI();
  }
}

function showNextSlide() {
  if (currentSlide < totalSlides) {
    currentSlide++;
    updateSlidesUI();
  } else {
    // If auto-playing and reached the end, stop
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
// AUTOPLAY LOGIC
// ==========================================================================
function togglePlay() {
  const playBtn = document.getElementById("play-btn");
  const playIcon = playBtn.querySelector(".icon-play");
  const pauseIcon = playBtn.querySelector(".icon-pause");

  if (isPlaying) {
    clearInterval(playInterval);
    playInterval = null;
    isPlaying = false;
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
    playBtn.title = "Auto-Play Slideshow (P)";
  } else {
    isPlaying = true;
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
    playBtn.title = "Pause Slideshow (P)";
    playInterval = setInterval(() => {
      showNextSlide();
    }, playSpeed);
  }
}

// ==========================================================================
// INTERACTIVE STLC FLOW LOGIC (SLIDE 8)
// ==========================================================================
window.selectStlcPhase = function(phaseNum) {
  // Highlight active node
  const nodes = document.querySelectorAll(".stlc-node");
  nodes.forEach(node => node.classList.remove("active"));
  
  const activeNode = document.getElementById(`node-${phaseNum}`);
  if (activeNode) {
    activeNode.classList.add("active");
  }

  // Populate Details panel
  const data = stlcPhasesData[phaseNum];
  const container = document.getElementById("stlc-details-container");
  if (!container || !data) return;

  // Build bullet points
  const bulletItems = data.activities.map(act => `<li>${act}</li>`).join("");

  container.innerHTML = `
    <div class="stlc-details-layout">
      <div class="stlc-details-left">
        <div class="details-title-row">
          <div>
            <span class="details-phase-badge">${data.phase}</span>
            <h3>${data.name}</h3>
          </div>
        </div>
        <div class="details-criteria entry">
          <h4><i data-lucide="log-in"></i> Entry Criteria</h4>
          <p>${data.entry}</p>
        </div>
        <div class="details-criteria exit">
          <h4><i data-lucide="log-out"></i> Exit Criteria</h4>
          <p>${data.exit}</p>
        </div>
      </div>
      <div class="stlc-details-right">
        <div class="glass-card dark-card height-full" style="padding: 15px 20px; border-radius: 12px;">
          <h4 style="font-family: var(--font-family-title); font-size: 15px; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="activity" style="width: 16px; height: 16px; color: var(--secondary);"></i>
            Core QA Activities
          </h4>
          <ul class="details-activities-list">
            ${bulletItems}
          </ul>
        </div>
        <div class="details-example">
          ${data.example}
        </div>
      </div>
    </div>
  `;

  // Re-run lucide icons rendering inside container
  lucide.createIcons({
    attrs: {
      class: 'lucide-custom'
    },
    nameAttr: 'data-lucide'
  });
};

// ==========================================================================
// UTILITY FUNCTIONS (THEME, FULLSCREEN, HELP DIALOG)
// ==========================================================================
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", nextTheme);
}

function toggleFullscreen() {
  const fullIcon = document.querySelector(".icon-max");
  const minIcon = document.querySelector(".icon-min");

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      fullIcon.style.display = "none";
      minIcon.style.display = "block";
    }).catch(err => {
      console.error(`Error enabling fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen().then(() => {
      fullIcon.style.display = "block";
      minIcon.style.display = "none";
    });
  }
}

// Fullscreen state sync on escape key
document.addEventListener("fullscreenchange", () => {
  const fullIcon = document.querySelector(".icon-max");
  const minIcon = document.querySelector(".icon-min");
  if (!document.fullscreenElement) {
    fullIcon.style.display = "block";
    minIcon.style.display = "none";
  } else {
    fullIcon.style.display = "none";
    minIcon.style.display = "block";
  }
});

function openHelpModal() {
  document.getElementById("help-modal").classList.add("active");
}

function closeHelpModal() {
  document.getElementById("help-modal").classList.remove("active");
}

// Keyboard shortcuts mappings
function handleKeyDown(e) {
  // If user is inside a select box or inputs, ignore hotkeys
  if (e.target.tagName === "SELECT" || e.target.tagName === "INPUT") return;

  switch(e.key) {
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
      if (modal.classList.contains("active")) {
        closeHelpModal();
      } else {
        openHelpModal();
      }
      break;
    case "Escape":
      closeHelpModal();
      break;
  }
}
