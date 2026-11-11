(function () {
  var board = document.querySelector("[data-board]");
  if (!board) return;
  var top = 10;
  var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };
  board.querySelectorAll(".stk").forEach(function (s) {
    var grab = null;
    s.addEventListener("pointerdown", function (e) {
      var r = s.getBoundingClientRect();
      grab = { dx: e.clientX - (r.left + r.width / 2), dy: e.clientY - (r.top + r.height / 2) };
      s.style.zIndex = ++top;
      s.classList.add("is-held");
      try { s.setPointerCapture(e.pointerId); } catch (err) { /* not a live pointer */ }
    });
    s.addEventListener("pointermove", function (e) {
      if (!grab) return;
      var b = board.getBoundingClientRect();
      var padX = s.offsetWidth / 3, padY = s.offsetHeight / 3;
      var x = clamp(e.clientX - grab.dx - b.left, padX, b.width - padX);
      var y = clamp(e.clientY - grab.dy - b.top, padY, b.height - padY);
      s.style.left = (x / b.width * 100).toFixed(2) + "%";
      s.style.top = (y / b.height * 100).toFixed(2) + "%";
    });
    var end = function () { grab = null; s.classList.remove("is-held"); };
    s.addEventListener("pointerup", end);
    s.addEventListener("pointercancel", end);
  });
})();
