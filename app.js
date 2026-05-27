// ==========================================================================
// STATE MANAGEMENT & DATA
// ==========================================================================
let currentSlide = 1;
const totalSlides = 36;
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
  { id: 18, title: "18. SDLC Models: Waterfall vs. Agile" },
  { id: 19, title: "19. The 12 Principles of Agile" },
  { id: 20, title: "20. Agile Frameworks & Scrum Deep Dive" },
  { id: 21, title: "21. Where to Use Agile vs. Where NOT" },
  { id: 22, title: "22. Agile in Enterprise: Case Studies & Traps" },
  { id: 23, title: "23. The Testing Pyramid (Interactive)" },
  { id: 24, title: "24. Why the Pyramid Shape Matters" },
  { id: 25, title: "25. Pyramid Anti-Patterns & Heuristics" },
  { id: 26, title: "26. Enterprise Agile & AI Integrations" },
  { id: 27, title: "27. Key Takeaways Summary" },
  { id: 28, title: "28. End: Questions & Thank You" },
  { id: 29, title: "29. Jira: Module Introduction" },
  { id: 30, title: "30. What is Jira & Why Testers Use It" },
  { id: 31, title: "31. Jira User Ecosystem" },
  { id: 32, title: "32. Jira Pros, Cons & Limitations" },
  { id: 33, title: "33. Jira vs Azure DevOps (Feature Comparison)" },
  { id: 34, title: "34. Jira vs Azure DevOps (Decision Guide)" },
  { id: 35, title: "35. Jira Terminologies (Interactive)" },
  { id: 36, title: "36. Jira in Enterprise Testing Practice" }
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

  // Initialize Slide 20 Agile Frameworks Interactive Dashboard
  selectAgileFramework('scrum');

  // Initialize Slide 23 Pyramid Interactive Dashboard
  selectPyramidLevel('unit');

  // Initialize Slide 35 Jira Terminologies Interactive Dashboard
  selectJiraTerm('project');

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
    currentActiveSlide.scrollTop = 0;
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

// ==========================================================================
// AGILE FRAMEWORKS DATA & INTERACTIVE LOGIC (SLIDE 20)
// ==========================================================================
const agileFrameworksData = {
  scrum: {
    title: "Scrum",
    bestFor: "Most cross-functional software product development teams.",
    feature: "Highly structured time-boxed loops (Sprints) with defined sprint rituals and strict team roles.",
    roles: [
      "Product Owner (PO): Owns the 'What'—manages and prioritizes the Product Backlog.",
      "Scrum Master (SM): Owns the 'How'—removes team blockers, coaches Scrum, protects team focus.",
      "Development Team: Cross-functional creators who build the actual increments."
    ],
    artifacts: [
      "Product Backlog: The master list of all customer-facing features, epics, and requirements.",
      "Sprint Backlog: Selected set of user stories committed to the current sprint.",
      "Increment: A fully tested, usable, and potentially releasable piece of software at sprint end."
    ],
    ceremonies: [
      "Sprint Planning (Timebox: 2-4 hrs): Define Sprint Goal and select backlog items.",
      "Daily Stand-up (Timebox: 15 mins): Synchronize work, plan next 24 hrs, flag blockers.",
      "Sprint Review (Timebox: 1-2 hrs): Demo the working increment to business stakeholders.",
      "Sprint Retrospective (Timebox: 1-2 hrs): Inspect and adapt process for quality improvements."
    ],
    description: "Scrum is the most widely adopted Agile framework. It divides development cycles into sprints (typically 2 weeks long) and encourages self-organization and high-fidelity continuous feedback loops."
  },
  kanban: {
    title: "Kanban",
    bestFor: "Ops, support, system engineering, and continuous delivery teams.",
    feature: "Visual continuous workflow management using strict WIP (Work-In-Progress) limits without fixed-time sprints.",
    roles: [
      "No mandatory roles defined: Teams are collaborative and self-organize around the flow of cards.",
      "Optional roles: Service Delivery Manager (flow manager) and Service Request Manager."
    ],
    artifacts: [
      "Kanban Board: Physical or digital board showing stages (To Do, In Progress, Review, Done).",
      "WIP Limits: Explicit caps on maximum cards allowed in a single column to prevent bottlenecks."
    ],
    ceremonies: [
      "Daily Standup Meeting: Review the board flow from right to left (unblocking closest to Done).",
      "Queue Replenishment Meeting: Gather to pull and prioritize new requests from backlog.",
      "Service Delivery Review: Retrospective focus analyzing cycle time, throughput, and lead time."
    ],
    description: "Adapted from the Toyota Production System, Kanban focuses on visualizing work, limiting WIP to match capacity, and continuously optimizing flow to reduce lead time."
  },
  xp: {
    title: "Extreme Programming (XP)",
    bestFor: "Software engineering teams striving for technical excellence and code quality.",
    feature: "Aggressive, high-discipline software engineering practices focused on continuous quality.",
    roles: [
      "Customer: Represents business, writes user stories, and conducts acceptance testing.",
      "Tracker: Gathers team metrics, velocity, and measures development pace.",
      "Coach: Technical guide ensuring engineering standards and XP practices are maintained."
    ],
    artifacts: [
      "User Stories: Small customer requirements mapped to business values.",
      "Automated Tests: 100% automated regression coverage required before any code merge."
    ],
    ceremonies: [
      "Iteration Planning: Select user stories for the immediate 1-2 week development cycle.",
      "Daily Stand-up: Brief status sync among developers.",
      "Refactoring Sessions: Continuous improvement of internal code design without changing behavior."
    ],
    description: "XP introduced the software world to modern engineering staples including Test-Driven Development (TDD), Pair Programming, Continuous Integration (CI), and Simple Design."
  },
  lean: {
    title: "Lean Software Development",
    bestFor: "Teams aiming to optimize value stream delivery and eliminate process waste.",
    feature: "Focus on eliminating waste, amplifying learning, delivering fast, and building quality in.",
    roles: [
      "Champions: Executive promoters of Lean continuous improvement initiatives.",
      "Empowered Developers: Team members authorized to make local optimization decisions."
    ],
    artifacts: [
      "Value Stream Map: Visual schematic tracing requirements from business idea down to production deployment.",
      "Kanban Pull-Signal: Kanban cards prompting just-in-time development tasks."
    ],
    ceremonies: [
      "Kaizen Events: Continuous improvement workshops focusing on unblocking bottlenecks.",
      "Gemba Walks: Management observing operations directly at the active workstation."
    ],
    description: "Adapted from Toyota's manufacturing system, Lean emphasizes 7 principles: Eliminate waste, build quality in, create knowledge, defer commitment, deliver fast, respect people, and optimize the whole."
  },
  safe: {
    title: "SAFe (Scaled Agile Framework)",
    bestFor: "Extremely large enterprise organizations (500+ developers) with heavy governance.",
    feature: "A highly structured, hierarchical scaling framework linking strategy directly to sprint teams.",
    roles: [
      "Release Train Engineer (RTE): The chief Scrum Master coordinating multi-team release trains.",
      "Product Management: Coordinates product vision across multiple Product Backlogs.",
      "System Architect: Directs high-level technical strategy across all development trains."
    ],
    artifacts: [
      "Program Backlog: High-level epics and features spanning multiple sprint teams.",
      "Agile Release Train (ART): A virtual program structure coordinating 5-12 agile teams."
    ],
    ceremonies: [
      "PI Planning (Program Increment): A massive 2-day planning event aligning 100+ developers.",
      "Scrum of Scrums: Regular sync meetings for Scrum Masters to align and resolve cross-team dependencies.",
      "Inspect & Adapt: Program-level retrospective analyzing train delivery quality and flow."
    ],
    description: "SAFe is the most popular corporate scaling framework, blending Scrum, Kanban, Lean, and DevOps. However, it is criticized for heavy administrative overhead and rigid structures."
  },
  less: {
    title: "LeSS (Large-Scale Scrum)",
    bestFor: "Medium to large scale groups wanting Scrum's simplicity without corporate administrative bloat.",
    feature: "Applying regular multi-team Scrum directly using a single Product Backlog and Product Owner.",
    roles: [
      "Single Product Owner: One PO manages the master backlog across all LeSS teams.",
      "Scrum Masters: Multi-team facilitators supporting up to 3 teams simultaneously.",
      "Feature Teams: Cross-functional, self-organizing teams building independent customer features."
    ],
    artifacts: [
      "Single Product Backlog: One master queue of features, avoiding multi-backlog synchronization issues.",
      "Joint Increment: A single, fully integrated build containing contributions from all squads."
    ],
    ceremonies: [
      "Overall Sprint Planning: Representatives from all teams meet to partition backlog items.",
      "Product Backlog Refinement: Multi-team backlog reviews clarifying user stories jointly.",
      "Overall Retrospective: Joint meeting focusing on cross-team relationships and global processes."
    ],
    description: "LeSS operates on the principle of 'scaling Scrum by descaling the organization'. It removes unnecessary coordination layers, focusing on cross-functional product backlog team autonomy."
  },
  crystal: {
    title: "Crystal",
    bestFor: "Small to medium size teams wanting lightweight, custom-tailored agile processes.",
    feature: "Methodology family grouped by color (Clear, Yellow, Orange, Red) representing team size and project risk criticality.",
    roles: [
      "Sponsor: Executive supporter funding operations and signing off releases.",
      "Facilitator: Coach unblocking team communication.",
      "Coordinating Designer: Technical strategist managing product architecture."
    ],
    artifacts: [
      "Requirements Backlog: Prioritized feature list.",
      "Release Plan: Milestone-driven timeline tailored to safety and complexity requirements."
    ],
    ceremonies: [
      "Reflection Workshop: Bi-weekly retrospective focusing on tuning the custom team workflow.",
      "Delivery Iterations: Regular cycles to deliver validated software increments to users."
    ],
    description: "Developed by Alistair Cockburn, Crystal is highly lightweight and tailors process weight directly to team size (Crystal Clear for 1-6 people, Crystal Orange for 40+ people) and criticality."
  }
};

window.selectAgileFramework = function(framework) {
  // Highlight active button/pill in HTML
  const pills = document.querySelectorAll(".framework-pill");
  pills.forEach(pill => pill.classList.remove("active"));
  
  const activePill = document.getElementById(`framework-${framework}`);
  if (activePill) {
    activePill.classList.add("active");
  }

  // Populate Details Panel
  const data = agileFrameworksData[framework];
  const container = document.getElementById("framework-details-container");
  if (!container || !data) return;

  const roleItems = data.roles.map(role => `<li>${role}</li>`).join("");
  const artifactItems = data.artifacts.map(art => `<li>${art}</li>`).join("");
  const ceremonyItems = data.ceremonies.map(cer => `<li>${cer}</li>`).join("");

  container.innerHTML = `
    <div class="framework-details-header">
      <div class="details-title-row">
        <div>
          <h3>${data.title} Framework</h3>
        </div>
      </div>
    </div>
    
    <div class="framework-summary-box">
      <div class="f-summary-item">
        <span class="f-sum-label">Best For</span>
        <span class="f-sum-val">${data.bestFor}</span>
      </div>
      <div class="f-summary-item">
        <span class="f-sum-label">Core Feature</span>
        <span class="f-sum-val">${data.feature}</span>
      </div>
    </div>

    <p class="framework-description-paragraph">${data.description}</p>

    <div class="framework-content-split">
      <div class="framework-left-lists">
        <div class="f-details-box roles-box">
          <h4><i data-lucide="users"></i> Roles & Ownership</h4>
          <ul>${roleItems}</ul>
        </div>
        <div class="f-details-box artifacts-box">
          <h4><i data-lucide="package-open"></i> Core Artifacts</h4>
          <ul>${artifactItems}</ul>
        </div>
      </div>
      <div class="framework-right-ceremonies">
        <div class="f-details-box ceremonies-box">
          <h4><i data-lucide="calendar-days"></i> Key Ceremonies / Rituals</h4>
          <ul>${ceremonyItems}</ul>
        </div>
      </div>
    </div>
  `;

  // Re-run lucide icons rendering
  lucide.createIcons({
    attrs: {
      class: 'lucide-custom'
    },
    nameAttr: 'data-lucide'
  });
};

// ==========================================================================
// TESTING PYRAMID DATA & INTERACTIVE LOGIC (SLIDE 23)
// ==========================================================================
const pyramidData = {
  unit: {
    title: "Unit Testing (The Base)",
    quantity: "Should make up the vast majority of your tests (roughly 70-80% of the pyramid).",
    speed: "Extremely fast, usually executing in milliseconds.",
    cost: "Very cheap to write and maintain.",
    reliability: "Highly reliable; failures almost always indicate a real bug in the unit under test.",
    scope: "Very narrow. They test one thing at a time.",
    verify: [
      "Logic, algorithms, and data transformations.",
      "Edge cases, boundary inputs, and exception paths.",
      "Public contracts and behaviors of individual units in complete isolation."
    ],
    requirements: [
      "All external dependencies (databases, network APIs, file systems, clocks) must be mocked or stubbed.",
      "Tests must be deterministic—the same inputs must always produce the same outputs.",
      "Tests must be independent—execution order must not affect outcomes."
    ],
    example: "Testing a <code>calculateTax(amount, rate)</code> function to ensure it returns the correct tax value for normal inputs, zero, and extreme values, with external mock configurations."
  },
  integration: {
    title: "Integration Testing (The Middle)",
    quantity: "Fewer than unit tests (roughly 15-20% of the pyramid).",
    speed: "Moderate—slower than unit tests because they may involve real infrastructure.",
    cost: "More expensive to write and maintain due to setup complexity.",
    reliability: "Generally reliable, but failures can stem from configuration, network, or environment.",
    scope: "Medium. They cross module boundaries but usually stay within system boundaries.",
    verify: [
      "Database queries and transactions actually work with the real (or test-instance) database schema.",
      "API endpoints correctly serialize and deserialize requests and responses.",
      "Message queues and event buses process events properly.",
      "Service-to-service communication within the same application."
    ],
    requirements: [
      "Use real but lightweight infrastructure where possible (e.g., Testcontainers, in-memory databases).",
      "Avoid testing third-party services you don't control; mock or stub external APIs.",
      "Focus on the integration interface and data flow, not internal unit logic."
    ],
    example: "Testing a <code>UserRepository</code> class to ensure that calling <code>save(user)</code> persists the user record to a real PostgreSQL database and can be queried correctly."
  },
  e2e: {
    title: "End-to-End (E2E) / UI Testing (The Top)",
    quantity: "The fewest tests (roughly 5-10% of the pyramid).",
    speed: "Very slow, often taking seconds or minutes per test.",
    cost: "Expensive to write, run, and maintain; brittle and prone to UI changes.",
    reliability: "Lower reliability—failures may be caused by network latency, third-party downtime, or race conditions.",
    scope: "Very broad. They test the complete system as a black box.",
    verify: [
      "Critical user journeys (e.g., 'User signs up &rarr; Adds item to cart &rarr; Completes checkout').",
      "System-wide workflows that span multiple microservices.",
      "That the deployed application actually works in a production-like staging environment."
    ],
    requirements: [
      "Run against a fully deployed environment or a high-fidelity staging system.",
      "Minimize the number of E2E tests—only cover the most critical user paths.",
      "Implement robust waiting strategies instead of fixed sleeps to prevent flakiness.",
      "Isolate test data to prevent collisions between parallel test runs."
    ],
    example: "Using browser automation (Playwright/Cypress) to load the login page, fill user credentials, click submit, add an item to the shopping cart, enter billing details, and verify checkout success page."
  },
  contract: {
    title: "Contract Testing (Modern Variation)",
    quantity: "Sits between integration and E2E tests in microservice architectures.",
    speed: "Fast to moderate—does not require spinning up entire client-server pipelines.",
    cost: "Medium setup cost, low execution cost.",
    reliability: "Very high; focused specifically on message/schema integrity.",
    scope: "Medium-narrow. Focuses on the contract (request/response structure) between services.",
    verify: [
      "Verify that API providers and consumers agree on the exact request/response schema.",
      "Detect breaking interface changes before code is merged or deployed."
    ],
    requirements: [
      "Write consumer-driven contract definitions (e.g., using Pact).",
      "Validate API provider mocks against the generated contract in CI/CD pipeline."
    ],
    example: "Verifying that the Order Microservice API payload format matches exactly what the Billing Microservice expects, preventing breaking serialization changes."
  },
  component: {
    title: "Component / Service Testing (Modern Variation)",
    quantity: "Intermediate quantity, often replacing extensive integration testing.",
    speed: "Fast to moderate—runs in isolation with localized dependency containers.",
    cost: "Medium maintenance cost.",
    reliability: "High; isolated dependencies reduce external network flakiness.",
    scope: "Medium. Validates a single service or UI component in isolation.",
    verify: [
      "Verify a single service or microservice operates correctly with its internal dependencies.",
      "Validate visual components (React/Vue/Angular) render and handle state updates properly."
    ],
    requirements: [
      "All external boundary services are mocked.",
      "Internal database, cache, or message broker is spun up locally (e.g., Docker)."
    ],
    example: "Testing a React 'CheckoutForm' component in isolation by supplying mock state props and verifying payment submission handlers are triggered upon button click."
  },
  manual: {
    title: "Manual / Exploratory Testing (The Cloud)",
    quantity: "Conducted selectively; sits above the automated pyramid framework.",
    speed: "Very slow, limited by human physical testing speed.",
    cost: "High operational costs, but requires no initial automation codebase setup.",
    reliability: "Extremely high for usability and edge-case discovery; low for repetitive regression checks.",
    scope: "Broad and creative. Guided by experience and intuition.",
    verify: [
      "Human usability, overall user experience, visual layouts, and intuitive flows.",
      "Complex edge-cases that automated test suites cannot easily catch.",
      "Creative destructive testing ('What happens if I perform unpredicted, rapid actions?')."
    ],
    requirements: [
      "Real human QA testers or business stakeholders.",
      "Exploratory charters and scenarios instead of rigid step-by-step scripts."
    ],
    example: "A QA professional manually testing a new dynamic drag-and-drop kanban board feature on mobile devices to evaluate touch sensitivity, layout responsiveness, and ease of use."
  }
};

window.selectPyramidLevel = function(level) {
  // Highlight active level/node in HTML
  const nodes = document.querySelectorAll(".pyramid-layer-clickable, .variation-pill");
  nodes.forEach(node => node.classList.remove("active"));
  
  const activeNode = document.getElementById(`pyramid-${level}`);
  if (activeNode) {
    activeNode.classList.add("active");
  }

  // Populate Details Panel
  const data = pyramidData[level];
  const container = document.getElementById("pyramid-details-container");
  if (!container || !data) return;

  const verifyItems = data.verify.map(item => `<li>${item}</li>`).join("");
  const reqItems = data.requirements.map(item => `<li>${item}</li>`).join("");

  container.innerHTML = `
    <div class="pyramid-details-header">
      <div class="details-title-row">
        <div>
          <h3>${data.title}</h3>
        </div>
      </div>
    </div>
    
    <div class="pyramid-metrics-grid">
      <div class="pyramid-metric-badge">
        <span class="p-metric-label">Quantity</span>
        <span class="p-metric-val">${data.quantity.split(' (')[0]}</span>
      </div>
      <div class="pyramid-metric-badge">
        <span class="p-metric-label">Execution Speed</span>
        <span class="p-metric-val">${data.speed}</span>
      </div>
      <div class="pyramid-metric-badge">
        <span class="p-metric-label">Cost</span>
        <span class="p-metric-val">${data.cost}</span>
      </div>
      <div class="pyramid-metric-badge">
        <span class="p-metric-label">Reliability</span>
        <span class="p-metric-val">${data.reliability}</span>
      </div>
    </div>

    <div class="pyramid-content-split">
      <div class="pyramid-left-bullets">
        <div class="p-details-box verify-box">
          <h4><i data-lucide="check-circle-2"></i> What they Verify</h4>
          <ul>${verifyItems}</ul>
        </div>
        <div class="p-details-box req-box">
          <h4><i data-lucide="list-checks"></i> Key Requirements</h4>
          <ul>${reqItems}</ul>
        </div>
      </div>
      <div class="pyramid-right-example">
        <div class="p-details-box example-box">
          <h4><i data-lucide="braces"></i> Enterprise Example</h4>
          <p>${data.example}</p>
        </div>
      </div>
    </div>
  `;

  // Re-run lucide icons rendering
  lucide.createIcons({
    attrs: {
      class: 'lucide-custom'
    },
    nameAttr: 'data-lucide'
  });
};

// ==========================================================================
// TESTING TYPES INTERACTIVE DETAILS (SLIDE 4)
// ==========================================================================
const testingTypesData = {
  unit: {
    title: "Unit Testing",
    icon: "code-2",
    what: "Unit Testing validates individual methods, functions, classes, or components independently from the rest of the application. It is the smallest level of testing and focuses on internal business logic correctness.",
    when: "Used during development whenever developers implement new functionality, bug fixes, utility methods, API services, or reusable components.",
    owner: "Primarily owned by Developers and sometimes supported by SDETs or Automation Engineers.",
    needs: "Source code access, mock dependencies, unit test framework, test doubles/mocks, local development environment, and coding standards.",
    goal: "Goal is to ensure each unit behaves correctly in isolation with high code coverage and stable logic validation. Testing generally stops when all critical paths pass and coverage targets are achieved.",
    tools: "JUnit, TestNG, Mockito, Jest, NUnit, PyTest, xUnit, SonarQube, Jacoco.",
    extra: "Fastest feedback cycle. Usually integrated into CI/CD pipelines and executed on every pull request or commit. Helps enable Shift-Left Testing."
  },
  integration: {
    title: "Integration Testing",
    icon: "git-merge",
    what: "Integration Testing validates communication and data flow between modules, APIs, databases, microservices, queues, or external systems.",
    when: "Used after Unit Testing when multiple components need to work together, especially in microservices, APIs, cloud-native apps, and enterprise platforms.",
    owner: "Developers, QA Engineers, API Testers, SDETs, and Integration Teams.",
    needs: "Integrated environment, APIs, databases, service dependencies, stubs/mocks, test data, and network connectivity.",
    goal: "Goal is to identify interface failures, schema mismatches, data corruption, timeout issues, and service communication defects.",
    tools: "Postman, REST Assured, Karate, SoapUI, WireMock, Pact, Docker, Kubernetes.",
    extra: "Critical in banking, healthcare, and e-commerce systems where multiple external systems continuously exchange data."
  },
  system: {
    title: "System Testing",
    icon: "monitor-smartphone",
    what: "System Testing validates the fully integrated application against functional and non-functional requirements in an environment close to production.",
    when: "Used after integration testing once the entire application build is stable and deployable.",
    owner: "QA Team, Functional Testers, Automation Engineers, and Business QA Teams.",
    needs: "Stable QA environment, integrated build, test cases, test data, automation frameworks, and requirement documents.",
    goal: "Goal is to verify complete end-to-end workflows, business logic, usability, compatibility, and overall system behavior.",
    tools: "Playwright, Selenium, Cypress, TestRail, Jira, Azure DevOps.",
    extra: "This is where most regression, exploratory, UI, API, and end-to-end business flow testing happens."
  },
  acceptance: {
    title: "Acceptance Testing (UAT)",
    icon: "badge-check",
    what: "Acceptance Testing validates whether the application satisfies business expectations, user workflows, and real-world operational needs.",
    when: "Used before production release or go-live approval after system testing is completed.",
    owner: "Business Users, Product Owners, Clients, SMEs, and QA Facilitators.",
    needs: "Business scenarios, near-production environment, production-like data, sign-off criteria, and validated workflows.",
    goal: "Goal is business approval and stakeholder confidence that the product is ready for release.",
    tools: "Jira, Azure DevOps, Zephyr, TestRail, UAT dashboards, collaboration tools.",
    extra: "This testing is highly business-focused rather than technical. Final release decisions often depend on UAT sign-off."
  },
  performance: {
    title: "Performance Testing",
    icon: "gauge",
    what: "Performance Testing evaluates application speed, scalability, reliability, stability, and responsiveness under varying workloads.",
    when: "Used before major releases, peak events, production scaling, cloud migration, or architecture changes.",
    owner: "Performance Test Engineers, SRE Teams, DevOps Teams, and Specialized QA Teams.",
    needs: "Performance environment, workload models, monitoring tools, production-like infrastructure, and realistic traffic patterns.",
    goal: "Goal is to identify bottlenecks and ensure SLA compliance for response time, throughput, CPU, memory, and scalability.",
    tools: "JMeter, k6, LoadRunner, Gatling, Grafana, Dynatrace, New Relic.",
    extra: "Includes Load Testing, Stress Testing, Spike Testing, Endurance Testing, and Scalability Testing."
  },
  security: {
    title: "Security Testing",
    icon: "shield-alert",
    what: "Security Testing identifies vulnerabilities, threats, authentication gaps, authorization failures, and sensitive data exposure risks.",
    when: "Used before production release, during compliance audits, after architecture changes, and continuously in DevSecOps pipelines.",
    owner: "Security Testers, Ethical Hackers, DevSecOps Engineers, Penetration Testing Teams, and Security Auditors.",
    needs: "Security requirements, vulnerability scanners, authentication systems, logs, access controls, and hardened environments.",
    goal: "Goal is to ensure confidentiality, integrity, availability, and resilience against cyber threats and attacks.",
    tools: "OWASP ZAP, Burp Suite, Nessus, Snyk, SonarQube, Metasploit.",
    extra: "Modern security testing also includes API Security, Cloud Security, Container Security, and AI prompt injection testing."
  }
};

// ==========================================================================
// JIRA TERMINOLOGIES DATA & INTERACTIVE LOGIC (SLIDE 35)
// ==========================================================================
const jiraTermsData = {
  project: {
    name: "Jira Project",
    icon: "folder-open",
    definition: "A Jira Project is the top-level container holding all issues, boards, sprints, backlogs, and reports for a specific product, team, or initiative. Every issue belongs to exactly one project and carries the project key as a prefix (e.g., ECOM-421).",
    testingUsage: [
      "QA teams share the product project (e.g., 'ECOM') or use a dedicated Component within it to organize test tasks, automation spikes, and regression bugs.",
      "Project settings control Issue Type Schemes (what issue types exist), Workflow Schemes (how bugs flow), and Permission Schemes (who can log and close bugs)—all critical for QA governance.",
      "QA leads configure project-level dashboards, SLA gadgets, and defect density reports visible to all stakeholders.",
      "In regulated industries (Banking, Healthcare), project configuration must comply with audit requirements—workflow validators enforce mandatory fields before a bug can be closed."
    ],
    types: [
      "Scrum Project: Sprint-based with Sprint Backlog, velocity charts, and burndown reports.",
      "Kanban Project: Continuous flow board with WIP limits and throughput charts.",
      "Company-Managed Project: Full admin control; used by large enterprise teams.",
      "Team-Managed Project: Simplified setup; used by small teams or startups."
    ],
    enterpriseExample: "At HSBC Digital, the single project 'DGTL' contains 2,000+ active issues per quarter. QA engineers use Component 'QA-Automation' to tag automation-related bugs and a dedicated Label 'regression-blocker' for issues that block regression sign-off.",
    tip: "Use a single project with Components and Labels to differentiate QA issues rather than creating separate QA-only projects. This keeps traceability intact—defects link directly to the Stories and Epics they belong to."
  },
  issue: {
    name: "Issue (Work Item)",
    icon: "ticket",
    definition: "An Issue is the fundamental unit of work in Jira. Every Bug, Story, Epic, Task, or Sub-task is an issue with a unique key (e.g., PROJ-123), a status, and configurable fields. Issues are the objects QA creates, tracks, updates, and closes daily.",
    testingUsage: [
      "QA primarily creates Bug issue types with detailed reproduction steps, environment info, severity/priority classification, and screenshot attachments.",
      "Test-related Tasks (write test plan, setup automation framework, configure test data) are tracked as Task or Story issue types in the same sprint.",
      "Issues are linked to parent Stories/Epics for full traceability: Requirement → Story → Bug (found during testing).",
      "Custom fields (Severity, Affected Environment, Root Cause, Found In Build) are added to Bug issues for enterprise reporting."
    ],
    types: [
      "Epic: Large initiative spanning multiple sprints (feature group).",
      "Story: User-facing requirement scoped to one sprint.",
      "Task: Technical work without direct user-facing value.",
      "Bug: A deviation from expected system behavior—owned primarily by QA.",
      "Sub-task: A granular breakdown of any parent issue."
    ],
    enterpriseExample: "QA logs ECOM-4521 (Bug): 'Checkout fails for guest users with special characters in email'. Fields: Priority=P1-Critical, Severity=Critical, Component=Payments, Affected Build=v2.3.0-build-194. Steps: [1] Add item to cart [2] Enter email with '+' [3] Click Checkout → Observe 500 error.",
    tip: "Standardize your Bug issue template. Enforce mandatory fields: Environment, Build Version, Steps to Reproduce, Expected Result, Actual Result. Inconsistent bug reports are the #1 source of developer–QA friction in enterprise projects."
  },
  epic: {
    name: "Epic",
    icon: "layers",
    definition: "An Epic is a large body of work representing a significant product feature or initiative, broken down into multiple User Stories, Tasks, and Bugs. Epics typically span 2–6 sprints and appear on the product roadmap. In testing, Epics define the scope of a test plan.",
    testingUsage: [
      "QA creates a Test Plan or Test Cycle scoped to each Epic—ensuring every story within the Epic has corresponding test coverage.",
      "Epic-level defect metrics show feature quality: if an Epic has 30+ bugs logged, it signals design complexity or requirements ambiguity issues.",
      "Test summary reports sent to stakeholders are organized at Epic level for a clear feature-quality narrative.",
      "RTM (Requirement Traceability Matrix) is built at Epic level—mapping business requirements to test cases."
    ],
    types: [
      "Feature Epic: Customer-facing feature group (e.g., 'User Authentication v2').",
      "Technical Epic: Infrastructure or platform work (e.g., 'Cloud Migration to AWS').",
      "Quality Epic: QA initiatives (e.g., 'Achieve 80% Automation Coverage').",
      "Release Epic: All delivery work associated with a specific version release."
    ],
    enterpriseExample: "FinTech startup Epic 'FIN-100: Open Banking PSD2 API'. QA creates a Zephyr Test Cycle with 87 test cases covering: API authentication, consent management, transaction retrieval, error handling, and GDPR compliance checks.",
    tip: "Always track the 'Epic Link' field when logging bugs. During sprint retrospectives, count bugs-per-Epic to identify high-risk areas. Epics with a >15% bug rate versus story count are strong candidates for dedicated exploratory testing sprints."
  },
  story: {
    name: "User Story",
    icon: "book-open",
    definition: "A User Story is a requirement written from the end-user perspective: 'As a [user], I want [feature] so that [benefit]'. Stories are the primary sprint deliverables that QA tests. Each Story must have clear Acceptance Criteria (AC) before QA testing begins.",
    testingUsage: [
      "QA derives all functional test cases directly from the Story's Acceptance Criteria (AC). If AC is missing or ambiguous, QA flags it during backlog grooming—this is Shift-Left testing in practice.",
      "A Story is only marked 'Done' when QA has executed all test cases AND all P1/P2 bugs are resolved—this is the Definition of Done.",
      "Automation scripts are linked to their parent User Story via Jira issue links for full traceability.",
      "Exploratory testing charters are written at story level to cover scenarios not explicitly listed in the AC."
    ],
    types: [
      "Functional Story: User-facing feature behavior ('As a user, I can reset my password').",
      "API Story: Backend contract definition ('Expose POST /orders endpoint with pagination').",
      "QA Story: Testing infrastructure ('Set up Playwright regression pipeline for login module').",
      "Spike Story: Time-boxed research/investigation with no direct deliverable."
    ],
    enterpriseExample: "Story SHOP-220: 'As a customer, I want to filter products by price range so I can find affordable options quickly.' QA writes 12 test cases: valid range, inverted range (min > max), decimal prices, €0.00 range, no products in range, 10,000+ product performance, mobile responsiveness.",
    tip: "If a Story has no Acceptance Criteria, do NOT start testing it. Raise a comment requesting AC from the Product Owner. Testing a story without AC leads to missed defects and scope rework—this is one of the top root causes of escaped bugs in enterprise projects."
  },
  bug: {
    name: "Bug / Defect",
    icon: "bug",
    definition: "A Bug is a Jira issue type representing a deviation between expected and actual system behavior. It is the primary issue type created and managed by QA engineers. Bugs drive the defect management process and are the central measurable artifact of software quality.",
    testingUsage: [
      "QA sets Bug Severity (how severe is the defect): Critical / Major / Minor / Trivial.",
      "Product Owner sets Bug Priority (when should it be fixed): P1 (this sprint) / P2 (next sprint) / P3 (backlog) / P4 (nice-to-have).",
      "Bug lifecycle: Open → In Progress → Dev Done → In QA (Retest) → QA Passed/Closed OR Reopened.",
      "Regression bugs are tagged with the 'regression' label and treated as P1 regardless of feature severity.",
      "Duplicate bugs are linked with 'duplicates' relationship and closed with 'Duplicate' resolution—not deleted."
    ],
    types: [
      "Functional Bug: Feature does not work as specified in requirements.",
      "UI/UX Bug: Visual defects, wrong layouts, missing/wrong text or icons.",
      "Performance Bug: Response time exceeds SLA (e.g., API > 2 seconds).",
      "Security Bug: XSS, SQL injection, authentication bypass, or data exposure.",
      "Regression Bug: Previously working feature broken by new code changes."
    ],
    enterpriseExample: "Bug BUG-7841 — Summary: 'EUR payment rounds to wrong decimal'. Priority: P1-Critical | Severity: Critical | Found In: v2.3.0-build-194 | Steps: Add €9.99 item → Apply 10% discount → Total shows €9.0 instead of €8.99 | Component: Payments | Fix Version: v2.4.0.",
    tip: "Always fill in 'Affects Version' (which build you found the bug in) and 'Fix Version' (which release will fix it). These two fields are mandatory for release quality reporting. Missing them makes sprint metrics and release health dashboards completely unreliable."
  },
  sprint: {
    name: "Sprint",
    icon: "timer",
    definition: "A Sprint is a fixed timeboxed iteration (1–4 weeks, standard is 2 weeks) in which a Scrum team commits to delivering a set of User Stories from the backlog as a potentially shippable product increment. Sprints are the heartbeat of Agile delivery.",
    testingUsage: [
      "QA participates in Sprint Planning to review stories for testability, flag missing Acceptance Criteria, and estimate testing effort in Story Points or hours.",
      "During the sprint, QA tracks test execution progress daily on the Sprint Board.",
      "QA Gate: All stories must pass QA testing before the sprint can be formally closed—QA has formal Go/No-Go authority.",
      "Sprint Burndown chart shows if testing is keeping pace—bug spikes at the end of a sprint indicate late-stage testing (a dangerous anti-pattern).",
      "QA provides Sprint Retrospective data: test cases executed, pass rate, bugs found, automation scripts added, blocked testing time."
    ],
    types: [
      "Regular Sprint: Standard 2-week delivery cycle.",
      "Hardening Sprint: Dedicated bug-fixing sprint before a major release.",
      "Zero Sprint: Pre-project sprint for environment setup and framework initialization.",
      "PI Sprint (SAFe): Part of a 10-12 week Program Increment in enterprise SAFe."
    ],
    enterpriseExample: "Sprint 24 (2 weeks) at a SaaS company: QA committed to 6 Stories, 48 test cases, 3 automation scripts, and a full regression run. Results: 46/48 tests passed, 4 bugs logged (1 P2 deferred, 3 fixed and verified). Sprint closed with QA sign-off at Sprint Review.",
    tip: "Push for 'QA Done' to be explicitly part of the Definition of Done for every story. Without it, developers mark stories as Done before testing, causing sprint carry-over and inaccurate velocity metrics—this is a common Scrum anti-pattern in growing teams."
  },
  board: {
    name: "Scrum / Kanban Board",
    icon: "layout-dashboard",
    definition: "A Jira Board is a visual workspace showing all issues in a project or sprint organized by status columns (e.g., To Do → In Progress → QA Testing → Done). It provides the team—QA, developers, and stakeholders—real-time visibility of all work in progress.",
    testingUsage: [
      "QA uses the board to monitor which stories are 'Ready for QA' (developer done) and pulls them in First-In-First-Out order.",
      "Custom QA columns: 'QA Ready', 'QA In Progress', 'QA Failed', 'QA Passed' provide full testing visibility directly on the board.",
      "Bugs raised during a sprint appear on the board for the developer to pick up and fix in the same sprint.",
      "Swimlanes can separate QA tasks (Bug Retests, Regression Execution) from development tasks on the same board.",
      "Sprint Burndown Chart (accessible from the board) helps QA track if testing capacity is aligned with sprint scope."
    ],
    types: [
      "Scrum Board: Sprint-scoped; shows committed sprint backlog only.",
      "Kanban Board: Continuous flow with WIP limits and cumulative flow diagrams.",
      "Roadmap Board: Timeline view of Epics across quarters (Portfolio level).",
      "Custom Filtered Board: Board scoped to a specific component, label, or team."
    ],
    enterpriseExample: "At a major e-commerce company, the Jira Board has columns: Backlog → Dev In Progress → Code Review → QA Ready → QA Testing → QA Blocked → Staging → Done. Issues in 'QA Blocked' for more than 24 hours are automatically escalated via Jira Automation to the QA lead with a Slack notification.",
    tip: "Add a dedicated 'QA Blocked' column to your sprint board and configure a Jira Automation rule to notify the QA lead when an issue stays blocked for more than 24 hours. This eliminates the daily stand-up 'are you blocked?' back-and-forth and makes bottlenecks visible."
  },
  jql: {
    name: "JQL — Jira Query Language",
    icon: "search-code",
    definition: "JQL (Jira Query Language) is a powerful SQL-like structured query language built into Jira. It lets you search, filter, and build reporting dashboards by querying any issue field, date, sprint, version, or relationship—critical for QA daily work and release reporting.",
    testingUsage: [
      "Open critical bugs this sprint: project = ECOM AND issuetype = Bug AND priority in (P1,P2) AND sprint in openSprints() AND status != Done",
      "All bugs found this week: project = ECOM AND issuetype = Bug AND created >= -7d ORDER BY priority ASC",
      "Release readiness check: project = BANKING AND fixVersion = 'v3.1.0' AND issuetype = Bug AND status not in (Closed, Verified)",
      "Regression failures: issuetype = Bug AND labels = regression AND sprint in openSprints()",
      "Stories awaiting QA: issuetype = Story AND status = 'QA Ready' AND sprint in openSprints() AND assignee is EMPTY"
    ],
    types: [
      "Field Operators: = , != , ~ (contains), in, is EMPTY, is not EMPTY",
      "Date Functions: created >= -7d, updated >= startOfWeek(), duedate < endOfMonth()",
      "Sprint Functions: sprint in openSprints(), sprint in closedSprints()",
      "Ordering: ORDER BY priority ASC, created DESC",
      "Relationship Queries: issue in linkedIssues('PROJ-100', 'is blocked by')"
    ],
    enterpriseExample: "QA Lead's weekly release gate JQL: project = BANKING AND issuetype = Bug AND fixVersion = 'v3.1-RC1' AND severity in (Critical, High) AND status not in (Closed, 'QA Verified') ORDER BY priority ASC — This runs every Monday and directly feeds the Release Go/No-Go decision meeting.",
    tip: "Save your top 5 JQL queries as named Filters and build a Jira Dashboard wired to those filters. A well-maintained QA dashboard transforms you from a tester into a quality metrics owner—this skill is highly valued in senior QA and SDET roles across all enterprise companies."
  },
  workflow: {
    name: "Workflow & Transitions",
    icon: "git-branch",
    definition: "A Jira Workflow defines the full lifecycle (statuses) an issue passes through and the allowed transitions between them. Workflows enforce quality gates—bugs cannot be closed without QA sign-off, and stories cannot be marked Done without all AC conditions being met.",
    testingUsage: [
      "Standard Bug Lifecycle: Open → In Progress (Dev) → Dev Done → In QA (Retest) → QA Passed/Closed OR Reopened.",
      "Story Workflow: To Do → In Development → Code Review → QA Ready → QA Testing → QA Sign-off → Done.",
      "Transition validators enforce mandatory fields: bugs cannot transition to 'Closed' without 'Root Cause' and 'Fix Build' fields completed.",
      "Post-functions automate actions: when a bug is 'Reopened', automatically re-assign it to the original resolver and post a comment.",
      "Screen schemes define which fields are shown at each workflow step—'Reopen' screen shows Root Cause + Reopen Reason fields."
    ],
    types: [
      "Simple Workflow: To Do → In Progress → Done (for basic task boards).",
      "Bug Lifecycle Workflow: Open → Dev In Progress → Dev Done → QA Verify → Closed / Reopen.",
      "Enterprise QA Workflow: 8+ status workflow with mandatory validators and automation rules.",
      "Release Approval Workflow: Draft → QA Review → Business Review → Approved → Released."
    ],
    enterpriseExample: "At a pharma company's regulated LIMS system, the Bug workflow requires: (1) 'Root Cause Category' field set before closing, (2) Manager approval for Critical bugs, (3) Post-function auto-creates a 'Preventive Action' task when a Critical bug closes. Full audit log maintained for FDA 21 CFR Part 11 compliance.",
    tip: "Design a dedicated 'QA Verify' status in your bug workflow instead of jumping from 'Resolved' to 'Closed'. This gives QA formal ownership of the close sign-off and creates a compliance-friendly audit trail. Without it, developers will close bugs before QA retests them."
  },
  version: {
    name: "Fix Version & Affects Version",
    icon: "tag",
    definition: "'Affects Version' captures which product release contained the bug when found. 'Fix Version' specifies which upcoming release will contain the developer's fix. Together, these fields power release-level quality dashboards, go/no-go decisions, and audit compliance reporting.",
    testingUsage: [
      "'Affects Version' is set by QA when logging a bug (e.g., Affects Version: v2.3.0-RC1-Build-194).",
      "'Fix Version' is set by the developer when assigning the fix to a planned release (e.g., Fix Version: v2.4.0).",
      "Version Health Page shows: total issues, resolved, unresolved, and critical blockers per release—used in Release Review meetings.",
      "JQL for release readiness: project = ECOM AND fixVersion = 'v2.4.0' AND issuetype = Bug AND status not in (Closed, Verified)",
      "Archived versions preserve historical defect data for compliance audits, post-mortems, and regulatory reporting."
    ],
    types: [
      "Unreleased Version: Planned but not yet shipped to production.",
      "Released Version: Shipped to production; issues locked as historical records.",
      "Archived Version: Old versions moved to archive; not actively monitored.",
      "Continuous Version: Used in Kanban projects with no fixed release schedule."
    ],
    enterpriseExample: "QA Manager reviews the 'v3.5.0' Version Health Page: 124 total issues, 118 resolved, 6 unresolved (2 Critical, 4 Minor). The 2 Critical bugs are escalated at the Release Review. Release is formally blocked until both Criticals reach 'QA Verified' status—ensuring no known Critical bugs ship to production.",
    tip: "Align Jira Fix Versions with your CI/CD build version numbering (Jenkins, GitHub Actions). This creates a direct artifact-to-defect traceability chain. Auditors, compliance teams, and post-incident reviewers rely on this alignment to trace exactly what was shipped in each release."
  }
};

window.selectJiraTerm = function(term) {
  const pills = document.querySelectorAll("[id^='jterm-']");
  pills.forEach(p => p.classList.remove("active"));
  const activePill = document.getElementById(`jterm-${term}`);
  if (activePill) activePill.classList.add("active");

  const data = jiraTermsData[term];
  const container = document.getElementById("jira-terms-container");
  if (!container || !data) return;

  const usageItems = data.testingUsage.map(u => `<li>${u}</li>`).join("");
  const typeItems = data.types.map(t => `<li>${t}</li>`).join("");

  container.innerHTML = `
    <div class="jterm-header">
      <i data-lucide="${data.icon}" class="jterm-icon-lg"></i>
      <div class="jterm-header-text">
        <h3 class="jterm-title">${data.name}</h3>
        <p class="jterm-def">${data.definition}</p>
      </div>
    </div>
    <div class="jterm-body-grid">
      <div class="jterm-col">
        <div class="jterm-section">
          <h4><i data-lucide="flask-conical"></i> QA / Testing Usage</h4>
          <ul class="jterm-list">${usageItems}</ul>
        </div>
        <div class="jterm-tip-box">
          <i data-lucide="lightbulb"></i>
          <p><strong>Pro Tip:</strong> ${data.tip}</p>
        </div>
      </div>
      <div class="jterm-col">
        <div class="jterm-section">
          <h4><i data-lucide="list"></i> Types / Variants</h4>
          <ul class="jterm-list types-list">${typeItems}</ul>
        </div>
        <div class="jterm-example-box">
          <h4><i data-lucide="building-2"></i> Enterprise Example</h4>
          <p>${data.enterpriseExample}</p>
        </div>
      </div>
    </div>
  `;
  lucide.createIcons({ attrs: { class: "lucide-custom" }, nameAttr: "data-lucide" });
};

window.showTestingType = function(type) {
  const data = testingTypesData[type];
  const panel = document.getElementById("testing-details-panel");

  if (!panel || !data) return;

  panel.innerHTML = `
    <div class="testing-detail-header">
      <div class="testing-detail-title">
        <i data-lucide="${data.icon}"></i>
        <h3>${data.title}</h3>
      </div>
      <span class="testing-live-badge">Interactive Learning View</span>
    </div>

    <div class="testing-detail-grid">
      <div class="testing-detail-card">
        <h4>1. What is this Testing Type?</h4>
        <p>${data.what}</p>
      </div>

      <div class="testing-detail-card">
        <h4>2. When to Use?</h4>
        <p>${data.when}</p>
      </div>

      <div class="testing-detail-card">
        <h4>3. Ownership / Responsible Team</h4>
        <p>${data.owner}</p>
      </div>

      <div class="testing-detail-card">
        <h4>4. What is Needed?</h4>
        <p>${data.needs}</p>
      </div>

      <div class="testing-detail-card">
        <h4>5. Goal / Exit Criteria</h4>
        <p>${data.goal}</p>
      </div>

      <div class="testing-detail-card">
        <h4>6. Tools & Frameworks</h4>
        <p>${data.tools}</p>
      </div>
    </div>

    <div class="testing-extra-info">
      <h4>7. Additional Enterprise Insights</h4>
      <p>${data.extra}</p>
    </div>
  `;

  lucide.createIcons();

  // Smooth scroll to details panel
  const slide4 = document.getElementById("slide-4");
  if (slide4 && panel) {
    setTimeout(() => {
      slide4.scrollTo({
        top: panel.offsetTop - 20,
        behavior: "smooth"
      });
    }, 80);
  }
};
