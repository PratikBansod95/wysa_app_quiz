const DIMENSIONS = {
  strategist: {
    label: "Strategist",
    strength: "You usually step back before stepping in.",
    risk: "You can become so busy improving the map that you delay the move.",
    improve: "Translate one insight into one small test within 24 hours.",
    insider:
      "People like you are often mistaken for being slow. The truth: you are usually protecting the team from solving the wrong problem.",
  },
  explorer: {
    label: "Explorer",
    strength: "You create momentum faster than most people.",
    risk: "You can generate more starts than finishes.",
    improve: "Keep only 2 active experiments at a time and kill the rest.",
    insider:
      "Fast movers often believe their issue is discipline. Usually it is not. It is unclosed loops.",
  },
  connector: {
    label: "Connector",
    strength: "You reduce friction and get others moving.",
    risk: "You can over-index on alignment and under-index on decision-making.",
    improve: "Ask for input, then force a decision point and move.",
    insider:
      "This style looks soft from outside, but in messy orgs it is a leverage superpower.",
  },
  builder: {
    label: "Builder",
    strength: "You turn ambiguity into visible progress.",
    risk: "You can become efficient at climbing the wrong hill.",
    improve: "Before starting, write the success metric in one sentence.",
    insider:
      "Reliable executors are usually overused by teams. Your hidden risk is becoming the task sink.",
  },
};

const QUESTIONS = [
  {
    id: 1,
    category: "Monday Morning",
    prompt:
      "You open work. There is a half-finished project, a weird exciting idea, and one teammate who clearly needs help. What do you naturally do first?",
    options: [
      { text: "Step back and figure out what actually matters before touching anything.", scores: { strategist: 3, builder: 1 } },
      { text: "Poke the exciting idea for 10 minutes just to see if there is something there.", scores: { explorer: 3 } },
      { text: "Reply to the teammate and help them get unstuck.", scores: { connector: 3, builder: 1 } },
      { text: "Go straight back to the unfinished thing and push it forward.", scores: { builder: 3 } },
    ],
  },
  {
    id: 2,
    category: "After a Miss",
    prompt: "Something you worked on last week landed with a thud. Barely any response. Your first instinct is to...",
    options: [
      { text: "Question whether the original problem was framed properly.", scores: { strategist: 3 } },
      { text: "Ship a scrappier variation quickly and test again.", scores: { explorer: 3, builder: 1 } },
      { text: "Talk to people and figure out what they made of it.", scores: { connector: 3 } },
      { text: "Polish the current version and try to make it stronger.", scores: { builder: 3 } },
    ],
  },
  {
    id: 3,
    category: "Shiny Object",
    prompt: "You discover a cool tool or tactic that could maybe help your work. What usually happens?",
    options: [
      { text: "You start mapping where it fits in the broader system before touching it.", scores: { strategist: 3 } },
      { text: "You try it immediately because you think best with your hands.", scores: { explorer: 3 } },
      { text: "You send it to a few people and discuss whether it is worth using.", scores: { connector: 3 } },
      { text: "You save it and stay on current work unless there is a strong reason to switch.", scores: { builder: 3, strategist: 1 } },
    ],
  },
  {
    id: 4,
    category: "Productive Week",
    prompt: "A week feels genuinely good to you when...",
    options: [
      { text: "You understood something important that changed the direction.", scores: { strategist: 3 } },
      { text: "You tested multiple ideas and learned fast.", scores: { explorer: 3 } },
      { text: "You had strong collaboration and the room moved together.", scores: { connector: 3 } },
      { text: "You finished things that had been hanging open.", scores: { builder: 3 } },
    ],
  },
  {
    id: 5,
    category: "Slow Project",
    prompt: "A project is dragging. Not failing exactly. Just slow, foggy, and mildly annoying. Your move?",
    options: [
      { text: "Pause and rethink the shape of the problem.", scores: { strategist: 3 } },
      { text: "Create a tiny test to force signal fast.", scores: { explorer: 3, builder: 1 } },
      { text: "Pull in the right people and make the bottleneck visible.", scores: { connector: 3 } },
      { text: "Increase structure, tasks, and deadlines.", scores: { builder: 3 } },
    ],
  },
  {
    id: 6,
    category: "When Stuck",
    prompt: "You are properly stuck. Not fake-stuck. Real stuck. What is most like you?",
    options: [
      { text: "Reframe the question until the path becomes clearer.", scores: { strategist: 3 } },
      { text: "Try a different route entirely and see what breaks open.", scores: { explorer: 3 } },
      { text: "Ask someone sharp and compare thinking.", scores: { connector: 3, strategist: 1 } },
      { text: "Keep pushing on the same thread until something moves.", scores: { builder: 3 } },
    ],
  },
  {
    id: 7,
    category: "Side-Idea Attack",
    prompt: "A better idea appears mid-project. Classic. You usually...",
    options: [
      { text: "Pause and reconsider whether the whole direction should change.", scores: { strategist: 3 } },
      { text: "Spin up a tiny side test because ignoring it feels impossible.", scores: { explorer: 3 } },
      { text: "Talk it through before deciding whether it deserves oxygen.", scores: { connector: 3 } },
      { text: "Write it down and finish the current thing first.", scores: { builder: 3 } },
    ],
  },
  {
    id: 8,
    category: "Looking Back",
    prompt: "At the end of a month, what makes you feel most quietly proud?",
    options: [
      { text: "You now see the system more clearly than you did 30 days ago.", scores: { strategist: 3 } },
      { text: "You turned uncertainty into signal through repeated tests.", scores: { explorer: 3 } },
      { text: "You created trust, momentum, and useful alignment.", scores: { connector: 3 } },
      { text: "You shipped work that visibly moved things forward.", scores: { builder: 3 } },
    ],
  },
  {
    id: 9,
    category: "Urgent Ping",
    prompt: "You get an urgent message asking for help on something that was not in your plan. What tends to happen?",
    options: [
      { text: "You first ask whether this is actually the highest-leverage thing to do.", scores: { strategist: 3 } },
      { text: "You jump in quickly, solve the immediate piece, and figure out the rest on the fly.", scores: { explorer: 2, builder: 1 } },
      { text: "You help because dropped balls and blocked people bother you deeply.", scores: { connector: 3 } },
      { text: "You slot it into execution mode and close it fast.", scores: { builder: 3 } },
    ],
  },
  {
    id: 10,
    category: "Ambiguous Ask",
    prompt: "Someone says, 'Can you look into this?' with almost no context. Your natural response?",
    options: [
      { text: "Define the real question before doing any work.", scores: { strategist: 3 } },
      { text: "Start exploring and trust that the shape will emerge.", scores: { explorer: 3 } },
      { text: "Talk to the people around it until the ask becomes clearer.", scores: { connector: 3 } },
      { text: "Turn it into a checklist and start knocking pieces out.", scores: { builder: 3 } },
    ],
  },
];

const HOME_PROFILE_KEY = "wysa_quiz_profile_v1";
const ORDER = ["strategist", "explorer", "connector", "builder"];
const COLORS = {
  strategist: "#4f46e5",
  explorer: "#06b6d4",
  connector: "#f59e0b",
  builder: "#10b981",
};

let step = 0;
let answers = [];
let isAnalyzing = false;
let analyzingTimer = null;

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getScores() {
  const base = { strategist: 0, explorer: 0, connector: 0, builder: 0 };
  answers.forEach((answer) => {
    Object.entries(answer.scores).forEach(([k, v]) => {
      base[k] += v;
    });
  });
  return base;
}

function getTopTwo(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([k]) => k);
}

function getAntiPatterns(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = sorted[0][0];
  const second = sorted[1][0];
  const gap = sorted[0][1] - sorted[1][1];
  const patterns = [];

  if (scores.explorer >= 18 && scores.builder <= 12) {
    patterns.push({
      title: "Scattered Momentum",
      body: "You generate motion quickly, but some energy leaks into parallel starts.",
      fix: "Cap active experiments at 2 and keep a visible kill list.",
    });
  }
  if (scores.strategist >= 18 && scores.builder <= 12) {
    patterns.push({
      title: "Elegant Delay",
      body: "Insight can become a hiding place if it never converts into action.",
      fix: "For every reframing, force one concrete move within 24 hours.",
    });
  }
  if (scores.connector >= 18 && scores.strategist + scores.builder < 30) {
    patterns.push({
      title: "Alignment Gravity",
      body: "Progress can stall when group coherence becomes more important than movement.",
      fix: "Set explicit decision points: input ends, action starts.",
    });
  }
  if (scores.builder >= 18 && scores.strategist <= 12) {
    patterns.push({
      title: "Execution Treadmill",
      body: "You may become productive on tasks that should not exist.",
      fix: "Before execution ask: what changes if this works?",
    });
  }
  if (gap <= 2) {
    patterns.push({
      title: "Hybrid Brain",
      body: "You are mixed rather than pure. Strong, but it needs deliberate operating rules.",
      fix: "Pick a default mode for each phase and stay consistent.",
    });
  }

  if (patterns.length === 0) {
    patterns.push({
      title: "Stable Core, Predictable Blind Spot",
      body: `Your strongest mode is ${DIMENSIONS[top].label}. It creates value and a predictable blind spot when overused.`,
      fix: `Borrow one behavior from ${DIMENSIONS[second].label} every week.`,
    });
  }

  return patterns.slice(0, 2);
}

function getSummary(scores) {
  const [primary, secondary] = getTopTwo(scores);
  const p = DIMENSIONS[primary];
  const s = DIMENSIONS[secondary];
  return {
    primary,
    secondary,
    hook: `Your work style is ${p.label} with a strong ${s.label} layer.`,
    strengths: [
      `Your dominant mode is ${p.label}. ${p.strength}`,
      `Your secondary mode is ${s.label}. You have a useful backup pattern when work gets messy.`,
      `You are most effective when you combine ${p.label.toLowerCase()} energy with ${s.label.toLowerCase()} discipline.`,
    ],
    actionPlan: [
      "Lean into what already works this week.",
      `Watch the trap: ${p.risk}`,
      `Upgrade path: ${p.improve}`,
      `Multiplier move: borrow one habit from ${s.label}. ${s.improve}`,
    ],
    insider: `${p.insider} ${s.insider}`,
    antiPatterns: getAntiPatterns(scores),
  };
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function progressPct() {
  if (step === 0) return 0;
  return Math.round((Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100);
}

function getPieStyle(scores) {
  const total = Math.max(1, ORDER.reduce((acc, key) => acc + scores[key], 0));
  let current = 0;
  const parts = ORDER.map((key) => {
    const start = (current / total) * 360;
    current += scores[key];
    const end = (current / total) * 360;
    return `${COLORS[key]} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${parts.join(", ")})`;
}

function saveProfile(scores, summary) {
  const payload = {
    scores,
    actionPlan: summary.actionPlan,
    primary: summary.primary,
    secondary: summary.secondary,
    updatedAt: Date.now(),
  };
  window.localStorage.setItem(HOME_PROFILE_KEY, JSON.stringify(payload));
}

function renderIntro() {
  return `
    <article class="card">
      <div class="badge-row">
        <span class="badge primary">3 min feel</span>
        <span class="badge">10 scenario questions</span>
        <span class="badge">Detailed result</span>
      </div>
      <h2>The Way You Work Has a Pattern.</h2>
      <p>This quiz is designed to catch your actual work behavior in the wild.</p>
      <div class="button-row">
        <button id="startQuiz" class="primary-btn">Start the quiz</button>
      </div>
    </article>
  `;
}

function renderQuestion() {
  const q = QUESTIONS[step - 1];
  const shuffledOptions = shuffleArray(q.options).map((option, i) => ({
    id: i,
    option,
    label: String.fromCharCode(65 + i),
  }));
  const options = shuffledOptions
    .map(
      (item) =>
        `<button class="option-btn" data-index="${item.id}"><strong>${item.label}.</strong> ${escapeHtml(item.option.text)}</button>`
    )
    .join("");

  return {
    html: `
      <article class="card">
        <div class="score-row" style="margin-bottom:8px;">
          <span>Question ${step} / ${QUESTIONS.length}</span>
          <span>${progressPct()}% complete</span>
        </div>
        <div class="progress-line"><div class="progress-fill" style="width:${progressPct()}%"></div></div>
      </article>
      <article class="card">
        <div class="badge-row"><span class="badge">${escapeHtml(q.category)}</span></div>
        <h2 class="question">${escapeHtml(q.prompt)}</h2>
        <p style="margin-bottom:10px;">Choose what feels most automatic for you.</p>
        <div class="options">${options}</div>
      </article>
    `,
    shuffledOptions,
  };
}

function renderAnalyzing() {
  return `
    <article class="card analyzing-card">
      <h2>Analyzing your work style...</h2>
      <p>We are mapping your response patterns to detect your dominant mode.</p>
      <div class="thinking-dots"><span></span><span></span><span></span></div>
    </article>
  `;
}

function renderResult() {
  const scores = getScores();
  const summary = getSummary(scores);
  saveProfile(scores, summary);

  const antiPatterns = summary.antiPatterns
    .map(
      (item) =>
        `<div class="list-item"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.body)}</p><p><strong>Fix:</strong> ${escapeHtml(item.fix)}</p></div>`
    )
    .join("");
  const strengths = summary.strengths.map((s) => `<div class="list-item">${escapeHtml(s)}</div>`).join("");
  const actions = summary.actionPlan.map((s) => `<div class="list-item">${escapeHtml(s)}</div>`).join("");
  const pieStyle = getPieStyle(scores);
  const pieLegend = ORDER.map(
    (key) =>
      `<div class="pie-legend-item"><span style="background:${COLORS[key]}"></span>${DIMENSIONS[key].label}: ${scores[key]}</div>`
  ).join("");

  return `
    <article class="card">
      <div class="badge-row">
        <span class="badge" style="background:#ecfdf5;color:#065f46;border-color:#86efac;">Result ready</span>
        <span class="badge">${DIMENSIONS[summary.primary].label} x ${DIMENSIONS[summary.secondary].label}</span>
      </div>
      <h2 class="result-title">Your work brain is ${DIMENSIONS[summary.primary].label} with a strong ${DIMENSIONS[summary.secondary].label} layer.</h2>
      <p>${escapeHtml(summary.hook)}</p>
    </article>

    <article class="card">
      <h2 class="result-title">Your score profile</h2>
      <div class="pie-wrap">
        <div class="pie-chart" style="background:${pieStyle};"></div>
        <div class="pie-hole"></div>
      </div>
      <div class="pie-legend">${pieLegend}</div>
    </article>

    <article class="card">
      <h2 class="result-title">Detailed read</h2>
      <div class="list">${strengths}</div>
      <h2 class="result-title" style="margin-top:12px;">Insider information</h2>
      <div class="list-item">${escapeHtml(summary.insider)}</div>
    </article>

    <article class="card">
      <h2 class="result-title">Where you go wrong</h2>
      <div class="list">${antiPatterns}</div>
    </article>

    <article class="card">
      <h2 class="result-title">What you should do next</h2>
      <div class="list">${actions}</div>
      <div class="button-row">
        <button id="shareQuiz" class="primary-btn">Share this quiz</button>
      </div>
    </article>
  `;
}

function render() {
  const app = document.getElementById("app");
  if (!app) return;

  if (step === 0) {
    app.innerHTML = renderIntro();
    const start = document.getElementById("startQuiz");
    if (start) {
      start.addEventListener("click", () => {
        step = 1;
        render();
      });
    }
    return;
  }

  if (step > 0 && step <= QUESTIONS.length) {
    const question = renderQuestion();
    app.innerHTML = question.html;
    document.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const i = Number(target.getAttribute("data-index"));
        answers.push(question.shuffledOptions[i].option);
        step += 1;
        if (step > QUESTIONS.length) {
          isAnalyzing = true;
          render();
          if (analyzingTimer) window.clearTimeout(analyzingTimer);
          const delay = 3000 + Math.floor(Math.random() * 2001);
          analyzingTimer = window.setTimeout(() => {
            isAnalyzing = false;
            step = QUESTIONS.length + 1;
            render();
          }, delay);
          return;
        }
        render();
      });
    });
    return;
  }

  if (isAnalyzing) {
    app.innerHTML = renderAnalyzing();
    return;
  }

  app.innerHTML = renderResult();
  const share = document.getElementById("shareQuiz");
  if (share) {
    share.addEventListener("click", async () => {
      const shareText =
        "I just took this Work Brain Diagnostic and got a surprisingly accurate read on how I work. Try it.";
      const shareUrl = window.location.href;

      if (navigator.share) {
        try {
          await navigator.share({
            title: "Work Brain Diagnostic",
            text: shareText,
            url: shareUrl,
          });
        } catch (err) {
          // no-op
        }
        return;
      }

      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(`${shareText} ${shareUrl}`.trim());
          window.alert("Share link copied.");
        } catch (err) {
          window.alert("Could not copy share link.");
        }
      }
    });
  }
}

render();
