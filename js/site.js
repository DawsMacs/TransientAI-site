/* TransientAI site: small progressive enhancements. Everything works without this file. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        // also reveal anything already scrolled past (anchor jumps, fast scrolling)
        if (en.isIntersecting || en.boundingClientRect.top < 0) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // copy buttons on code blocks
  document.querySelectorAll("pre[data-copy]").forEach(function (pre) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      var text = pre.querySelector("code").innerText.replace(/^\$ /gm, "");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = "Copied";
          setTimeout(function () { btn.textContent = "Copy"; }, 1400);
        });
      }
    });
    pre.appendChild(btn);
  });

  // typed terminal demo: the full transcript is in the HTML; this only replays it
  var term = document.querySelector(".term[data-type]");
  if (term && !reduce && "IntersectionObserver" in window) {
    var body = term.querySelector(".term-body");
    var lines = Array.prototype.slice.call(body.children);
    var started = false;
    var play = function () {
      if (started) return;
      started = true;
      body.style.minHeight = body.offsetHeight + "px";
      var items = lines.map(function (el) {
        return { el: el, text: el.classList.contains("t-cmd") ? el.textContent : null };
      });
      items.forEach(function (it) { it.el.style.display = "none"; });
      var caret = document.createElement("span");
      caret.className = "caret";
      var i = 0;
      (function next() {
        if (i >= items.length) { caret.remove(); return; }
        var it = items[i++];
        it.el.style.display = "";
        if (it.text !== null) {
          it.el.textContent = "";
          it.el.appendChild(caret);
          var n = 0;
          (function type() {
            if (n < it.text.length) {
              caret.insertAdjacentText("beforebegin", it.text.charAt(n++));
              setTimeout(type, 22 + Math.random() * 28);
            } else {
              caret.remove();
              setTimeout(next, 420);
            }
          })();
        } else {
          setTimeout(next, it.el.classList.contains("t-gap") ? 60 : 260);
        }
      })();
    };
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) { obs.disconnect(); play(); }
    }, { threshold: 0.35 }).observe(term);
  }
})();
