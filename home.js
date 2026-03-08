(function () {
  const PROFILE_KEY = "wysa_quiz_profile_v1";
  const ORDER = ["strategist", "explorer", "connector", "builder"];
  const COLORS = {
    strategist: "#4f46e5",
    explorer: "#06b6d4",
    connector: "#f59e0b",
    builder: "#10b981",
  };

  function getPieStyle(scores) {
    const total = Math.max(1, ORDER.reduce((acc, key) => acc + (scores[key] || 0), 0));
    let current = 0;
    const parts = ORDER.map((key) => {
      const start = (current / total) * 360;
      current += scores[key] || 0;
      const end = (current / total) * 360;
      return `${COLORS[key]} ${start}deg ${end}deg`;
    });
    return `conic-gradient(${parts.join(", ")})`;
  }

  function hydratePreview(payload) {
    const wrapper = document.getElementById("quizProfilePreview");
    const pie = document.getElementById("miniPieChart");
    const rotatingPoint = document.getElementById("rotatingPoint");
    if (!wrapper || !pie || !rotatingPoint) return;
    if (!payload || !payload.scores || !Array.isArray(payload.actionPlan) || payload.actionPlan.length === 0) return;

    pie.style.background = getPieStyle(payload.scores);
    wrapper.hidden = false;

    let i = 0;
    const points = payload.actionPlan;
    rotatingPoint.textContent = points[0];
    window.setInterval(() => {
      i = (i + 1) % points.length;
      rotatingPoint.textContent = points[i];
    }, 2600);
  }

  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return;
    hydratePreview(JSON.parse(raw));
  } catch (err) {
    // Ignore local storage parsing errors.
  }
})();
