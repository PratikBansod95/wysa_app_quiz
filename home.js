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
    const dotsContainer = document.getElementById("pointDots");
    const pointsFrame = document.getElementById("pointsFrame");
    if (!wrapper || !pie || !rotatingPoint || !dotsContainer || !pointsFrame) return;
    if (!payload || !payload.scores || !Array.isArray(payload.actionPlan) || payload.actionPlan.length === 0) return;

    pie.style.background = getPieStyle(payload.scores);
    wrapper.hidden = false;

    const points = payload.actionPlan.slice(0, 4);
    let i = 0;
    let touchStartX = null;
    let pointerStartX = null;
    let autoSlideTimer = null;
    const dotEls = Array.from(dotsContainer.querySelectorAll("span")).slice(0, points.length);

    function renderCurrentPoint() {
      rotatingPoint.textContent = points[i];
      dotEls.forEach((el, idx) => {
        el.classList.toggle("active", idx === i);
      });
    }

    function swipeNext() {
      i = (i + 1) % points.length;
      renderCurrentPoint();
    }

    function swipePrev() {
      i = (i - 1 + points.length) % points.length;
      renderCurrentPoint();
    }

    function setPointByIndex(nextIndex) {
      i = (nextIndex + points.length) % points.length;
      renderCurrentPoint();
    }

    function restartAutoSlide() {
      if (autoSlideTimer) {
        window.clearInterval(autoSlideTimer);
      }
      autoSlideTimer = window.setInterval(() => {
        swipeNext();
      }, 10000);
    }

    pointsFrame.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
    });

    pointsFrame.addEventListener("touchend", (event) => {
      if (touchStartX === null) return;
      const endX = event.changedTouches[0].clientX;
      const delta = endX - touchStartX;
      touchStartX = null;
      if (Math.abs(delta) < 28) return;
      event.preventDefault();
      if (delta < 0) {
        swipeNext();
      } else {
        swipePrev();
      }
      restartAutoSlide();
    });

    pointsFrame.addEventListener("pointerdown", (event) => {
      pointerStartX = event.clientX;
    });

    pointsFrame.addEventListener("pointerup", (event) => {
      if (pointerStartX === null) return;
      const delta = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(delta) < 28) return;
      event.preventDefault();
      event.stopPropagation();
      if (delta < 0) {
        swipeNext();
      } else {
        swipePrev();
      }
      restartAutoSlide();
    });

    dotEls.forEach((dot, idx) => {
      dot.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        setPointByIndex(idx);
        restartAutoSlide();
      });
    });

    pointsFrame.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });

    renderCurrentPoint();
    restartAutoSlide();
  }

  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return;
    hydratePreview(JSON.parse(raw));
  } catch (err) {
    // Ignore local storage parsing errors.
  }
})();
