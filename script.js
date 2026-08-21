/* ==========================================================================
   B3N INDUSTRIES
   Two small behaviours, no dependencies, no build step, nothing tracked:
     1. Theme switch — signal (orange) / blue, remembered per browser.
     2. Drawing plate — pick the prototype up, drop it, it returns.
   ========================================================================== */

/* ---- 1. Theme ----------------------------------------------------------- */
(function () {
    'use strict';

    var KEY = 'b3n-theme';
    var root = document.documentElement;
    var button = document.querySelector('[data-theme-toggle]');
    if (!button) return;

    function apply(theme, animate) {
        if (animate) {
            root.classList.add('theme-shift');
            window.setTimeout(function () { root.classList.remove('theme-shift'); }, 450);
        }
        if (theme === 'blue') {
            root.setAttribute('data-theme', 'blue');
        } else {
            root.removeAttribute('data-theme');
        }
        button.setAttribute('aria-pressed', theme === 'blue' ? 'true' : 'false');
    }

    /* The inline head snippet has already set the attribute; sync the button. */
    apply(root.getAttribute('data-theme') === 'blue' ? 'blue' : 'signal', false);

    button.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'blue' ? 'signal' : 'blue';
        apply(next, true);
        try { window.localStorage.setItem(KEY, next); } catch (err) { /* private mode */ }
    });
})();

/* ---- 2. Drawing plate --------------------------------------------------- */
(function () {
    'use strict';

    var grab = document.querySelector('.plate__grab');
    if (!grab || !window.PointerEvent) return;

    var LIMIT = 190;          /* px the unit can travel before it resists   */
    var TILT  = 0.045;        /* degrees of roll per px of horizontal drag  */

    var pointerId = null;
    var startX = 0;
    var startY = 0;

    /* Rubber band: 1:1 near the origin, easing off towards LIMIT. */
    function damp(delta) {
        return LIMIT * Math.tanh(delta / LIMIT);
    }

    function onDown(event) {
        /* Left button / pen only — touch is left alone so the page still scrolls. */
        if (event.pointerType === 'touch' || event.button !== 0) return;

        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        grab.classList.add('is-dragging');
        grab.setPointerCapture(pointerId);
        event.preventDefault();
    }

    function onMove(event) {
        if (event.pointerId !== pointerId) return;

        var x = damp(event.clientX - startX);
        var y = damp(event.clientY - startY);
        grab.style.transform = 'translate(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px)' +
                               ' rotate(' + (x * TILT).toFixed(2) + 'deg)';
    }

    function release(event) {
        if (pointerId === null || (event && event.pointerId !== undefined && event.pointerId !== pointerId)) return;

        try { grab.releasePointerCapture(pointerId); } catch (err) { /* already gone */ }
        pointerId = null;
        grab.classList.remove('is-dragging');
        grab.style.transform = '';   /* CSS transitions it home */
    }

    grab.addEventListener('pointerdown', onDown);
    grab.addEventListener('pointermove', onMove);
    grab.addEventListener('pointerup', release);
    grab.addEventListener('pointercancel', release);
    grab.addEventListener('lostpointercapture', release);
    window.addEventListener('blur', release);

    /* Native image drag would fight the pointer capture. */
    grab.addEventListener('dragstart', function (event) { event.preventDefault(); });
})();
