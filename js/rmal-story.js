/* An illustrative timeline, not a simulation of the research system. */
(function () {
  "use strict";
  var film = document.querySelector("[data-rmal-story]");
  if (!film) return;

  var duration = 46;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var phases = [
    {
      start: 0, label: "01 / A familiar approach", title: "The old route does not work here.",
      copy: "The robot follows the route it already knows. A closed gate stops it. Repeating a familiar answer cannot solve a changed problem.",
      process: ["Recall", "Attempt", "Repeat"], feedback: "The strategy is fixed. The outcome is a surprise."
    },
    {
      start: 7, label: "02 / Update the knowledge", title: "A mistake becomes new information.",
      copy: "It remembers the blockage, corrects its map, and takes the open passage. What it knows has changed, immediately, through experience.",
      process: ["Notice", "Correct", "Retry"], feedback: "The map changes. The way it learns is still the same."
    },
    {
      start: 14, label: "03 / A changing problem", title: "Another correction is not enough.",
      copy: "The next gate moves. The robot's new route fails too. It needs to reconsider its approach to learning, rather than keep patching yesterday's route.",
      process: ["Attempt", "Fail", "Reconsider"], feedback: "A second surprise exposes a limit in the strategy."
    },
    {
      start: 22, label: "04 / Learn how to learn", title: "Test possibilities before committing.",
      copy: "It switches strategies: probe two possible passages, compare the outcomes, then move. Learning now includes changing how it gathers information.",
      process: ["Test both", "Compare", "Move"], feedback: "The learning strategy changes, not just the map."
    },
    {
      start: 31, label: "05 / Revise the adapting process", title: "Let feedback change the next test.",
      copy: "Another barrier appears. The robot uses earlier test outcomes to change how it selects its next probe. Feedback now revises the process of adaptation itself.",
      process: ["Predict", "Choose a test", "Revise"], feedback: "Each outcome feeds back into how the next test is chosen."
    },
    {
      start: 41, label: "06 / Carry it forward", title: "A better way to face the next change.",
      copy: "The light reaches the beacon. The ambition is to carry forward more than a successful route: a learning process that keeps improving through use.",
      process: ["Predict", "Choose a test", "Revise"], feedback: "The goal is continuous adaptation, including how adaptation itself works."
    }
  ];
  // Time, horizontal position, and floor position for the robot's short story.
  var route = [
    [0, 132, 226], [1, 132, 226], [3.8, 296, 226], [4.1, 300, 226],
    [4.5, 286, 226], [5.8, 280, 234], [7.5, 280, 234], [8.6, 264, 234],
    [10, 264, 304], [11.8, 390, 304], [13.5, 456, 240], [14.2, 480, 226],
    [16.6, 558, 226], [17, 562, 226], [17.4, 548, 226], [18.5, 514, 240],
    [25.8, 514, 240], [27.5, 514, 164], [29.8, 658, 164], [31, 696, 164],
    [32.8, 714, 164], [34.2, 710, 164], [35.8, 710, 300], [38.5, 836, 300],
    [40.8, 852, 268], [46, 852, 268]
  ];
  var nodes = {};
  ["robot", "head", "left-arm", "right-arm", "left-foot", "right-foot", "trail",
    "failed-route", "route-one", "failed-two", "gate-top", "gate-bottom", "gate-edges",
    "gate-three", "gap-one", "map-note", "impact", "probe-upper", "probe-lower",
    "route-two", "selective-probe", "route-three", "light", "beacon-core", "arrival",
    "success", "chapter-label", "title", "copy", "process-loop", "process-one",
    "process-two", "process-three", "feedback", "play", "play-icon", "time", "progress"
  ].forEach(function (key) { nodes[key] = film.querySelector("[data-rmal-" + key + "]"); });
  var chapters = Array.prototype.slice.call(film.querySelectorAll("[data-rmal-seek]"));
  var time = reduced.matches ? duration : 0;
  var phaseIndex = -1;
  var userPaused = reduced.matches;
  var inView = false;
  var playing = false;
  var previous = null;
  var frameId = null;
  var lastSecond = -1;

  function clamp(value) { return Math.max(0, Math.min(1, value)); }
  function ease(value) { value = clamp(value); return value * value * (3 - 2 * value); }
  function fade(t, start, end) { return ease((t - start) / (end - start)); }
  function windowOpacity(t, a, b, c, d) { return fade(t, a, b) * (1 - fade(t, c, d)); }
  function opacity(key, value) { nodes[key].setAttribute("opacity", value.toFixed(3)); }
  function lerp(a, b, value) { return a + (b - a) * value; }
  function point(t) {
    for (var i = 1; i < route.length; i++) {
      if (t <= route[i][0]) {
        var a = route[i - 1], b = route[i];
        var k = ease((t - a[0]) / (b[0] - a[0]));
        return [lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
      }
    }
    return route[route.length - 1].slice(1);
  }
  function stamp(t) { return "00:" + String(Math.floor(t)).padStart(2, "0"); }

  function render(t) {
    var p = point(t), before = point(Math.max(0, t - .04));
    var moving = Math.hypot(p[0] - before[0], p[1] - before[1]) > .08;
    var step = moving ? Math.sin(t * 15) : 0;
    var bumpOne = windowOpacity(t, 4, 4.15, 4.6, 5.3);
    var bumpTwo = windowOpacity(t, 16.9, 17.1, 17.6, 18.2);
    var tilt = (bumpOne + bumpTwo) * -9;
    var testTilt = windowOpacity(t, 22.3, 23, 25.5, 26) * Math.sin(t * 1.6) * 7;
    var celebration = fade(t, 42, 43);
    nodes.robot.setAttribute("transform", "translate(" + p[0].toFixed(2) + " " + (p[1] - Math.abs(step) * 1.8).toFixed(2) + ") rotate(" + tilt.toFixed(2) + ")");
    nodes.head.setAttribute("transform", "rotate(" + testTilt.toFixed(2) + " 0 -22)");
    nodes["left-foot"].setAttribute("transform", "translate(0 " + (step * 3).toFixed(2) + ")");
    nodes["right-foot"].setAttribute("transform", "translate(0 " + (-step * 3).toFixed(2) + ")");
    nodes["left-arm"].setAttribute("transform", "rotate(" + (step * 5).toFixed(2) + " -16 0)");
    nodes["right-arm"].setAttribute("transform", "rotate(" + (-celebration * 65).toFixed(2) + " 16 0)");
    film.style.setProperty("--rmal-eye", bumpOne + bumpTwo > .3 ? "var(--bad)" : "var(--link)");

    var traveled = "M" + route[0][1] + " " + route[0][2];
    route.forEach(function (r) { if (r[0] > 0 && r[0] < t) traveled += " L" + r[1] + " " + r[2]; });
    traveled += " L" + p[0].toFixed(2) + " " + p[1].toFixed(2);
    nodes.trail.setAttribute("d", traveled);
    opacity("failed-route", windowOpacity(t, 3.9, 4.4, 8, 10) * .6);
    opacity("map-note", fade(t, 5, 6.5) * .7);
    opacity("route-one", windowOpacity(t, 7.5, 8.5, 12.5, 14.5) * .65);
    opacity("gap-one", .1 + fade(t, 7, 9) * .5);

    var gateShift = fade(t, 15, 16.3);
    var topHeight = lerp(61, 4, gateShift), bottomY = lerp(282, 224, gateShift);
    nodes["gate-top"].setAttribute("height", topHeight.toFixed(2));
    nodes["gate-bottom"].setAttribute("y", bottomY.toFixed(2));
    nodes["gate-bottom"].setAttribute("height", (379 - bottomY).toFixed(2));
    nodes["gate-edges"].setAttribute("d", "M588 " + (115 + topHeight).toFixed(2) + " H612 M588 " + bottomY.toFixed(2) + " H612");
    opacity("failed-two", windowOpacity(t, 16.8, 17.3, 22, 24) * .6);
    var impact = Math.max(bumpOne, bumpTwo);
    nodes.impact.setAttribute("transform", "translate(" + (t < 10 ? 309 : 573) + " 226)");
    opacity("impact", impact * .85);

    opacity("probe-upper", windowOpacity(t, 22.7, 24, 26.4, 28) * .75);
    opacity("probe-lower", windowOpacity(t, 24, 25.1, 26.4, 28) * .65);
    opacity("route-two", windowOpacity(t, 26, 27, 30, 32) * .65);
    opacity("gate-three", fade(t, 31.2, 32.5) * .85);
    var scan = windowOpacity(t, 32.8, 33.5, 35, 36) * (.65 + Math.sin(t * 4) * .15);
    opacity("selective-probe", scan);
    opacity("route-three", windowOpacity(t, 34, 35, 40, 42) * .65);

    var delivery = fade(t, 41, 42.2);
    var lightX = lerp(p[0] + 29, 898, delivery), lightY = lerp(p[1] + 5, 226, delivery);
    nodes.light.setAttribute("transform", "translate(" + lightX.toFixed(2) + " " + lightY.toFixed(2) + ")");
    nodes["beacon-core"].setAttribute("fill", delivery > .95 ? "var(--link)" : "var(--bg-2)");
    opacity("arrival", delivery * (.5 + Math.sin(t * 2) * .12));
    nodes.arrival.setAttribute("r", (43 + Math.sin(t * 2) * 3 * delivery).toFixed(2));
    opacity("success", fade(t, 42, 43));

    nodes["process-loop"].style.setProperty("--rmal-feedback-position", (95 - ((t - 31) % 3 + 3) % 3 / 3 * 90).toFixed(2) + "%");
    var index = 0;
    phases.forEach(function (phase, i) { if (t >= phase.start) index = i; });
    if (phaseIndex !== index) {
      phaseIndex = index;
      var phase = phases[index];
      nodes["chapter-label"].textContent = phase.label;
      nodes.title.textContent = phase.title;
      nodes.copy.textContent = phase.copy;
      ["one", "two", "three"].forEach(function (key, i) { nodes["process-" + key].textContent = phase.process[i]; });
      nodes.feedback.textContent = phase.feedback;
      nodes["process-loop"].classList.toggle("is-recursive", index >= 4);
      chapters.forEach(function (button, i) {
        if (i === index) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
    }
    nodes.progress.value = Math.round(t * 1000);
    nodes.progress.style.setProperty("--rmal-progress", (t / duration * 100).toFixed(2) + "%");
    if (lastSecond !== Math.floor(t)) {
      lastSecond = Math.floor(t);
      nodes.time.textContent = stamp(t);
      nodes.progress.setAttribute("aria-valuetext", stamp(t) + " of 00:46. " + phases[index].title);
    }
  }

  function updateButton() {
    nodes.play.setAttribute("aria-label", playing ? "Pause animation" : time >= duration ? "Replay animation" : "Play animation");
    nodes["play-icon"].setAttribute("d", playing ? "M8 5 V19 M16 5 V19" : "M8 5 L19 12 L8 19 Z");
  }
  function tick(now) {
    frameId = null;
    if (!playing) return;
    if (previous !== null) time = Math.min(duration, time + Math.min((now - previous) / 1000, .1));
    previous = now;
    render(time);
    if (time >= duration) { playing = false; userPaused = true; updateButton(); return; }
    frameId = window.requestAnimationFrame(tick);
  }
  function syncPlayback() {
    playing = !userPaused && inView && !document.hidden && time < duration;
    previous = null;
    if (frameId !== null) { window.cancelAnimationFrame(frameId); frameId = null; }
    if (playing) frameId = window.requestAnimationFrame(tick);
    updateButton();
  }
  function seek(value) {
    userPaused = true;
    time = Math.max(0, Math.min(duration, value));
    render(time);
    syncPlayback();
  }
  nodes.play.addEventListener("click", function () {
    if (time >= duration) { time = 0; render(time); }
    userPaused = playing;
    syncPlayback();
  });
  film.querySelector("[data-rmal-replay]").addEventListener("click", function () {
    time = 0; userPaused = false; render(time); syncPlayback();
  });
  nodes.progress.addEventListener("input", function () { seek(Number(nodes.progress.value) / 1000); });
  chapters.forEach(function (button) {
    button.addEventListener("click", function () { seek(Number(button.getAttribute("data-rmal-seek"))); });
  });
  document.addEventListener("visibilitychange", syncPlayback);
  reduced.addEventListener("change", function () {
    if (reduced.matches) { userPaused = true; time = duration; render(time); syncPlayback(); }
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      syncPlayback();
    }, { threshold: .12 }).observe(film);
  } else { inView = true; }
  film.querySelector("[data-rmal-controls]").hidden = false;
  film.querySelector("[data-rmal-chapters]").hidden = false;
  render(time);
  syncPlayback();
})();
