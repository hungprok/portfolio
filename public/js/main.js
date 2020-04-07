// SmoothScroll for websites v1.2.1
// Licensed under the terms of the MIT license.

// People involved
//  - Balazs Galambosi (maintainer)
//  - Michael Herf     (Pulse Algorithm)
//  - Tobias Wasner		(optimized)

(function(){
	// Scroll Variables (tweakable)
	var defaultOptions = {
		// Scrolling Core
		frameRate        : 150, // [Hz]
		animationTime    : 400, // [px]
		stepSize         : 120, // [px]

		// Pulse (less tweakable)
		// Ratio of "tail" to "acceleration"
		pulseAlgorithm   : true,
		pulseScale       : 8,
		pulseNormalize   : 1,

		// Acceleration
		accelerationDelta : 20,  // 20
		accelerationMax   : 1,   // 1

		// Keyboard Settings
		keyboardSupport   : true,  // option
		arrowScroll       : 50,     // [px]

		// Other
		touchpadSupport   : true,
		fixedBackground   : true,
		excluded          : ""
	};

	// Other Variables
	var isExcluded = false;
	var isFrame = false;
	var direction = {x: 0, y: 0};
	var initDone  = false;
	var initTried = false;
	var root = document.documentElement;
	var activeElement;
	var deltaBuffer = [120, 120, 120];

	var key = {left: 37, up: 38, right: 39, down: 40, spaceBar: 32, pageUp: 33, pageDown: 34, end: 35, home: 36};

	/***********************************************
	 * SETTINGS
	 ***********************************************/

	var options = defaultOptions;

	/***********************************************
	 * INITIALIZE
	 ***********************************************/

	/**
	 * Sets up scrolls array, determines if frames are involved.
	 */

	function init() {
		if (initTried) return;
		initTried = true;

		if (!document.body) return;

		var body = document.body;
		var html = document.documentElement;
		var windowHeight = window.innerHeight;
		var scrollHeight = body.scrollHeight;

		// Check compatibility mode for root element
		root = (document.compatMode.indexOf('CSS') >= 0) ? html : body;
		activeElement = body;

		var disableKeyboard = false;

		/**
		 * Tests if smooth scrolling is allowed. Shuts down everything if not.
		 */

		// Disable keyboard support if anything above requested it
		if (disableKeyboard) {
			removeEvent("keydown", keyDown);
		}

		if (options.keyboardSupport && !disableKeyboard) {
			addEvent("keydown", keyDown);
		}

		initDone = true;

		// Checks if this script is running in a frame
		if (top != self) {
			isFrame = true;
		} else if (scrollHeight > windowHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {
			/**
			 * This fixes a bug where the areas left and right to
			 * the content does not trigger the onMouseWheel event
			 * on some pages. e.g.: html, body { height: 100% }
			 */

			// DOMChange (throttle): fix height
			var pending = false;

			var refresh = function () {
				if (!pending && html.scrollHeight != document.height) {
					pending = true; // add a new pending action
					setTimeout(function () {
						html.style.height = document.height + 'px';
						pending = false;
					}, 500); // Act rarely to stay fast
				}
			};

			html.style.height = 'auto';
			setTimeout(refresh, 10);

			// Clear fix
			if (root.offsetHeight <= windowHeight) {
				var underlay = document.createElement("div");
				underlay.style.clear = "both";
				body.appendChild(underlay);
			}
		}

		// Disable fixed background
		if (!options.fixedBackground && !isExcluded) {
			body.style.backgroundAttachment = "scroll";
			html.style.backgroundAttachment = "scroll";
		}
	}

	/************************************************
	 * SCROLLING
	 ************************************************/

	var queue = [];
	var pending = false;
	var lastScroll = new Date;

	/**
	 * Pushes scroll actions to the scrolling queue.
	 */
	function scrollArray(elem, left, top, delay) {
		delay || (delay = 1000);
		directionCheck(left, top);

		if (options.accelerationMax != 1) {
			var elapsed = new Date - lastScroll;
			if (elapsed < options.accelerationDelta) {
				var factor = (1 + (30 / elapsed)) / 2;
				if (factor > 1) {
					factor = Math.min(factor, options.accelerationMax);
					left *= factor;
					top  *= factor;
				}
			}
			lastScroll = new Date;
		}

		// Push a scroll command
		queue.push({
			x: left,
			y: top,
			lastX: (left < 0) ? 0.99 : -0.99,
			lastY: (top  < 0) ? 0.99 : -0.99,
			start: +new Date
		});

		// Don't act if there's a pending queue
		if (pending) {
			return;
		}

		var scrollWindow = (elem === document.body);

		var step = function () {
			var now = new Date;
			var scrollX = 0;
			var scrollY = 0;

			for (var i = 0; i < queue.length; i++) {
				var item = queue[i];
				var elapsed  = now - item.start;
				var finished = (elapsed >= options.animationTime);

				// Scroll position: [0, 1]
				var position = (finished) ? 1 : elapsed / options.animationTime;

				// Easing (optional)
				if (options.pulseAlgorithm) {
					position = pulse(position);
				}

				// Only need the difference
				var x = (item.x * position - item.lastX) >> 0;
				var y = (item.y * position - item.lastY) >> 0;

				// add this to the total scrolling
				scrollX += x;
				scrollY += y;

				// Update last values
				item.lastX += x;
				item.lastY += y;

				// Delete and step back if it's over
				if (finished) {
					queue.splice(i, 1); i--;
				}
			}

			// Scroll left and top
			if (scrollWindow) {
				window.scrollBy(scrollX, scrollY);
			} else {
				if (scrollX) elem.scrollLeft += scrollX;
				if (scrollY) elem.scrollTop  += scrollY;
			}

			// Clean up if there's nothing left to do
			if (!left && !top) {
				queue = [];
			}

			if (queue.length) {
				requestFrame(step, elem, (delay / options.frameRate + 1));
			} else {
				pending = false;
			}
		};

		// Start a new queue of actions
		requestFrame(step, elem, 0);
		pending = true;
	}


	/***********************************************
	 * EVENTS
	 ***********************************************/

	/**
	 * Mouse wheel handler.
	 * @param {Object} event
	 */
	function wheel(event) {
		if (!initDone && initTried) return true;

		if (!initDone) {
			init();
		}

		var target = event.target;
		var overflowing = overflowingAncestor(target);

		// Use default if there's no overflowing
		// Element or default action is prevented
		if (!overflowing || event.defaultPrevented || isNodeName(activeElement, "embed") || (isNodeName(target, "embed") && /\.pdf/i.test(target.src))) return true;

		var deltaX = event.wheelDeltaX || 0;
		var deltaY = event.wheelDeltaY || 0;

		// Use wheelDelta if deltaX/Y is not available
		if (!deltaX && !deltaY) {
			deltaY = event.wheelDelta || 0;
		}

		// Check if it's a touchpad scroll that should be ignored
		if (!options.touchpadSupport && isTouchpad(deltaY)) {
			return
		}

		// Scale by step size
		// Delta is 120 most of the time
		// Synaptics seems to send 1 sometimes
		if (Math.abs(deltaX) > 1.2) {
			deltaX *= options.stepSize / 120;
		}
		if (Math.abs(deltaY) > 1.2) {
			deltaY *= options.stepSize / 120;
		}

		scrollArray(overflowing, -deltaX, -deltaY);
		event.preventDefault();
	}

	/**
	 * KeyDown event handler.
	 * @param {Object} event
	 */
	function keyDown(event) {
		var target = event.target;

		// Do nothing if user is editing text or using a modifier key (except shift) or in a dropdown
		if (/input|textarea|select|embed/i.test(target.nodeName) || target.isContentEditable || event.defaultPrevented || (event.ctrlKey || event.altKey || event.metaKey || (event.shiftKey && event.keyCode != key.spaceBar))) return true;

		// Space bar should trigger button press
		if (isNodeName(target, "button") && event.keyCode === key.spaceBar) {
		  return true;
		}

		var shift, x = 0, y = 0;
		var elem = overflowingAncestor(activeElement);
		var clientHeight = elem.clientHeight;

		if (elem == document.body) {
			clientHeight = window.innerHeight;
		}

		switch (event.keyCode) {
			case key.up:
				y = -options.arrowScroll;
				break;
			case key.down:
				y = options.arrowScroll;
				break;
			case key.spaceBar: // (+ shift)
				shift = event.shiftKey ? 1 : -1;
				y = -shift * clientHeight * 0.9;
				break;
			case key.pageUp:
				y = -clientHeight * 0.9;
				break;
			case key.pageDown:
				y = clientHeight * 0.9;
				break;
			case key.home:
				y = -elem.scrollTop;
				break;
			case key.end:
				var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
				y = (damt > 0) ? damt+10 : 0;
				break;
			case key.left:
				x = -options.arrowScroll;
				break;
			case key.right:
				x = options.arrowScroll;
				break;
			default:
				return true; // A key we don't care about
		}

		scrollArray(elem, x, y);
		event.preventDefault();
	}

	/**
	 * MouseDown event only for updating activeElement
	 */
	function mouseDown(event) {
		activeElement = event.target;
	}

	/***********************************************
	 * OVERFLOW
	 ***********************************************/

	var cache = {}; // Cleared out every once in while

	setInterval(function () { cache = {}; }, 10 * 1000);

	var uniqueID = (function () {
		var i = 0;
		return function (el) {
			return el.uniqueID || (el.uniqueID = i++);
		};
	})();

	function setCache(elements, overflowing) {
		for (var i = elements.length; i--;)
			cache[uniqueID(elements[i])] = overflowing;
		return overflowing;
	}

	function overflowingAncestor(value) {
		var elements = [];
		var rootScrollHeight = root.scrollHeight;
		do {
			var cached = cache[uniqueID(value)];
			if (cached) {
				return setCache(elements, cached);
			}
			elements.push(value);
			if (rootScrollHeight === value.scrollHeight) {
				if (!isFrame || root.clientHeight + 10 < rootScrollHeight) {
					return setCache(elements, document.body); // Scrolling root in WebKit
				}
			} else if (value.clientHeight + 10 < value.scrollHeight) {
				var overflow = getComputedStyle(value, "").getPropertyValue("overflow-y");
				if (overflow === "scroll" || overflow === "auto") {
					return setCache(elements, value);
				}
			}
		} while (value = value.parentNode);
	}

	/***********************************************
	 * HELPERS
	 ***********************************************/

	function addEvent(type, fn, bubble) {
		window.addEventListener(type, fn, (bubble||false));
	}

	function removeEvent(type, fn, bubble) {
		window.removeEventListener(type, fn, (bubble||false));
	}

	function isNodeName(el, tag) {
		return (el.nodeName||"").toLowerCase() === tag.toLowerCase();
	}

	function directionCheck(x, y) {
		x = (x > 0) ? 1 : -1;
		y = (y > 0) ? 1 : -1;
		if (direction.x !== x || direction.y !== y) {
			direction.x = x;
			direction.y = y;
			queue = [];
			lastScroll = 0;
		}
	}

	var deltaBufferTimer;

	function isTouchpad(deltaY) {
		if (!deltaY) return;
		deltaY = Math.abs(deltaY);
		deltaBuffer.push(deltaY);
		deltaBuffer.shift();
		clearTimeout(deltaBufferTimer);
		return !(isDivisible(deltaBuffer[0], 120) && isDivisible(deltaBuffer[1], 120) && isDivisible(deltaBuffer[2], 120));
	}

	function isDivisible(n, divisor) {
		return (n%divisor == 0);
	}

	var requestFrame = (function () {
		return  (window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback, element, delay) { deltaBufferTimer = window.setTimeout(callback, delay || (1000/60)); });
	})();

	/***********************************************
	 * PULSE
	 ***********************************************/

	/**
	 * Viscous fluid with a pulse for part and decay for the rest.
	 * - Applies a fixed force over an interval (a damped acceleration), and
	 * - Lets the exponential bleed away the velocity over a longer interval
	 * - Michael Herf, http://stereopsis.com/stopping/
	 */
	function pulse_(x) {
		var val, start, expx;
		// Test
		x = x * options.pulseScale;
		if (x < 1) { // Acceleration
			val = x - (1 - Math.exp(-x));
		} else {     // tail
			// The previous animation ended here:
			start = Math.exp(-1);
			// Simple viscous drag
			x -= 1;
			expx = 1 - Math.exp(-x);
			val = start + (expx * (1 - start));
		}
		return val * options.pulseNormalize;
	}

	function pulse(x) {
		if (x >= 1) return 1;
		if (x <= 0) return 0;

		if (options.pulseNormalize == 1) {
			options.pulseNormalize /= pulse_(1);
		}
		return pulse_(x);
	}

	var isChrome = /chrome/i.test(window.navigator.userAgent);
	var wheelEvent;

	if ("onwheel" in document.createElement("div"))
		wheelEvent = "wheel";
	else if ("onmousewheel" in document.createElement("div"))
		wheelEvent = "mousewheel";

	if (wheelEvent && isChrome) {
		addEvent(wheelEvent, wheel);
		addEvent("mousedown", mouseDown);
		addEvent("load", init);
	}
})();