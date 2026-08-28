(function () {
  "use strict";

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector("#site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  var status = document.querySelector("#open-status");
  var detail = document.querySelector("#open-detail");
  var pageStatus = document.querySelector("#page-open-status");
  var schedule = {
    1: ["05:30", "20:00"],
    2: ["05:30", "20:00"],
    3: ["05:30", "20:00"],
    4: ["05:30", "20:00"],
    5: ["05:30", "20:00"],
    6: ["05:30", "14:00"],
    0: null
  };

  function updateOpeningStatus() {
    if (!status && !detail && !pageStatus) return;
    var now = new Date();
    var hours = schedule[now.getDay()];
    if (!hours) {
      if (status) status.textContent = "Ora chiuso";
      if (pageStatus) pageStatus.textContent = "Ora chiuso";
      if (detail) detail.textContent = "domenica";
      return;
    }
    var current = now.getHours() * 60 + now.getMinutes();
    var start = Number(hours[0].split(":")[0]) * 60 + Number(hours[0].split(":")[1]);
    var end = Number(hours[1].split(":")[0]) * 60 + Number(hours[1].split(":")[1]);
    if (current >= start && current < end) {
      if (status) status.textContent = "Ora aperto";
      if (pageStatus) pageStatus.textContent = "Ora aperto";
      if (detail) detail.textContent = "fino alle " + hours[1];
    } else if (current < start) {
      if (status) status.textContent = "Ora chiuso";
      if (pageStatus) pageStatus.textContent = "Ora chiuso";
      if (detail) detail.textContent = "apre alle " + hours[0];
    } else {
      if (status) status.textContent = "Ora chiuso";
      if (pageStatus) pageStatus.textContent = "Ora chiuso";
      if (detail) detail.textContent = "riapre domani";
    }
  }

  updateOpeningStatus();
}());