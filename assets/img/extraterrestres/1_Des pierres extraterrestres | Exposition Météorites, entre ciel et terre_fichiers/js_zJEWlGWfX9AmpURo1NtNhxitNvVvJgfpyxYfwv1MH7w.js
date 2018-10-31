(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('../lib/jquery.min.js');

require('../lib/jquery.dotdotdot.min.js');

require('../lib/greensock/TweenLite.min.js');

require('../lib/greensock/TimelineLite.min.js');

require('../lib/greensock/easing/EasePack.min.js');

require('../lib/greensock/plugins/CSSPlugin.min.js');

require('../lib/greensock/plugins/ScrollToPlugin.min.js');

require('../lib/jquery.imageframe.js');

require('../lib/jquery.videoframe.js');

require('../lib/js.cookie.js');

require('../lib/hammer.min.js');

require('../global/main.js');

require('../global/menuMnhn.js');

require('../global/diaporama.js');

require('../global/slider.js');

require('../global/cookies.js');

},{"../global/cookies.js":2,"../global/diaporama.js":3,"../global/main.js":4,"../global/menuMnhn.js":5,"../global/slider.js":6,"../lib/greensock/TimelineLite.min.js":7,"../lib/greensock/TweenLite.min.js":8,"../lib/greensock/easing/EasePack.min.js":9,"../lib/greensock/plugins/CSSPlugin.min.js":10,"../lib/greensock/plugins/ScrollToPlugin.min.js":11,"../lib/hammer.min.js":12,"../lib/jquery.dotdotdot.min.js":13,"../lib/jquery.imageframe.js":14,"../lib/jquery.min.js":15,"../lib/jquery.videoframe.js":16,"../lib/js.cookie.js":17}],2:[function(require,module,exports){
'use strict';

$(document).ready(function () {

	var jCookies = $('.Cookies'),
	    jBtn = $('.Cookies-close');

	// On vérifie si le cookie existe ou non
	checkCookie();

	jBtn.click(function () {
		var tl = new TimelineLite({ onComplete: function onComplete() {
				jCookies.remove();
			} }).to($(".Cookies"), .6, { autoAlpha: 0, bottom: -40, ease: Power3.easeOut });
		tl.play();

		setCookie("cookieValid", true, 365);

		return false;
	});

	// Edite le cookie
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	// Lis les données du cookie
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1, c.length);
			}if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return null;
	}

	// Affiche le disclaimer si l'internaute n'a jamais accepté
	function checkCookie() {
		var dl = getCookie("cookieValid");
		console.log(dl);

		if (!dl) {
			jCookies.show();
			TweenLite.fromTo($(".Cookies"), .6, { autoAlpha: 0, bottom: -40 }, { autoAlpha: 1, bottom: 20, ease: Power3.easeOut });
		}
	}
});

},{}],3:[function(require,module,exports){
'use strict';

$(document).ready(function () {

    $('.flex-diaporamaContainer').each(function () {

        var $diapo = $('.flex-diaporamaSlides', this),
            $slides = $('.flex-diaporamaSlide', this),
            $nav = $('.Slider-nav a', this),
            length = $slides.length - 1,
            current = 0,
            w = 0,
            cw;

        // On calcul la taille des slides.
        $slides.each(function () {
            w += $(this).width();
        });

        // Au resize, on vérifie si le nombre de diapo est < au container, si oui alors on cache les flèches.
        function _resize() {
            cw = $('.flex-diaporama .container').innerWidth();
            if (w < cw && w != 0) {
                $nav.css('display', 'none');
            } else {
                $nav.css('display', 'block');
            }
        }

        $(window).resize(_resize);
        _resize();

        // Au click sur les flèches de navigation
        $nav.click(function () {
            if ($(this).index() == 0) {
                current = current == length ? length : current + 1;
            } else {
                current = current == 0 ? 0 : current - 1;
            }
            animateDiapo();

            return false;
        });

        // Animation du diapo
        function animateDiapo() {
            var decalageDiapo = 0;
            for (var i = 0; i < current; i++) {
                decalageDiapo = decalageDiapo + $slides.eq(i).outerWidth(true);
            }
            TweenLite.to($diapo, 0.5, { 'x': -decalageDiapo, ease: Power4.easeOut });
        }
    });
});

},{}],4:[function(require,module,exports){
'use strict';

$(document).ready(function () {

	/**
    * Au click sur le scroll de la home.
    **/
	var $goBot = $('.scrollDown');

	$goBot.click(function () {
		TweenLite.to(window, 1, { scrollTo: $(window).height() - 90, ease: Power3.easeInOut });
		return false;
	});

	/**
    * Header scroll
    **/

	if (window.matchMedia("(min-width: 992px)").matches) {

		var jbandeau = $('.MnhnHeader'),
		    bandeau = jbandeau[0],
		    jheader = $('.SiteHeader'),
		    header = jheader.length ? jheader[0] : null;

		if (header) {
			header.style.transform = "translate3d(0, 0px, 0)";
		}
		if (bandeau) {
			bandeau.style.transform = "translate3d(0, 0px, 0)";
		}

		window.addEventListener('scroll', function () {
			if (!bandeau && !header) {
				return;
			}
			var scroll = window.scrollY;
			scroll = scroll < 0 ? 0 : scroll;

			if (scroll > jbandeau.height()) {
				scroll = jbandeau.height();
			} else {
				scroll = scroll;
			}

			if (header) {
				header.style.transform = "translate3d(0," + -scroll + "px,0)";
				bandeau.style.transform = "translate3d(0," + -scroll + "px,0)";
			}
		});
	}

	/**
 * Play video
 **/
	$('.js-VideoFrame').videoframe();
	$('.flex-video').click(function () {
		$(this).find('.flex-video-img').fadeOut(300);
		$(this).find('.js-VideoFrame').videoframe("play");
	});

	/**
 * Open menu mobile
 **/
	var $btnMenu = $('.btnMenu'),
	    $iconMenu = $('.icon-menu'),
	    $nav = $('.MenuMobile');

	$btnMenu.click(function () {
		$nav.css('display', 'block');

		setTimeout(function () {
			$btnMenu.add($iconMenu).add($nav).toggleClass('isOpen');
			$('.MenuMobile .SiteHeader-subMenu').removeClass('isOpen');
		}, 16);
	});

	/**
 * Open sous-menu mobile
 **/
	var $parent = $('.MenuMobile-nav > ul > li.isParent > a,.MenuMobile-nav > ul > li.isParent > span.nolink');

	// Ouverture
	$parent.click(function () {
		var $subMenu = $(this).parent().find('> ul'),
		    titre = $(this).text();

		if ($subMenu.find('.MenuMobile-return').length < 1) {
			$subMenu.prepend('<a href="#" class="MenuMobile-return icon-arrow-left"><small>Retour</small><span class="MenuMobile-title">' + titre + '</span></a>');
		}
		$subMenu.toggleClass('isOpen');

		// Fermeture
		setTimeout(function () {
			$('.MenuMobile-return').click(function () {
				$('.MenuMobile .SiteHeader-subMenu').removeClass('isOpen');
				return false;
			});
		}, 16);

		return false;
	});

	/**
 * Affiche les infos pratique avant les siblings sur une page événement. (mobile)
 **/

	if ($('.node-type-evenement').length && $('.Siblings').length) {
		var sidebar_html = $('.Sidebar').html(),
		    $siblings = $('.Siblings');
		// On récupère le html de la sidebar. la class hidden-md-up permet d'afficher la div en mobile
		var sidebar_infos = "<div class='Sidebar hidden-md-up'>" + sidebar_html + "</div>";

		// On l'affiche avant les siblings
		$siblings.before(sidebar_infos);

		// On planque la sidebar. la class hidden-sm-downpermet de cacher la sidebar seulement en mobile
		$('aside.Sidebar').addClass('hidden-sm-down');
	}

	$('#civilizWidget-content').attr('style', 'overflow-y:inherit!important');
});

},{}],5:[function(require,module,exports){
'use strict';

$(document).ready(function () {

    // Initialisation des variables
    var $categoriesBloc = $('.MnhnMenu-categories'),
        $categories = $('.MnhnMenu-categories a'),
        $sliders = $('.MnhnMenu-slider'),
        $arrows = $('.MnhnMenu-interface a'),
        $items = $('.MnhnMenu-item'),
        itemWidth = $items.eq(0).outerWidth(true),
        itemMax = Math.floor($(window).width() / itemWidth),
        currentSlider = 0,
        offsetCategories = [],
        tabSliders = [],
        _isAnimating = false;

    // Au resize, on replace tout ça bien comme il faut
    $(window).resize(function () {
        itemWidth = $items.eq(0).outerWidth(true);
        itemMax = Math.floor($(window).width() / itemWidth);

        for (var i = 0; i < tabSliders.length; i++) {
            // On place les categories comme il faut
            if (window.matchMedia("(max-width: 992px)").matches) {
                if (i == 0) {
                    // Le premier élément tout à gauche au clic
                    offsetCategories[i] = 0;
                } else if (i == $categories.length - 1) {
                    // Le dernier élément tout à droite au clic
                    offsetCategories[i] = $categoriesBloc.outerWidth(true) - $(window).width() + 20;
                } else {
                    // Au centre
                    offsetCategories[i] = $categories.eq(i).offset().left - $(window).width() / 2 + $categories.eq(i).outerWidth(true) / 2;
                }
            } else {
                offsetCategories[i] = 0;
            }

            tabSliders[i].animateSlider();
        }
    });

    setTimeout(function () {
        $(window).resize();
    }, 16);

    // Open menu Mnhn
    $('.js-MnhnMenu').click(function () {
        $('.MnhnMenu').addClass('isOpen');
        setTimeout(function () {
            TweenLite.to(window, 1, { scrollTo: $(document).height(), ease: Power3.easeOut });
        }, 50);
        return false;
    });

    // Open menu Mnhn
    $('.MnhnMenu-close').click(function () {
        $('.MnhnMenu').removeClass('isOpen');
        return false;
    });

    // Pour chaque slider
    TweenLite.set($sliders, { autoAlpha: 0 });
    TweenLite.set($sliders.eq(0), { autoAlpha: 1 });
    $sliders.each(function (i) {
        tabSliders[i] = new MnhnSlider($sliders.eq(i));
    });

    // Au clic sur une flèche
    $arrows.click(function () {
        var slider = tabSliders[currentSlider];
        if ($(this).hasClass('next')) {
            slider.currentItem = slider.currentItem >= slider.length - itemMax ? slider.length - itemMax : slider.currentItem + 1;
        } else {
            slider.currentItem = slider.currentItem == 0 ? 0 : slider.currentItem - 1;
        }
        slider.animateSlider();

        return false;
    });

    // Au click sur une catégorie
    $categories.click(function () {
        var index = $(this).index();

        if (index != currentSlider && !_isAnimating) {
            _isAnimating = true;
            $categories.not(this).removeClass('isActive');
            $(this).addClass('isActive');
            currentSlider = index;

            var $currentSlider = $sliders.eq(currentSlider);

            var vTL = new TimelineLite({ onComplete: function onComplete() {
                    _isAnimating = false;
                } }).to($categoriesBloc, 0.4, { x: -offsetCategories[index], ease: Power4.easeOut }).to($sliders.not($currentSlider), 0.8, { autoAlpha: 0, x: -50, ease: Power4.easeOut }, '=-.6').fromTo(tabSliders[currentSlider].$el, 0.8, { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0, ease: Power4.easeOut }, "=-.2");

            vTL.play();
        }

        return false;
    });

    // Hammer Pan des catégories

    var elem = document.querySelector(".MnhnMenu-categories"),
        xPos = 0,
        lastPos = 0;

    Hammer(elem).on('pan', function (event) {
        if (window.matchMedia("(max-width: 992px)").matches) {
            var target = event.target;
            var xMin = 0;
            var xMax = -($categoriesBloc.outerWidth(true) - $(window).width() + 20);
            xPos = lastPos + event.deltaX;
            if (xPos > xMin) {
                xPos = xMin;
            }
            if (xPos < xMax) {
                xPos = xMax;
            }
            TweenLite.to($categoriesBloc, .3, { 'x': xPos + 'px', ease: Power4.easeOut });
        }
    });

    Hammer(elem).on('panend', function (event) {
        lastPos = xPos;
    });

    /**
     * MNHN SLIDER
     * Contrôle et initialise la classe Slider
     */
    function MnhnSlider(aElement) {
        var refThis = this;

        // Initialisation des variables
        this.$el = aElement;
        this.$items = $('.MnhnMenu-item', this.$el);
        this.length = this.$items.length;
        this.currentItem = 0;

        // Hammer Swipe
        var elem = this.$el[0],
            refThis = this;
        Hammer(elem).on('swipeleft', function (event) {
            if (window.matchMedia("(max-width: 992px)").matches) {
                refThis.currentItem = refThis.currentItem >= refThis.length - itemMax ? refThis.length - itemMax : refThis.currentItem + 1;
                refThis.animateSlider();
            }
        });

        Hammer(elem).on('swiperight', function (event) {
            if (window.matchMedia("(max-width: 992px)").matches) {
                refThis.currentItem = refThis.currentItem == 0 ? 0 : refThis.currentItem - 1;
                refThis.animateSlider();
            }
        });
    }

    /*
    * Fonction permettant l'animation du slider
    */
    MnhnSlider.prototype.animateSlider = function () {
        var refThis = this;
        TweenLite.to(this.$el, 0.6, { 'margin-left': -refThis.currentItem * itemWidth, ease: Power4.easeOut });
    };
});

},{}],6:[function(require,module,exports){
'use strict';

$(function () {

    // Je créer mon slider
    var Slider = function Slider($el) {

        this.$el = $el;
        this.slide = $('.flex-sliderImg', this.$el);
        this.container = $('.flex-sliderContainer', this.$el);
        this.next = $('.icon-long-arrow-right', this.$el);
        this.prev = $('.icon-long-arrow-left', this.$el);
        this.current = 0;
        this.length = this.slide.length;
        this.vw;
    };

    /**
    *  Initialisation du slider.
    **/
    Slider.prototype.init = function () {

        var refThis = this;
        // On init le resize a l'init
        this._resize();
        // On init les clicks
        this.initNavigation();

        // On créé la div qui contiendra la légende de l'image
        var htmlCpation = '<div class=\'flex-slider-figcaption\'></div>';
        this.$el.parent().append(htmlCpation);

        $(window).resize(function () {
            refThis._resize();
        });
        this._resize();
    };

    /**
    * Initialisation de la navigation du slider
    **/
    Slider.prototype.initNavigation = function () {
        // Quand on créer une autre fonction à l'interieur d'un proto, on change de scope donc on créer une référence vers notre objet.
        var refThis = this;
        this.next.click(function () {
            refThis.nextSlide();return false;
        });
        this.prev.click(function () {
            refThis.prevSlide();return false;
        });
    };

    /**
    *  Appel de la slide suivante.
    **/
    Slider.prototype.nextSlide = function () {
        this.current++;

        this.animateSlider();
        return false;
    };

    /**
    *  Appel de la slide précédente.
    **/
    Slider.prototype.prevSlide = function () {
        this.current--;

        this.animateSlider();
        return false;
    };

    /**
    *  Resize du slider
    **/
    Slider.prototype._resize = function () {
        // Taille du slider
        this.vw = this.$el.innerWidth();
        //La taille des slides = taille du slider
        this.slide.width(this.vw);
        $('.flex-slider-figcaption').width(this.vw);
        // Le container fait la taille du slider * le nombre de slide
        this.container.width(this.vw * this.length);

        this.animateSlider();
    };

    /**
    *  Animation du slider
    **/
    Slider.prototype.animateSlider = function () {

        var tl = new TimelineLite();
        if (this.current <= 0) {
            this.current = 0;
        }
        if (this.current >= this.length - 1) {
            this.current = this.length - 1;
        }

        // On récupère le data-caption de l'img à l'interieur de la slide courante.
        this.slide.caption = this.slide.eq(this.current).children('img').data('caption');

        // On change le texte de la légende
        $('.flex-slider-figcaption').text(this.slide.caption);

        tl.to(this.container, 0.5, { x: -this.current * this.vw });
    };

    /****************
    ** Slider EDITO
    ****************/
    if ($('.flex-slider').length) {
        var SliderFiche = new Slider($(".flex-slider"));
        SliderFiche.init();
    }

    /****************
    ** Slider DOSSIER
    ****************/

    // Si on est sur un Slider Dossier.
    if ($('.Slider').length) {

        // On créé la class Slider Dossier.
        var SliderDossier = function SliderDossier($el) {
            this.$el = $el;
            this.slide = $('.Slider-slide', this.$el);
            this.container = $('.Slider-container', this.$el);
            this.next = $('.icon-long-arrow-right', this.$el);
            this.prev = $('.icon-long-arrow-left', this.$el);
            this.current = 0;
            this.length = this.slide.length;
            this.dots = $('.Slider-dots a'), this.$el;
        };

        //On hérite du prototype de Slider


        SliderDossier.prototype = new Slider();
        SliderDossier.prototype.initNavigation = function () {

            // On appel la fonction du prototype parent et on applique les nouveaux arguments pour cette instance.
            Slider.prototype.initNavigation.apply(this, []);

            var refThis = this;
            this.dots.click(function () {
                refThis.current = $(this).index();
                refThis.animateSlider();
                return false;
            });
        };

        SliderDossier.prototype.animateSlider = function () {

            // On appel la fonction du prototype parent et on applique les nouveaux arguments pour cette instance.
            Slider.prototype.animateSlider.apply(this, []);

            this.dots.removeClass('isActive');
            this.dots.eq(this.current).addClass('isActive');
        };

        // On Créé un Objet Slider_dossier
        var mySlider = new SliderDossier($('.Slider'));

        // On l'initialise
        mySlider.init();
    }
});

},{}],7:[function(require,module,exports){
"use strict";

/*!
 * VERSION: 1.12.1
 * DATE: 2014-06-26
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue || (window._gsQueue = [])).push(function () {
  "use strict";
  window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
    var s = function s(t) {
      e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;var i,
          s,
          r = this.vars;for (s in r) {
        i = r[s], a(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
      }a(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger);
    },
        r = 1e-10,
        n = i._internals.isSelector,
        a = i._internals.isArray,
        o = [],
        h = window._gsDefine.globals,
        l = function l(t) {
      var e,
          i = {};for (e in t) {
        i[e] = t[e];
      }return i;
    },
        _ = function _(t, e, i, s) {
      t._timeline.pause(t._startTime), e && e.apply(s || t._timeline, i || o);
    },
        u = o.slice,
        f = s.prototype = new e();return s.version = "1.12.1", f.constructor = s, f.kill()._gc = !1, f.to = function (t, e, s, r) {
      var n = s.repeat && h.TweenMax || i;return e ? this.add(new n(t, e, s), r) : this.set(t, s, r);
    }, f.from = function (t, e, s, r) {
      return this.add((s.repeat && h.TweenMax || i).from(t, e, s), r);
    }, f.fromTo = function (t, e, s, r, n) {
      var a = r.repeat && h.TweenMax || i;return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n);
    }, f.staggerTo = function (t, e, r, a, o, h, _, f) {
      var p,
          c = new s({ onComplete: h, onCompleteParams: _, onCompleteScope: f, smoothChildTiming: this.smoothChildTiming });for ("string" == typeof t && (t = i.selector(t) || t), n(t) && (t = u.call(t, 0)), a = a || 0, p = 0; t.length > p; p++) {
        r.startAt && (r.startAt = l(r.startAt)), c.to(t[p], e, l(r), p * a);
      }return this.add(c, o);
    }, f.staggerFrom = function (t, e, i, s, r, n, a, o) {
      return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o);
    }, f.staggerFromTo = function (t, e, i, s, r, n, a, o, h) {
      return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h);
    }, f.call = function (t, e, s, r) {
      return this.add(i.delayedCall(0, t, e, s), r);
    }, f.set = function (t, e, s) {
      return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s);
    }, s.exportRoot = function (t, e) {
      t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);var r,
          n,
          a = new s(t),
          o = a._timeline;for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) {
        n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
      }return o.add(a, 0), a;
    }, f.add = function (r, n, o, h) {
      var l, _, u, f, p, c;if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
        if (r instanceof Array || r && r.push && a(r)) {
          for (o = o || "normal", h = h || 0, l = n, _ = r.length, u = 0; _ > u; u++) {
            a(f = r[u]) && (f = new s({ tweens: f })), this.add(f, l), "string" != typeof f && "function" != typeof f && ("sequence" === o ? l = f._startTime + f.totalDuration() / f._timeScale : "start" === o && (f._startTime -= f.delay())), l += h;
          }return this._uncache(!0);
        }if ("string" == typeof r) return this.addLabel(r, n);if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";r = i.delayedCall(0, r);
      }if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (p = this, c = p.rawTime() > r._startTime; p._timeline;) {
        c && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
      }return this;
    }, f.remove = function (e) {
      if (e instanceof t) return this._remove(e, !1);if (e instanceof Array || e && e.push && a(e)) {
        for (var i = e.length; --i > -1;) {
          this.remove(e[i]);
        }return this;
      }return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e);
    }, f._remove = function (t, i) {
      e.prototype._remove.call(this, t, i);var s = this._last;return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this;
    }, f.append = function (t, e) {
      return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
    }, f.insert = f.insertMultiple = function (t, e, i, s) {
      return this.add(t, e || 0, i, s);
    }, f.appendMultiple = function (t, e, i, s) {
      return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s);
    }, f.addLabel = function (t, e) {
      return this._labels[t] = this._parseTimeOrLabel(e), this;
    }, f.addPause = function (t, e, i, s) {
      return this.call(_, ["{self}", e, i, s], this, t);
    }, f.removeLabel = function (t) {
      return delete this._labels[t], this;
    }, f.getLabelTime = function (t) {
      return null != this._labels[t] ? this._labels[t] : -1;
    }, f._parseTimeOrLabel = function (e, i, s, r) {
      var n;if (r instanceof t && r.timeline === this) this.remove(r);else if (r && (r instanceof Array || r.push && a(r))) for (n = r.length; --n > -1;) {
        r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
      }if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());else {
        if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration();
      }return Number(e) + i;
    }, f.seek = function (t, e) {
      return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1);
    }, f.stop = function () {
      return this.paused(!0);
    }, f.gotoAndPlay = function (t, e) {
      return this.play(t, e);
    }, f.gotoAndStop = function (t, e) {
      return this.pause(t, e);
    }, f.render = function (t, e, i) {
      this._gc && this._enabled(!0, !1);var s,
          n,
          a,
          h,
          l,
          _ = this._dirty ? this.totalDuration() : this._totalDuration,
          u = this._time,
          f = this._startTime,
          p = this._timeScale,
          c = this._paused;if (t >= _ ? (this._totalTime = this._time = _, this._reversed || this._hasPausedChild() || (n = !0, h = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = _ + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== u || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (h = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (l = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== u && this._first || i || l) {
        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== u && t > 0 && (this._active = !0), 0 === u && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || o)), this._time >= u) for (s = this._first; s && (a = s._next, !this._paused || c);) {
          (s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
        } else for (s = this._last; s && (a = s._prev, !this._paused || c);) {
          (s._active || u >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
        }this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o)), h && (this._gc || (f === this._startTime || p !== this._timeScale) && (0 === this._time || _ >= this.totalDuration()) && (n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || o)));
      }
    }, f._hasPausedChild = function () {
      for (var t = this._first; t;) {
        if (t._paused || t instanceof s && t._hasPausedChild()) return !0;t = t._next;
      }return !1;
    }, f.getChildren = function (t, e, s, r) {
      r = r || -9999999999;for (var n = [], a = this._first, o = 0; a;) {
        r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
      }return n;
    }, f.getTweensOf = function (t, e) {
      var s,
          r,
          n = this._gc,
          a = [],
          o = 0;for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1;) {
        (s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
      }return n && this._enabled(!1, !0), a;
    }, f._contains = function (t) {
      for (var e = t.timeline; e;) {
        if (e === this) return !0;e = e.timeline;
      }return !1;
    }, f.shiftChildren = function (t, e, i) {
      i = i || 0;for (var s, r = this._first, n = this._labels; r;) {
        r._startTime >= i && (r._startTime += t), r = r._next;
      }if (e) for (s in n) {
        n[s] >= i && (n[s] += t);
      }return this._uncache(!0);
    }, f._kill = function (t, e) {
      if (!t && !e) return this._enabled(!1, !1);for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;) {
        i[s]._kill(t, e) && (r = !0);
      }return r;
    }, f.clear = function (t) {
      var e = this.getChildren(!1, !0, !0),
          i = e.length;for (this._time = this._totalTime = 0; --i > -1;) {
        e[i]._enabled(!1, !1);
      }return t !== !1 && (this._labels = {}), this._uncache(!0);
    }, f.invalidate = function () {
      for (var t = this._first; t;) {
        t.invalidate(), t = t._next;
      }return this;
    }, f._enabled = function (t, i) {
      if (t === this._gc) for (var s = this._first; s;) {
        s._enabled(t, !0), s = s._next;
      }return e.prototype._enabled.call(this, t, i);
    }, f.duration = function (t) {
      return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration);
    }, f.totalDuration = function (t) {
      if (!arguments.length) {
        if (this._dirty) {
          for (var e, i, s = 0, r = this._last, n = 999999999999; r;) {
            e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
          }this._duration = this._totalDuration = s, this._dirty = !1;
        }return this._totalDuration;
      }return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this;
    }, f.usesFrames = function () {
      for (var e = this._timeline; e._timeline;) {
        e = e._timeline;
      }return e === t._rootFramesTimeline;
    }, f.rawTime = function () {
      return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
    }, s;
  }, !0);
}), window._gsDefine && window._gsQueue.pop()();

},{}],8:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * VERSION: 1.12.1
 * DATE: 2014-06-26
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function (t) {
  "use strict";
  var e = t.GreenSockGlobals || t;if (!e.TweenLite) {
    var i,
        s,
        n,
        r,
        a,
        o = function o(t) {
      var i,
          s = t.split("."),
          n = e;for (i = 0; s.length > i; i++) {
        n[s[i]] = n = n[s[i]] || {};
      }return n;
    },
        l = o("com.greensock"),
        h = 1e-10,
        _ = [].slice,
        u = function u() {},
        m = function () {
      var t = Object.prototype.toString,
          e = t.call([]);return function (i) {
        return null != i && (i instanceof Array || "object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) && !!i.push && t.call(i) === e);
      };
    }(),
        f = {},
        p = function p(i, s, n, r) {
      this.sc = f[i] ? f[i].sc : [], f[i] = this, this.gsClass = null, this.func = n;var a = [];this.check = function (l) {
        for (var h, _, u, m, c = s.length, d = c; --c > -1;) {
          (h = f[s[c]] || new p(s[c], [])).gsClass ? (a[c] = h.gsClass, d--) : l && h.sc.push(this);
        }if (0 === d && n) for (_ = ("com.greensock." + i).split("."), u = _.pop(), m = o(_.join("."))[u] = this.gsClass = n.apply(n, a), r && (e[u] = m, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + i.split(".").join("/"), [], function () {
          return m;
        }) : "undefined" != typeof module && module.exports && (module.exports = m)), c = 0; this.sc.length > c; c++) {
          this.sc[c].check();
        }
      }, this.check(!0);
    },
        c = t._gsDefine = function (t, e, i, s) {
      return new p(t, e, i, s);
    },
        d = l._class = function (t, e, i) {
      return e = e || function () {}, c(t, [], function () {
        return e;
      }, i), e;
    };c.globals = e;var v = [0, 0, 1, 1],
        g = [],
        T = d("easing.Ease", function (t, e, i, s) {
      this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? v.concat(e) : v;
    }, !0),
        y = T.map = {},
        w = T.register = function (t, e, i, s) {
      for (var n, r, a, o, h = e.split(","), _ = h.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;) {
        for (r = h[_], n = s ? d("easing." + r, null, !0) : l.easing[r] || {}, a = u.length; --a > -1;) {
          o = u[a], y[r + "." + o] = y[o + r] = n[o] = t.getRatio ? t : t[o] || new t();
        }
      }
    };for (n = T.prototype, n._calcEnd = !1, n.getRatio = function (t) {
      if (this._func) return this._params[0] = t, this._func.apply(null, this._params);var e = this._type,
          i = this._power,
          s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2;
    }, i = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], s = i.length; --s > -1;) {
      n = i[s] + ",Power" + s, w(new T(null, null, 1, s), n, "easeOut", !0), w(new T(null, null, 2, s), n, "easeIn" + (0 === s ? ",easeNone" : "")), w(new T(null, null, 3, s), n, "easeInOut");
    }y.linear = l.easing.Linear.easeIn, y.swing = l.easing.Quad.easeInOut;var P = d("events.EventDispatcher", function (t) {
      this._listeners = {}, this._eventTarget = t || this;
    });n = P.prototype, n.addEventListener = function (t, e, i, s, n) {
      n = n || 0;var o,
          l,
          h = this._listeners[t],
          _ = 0;for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;) {
        o = h[l], o.c === e && o.s === i ? h.splice(l, 1) : 0 === _ && n > o.pr && (_ = l + 1);
      }h.splice(_, 0, { c: e, s: i, up: s, pr: n }), this !== r || a || r.wake();
    }, n.removeEventListener = function (t, e) {
      var i,
          s = this._listeners[t];if (s) for (i = s.length; --i > -1;) {
        if (s[i].c === e) return s.splice(i, 1), void 0;
      }
    }, n.dispatchEvent = function (t) {
      var e,
          i,
          s,
          n = this._listeners[t];if (n) for (e = n.length, i = this._eventTarget; --e > -1;) {
        s = n[e], s.up ? s.c.call(s.s || i, { type: t, target: i }) : s.c.call(s.s || i);
      }
    };var k = t.requestAnimationFrame,
        b = t.cancelAnimationFrame,
        A = Date.now || function () {
      return new Date().getTime();
    },
        S = A();for (i = ["ms", "moz", "webkit", "o"], s = i.length; --s > -1 && !k;) {
      k = t[i[s] + "RequestAnimationFrame"], b = t[i[s] + "CancelAnimationFrame"] || t[i[s] + "CancelRequestAnimationFrame"];
    }d("Ticker", function (t, e) {
      var i,
          s,
          n,
          o,
          l,
          _ = this,
          m = A(),
          f = e !== !1 && k,
          p = 500,
          c = 33,
          d = function d(t) {
        var e,
            r,
            a = A() - S;a > p && (m += a - c), S += a, _.time = (S - m) / 1e3, e = _.time - l, (!i || e > 0 || t === !0) && (_.frame++, l += e + (e >= o ? .004 : o - e), r = !0), t !== !0 && (n = s(d)), r && _.dispatchEvent("tick");
      };P.call(_), _.time = _.frame = 0, _.tick = function () {
        d(!0);
      }, _.lagSmoothing = function (t, e) {
        p = t || 1 / h, c = Math.min(e, p, 0);
      }, _.sleep = function () {
        null != n && (f && b ? b(n) : clearTimeout(n), s = u, n = null, _ === r && (a = !1));
      }, _.wake = function () {
        null !== n ? _.sleep() : _.frame > 10 && (S = A() - p + 5), s = 0 === i ? u : f && k ? k : function (t) {
          return setTimeout(t, 0 | 1e3 * (l - _.time) + 1);
        }, _ === r && (a = !0), d(2);
      }, _.fps = function (t) {
        return arguments.length ? (i = t, o = 1 / (i || 60), l = this.time + o, _.wake(), void 0) : i;
      }, _.useRAF = function (t) {
        return arguments.length ? (_.sleep(), f = t, _.fps(i), void 0) : f;
      }, _.fps(t), setTimeout(function () {
        f && (!n || 5 > _.frame) && _.useRAF(!1);
      }, 1500);
    }), n = l.Ticker.prototype = new l.events.EventDispatcher(), n.constructor = l.Ticker;var x = d("core.Animation", function (t, e) {
      if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, B) {
        a || r.wake();var i = this.vars.useFrames ? Q : B;i.add(this, i._time), this.vars.paused && this.paused(!0);
      }
    });r = x.ticker = new l.Ticker(), n = x.prototype, n._dirty = n._gc = n._initted = n._paused = !1, n._totalTime = n._time = 0, n._rawPrevTime = -1, n._next = n._last = n._onUpdate = n._timeline = n.timeline = null, n._paused = !1;var C = function C() {
      a && A() - S > 2e3 && r.wake(), setTimeout(C, 2e3);
    };C(), n.play = function (t, e) {
      return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
    }, n.pause = function (t, e) {
      return null != t && this.seek(t, e), this.paused(!0);
    }, n.resume = function (t, e) {
      return null != t && this.seek(t, e), this.paused(!1);
    }, n.seek = function (t, e) {
      return this.totalTime(Number(t), e !== !1);
    }, n.restart = function (t, e) {
      return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0);
    }, n.reverse = function (t, e) {
      return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
    }, n.render = function () {}, n.invalidate = function () {
      return this;
    }, n.isActive = function () {
      var t,
          e = this._timeline,
          i = this._startTime;return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t;
    }, n._enabled = function (t, e) {
      return a || r.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1;
    }, n._kill = function () {
      return this._enabled(!1, !1);
    }, n.kill = function (t, e) {
      return this._kill(t, e), this;
    }, n._uncache = function (t) {
      for (var e = t ? this : this.timeline; e;) {
        e._dirty = !0, e = e.timeline;
      }return this;
    }, n._swapSelfInParams = function (t) {
      for (var e = t.length, i = t.concat(); --e > -1;) {
        "{self}" === t[e] && (i[e] = this);
      }return i;
    }, n.eventCallback = function (t, e, i, s) {
      if ("on" === (t || "").substr(0, 2)) {
        var n = this.vars;if (1 === arguments.length) return n[t];null == e ? delete n[t] : (n[t] = e, n[t + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, n[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e);
      }return this;
    }, n.delay = function (t) {
      return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay;
    }, n.duration = function (t) {
      return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration);
    }, n.totalDuration = function (t) {
      return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration;
    }, n.time = function (t, e) {
      return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time;
    }, n.totalTime = function (t, e, i) {
      if (a || r.wake(), !arguments.length) return this._totalTime;if (this._timeline) {
        if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
          this._dirty && this.totalDuration();var s = this._totalDuration,
              n = this._timeline;if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? s - t : t) / this._timeScale, n._dirty || this._uncache(!1), n._timeline) for (; n._timeline;) {
            n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0), n = n._timeline;
          }
        }this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), z.length && q());
      }return this;
    }, n.progress = n.totalProgress = function (t, e) {
      return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration();
    }, n.startTime = function (t) {
      return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime;
    }, n.timeScale = function (t) {
      if (!arguments.length) return this._timeScale;if (t = t || h, this._timeline && this._timeline.smoothChildTiming) {
        var e = this._pauseTime,
            i = e || 0 === e ? e : this._timeline.totalTime();this._startTime = i - (i - this._startTime) * this._timeScale / t;
      }return this._timeScale = t, this._uncache(!1);
    }, n.reversed = function (t) {
      return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed;
    }, n.paused = function (t) {
      if (!arguments.length) return this._paused;if (t != this._paused && this._timeline) {
        a || t || r.wake();var e = this._timeline,
            i = e.rawTime(),
            s = i - this._pauseTime;!t && e.smoothChildTiming && (this._startTime += s, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== s && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0);
      }return this._gc && !t && this._enabled(!0, !1), this;
    };var R = d("core.SimpleTimeline", function (t) {
      x.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0;
    });n = R.prototype = new x(), n.constructor = R, n.kill()._gc = !1, n._first = n._last = null, n._sortChildren = !1, n.add = n.insert = function (t, e) {
      var i, s;if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren) for (s = t._startTime; i && i._startTime > s;) {
        i = i._prev;
      }return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this;
    }, n._remove = function (t, e) {
      return t.timeline === this && (e || t._enabled(!1, !0), t.timeline = null, t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), this._timeline && this._uncache(!0)), this;
    }, n.render = function (t, e, i) {
      var s,
          n = this._first;for (this._totalTime = this._time = this._rawPrevTime = t; n;) {
        s = n._next, (n._active || t >= n._startTime && !n._paused) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s;
      }
    }, n.rawTime = function () {
      return a || r.wake(), this._totalTime;
    };var D = d("TweenLite", function (e, i, s) {
      if (x.call(this, i, s), this.render = D.prototype.render, null == e) throw "Cannot tween a null target.";this.target = e = "string" != typeof e ? e : D.selector(e) || e;var n,
          r,
          a,
          o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
          l = this.vars.overwrite;if (this._overwrite = l = null == l ? G[D.defaultOverwrite] : "number" == typeof l ? l >> 0 : G[l], (o || e instanceof Array || e.push && m(e)) && "number" != typeof e[0]) for (this._targets = a = _.call(e, 0), this._propLookup = [], this._siblings = [], n = 0; a.length > n; n++) {
        r = a[n], r ? "string" != typeof r ? r.length && r !== t && r[0] && (r[0] === t || r[0].nodeType && r[0].style && !r.nodeType) ? (a.splice(n--, 1), this._targets = a = a.concat(_.call(r, 0))) : (this._siblings[n] = M(r, this, !1), 1 === l && this._siblings[n].length > 1 && $(r, this, null, 1, this._siblings[n])) : (r = a[n--] = D.selector(r), "string" == typeof r && a.splice(n + 1, 1)) : a.splice(n--, 1);
      } else this._propLookup = {}, this._siblings = M(e, this, !1), 1 === l && this._siblings.length > 1 && $(e, this, null, 1, this._siblings);(this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -h, this.render(-this._delay));
    }, !0),
        I = function I(e) {
      return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType);
    },
        E = function E(t, e) {
      var i,
          s = {};for (i in t) {
        j[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!L[i] || L[i] && L[i]._autoCSS) || (s[i] = t[i], delete t[i]);
      }t.css = s;
    };n = D.prototype = new x(), n.constructor = D, n.kill()._gc = !1, n.ratio = 0, n._firstPT = n._targets = n._overwrittenProps = n._startAt = null, n._notifyPluginsOfEnabled = n._lazy = !1, D.version = "1.12.1", D.defaultEase = n._ease = new T(null, null, 1, 1), D.defaultOverwrite = "auto", D.ticker = r, D.autoSleep = !0, D.lagSmoothing = function (t, e) {
      r.lagSmoothing(t, e);
    }, D.selector = t.$ || t.jQuery || function (e) {
      return t.$ ? (D.selector = t.$, t.$(e)) : t.document ? t.document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e;
    };var z = [],
        O = {},
        N = D._internals = { isArray: m, isSelector: I, lazyTweens: z },
        L = D._plugins = {},
        U = N.tweenLookup = {},
        F = 0,
        j = N.reservedProps = { ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, immediateRender: 1, repeat: 1, repeatDelay: 1, data: 1, paused: 1, reversed: 1, autoCSS: 1, lazy: 1 },
        G = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0 },
        Q = x._rootFramesTimeline = new R(),
        B = x._rootTimeline = new R(),
        q = function q() {
      var t = z.length;for (O = {}; --t > -1;) {
        i = z[t], i && i._lazy !== !1 && (i.render(i._lazy, !1, !0), i._lazy = !1);
      }z.length = 0;
    };B._startTime = r.time, Q._startTime = r.frame, B._active = Q._active = !0, setTimeout(q, 1), x._updateRoot = D.render = function () {
      var t, e, i;if (z.length && q(), B.render((r.time - B._startTime) * B._timeScale, !1, !1), Q.render((r.frame - Q._startTime) * Q._timeScale, !1, !1), z.length && q(), !(r.frame % 120)) {
        for (i in U) {
          for (e = U[i].tweens, t = e.length; --t > -1;) {
            e[t]._gc && e.splice(t, 1);
          }0 === e.length && delete U[i];
        }if (i = B._first, (!i || i._paused) && D.autoSleep && !Q._first && 1 === r._listeners.tick.length) {
          for (; i && i._paused;) {
            i = i._next;
          }i || r.sleep();
        }
      }
    }, r.addEventListener("tick", x._updateRoot);var M = function M(t, e, i) {
      var s,
          n,
          r = t._gsTweenID;if (U[r || (t._gsTweenID = r = "t" + F++)] || (U[r] = { target: t, tweens: [] }), e && (s = U[r].tweens, s[n = s.length] = e, i)) for (; --n > -1;) {
        s[n] === e && s.splice(n, 1);
      }return U[r].tweens;
    },
        $ = function $(t, e, i, s, n) {
      var r, a, o, l;if (1 === s || s >= 4) {
        for (l = n.length, r = 0; l > r; r++) {
          if ((o = n[r]) !== e) o._gc || o._enabled(!1, !1) && (a = !0);else if (5 === s) break;
        }return a;
      }var _,
          u = e._startTime + h,
          m = [],
          f = 0,
          p = 0 === e._duration;for (r = n.length; --r > -1;) {
        (o = n[r]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (_ = _ || K(e, 0, p), 0 === K(o, _, p) && (m[f++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((p || !o._initted) && 2e-10 >= u - o._startTime || (m[f++] = o)));
      }for (r = f; --r > -1;) {
        o = m[r], 2 === s && o._kill(i, t) && (a = !0), (2 !== s || !o._firstPT && o._initted) && o._enabled(!1, !1) && (a = !0);
      }return a;
    },
        K = function K(t, e, i) {
      for (var s = t._timeline, n = s._timeScale, r = t._startTime; s._timeline;) {
        if (r += s._startTime, n *= s._timeScale, s._paused) return -100;s = s._timeline;
      }return r /= n, r > e ? r - e : i && r === e || !t._initted && 2 * h > r - e ? h : (r += t.totalDuration() / t._timeScale / n) > e + h ? 0 : r - e - h;
    };n._init = function () {
      var t,
          e,
          i,
          s,
          n,
          r = this.vars,
          a = this._overwrittenProps,
          o = this._duration,
          l = !!r.immediateRender,
          h = r.ease;if (r.startAt) {
        this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), n = {};for (s in r.startAt) {
          n[s] = r.startAt[s];
        }if (n.overwrite = !1, n.immediateRender = !0, n.lazy = l && r.lazy !== !1, n.startAt = n.delay = null, this._startAt = D.to(this.target, 0, n), l) if (this._time > 0) this._startAt = null;else if (0 !== o) return;
      } else if (r.runBackwards && 0 !== o) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;else {
        i = {};for (s in r) {
          j[s] && "autoCSS" !== s || (i[s] = r[s]);
        }if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && r.lazy !== !1, i.immediateRender = l, this._startAt = D.to(this.target, 0, i), l) {
          if (0 === this._time) return;
        } else this._startAt._init(), this._startAt._enabled(!1);
      }if (this._ease = h ? h instanceof T ? r.easeParams instanceof Array ? h.config.apply(h, r.easeParams) : h : "function" == typeof h ? new T(h, r.easeParams) : y[h] || D.defaultEase : D.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (t = this._targets.length; --t > -1;) {
        this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
      } else e = this._initProps(this.target, this._propLookup, this._siblings, a);if (e && D._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards) for (i = this._firstPT; i;) {
        i.s += i.c, i.c = -i.c, i = i._next;
      }this._onUpdate = r.onUpdate, this._initted = !0;
    }, n._initProps = function (e, i, s, n) {
      var r, a, o, l, h, _;if (null == e) return !1;O[e._gsTweenID] && q(), this.vars.css || e.style && e !== t && e.nodeType && L.css && this.vars.autoCSS !== !1 && E(this.vars, e);for (r in this.vars) {
        if (_ = this.vars[r], j[r]) _ && (_ instanceof Array || _.push && m(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[r] = _ = this._swapSelfInParams(_, this));else if (L[r] && (l = new L[r]())._onInitTween(e, this.vars[r], this)) {
          for (this._firstPT = h = { _next: this._firstPT, t: l, p: "setRatio", s: 0, c: 1, f: !0, n: r, pg: !0, pr: l._priority }, a = l._overwriteProps.length; --a > -1;) {
            i[l._overwriteProps[a]] = this._firstPT;
          }(l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0);
        } else this._firstPT = i[r] = h = { _next: this._firstPT, t: e, p: r, f: "function" == typeof e[r], n: r, pg: !1, pr: 0 }, h.s = h.f ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r]), h.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - h.s || 0;h && h._next && (h._next._prev = h);
      }return n && this._kill(n, e) ? this._initProps(e, i, s, n) : this._overwrite > 1 && this._firstPT && s.length > 1 && $(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, n)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (O[e._gsTweenID] = !0), o);
    }, n.render = function (t, e, i) {
      var s,
          n,
          r,
          a,
          o = this._time,
          l = this._duration,
          _ = this._rawPrevTime;if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, n = "onComplete"), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > _ || _ === h) && _ !== t && (i = !0, _ > h && (n = "onReverseComplete")), this._rawPrevTime = a = !e || t || _ === t ? t : h);else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && _ > 0 && _ !== h) && (n = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (_ >= 0 && (i = !0), this._rawPrevTime = a = !e || t || _ === t ? t : h)) : this._initted || (i = !0);else if (this._totalTime = this._time = t, this._easeType) {
        var u = t / l,
            m = this._easeType,
            f = this._easePower;(1 === m || 3 === m && u >= .5) && (u = 1 - u), 3 === m && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), this.ratio = 1 === m ? 1 - u : 2 === m ? u : .5 > t / l ? u / 2 : 1 - u / 2;
      } else this.ratio = this._ease.getRatio(t / l);if (this._time !== o || i) {
        if (!this._initted) {
          if (this._init(), !this._initted || this._gc) return;if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = _, z.push(this), this._lazy = t, void 0;this._time && !s ? this.ratio = this._ease.getRatio(this._time / l) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
        }for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || g))), r = this._firstPT; r;) {
          r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s, r = r._next;
        }this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || g)), n && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this.vars[n].apply(this.vars[n + "Scope"] || this, this.vars[n + "Params"] || g), 0 === l && this._rawPrevTime === h && a !== h && (this._rawPrevTime = 0)));
      }
    }, n._kill = function (t, e) {
      if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;var i, s, n, r, a, o, l, h;if ((m(e) || I(e)) && "number" != typeof e[0]) for (i = e.length; --i > -1;) {
        this._kill(t, e[i]) && (o = !0);
      } else {
        if (this._targets) {
          for (i = this._targets.length; --i > -1;) {
            if (e === this._targets[i]) {
              a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], s = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";break;
            }
          }
        } else {
          if (e !== this.target) return !1;a = this._propLookup, s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all";
        }if (a) {
          l = t || a, h = t !== s && "all" !== s && t !== a && ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) || !t._tempKill);for (n in l) {
            (r = a[n]) && (r.pg && r.t._kill(l) && (o = !0), r.pg && 0 !== r.t._overwriteProps.length || (r._prev ? r._prev._next = r._next : r === this._firstPT && (this._firstPT = r._next), r._next && (r._next._prev = r._prev), r._next = r._prev = null), delete a[n]), h && (s[n] = 1);
          }!this._firstPT && this._initted && this._enabled(!1, !1);
        }
      }return o;
    }, n.invalidate = function () {
      return this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = this._lazy = !1, this._propLookup = this._targets ? {} : [], this;
    }, n._enabled = function (t, e) {
      if (a || r.wake(), t && this._gc) {
        var i,
            s = this._targets;if (s) for (i = s.length; --i > -1;) {
          this._siblings[i] = M(s[i], this, !0);
        } else this._siblings = M(this.target, this, !0);
      }return x.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? D._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1;
    }, D.to = function (t, e, i) {
      return new D(t, e, i);
    }, D.from = function (t, e, i) {
      return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new D(t, e, i);
    }, D.fromTo = function (t, e, i, s) {
      return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new D(t, e, s);
    }, D.delayedCall = function (t, e, i, s, n) {
      return new D(e, 0, { delay: t, onComplete: e, onCompleteParams: i, onCompleteScope: s, onReverseComplete: e, onReverseCompleteParams: i, onReverseCompleteScope: s, immediateRender: !1, useFrames: n, overwrite: 0 });
    }, D.set = function (t, e) {
      return new D(t, 0, e);
    }, D.getTweensOf = function (t, e) {
      if (null == t) return [];t = "string" != typeof t ? t : D.selector(t) || t;var i, s, n, r;if ((m(t) || I(t)) && "number" != typeof t[0]) {
        for (i = t.length, s = []; --i > -1;) {
          s = s.concat(D.getTweensOf(t[i], e));
        }for (i = s.length; --i > -1;) {
          for (r = s[i], n = i; --n > -1;) {
            r === s[n] && s.splice(i, 1);
          }
        }
      } else for (s = M(t).concat(), i = s.length; --i > -1;) {
        (s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
      }return s;
    }, D.killTweensOf = D.killDelayedCallsTo = function (t, e, i) {
      "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (i = e, e = !1);for (var s = D.getTweensOf(t, e), n = s.length; --n > -1;) {
        s[n]._kill(i, t);
      }
    };var H = d("plugins.TweenPlugin", function (t, e) {
      this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = H.prototype;
    }, !0);if (n = H.prototype, H.version = "1.10.1", H.API = 2, n._firstPT = null, n._addTween = function (t, e, i, s, n, r) {
      var a, o;return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = { _next: this._firstPT, t: t, p: e, s: i, c: a, f: "function" == typeof t[e], n: n || e, r: r }, o._next && (o._next._prev = o), o) : void 0;
    }, n.setRatio = function (t) {
      for (var e, i = this._firstPT, s = 1e-6; i;) {
        e = i.c * t + i.s, i.r ? e = Math.round(e) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next;
      }
    }, n._kill = function (t) {
      var e,
          i = this._overwriteProps,
          s = this._firstPT;if (null != t[this._propName]) this._overwriteProps = [];else for (e = i.length; --e > -1;) {
        null != t[i[e]] && i.splice(e, 1);
      }for (; s;) {
        null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
      }return !1;
    }, n._roundProps = function (t, e) {
      for (var i = this._firstPT; i;) {
        (t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next;
      }
    }, D._onPluginEvent = function (t, e) {
      var i,
          s,
          n,
          r,
          a,
          o = e._firstPT;if ("_onInitAllProps" === t) {
        for (; o;) {
          for (a = o._next, s = n; s && s.pr > o.pr;) {
            s = s._next;
          }(o._prev = s ? s._prev : r) ? o._prev._next = o : n = o, (o._next = s) ? s._prev = o : r = o, o = a;
        }o = e._firstPT = n;
      }for (; o;) {
        o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
      }return i;
    }, H.activate = function (t) {
      for (var e = t.length; --e > -1;) {
        t[e].API === H.API && (L[new t[e]()._propName] = t[e]);
      }return !0;
    }, c.plugin = function (t) {
      if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";var e,
          i = t.propName,
          s = t.priority || 0,
          n = t.overwriteProps,
          r = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_roundProps", initAll: "_onInitAllProps" },
          a = d("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
        H.call(this, i, s), this._overwriteProps = n || [];
      }, t.global === !0),
          o = a.prototype = new H(i);o.constructor = a, a.API = t.API;for (e in r) {
        "function" == typeof t[e] && (o[r[e]] = t[e]);
      }return a.version = t.version, H.activate([a]), a;
    }, i = t._gsQueue) {
      for (s = 0; i.length > s; s++) {
        i[s]();
      }for (n in f) {
        f[n].func || t.console.log("GSAP encountered missing dependency: com.greensock." + n);
      }
    }a = !1;
  }
})(window);

},{}],9:[function(require,module,exports){
"use strict";

/*!
 * VERSION: beta 1.9.3
 * DATE: 2013-04-02
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue || (window._gsQueue = [])).push(function () {
  "use strict";
  window._gsDefine("easing.Back", ["easing.Ease"], function (t) {
    var e,
        i,
        s,
        r = window.GreenSockGlobals || window,
        n = r.com.greensock,
        a = 2 * Math.PI,
        o = Math.PI / 2,
        h = n._class,
        l = function l(e, i) {
      var s = h("easing." + e, function () {}, !0),
          r = s.prototype = new t();return r.constructor = s, r.getRatio = i, s;
    },
        _ = t.register || function () {},
        u = function u(t, e, i, s) {
      var r = h("easing." + t, { easeOut: new e(), easeIn: new i(), easeInOut: new s() }, !0);return _(r, t), r;
    },
        c = function c(t, e, i) {
      this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t);
    },
        f = function f(e, i) {
      var s = h("easing." + e, function (t) {
        this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1;
      }, !0),
          r = s.prototype = new t();return r.constructor = s, r.getRatio = i, r.config = function (t) {
        return new s(t);
      }, s;
    },
        p = u("Back", f("BackOut", function (t) {
      return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
    }), f("BackIn", function (t) {
      return t * t * ((this._p1 + 1) * t - this._p1);
    }), f("BackInOut", function (t) {
      return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
    })),
        m = h("easing.SlowMo", function (t, e, i) {
      e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0;
    }, !0),
        d = m.prototype = new t();return d.constructor = m, d.getRatio = function (t) {
      var e = t + (.5 - t) * this._p;return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e;
    }, m.ease = new m(.7, .7), d.config = m.config = function (t, e, i) {
      return new m(t, e, i);
    }, e = h("easing.SteppedEase", function (t) {
      t = t || 1, this._p1 = 1 / t, this._p2 = t + 1;
    }, !0), d = e.prototype = new t(), d.constructor = e, d.getRatio = function (t) {
      return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1;
    }, d.config = e.config = function (t) {
      return new e(t);
    }, i = h("easing.RoughEase", function (e) {
      e = e || {};for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), f = u, p = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) {
        i = p ? Math.random() : 1 / u * f, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), p ? s += Math.random() * r - .5 * r : f % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = { x: i, y: s };
      }for (l.sort(function (t, e) {
        return t.x - e.x;
      }), o = new c(1, 1, null), f = u; --f > -1;) {
        a = l[f], o = new c(a.x, a.y, o);
      }this._prev = new c(0, 0, 0 !== o.t ? o : o.next);
    }, !0), d = i.prototype = new t(), d.constructor = i, d.getRatio = function (t) {
      var e = this._prev;if (t > e.t) {
        for (; e.next && t >= e.t;) {
          e = e.next;
        }e = e.prev;
      } else for (; e.prev && e.t >= t;) {
        e = e.prev;
      }return this._prev = e, e.v + (t - e.t) / e.gap * e.c;
    }, d.config = function (t) {
      return new i(t);
    }, i.ease = new i(), u("Bounce", l("BounceOut", function (t) {
      return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    }), l("BounceIn", function (t) {
      return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375);
    }), l("BounceInOut", function (t) {
      var e = .5 > t;return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5;
    })), u("Circ", l("CircOut", function (t) {
      return Math.sqrt(1 - (t -= 1) * t);
    }), l("CircIn", function (t) {
      return -(Math.sqrt(1 - t * t) - 1);
    }), l("CircInOut", function (t) {
      return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    })), s = function s(e, i, _s) {
      var r = h("easing." + e, function (t, e) {
        this._p1 = t || 1, this._p2 = e || _s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0);
      }, !0),
          n = r.prototype = new t();return n.constructor = r, n.getRatio = i, n.config = function (t, e) {
        return new r(t, e);
      }, r;
    }, u("Elastic", s("ElasticOut", function (t) {
      return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1;
    }, .3), s("ElasticIn", function (t) {
      return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2));
    }, .3), s("ElasticInOut", function (t) {
      return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1;
    }, .45)), u("Expo", l("ExpoOut", function (t) {
      return 1 - Math.pow(2, -10 * t);
    }), l("ExpoIn", function (t) {
      return Math.pow(2, 10 * (t - 1)) - .001;
    }), l("ExpoInOut", function (t) {
      return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
    })), u("Sine", l("SineOut", function (t) {
      return Math.sin(t * o);
    }), l("SineIn", function (t) {
      return -Math.cos(t * o) + 1;
    }), l("SineInOut", function (t) {
      return -.5 * (Math.cos(Math.PI * t) - 1);
    })), h("easing.EaseLookup", { find: function find(e) {
        return t.map[e];
      } }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), p;
  }, !0);
}), window._gsDefine && window._gsQueue.pop()();

},{}],10:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * VERSION: 1.12.1
 * DATE: 2014-06-26
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue || (window._gsQueue = [])).push(function () {
  "use strict";
  window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) {
    var i,
        r,
        s,
        n,
        a = function a() {
      t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio;
    },
        o = {},
        l = a.prototype = new t("css");l.constructor = a, a.version = "1.12.1", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", l = "px", a.suffixMap = { top: l, right: l, bottom: l, left: l, width: l, height: l, fontSize: l, padding: l, margin: l, perspective: l, lineHeight: "" };var h,
        u,
        f,
        _,
        p,
        c,
        d = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
        m = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        v = /[^\d\-\.]/g,
        y = /(?:\d|\-|\+|=|#|\.)*/g,
        T = /opacity *= *([^)]*)/i,
        w = /opacity:([^;]*)/i,
        x = /alpha\(opacity *=.+?\)/i,
        b = /^(rgb|hsl)/,
        P = /([A-Z])/g,
        S = /-([a-z])/gi,
        C = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        R = function R(t, e) {
      return e.toUpperCase();
    },
        k = /(?:Left|Right|Width)/i,
        A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        D = /,(?=[^\)]*(?:\(|$))/gi,
        M = Math.PI / 180,
        L = 180 / Math.PI,
        N = {},
        X = document,
        z = X.createElement("div"),
        I = X.createElement("img"),
        E = a._internals = { _specialProps: o },
        F = navigator.userAgent,
        Y = function () {
      var t,
          e = F.indexOf("Android"),
          i = X.createElement("div");return f = -1 !== F.indexOf("Safari") && -1 === F.indexOf("Chrome") && (-1 === e || Number(F.substr(e + 8, 1)) > 3), p = f && 6 > Number(F.substr(F.indexOf("Version/") + 8, 1)), _ = -1 !== F.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(F) && (c = parseFloat(RegExp.$1)), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", t = i.getElementsByTagName("a")[0], t ? /^0.55/.test(t.style.opacity) : !1;
    }(),
        B = function B(t) {
      return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1;
    },
        U = function U(t) {
      window.console && console.log(t);
    },
        W = "",
        j = "",
        V = function V(t, e) {
      e = e || z;var i,
          r,
          s = e.style;if (void 0 !== s[t]) return t;for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === s[i[r] + t];) {}return r >= 0 ? (j = 3 === r ? "ms" : i[r], W = "-" + j.toLowerCase() + "-", j + t) : null;
    },
        H = X.defaultView ? X.defaultView.getComputedStyle : function () {},
        q = a.getStyle = function (t, e, i, r, s) {
      var n;return Y || "opacity" !== e ? (!r && t.style[e] ? n = t.style[e] : (i = i || H(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(P, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == s || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : s) : B(t);
    },
        Q = E.convertToPixels = function (t, i, r, s, n) {
      if ("px" === s || !s) return r;if ("auto" === s || !r) return 0;var o,
          l,
          h,
          u = k.test(i),
          f = t,
          _ = z.style,
          p = 0 > r;if (p && (r = -r), "%" === s && -1 !== i.indexOf("border")) o = r / 100 * (u ? t.clientWidth : t.clientHeight);else {
        if (_.cssText = "border:0 solid red;position:" + q(t, "position") + ";line-height:0;", "%" !== s && f.appendChild) _[u ? "borderLeftWidth" : "borderTopWidth"] = r + s;else {
          if (f = t.parentNode || X.body, l = f._gsCache, h = e.ticker.frame, l && u && l.time === h) return l.width * r / 100;_[u ? "width" : "height"] = r + s;
        }f.appendChild(z), o = parseFloat(z[u ? "offsetWidth" : "offsetHeight"]), f.removeChild(z), u && "%" === s && a.cacheWidths !== !1 && (l = f._gsCache = f._gsCache || {}, l.time = h, l.width = 100 * (o / r)), 0 !== o || n || (o = Q(t, i, r, s, !0));
      }return p ? -o : o;
    },
        Z = E.calculateOffset = function (t, e, i) {
      if ("absolute" !== q(t, "position", i)) return 0;var r = "left" === e ? "Left" : "Top",
          s = q(t, "margin" + r, i);return t["offset" + r] - (Q(t, e, parseFloat(s), s.replace(y, "")) || 0);
    },
        $ = function $(t, e) {
      var i,
          r,
          s = {};if (e = e || H(t, null)) {
        if (i = e.length) for (; --i > -1;) {
          s[e[i].replace(S, R)] = e.getPropertyValue(e[i]);
        } else for (i in e) {
          s[i] = e[i];
        }
      } else if (e = t.currentStyle || t.style) for (i in e) {
        "string" == typeof i && void 0 === s[i] && (s[i.replace(S, R)] = e[i]);
      }return Y || (s.opacity = B(t)), r = Pe(t, e, !1), s.rotation = r.rotation, s.skewX = r.skewX, s.scaleX = r.scaleX, s.scaleY = r.scaleY, s.x = r.x, s.y = r.y, xe && (s.z = r.z, s.rotationX = r.rotationX, s.rotationY = r.rotationY, s.scaleZ = r.scaleZ), s.filters && delete s.filters, s;
    },
        G = function G(t, e, i, r, s) {
      var n,
          a,
          o,
          l = {},
          h = t.style;for (a in i) {
        "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || s && s[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (l[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(v, "") ? n : 0 : Z(t, a), void 0 !== h[a] && (o = new fe(h, a, h[a], o)));
      }if (r) for (a in r) {
        "className" !== a && (l[a] = r[a]);
      }return { difs: l, firstMPT: o };
    },
        K = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
        J = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        te = function te(t, e, i) {
      var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
          s = K[e],
          n = s.length;for (i = i || H(t, null); --n > -1;) {
        r -= parseFloat(q(t, "padding" + s[n], i, !0)) || 0, r -= parseFloat(q(t, "border" + s[n] + "Width", i, !0)) || 0;
      }return r;
    },
        ee = function ee(t, e) {
      (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");var i = t.split(" "),
          r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
          s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];return null == s ? s = "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== s.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(r.replace(v, "")), e.oy = parseFloat(s.replace(v, ""))), r + " " + s + (i.length > 2 ? " " + i[2] : "");
    },
        ie = function ie(t, e) {
      return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e);
    },
        re = function re(t, e) {
      return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e : parseFloat(t);
    },
        se = function se(t, e, i, r) {
      var s,
          n,
          a,
          o,
          l = 1e-6;return null == t ? o = e : "number" == typeof t ? o = t : (s = 360, n = t.split("_"), a = Number(n[0].replace(v, "")) * (-1 === t.indexOf("rad") ? 1 : L) - ("=" === t.charAt(1) ? 0 : e), n.length && (r && (r[i] = e + a), -1 !== t.indexOf("short") && (a %= s, a !== a % (s / 2) && (a = 0 > a ? a + s : a - s)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * s) % s - (0 | a / s) * s : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * s) % s - (0 | a / s) * s)), o = e + a), l > o && o > -l && (o = 0), o;
    },
        ne = { aqua: [0, 255, 255], lime: [0, 255, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, 255], navy: [0, 0, 128], white: [255, 255, 255], fuchsia: [255, 0, 255], olive: [128, 128, 0], yellow: [255, 255, 0], orange: [255, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [255, 0, 0], pink: [255, 192, 203], cyan: [0, 255, 255], transparent: [255, 255, 255, 0] },
        ae = function ae(t, e, i) {
      return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5;
    },
        oe = function oe(t) {
      var e, i, r, s, n, a;return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ne[t] ? ne[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), r = t.charAt(3), t = "#" + e + e + i + i + r + r), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(d), s = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = ae(s + 1 / 3, e, i), t[1] = ae(s, e, i), t[2] = ae(s - 1 / 3, e, i), t) : (t = t.match(d) || ne.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : ne.black;
    },
        le = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for (l in ne) {
      le += "|" + l + "\\b";
    }le = RegExp(le + ")", "gi");var he = function he(t, e, i, r) {
      if (null == t) return function (t) {
        return t;
      };var s,
          n = e ? (t.match(le) || [""])[0] : "",
          a = t.split(n).join("").match(g) || [],
          o = t.substr(0, t.indexOf(a[0])),
          l = ")" === t.charAt(t.length - 1) ? ")" : "",
          h = -1 !== t.indexOf(" ") ? " " : ",",
          u = a.length,
          f = u > 0 ? a[0].replace(d, "") : "";return u ? s = e ? function (t) {
        var e, _, p, c;if ("number" == typeof t) t += f;else if (r && D.test(t)) {
          for (c = t.replace(D, "|").split("|"), p = 0; c.length > p; p++) {
            c[p] = s(c[p]);
          }return c.join(",");
        }if (e = (t.match(le) || [n])[0], _ = t.split(e).join("").match(g) || [], p = _.length, u > p--) for (; u > ++p;) {
          _[p] = i ? _[0 | (p - 1) / 2] : a[p];
        }return o + _.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "");
      } : function (t) {
        var e, n, _;if ("number" == typeof t) t += f;else if (r && D.test(t)) {
          for (n = t.replace(D, "|").split("|"), _ = 0; n.length > _; _++) {
            n[_] = s(n[_]);
          }return n.join(",");
        }if (e = t.match(g) || [], _ = e.length, u > _--) for (; u > ++_;) {
          e[_] = i ? e[0 | (_ - 1) / 2] : a[_];
        }return o + e.join(h) + l;
      } : function (t) {
        return t;
      };
    },
        ue = function ue(t) {
      return t = t.split(","), function (e, i, r, s, n, a, o) {
        var l,
            h = (i + "").split(" ");for (o = {}, l = 0; 4 > l; l++) {
          o[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
        }return s.parse(e, o, n, a);
      };
    },
        fe = (E._setPluginRatio = function (t) {
      this.plugin.setRatio(t);for (var e, i, r, s, n = this.data, a = n.proxy, o = n.firstMPT, l = 1e-6; o;) {
        e = a[o.v], o.r ? e = Math.round(e) : l > e && e > -l && (e = 0), o.t[o.p] = e, o = o._next;
      }if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t) for (o = n.firstMPT; o;) {
        if (i = o.t, i.type) {
          if (1 === i.type) {
            for (s = i.xs0 + i.s + i.xs1, r = 1; i.l > r; r++) {
              s += i["xn" + r] + i["xs" + (r + 1)];
            }i.e = s;
          }
        } else i.e = i.s + i.xs0;o = o._next;
      }
    }, function (t, e, i, r, s) {
      this.t = t, this.p = e, this.v = i, this.r = s, r && (r._prev = this, this._next = r);
    }),
        _e = (E._parseToProxy = function (t, e, i, r, s, n) {
      var a,
          o,
          l,
          h,
          u,
          f = r,
          _ = {},
          p = {},
          c = i._transform,
          d = N;for (i._transform = null, N = e, r = u = i.parse(t, e, r, s), N = d, n && (i._transform = c, f && (f._prev = null, f._prev && (f._prev._next = null))); r && r !== f;) {
        if (1 >= r.type && (o = r.p, p[o] = r.s + r.c, _[o] = r.s, n || (h = new fe(r, "s", o, h, r.r), r.c = 0), 1 === r.type)) for (a = r.l; --a > 0;) {
          l = "xn" + a, o = r.p + "_" + l, p[o] = r.data[l], _[o] = r[l], n || (h = new fe(r, l, o, h, r.rxp[l]));
        }r = r._next;
      }return { proxy: _, end: p, firstMPT: h, pt: u };
    }, E.CSSPropTween = function (t, e, r, s, a, o, l, h, u, f, _) {
      this.t = t, this.p = e, this.s = r, this.c = s, this.n = l || e, t instanceof _e || n.push(this.n), this.r = h, this.type = o || 0, u && (this.pr = u, i = !0), this.b = void 0 === f ? r : f, this.e = void 0 === _ ? r + s : _, a && (this._next = a, a._prev = this);
    }),
        pe = a.parseComplex = function (t, e, i, r, s, n, a, o, l, u) {
      i = i || n || "", a = new _e(t, e, 0, 0, a, u ? 2 : 1, null, !1, o, i, r), r += "";var f,
          _,
          p,
          c,
          g,
          v,
          y,
          T,
          w,
          x,
          P,
          S,
          C = i.split(", ").join(",").split(" "),
          R = r.split(", ").join(",").split(" "),
          k = C.length,
          A = h !== !1;for ((-1 !== r.indexOf(",") || -1 !== i.indexOf(",")) && (C = C.join(" ").replace(D, ", ").split(" "), R = R.join(" ").replace(D, ", ").split(" "), k = C.length), k !== R.length && (C = (n || "").split(" "), k = C.length), a.plugin = l, a.setRatio = u, f = 0; k > f; f++) {
        if (c = C[f], g = R[f], T = parseFloat(c), T || 0 === T) a.appendXtra("", T, ie(g, T), g.replace(m, ""), A && -1 !== g.indexOf("px"), !0);else if (s && ("#" === c.charAt(0) || ne[c] || b.test(c))) S = "," === g.charAt(g.length - 1) ? ")," : ")", c = oe(c), g = oe(g), w = c.length + g.length > 6, w && !Y && 0 === g[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(R[f]).join("transparent")) : (Y || (w = !1), a.appendXtra(w ? "rgba(" : "rgb(", c[0], g[0] - c[0], ",", !0, !0).appendXtra("", c[1], g[1] - c[1], ",", !0).appendXtra("", c[2], g[2] - c[2], w ? "," : S, !0), w && (c = 4 > c.length ? 1 : c[3], a.appendXtra("", c, (4 > g.length ? 1 : g[3]) - c, S, !1)));else if (v = c.match(d)) {
          if (y = g.match(m), !y || y.length !== v.length) return a;for (p = 0, _ = 0; v.length > _; _++) {
            P = v[_], x = c.indexOf(P, p), a.appendXtra(c.substr(p, x - p), Number(P), ie(y[_], P), "", A && "px" === c.substr(x + P.length, 2), 0 === _), p = x + P.length;
          }a["xs" + a.l] += c.substr(p);
        } else a["xs" + a.l] += a.l ? " " + c : c;
      }if (-1 !== r.indexOf("=") && a.data) {
        for (S = a.xs0 + a.data.s, f = 1; a.l > f; f++) {
          S += a["xs" + f] + a.data["xn" + f];
        }a.e = S + a["xs" + f];
      }return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a;
    },
        ce = 9;for (l = _e.prototype, l.l = l.pr = 0; --ce > 0;) {
      l["xn" + ce] = 0, l["xs" + ce] = "";
    }l.xs0 = "", l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null, l.appendXtra = function (t, e, i, r, s, n) {
      var a = this,
          o = a.l;return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = r || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = s, a["xn" + o] = e, a.plugin || (a.xfirst = new _e(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, s, a.pr), a.xfirst.xs0 = 0), a) : (a.data = { s: e + i }, a.rxp = {}, a.s = e, a.c = i, a.r = s, a)) : (a["xs" + o] += e + (r || ""), a);
    };var de = function de(t, e) {
      e = e || {}, this.p = e.prefix ? V(t) || t : t, o[t] = o[this.p] = this, this.format = e.formatter || he(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0;
    },
        me = E._registerComplexSpecialProp = function (t, e, i) {
      "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && (e = { parser: i });var r,
          s,
          n = t.split(","),
          a = e.defaultValue;for (i = i || [a], r = 0; n.length > r; r++) {
        e.prefix = 0 === r && e.prefix, e.defaultValue = i[r] || a, s = new de(n[r], e);
      }
    },
        ge = function ge(t) {
      if (!o[t]) {
        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";me(t, { parser: function parser(t, i, r, s, n, a, l) {
            var h = (window.GreenSockGlobals || window).com.greensock.plugins[e];return h ? (h._cssRegister(), o[r].parse(t, i, r, s, n, a, l)) : (U("Error: " + e + " js file not loaded."), n);
          } });
      }
    };l = de.prototype, l.parseComplex = function (t, e, i, r, s, n) {
      var a,
          o,
          l,
          h,
          u,
          f,
          _ = this.keyword;if (this.multi && (D.test(i) || D.test(e) ? (o = e.replace(D, "|").split("|"), l = i.replace(D, "|").split("|")) : _ && (o = [e], l = [i])), l) {
        for (h = l.length > o.length ? l.length : o.length, a = 0; h > a; a++) {
          e = o[a] = o[a] || this.dflt, i = l[a] = l[a] || this.dflt, _ && (u = e.indexOf(_), f = i.indexOf(_), u !== f && (i = -1 === f ? l : o, i[a] += " " + _));
        }e = o.join(", "), i = l.join(", ");
      }return pe(t, this.p, e, i, this.clrs, this.dflt, r, this.pr, s, n);
    }, l.parse = function (t, e, i, r, n, a) {
      return this.parseComplex(t.style, this.format(q(t, this.p, s, !1, this.dflt)), this.format(e), n, a);
    }, a.registerSpecialProp = function (t, e, i) {
      me(t, { parser: function parser(t, r, s, n, a, o) {
          var l = new _e(t, s, 0, 0, a, 2, s, !1, i);return l.plugin = o, l.setRatio = e(t, r, n._tween, s), l;
        }, priority: i });
    };var ve = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective".split(","),
        ye = V("transform"),
        Te = W + "transform",
        we = V("transformOrigin"),
        xe = null !== V("perspective"),
        be = E.Transform = function () {
      this.skewY = 0;
    },
        Pe = E.getTransform = function (t, e, i, r) {
      if (t._gsTransform && i && !r) return t._gsTransform;var s,
          n,
          o,
          l,
          h,
          u,
          f,
          _,
          p,
          c,
          d,
          m,
          g,
          v = i ? t._gsTransform || new be() : new be(),
          y = 0 > v.scaleX,
          T = 2e-5,
          w = 1e5,
          x = 179.99,
          b = x * M,
          P = xe ? parseFloat(q(t, we, e, !1, "0 0 0").split(" ")[2]) || v.zOrigin || 0 : 0;for (ye ? s = q(t, Te, e, !0) : t.currentStyle && (s = t.currentStyle.filter.match(A), s = s && 4 === s.length ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), v.x || 0, v.y || 0].join(",") : ""), n = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], o = n.length; --o > -1;) {
        l = Number(n[o]), n[o] = (h = l - (l |= 0)) ? (0 | h * w + (0 > h ? -.5 : .5)) / w + l : l;
      }if (16 === n.length) {
        var S = n[8],
            C = n[9],
            R = n[10],
            k = n[12],
            O = n[13],
            D = n[14];if (v.zOrigin && (D = -v.zOrigin, k = S * D - n[12], O = C * D - n[13], D = R * D + v.zOrigin - n[14]), !i || r || null == v.rotationX) {
          var N,
              X,
              z,
              I,
              E,
              F,
              Y,
              B = n[0],
              U = n[1],
              W = n[2],
              j = n[3],
              V = n[4],
              H = n[5],
              Q = n[6],
              Z = n[7],
              $ = n[11],
              G = Math.atan2(Q, R),
              K = -b > G || G > b;v.rotationX = G * L, G && (I = Math.cos(-G), E = Math.sin(-G), N = V * I + S * E, X = H * I + C * E, z = Q * I + R * E, S = V * -E + S * I, C = H * -E + C * I, R = Q * -E + R * I, $ = Z * -E + $ * I, V = N, H = X, Q = z), G = Math.atan2(S, B), v.rotationY = G * L, G && (F = -b > G || G > b, I = Math.cos(-G), E = Math.sin(-G), N = B * I - S * E, X = U * I - C * E, z = W * I - R * E, C = U * E + C * I, R = W * E + R * I, $ = j * E + $ * I, B = N, U = X, W = z), G = Math.atan2(U, H), v.rotation = G * L, G && (Y = -b > G || G > b, I = Math.cos(-G), E = Math.sin(-G), B = B * I + V * E, X = U * I + H * E, H = U * -E + H * I, Q = W * -E + Q * I, U = X), Y && K ? v.rotation = v.rotationX = 0 : Y && F ? v.rotation = v.rotationY = 0 : F && K && (v.rotationY = v.rotationX = 0), v.scaleX = (0 | Math.sqrt(B * B + U * U) * w + .5) / w, v.scaleY = (0 | Math.sqrt(H * H + C * C) * w + .5) / w, v.scaleZ = (0 | Math.sqrt(Q * Q + R * R) * w + .5) / w, v.skewX = 0, v.perspective = $ ? 1 / (0 > $ ? -$ : $) : 0, v.x = k, v.y = O, v.z = D;
        }
      } else if (!(xe && !r && n.length && v.x === n[4] && v.y === n[5] && (v.rotationX || v.rotationY) || void 0 !== v.x && "none" === q(t, "display", e))) {
        var J = n.length >= 6,
            te = J ? n[0] : 1,
            ee = n[1] || 0,
            ie = n[2] || 0,
            re = J ? n[3] : 1;v.x = n[4] || 0, v.y = n[5] || 0, u = Math.sqrt(te * te + ee * ee), f = Math.sqrt(re * re + ie * ie), _ = te || ee ? Math.atan2(ee, te) * L : v.rotation || 0, p = ie || re ? Math.atan2(ie, re) * L + _ : v.skewX || 0, c = u - Math.abs(v.scaleX || 0), d = f - Math.abs(v.scaleY || 0), Math.abs(p) > 90 && 270 > Math.abs(p) && (y ? (u *= -1, p += 0 >= _ ? 180 : -180, _ += 0 >= _ ? 180 : -180) : (f *= -1, p += 0 >= p ? 180 : -180)), m = (_ - v.rotation) % 180, g = (p - v.skewX) % 180, (void 0 === v.skewX || c > T || -T > c || d > T || -T > d || m > -x && x > m && false | m * w || g > -x && x > g && false | g * w) && (v.scaleX = u, v.scaleY = f, v.rotation = _, v.skewX = p), xe && (v.rotationX = v.rotationY = v.z = 0, v.perspective = parseFloat(a.defaultTransformPerspective) || 0, v.scaleZ = 1);
      }v.zOrigin = P;for (o in v) {
        T > v[o] && v[o] > -T && (v[o] = 0);
      }return i && (t._gsTransform = v), v;
    },
        Se = function Se(t) {
      var e,
          i,
          r = this.data,
          s = -r.rotation * M,
          n = s + r.skewX * M,
          a = 1e5,
          o = (0 | Math.cos(s) * r.scaleX * a) / a,
          l = (0 | Math.sin(s) * r.scaleX * a) / a,
          h = (0 | Math.sin(n) * -r.scaleY * a) / a,
          u = (0 | Math.cos(n) * r.scaleY * a) / a,
          f = this.t.style,
          _ = this.t.currentStyle;if (_) {
        i = l, l = -h, h = -i, e = _.filter, f.filter = "";var p,
            d,
            m = this.t.offsetWidth,
            g = this.t.offsetHeight,
            v = "absolute" !== _.position,
            w = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + h + ", M22=" + u,
            x = r.x,
            b = r.y;if (null != r.ox && (p = (r.oxp ? .01 * m * r.ox : r.ox) - m / 2, d = (r.oyp ? .01 * g * r.oy : r.oy) - g / 2, x += p - (p * o + d * l), b += d - (p * h + d * u)), v ? (p = m / 2, d = g / 2, w += ", Dx=" + (p - (p * o + d * l) + x) + ", Dy=" + (d - (p * h + d * u) + b) + ")") : w += ", sizingMethod='auto expand')", f.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(O, w) : w + " " + e, (0 === t || 1 === t) && 1 === o && 0 === l && 0 === h && 1 === u && (v && -1 === w.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(" && e.indexOf("Alpha")) && f.removeAttribute("filter")), !v) {
          var P,
              S,
              C,
              R = 8 > c ? 1 : -1;for (p = r.ieOffsetX || 0, d = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 + x), r.ieOffsetY = Math.round((g - ((0 > u ? -u : u) * g + (0 > h ? -h : h) * m)) / 2 + b), ce = 0; 4 > ce; ce++) {
            S = J[ce], P = _[S], i = -1 !== P.indexOf("px") ? parseFloat(P) : Q(this.t, S, parseFloat(P), P.replace(y, "")) || 0, C = i !== r[S] ? 2 > ce ? -r.ieOffsetX : -r.ieOffsetY : 2 > ce ? p - r.ieOffsetX : d - r.ieOffsetY, f[S] = (r[S] = Math.round(i - C * (0 === ce || 2 === ce ? 1 : R))) + "px";
          }
        }
      }
    },
        Ce = E.set3DTransformRatio = function (t) {
      var e,
          i,
          r,
          s,
          n,
          a,
          o,
          l,
          h,
          u,
          f,
          p,
          c,
          d,
          m,
          g,
          v,
          y,
          T,
          w,
          x,
          b,
          P,
          S = this.data,
          C = this.t.style,
          R = S.rotation * M,
          k = S.scaleX,
          A = S.scaleY,
          O = S.scaleZ,
          D = S.perspective;if (!(1 !== t && 0 !== t || "auto" !== S.force3D || S.rotationY || S.rotationX || 1 !== O || D || S.z)) return Re.call(this, t), void 0;if (_) {
        var L = 1e-4;L > k && k > -L && (k = O = 2e-5), L > A && A > -L && (A = O = 2e-5), !D || S.z || S.rotationX || S.rotationY || (D = 0);
      }if (R || S.skewX) y = Math.cos(R), T = Math.sin(R), e = y, n = T, S.skewX && (R -= S.skewX * M, y = Math.cos(R), T = Math.sin(R), "simple" === S.skewType && (w = Math.tan(S.skewX * M), w = Math.sqrt(1 + w * w), y *= w, T *= w)), i = -T, a = y;else {
        if (!(S.rotationY || S.rotationX || 1 !== O || D)) return C[ye] = "translate3d(" + S.x + "px," + S.y + "px," + S.z + "px)" + (1 !== k || 1 !== A ? " scale(" + k + "," + A + ")" : ""), void 0;e = a = 1, i = n = 0;
      }f = 1, r = s = o = l = h = u = p = c = d = 0, m = D ? -1 / D : 0, g = S.zOrigin, v = 1e5, R = S.rotationY * M, R && (y = Math.cos(R), T = Math.sin(R), h = f * -T, c = m * -T, r = e * T, o = n * T, f *= y, m *= y, e *= y, n *= y), R = S.rotationX * M, R && (y = Math.cos(R), T = Math.sin(R), w = i * y + r * T, x = a * y + o * T, b = u * y + f * T, P = d * y + m * T, r = i * -T + r * y, o = a * -T + o * y, f = u * -T + f * y, m = d * -T + m * y, i = w, a = x, u = b, d = P), 1 !== O && (r *= O, o *= O, f *= O, m *= O), 1 !== A && (i *= A, a *= A, u *= A, d *= A), 1 !== k && (e *= k, n *= k, h *= k, c *= k), g && (p -= g, s = r * p, l = o * p, p = f * p + g), s = (w = (s += S.x) - (s |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + s : s, l = (w = (l += S.y) - (l |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + l : l, p = (w = (p += S.z) - (p |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + p : p, C[ye] = "matrix3d(" + [(0 | e * v) / v, (0 | n * v) / v, (0 | h * v) / v, (0 | c * v) / v, (0 | i * v) / v, (0 | a * v) / v, (0 | u * v) / v, (0 | d * v) / v, (0 | r * v) / v, (0 | o * v) / v, (0 | f * v) / v, (0 | m * v) / v, s, l, p, D ? 1 + -p / D : 1].join(",") + ")";
    },
        Re = E.set2DTransformRatio = function (t) {
      var e,
          i,
          r,
          s,
          n,
          a = this.data,
          o = this.t,
          l = o.style;return a.rotationX || a.rotationY || a.z || a.force3D === !0 || "auto" === a.force3D && 1 !== t && 0 !== t ? (this.setRatio = Ce, Ce.call(this, t), void 0) : (a.rotation || a.skewX ? (e = a.rotation * M, i = e - a.skewX * M, r = 1e5, s = a.scaleX * r, n = a.scaleY * r, l[ye] = "matrix(" + (0 | Math.cos(e) * s) / r + "," + (0 | Math.sin(e) * s) / r + "," + (0 | Math.sin(i) * -n) / r + "," + (0 | Math.cos(i) * n) / r + "," + a.x + "," + a.y + ")") : l[ye] = "matrix(" + a.scaleX + ",0,0," + a.scaleY + "," + a.x + "," + a.y + ")", void 0);
    };me("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType", { parser: function parser(t, e, i, r, n, o, l) {
        if (r._transform) return n;var h,
            u,
            f,
            _,
            p,
            c,
            d,
            m = r._transform = Pe(t, s, !0, l.parseTransform),
            g = t.style,
            v = 1e-6,
            y = ve.length,
            T = l,
            w = {};if ("string" == typeof T.transform && ye) f = z.style, f[ye] = T.transform, f.display = "block", f.position = "absolute", X.body.appendChild(z), h = Pe(z, null, !1), X.body.removeChild(z);else if ("object" == (typeof T === "undefined" ? "undefined" : _typeof(T))) {
          if (h = { scaleX: re(null != T.scaleX ? T.scaleX : T.scale, m.scaleX), scaleY: re(null != T.scaleY ? T.scaleY : T.scale, m.scaleY), scaleZ: re(T.scaleZ, m.scaleZ), x: re(T.x, m.x), y: re(T.y, m.y), z: re(T.z, m.z), perspective: re(T.transformPerspective, m.perspective) }, d = T.directionalRotation, null != d) if ("object" == (typeof d === "undefined" ? "undefined" : _typeof(d))) for (f in d) {
            T[f] = d[f];
          } else T.rotation = d;h.rotation = se("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : m.rotation, m.rotation, "rotation", w), xe && (h.rotationX = se("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : m.rotationX || 0, m.rotationX, "rotationX", w), h.rotationY = se("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : m.rotationY || 0, m.rotationY, "rotationY", w)), h.skewX = null == T.skewX ? m.skewX : se(T.skewX, m.skewX), h.skewY = null == T.skewY ? m.skewY : se(T.skewY, m.skewY), (u = h.skewY - m.skewY) && (h.skewX += u, h.rotation += u);
        }for (xe && null != T.force3D && (m.force3D = T.force3D, c = !0), m.skewType = T.skewType || m.skewType || a.defaultSkewType, p = m.force3D || m.z || m.rotationX || m.rotationY || h.z || h.rotationX || h.rotationY || h.perspective, p || null == T.scale || (h.scaleZ = 1); --y > -1;) {
          i = ve[y], _ = h[i] - m[i], (_ > v || -v > _ || null != N[i]) && (c = !0, n = new _e(m, i, m[i], _, n), i in w && (n.e = w[i]), n.xs0 = 0, n.plugin = o, r._overwriteProps.push(n.n));
        }return _ = T.transformOrigin, (_ || xe && p && m.zOrigin) && (ye ? (c = !0, i = we, _ = (_ || q(t, i, s, !1, "50% 50%")) + "", n = new _e(g, i, 0, 0, n, -1, "transformOrigin"), n.b = g[i], n.plugin = o, xe ? (f = m.zOrigin, _ = _.split(" "), m.zOrigin = (_.length > 2 && (0 === f || "0px" !== _[2]) ? parseFloat(_[2]) : f) || 0, n.xs0 = n.e = _[0] + " " + (_[1] || "50%") + " 0px", n = new _e(m, "zOrigin", 0, 0, n, -1, n.n), n.b = f, n.xs0 = n.e = m.zOrigin) : n.xs0 = n.e = _) : ee(_ + "", m)), c && (r._transformType = p || 3 === this._transformType ? 3 : 2), n;
      }, prefix: !0 }), me("boxShadow", { defaultValue: "0px 0px 0px 0px #999", prefix: !0, color: !0, multi: !0, keyword: "inset" }), me("borderRadius", { defaultValue: "0px", parser: function parser(t, e, i, n, a) {
        e = this.format(e);var o,
            l,
            h,
            u,
            f,
            _,
            p,
            c,
            d,
            m,
            g,
            v,
            y,
            T,
            w,
            x,
            b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
            P = t.style;for (d = parseFloat(t.offsetWidth), m = parseFloat(t.offsetHeight), o = e.split(" "), l = 0; b.length > l; l++) {
          this.p.indexOf("border") && (b[l] = V(b[l])), f = u = q(t, b[l], s, !1, "0px"), -1 !== f.indexOf(" ") && (u = f.split(" "), f = u[0], u = u[1]), _ = h = o[l], p = parseFloat(f), v = f.substr((p + "").length), y = "=" === _.charAt(1), y ? (c = parseInt(_.charAt(0) + "1", 10), _ = _.substr(2), c *= parseFloat(_), g = _.substr((c + "").length - (0 > c ? 1 : 0)) || "") : (c = parseFloat(_), g = _.substr((c + "").length)), "" === g && (g = r[i] || v), g !== v && (T = Q(t, "borderLeft", p, v), w = Q(t, "borderTop", p, v), "%" === g ? (f = 100 * (T / d) + "%", u = 100 * (w / m) + "%") : "em" === g ? (x = Q(t, "borderLeft", 1, "em"), f = T / x + "em", u = w / x + "em") : (f = T + "px", u = w + "px"), y && (_ = parseFloat(f) + c + g, h = parseFloat(u) + c + g)), a = pe(P, b[l], f + " " + u, _ + " " + h, !1, "0px", a);
        }return a;
      }, prefix: !0, formatter: he("0px 0px 0px 0px", !1, !0) }), me("backgroundPosition", { defaultValue: "0 0", parser: function parser(t, e, i, r, n, a) {
        var o,
            l,
            h,
            u,
            f,
            _,
            p = "background-position",
            d = s || H(t, null),
            m = this.format((d ? c ? d.getPropertyValue(p + "-x") + " " + d.getPropertyValue(p + "-y") : d.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
            g = this.format(e);if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (_ = q(t, "backgroundImage").replace(C, ""), _ && "none" !== _)) {
          for (o = m.split(" "), l = g.split(" "), I.setAttribute("src", _), h = 2; --h > -1;) {
            m = o[h], u = -1 !== m.indexOf("%"), u !== (-1 !== l[h].indexOf("%")) && (f = 0 === h ? t.offsetWidth - I.width : t.offsetHeight - I.height, o[h] = u ? parseFloat(m) / 100 * f + "px" : 100 * (parseFloat(m) / f) + "%");
          }m = o.join(" ");
        }return this.parseComplex(t.style, m, g, n, a);
      }, formatter: ee }), me("backgroundSize", { defaultValue: "0 0", formatter: ee }), me("perspective", { defaultValue: "0px", prefix: !0 }), me("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }), me("transformStyle", { prefix: !0 }), me("backfaceVisibility", { prefix: !0 }), me("userSelect", { prefix: !0 }), me("margin", { parser: ue("marginTop,marginRight,marginBottom,marginLeft") }), me("padding", { parser: ue("paddingTop,paddingRight,paddingBottom,paddingLeft") }), me("clip", { defaultValue: "rect(0px,0px,0px,0px)", parser: function parser(t, e, i, r, n, a) {
        var o, l, h;return 9 > c ? (l = t.currentStyle, h = 8 > c ? " " : ",", o = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (o = this.format(q(t, this.p, s, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a);
      } }), me("textShadow", { defaultValue: "0px 0px 0px #999", color: !0, multi: !0 }), me("autoRound,strictUnits", { parser: function parser(t, e, i, r, s) {
        return s;
      } }), me("border", { defaultValue: "0px solid #000", parser: function parser(t, e, i, r, n, a) {
        return this.parseComplex(t.style, this.format(q(t, "borderTopWidth", s, !1, "0px") + " " + q(t, "borderTopStyle", s, !1, "solid") + " " + q(t, "borderTopColor", s, !1, "#000")), this.format(e), n, a);
      }, color: !0, formatter: function formatter(t) {
        var e = t.split(" ");return e[0] + " " + (e[1] || "solid") + " " + (t.match(le) || ["#000"])[0];
      } }), me("borderWidth", { parser: ue("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth") }), me("float,cssFloat,styleFloat", { parser: function parser(t, e, i, r, s) {
        var n = t.style,
            a = "cssFloat" in n ? "cssFloat" : "styleFloat";return new _e(n, a, 0, 0, s, -1, i, !1, 0, n[a], e);
      } });var ke = function ke(t) {
      var e,
          i = this.t,
          r = i.filter || q(this.data, "filter"),
          s = 0 | this.s + this.c * t;100 === s && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (i.removeAttribute("filter"), e = !q(this.data, "filter")) : (i.filter = r.replace(x, ""), e = !0)), e || (this.xn1 && (i.filter = r = r || "alpha(opacity=" + s + ")"), -1 === r.indexOf("pacity") ? 0 === s && this.xn1 || (i.filter = r + " alpha(opacity=" + s + ")") : i.filter = r.replace(T, "opacity=" + s));
    };me("opacity,alpha,autoAlpha", { defaultValue: "1", parser: function parser(t, e, i, r, n, a) {
        var o = parseFloat(q(t, "opacity", s, !1, "1")),
            l = t.style,
            h = "autoAlpha" === i;return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), h && 1 === o && "hidden" === q(t, "visibility", s) && 0 !== e && (o = 0), Y ? n = new _e(l, "opacity", o, e - o, n) : (n = new _e(l, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = h ? 1 : 0, l.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = ke), h && (n = new _e(l, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", r._overwriteProps.push(n.n), r._overwriteProps.push(i)), n;
      } });var Ae = function Ae(t, e) {
      e && (t.removeProperty ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)), t.removeProperty(e.replace(P, "-$1").toLowerCase())) : t.removeAttribute(e));
    },
        Oe = function Oe(t) {
      if (this.t._gsClassPT = this, 1 === t || 0 === t) {
        this.t.setAttribute("class", 0 === t ? this.b : this.e);for (var e = this.data, i = this.t.style; e;) {
          e.v ? i[e.p] = e.v : Ae(i, e.p), e = e._next;
        }1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null);
      } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e);
    };me("className", { parser: function parser(t, e, r, n, a, o, l) {
        var h,
            u,
            f,
            _,
            p,
            c = t.getAttribute("class") || "",
            d = t.style.cssText;if (a = n._classNamePT = new _e(t, r, 0, 0, a, 2), a.setRatio = Oe, a.pr = -11, i = !0, a.b = c, u = $(t, s), f = t._gsClassPT) {
          for (_ = {}, p = f.data; p;) {
            _[p.p] = 1, p = p._next;
          }f.setRatio(1);
        }return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : c.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), n._tween._duration && (t.setAttribute("class", a.e), h = G(t, u, $(t), l, _), t.setAttribute("class", c), a.data = h.firstMPT, t.style.cssText = d, a = a.xfirst = n.parse(t, h.difs, a, o)), a;
      } });var De = function De(t) {
      if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
        var e,
            i,
            r,
            s,
            n = this.t.style,
            a = o.transform.parse;if ("all" === this.e) n.cssText = "", s = !0;else for (e = this.e.split(","), r = e.length; --r > -1;) {
          i = e[r], o[i] && (o[i].parse === a ? s = !0 : i = "transformOrigin" === i ? we : o[i].p), Ae(n, i);
        }s && (Ae(n, ye), this.t._gsTransform && delete this.t._gsTransform);
      }
    };for (me("clearProps", { parser: function parser(t, e, r, s, n) {
        return n = new _e(t, r, 0, 0, n, 2), n.setRatio = De, n.e = e, n.pr = -10, n.data = s._tween, i = !0, n;
      } }), l = "bezier,throwProps,physicsProps,physics2D".split(","), ce = l.length; ce--;) {
      ge(l[ce]);
    }l = a.prototype, l._firstPT = null, l._onInitTween = function (t, e, o) {
      if (!t.nodeType) return !1;this._target = t, this._tween = o, this._vars = e, h = e.autoRound, i = !1, r = e.suffixMap || a.suffixMap, s = H(t, ""), n = this._overwriteProps;var l,
          _,
          c,
          d,
          m,
          g,
          v,
          y,
          T,
          x = t.style;if (u && "" === x.zIndex && (l = q(t, "zIndex", s), ("auto" === l || "" === l) && this._addLazySet(x, "zIndex", 0)), "string" == typeof e && (d = x.cssText, l = $(t, s), x.cssText = d + ";" + e, l = G(t, l, $(t)).difs, !Y && w.test(e) && (l.opacity = parseFloat(RegExp.$1)), e = l, x.cssText = d), this._firstPT = _ = this.parse(t, e, null), this._transformType) {
        for (T = 3 === this._transformType, ye ? f && (u = !0, "" === x.zIndex && (v = q(t, "zIndex", s), ("auto" === v || "" === v) && this._addLazySet(x, "zIndex", 0)), p && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : x.zoom = 1, c = _; c && c._next;) {
          c = c._next;
        }y = new _e(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, c), y.setRatio = T && xe ? Ce : ye ? Re : Se, y.data = this._transform || Pe(t, s, !0), n.pop();
      }if (i) {
        for (; _;) {
          for (g = _._next, c = d; c && c.pr > _.pr;) {
            c = c._next;
          }(_._prev = c ? c._prev : m) ? _._prev._next = _ : d = _, (_._next = c) ? c._prev = _ : m = _, _ = g;
        }this._firstPT = d;
      }return !0;
    }, l.parse = function (t, e, i, n) {
      var a,
          l,
          u,
          f,
          _,
          p,
          c,
          d,
          m,
          g,
          v = t.style;for (a in e) {
        p = e[a], l = o[a], l ? i = l.parse(t, p, a, this, i, n, e) : (_ = q(t, a, s) + "", m = "string" == typeof p, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || m && b.test(p) ? (m || (p = oe(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = pe(v, a, _, p, !0, "transparent", i, 0, n)) : !m || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (u = parseFloat(_), c = u || 0 === u ? _.substr((u + "").length) : "", ("" === _ || "auto" === _) && ("width" === a || "height" === a ? (u = te(t, a, s), c = "px") : "left" === a || "top" === a ? (u = Z(t, a, s), c = "px") : (u = "opacity" !== a ? 0 : 1, c = "")), g = m && "=" === p.charAt(1), g ? (f = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), f *= parseFloat(p), d = p.replace(y, "")) : (f = parseFloat(p), d = m ? p.substr((f + "").length) || "" : ""), "" === d && (d = a in r ? r[a] : c), p = f || 0 === f ? (g ? f + u : f) + d : e[a], c !== d && "" !== d && (f || 0 === f) && u && (u = Q(t, a, u, c), "%" === d ? (u /= Q(t, a, 100, "%") / 100, e.strictUnits !== !0 && (_ = u + "%")) : "em" === d ? u /= Q(t, a, 1, "em") : "px" !== d && (f = Q(t, a, f, d), d = "px"), g && (f || 0 === f) && (p = f + u + d)), g && (f += u), !u && 0 !== u || !f && 0 !== f ? void 0 !== v[a] && (p || "NaN" != p + "" && null != p) ? (i = new _e(v, a, f || u || 0, 0, i, -1, a, !1, 0, _, p), i.xs0 = "none" !== p || "display" !== a && -1 === a.indexOf("Style") ? p : _) : U("invalid " + a + " tween value: " + e[a]) : (i = new _e(v, a, u, f - u, i, 0, a, h !== !1 && ("px" === d || "zIndex" === a), 0, _, p), i.xs0 = d)) : i = pe(v, a, _, p, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
      }return i;
    }, l.setRatio = function (t) {
      var e,
          i,
          r,
          s = this._firstPT,
          n = 1e-6;if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time) {
        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6) for (; s;) {
          if (e = s.c * t + s.s, s.r ? e = Math.round(e) : n > e && e > -n && (e = 0), s.type) {
            if (1 === s.type) {
              if (r = s.l, 2 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2;else if (3 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3;else if (4 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4;else if (5 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4 + s.xn4 + s.xs5;else {
                for (i = s.xs0 + e + s.xs1, r = 1; s.l > r; r++) {
                  i += s["xn" + r] + s["xs" + (r + 1)];
                }s.t[s.p] = i;
              }
            } else -1 === s.type ? s.t[s.p] = s.xs0 : s.setRatio && s.setRatio(t);
          } else s.t[s.p] = e + s.xs0;s = s._next;
        } else for (; s;) {
          2 !== s.type ? s.t[s.p] = s.b : s.setRatio(t), s = s._next;
        }
      } else for (; s;) {
        2 !== s.type ? s.t[s.p] = s.e : s.setRatio(t), s = s._next;
      }
    }, l._enableTransforms = function (t) {
      this._transformType = t || 3 === this._transformType ? 3 : 2, this._transform = this._transform || Pe(this._target, s, !0);
    };var Me = function Me() {
      this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0);
    };l._addLazySet = function (t, e, i) {
      var r = this._firstPT = new _e(t, e, 0, 0, this._firstPT, 2);r.e = i, r.setRatio = Me, r.data = this;
    }, l._linkCSSP = function (t, e, i, r) {
      return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, r = !0), i ? i._next = t : r || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t;
    }, l._kill = function (e) {
      var i,
          r,
          s,
          n = e;if (e.autoAlpha || e.alpha) {
        n = {};for (r in e) {
          n[r] = e[r];
        }n.opacity = 1, n.autoAlpha && (n.visibility = 1);
      }return e.className && (i = this._classNamePT) && (s = i.xfirst, s && s._prev ? this._linkCSSP(s._prev, i._next, s._prev._prev) : s === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, s._prev), this._classNamePT = null), t.prototype._kill.call(this, n);
    };var Le = function Le(t, e, i) {
      var r, s, n, a;if (t.slice) for (s = t.length; --s > -1;) {
        Le(t[s], e, i);
      } else for (r = t.childNodes, s = r.length; --s > -1;) {
        n = r[s], a = n.type, n.style && (e.push($(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || Le(n, e, i);
      }
    };return a.cascadeTo = function (t, i, r) {
      var s,
          n,
          a,
          o = e.to(t, i, r),
          l = [o],
          h = [],
          u = [],
          f = [],
          _ = e._internals.reservedProps;for (t = o._targets || o.target, Le(t, h, f), o.render(i, !0), Le(t, u), o.render(0, !0), o._enabled(!0), s = f.length; --s > -1;) {
        if (n = G(f[s], h[s], u[s]), n.firstMPT) {
          n = n.difs;
          for (a in r) {
            _[a] && (n[a] = r[a]);
          }l.push(e.to(f[s], i, n));
        }
      }return l;
    }, t.activate([a]), a;
  }, !0);
}), window._gsDefine && window._gsQueue.pop()();

},{}],11:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * VERSION: 1.7.3
 * DATE: 2014-01-14
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue || (window._gsQueue = [])).push(function () {
  "use strict";
  var t = document.documentElement,
      e = window,
      i = function i(_i, s) {
    var r = "x" === s ? "Width" : "Height",
        n = "scroll" + r,
        a = "client" + r,
        o = document.body;return _i === e || _i === t || _i === o ? Math.max(t[n], o[n]) - (e["inner" + r] || Math.max(t[a], o[a])) : _i[n] - _i["offset" + r];
  },
      s = window._gsDefine.plugin({ propName: "scrollTo", API: 2, version: "1.7.3", init: function init(t, s, r) {
      return this._wdw = t === e, this._target = t, this._tween = r, "object" != (typeof s === "undefined" ? "undefined" : _typeof(s)) && (s = { y: s }), this._autoKill = s.autoKill !== !1, this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != s.x ? (this._addTween(this, "x", this.x, "max" === s.x ? i(t, "x") : s.x, "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != s.y ? (this._addTween(this, "y", this.y, "max" === s.y ? i(t, "y") : s.y, "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0;
    }, set: function set(t) {
      this._super.setRatio.call(this, t);var s = this._wdw || !this.skipX ? this.getX() : this.xPrev,
          r = this._wdw || !this.skipY ? this.getY() : this.yPrev,
          n = r - this.yPrev,
          a = s - this.xPrev;this._autoKill && (!this.skipX && (a > 7 || -7 > a) && i(this._target, "x") > s && (this.skipX = !0), !this.skipY && (n > 7 || -7 > n) && i(this._target, "y") > r && (this.skipY = !0), this.skipX && this.skipY && this._tween.kill()), this._wdw ? e.scrollTo(this.skipX ? s : this.x, this.skipY ? r : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y;
    } }),
      r = s.prototype;s.max = i, r.getX = function () {
    return this._wdw ? null != e.pageXOffset ? e.pageXOffset : null != t.scrollLeft ? t.scrollLeft : document.body.scrollLeft : this._target.scrollLeft;
  }, r.getY = function () {
    return this._wdw ? null != e.pageYOffset ? e.pageYOffset : null != t.scrollTop ? t.scrollTop : document.body.scrollTop : this._target.scrollTop;
  }, r._kill = function (t) {
    return t.scrollTo_x && (this.skipX = !0), t.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, t);
  };
}), window._gsDefine && window._gsQueue.pop()();

},{}],12:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function (a, b, c, d) {
  "use strict";
  function e(a, b, c) {
    return setTimeout(j(a, c), b);
  }function f(a, b, c) {
    return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
  }function g(a, b, c) {
    var e;if (a) if (a.forEach) a.forEach(b, c);else if (a.length !== d) for (e = 0; e < a.length;) {
      b.call(c, a[e], e, a), e++;
    } else for (e in a) {
      a.hasOwnProperty(e) && b.call(c, a[e], e, a);
    }
  }function h(b, c, d) {
    var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";return function () {
      var c = new Error("get-stack-trace"),
          d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
          f = a.console && (a.console.warn || a.console.log);return f && f.call(a.console, e, d), b.apply(this, arguments);
    };
  }function i(a, b, c) {
    var d,
        e = b.prototype;d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c);
  }function j(a, b) {
    return function () {
      return a.apply(b, arguments);
    };
  }function k(a, b) {
    return (typeof a === "undefined" ? "undefined" : _typeof(a)) == oa ? a.apply(b ? b[0] || d : d, b) : a;
  }function l(a, b) {
    return a === d ? b : a;
  }function m(a, b, c) {
    g(q(b), function (b) {
      a.addEventListener(b, c, !1);
    });
  }function n(a, b, c) {
    g(q(b), function (b) {
      a.removeEventListener(b, c, !1);
    });
  }function o(a, b) {
    for (; a;) {
      if (a == b) return !0;a = a.parentNode;
    }return !1;
  }function p(a, b) {
    return a.indexOf(b) > -1;
  }function q(a) {
    return a.trim().split(/\s+/g);
  }function r(a, b, c) {
    if (a.indexOf && !c) return a.indexOf(b);for (var d = 0; d < a.length;) {
      if (c && a[d][c] == b || !c && a[d] === b) return d;d++;
    }return -1;
  }function s(a) {
    return Array.prototype.slice.call(a, 0);
  }function t(a, b, c) {
    for (var d = [], e = [], f = 0; f < a.length;) {
      var g = b ? a[f][b] : a[f];r(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
    }return c && (d = b ? d.sort(function (a, c) {
      return a[b] > c[b];
    }) : d.sort()), d;
  }function u(a, b) {
    for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) {
      if (c = ma[g], e = c ? c + f : b, e in a) return e;g++;
    }return d;
  }function v() {
    return ua++;
  }function w(b) {
    var c = b.ownerDocument || b;return c.defaultView || c.parentWindow || a;
  }function x(a, b) {
    var c = this;this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
      k(a.options.enable, [a]) && c.handler(b);
    }, this.init();
  }function y(a) {
    var b,
        c = a.options.inputClass;return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z);
  }function z(a, b, c) {
    var d = c.pointers.length,
        e = c.changedPointers.length,
        f = b & Ea && d - e === 0,
        g = b & (Ga | Ha) && d - e === 0;c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
  }function A(a, b) {
    var c = a.session,
        d = b.pointers,
        e = d.length;c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);var f = c.firstInput,
        g = c.firstMultiple,
        h = g ? g.center : f.center,
        i = b.center = E(d);b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);var j = F(b.deltaTime, b.deltaX, b.deltaY);b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);var k = a.element;o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k;
  }function B(a, b) {
    var c = b.center,
        d = a.offsetDelta || {},
        e = a.prevDelta || {},
        f = a.prevInput || {};b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
  }function C(a, b) {
    var c,
        e,
        f,
        g,
        h = a.lastInterval || b,
        i = b.timeStamp - h.timeStamp;if (b.eventType != Ha && (i > Da || h.velocity === d)) {
      var j = b.deltaX - h.deltaX,
          k = b.deltaY - h.deltaY,
          l = F(i, j, k);e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b;
    } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g;
  }function D(a) {
    for (var b = [], c = 0; c < a.pointers.length;) {
      b[c] = { clientX: pa(a.pointers[c].clientX), clientY: pa(a.pointers[c].clientY) }, c++;
    }return { timeStamp: ra(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY };
  }function E(a) {
    var b = a.length;if (1 === b) return { x: pa(a[0].clientX), y: pa(a[0].clientY) };for (var c = 0, d = 0, e = 0; b > e;) {
      c += a[e].clientX, d += a[e].clientY, e++;
    }return { x: pa(c / b), y: pa(d / b) };
  }function F(a, b, c) {
    return { x: b / a || 0, y: c / a || 0 };
  }function G(a, b) {
    return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma;
  }function H(a, b, c) {
    c || (c = Qa);var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];return Math.sqrt(d * d + e * e);
  }function I(a, b, c) {
    c || (c = Qa);var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];return 180 * Math.atan2(e, d) / Math.PI;
  }function J(a, b) {
    return I(b[1], b[0], Ra) + I(a[1], a[0], Ra);
  }function K(a, b) {
    return H(b[0], b[1], Ra) / H(a[0], a[1], Ra);
  }function L() {
    this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments);
  }function M() {
    this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
  }function N() {
    this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments);
  }function O(a, b) {
    var c = s(a.touches),
        d = s(a.changedTouches);return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d];
  }function P() {
    this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments);
  }function Q(a, b) {
    var c = s(a.touches),
        d = this.targetIds;if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];var e,
        f,
        g = s(a.changedTouches),
        h = [],
        i = this.target;if (f = c.filter(function (a) {
      return o(a.target, i);
    }), b === Ea) for (e = 0; e < f.length;) {
      d[f[e].identifier] = !0, e++;
    }for (e = 0; e < g.length;) {
      d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++;
    }return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0;
  }function R() {
    x.apply(this, arguments);var a = j(this.handler, this);this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = [];
  }function S(a, b) {
    a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b);
  }function T(a) {
    var b = a.changedPointers[0];if (b.identifier === this.primaryTouch) {
      var c = { x: b.clientX, y: b.clientY };this.lastTouches.push(c);var d = this.lastTouches,
          e = function e() {
        var a = d.indexOf(c);a > -1 && d.splice(a, 1);
      };setTimeout(e, cb);
    }
  }function U(a) {
    for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) {
      var e = this.lastTouches[d],
          f = Math.abs(b - e.x),
          g = Math.abs(c - e.y);if (db >= f && db >= g) return !0;
    }return !1;
  }function V(a, b) {
    this.manager = a, this.set(b);
  }function W(a) {
    if (p(a, jb)) return jb;var b = p(a, kb),
        c = p(a, lb);return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb;
  }function X() {
    if (!fb) return !1;var b = {},
        c = a.CSS && a.CSS.supports;return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (d) {
      b[d] = c ? a.CSS.supports("touch-action", d) : !0;
    }), b;
  }function Y(a) {
    this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = [];
  }function Z(a) {
    return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "";
  }function $(a) {
    return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "";
  }function _(a, b) {
    var c = b.manager;return c ? c.get(a) : a;
  }function aa() {
    Y.apply(this, arguments);
  }function ba() {
    aa.apply(this, arguments), this.pX = null, this.pY = null;
  }function ca() {
    aa.apply(this, arguments);
  }function da() {
    Y.apply(this, arguments), this._timer = null, this._input = null;
  }function ea() {
    aa.apply(this, arguments);
  }function fa() {
    aa.apply(this, arguments);
  }function ga() {
    Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
  }function ha(a, b) {
    return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b);
  }function ia(a, b) {
    this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function (a) {
      var b = this.add(new a[0](a[1]));a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
    }, this);
  }function ja(a, b) {
    var c = a.element;if (c.style) {
      var d;g(a.options.cssProps, function (e, f) {
        d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || "";
      }), b || (a.oldCssProps = {});
    }
  }function ka(a, c) {
    var d = b.createEvent("Event");d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
  }var la,
      ma = ["", "webkit", "Moz", "MS", "ms", "o"],
      na = b.createElement("div"),
      oa = "function",
      pa = Math.round,
      qa = Math.abs,
      ra = Date.now;la = "function" != typeof Object.assign ? function (a) {
    if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");for (var b = Object(a), c = 1; c < arguments.length; c++) {
      var e = arguments[c];if (e !== d && null !== e) for (var f in e) {
        e.hasOwnProperty(f) && (b[f] = e[f]);
      }
    }return b;
  } : Object.assign;var sa = h(function (a, b, c) {
    for (var e = Object.keys(b), f = 0; f < e.length;) {
      (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
    }return a;
  }, "extend", "Use `assign`."),
      ta = h(function (a, b) {
    return sa(a, b, !0);
  }, "merge", "Use `assign`."),
      ua = 1,
      va = /mobile|tablet|ip(ad|hone|od)|android/i,
      wa = "ontouchstart" in a,
      xa = u(a, "PointerEvent") !== d,
      ya = wa && va.test(navigator.userAgent),
      za = "touch",
      Aa = "pen",
      Ba = "mouse",
      Ca = "kinect",
      Da = 25,
      Ea = 1,
      Fa = 2,
      Ga = 4,
      Ha = 8,
      Ia = 1,
      Ja = 2,
      Ka = 4,
      La = 8,
      Ma = 16,
      Na = Ja | Ka,
      Oa = La | Ma,
      Pa = Na | Oa,
      Qa = ["x", "y"],
      Ra = ["clientX", "clientY"];x.prototype = { handler: function handler() {}, init: function init() {
      this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler);
    }, destroy: function destroy() {
      this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler);
    } };var Sa = { mousedown: Ea, mousemove: Fa, mouseup: Ga },
      Ta = "mousedown",
      Ua = "mousemove mouseup";i(L, x, { handler: function handler(a) {
      var b = Sa[a.type];b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: Ba, srcEvent: a }));
    } });var Va = { pointerdown: Ea, pointermove: Fa, pointerup: Ga, pointercancel: Ha, pointerout: Ha },
      Wa = { 2: za, 3: Aa, 4: Ba, 5: Ca },
      Xa = "pointerdown",
      Ya = "pointermove pointerup pointercancel";a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, { handler: function handler(a) {
      var b = this.store,
          c = !1,
          d = a.type.toLowerCase().replace("ms", ""),
          e = Va[d],
          f = Wa[a.pointerType] || a.pointerType,
          g = f == za,
          h = r(b, a.pointerId, "pointerId");e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1));
    } });var Za = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
      $a = "touchstart",
      _a = "touchstart touchmove touchend touchcancel";i(N, x, { handler: function handler(a) {
      var b = Za[a.type];if (b === Ea && (this.started = !0), this.started) {
        var c = O.call(this, a, b);b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a });
      }
    } });var ab = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
      bb = "touchstart touchmove touchend touchcancel";i(P, x, { handler: function handler(a) {
      var b = ab[a.type],
          c = Q.call(this, a, b);c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a });
    } });var cb = 2500,
      db = 25;i(R, x, { handler: function handler(a, b, c) {
      var d = c.pointerType == za,
          e = c.pointerType == Ba;if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
        if (d) S.call(this, b, c);else if (e && U.call(this, c)) return;this.callback(a, b, c);
      }
    }, destroy: function destroy() {
      this.touch.destroy(), this.mouse.destroy();
    } });var eb = u(na.style, "touchAction"),
      fb = eb !== d,
      gb = "compute",
      hb = "auto",
      ib = "manipulation",
      jb = "none",
      kb = "pan-x",
      lb = "pan-y",
      mb = X();V.prototype = { set: function set(a) {
      a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim();
    }, update: function update() {
      this.set(this.manager.options.touchAction);
    }, compute: function compute() {
      var a = [];return g(this.manager.recognizers, function (b) {
        k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
      }), W(a.join(" "));
    }, preventDefaults: function preventDefaults(a) {
      var b = a.srcEvent,
          c = a.offsetDirection;if (this.manager.session.prevented) return void b.preventDefault();var d = this.actions,
          e = p(d, jb) && !mb[jb],
          f = p(d, lb) && !mb[lb],
          g = p(d, kb) && !mb[kb];if (e) {
        var h = 1 === a.pointers.length,
            i = a.distance < 2,
            j = a.deltaTime < 250;if (h && i && j) return;
      }return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0;
    }, preventSrc: function preventSrc(a) {
      this.manager.session.prevented = !0, a.preventDefault();
    } };var nb = 1,
      ob = 2,
      pb = 4,
      qb = 8,
      rb = qb,
      sb = 16,
      tb = 32;Y.prototype = { defaults: {}, set: function set(a) {
      return la(this.options, a), this.manager && this.manager.touchAction.update(), this;
    }, recognizeWith: function recognizeWith(a) {
      if (f(a, "recognizeWith", this)) return this;var b = this.simultaneous;return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
    }, dropRecognizeWith: function dropRecognizeWith(a) {
      return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this);
    }, requireFailure: function requireFailure(a) {
      if (f(a, "requireFailure", this)) return this;var b = this.requireFail;return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this;
    }, dropRequireFailure: function dropRequireFailure(a) {
      if (f(a, "dropRequireFailure", this)) return this;a = _(a, this);var b = r(this.requireFail, a);return b > -1 && this.requireFail.splice(b, 1), this;
    }, hasRequireFailures: function hasRequireFailures() {
      return this.requireFail.length > 0;
    }, canRecognizeWith: function canRecognizeWith(a) {
      return !!this.simultaneous[a.id];
    }, emit: function emit(a) {
      function b(b) {
        c.manager.emit(b, a);
      }var c = this,
          d = this.state;qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d));
    }, tryEmit: function tryEmit(a) {
      return this.canEmit() ? this.emit(a) : void (this.state = tb);
    }, canEmit: function canEmit() {
      for (var a = 0; a < this.requireFail.length;) {
        if (!(this.requireFail[a].state & (tb | nb))) return !1;a++;
      }return !0;
    }, recognize: function recognize(a) {
      var b = la({}, a);return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void (this.state = tb));
    }, process: function process(a) {}, getTouchAction: function getTouchAction() {}, reset: function reset() {} }, i(aa, Y, { defaults: { pointers: 1 }, attrTest: function attrTest(a) {
      var b = this.options.pointers;return 0 === b || a.pointers.length === b;
    }, process: function process(a) {
      var b = this.state,
          c = a.eventType,
          d = b & (ob | pb),
          e = this.attrTest(a);return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb;
    } }), i(ba, aa, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Pa }, getTouchAction: function getTouchAction() {
      var a = this.options.direction,
          b = [];return a & Na && b.push(lb), a & Oa && b.push(kb), b;
    }, directionTest: function directionTest(a) {
      var b = this.options,
          c = !0,
          d = a.distance,
          e = a.direction,
          f = a.deltaX,
          g = a.deltaY;return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
    }, attrTest: function attrTest(a) {
      return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a));
    }, emit: function emit(a) {
      this.pX = a.deltaX, this.pY = a.deltaY;var b = $(a.direction);b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a);
    } }), i(ca, aa, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {
      return [jb];
    }, attrTest: function attrTest(a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob);
    }, emit: function emit(a) {
      if (1 !== a.scale) {
        var b = a.scale < 1 ? "in" : "out";a.additionalEvent = this.options.event + b;
      }this._super.emit.call(this, a);
    } }), i(da, Y, { defaults: { event: "press", pointers: 1, time: 251, threshold: 9 }, getTouchAction: function getTouchAction() {
      return [hb];
    }, process: function process(a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime > b.time;if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset();else if (a.eventType & Ea) this.reset(), this._timer = e(function () {
        this.state = rb, this.tryEmit();
      }, b.time, this);else if (a.eventType & Ga) return rb;return tb;
    }, reset: function reset() {
      clearTimeout(this._timer);
    }, emit: function emit(a) {
      this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input)));
    } }), i(ea, aa, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {
      return [jb];
    }, attrTest: function attrTest(a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob);
    } }), i(fa, aa, { defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Na | Oa, pointers: 1 }, getTouchAction: function getTouchAction() {
      return ba.prototype.getTouchAction.call(this);
    }, attrTest: function attrTest(a) {
      var b,
          c = this.options.direction;return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga;
    }, emit: function emit(a) {
      var b = $(a.offsetDirection);b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
    } }), i(ga, Y, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 }, getTouchAction: function getTouchAction() {
      return [ib];
    }, process: function process(a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime < b.time;if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout();if (d && f && c) {
        if (a.eventType != Ga) return this.failTimeout();var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
            h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;var i = this.count % b.taps;if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () {
          this.state = rb, this.tryEmit();
        }, b.interval, this), ob) : rb;
      }return tb;
    }, failTimeout: function failTimeout() {
      return this._timer = e(function () {
        this.state = tb;
      }, this.options.interval, this), tb;
    }, reset: function reset() {
      clearTimeout(this._timer);
    }, emit: function emit() {
      this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
    } }), ha.VERSION = "2.0.8", ha.defaults = { domEvents: !1, touchAction: gb, enable: !0, inputTarget: null, inputClass: null, preset: [[ea, { enable: !1 }], [ca, { enable: !1 }, ["rotate"]], [fa, { direction: Na }], [ba, { direction: Na }, ["swipe"]], [ga], [ga, { event: "doubletap", taps: 2 }, ["tap"]], [da]], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };var ub = 1,
      vb = 2;ia.prototype = { set: function set(a) {
      return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
    }, stop: function stop(a) {
      this.session.stopped = a ? vb : ub;
    }, recognize: function recognize(a) {
      var b = this.session;if (!b.stopped) {
        this.touchAction.preventDefaults(a);var c,
            d = this.recognizers,
            e = b.curRecognizer;(!e || e && e.state & rb) && (e = b.curRecognizer = null);for (var f = 0; f < d.length;) {
          c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++;
        }
      }
    }, get: function get(a) {
      if (a instanceof Y) return a;for (var b = this.recognizers, c = 0; c < b.length; c++) {
        if (b[c].options.event == a) return b[c];
      }return null;
    }, add: function add(a) {
      if (f(a, "add", this)) return this;var b = this.get(a.options.event);return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
    }, remove: function remove(a) {
      if (f(a, "remove", this)) return this;if (a = this.get(a)) {
        var b = this.recognizers,
            c = r(b, a);-1 !== c && (b.splice(c, 1), this.touchAction.update());
      }return this;
    }, on: function on(a, b) {
      if (a !== d && b !== d) {
        var c = this.handlers;return g(q(a), function (a) {
          c[a] = c[a] || [], c[a].push(b);
        }), this;
      }
    }, off: function off(a, b) {
      if (a !== d) {
        var c = this.handlers;return g(q(a), function (a) {
          b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a];
        }), this;
      }
    }, emit: function emit(a, b) {
      this.options.domEvents && ka(a, b);var c = this.handlers[a] && this.handlers[a].slice();if (c && c.length) {
        b.type = a, b.preventDefault = function () {
          b.srcEvent.preventDefault();
        };for (var d = 0; d < c.length;) {
          c[d](b), d++;
        }
      }
    }, destroy: function destroy() {
      this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
    } }, la(ha, { INPUT_START: Ea, INPUT_MOVE: Fa, INPUT_END: Ga, INPUT_CANCEL: Ha, STATE_POSSIBLE: nb, STATE_BEGAN: ob, STATE_CHANGED: pb, STATE_ENDED: qb, STATE_RECOGNIZED: rb, STATE_CANCELLED: sb, STATE_FAILED: tb, DIRECTION_NONE: Ia, DIRECTION_LEFT: Ja, DIRECTION_RIGHT: Ka, DIRECTION_UP: La, DIRECTION_DOWN: Ma, DIRECTION_HORIZONTAL: Na, DIRECTION_VERTICAL: Oa, DIRECTION_ALL: Pa, Manager: ia, Input: x, TouchAction: V, TouchInput: P, MouseInput: L, PointerEventInput: M, TouchMouseInput: R, SingleTouchInput: N, Recognizer: Y, AttrRecognizer: aa, Tap: ga, Pan: ba, Swipe: fa, Pinch: ca, Rotate: ea, Press: da, on: m, off: n, each: g, merge: ta, extend: sa, assign: la, inherit: i, bindFn: j, prefixed: u });var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};wb.Hammer = ha, "function" == typeof define && define.amd ? define(function () {
    return ha;
  }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha;
}(window, document, "Hammer");


},{}],13:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 *	jQuery dotdotdot 1.8.1
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 */
!function (t, e) {
  function n(t, e, n) {
    var r = t.children(),
        o = !1;t.empty();for (var i = 0, d = r.length; d > i; i++) {
      var l = r.eq(i);if (t.append(l), n && t.append(n), a(t, e)) {
        l.remove(), o = !0;break;
      }n && n.detach();
    }return o;
  }function r(e, n, i, d, l) {
    var s = !1,
        c = "a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",
        u = "script, .dotdotdot-keep";return e.contents().detach().each(function () {
      var h = this,
          f = t(h);if ("undefined" == typeof h) return !0;if (f.is(u)) e.append(f);else {
        if (s) return !0;e.append(f), !l || f.is(d.after) || f.find(d.after).length || e[e.is(c) ? "after" : "append"](l), a(i, d) && (s = 3 == h.nodeType ? o(f, n, i, d, l) : r(f, n, i, d, l)), s || l && l.detach();
      }
    }), n.addClass("is-truncated"), s;
  }function o(e, n, r, o, d) {
    var c = e[0];if (!c) return !1;var h = s(c),
        f = -1 !== h.indexOf(" ") ? " " : "　",
        p = "letter" == o.wrap ? "" : f,
        g = h.split(p),
        v = -1,
        w = -1,
        b = 0,
        y = g.length - 1;for (o.fallbackToLetter && 0 == b && 0 == y && (p = "", g = h.split(p), y = g.length - 1); y >= b && (0 != b || 0 != y);) {
      var m = Math.floor((b + y) / 2);if (m == w) break;w = m, l(c, g.slice(0, w + 1).join(p) + o.ellipsis), r.children().each(function () {
        t(this).toggle().toggle();
      }), a(r, o) ? (y = w, o.fallbackToLetter && 0 == b && 0 == y && (p = "", g = g[0].split(p), v = -1, w = -1, b = 0, y = g.length - 1)) : (v = w, b = w);
    }if (-1 == v || 1 == g.length && 0 == g[0].length) {
      var x = e.parent();e.detach();var C = d && d.closest(x).length ? d.length : 0;x.contents().length > C ? c = u(x.contents().eq(-1 - C), n) : (c = u(x, n, !0), C || x.detach()), c && (h = i(s(c), o), l(c, h), C && d && t(c).parent().append(d));
    } else h = i(g.slice(0, v + 1).join(p), o), l(c, h);return !0;
  }function a(t, e) {
    return t.innerHeight() > e.maxHeight;
  }function i(e, n) {
    for (; t.inArray(e.slice(-1), n.lastCharacter.remove) > -1;) {
      e = e.slice(0, -1);
    }return t.inArray(e.slice(-1), n.lastCharacter.noEllipsis) < 0 && (e += n.ellipsis), e;
  }function d(t) {
    return { width: t.innerWidth(), height: t.innerHeight() };
  }function l(t, e) {
    t.innerText ? t.innerText = e : t.nodeValue ? t.nodeValue = e : t.textContent && (t.textContent = e);
  }function s(t) {
    return t.innerText ? t.innerText : t.nodeValue ? t.nodeValue : t.textContent ? t.textContent : "";
  }function c(t) {
    do {
      t = t.previousSibling;
    } while (t && 1 !== t.nodeType && 3 !== t.nodeType);return t;
  }function u(e, n, r) {
    var o,
        a = e && e[0];if (a) {
      if (!r) {
        if (3 === a.nodeType) return a;if (t.trim(e.text())) return u(e.contents().last(), n);
      }for (o = c(a); !o;) {
        if (e = e.parent(), e.is(n) || !e.length) return !1;o = c(e[0]);
      }if (o) return u(t(o), n);
    }return !1;
  }function h(e, n) {
    return e ? "string" == typeof e ? (e = t(e, n), e.length ? e : !1) : e.jquery ? e : !1 : !1;
  }function f(t) {
    for (var e = t.innerHeight(), n = ["paddingTop", "paddingBottom"], r = 0, o = n.length; o > r; r++) {
      var a = parseInt(t.css(n[r]), 10);isNaN(a) && (a = 0), e -= a;
    }return e;
  }if (!t.fn.dotdotdot) {
    t.fn.dotdotdot = function (e) {
      if (0 == this.length) return t.fn.dotdotdot.debug('No element found for "' + this.selector + '".'), this;if (this.length > 1) return this.each(function () {
        t(this).dotdotdot(e);
      });var o = this,
          i = o.contents();o.data("dotdotdot") && o.trigger("destroy.dot"), o.data("dotdotdot-style", o.attr("style") || ""), o.css("word-wrap", "break-word"), "nowrap" === o.css("white-space") && o.css("white-space", "normal"), o.bind_events = function () {
        return o.bind("update.dot", function (e, d) {
          switch (o.removeClass("is-truncated"), e.preventDefault(), e.stopPropagation(), _typeof(l.height)) {case "number":
              l.maxHeight = l.height;break;case "function":
              l.maxHeight = l.height.call(o[0]);break;default:
              l.maxHeight = f(o);}l.maxHeight += l.tolerance, "undefined" != typeof d && (("string" == typeof d || "nodeType" in d && 1 === d.nodeType) && (d = t("<div />").append(d).contents()), d instanceof t && (i = d)), g = o.wrapInner('<div class="dotdotdot" />').children(), g.contents().detach().end().append(i.clone(!0)).find("br").replaceWith("  <br />  ").end().css({ height: "auto", width: "auto", border: "none", padding: 0, margin: 0 });var c = !1,
              u = !1;return s.afterElement && (c = s.afterElement.clone(!0), c.show(), s.afterElement.detach()), a(g, l) && (u = "children" == l.wrap ? n(g, l, c) : r(g, o, g, l, c)), g.replaceWith(g.contents()), g = null, t.isFunction(l.callback) && l.callback.call(o[0], u, i), s.isTruncated = u, u;
        }).bind("isTruncated.dot", function (t, e) {
          return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], s.isTruncated), s.isTruncated;
        }).bind("originalContent.dot", function (t, e) {
          return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], i), i;
        }).bind("destroy.dot", function (t) {
          t.preventDefault(), t.stopPropagation(), o.unwatch().unbind_events().contents().detach().end().append(i).attr("style", o.data("dotdotdot-style") || "").removeClass("is-truncated").data("dotdotdot", !1);
        }), o;
      }, o.unbind_events = function () {
        return o.unbind(".dot"), o;
      }, o.watch = function () {
        if (o.unwatch(), "window" == l.watch) {
          var e = t(window),
              n = e.width(),
              r = e.height();e.bind("resize.dot" + s.dotId, function () {
            n == e.width() && r == e.height() && l.windowResizeFix || (n = e.width(), r = e.height(), u && clearInterval(u), u = setTimeout(function () {
              o.trigger("update.dot");
            }, 100));
          });
        } else c = d(o), u = setInterval(function () {
          if (o.is(":visible")) {
            var t = d(o);c.width == t.width && c.height == t.height || (o.trigger("update.dot"), c = t);
          }
        }, 500);return o;
      }, o.unwatch = function () {
        return t(window).unbind("resize.dot" + s.dotId), u && clearInterval(u), o;
      };var l = t.extend(!0, {}, t.fn.dotdotdot.defaults, e),
          s = {},
          c = {},
          u = null,
          g = null;return l.lastCharacter.remove instanceof Array || (l.lastCharacter.remove = t.fn.dotdotdot.defaultArrays.lastCharacter.remove), l.lastCharacter.noEllipsis instanceof Array || (l.lastCharacter.noEllipsis = t.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis), s.afterElement = h(l.after, o), s.isTruncated = !1, s.dotId = p++, o.data("dotdotdot", !0).bind_events().trigger("update.dot"), l.watch && o.watch(), o;
    }, t.fn.dotdotdot.defaults = { ellipsis: "... ", wrap: "word", fallbackToLetter: !0, lastCharacter: {}, tolerance: 0, callback: null, after: null, height: null, watch: !1, windowResizeFix: !0 }, t.fn.dotdotdot.defaultArrays = { lastCharacter: { remove: [" ", "　", ",", ";", ".", "!", "?"], noEllipsis: [] } }, t.fn.dotdotdot.debug = function (t) {};var p = 1,
        g = t.fn.html;t.fn.html = function (n) {
      return n != e && !t.isFunction(n) && this.data("dotdotdot") ? this.trigger("update", [n]) : g.apply(this, arguments);
    };var v = t.fn.text;t.fn.text = function (n) {
      return n != e && !t.isFunction(n) && this.data("dotdotdot") ? (n = t("<div />").text(n).html(), this.trigger("update", [n])) : v.apply(this, arguments);
    };
  }
}(jQuery), jQuery(document).ready(function (t) {
  t(".dot-ellipsis").each(function () {
    var e = t(this).hasClass("dot-resize-update"),
        n = t(this).hasClass("dot-timer-update"),
        r = 0,
        o = t(this).attr("class").split(/\s+/);t.each(o, function (t, e) {
      var n = e.match(/^dot-height-(\d+)$/);null !== n && (r = Number(n[1]));
    });var a = new Object();n && (a.watch = !0), e && (a.watch = "window"), r > 0 && (a.height = r), t(this).dotdotdot(a);
  });
}), jQuery(window).load(function () {
  jQuery(".dot-ellipsis.dot-load-update").trigger("update.dot");
});

},{}],14:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 *
 * Plugin jquery imageframe
 * @version : 1.2
 	* 1.1 - ajout scalemode proportionalInside / proportionalOutside
 	* 1.2 - ajout scalemode stretch / widthOnly / heightOnly et blur enlevé
 * @author: Marc Loyat dankastudio - mailto:marc@dankastudio.fr
 *
 * Plugin jquery qui permet de gérer le préchargement, le redimensionnement et le positionnement d'images dans une zone d'affichage
 *
 * Vocabulaire :
 	* Nous appelons ici "frame" la zone d'affichage dans laquelle l'image sera redimensionnée
	* Nous appelons "anchor" le point de l'image qui sera toujours visible dans la frame quelquesoit sa taille
		* cette anchor (ou ancre) correspond à l'intersection entre un positionnement vertical (haut, milieu ou bas de l'image)
		* et un positionnement horizontal (gauche, centre ou droite de l'image)
	* Nous appelons "opacity" le pourcentage de transparence qu'aura l'image une fois affichée
		* où 0 correspond à totalement transparent et 100 à totalement opaque
	* Nous appelons "thumbnail" l'image miniature affichée en attendant que l'image haute définition soit chargée et affichée
	* Nous appelons "scaleMode" le mode de redimensionnement choisi qui permettra de déterminer la largeur et la hauteur de l'image
		* où proportionalOutside (valeur par défaut) permet le redimensionnement homotétique avec une image qui peut déborder de la frame
		* où proportionalInside permet le redimensionnement homotétique avec une image qui est comprise dans la frame
		* où stretch permet d'adapter l'image à la frame
		* où widthOnly adapte la largeur à la frame et laisse la hauteur d'origine
		* où heightOnly adapte la hauteur à la frame et laisse la largeur d'origine

 *
 * Prérequis html
 	* Les images à redimensionner doivent être des éléments enfants de la frame
	* Il est plus que fortement recommandé d'indiquer la taille originale de l'image via les attributs html width et height
 *
 *
 * Prérequis css
 	* La frame doit avoir les attributs css suivants :
		* display : block|inline-block
		* position : relative|absolute|fixed
		* overflow : hidden
	* Il est recommandé que la frame ait les attributs css suivants :
		* background : black
	*
	* Par ailleurs la frame doit avoir une taille définie
	*
	* Les images doivent avoir les attributs css suivants :
		* display : block
		* position : absolute
	* Il est recommandé que les images aient l'attribut css suivant
		* opacity : 0

 * Exemple de html

	<div class="js-ImageFrame VisuelHeader">
		<img src="urldelimage.jpg" width="1200" height="960"/>
	</div>

 * Exemple de css associé

	.js-ImageFrame{
		overflow:hidden;
		position:relative;
		width:100%;
		background: #000;

	}
	.js-ImageFrame img{
		display:block;
		position:absolute;
		opacity:0;
	}
	.VisuelHeader{
		width:100%;
		height:80vh
	}


 * Attributs html :
 	* Sur les images :
		* @width - indique la largeur native en pixel de l'image (ne pas mettre px)
		* @height - indique la hauteur native en pixel de l'image (ne pas mettre px)
		* @data-anchor - définit l'anchor de l'image
			* valeurs possibles : TL|TC|TR|ML|MC|MR|BL|BC|BR
		* @data-opacity - définit l'opacité finale de l'image.
			* Une fois l'image chargée un fade est réalisé automatiquement pour afficher l'image
			* valeurs possible : un nombre entier entre 0 et 100
		* @data-src - url de l'image grand format de remplacement
			* Lorsque l'image à afficher est un grand format et doit être affichée rapidement,
			* il est recommandé de mettre l'url de cette image grand format dans l'attribut data-src
			* et de mettre l'url d'un thumbnail de très petite taille dans l'attribut src.
			* Les attributs de taille doivent être ceux de l'image grand format.
			* L'image thumbnail est mise à la taille et floutée, une fois le chargement de l'image
			* grand format effectué, elle remplace le thumbnail en douceur
		* @data-scaleMode - définit le scaleMode de l'image
			* valeurs possibles : proportionalOutside|proportionalInside|stretch|widthOnly|heightOnly
	*
	* Sur les frames :
		* @data-imageframe - permet de surcharger les paramètres d'imageframe (voir ci-dessous)
			* Les paramètres doivent être sous la forme d'une chaîne json correspondant au params js
 *
 *
 *
 * Paramètre JS
 	* L'appel de la fonction jquery peut se faire selon les modalités suivantes
		* $(".monelement").imageframe();
		* $(".monelement").imageframe(settings);
		* $(".monelement").imageframe(action);
	*
	* @settings:Object - permet de régler quelques options du plugin
		* liveResize:Boolean (true par défaut) - indique au plugin si la frame (et les images) doivent être redimensionnées lorsque
			* la fenêtre navigateur est redimensionnée. Si le paramètre est indiqué à false, il est possible de forcer
			* le resize via l'action "resize" (cf section @action ci-dessous)
		* fadingTime:int (800 par défaut) - durée par défaut du fade en millisecondes à la fin du chargement
		* opacity:int (100 par défaut) - opacity par défaut lorsqu'elle n'est pas indiquée dans un paramètre html
		* anchor:String ("MC" par défaut) - anchor par défaut lorsqu'elle n'est pas indiquée dans un paramètre html
	*
	* @action:String - indique au plugin une action à réaliser sur l'élément déjà initialisé
		* Valeurs attendues :
			* "resize" - peremet de lancer un redimensionnement manuel de l'image en fonciton de la taille de la frame
 *
 *
 * Initialisation automatique :
 	* Les élements html avec la classe "js-ImageFrame" seront initialisés automatiquement avec les paramètres par défaut
	* Si le paramètre data-imageframe de ces élements est présent et correctement formaté, les paramètres par défaut seront surchargés
 *

Quelques exemples :

Exemple 1 :

	<div class="js-ImageFrame VisuelHeader">
		<img src="chemin/vers/mon/thumbnail.jpg"
			width="1200"
			height="960"
			data-anchor="BL"
			data-opacity="80"
			data-src="chemin/vers/mon/image_grand_format.jpg"
			/>
	</div>

	 Cet élément sera initialisé automatiquement, le thumbnail très léger sera chargé et affiché flou très rapidement,
	 puis l'image grand format sera chargée et affichée en remplacement du thumbnail
	 Ces images seront automatiquement redimensionnées et affichées en opacité 80%
	 Lors du redimensionnement, le coin bas gauche de l'image sera toujours affiché quelque soit la taille de la frame



 Exemple 2 :

	<div class="js-ImageFrame VisuelHeader" data-imageframe='{"liveResize":false,"anchor":"TR","opacity":40}'>
		<img src="chemin/vers/mon/image_grand_format.jpg"
			width="1200"
			height="960"
			/>
	</div>

	Cet élément sera initialisé automatiquement, un resize de l'image sera effectué à la fin de son chargement (et donc,
	au moment de son affichage). L'image sera affichée à 40% d'opacité et son anchor sera le coin haut droit.
	Lorsque l'utilisateur changera la taille de la fenêtre,	l'image ne sera pas redimensionnée automatiquement.
	Ce redimensionnement pourra être effectué via l'appel suivant :

	$(".VisuelHeader").imageframe("resize")


 Exemple 3 :

	<div class="VisuelPouet">
		<img src="chemin/vers/mon/image_grand_format.jpg" width="1200" height="960"/>
	</div>

 	$(".VisuelPouet").imageframe({opacity:60, anchor:"MR", fadingTime:1600})

	Cet élément sera initialisé au moment de l'appel js ci-dessus et l'image sera affichée une fois chargée
	par un fade d'une durée de 1.6 seconde jusqu'à atteindre 60% d'opacité. Son anchor sera le point médian droite de l'image

 *
 */
(function ($) {

	$.fn.imageframe = function () {

		var options = null,
		    action = null,
		    arg;
		// arguments
		for (var i = 0, l = arguments.length; i < l; i++) {
			arg = arguments[i];
			if ((typeof arg === "undefined" ? "undefined" : _typeof(arg)) == "object") {
				options = arg;
			}
			if (typeof arg == "string") {
				action = arg;
			}
		}
		// les actions
		// lance le resize à la mano de l'image
		var ACTION_RESIZE = "resize";
		// lance l'affichage de l'image
		var ACTION_SHOW = "show"; // todo
		// lance l'affichage de l'image grand format en remplacement
		// du thumbnail
		var ACTION_REPLACE_THUMBNAIL = "showHD"; // todo

		// différents types d'alignement possibles
		var ANCHOR_TOP_LEFT = "TL";
		var ANCHOR_TOP_CENTER = "TC";
		var ANCHOR_TOP_RIGHT = "TR";
		var ANCHOR_MIDDLE_LEFT = "ML";
		var ANCHOR_MIDDLE_CENTER = "MC";
		var ANCHOR_MIDDLE_RIGHT = "MR";
		var ANCHOR_BOTTOM_LEFT = "BL";
		var ANCHOR_BOTTOM_CENTER = "BC";
		var ANCHOR_BOTTOM_RIGHT = "BR";

		// scaleMode
		var SCALE_MODE_PROPORTIONAL_OUTSIDE = "proportionalOutside";
		var SCALE_MODE_PROPORTIONAL_INSIDE = "proportionalInside";
		var SCALE_MODE_STRETCH = "stretch";
		var SCALE_MODE_WIDTH_ONLY = "widthOnly";
		var SCALE_MODE_HEIGHT_ONLY = "heightOnly";

		var jwin = $(window);

		function _resize(jframe, img) {

			var frame = { w: jframe.width(), h: jframe.height() },
			    jimg = $(img),
			    w0 = jimg.attr("width"),
			    h0 = jimg.attr("height"),
			    opacity = _getOpacity(jimg),
			    anchor = jimg.attr("data-anchor"),
			    scaleMode = jimg.attr("data-scalemode");

			// passage en capitales de l'alignement
			anchor = anchor.toUpperCase();

			var k, w, h, x, y;
			// ratio de redimensionnement pour que l'image soit redimensionnée selon le scaleMode
			switch (scaleMode) {
				case SCALE_MODE_PROPORTIONAL_INSIDE:
					k = Math.min(frame.w / w0, frame.h / h0);
					break;
				default:
					k = Math.max(frame.w / w0, frame.h / h0);
			}

			// position x et y en fonction du scaleMode
			switch (scaleMode) {
				case SCALE_MODE_STRETCH:
					w = frame.w;
					h = frame.h;
					break;
				case SCALE_MODE_WIDTH_ONLY:
					w = frame.w;
					h = h0;
					break;
				case SCALE_MODE_HEIGHT_ONLY:
					w = w0;
					h = frame.h;
					break;
				default:
					w = w0 * k;
					h = h0 * k;
			}

			var vAlign = anchor.charAt(0),
			    align = anchor.charAt(1);
			// définition de l'alignement vertical
			switch (vAlign) {
				case "B":
					y = frame.h - h >> 0;
					break;
				case "T":
					y = 0;
					break;
				default:
					y = frame.h - h >> 1;
			}

			// définition de l'alignement horizontal
			switch (align) {
				case "R":
					x = frame.w - w >> 0;
					break;
				case "L":
					x = 0;
					break;
				default:
					x = frame.w - w >> 1;
			}

			// positionnement
			jimg.css({
				width: w + 1,
				height: h + 1,
				transform: "translate3D(" + x + "px, " + y + "px, 0)",
				webkitTransform: "translate3D(" + x + "px, " + y + "px, 0)"
			});
		}

		/**
   * extraction de l'opacité de l'image et conversion en float [0,1]
   */
		function _getOpacity(jel) {

			var opacity = jel.attr("data-opacity");
			// bornage de l'opacité et passage de [0,100] à [0,1]
			opacity = isNaN(opacity) ? 100 : opacity < 0 ? 0 : opacity > 100 ? 100 : opacity;
			return opacity / 100;
		}

		/**
   * fin du chargement de l'image grand format lorsqu'on a une procédure de préchargement
   */
		function _gfOnLoad(gfImg, jimg, fadingTime) {
			var jclone = jimg.clone();
			jclone.insertAfter(jimg);
			jimg.attr("src", gfImg.src);
			jclone.fadeTo(fadingTime, 0, function () {
				jclone.remove();
			});
		}

		/**
   * quand il manque un attribut de dimension (width, height)
   * on attend que l'image soit chargée pour récupérer ses dimensions et on réinitialise la frame
   */
		function _autoReinit(jframe) {

			$("img", jframe).each(function () {
				var jimg = $(this);
				jimg.one("load", function () {
					jimg.attr("width", this.width);
					jimg.attr("height", this.height);
					jframe.imageframe();
				}).each(function () {
					if (this.complete) {
						jimg.load();
					}
				});
			});
		}

		if (action == ACTION_RESIZE) {
			return this.each(function () {

				var jframe = $(this),
				    jimgs = $("img", this);

				jimgs.each(function () {
					_resize(jframe, this);
				});
			});
		}

		return this.each(function () {

			// paramètres par défaut surchargés par les params js s'il en est
			var settings = $.extend({
				liveResize: true,
				fadingTime: 800,
				opacity: 100,
				anchor: ANCHOR_MIDDLE_CENTER,
				scaleMode: SCALE_MODE_PROPORTIONAL_OUTSIDE,
				autoShow: true, // todo
				autoReplaceThumbnail: true // todo
			}, options);

			var jframe = $(this),
			    jimgs = $("img", this);

			// si des paramètres sont passés via le html (chaîne json)
			var htmlsettings = jframe.attr("data-imageframe");
			if (htmlsettings) {
				try {
					htmlsettings = JSON.parse(htmlsettings);
					htmlsettings = $.extend(options, htmlsettings);
					settings = $.extend(settings, htmlsettings);
				} catch (e) {}
			}

			jimgs.each(function () {

				var img = this,
				    jimg = $(this);

				// valeur par défaut si non définies comme attendu
				if (!jimg.attr("width")) {
					if (!this.width) {
						return _autoReinit(jframe);
					}
					jimg.attr("width", this.width);
				}
				if (!jimg.attr("height")) {
					if (!this.height) {
						return _autoReinit(jframe);
					}
					jimg.attr("height", this.height);
				}
				if (!jimg.attr("data-opacity")) {
					jimg.attr("data-opacity", settings.opacity);
				}
				if (!jimg.attr("data-anchor")) {
					jimg.attr("data-anchor", settings.anchor);
				}
				if (!jimg.attr("data-scalemode")) {
					jimg.attr("data-scalemode", settings.scaleMode);
				}

				// si l'image est une miniature et qu'un grand format est à précharger
				var gfURL = jimg.attr("data-src");
				if (gfURL) {
					var gfImg = new Image();
					gfImg.onload = function () {
						_gfOnLoad(gfImg, jimg, settings.fadingTime);
					};
					gfImg.src = gfURL;
				}

				// resize
				if (settings.liveResize) {
					jwin.resize(function () {
						_resize(jframe, img);
					});
				}
				_resize(jframe, this);

				// chargement
				jimg.one("load", function () {
					var jthis = $(this);
					jthis.fadeTo(settings.fadingTime, _getOpacity(jthis));
				}).each(function () {
					if (this.complete) {
						jimg.load();
					}
				});
			});
		});
	};

	$(function () {
		$(".js-ImageFrame").imageframe();
	});
})(jQuery);

},{}],15:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery v2.0.0 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license

*/
(function (e, undefined) {
  var t,
      n,
      r = typeof undefined === "undefined" ? "undefined" : _typeof(undefined),
      i = e.location,
      o = e.document,
      s = o.documentElement,
      a = e.jQuery,
      u = e.$,
      l = {},
      c = [],
      f = "2.0.0",
      p = c.concat,
      h = c.push,
      d = c.slice,
      g = c.indexOf,
      m = l.toString,
      y = l.hasOwnProperty,
      v = f.trim,
      x = function x(e, n) {
    return new x.fn.init(e, n, t);
  },
      b = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      w = /\S+/g,
      T = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      k = /^-ms-/,
      N = /-([\da-z])/gi,
      E = function E(e, t) {
    return t.toUpperCase();
  },
      S = function S() {
    o.removeEventListener("DOMContentLoaded", S, !1), e.removeEventListener("load", S, !1), x.ready();
  };x.fn = x.prototype = { jquery: f, constructor: x, init: function init(e, t, n) {
      var r, i;if (!e) return this;if ("string" == typeof e) {
        if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : T.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);if (r[1]) {
          if (t = t instanceof x ? t[0] : t, x.merge(this, x.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : o, !0)), C.test(r[1]) && x.isPlainObject(t)) for (r in t) {
            x.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
          }return this;
        }return i = o.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = o, this.selector = e, this;
      }return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? n.ready(e) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this));
    }, selector: "", length: 0, toArray: function toArray() {
      return d.call(this);
    }, get: function get(e) {
      return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e];
    }, pushStack: function pushStack(e) {
      var t = x.merge(this.constructor(), e);return t.prevObject = this, t.context = this.context, t;
    }, each: function each(e, t) {
      return x.each(this, e, t);
    }, ready: function ready(e) {
      return x.ready.promise().done(e), this;
    }, slice: function slice() {
      return this.pushStack(d.apply(this, arguments));
    }, first: function first() {
      return this.eq(0);
    }, last: function last() {
      return this.eq(-1);
    }, eq: function eq(e) {
      var t = this.length,
          n = +e + (0 > e ? t : 0);return this.pushStack(n >= 0 && t > n ? [this[n]] : []);
    }, map: function map(e) {
      return this.pushStack(x.map(this, function (t, n) {
        return e.call(t, n, t);
      }));
    }, end: function end() {
      return this.prevObject || this.constructor(null);
    }, push: h, sort: [].sort, splice: [].splice }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function () {
    var e,
        t,
        n,
        r,
        i,
        o,
        s = arguments[0] || {},
        a = 1,
        u = arguments.length,
        l = !1;for ("boolean" == typeof s && (l = s, s = arguments[1] || {}, a = 2), "object" == (typeof s === "undefined" ? "undefined" : _typeof(s)) || x.isFunction(s) || (s = {}), u === a && (s = this, --a); u > a; a++) {
      if (null != (e = arguments[a])) for (t in e) {
        n = s[t], r = e[t], s !== r && (l && r && (x.isPlainObject(r) || (i = x.isArray(r))) ? (i ? (i = !1, o = n && x.isArray(n) ? n : []) : o = n && x.isPlainObject(n) ? n : {}, s[t] = x.extend(l, o, r)) : r !== undefined && (s[t] = r));
      }
    }return s;
  }, x.extend({ expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""), noConflict: function noConflict(t) {
      return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = a), x;
    }, isReady: !1, readyWait: 1, holdReady: function holdReady(e) {
      e ? x.readyWait++ : x.ready(!0);
    }, ready: function ready(e) {
      (e === !0 ? --x.readyWait : x.isReady) || (x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(o, [x]), x.fn.trigger && x(o).trigger("ready").off("ready")));
    }, isFunction: function isFunction(e) {
      return "function" === x.type(e);
    }, isArray: Array.isArray, isWindow: function isWindow(e) {
      return null != e && e === e.window;
    }, isNumeric: function isNumeric(e) {
      return !isNaN(parseFloat(e)) && isFinite(e);
    }, type: function type(e) {
      return null == e ? e + "" : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e ? l[m.call(e)] || "object" : typeof e === "undefined" ? "undefined" : _typeof(e);
    }, isPlainObject: function isPlainObject(e) {
      if ("object" !== x.type(e) || e.nodeType || x.isWindow(e)) return !1;try {
        if (e.constructor && !y.call(e.constructor.prototype, "isPrototypeOf")) return !1;
      } catch (t) {
        return !1;
      }return !0;
    }, isEmptyObject: function isEmptyObject(e) {
      var t;for (t in e) {
        return !1;
      }return !0;
    }, error: function error(e) {
      throw Error(e);
    }, parseHTML: function parseHTML(e, t, n) {
      if (!e || "string" != typeof e) return null;"boolean" == typeof t && (n = t, t = !1), t = t || o;var r = C.exec(e),
          i = !n && [];return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes));
    }, parseJSON: JSON.parse, parseXML: function parseXML(e) {
      var t, n;if (!e || "string" != typeof e) return null;try {
        n = new DOMParser(), t = n.parseFromString(e, "text/xml");
      } catch (r) {
        t = undefined;
      }return (!t || t.getElementsByTagName("parsererror").length) && x.error("Invalid XML: " + e), t;
    }, noop: function noop() {}, globalEval: function globalEval(e) {
      var t,
          n = eval;e = x.trim(e), e && (1 === e.indexOf("use strict") ? (t = o.createElement("script"), t.text = e, o.head.appendChild(t).parentNode.removeChild(t)) : n(e));
    }, camelCase: function camelCase(e) {
      return e.replace(k, "ms-").replace(N, E);
    }, nodeName: function nodeName(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    }, each: function each(e, t, n) {
      var r,
          i = 0,
          o = e.length,
          s = j(e);if (n) {
        if (s) {
          for (; o > i; i++) {
            if (r = t.apply(e[i], n), r === !1) break;
          }
        } else for (i in e) {
          if (r = t.apply(e[i], n), r === !1) break;
        }
      } else if (s) {
        for (; o > i; i++) {
          if (r = t.call(e[i], i, e[i]), r === !1) break;
        }
      } else for (i in e) {
        if (r = t.call(e[i], i, e[i]), r === !1) break;
      }return e;
    }, trim: function trim(e) {
      return null == e ? "" : v.call(e);
    }, makeArray: function makeArray(e, t) {
      var n = t || [];return null != e && (j(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n;
    }, inArray: function inArray(e, t, n) {
      return null == t ? -1 : g.call(t, e, n);
    }, merge: function merge(e, t) {
      var n = t.length,
          r = e.length,
          i = 0;if ("number" == typeof n) for (; n > i; i++) {
        e[r++] = t[i];
      } else while (t[i] !== undefined) {
        e[r++] = t[i++];
      }return e.length = r, e;
    }, grep: function grep(e, t, n) {
      var r,
          i = [],
          o = 0,
          s = e.length;for (n = !!n; s > o; o++) {
        r = !!t(e[o], o), n !== r && i.push(e[o]);
      }return i;
    }, map: function map(e, t, n) {
      var r,
          i = 0,
          o = e.length,
          s = j(e),
          a = [];if (s) for (; o > i; i++) {
        r = t(e[i], i, n), null != r && (a[a.length] = r);
      } else for (i in e) {
        r = t(e[i], i, n), null != r && (a[a.length] = r);
      }return p.apply([], a);
    }, guid: 1, proxy: function proxy(e, t) {
      var n, r, i;return "string" == typeof t && (n = e[t], t = e, e = n), x.isFunction(e) ? (r = d.call(arguments, 2), i = function i() {
        return e.apply(t || this, r.concat(d.call(arguments)));
      }, i.guid = e.guid = e.guid || x.guid++, i) : undefined;
    }, access: function access(e, t, n, r, i, o, s) {
      var a = 0,
          u = e.length,
          l = null == n;if ("object" === x.type(n)) {
        i = !0;for (a in n) {
          x.access(e, t, a, n[a], !0, o, s);
        }
      } else if (r !== undefined && (i = !0, x.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function t(e, _t2, n) {
        return l.call(x(e), n);
      })), t)) for (; u > a; a++) {
        t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
      }return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
    }, now: Date.now, swap: function swap(e, t, n, r) {
      var i,
          o,
          s = {};for (o in t) {
        s[o] = e.style[o], e.style[o] = t[o];
      }i = n.apply(e, r || []);for (o in t) {
        e.style[o] = s[o];
      }return i;
    } }), x.ready.promise = function (t) {
    return n || (n = x.Deferred(), "complete" === o.readyState ? setTimeout(x.ready) : (o.addEventListener("DOMContentLoaded", S, !1), e.addEventListener("load", S, !1))), n.promise(t);
  }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
    l["[object " + t + "]"] = t.toLowerCase();
  });function j(e) {
    var t = e.length,
        n = x.type(e);return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e);
  }t = x(o), function (e, undefined) {
    var t,
        n,
        r,
        i,
        o,
        s,
        a,
        u,
        l,
        c,
        f,
        p,
        h,
        d,
        g,
        m,
        y = "sizzle" + -new Date(),
        v = e.document,
        b = {},
        w = 0,
        T = 0,
        C = ot(),
        k = ot(),
        N = ot(),
        E = !1,
        S = function S() {
      return 0;
    },
        j = typeof undefined === "undefined" ? "undefined" : _typeof(undefined),
        D = 1 << 31,
        A = [],
        L = A.pop,
        q = A.push,
        H = A.push,
        O = A.slice,
        F = A.indexOf || function (e) {
      var t = 0,
          n = this.length;for (; n > t; t++) {
        if (this[t] === e) return t;
      }return -1;
    },
        P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        R = "[\\x20\\t\\r\\n\\f]",
        M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        W = M.replace("w", "w#"),
        $ = "\\[" + R + "*(" + M + ")" + R + "*(?:([*^$|!~]?=)" + R + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + W + ")|)|)" + R + "*\\]",
        B = ":(" + M + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + $.replace(3, 8) + ")*)|.*)\\)|)",
        I = RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
        z = RegExp("^" + R + "*," + R + "*"),
        _ = RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
        X = RegExp(R + "*[+~]"),
        U = RegExp("=" + R + "*([^\\]'\"]*)" + R + "*\\]", "g"),
        Y = RegExp(B),
        V = RegExp("^" + W + "$"),
        G = { ID: RegExp("^#(" + M + ")"), CLASS: RegExp("^\\.(" + M + ")"), TAG: RegExp("^(" + M.replace("w", "w*") + ")"), ATTR: RegExp("^" + $), PSEUDO: RegExp("^" + B), CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"), "boolean": RegExp("^(?:" + P + ")$", "i"), needsContext: RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i") },
        J = /^[^{]+\{\s*\[native \w/,
        Q = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        K = /^(?:input|select|textarea|button)$/i,
        Z = /^h\d$/i,
        et = /'|\\/g,
        tt = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
        nt = function nt(e, t) {
      var n = "0x" + t - 65536;return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n);
    };try {
      H.apply(A = O.call(v.childNodes), v.childNodes), A[v.childNodes.length].nodeType;
    } catch (rt) {
      H = { apply: A.length ? function (e, t) {
          q.apply(e, O.call(t));
        } : function (e, t) {
          var n = e.length,
              r = 0;while (e[n++] = t[r++]) {}e.length = n - 1;
        } };
    }function it(e) {
      return J.test(e + "");
    }function ot() {
      var _e,
          t = [];return _e = function e(n, i) {
        return t.push(n += " ") > r.cacheLength && delete _e[t.shift()], _e[n] = i;
      };
    }function st(e) {
      return e[y] = !0, e;
    }function at(e) {
      var t = c.createElement("div");try {
        return !!e(t);
      } catch (n) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null;
      }
    }function ut(e, t, n, r) {
      var i, o, s, a, u, f, d, g, x, w;if ((t ? t.ownerDocument || t : v) !== c && l(t), t = t || c, n = n || [], !e || "string" != typeof e) return n;if (1 !== (a = t.nodeType) && 9 !== a) return [];if (p && !r) {
        if (i = Q.exec(e)) if (s = i[1]) {
          if (9 === a) {
            if (o = t.getElementById(s), !o || !o.parentNode) return n;if (o.id === s) return n.push(o), n;
          } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(s)) && m(t, o) && o.id === s) return n.push(o), n;
        } else {
          if (i[2]) return H.apply(n, t.getElementsByTagName(e)), n;if ((s = i[3]) && b.getElementsByClassName && t.getElementsByClassName) return H.apply(n, t.getElementsByClassName(s)), n;
        }if (b.qsa && (!h || !h.test(e))) {
          if (g = d = y, x = t, w = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
            f = gt(e), (d = t.getAttribute("id")) ? g = d.replace(et, "\\$&") : t.setAttribute("id", g), g = "[id='" + g + "'] ", u = f.length;while (u--) {
              f[u] = g + mt(f[u]);
            }x = X.test(e) && t.parentNode || t, w = f.join(",");
          }if (w) try {
            return H.apply(n, x.querySelectorAll(w)), n;
          } catch (T) {} finally {
            d || t.removeAttribute("id");
          }
        }
      }return kt(e.replace(I, "$1"), t, n, r);
    }o = ut.isXML = function (e) {
      var t = e && (e.ownerDocument || e).documentElement;return t ? "HTML" !== t.nodeName : !1;
    }, l = ut.setDocument = function (e) {
      var t = e ? e.ownerDocument || e : v;return t !== c && 9 === t.nodeType && t.documentElement ? (c = t, f = t.documentElement, p = !o(t), b.getElementsByTagName = at(function (e) {
        return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length;
      }), b.attributes = at(function (e) {
        return e.className = "i", !e.getAttribute("className");
      }), b.getElementsByClassName = at(function (e) {
        return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length;
      }), b.sortDetached = at(function (e) {
        return 1 & e.compareDocumentPosition(c.createElement("div"));
      }), b.getById = at(function (e) {
        return f.appendChild(e).id = y, !t.getElementsByName || !t.getElementsByName(y).length;
      }), b.getById ? (r.find.ID = function (e, t) {
        if (_typeof(t.getElementById) !== j && p) {
          var n = t.getElementById(e);return n && n.parentNode ? [n] : [];
        }
      }, r.filter.ID = function (e) {
        var t = e.replace(tt, nt);return function (e) {
          return e.getAttribute("id") === t;
        };
      }) : (r.find.ID = function (e, t) {
        if (_typeof(t.getElementById) !== j && p) {
          var n = t.getElementById(e);return n ? n.id === e || _typeof(n.getAttributeNode) !== j && n.getAttributeNode("id").value === e ? [n] : undefined : [];
        }
      }, r.filter.ID = function (e) {
        var t = e.replace(tt, nt);return function (e) {
          var n = _typeof(e.getAttributeNode) !== j && e.getAttributeNode("id");return n && n.value === t;
        };
      }), r.find.TAG = b.getElementsByTagName ? function (e, t) {
        return _typeof(t.getElementsByTagName) !== j ? t.getElementsByTagName(e) : undefined;
      } : function (e, t) {
        var n,
            r = [],
            i = 0,
            o = t.getElementsByTagName(e);if ("*" === e) {
          while (n = o[i++]) {
            1 === n.nodeType && r.push(n);
          }return r;
        }return o;
      }, r.find.CLASS = b.getElementsByClassName && function (e, t) {
        return _typeof(t.getElementsByClassName) !== j && p ? t.getElementsByClassName(e) : undefined;
      }, d = [], h = [], (b.qsa = it(t.querySelectorAll)) && (at(function (e) {
        e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || h.push("\\[" + R + "*(?:value|" + P + ")"), e.querySelectorAll(":checked").length || h.push(":checked");
      }), at(function (e) {
        var t = c.createElement("input");t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && h.push("[*^$]=" + R + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || h.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), h.push(",.*:");
      })), (b.matchesSelector = it(g = f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && at(function (e) {
        b.disconnectedMatch = g.call(e, "div"), g.call(e, "[s!='']:x"), d.push("!=", B);
      }), h = h.length && RegExp(h.join("|")), d = d.length && RegExp(d.join("|")), m = it(f.contains) || f.compareDocumentPosition ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e,
            r = t && t.parentNode;return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
      } : function (e, t) {
        if (t) while (t = t.parentNode) {
          if (t === e) return !0;
        }return !1;
      }, S = f.compareDocumentPosition ? function (e, n) {
        if (e === n) return E = !0, 0;var r = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);return r ? 1 & r || !b.sortDetached && n.compareDocumentPosition(e) === r ? e === t || m(v, e) ? -1 : n === t || m(v, n) ? 1 : u ? F.call(u, e) - F.call(u, n) : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1;
      } : function (e, n) {
        var r,
            i = 0,
            o = e.parentNode,
            s = n.parentNode,
            a = [e],
            l = [n];if (e === n) return E = !0, 0;if (!o || !s) return e === t ? -1 : n === t ? 1 : o ? -1 : s ? 1 : u ? F.call(u, e) - F.call(u, n) : 0;if (o === s) return lt(e, n);r = e;while (r = r.parentNode) {
          a.unshift(r);
        }r = n;while (r = r.parentNode) {
          l.unshift(r);
        }while (a[i] === l[i]) {
          i++;
        }return i ? lt(a[i], l[i]) : a[i] === v ? -1 : l[i] === v ? 1 : 0;
      }, c) : c;
    }, ut.matches = function (e, t) {
      return ut(e, null, null, t);
    }, ut.matchesSelector = function (e, t) {
      if ((e.ownerDocument || e) !== c && l(e), t = t.replace(U, "='$1']"), !(!b.matchesSelector || !p || d && d.test(t) || h && h.test(t))) try {
        var n = g.call(e, t);if (n || b.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
      } catch (r) {}return ut(t, c, null, [e]).length > 0;
    }, ut.contains = function (e, t) {
      return (e.ownerDocument || e) !== c && l(e), m(e, t);
    }, ut.attr = function (e, t) {
      (e.ownerDocument || e) !== c && l(e);var n = r.attrHandle[t.toLowerCase()],
          i = n && n(e, t, !p);return i === undefined ? b.attributes || !p ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null : i;
    }, ut.error = function (e) {
      throw Error("Syntax error, unrecognized expression: " + e);
    }, ut.uniqueSort = function (e) {
      var t,
          n = [],
          r = 0,
          i = 0;if (E = !b.detectDuplicates, u = !b.sortStable && e.slice(0), e.sort(S), E) {
        while (t = e[i++]) {
          t === e[i] && (r = n.push(i));
        }while (r--) {
          e.splice(n[r], 1);
        }
      }return e;
    };function lt(e, t) {
      var n = t && e,
          r = n && (~t.sourceIndex || D) - (~e.sourceIndex || D);if (r) return r;if (n) while (n = n.nextSibling) {
        if (n === t) return -1;
      }return e ? 1 : -1;
    }function ct(e, t, n) {
      var r;return n ? undefined : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null;
    }function ft(e, t, n) {
      var r;return n ? undefined : r = e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
    }function pt(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();return "input" === n && t.type === e;
      };
    }function ht(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();return ("input" === n || "button" === n) && t.type === e;
      };
    }function dt(e) {
      return st(function (t) {
        return t = +t, st(function (n, r) {
          var i,
              o = e([], n.length, t),
              s = o.length;while (s--) {
            n[i = o[s]] && (n[i] = !(r[i] = n[i]));
          }
        });
      });
    }i = ut.getText = function (e) {
      var t,
          n = "",
          r = 0,
          o = e.nodeType;if (o) {
        if (1 === o || 9 === o || 11 === o) {
          if ("string" == typeof e.textContent) return e.textContent;for (e = e.firstChild; e; e = e.nextSibling) {
            n += i(e);
          }
        } else if (3 === o || 4 === o) return e.nodeValue;
      } else for (; t = e[r]; r++) {
        n += i(t);
      }return n;
    }, r = ut.selectors = { cacheLength: 50, createPseudo: st, match: G, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(e) {
          return e[1] = e[1].replace(tt, nt), e[3] = (e[4] || e[5] || "").replace(tt, nt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
        }, CHILD: function CHILD(e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ut.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ut.error(e[0]), e;
        }, PSEUDO: function PSEUDO(e) {
          var t,
              n = !e[5] && e[2];return G.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && Y.test(n) && (t = gt(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
        } }, filter: { TAG: function TAG(e) {
          var t = e.replace(tt, nt).toLowerCase();return "*" === e ? function () {
            return !0;
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t;
          };
        }, CLASS: function CLASS(e) {
          var t = C[e + " "];return t || (t = RegExp("(^|" + R + ")" + e + "(" + R + "|$)")) && C(e, function (e) {
            return t.test("string" == typeof e.className && e.className || _typeof(e.getAttribute) !== j && e.getAttribute("class") || "");
          });
        }, ATTR: function ATTR(e, t, n) {
          return function (r) {
            var i = ut.attr(r, e);return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0;
          };
        }, CHILD: function CHILD(e, t, n, r, i) {
          var o = "nth" !== e.slice(0, 3),
              s = "last" !== e.slice(-4),
              a = "of-type" === t;return 1 === r && 0 === i ? function (e) {
            return !!e.parentNode;
          } : function (t, n, u) {
            var l,
                c,
                f,
                p,
                h,
                d,
                g = o !== s ? "nextSibling" : "previousSibling",
                m = t.parentNode,
                v = a && t.nodeName.toLowerCase(),
                x = !u && !a;if (m) {
              if (o) {
                while (g) {
                  f = t;while (f = f[g]) {
                    if (a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                  }d = g = "only" === e && !d && "nextSibling";
                }return !0;
              }if (d = [s ? m.firstChild : m.lastChild], s && x) {
                c = m[y] || (m[y] = {}), l = c[e] || [], h = l[0] === w && l[1], p = l[0] === w && l[2], f = h && m.childNodes[h];while (f = ++h && f && f[g] || (p = h = 0) || d.pop()) {
                  if (1 === f.nodeType && ++p && f === t) {
                    c[e] = [w, h, p];break;
                  }
                }
              } else if (x && (l = (t[y] || (t[y] = {}))[e]) && l[0] === w) p = l[1];else while (f = ++h && f && f[g] || (p = h = 0) || d.pop()) {
                if ((a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) && ++p && (x && ((f[y] || (f[y] = {}))[e] = [w, p]), f === t)) break;
              }return p -= i, p === r || 0 === p % r && p / r >= 0;
            }
          };
        }, PSEUDO: function PSEUDO(e, t) {
          var n,
              i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || ut.error("unsupported pseudo: " + e);return i[y] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? st(function (e, n) {
            var r,
                o = i(e, t),
                s = o.length;while (s--) {
              r = F.call(e, o[s]), e[r] = !(n[r] = o[s]);
            }
          }) : function (e) {
            return i(e, 0, n);
          }) : i;
        } }, pseudos: { not: st(function (e) {
          var t = [],
              n = [],
              r = s(e.replace(I, "$1"));return r[y] ? st(function (e, t, n, i) {
            var o,
                s = r(e, null, i, []),
                a = e.length;while (a--) {
              (o = s[a]) && (e[a] = !(t[a] = o));
            }
          }) : function (e, i, o) {
            return t[0] = e, r(t, null, o, n), !n.pop();
          };
        }), has: st(function (e) {
          return function (t) {
            return ut(e, t).length > 0;
          };
        }), contains: st(function (e) {
          return function (t) {
            return (t.textContent || t.innerText || i(t)).indexOf(e) > -1;
          };
        }), lang: st(function (e) {
          return V.test(e || "") || ut.error("unsupported lang: " + e), e = e.replace(tt, nt).toLowerCase(), function (t) {
            var n;do {
              if (n = p ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
            } while ((t = t.parentNode) && 1 === t.nodeType);return !1;
          };
        }), target: function target(t) {
          var n = e.location && e.location.hash;return n && n.slice(1) === t.id;
        }, root: function root(e) {
          return e === f;
        }, focus: function focus(e) {
          return e === c.activeElement && (!c.hasFocus || c.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
        }, enabled: function enabled(e) {
          return e.disabled === !1;
        }, disabled: function disabled(e) {
          return e.disabled === !0;
        }, checked: function checked(e) {
          var t = e.nodeName.toLowerCase();return "input" === t && !!e.checked || "option" === t && !!e.selected;
        }, selected: function selected(e) {
          return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
        }, empty: function empty(e) {
          for (e = e.firstChild; e; e = e.nextSibling) {
            if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
          }return !0;
        }, parent: function parent(e) {
          return !r.pseudos.empty(e);
        }, header: function header(e) {
          return Z.test(e.nodeName);
        }, input: function input(e) {
          return K.test(e.nodeName);
        }, button: function button(e) {
          var t = e.nodeName.toLowerCase();return "input" === t && "button" === e.type || "button" === t;
        }, text: function text(e) {
          var t;return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type);
        }, first: dt(function () {
          return [0];
        }), last: dt(function (e, t) {
          return [t - 1];
        }), eq: dt(function (e, t, n) {
          return [0 > n ? n + t : n];
        }), even: dt(function (e, t) {
          var n = 0;for (; t > n; n += 2) {
            e.push(n);
          }return e;
        }), odd: dt(function (e, t) {
          var n = 1;for (; t > n; n += 2) {
            e.push(n);
          }return e;
        }), lt: dt(function (e, t, n) {
          var r = 0 > n ? n + t : n;for (; --r >= 0;) {
            e.push(r);
          }return e;
        }), gt: dt(function (e, t, n) {
          var r = 0 > n ? n + t : n;for (; t > ++r;) {
            e.push(r);
          }return e;
        }) } };for (t in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
      r.pseudos[t] = pt(t);
    }for (t in { submit: !0, reset: !0 }) {
      r.pseudos[t] = ht(t);
    }function gt(e, t) {
      var n,
          i,
          o,
          s,
          a,
          u,
          l,
          c = k[e + " "];if (c) return t ? 0 : c.slice(0);a = e, u = [], l = r.preFilter;while (a) {
        (!n || (i = z.exec(a))) && (i && (a = a.slice(i[0].length) || a), u.push(o = [])), n = !1, (i = _.exec(a)) && (n = i.shift(), o.push({ value: n, type: i[0].replace(I, " ") }), a = a.slice(n.length));for (s in r.filter) {
          !(i = G[s].exec(a)) || l[s] && !(i = l[s](i)) || (n = i.shift(), o.push({ value: n, type: s, matches: i }), a = a.slice(n.length));
        }if (!n) break;
      }return t ? a.length : a ? ut.error(e) : k(e, u).slice(0);
    }function mt(e) {
      var t = 0,
          n = e.length,
          r = "";for (; n > t; t++) {
        r += e[t].value;
      }return r;
    }function yt(e, t, r) {
      var i = t.dir,
          o = r && "parentNode" === i,
          s = T++;return t.first ? function (t, n, r) {
        while (t = t[i]) {
          if (1 === t.nodeType || o) return e(t, n, r);
        }
      } : function (t, r, a) {
        var u,
            l,
            c,
            f = w + " " + s;if (a) {
          while (t = t[i]) {
            if ((1 === t.nodeType || o) && e(t, r, a)) return !0;
          }
        } else while (t = t[i]) {
          if (1 === t.nodeType || o) if (c = t[y] || (t[y] = {}), (l = c[i]) && l[0] === f) {
            if ((u = l[1]) === !0 || u === n) return u === !0;
          } else if (l = c[i] = [f], l[1] = e(t, r, a) || n, l[1] === !0) return !0;
        }
      };
    }function vt(e) {
      return e.length > 1 ? function (t, n, r) {
        var i = e.length;while (i--) {
          if (!e[i](t, n, r)) return !1;
        }return !0;
      } : e[0];
    }function xt(e, t, n, r, i) {
      var o,
          s = [],
          a = 0,
          u = e.length,
          l = null != t;for (; u > a; a++) {
        (o = e[a]) && (!n || n(o, r, i)) && (s.push(o), l && t.push(a));
      }return s;
    }function bt(e, t, n, r, i, o) {
      return r && !r[y] && (r = bt(r)), i && !i[y] && (i = bt(i, o)), st(function (o, s, a, u) {
        var l,
            c,
            f,
            p = [],
            h = [],
            d = s.length,
            g = o || Ct(t || "*", a.nodeType ? [a] : a, []),
            m = !e || !o && t ? g : xt(g, p, e, a, u),
            y = n ? i || (o ? e : d || r) ? [] : s : m;if (n && n(m, y, a, u), r) {
          l = xt(y, h), r(l, [], a, u), c = l.length;while (c--) {
            (f = l[c]) && (y[h[c]] = !(m[h[c]] = f));
          }
        }if (o) {
          if (i || e) {
            if (i) {
              l = [], c = y.length;while (c--) {
                (f = y[c]) && l.push(m[c] = f);
              }i(null, y = [], l, u);
            }c = y.length;while (c--) {
              (f = y[c]) && (l = i ? F.call(o, f) : p[c]) > -1 && (o[l] = !(s[l] = f));
            }
          }
        } else y = xt(y === s ? y.splice(d, y.length) : y), i ? i(null, s, y, u) : H.apply(s, y);
      });
    }function wt(e) {
      var t,
          n,
          i,
          o = e.length,
          s = r.relative[e[0].type],
          u = s || r.relative[" "],
          l = s ? 1 : 0,
          c = yt(function (e) {
        return e === t;
      }, u, !0),
          f = yt(function (e) {
        return F.call(t, e) > -1;
      }, u, !0),
          p = [function (e, n, r) {
        return !s && (r || n !== a) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));
      }];for (; o > l; l++) {
        if (n = r.relative[e[l].type]) p = [yt(vt(p), n)];else {
          if (n = r.filter[e[l].type].apply(null, e[l].matches), n[y]) {
            for (i = ++l; o > i; i++) {
              if (r.relative[e[i].type]) break;
            }return bt(l > 1 && vt(p), l > 1 && mt(e.slice(0, l - 1)).replace(I, "$1"), n, i > l && wt(e.slice(l, i)), o > i && wt(e = e.slice(i)), o > i && mt(e));
          }p.push(n);
        }
      }return vt(p);
    }function Tt(e, t) {
      var i = 0,
          o = t.length > 0,
          s = e.length > 0,
          u = function u(_u, l, f, p, h) {
        var d,
            g,
            m,
            y = [],
            v = 0,
            x = "0",
            b = _u && [],
            T = null != h,
            C = a,
            k = _u || s && r.find.TAG("*", h && l.parentNode || l),
            N = w += null == C ? 1 : Math.random() || .1;for (T && (a = l !== c && l, n = i); null != (d = k[x]); x++) {
          if (s && d) {
            g = 0;while (m = e[g++]) {
              if (m(d, l, f)) {
                p.push(d);break;
              }
            }T && (w = N, n = ++i);
          }o && ((d = !m && d) && v--, _u && b.push(d));
        }if (v += x, o && x !== v) {
          g = 0;while (m = t[g++]) {
            m(b, y, l, f);
          }if (_u) {
            if (v > 0) while (x--) {
              b[x] || y[x] || (y[x] = L.call(p));
            }y = xt(y);
          }H.apply(p, y), T && !_u && y.length > 0 && v + t.length > 1 && ut.uniqueSort(p);
        }return T && (w = N, a = C), b;
      };return o ? st(u) : u;
    }s = ut.compile = function (e, t) {
      var n,
          r = [],
          i = [],
          o = N[e + " "];if (!o) {
        t || (t = gt(e)), n = t.length;while (n--) {
          o = wt(t[n]), o[y] ? r.push(o) : i.push(o);
        }o = N(e, Tt(i, r));
      }return o;
    };function Ct(e, t, n) {
      var r = 0,
          i = t.length;for (; i > r; r++) {
        ut(e, t[r], n);
      }return n;
    }function kt(e, t, n, i) {
      var o,
          a,
          u,
          l,
          c,
          f = gt(e);if (!i && 1 === f.length) {
        if (a = f[0] = f[0].slice(0), a.length > 2 && "ID" === (u = a[0]).type && 9 === t.nodeType && p && r.relative[a[1].type]) {
          if (t = (r.find.ID(u.matches[0].replace(tt, nt), t) || [])[0], !t) return n;e = e.slice(a.shift().value.length);
        }o = G.needsContext.test(e) ? 0 : a.length;while (o--) {
          if (u = a[o], r.relative[l = u.type]) break;if ((c = r.find[l]) && (i = c(u.matches[0].replace(tt, nt), X.test(a[0].type) && t.parentNode || t))) {
            if (a.splice(o, 1), e = i.length && mt(a), !e) return H.apply(n, i), n;break;
          }
        }
      }return s(e, f)(i, t, !p, n, X.test(e)), n;
    }r.pseudos.nth = r.pseudos.eq;function Nt() {}Nt.prototype = r.filters = r.pseudos, r.setFilters = new Nt(), b.sortStable = y.split("").sort(S).join("") === y, l(), [0, 0].sort(S), b.detectDuplicates = E, at(function (e) {
      if (e.innerHTML = "<a href='#'></a>", "#" !== e.firstChild.getAttribute("href")) {
        var t = "type|href|height|width".split("|"),
            n = t.length;while (n--) {
          r.attrHandle[t[n]] = ft;
        }
      }
    }), at(function (e) {
      if (null != e.getAttribute("disabled")) {
        var t = P.split("|"),
            n = t.length;while (n--) {
          r.attrHandle[t[n]] = ct;
        }
      }
    }), x.find = ut, x.expr = ut.selectors, x.expr[":"] = x.expr.pseudos, x.unique = ut.uniqueSort, x.text = ut.getText, x.isXMLDoc = ut.isXML, x.contains = ut.contains;
  }(e);var D = {};function A(e) {
    var t = D[e] = {};return x.each(e.match(w) || [], function (e, n) {
      t[n] = !0;
    }), t;
  }x.Callbacks = function (e) {
    e = "string" == typeof e ? D[e] || A(e) : x.extend({}, e);var t,
        n,
        r,
        i,
        o,
        s,
        a = [],
        u = !e.once && [],
        l = function l(f) {
      for (t = e.memory && f, n = !0, s = i || 0, i = 0, o = a.length, r = !0; a && o > s; s++) {
        if (a[s].apply(f[0], f[1]) === !1 && e.stopOnFalse) {
          t = !1;break;
        }
      }r = !1, a && (u ? u.length && l(u.shift()) : t ? a = [] : c.disable());
    },
        c = { add: function add() {
        if (a) {
          var n = a.length;(function s(t) {
            x.each(t, function (t, n) {
              var r = x.type(n);"function" === r ? e.unique && c.has(n) || a.push(n) : n && n.length && "string" !== r && s(n);
            });
          })(arguments), r ? o = a.length : t && (i = n, l(t));
        }return this;
      }, remove: function remove() {
        return a && x.each(arguments, function (e, t) {
          var n;while ((n = x.inArray(t, a, n)) > -1) {
            a.splice(n, 1), r && (o >= n && o--, s >= n && s--);
          }
        }), this;
      }, has: function has(e) {
        return e ? x.inArray(e, a) > -1 : !(!a || !a.length);
      }, empty: function empty() {
        return a = [], o = 0, this;
      }, disable: function disable() {
        return a = u = t = undefined, this;
      }, disabled: function disabled() {
        return !a;
      }, lock: function lock() {
        return u = undefined, t || c.disable(), this;
      }, locked: function locked() {
        return !u;
      }, fireWith: function fireWith(e, t) {
        return t = t || [], t = [e, t.slice ? t.slice() : t], !a || n && !u || (r ? u.push(t) : l(t)), this;
      }, fire: function fire() {
        return c.fireWith(this, arguments), this;
      }, fired: function fired() {
        return !!n;
      } };return c;
  }, x.extend({ Deferred: function Deferred(e) {
      var t = [["resolve", "done", x.Callbacks("once memory"), "resolved"], ["reject", "fail", x.Callbacks("once memory"), "rejected"], ["notify", "progress", x.Callbacks("memory")]],
          n = "pending",
          r = { state: function state() {
          return n;
        }, always: function always() {
          return i.done(arguments).fail(arguments), this;
        }, then: function then() {
          var e = arguments;return x.Deferred(function (n) {
            x.each(t, function (t, o) {
              var s = o[0],
                  a = x.isFunction(e[t]) && e[t];i[o[1]](function () {
                var e = a && a.apply(this, arguments);e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === r ? n.promise() : this, a ? [e] : arguments);
              });
            }), e = null;
          }).promise();
        }, promise: function promise(e) {
          return null != e ? x.extend(e, r) : r;
        } },
          i = {};return r.pipe = r.then, x.each(t, function (e, o) {
        var s = o[2],
            a = o[3];r[o[1]] = s.add, a && s.add(function () {
          n = a;
        }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
          return i[o[0] + "With"](this === i ? r : this, arguments), this;
        }, i[o[0] + "With"] = s.fireWith;
      }), r.promise(i), e && e.call(i, i), i;
    }, when: function when(e) {
      var t = 0,
          n = d.call(arguments),
          r = n.length,
          i = 1 !== r || e && x.isFunction(e.promise) ? r : 0,
          o = 1 === i ? e : x.Deferred(),
          s = function s(e, t, n) {
        return function (r) {
          t[e] = this, n[e] = arguments.length > 1 ? d.call(arguments) : r, n === a ? o.notifyWith(t, n) : --i || o.resolveWith(t, n);
        };
      },
          a,
          u,
          l;if (r > 1) for (a = Array(r), u = Array(r), l = Array(r); r > t; t++) {
        n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(s(t, l, n)).fail(o.reject).progress(s(t, u, a)) : --i;
      }return i || o.resolveWith(l, n), o.promise();
    } }), x.support = function (t) {
    var n = o.createElement("input"),
        r = o.createDocumentFragment(),
        i = o.createElement("div"),
        s = o.createElement("select"),
        a = s.appendChild(o.createElement("option"));return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = a.selected, t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, t.noCloneChecked = n.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !a.disabled, n = o.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, n.setAttribute("checked", "t"), n.setAttribute("name", "t"), r.appendChild(n), t.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked, t.focusinBubbles = "onfocusin" in e, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === i.style.backgroundClip, x(function () {
      var n,
          r,
          s = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
          a = o.getElementsByTagName("body")[0];a && (n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(i), i.innerHTML = "", i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", x.swap(a, null != a.style.zoom ? { zoom: 1 } : {}, function () {
        t.boxSizing = 4 === i.offsetWidth;
      }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || { width: "4px" }).width, r = i.appendChild(o.createElement("div")), r.style.cssText = i.style.cssText = s, r.style.marginRight = r.style.width = "0", i.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), a.removeChild(n));
    }), t) : t;
  }({});var L,
      q,
      H = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
      O = /([A-Z])/g;function F() {
    Object.defineProperty(this.cache = {}, 0, { get: function get() {
        return {};
      } }), this.expando = x.expando + Math.random();
  }F.uid = 1, F.accepts = function (e) {
    return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0;
  }, F.prototype = { key: function key(e) {
      if (!F.accepts(e)) return 0;var t = {},
          n = e[this.expando];if (!n) {
        n = F.uid++;try {
          t[this.expando] = { value: n }, Object.defineProperties(e, t);
        } catch (r) {
          t[this.expando] = n, x.extend(e, t);
        }
      }return this.cache[n] || (this.cache[n] = {}), n;
    }, set: function set(e, t, n) {
      var r,
          i = this.key(e),
          o = this.cache[i];if ("string" == typeof t) o[t] = n;else if (x.isEmptyObject(o)) this.cache[i] = t;else for (r in t) {
        o[r] = t[r];
      }
    }, get: function get(e, t) {
      var n = this.cache[this.key(e)];return t === undefined ? n : n[t];
    }, access: function access(e, t, n) {
      return t === undefined || t && "string" == typeof t && n === undefined ? this.get(e, t) : (this.set(e, t, n), n !== undefined ? n : t);
    }, remove: function remove(e, t) {
      var n,
          r,
          i = this.key(e),
          o = this.cache[i];if (t === undefined) this.cache[i] = {};else {
        x.isArray(t) ? r = t.concat(t.map(x.camelCase)) : t in o ? r = [t] : (r = x.camelCase(t), r = r in o ? [r] : r.match(w) || []), n = r.length;while (n--) {
          delete o[r[n]];
        }
      }
    }, hasData: function hasData(e) {
      return !x.isEmptyObject(this.cache[e[this.expando]] || {});
    }, discard: function discard(e) {
      delete this.cache[this.key(e)];
    } }, L = new F(), q = new F(), x.extend({ acceptData: F.accepts, hasData: function hasData(e) {
      return L.hasData(e) || q.hasData(e);
    }, data: function data(e, t, n) {
      return L.access(e, t, n);
    }, removeData: function removeData(e, t) {
      L.remove(e, t);
    }, _data: function _data(e, t, n) {
      return q.access(e, t, n);
    }, _removeData: function _removeData(e, t) {
      q.remove(e, t);
    } }), x.fn.extend({ data: function data(e, t) {
      var n,
          r,
          i = this[0],
          o = 0,
          s = null;if (e === undefined) {
        if (this.length && (s = L.get(i), 1 === i.nodeType && !q.get(i, "hasDataAttrs"))) {
          for (n = i.attributes; n.length > o; o++) {
            r = n[o].name, 0 === r.indexOf("data-") && (r = x.camelCase(r.substring(5)), P(i, r, s[r]));
          }q.set(i, "hasDataAttrs", !0);
        }return s;
      }return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? this.each(function () {
        L.set(this, e);
      }) : x.access(this, function (t) {
        var n,
            r = x.camelCase(e);if (i && t === undefined) {
          if (n = L.get(i, e), n !== undefined) return n;if (n = L.get(i, r), n !== undefined) return n;if (n = P(i, r, undefined), n !== undefined) return n;
        } else this.each(function () {
          var n = L.get(this, r);L.set(this, r, t), -1 !== e.indexOf("-") && n !== undefined && L.set(this, e, t);
        });
      }, null, t, arguments.length > 1, null, !0);
    }, removeData: function removeData(e) {
      return this.each(function () {
        L.remove(this, e);
      });
    } });function P(e, t, n) {
    var r;if (n === undefined && 1 === e.nodeType) if (r = "data-" + t.replace(O, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
      try {
        n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : H.test(n) ? JSON.parse(n) : n;
      } catch (i) {}L.set(e, t, n);
    } else n = undefined;return n;
  }x.extend({ queue: function queue(e, t, n) {
      var r;return e ? (t = (t || "fx") + "queue", r = q.get(e, t), n && (!r || x.isArray(n) ? r = q.access(e, t, x.makeArray(n)) : r.push(n)), r || []) : undefined;
    }, dequeue: function dequeue(e, t) {
      t = t || "fx";var n = x.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = x._queueHooks(e, t),
          s = function s() {
        x.dequeue(e, t);
      };"inprogress" === i && (i = n.shift(), r--), o.cur = i, i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire();
    }, _queueHooks: function _queueHooks(e, t) {
      var n = t + "queueHooks";return q.get(e, n) || q.access(e, n, { empty: x.Callbacks("once memory").add(function () {
          q.remove(e, [t + "queue", n]);
        }) });
    } }), x.fn.extend({ queue: function queue(e, t) {
      var n = 2;return "string" != typeof e && (t = e, e = "fx", n--), n > arguments.length ? x.queue(this[0], e) : t === undefined ? this : this.each(function () {
        var n = x.queue(this, e, t);
        x._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && x.dequeue(this, e);
      });
    }, dequeue: function dequeue(e) {
      return this.each(function () {
        x.dequeue(this, e);
      });
    }, delay: function delay(e, t) {
      return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
        var r = setTimeout(t, e);n.stop = function () {
          clearTimeout(r);
        };
      });
    }, clearQueue: function clearQueue(e) {
      return this.queue(e || "fx", []);
    }, promise: function promise(e, t) {
      var n,
          r = 1,
          i = x.Deferred(),
          o = this,
          s = this.length,
          a = function a() {
        --r || i.resolveWith(o, [o]);
      };"string" != typeof e && (t = e, e = undefined), e = e || "fx";while (s--) {
        n = q.get(o[s], e + "queueHooks"), n && n.empty && (r++, n.empty.add(a));
      }return a(), i.promise(t);
    } });var R,
      M,
      W = /[\t\r\n]/g,
      $ = /\r/g,
      B = /^(?:input|select|textarea|button)$/i;x.fn.extend({ attr: function attr(e, t) {
      return x.access(this, x.attr, e, t, arguments.length > 1);
    }, removeAttr: function removeAttr(e) {
      return this.each(function () {
        x.removeAttr(this, e);
      });
    }, prop: function prop(e, t) {
      return x.access(this, x.prop, e, t, arguments.length > 1);
    }, removeProp: function removeProp(e) {
      return this.each(function () {
        delete this[x.propFix[e] || e];
      });
    }, addClass: function addClass(e) {
      var t,
          n,
          r,
          i,
          o,
          s = 0,
          a = this.length,
          u = "string" == typeof e && e;if (x.isFunction(e)) return this.each(function (t) {
        x(this).addClass(e.call(this, t, this.className));
      });if (u) for (t = (e || "").match(w) || []; a > s; s++) {
        if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : " ")) {
          o = 0;while (i = t[o++]) {
            0 > r.indexOf(" " + i + " ") && (r += i + " ");
          }n.className = x.trim(r);
        }
      }return this;
    }, removeClass: function removeClass(e) {
      var t,
          n,
          r,
          i,
          o,
          s = 0,
          a = this.length,
          u = 0 === arguments.length || "string" == typeof e && e;if (x.isFunction(e)) return this.each(function (t) {
        x(this).removeClass(e.call(this, t, this.className));
      });if (u) for (t = (e || "").match(w) || []; a > s; s++) {
        if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : "")) {
          o = 0;while (i = t[o++]) {
            while (r.indexOf(" " + i + " ") >= 0) {
              r = r.replace(" " + i + " ", " ");
            }
          }n.className = e ? x.trim(r) : "";
        }
      }return this;
    }, toggleClass: function toggleClass(e, t) {
      var n = typeof e === "undefined" ? "undefined" : _typeof(e),
          i = "boolean" == typeof t;return x.isFunction(e) ? this.each(function (n) {
        x(this).toggleClass(e.call(this, n, this.className, t), t);
      }) : this.each(function () {
        if ("string" === n) {
          var o,
              s = 0,
              a = x(this),
              u = t,
              l = e.match(w) || [];while (o = l[s++]) {
            u = i ? u : !a.hasClass(o), a[u ? "addClass" : "removeClass"](o);
          }
        } else (n === r || "boolean" === n) && (this.className && q.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : q.get(this, "__className__") || "");
      });
    }, hasClass: function hasClass(e) {
      var t = " " + e + " ",
          n = 0,
          r = this.length;for (; r > n; n++) {
        if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(W, " ").indexOf(t) >= 0) return !0;
      }return !1;
    }, val: function val(e) {
      var t,
          n,
          r,
          i = this[0];{
        if (arguments.length) return r = x.isFunction(e), this.each(function (n) {
          var i,
              o = x(this);1 === this.nodeType && (i = r ? e.call(this, n, o.val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : x.isArray(i) && (i = x.map(i, function (e) {
            return null == e ? "" : e + "";
          })), t = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], t && "set" in t && t.set(this, i, "value") !== undefined || (this.value = i));
        });if (i) return t = x.valHooks[i.type] || x.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, "string" == typeof n ? n.replace($, "") : null == n ? "" : n);
      }
    } }), x.extend({ valHooks: { option: { get: function get(e) {
          var t = e.attributes.value;return !t || t.specified ? e.value : e.text;
        } }, select: { get: function get(e) {
          var t,
              n,
              r = e.options,
              i = e.selectedIndex,
              o = "select-one" === e.type || 0 > i,
              s = o ? null : [],
              a = o ? i + 1 : r.length,
              u = 0 > i ? a : o ? i : 0;for (; a > u; u++) {
            if (n = r[u], !(!n.selected && u !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) {
              if (t = x(n).val(), o) return t;s.push(t);
            }
          }return s;
        }, set: function set(e, t) {
          var n,
              r,
              i = e.options,
              o = x.makeArray(t),
              s = i.length;while (s--) {
            r = i[s], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0);
          }return n || (e.selectedIndex = -1), o;
        } } }, attr: function attr(e, t, n) {
      var i,
          o,
          s = e.nodeType;if (e && 3 !== s && 8 !== s && 2 !== s) return _typeof(e.getAttribute) === r ? x.prop(e, t, n) : (1 === s && x.isXMLDoc(e) || (t = t.toLowerCase(), i = x.attrHooks[t] || (x.expr.match.boolean.test(t) ? M : R)), n === undefined ? i && "get" in i && null !== (o = i.get(e, t)) ? o : (o = x.find.attr(e, t), null == o ? undefined : o) : null !== n ? i && "set" in i && (o = i.set(e, n, t)) !== undefined ? o : (e.setAttribute(t, n + ""), n) : (x.removeAttr(e, t), undefined));
    }, removeAttr: function removeAttr(e, t) {
      var n,
          r,
          i = 0,
          o = t && t.match(w);if (o && 1 === e.nodeType) while (n = o[i++]) {
        r = x.propFix[n] || n, x.expr.match.boolean.test(n) && (e[r] = !1), e.removeAttribute(n);
      }
    }, attrHooks: { type: { set: function set(e, t) {
          if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) {
            var n = e.value;return e.setAttribute("type", t), n && (e.value = n), t;
          }
        } } }, propFix: { "for": "htmlFor", "class": "className" }, prop: function prop(e, t, n) {
      var r,
          i,
          o,
          s = e.nodeType;if (e && 3 !== s && 8 !== s && 2 !== s) return o = 1 !== s || !x.isXMLDoc(e), o && (t = x.propFix[t] || t, i = x.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
    }, propHooks: { tabIndex: { get: function get(e) {
          return e.hasAttribute("tabindex") || B.test(e.nodeName) || e.href ? e.tabIndex : -1;
        } } } }), M = { set: function set(e, t, n) {
      return t === !1 ? x.removeAttr(e, n) : e.setAttribute(n, n), n;
    } }, x.each(x.expr.match.boolean.source.match(/\w+/g), function (e, t) {
    var n = x.expr.attrHandle[t] || x.find.attr;x.expr.attrHandle[t] = function (e, t, r) {
      var i = x.expr.attrHandle[t],
          o = r ? undefined : (x.expr.attrHandle[t] = undefined) != n(e, t, r) ? t.toLowerCase() : null;return x.expr.attrHandle[t] = i, o;
    };
  }), x.support.optSelected || (x.propHooks.selected = { get: function get(e) {
      var t = e.parentNode;return t && t.parentNode && t.parentNode.selectedIndex, null;
    } }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    x.propFix[this.toLowerCase()] = this;
  }), x.each(["radio", "checkbox"], function () {
    x.valHooks[this] = { set: function set(e, t) {
        return x.isArray(t) ? e.checked = x.inArray(x(e).val(), t) >= 0 : undefined;
      } }, x.support.checkOn || (x.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value;
    });
  });var I = /^key/,
      z = /^(?:mouse|contextmenu)|click/,
      _ = /^(?:focusinfocus|focusoutblur)$/,
      X = /^([^.]*)(?:\.(.+)|)$/;function U() {
    return !0;
  }function Y() {
    return !1;
  }function V() {
    try {
      return o.activeElement;
    } catch (e) {}
  }x.event = { global: {}, add: function add(e, t, n, i, o) {
      var s,
          a,
          u,
          l,
          c,
          f,
          p,
          h,
          d,
          g,
          m,
          y = q.get(e);if (y) {
        n.handler && (s = n, n = s.handler, o = s.selector), n.guid || (n.guid = x.guid++), (l = y.events) || (l = y.events = {}), (a = y.handle) || (a = y.handle = function (e) {
          return (typeof x === "undefined" ? "undefined" : _typeof(x)) === r || e && x.event.triggered === e.type ? undefined : x.event.dispatch.apply(a.elem, arguments);
        }, a.elem = e), t = (t || "").match(w) || [""], c = t.length;while (c--) {
          u = X.exec(t[c]) || [], d = m = u[1], g = (u[2] || "").split(".").sort(), d && (p = x.event.special[d] || {}, d = (o ? p.delegateType : p.bindType) || d, p = x.event.special[d] || {}, f = x.extend({ type: d, origType: m, data: i, handler: n, guid: n.guid, selector: o, needsContext: o && x.expr.match.needsContext.test(o), namespace: g.join(".") }, s), (h = l[d]) || (h = l[d] = [], h.delegateCount = 0, p.setup && p.setup.call(e, i, g, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), p.add && (p.add.call(e, f), f.handler.guid || (f.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, f) : h.push(f), x.event.global[d] = !0);
        }e = null;
      }
    }, remove: function remove(e, t, n, r, i) {
      var o,
          s,
          a,
          u,
          l,
          c,
          f,
          p,
          h,
          d,
          g,
          m = q.hasData(e) && q.get(e);if (m && (u = m.events)) {
        t = (t || "").match(w) || [""], l = t.length;while (l--) {
          if (a = X.exec(t[l]) || [], h = g = a[1], d = (a[2] || "").split(".").sort(), h) {
            f = x.event.special[h] || {}, h = (r ? f.delegateType : f.bindType) || h, p = u[h] || [], a = a[2] && RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = p.length;while (o--) {
              c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
            }s && !p.length && (f.teardown && f.teardown.call(e, d, m.handle) !== !1 || x.removeEvent(e, h, m.handle), delete u[h]);
          } else for (h in u) {
            x.event.remove(e, h + t[l], n, r, !0);
          }
        }x.isEmptyObject(u) && (delete m.handle, q.remove(e, "events"));
      }
    }, trigger: function trigger(t, n, r, i) {
      var s,
          a,
          u,
          l,
          c,
          f,
          p,
          h = [r || o],
          d = y.call(t, "type") ? t.type : t,
          g = y.call(t, "namespace") ? t.namespace.split(".") : [];if (a = u = r = r || o, 3 !== r.nodeType && 8 !== r.nodeType && !_.test(d + x.event.triggered) && (d.indexOf(".") >= 0 && (g = d.split("."), d = g.shift(), g.sort()), c = 0 > d.indexOf(":") && "on" + d, t = t[x.expando] ? t : new x.Event(d, "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t), t.isTrigger = i ? 2 : 3, t.namespace = g.join("."), t.namespace_re = t.namespace ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = r), n = null == n ? [t] : x.makeArray(n, [t]), p = x.event.special[d] || {}, i || !p.trigger || p.trigger.apply(r, n) !== !1)) {
        if (!i && !p.noBubble && !x.isWindow(r)) {
          for (l = p.delegateType || d, _.test(l + d) || (a = a.parentNode); a; a = a.parentNode) {
            h.push(a), u = a;
          }u === (r.ownerDocument || o) && h.push(u.defaultView || u.parentWindow || e);
        }s = 0;while ((a = h[s++]) && !t.isPropagationStopped()) {
          t.type = s > 1 ? l : p.bindType || d, f = (q.get(a, "events") || {})[t.type] && q.get(a, "handle"), f && f.apply(a, n), f = c && a[c], f && x.acceptData(a) && f.apply && f.apply(a, n) === !1 && t.preventDefault();
        }return t.type = d, i || t.isDefaultPrevented() || p._default && p._default.apply(h.pop(), n) !== !1 || !x.acceptData(r) || c && x.isFunction(r[d]) && !x.isWindow(r) && (u = r[c], u && (r[c] = null), x.event.triggered = d, r[d](), x.event.triggered = undefined, u && (r[c] = u)), t.result;
      }
    }, dispatch: function dispatch(e) {
      e = x.event.fix(e);var t,
          n,
          r,
          i,
          o,
          s = [],
          a = d.call(arguments),
          u = (q.get(this, "events") || {})[e.type] || [],
          l = x.event.special[e.type] || {};if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
        s = x.event.handlers.call(this, e, u), t = 0;while ((i = s[t++]) && !e.isPropagationStopped()) {
          e.currentTarget = i.elem, n = 0;while ((o = i.handlers[n++]) && !e.isImmediatePropagationStopped()) {
            (!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((x.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
          }
        }return l.postDispatch && l.postDispatch.call(this, e), e.result;
      }
    }, handlers: function handlers(e, t) {
      var n,
          r,
          i,
          o,
          s = [],
          a = t.delegateCount,
          u = e.target;if (a && u.nodeType && (!e.button || "click" !== e.type)) for (; u !== this; u = u.parentNode || this) {
        if (u.disabled !== !0 || "click" !== e.type) {
          for (r = [], n = 0; a > n; n++) {
            o = t[n], i = o.selector + " ", r[i] === undefined && (r[i] = o.needsContext ? x(i, this).index(u) >= 0 : x.find(i, this, null, [u]).length), r[i] && r.push(o);
          }r.length && s.push({ elem: u, handlers: r });
        }
      }return t.length > a && s.push({ elem: this, handlers: t.slice(a) }), s;
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function filter(e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e;
      } }, mouseHooks: { props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function filter(e, t) {
        var n,
            r,
            i,
            s = t.button;return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || o, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || s === undefined || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e;
      } }, fix: function fix(e) {
      if (e[x.expando]) return e;var t,
          n,
          r,
          i = e.type,
          o = e,
          s = this.fixHooks[i];s || (this.fixHooks[i] = s = z.test(i) ? this.mouseHooks : I.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new x.Event(o), t = r.length;while (t--) {
        n = r[t], e[n] = o[n];
      }return 3 === e.target.nodeType && (e.target = e.target.parentNode), s.filter ? s.filter(e, o) : e;
    }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
          return this !== V() && this.focus ? (this.focus(), !1) : undefined;
        }, delegateType: "focusin" }, blur: { trigger: function trigger() {
          return this === V() && this.blur ? (this.blur(), !1) : undefined;
        }, delegateType: "focusout" }, click: { trigger: function trigger() {
          return "checkbox" === this.type && this.click && x.nodeName(this, "input") ? (this.click(), !1) : undefined;
        }, _default: function _default(e) {
          return x.nodeName(e.target, "a");
        } }, beforeunload: { postDispatch: function postDispatch(e) {
          e.result !== undefined && (e.originalEvent.returnValue = e.result);
        } } }, simulate: function simulate(e, t, n, r) {
      var i = x.extend(new x.Event(), n, { type: e, isSimulated: !0, originalEvent: {} });r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
    } }, x.removeEvent = function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n, !1);
  }, x.Event = function (e, t) {
    return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? U : Y) : this.type = e, t && x.extend(this, t), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, undefined) : new x.Event(e, t);
  }, x.Event.prototype = { isDefaultPrevented: Y, isPropagationStopped: Y, isImmediatePropagationStopped: Y, preventDefault: function preventDefault() {
      var e = this.originalEvent;this.isDefaultPrevented = U, e && e.preventDefault && e.preventDefault();
    }, stopPropagation: function stopPropagation() {
      var e = this.originalEvent;this.isPropagationStopped = U, e && e.stopPropagation && e.stopPropagation();
    }, stopImmediatePropagation: function stopImmediatePropagation() {
      this.isImmediatePropagationStopped = U, this.stopPropagation();
    } }, x.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (e, t) {
    x.event.special[e] = { delegateType: t, bindType: t, handle: function handle(e) {
        var n,
            r = this,
            i = e.relatedTarget,
            o = e.handleObj;return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n;
      } };
  }), x.support.focusinBubbles || x.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
    var n = 0,
        r = function r(e) {
      x.event.simulate(t, e.target, x.event.fix(e), !0);
    };x.event.special[t] = { setup: function setup() {
        0 === n++ && o.addEventListener(e, r, !0);
      }, teardown: function teardown() {
        0 === --n && o.removeEventListener(e, r, !0);
      } };
  }), x.fn.extend({ on: function on(e, t, n, r, i) {
      var o, s;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
        "string" != typeof t && (n = n || t, t = undefined);for (s in e) {
          this.on(s, t, n, e[s], i);
        }return this;
      }if (null == n && null == r ? (r = t, n = t = undefined) : null == r && ("string" == typeof t ? (r = n, n = undefined) : (r = n, n = t, t = undefined)), r === !1) r = Y;else if (!r) return this;return 1 === i && (o = r, r = function r(e) {
        return x().off(e), o.apply(this, arguments);
      }, r.guid = o.guid || (o.guid = x.guid++)), this.each(function () {
        x.event.add(this, e, r, n, t);
      });
    }, one: function one(e, t, n, r) {
      return this.on(e, t, n, r, 1);
    }, off: function off(e, t, n) {
      var r, i;if (e && e.preventDefault && e.handleObj) return r = e.handleObj, x(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
        for (i in e) {
          this.off(i, t, e[i]);
        }return this;
      }return (t === !1 || "function" == typeof t) && (n = t, t = undefined), n === !1 && (n = Y), this.each(function () {
        x.event.remove(this, e, n, t);
      });
    }, trigger: function trigger(e, t) {
      return this.each(function () {
        x.event.trigger(e, t, this);
      });
    }, triggerHandler: function triggerHandler(e, t) {
      var n = this[0];return n ? x.event.trigger(e, t, n, !0) : undefined;
    } });var G = /^.[^:#\[\.,]*$/,
      J = x.expr.match.needsContext,
      Q = { children: !0, contents: !0, next: !0, prev: !0 };x.fn.extend({ find: function find(e) {
      var t,
          n,
          r,
          i = this.length;if ("string" != typeof e) return t = this, this.pushStack(x(e).filter(function () {
        for (r = 0; i > r; r++) {
          if (x.contains(t[r], this)) return !0;
        }
      }));for (n = [], r = 0; i > r; r++) {
        x.find(e, this[r], n);
      }return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, n;
    }, has: function has(e) {
      var t = x(e, this),
          n = t.length;return this.filter(function () {
        var e = 0;for (; n > e; e++) {
          if (x.contains(this, t[e])) return !0;
        }
      });
    }, not: function not(e) {
      return this.pushStack(Z(this, e || [], !0));
    }, filter: function filter(e) {
      return this.pushStack(Z(this, e || [], !1));
    }, is: function is(e) {
      return !!e && ("string" == typeof e ? J.test(e) ? x(e, this.context).index(this[0]) >= 0 : x.filter(e, this).length > 0 : this.filter(e).length > 0);
    }, closest: function closest(e, t) {
      var n,
          r = 0,
          i = this.length,
          o = [],
          s = J.test(e) || "string" != typeof e ? x(e, t || this.context) : 0;for (; i > r; r++) {
        for (n = this[r]; n && n !== t; n = n.parentNode) {
          if (11 > n.nodeType && (s ? s.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
            n = o.push(n);break;
          }
        }
      }return this.pushStack(o.length > 1 ? x.unique(o) : o);
    }, index: function index(e) {
      return e ? "string" == typeof e ? g.call(x(e), this[0]) : g.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    }, add: function add(e, t) {
      var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e),
          r = x.merge(this.get(), n);return this.pushStack(x.unique(r));
    }, addBack: function addBack(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    } });function K(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType) {}return e;
  }x.each({ parent: function parent(e) {
      var t = e.parentNode;return t && 11 !== t.nodeType ? t : null;
    }, parents: function parents(e) {
      return x.dir(e, "parentNode");
    }, parentsUntil: function parentsUntil(e, t, n) {
      return x.dir(e, "parentNode", n);
    }, next: function next(e) {
      return K(e, "nextSibling");
    }, prev: function prev(e) {
      return K(e, "previousSibling");
    }, nextAll: function nextAll(e) {
      return x.dir(e, "nextSibling");
    }, prevAll: function prevAll(e) {
      return x.dir(e, "previousSibling");
    }, nextUntil: function nextUntil(e, t, n) {
      return x.dir(e, "nextSibling", n);
    }, prevUntil: function prevUntil(e, t, n) {
      return x.dir(e, "previousSibling", n);
    }, siblings: function siblings(e) {
      return x.sibling((e.parentNode || {}).firstChild, e);
    }, children: function children(e) {
      return x.sibling(e.firstChild);
    }, contents: function contents(e) {
      return x.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : x.merge([], e.childNodes);
    } }, function (e, t) {
    x.fn[e] = function (n, r) {
      var i = x.map(this, t, n);return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (Q[e] || x.unique(i), "p" === e[0] && i.reverse()), this.pushStack(i);
    };
  }), x.extend({ filter: function filter(e, t, n) {
      var r = t[0];return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function (e) {
        return 1 === e.nodeType;
      }));
    }, dir: function dir(e, t, n) {
      var r = [],
          i = n !== undefined;while ((e = e[t]) && 9 !== e.nodeType) {
        if (1 === e.nodeType) {
          if (i && x(e).is(n)) break;r.push(e);
        }
      }return r;
    }, sibling: function sibling(e, t) {
      var n = [];for (; e; e = e.nextSibling) {
        1 === e.nodeType && e !== t && n.push(e);
      }return n;
    } });function Z(e, t, n) {
    if (x.isFunction(t)) return x.grep(e, function (e, r) {
      return !!t.call(e, r, e) !== n;
    });if (t.nodeType) return x.grep(e, function (e) {
      return e === t !== n;
    });if ("string" == typeof t) {
      if (G.test(t)) return x.filter(t, e, n);t = x.filter(t, e);
    }return x.grep(e, function (e) {
      return g.call(t, e) >= 0 !== n;
    });
  }var et = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      tt = /<([\w:]+)/,
      nt = /<|&#?\w+;/,
      rt = /<(?:script|style|link)/i,
      it = /^(?:checkbox|radio)$/i,
      ot = /checked\s*(?:[^=]|=\s*.checked.)/i,
      st = /^$|\/(?:java|ecma)script/i,
      at = /^true\/(.*)/,
      ut = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      lt = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };lt.optgroup = lt.option, lt.tbody = lt.tfoot = lt.colgroup = lt.caption = lt.col = lt.thead, lt.th = lt.td, x.fn.extend({ text: function text(e) {
      return x.access(this, function (e) {
        return e === undefined ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e));
      }, null, e, arguments.length);
    }, append: function append() {
      return this.domManip(arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = ct(this, e);t.appendChild(e);
        }
      });
    }, prepend: function prepend() {
      return this.domManip(arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = ct(this, e);t.insertBefore(e, t.firstChild);
        }
      });
    }, before: function before() {
      return this.domManip(arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this);
      });
    }, after: function after() {
      return this.domManip(arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
      });
    }, remove: function remove(e, t) {
      var n,
          r = e ? x.filter(e, this) : this,
          i = 0;for (; null != (n = r[i]); i++) {
        t || 1 !== n.nodeType || x.cleanData(gt(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && ht(gt(n, "script")), n.parentNode.removeChild(n));
      }return this;
    }, empty: function empty() {
      var e,
          t = 0;for (; null != (e = this[t]); t++) {
        1 === e.nodeType && (x.cleanData(gt(e, !1)), e.textContent = "");
      }return this;
    }, clone: function clone(e, t) {
      return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
        return x.clone(this, e, t);
      });
    }, html: function html(e) {
      return x.access(this, function (e) {
        var t = this[0] || {},
            n = 0,
            r = this.length;if (e === undefined && 1 === t.nodeType) return t.innerHTML;if ("string" == typeof e && !rt.test(e) && !lt[(tt.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = e.replace(et, "<$1></$2>");try {
            for (; r > n; n++) {
              t = this[n] || {}, 1 === t.nodeType && (x.cleanData(gt(t, !1)), t.innerHTML = e);
            }t = 0;
          } catch (i) {}
        }t && this.empty().append(e);
      }, null, e, arguments.length);
    }, replaceWith: function replaceWith() {
      var e = x.map(this, function (e) {
        return [e.nextSibling, e.parentNode];
      }),
          t = 0;return this.domManip(arguments, function (n) {
        var r = e[t++],
            i = e[t++];i && (x(this).remove(), i.insertBefore(n, r));
      }, !0), t ? this : this.remove();
    }, detach: function detach(e) {
      return this.remove(e, !0);
    }, domManip: function domManip(e, t, n) {
      e = p.apply([], e);var r,
          i,
          o,
          s,
          a,
          u,
          l = 0,
          c = this.length,
          f = this,
          h = c - 1,
          d = e[0],
          g = x.isFunction(d);if (g || !(1 >= c || "string" != typeof d || x.support.checkClone) && ot.test(d)) return this.each(function (r) {
        var i = f.eq(r);g && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n);
      });if (c && (r = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = r.firstChild, 1 === r.childNodes.length && (r = i), i)) {
        for (o = x.map(gt(r, "script"), ft), s = o.length; c > l; l++) {
          a = r, l !== h && (a = x.clone(a, !0, !0), s && x.merge(o, gt(a, "script"))), t.call(this[l], a, l);
        }if (s) for (u = o[o.length - 1].ownerDocument, x.map(o, pt), l = 0; s > l; l++) {
          a = o[l], st.test(a.type || "") && !q.access(a, "globalEval") && x.contains(u, a) && (a.src ? x._evalUrl(a.src) : x.globalEval(a.textContent.replace(ut, "")));
        }
      }return this;
    } }), x.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
    x.fn[e] = function (e) {
      var n,
          r = [],
          i = x(e),
          o = i.length - 1,
          s = 0;for (; o >= s; s++) {
        n = s === o ? this : this.clone(!0), x(i[s])[t](n), h.apply(r, n.get());
      }return this.pushStack(r);
    };
  }), x.extend({ clone: function clone(e, t, n) {
      var r,
          i,
          o,
          s,
          a = e.cloneNode(!0),
          u = x.contains(e.ownerDocument, e);if (!(x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e))) for (s = gt(a), o = gt(e), r = 0, i = o.length; i > r; r++) {
        mt(o[r], s[r]);
      }if (t) if (n) for (o = o || gt(e), s = s || gt(a), r = 0, i = o.length; i > r; r++) {
        dt(o[r], s[r]);
      } else dt(e, a);return s = gt(a, "script"), s.length > 0 && ht(s, !u && gt(e, "script")), a;
    }, buildFragment: function buildFragment(e, t, n, r) {
      var i,
          o,
          s,
          a,
          u,
          l,
          c = 0,
          f = e.length,
          p = t.createDocumentFragment(),
          h = [];for (; f > c; c++) {
        if (i = e[c], i || 0 === i) if ("object" === x.type(i)) x.merge(h, i.nodeType ? [i] : i);else if (nt.test(i)) {
          o = o || p.appendChild(t.createElement("div")), s = (tt.exec(i) || ["", ""])[1].toLowerCase(), a = lt[s] || lt._default, o.innerHTML = a[1] + i.replace(et, "<$1></$2>") + a[2], l = a[0];while (l--) {
            o = o.firstChild;
          }x.merge(h, o.childNodes), o = p.firstChild, o.textContent = "";
        } else h.push(t.createTextNode(i));
      }p.textContent = "", c = 0;while (i = h[c++]) {
        if ((!r || -1 === x.inArray(i, r)) && (u = x.contains(i.ownerDocument, i), o = gt(p.appendChild(i), "script"), u && ht(o), n)) {
          l = 0;while (i = o[l++]) {
            st.test(i.type || "") && n.push(i);
          }
        }
      }return p;
    }, cleanData: function cleanData(e) {
      var t,
          n,
          r,
          i = e.length,
          o = 0,
          s = x.event.special;for (; i > o; o++) {
        if (n = e[o], x.acceptData(n) && (t = q.access(n))) for (r in t.events) {
          s[r] ? x.event.remove(n, r) : x.removeEvent(n, r, t.handle);
        }L.discard(n), q.discard(n);
      }
    }, _evalUrl: function _evalUrl(e) {
      return x.ajax({ url: e, type: "GET", dataType: "text", async: !1, global: !1, success: x.globalEval });
    } });function ct(e, t) {
    return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
  }function ft(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
  }function pt(e) {
    var t = at.exec(e.type);return t ? e.type = t[1] : e.removeAttribute("type"), e;
  }function ht(e, t) {
    var n = e.length,
        r = 0;for (; n > r; r++) {
      q.set(e[r], "globalEval", !t || q.get(t[r], "globalEval"));
    }
  }function dt(e, t) {
    var n, r, i, o, s, a, u, l;if (1 === t.nodeType) {
      if (q.hasData(e) && (o = q.access(e), s = x.extend({}, o), l = o.events, q.set(t, s), l)) {
        delete s.handle, s.events = {};for (i in l) {
          for (n = 0, r = l[i].length; r > n; n++) {
            x.event.add(t, i, l[i][n]);
          }
        }
      }L.hasData(e) && (a = L.access(e), u = x.extend({}, a), L.set(t, u));
    }
  }function gt(e, t) {
    var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];return t === undefined || t && x.nodeName(e, t) ? x.merge([e], n) : n;
  }function mt(e, t) {
    var n = t.nodeName.toLowerCase();"input" === n && it.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
  }x.fn.extend({ wrapAll: function wrapAll(e) {
      var t;return x.isFunction(e) ? this.each(function (t) {
        x(this).wrapAll(e.call(this, t));
      }) : (this[0] && (t = x(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        var e = this;while (e.firstElementChild) {
          e = e.firstElementChild;
        }return e;
      }).append(this)), this);
    }, wrapInner: function wrapInner(e) {
      return x.isFunction(e) ? this.each(function (t) {
        x(this).wrapInner(e.call(this, t));
      }) : this.each(function () {
        var t = x(this),
            n = t.contents();n.length ? n.wrapAll(e) : t.append(e);
      });
    }, wrap: function wrap(e) {
      var t = x.isFunction(e);return this.each(function (n) {
        x(this).wrapAll(t ? e.call(this, n) : e);
      });
    }, unwrap: function unwrap() {
      return this.parent().each(function () {
        x.nodeName(this, "body") || x(this).replaceWith(this.childNodes);
      }).end();
    } });var yt,
      vt,
      xt = /^(none|table(?!-c[ea]).+)/,
      bt = /^margin/,
      wt = RegExp("^(" + b + ")(.*)$", "i"),
      Tt = RegExp("^(" + b + ")(?!px)[a-z%]+$", "i"),
      Ct = RegExp("^([+-])=(" + b + ")", "i"),
      kt = { BODY: "block" },
      Nt = { position: "absolute", visibility: "hidden", display: "block" },
      Et = { letterSpacing: 0, fontWeight: 400 },
      St = ["Top", "Right", "Bottom", "Left"],
      jt = ["Webkit", "O", "Moz", "ms"];function Dt(e, t) {
    if (t in e) return t;var n = t.charAt(0).toUpperCase() + t.slice(1),
        r = t,
        i = jt.length;while (i--) {
      if (t = jt[i] + n, t in e) return t;
    }return r;
  }function At(e, t) {
    return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e);
  }function Lt(t) {
    return e.getComputedStyle(t, null);
  }function qt(e, t) {
    var n,
        r,
        i,
        o = [],
        s = 0,
        a = e.length;for (; a > s; s++) {
      r = e[s], r.style && (o[s] = q.get(r, "olddisplay"), n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && At(r) && (o[s] = q.access(r, "olddisplay", Pt(r.nodeName)))) : o[s] || (i = At(r), (n && "none" !== n || !i) && q.set(r, "olddisplay", i ? n : x.css(r, "display"))));
    }for (s = 0; a > s; s++) {
      r = e[s], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
    }return e;
  }x.fn.extend({ css: function css(e, t) {
      return x.access(this, function (e, t, n) {
        var r,
            i,
            o = {},
            s = 0;if (x.isArray(t)) {
          for (r = Lt(e), i = t.length; i > s; s++) {
            o[t[s]] = x.css(e, t[s], !1, r);
          }return o;
        }return n !== undefined ? x.style(e, t, n) : x.css(e, t);
      }, e, t, arguments.length > 1);
    }, show: function show() {
      return qt(this, !0);
    }, hide: function hide() {
      return qt(this);
    }, toggle: function toggle(e) {
      var t = "boolean" == typeof e;return this.each(function () {
        (t ? e : At(this)) ? x(this).show() : x(this).hide();
      });
    } }), x.extend({ cssHooks: { opacity: { get: function get(e, t) {
          if (t) {
            var n = yt(e, "opacity");return "" === n ? "1" : n;
          }
        } } }, cssNumber: { columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": "cssFloat" }, style: function style(e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
            o,
            s,
            a = x.camelCase(t),
            u = e.style;return t = x.cssProps[a] || (x.cssProps[a] = Dt(u, a)), s = x.cssHooks[t] || x.cssHooks[a], n === undefined ? s && "get" in s && (i = s.get(e, !1, r)) !== undefined ? i : u[t] : (o = typeof n === "undefined" ? "undefined" : _typeof(n), "string" === o && (i = Ct.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(x.css(e, t)), o = "number"), null == n || "number" === o && isNaN(n) || ("number" !== o || x.cssNumber[a] || (n += "px"), x.support.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && (n = s.set(e, n, r)) === undefined || (u[t] = n)), undefined);
      }
    }, css: function css(e, t, n, r) {
      var i,
          o,
          s,
          a = x.camelCase(t);return t = x.cssProps[a] || (x.cssProps[a] = Dt(e.style, a)), s = x.cssHooks[t] || x.cssHooks[a], s && "get" in s && (i = s.get(e, !0, n)), i === undefined && (i = yt(e, t, r)), "normal" === i && t in Et && (i = Et[t]), "" === n || n ? (o = parseFloat(i), n === !0 || x.isNumeric(o) ? o || 0 : i) : i;
    } }), yt = function yt(e, t, n) {
    var r,
        i,
        o,
        s = n || Lt(e),
        a = s ? s.getPropertyValue(t) || s[t] : undefined,
        u = e.style;return s && ("" !== a || x.contains(e.ownerDocument, e) || (a = x.style(e, t)), Tt.test(a) && bt.test(t) && (r = u.width, i = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = s.width, u.width = r, u.minWidth = i, u.maxWidth = o)), a;
  };function Ht(e, t, n) {
    var r = wt.exec(t);return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
  }function Ot(e, t, n, r, i) {
    var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
        s = 0;for (; 4 > o; o += 2) {
      "margin" === n && (s += x.css(e, n + St[o], !0, i)), r ? ("content" === n && (s -= x.css(e, "padding" + St[o], !0, i)), "margin" !== n && (s -= x.css(e, "border" + St[o] + "Width", !0, i))) : (s += x.css(e, "padding" + St[o], !0, i), "padding" !== n && (s += x.css(e, "border" + St[o] + "Width", !0, i)));
    }return s;
  }function Ft(e, t, n) {
    var r = !0,
        i = "width" === t ? e.offsetWidth : e.offsetHeight,
        o = Lt(e),
        s = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o);if (0 >= i || null == i) {
      if (i = yt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Tt.test(i)) return i;r = s && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0;
    }return i + Ot(e, t, n || (s ? "border" : "content"), r, o) + "px";
  }function Pt(e) {
    var t = o,
        n = kt[e];return n || (n = Rt(e, t), "none" !== n && n || (vt = (vt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (vt[0].contentWindow || vt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = Rt(e, t), vt.detach()), kt[e] = n), n;
  }function Rt(e, t) {
    var n = x(t.createElement(e)).appendTo(t.body),
        r = x.css(n[0], "display");return n.remove(), r;
  }x.each(["height", "width"], function (e, t) {
    x.cssHooks[t] = { get: function get(e, n, r) {
        return n ? 0 === e.offsetWidth && xt.test(x.css(e, "display")) ? x.swap(e, Nt, function () {
          return Ft(e, t, r);
        }) : Ft(e, t, r) : undefined;
      }, set: function set(e, n, r) {
        var i = r && Lt(e);return Ht(e, n, r ? Ot(e, t, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0);
      } };
  }), x(function () {
    x.support.reliableMarginRight || (x.cssHooks.marginRight = { get: function get(e, t) {
        return t ? x.swap(e, { display: "inline-block" }, yt, [e, "marginRight"]) : undefined;
      } }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function (e, t) {
      x.cssHooks[t] = { get: function get(e, n) {
          return n ? (n = yt(e, t), Tt.test(n) ? x(e).position()[t] + "px" : n) : undefined;
        } };
    });
  }), x.expr && x.expr.filters && (x.expr.filters.hidden = function (e) {
    return 0 >= e.offsetWidth && 0 >= e.offsetHeight;
  }, x.expr.filters.visible = function (e) {
    return !x.expr.filters.hidden(e);
  }), x.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
    x.cssHooks[e + t] = { expand: function expand(n) {
        var r = 0,
            i = {},
            o = "string" == typeof n ? n.split(" ") : [n];for (; 4 > r; r++) {
          i[e + St[r] + t] = o[r] || o[r - 2] || o[0];
        }return i;
      } }, bt.test(e) || (x.cssHooks[e + t].set = Ht);
  });var Mt = /%20/g,
      Wt = /\[\]$/,
      $t = /\r?\n/g,
      Bt = /^(?:submit|button|image|reset|file)$/i,
      It = /^(?:input|select|textarea|keygen)/i;x.fn.extend({ serialize: function serialize() {
      return x.param(this.serializeArray());
    }, serializeArray: function serializeArray() {
      return this.map(function () {
        var e = x.prop(this, "elements");return e ? x.makeArray(e) : this;
      }).filter(function () {
        var e = this.type;return this.name && !x(this).is(":disabled") && It.test(this.nodeName) && !Bt.test(e) && (this.checked || !it.test(e));
      }).map(function (e, t) {
        var n = x(this).val();return null == n ? null : x.isArray(n) ? x.map(n, function (e) {
          return { name: t.name, value: e.replace($t, "\r\n") };
        }) : { name: t.name, value: n.replace($t, "\r\n") };
      }).get();
    } }), x.param = function (e, t) {
    var n,
        r = [],
        i = function i(e, t) {
      t = x.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
    };if (t === undefined && (t = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function () {
      i(this.name, this.value);
    });else for (n in e) {
      zt(n, e[n], t, i);
    }return r.join("&").replace(Mt, "+");
  };function zt(e, t, n, r) {
    var i;if (x.isArray(t)) x.each(t, function (t, i) {
      n || Wt.test(e) ? r(e, i) : zt(e + "[" + ("object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) ? t : "") + "]", i, n, r);
    });else if (n || "object" !== x.type(t)) r(e, t);else for (i in t) {
      zt(e + "[" + i + "]", t[i], n, r);
    }
  }x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
    x.fn[t] = function (e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
    };
  }), x.fn.extend({ hover: function hover(e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    }, bind: function bind(e, t, n) {
      return this.on(e, null, t, n);
    }, unbind: function unbind(e, t) {
      return this.off(e, null, t);
    }, delegate: function delegate(e, t, n, r) {
      return this.on(t, e, n, r);
    }, undelegate: function undelegate(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
    } });var _t,
      Xt,
      Ut = x.now(),
      Yt = /\?/,
      Vt = /#.*$/,
      Gt = /([?&])_=[^&]*/,
      Jt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Qt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      Kt = /^(?:GET|HEAD)$/,
      Zt = /^\/\//,
      en = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
      tn = x.fn.load,
      nn = {},
      rn = {},
      on = "*/".concat("*");try {
    Xt = i.href;
  } catch (sn) {
    Xt = o.createElement("a"), Xt.href = "", Xt = Xt.href;
  }_t = en.exec(Xt.toLowerCase()) || [];function an(e) {
    return function (t, n) {
      "string" != typeof t && (n = t, t = "*");var r,
          i = 0,
          o = t.toLowerCase().match(w) || [];
      if (x.isFunction(n)) while (r = o[i++]) {
        "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
      }
    };
  }function un(e, t, n, r) {
    var i = {},
        o = e === rn;function s(a) {
      var u;return i[a] = !0, x.each(e[a] || [], function (e, a) {
        var l = a(t, n, r);return "string" != typeof l || o || i[l] ? o ? !(u = l) : undefined : (t.dataTypes.unshift(l), s(l), !1);
      }), u;
    }return s(t.dataTypes[0]) || !i["*"] && s("*");
  }function ln(e, t) {
    var n,
        r,
        i = x.ajaxSettings.flatOptions || {};for (n in t) {
      t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    }return r && x.extend(!0, e, r), e;
  }x.fn.load = function (e, t, n) {
    if ("string" != typeof e && tn) return tn.apply(this, arguments);var r,
        i,
        o,
        s = this,
        a = e.indexOf(" ");return a >= 0 && (r = e.slice(a), e = e.slice(0, a)), x.isFunction(t) ? (n = t, t = undefined) : t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (i = "POST"), s.length > 0 && x.ajax({ url: e, type: i, dataType: "html", data: t }).done(function (e) {
      o = arguments, s.html(r ? x("<div>").append(x.parseHTML(e)).find(r) : e);
    }).complete(n && function (e, t) {
      s.each(n, o || [e.responseText, t, e]);
    }), this;
  }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    x.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), x.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Xt, type: "GET", isLocal: Qt.test(_t[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": on, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": x.parseJSON, "text xml": x.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(e, t) {
      return t ? ln(ln(e, x.ajaxSettings), t) : ln(x.ajaxSettings, e);
    }, ajaxPrefilter: an(nn), ajaxTransport: an(rn), ajax: function ajax(e, t) {
      "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (t = e, e = undefined), t = t || {};var n,
          r,
          i,
          o,
          s,
          a,
          u,
          l,
          c = x.ajaxSetup({}, t),
          f = c.context || c,
          p = c.context && (f.nodeType || f.jquery) ? x(f) : x.event,
          h = x.Deferred(),
          d = x.Callbacks("once memory"),
          g = c.statusCode || {},
          m = {},
          y = {},
          v = 0,
          b = "canceled",
          T = { readyState: 0, getResponseHeader: function getResponseHeader(e) {
          var t;if (2 === v) {
            if (!o) {
              o = {};while (t = Jt.exec(i)) {
                o[t[1].toLowerCase()] = t[2];
              }
            }t = o[e.toLowerCase()];
          }return null == t ? null : t;
        }, getAllResponseHeaders: function getAllResponseHeaders() {
          return 2 === v ? i : null;
        }, setRequestHeader: function setRequestHeader(e, t) {
          var n = e.toLowerCase();return v || (e = y[n] = y[n] || e, m[e] = t), this;
        }, overrideMimeType: function overrideMimeType(e) {
          return v || (c.mimeType = e), this;
        }, statusCode: function statusCode(e) {
          var t;if (e) if (2 > v) for (t in e) {
            g[t] = [g[t], e[t]];
          } else T.always(e[T.status]);return this;
        }, abort: function abort(e) {
          var t = e || b;return n && n.abort(t), k(0, t), this;
        } };if (h.promise(T).complete = d.add, T.success = T.done, T.error = T.fail, c.url = ((e || c.url || Xt) + "").replace(Vt, "").replace(Zt, _t[1] + "//"), c.type = t.method || t.type || c.method || c.type, c.dataTypes = x.trim(c.dataType || "*").toLowerCase().match(w) || [""], null == c.crossDomain && (a = en.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === _t[1] && a[2] === _t[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (_t[3] || ("http:" === _t[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = x.param(c.data, c.traditional)), un(nn, c, t, T), 2 === v) return T;u = c.global, u && 0 === x.active++ && x.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !Kt.test(c.type), r = c.url, c.hasContent || (c.data && (r = c.url += (Yt.test(r) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = Gt.test(r) ? r.replace(Gt, "$1_=" + Ut++) : r + (Yt.test(r) ? "&" : "?") + "_=" + Ut++)), c.ifModified && (x.lastModified[r] && T.setRequestHeader("If-Modified-Since", x.lastModified[r]), x.etag[r] && T.setRequestHeader("If-None-Match", x.etag[r])), (c.data && c.hasContent && c.contentType !== !1 || t.contentType) && T.setRequestHeader("Content-Type", c.contentType), T.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + on + "; q=0.01" : "") : c.accepts["*"]);for (l in c.headers) {
        T.setRequestHeader(l, c.headers[l]);
      }if (c.beforeSend && (c.beforeSend.call(f, T, c) === !1 || 2 === v)) return T.abort();b = "abort";for (l in { success: 1, error: 1, complete: 1 }) {
        T[l](c[l]);
      }if (n = un(rn, c, t, T)) {
        T.readyState = 1, u && p.trigger("ajaxSend", [T, c]), c.async && c.timeout > 0 && (s = setTimeout(function () {
          T.abort("timeout");
        }, c.timeout));try {
          v = 1, n.send(m, k);
        } catch (C) {
          if (!(2 > v)) throw C;k(-1, C);
        }
      } else k(-1, "No Transport");function k(e, t, o, a) {
        var l,
            m,
            y,
            b,
            w,
            C = t;2 !== v && (v = 2, s && clearTimeout(s), n = undefined, i = a || "", T.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, o && (b = cn(c, T, o)), b = fn(c, b, T, l), l ? (c.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (x.lastModified[r] = w), w = T.getResponseHeader("etag"), w && (x.etag[r] = w)), 204 === e ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = b.state, m = b.data, y = b.error, l = !y)) : (y = C, (e || !C) && (C = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (t || C) + "", l ? h.resolveWith(f, [m, C, T]) : h.rejectWith(f, [T, C, y]), T.statusCode(g), g = undefined, u && p.trigger(l ? "ajaxSuccess" : "ajaxError", [T, c, l ? m : y]), d.fireWith(f, [T, C]), u && (p.trigger("ajaxComplete", [T, c]), --x.active || x.event.trigger("ajaxStop")));
      }return T;
    }, getJSON: function getJSON(e, t, n) {
      return x.get(e, t, n, "json");
    }, getScript: function getScript(e, t) {
      return x.get(e, undefined, t, "script");
    } }), x.each(["get", "post"], function (e, t) {
    x[t] = function (e, n, r, i) {
      return x.isFunction(n) && (i = i || r, r = n, n = undefined), x.ajax({ url: e, type: t, dataType: i, data: n, success: r });
    };
  });function cn(e, t, n) {
    var r,
        i,
        o,
        s,
        a = e.contents,
        u = e.dataTypes;while ("*" === u[0]) {
      u.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
    }if (r) for (i in a) {
      if (a[i] && a[i].test(r)) {
        u.unshift(i);break;
      }
    }if (u[0] in n) o = u[0];else {
      for (i in n) {
        if (!u[0] || e.converters[i + " " + u[0]]) {
          o = i;break;
        }s || (s = i);
      }o = o || s;
    }return o ? (o !== u[0] && u.unshift(o), n[o]) : undefined;
  }function fn(e, t, n, r) {
    var i,
        o,
        s,
        a,
        u,
        l = {},
        c = e.dataTypes.slice();if (c[1]) for (s in e.converters) {
      l[s.toLowerCase()] = e.converters[s];
    }o = c.shift();while (o) {
      if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
        if (s = l[u + " " + o] || l["* " + o], !s) for (i in l) {
          if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
            s === !0 ? s = l[i] : l[i] !== !0 && (o = a[0], c.unshift(a[1]));break;
          }
        }if (s !== !0) if (s && e["throws"]) t = s(t);else try {
          t = s(t);
        } catch (f) {
          return { state: "parsererror", error: s ? f : "No conversion from " + u + " to " + o };
        }
      }
    }return { state: "success", data: t };
  }x.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function textScript(e) {
        return x.globalEval(e), e;
      } } }), x.ajaxPrefilter("script", function (e) {
    e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET");
  }), x.ajaxTransport("script", function (e) {
    if (e.crossDomain) {
      var t, _n;return { send: function send(r, i) {
          t = x("<script>").prop({ async: !0, charset: e.scriptCharset, src: e.url }).on("load error", _n = function n(e) {
            t.remove(), _n = null, e && i("error" === e.type ? 404 : 200, e.type);
          }), o.head.appendChild(t[0]);
        }, abort: function abort() {
          _n && _n();
        } };
    }
  });var pn = [],
      hn = /(=)\?(?=&|$)|\?\?/;x.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
      var e = pn.pop() || x.expando + "_" + Ut++;return this[e] = !0, e;
    } }), x.ajaxPrefilter("json jsonp", function (t, n, r) {
    var i,
        o,
        s,
        a = t.jsonp !== !1 && (hn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && hn.test(t.data) && "data");return a || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = x.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(hn, "$1" + i) : t.jsonp !== !1 && (t.url += (Yt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
      return s || x.error(i + " was not called"), s[0];
    }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
      s = arguments;
    }, r.always(function () {
      e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, pn.push(i)), s && x.isFunction(o) && o(s[0]), s = o = undefined;
    }), "script") : undefined;
  }), x.ajaxSettings.xhr = function () {
    try {
      return new XMLHttpRequest();
    } catch (e) {}
  };var dn = x.ajaxSettings.xhr(),
      gn = { 0: 200, 1223: 204 },
      mn = 0,
      yn = {};e.ActiveXObject && x(e).on("unload", function () {
    for (var e in yn) {
      yn[e]();
    }yn = undefined;
  }), x.support.cors = !!dn && "withCredentials" in dn, x.support.ajax = dn = !!dn, x.ajaxTransport(function (e) {
    var _t3;return x.support.cors || dn && !e.crossDomain ? { send: function send(n, r) {
        var i,
            o,
            s = e.xhr();if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (i in e.xhrFields) {
          s[i] = e.xhrFields[i];
        }e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");for (i in n) {
          s.setRequestHeader(i, n[i]);
        }_t3 = function t(e) {
          return function () {
            _t3 && (delete yn[o], _t3 = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? r(s.status || 404, s.statusText) : r(gn[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? { text: s.responseText } : undefined, s.getAllResponseHeaders()));
          };
        }, s.onload = _t3(), s.onerror = _t3("error"), _t3 = yn[o = mn++] = _t3("abort"), s.send(e.hasContent && e.data || null);
      }, abort: function abort() {
        _t3 && _t3();
      } } : undefined;
  });var vn,
      xn,
      bn = /^(?:toggle|show|hide)$/,
      wn = RegExp("^(?:([+-])=|)(" + b + ")([a-z%]*)$", "i"),
      Tn = /queueHooks$/,
      Cn = [Dn],
      kn = { "*": [function (e, t) {
      var n,
          r,
          i = this.createTween(e, t),
          o = wn.exec(t),
          s = i.cur(),
          a = +s || 0,
          u = 1,
          l = 20;if (o) {
        if (n = +o[2], r = o[3] || (x.cssNumber[e] ? "" : "px"), "px" !== r && a) {
          a = x.css(i.elem, e, !0) || n || 1;do {
            u = u || ".5", a /= u, x.style(i.elem, e, a + r);
          } while (u !== (u = i.cur() / s) && 1 !== u && --l);
        }i.unit = r, i.start = a, i.end = o[1] ? a + (o[1] + 1) * n : n;
      }return i;
    }] };function Nn() {
    return setTimeout(function () {
      vn = undefined;
    }), vn = x.now();
  }function En(e, t) {
    x.each(t, function (t, n) {
      var r = (kn[t] || []).concat(kn["*"]),
          i = 0,
          o = r.length;for (; o > i; i++) {
        if (r[i].call(e, t, n)) return;
      }
    });
  }function Sn(e, t, n) {
    var r,
        i,
        o = 0,
        s = Cn.length,
        a = x.Deferred().always(function () {
      delete u.elem;
    }),
        u = function u() {
      if (i) return !1;var t = vn || Nn(),
          n = Math.max(0, l.startTime + l.duration - t),
          r = n / l.duration || 0,
          o = 1 - r,
          s = 0,
          u = l.tweens.length;for (; u > s; s++) {
        l.tweens[s].run(o);
      }return a.notifyWith(e, [l, o, n]), 1 > o && u ? n : (a.resolveWith(e, [l]), !1);
    },
        l = a.promise({ elem: e, props: x.extend({}, t), opts: x.extend(!0, { specialEasing: {} }, n), originalProperties: t, originalOptions: n, startTime: vn || Nn(), duration: n.duration, tweens: [], createTween: function createTween(t, n) {
        var r = x.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);return l.tweens.push(r), r;
      }, stop: function stop(t) {
        var n = 0,
            r = t ? l.tweens.length : 0;if (i) return this;for (i = !0; r > n; n++) {
          l.tweens[n].run(1);
        }return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this;
      } }),
        c = l.props;for (jn(c, l.opts.specialEasing); s > o; o++) {
      if (r = Cn[o].call(l, e, c, l.opts)) return r;
    }return En(l, c), x.isFunction(l.opts.start) && l.opts.start.call(e, l), x.fx.timer(x.extend(u, { elem: e, anim: l, queue: l.opts.queue })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
  }function jn(e, t) {
    var n, r, i, o, s;for (n in e) {
      if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = x.cssHooks[r], s && "expand" in s) {
        o = s.expand(o), delete e[r];for (n in o) {
          n in e || (e[n] = o[n], t[n] = i);
        }
      } else t[r] = i;
    }
  }x.Animation = x.extend(Sn, { tweener: function tweener(e, t) {
      x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");var n,
          r = 0,
          i = e.length;for (; i > r; r++) {
        n = e[r], kn[n] = kn[n] || [], kn[n].unshift(t);
      }
    }, prefilter: function prefilter(e, t) {
      t ? Cn.unshift(e) : Cn.push(e);
    } });function Dn(e, t, n) {
    var r,
        i,
        o,
        s,
        a,
        u,
        l,
        c,
        f,
        p = this,
        h = e.style,
        d = {},
        g = [],
        m = e.nodeType && At(e);n.queue || (c = x._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, f = c.empty.fire, c.empty.fire = function () {
      c.unqueued || f();
    }), c.unqueued++, p.always(function () {
      p.always(function () {
        c.unqueued--, x.queue(e, "fx").length || c.empty.fire();
      });
    })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
      h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
    })), a = q.get(e, "fxshow");for (r in t) {
      if (o = t[r], bn.exec(o)) {
        if (delete t[r], u = u || "toggle" === o, o === (m ? "hide" : "show")) {
          if ("show" !== o || a === undefined || a[r] === undefined) continue;m = !0;
        }g.push(r);
      }
    }if (s = g.length) {
      a = q.get(e, "fxshow") || q.access(e, "fxshow", {}), "hidden" in a && (m = a.hidden), u && (a.hidden = !m), m ? x(e).show() : p.done(function () {
        x(e).hide();
      }), p.done(function () {
        var t;q.remove(e, "fxshow");for (t in d) {
          x.style(e, t, d[t]);
        }
      });for (r = 0; s > r; r++) {
        i = g[r], l = p.createTween(i, m ? a[i] : 0), d[i] = a[i] || x.style(e, i), i in a || (a[i] = l.start, m && (l.end = l.start, l.start = "width" === i || "height" === i ? 1 : 0));
      }
    }
  }function An(e, t, n, r, i) {
    return new An.prototype.init(e, t, n, r, i);
  }x.Tween = An, An.prototype = { constructor: An, init: function init(e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px");
    }, cur: function cur() {
      var e = An.propHooks[this.prop];return e && e.get ? e.get(this) : An.propHooks._default.get(this);
    }, run: function run(e) {
      var t,
          n = An.propHooks[this.prop];return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : An.propHooks._default.set(this), this;
    } }, An.prototype.init.prototype = An.prototype, An.propHooks = { _default: { get: function get(e) {
        var t;return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop];
      }, set: function set(e) {
        x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
      } } }, An.propHooks.scrollTop = An.propHooks.scrollLeft = { set: function set(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    } }, x.each(["toggle", "show", "hide"], function (e, t) {
    var n = x.fn[t];x.fn[t] = function (e, r, i) {
      return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(Ln(t, !0), e, r, i);
    };
  }), x.fn.extend({ fadeTo: function fadeTo(e, t, n, r) {
      return this.filter(At).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
    }, animate: function animate(e, t, n, r) {
      var i = x.isEmptyObject(e),
          o = x.speed(t, n, r),
          s = function s() {
        var t = Sn(this, x.extend({}, e), o);s.finish = function () {
          t.stop(!0);
        }, (i || q.get(this, "finish")) && t.stop(!0);
      };return s.finish = s, i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s);
    }, stop: function stop(e, t, n) {
      var r = function r(e) {
        var t = e.stop;delete e.stop, t(n);
      };return "string" != typeof e && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
        var t = !0,
            i = null != e && e + "queueHooks",
            o = x.timers,
            s = q.get(this);if (i) s[i] && s[i].stop && r(s[i]);else for (i in s) {
          s[i] && s[i].stop && Tn.test(i) && r(s[i]);
        }for (i = o.length; i--;) {
          o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
        }(t || !n) && x.dequeue(this, e);
      });
    }, finish: function finish(e) {
      return e !== !1 && (e = e || "fx"), this.each(function () {
        var t,
            n = q.get(this),
            r = n[e + "queue"],
            i = n[e + "queueHooks"],
            o = x.timers,
            s = r ? r.length : 0;for (n.finish = !0, x.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), t = o.length; t--;) {
          o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
        }for (t = 0; s > t; t++) {
          r[t] && r[t].finish && r[t].finish.call(this);
        }delete n.finish;
      });
    } });function Ln(e, t) {
    var n,
        r = { height: e },
        i = 0;for (t = t ? 1 : 0; 4 > i; i += 2 - t) {
      n = St[i], r["margin" + n] = r["padding" + n] = e;
    }return t && (r.opacity = r.width = e), r;
  }x.each({ slideDown: Ln("show"), slideUp: Ln("hide"), slideToggle: Ln("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
    x.fn[e] = function (e, n, r) {
      return this.animate(t, e, n, r);
    };
  }), x.speed = function (e, t, n) {
    var r = e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? x.extend({}, e) : { complete: n || !n && t || x.isFunction(e) && e, duration: e, easing: n && t || t && !x.isFunction(t) && t };return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue);
    }, r;
  }, x.easing = { linear: function linear(e) {
      return e;
    }, swing: function swing(e) {
      return .5 - Math.cos(e * Math.PI) / 2;
    } }, x.timers = [], x.fx = An.prototype.init, x.fx.tick = function () {
    var e,
        t = x.timers,
        n = 0;for (vn = x.now(); t.length > n; n++) {
      e = t[n], e() || t[n] !== e || t.splice(n--, 1);
    }t.length || x.fx.stop(), vn = undefined;
  }, x.fx.timer = function (e) {
    e() && x.timers.push(e) && x.fx.start();
  }, x.fx.interval = 13, x.fx.start = function () {
    xn || (xn = setInterval(x.fx.tick, x.fx.interval));
  }, x.fx.stop = function () {
    clearInterval(xn), xn = null;
  }, x.fx.speeds = { slow: 600, fast: 200, _default: 400 }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function (e) {
    return x.grep(x.timers, function (t) {
      return e === t.elem;
    }).length;
  }), x.fn.offset = function (e) {
    if (arguments.length) return e === undefined ? this : this.each(function (t) {
      x.offset.setOffset(this, e, t);
    });var t,
        n,
        i = this[0],
        o = { top: 0, left: 0 },
        s = i && i.ownerDocument;if (s) return t = s.documentElement, x.contains(t, i) ? (_typeof(i.getBoundingClientRect) !== r && (o = i.getBoundingClientRect()), n = qn(s), { top: o.top + n.pageYOffset - t.clientTop, left: o.left + n.pageXOffset - t.clientLeft }) : o;
  }, x.offset = { setOffset: function setOffset(e, t, n) {
      var r,
          i,
          o,
          s,
          a,
          u,
          l,
          c = x.css(e, "position"),
          f = x(e),
          p = {};"static" === c && (e.style.position = "relative"), a = f.offset(), o = x.css(e, "top"), u = x.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = f.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), x.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (p.top = t.top - a.top + s), null != t.left && (p.left = t.left - a.left + i), "using" in t ? t.using.call(e, p) : f.css(p);
    } }, x.fn.extend({ position: function position() {
      if (this[0]) {
        var e,
            t,
            n = this[0],
            r = { top: 0, left: 0 };return "fixed" === x.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (r = e.offset()), r.top += x.css(e[0], "borderTopWidth", !0), r.left += x.css(e[0], "borderLeftWidth", !0)), { top: t.top - r.top - x.css(n, "marginTop", !0), left: t.left - r.left - x.css(n, "marginLeft", !0) };
      }
    }, offsetParent: function offsetParent() {
      return this.map(function () {
        var e = this.offsetParent || s;while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position")) {
          e = e.offsetParent;
        }return e || s;
      });
    } }), x.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, n) {
    var r = "pageYOffset" === n;x.fn[t] = function (i) {
      return x.access(this, function (t, i, o) {
        var s = qn(t);return o === undefined ? s ? s[n] : t[i] : (s ? s.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o, undefined);
      }, t, i, arguments.length, null);
    };
  });function qn(e) {
    return x.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
  }x.each({ Height: "height", Width: "width" }, function (e, t) {
    x.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (n, r) {
      x.fn[r] = function (r, i) {
        var o = arguments.length && (n || "boolean" != typeof r),
            s = n || (r === !0 || i === !0 ? "margin" : "border");return x.access(this, function (t, n, r) {
          var i;return x.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? x.css(t, n, s) : x.style(t, n, r, s);
        }, t, o ? r : undefined, o, null);
      };
    });
  }), x.fn.size = function () {
    return this.length;
  }, x.fn.andSelf = x.fn.addBack, "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = x : "function" == typeof define && define.amd && define("jquery", [], function () {
    return x;
  }), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && "object" == _typeof(e.document) && (e.jQuery = e.$ = x);
})(window);

},{}],16:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 *
 * Plugin jquery videoframe
 * @version : 1.2.1 bug avec vimeo.player, difficulté de récup Vimeo après chargement en async
 * @version : 1.2 intégration vimeo.player
 * @version : 1.1.1 (intégration numeridanse.tv) + correction de qq bugs
 * @author: Marc Loyat dankastudio - mailto:marc@dankastudio.fr
 *
 * Plugin jquery qui permet de charger et controler une vidéo hébergée sur youtube, vimeo, dailymotion ou numeridanse
 * en fournissant l'url de la page de la vidéo sur la plateforme
 *
 * Vocabulaire :
 	* Nous appelons ici "frame" la zone d'affichage dans laquelle sera chargée la vidéo

 * Prérequis css
 	* La frame doit avoir les attributs css suivants :
		* display : block|inline-block
		* position : relative|absolute|fixed
		* overflow : hidden
	* Il est recommandé que la frame ait les attributs css suivants :
		* background : black
	*
	* Par ailleurs la frame doit avoir une taille définie, les players vidéo prendront 100% de la zone

 * Exemple de html

	<div class="js-VideoFrame VideoSlide" data-video="https://www.youtube.com/watch?v=vnWS6b_tP1k"></div>

 * Exemple de css associé

	.js-VideoFrame{
		overflow:hidden;
		position:relative;
		width:100%;
		background: #000;

	}
	.VideoSlide{
		width:800px;
		height:580px;
	}

 *
 *
 * Attributs html :
 	* @data-video - l'url de la page de la vidéo
 *
 *
 * Paramètre JS
 	* L'appel de la fonction jquery peut se faire selon les modalités suivantes
		* $(".monelement").videoframe();
		* $(".monelement").videoframe(settings);
		* $(".monelement").videoframe(action);
	*
	* @settings:Object - permet de régler quelques options du plugin
		* autoplay:Boolean (false par défaut) - permet de lancer automatiquement la vidéo quand c'est possible
	*
	* @action:String - indique au plugin une action à réaliser sur l'élément déjà initialisé
		* Valeurs attendues :
			* "play" - peremet de lancer la lecture de la vidéo
			* "stop" - peremet d'arrêter la lecture de la vidéo
 *
 *
 */
(function ($) {

	// compteur pour créer des id de player uniques
	var uniqueID = 0;

	// stockage des interfaces video par id
	var registre = {};

	// un p'tit helper pour générer un code iframe
	function _getIframe(url, id) {
		var str = '<iframe id="{id}" src="{url}" width="100%" height="100%" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		return str.replace(/\{url\}/, url).replace(/\{id\}/, id);
	}

	$.fn.videoframe = function () {

		var options = null,
		    action = null,
		    arg;
		// arguments
		for (var i = 0, l = arguments.length; i < l; i++) {
			arg = arguments[i];
			if ((typeof arg === "undefined" ? "undefined" : _typeof(arg)) == "object") {
				options = arg;
			}
			if (typeof arg == "string") {
				action = arg.toLowerCase();
			}
		}

		// les actions
		// lance le resize à la mano de l'image
		var ACTION_PLAY = "play";
		var ACTION_STOP = "stop";
		var ACTION_PAUSE = "pause";

		// les providers connus
		var VIDEO_PROVIDER_YOUTUBE = "youtube";
		var VIDEO_PROVIDER_DAILYMOTION = "dailymotion";
		var VIDEO_PROVIDER_VIMEO = "vimeo";
		var VIDEO_PROVIDER_NUMERIDANSE = "numeridanse";
		var VIDEO_PROVIDER_UNKNOWN = null;

		function _detectProvider(url) {
			if (YoutubeInterface.recognize(url)) {
				return VIDEO_PROVIDER_YOUTUBE;
			}
			if (DailyMotionInterface.recognize(url)) {
				return VIDEO_PROVIDER_DAILYMOTION;
			}
			if (VimeoInterface.recognize(url)) {
				return VIDEO_PROVIDER_VIMEO;
			}
			if (NumeridanseInterface.recognize(url)) {
				return VIDEO_PROVIDER_NUMERIDANSE;
			}
		}

		if (action == ACTION_PLAY) {
			return this.each(function () {
				var jframe = $(this),
				    id = jframe.attr("id"),
				    vinterface = registre[id];
				if (vinterface) {
					vinterface.play();
				}
			});
		}

		if (action == ACTION_STOP) {
			return this.each(function () {
				var jframe = $(this),
				    id = jframe.attr("id"),
				    vinterface = registre[id];
				if (vinterface) {
					vinterface.stop();
				}
			});
		}

		if (action == ACTION_PAUSE) {
			return this.each(function () {
				var jframe = $(this),
				    id = jframe.attr("id"),
				    vinterface = registre[id];
				if (vinterface) {
					vinterface.pause();
				}
			});
		}

		return this.each(function () {

			var jthis = $(this),
			    videoPageUrl = jthis.attr("data-video"),
			    videoProvider = _detectProvider(videoPageUrl),
			    vinterface;

			var id = jthis.attr("id"),
			    vinterface = registre[id];
			if (vinterface) {
				return;
			}

			var settings = $.extend({
				autoplay: false
			}, options);

			switch (videoProvider) {
				case VIDEO_PROVIDER_YOUTUBE:
					vinterface = new YoutubeInterface(jthis, videoPageUrl, settings);
					break;
				case VIDEO_PROVIDER_DAILYMOTION:
					vinterface = new DailyMotionInterface(jthis, videoPageUrl);
					break;
				case VIDEO_PROVIDER_VIMEO:
					vinterface = new VimeoInterface(jthis, videoPageUrl);
					break;
				case VIDEO_PROVIDER_NUMERIDANSE:
					vinterface = new NumeridanseInterface(jthis, videoPageUrl, settings);
					break;
			}

			if (!vinterface) {
				return;
			}

			if (settings.autoplay) {
				vinterface.play();
			}
		});
	};

	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	// ------------------------- INTERFACE NEUTRE ------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------

	function PlayerInterface(jframe, videoURL) {

		if (!arguments.length) {
			return;
		}
		this.jframe = jframe;
		this.videoID = this.extract(videoURL);

		var id = "videoframe_" + uniqueID++;
		jframe.attr("id", id);

		registre[id] = this;
	}

	/**
  * stockage de la référence vers l'élément html frame
  */
	PlayerInterface.prototype.jframe = null;

	/**
  * stockage de l'id de la vidéo à charger
  */
	PlayerInterface.prototype.videoID = null;

	/**
  * indique si l'on souhaite que la vidéo se lance automatiquement lorsqu'elle est prête
  */
	PlayerInterface.prototype.autoplay = false;

	/**
  * indique que le player est prêt
  */
	PlayerInterface.prototype.ready = false;

	/**
  * extraction de l'id de la vidéo en fonction de l'url de la page vidéo
  */
	PlayerInterface.prototype.extract = function (url) {
		// override
		return null;
	};

	PlayerInterface.prototype.play = function () {};
	PlayerInterface.prototype.stop = function () {};
	PlayerInterface.prototype.onReady = function () {};
	/**
  * onReady interne
  */
	PlayerInterface.prototype._onPlayerReady = function () {};

	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	// ------------------------- NUMERIDANSE -----------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------

	function NumeridanseInterface(jframe, videoURL, settings) {

		// détection de la présence de l'api youtube
		NumeridanseInterface.detect();

		// super
		PlayerInterface.apply(this, arguments);
		this.settings = settings;
		this._init();
	}

	NumeridanseInterface.prototype = new PlayerInterface();

	NumeridanseInterface.prototype.pause = function () {
		if (this.iframe) {
			this.iframe.contentWindow.postMessage("pause", "*");
		} else {
			this.autoplay = false;
		}
	};

	NumeridanseInterface.prototype.stop = function () {
		if (this.iframe) {
			this.iframe.contentWindow.postMessage("stop", "*");
		} else {
			this.autoplay = false;
		}
	};
	NumeridanseInterface.prototype.play = function () {
		if (this.iframe) {
			this.iframe.contentWindow.postMessage("play", "*");
		} else {
			this.autoplay = true;
		}
	};
	NumeridanseInterface.prototype._init = function () {

		var refThis = this,
		    jframe = this.jframe,
		    videoID = this.videoID,
		    playerID = "nd" + videoID,
		    url = "http://www.numeridanse.tv/fr/share/video/embed/" + videoID;
		url += '/' + (this.settings.autoplay ? '1' : '0'); // autostart
		url += '/' + (this.settings.interface ? '1' : '0'); // planquer les commandes

		jframe.append(_getIframe(url, playerID));

		this.iframe = $("iframe", jframe)[0];
	};

	NumeridanseInterface.prototype.extract = function (url) {
		// http://numeridanse.tv/fr/video/3758_rites
		//http://numeridanse.tv/fr/share/video/embed/3407
		var match = url.match(/.*\/(\d+)_.*/);
		if (!match) {
			match = url.match(/.*\/(\d+)$/);
		}
		return match ? match[1] : false;
	};

	// METHODES STATIQUES

	/**
  * est-ce une vidéo youtube
  */
	NumeridanseInterface.recognize = function (url) {
		return url.match(/numeridanse\.tv\//);
	};
	/**
  * indique que l'api js est dispo
  */
	NumeridanseInterface.apiReady = true;

	/**
  * détection
  */
	NumeridanseInterface.detect = function () {};

	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	// ------------------------- VIMEO -----------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------

	function VimeoInterface(jframe, videoURL) {

		// détection de la présence de l'api vimeo
		VimeoInterface.detect();

		// super
		PlayerInterface.apply(this, arguments);
		this.asyncInit();
	}

	VimeoInterface.prototype = new PlayerInterface();

	VimeoInterface.prototype.asyncInit = function () {
		if (!VimeoInterface.apiReady) {
			var refThis = this;
			return setTimeout(function () {
				refThis.asyncInit();
			}, 100);
		}
		this._init();
	};

	VimeoInterface.prototype.stop = VimeoInterface.prototype.pause = function () {
		if (this.ready) {
			this.player.pause();
		} else {
			this.autoplay = false;
		}
	};
	VimeoInterface.prototype.play = function () {
		if (this.ready) {
			this.player.play();
		} else {
			this.autoplay = true;
		}
	};
	VimeoInterface.prototype._onPlayerReady = function () {
		this.ready = true;
		this.onReady();
	};
	VimeoInterface.prototype._init = function () {
		// on passe par le mode iframe qui permet width et height à 100%
		var refThis = this,
		    jframe = this.jframe,
		    videoID = this.videoID,
		    playerID = "vm" + videoID,
		    url = "https://player.vimeo.com/video/" + videoID + "?byline=false&portrait=false&title=false";
		if (this.autoplay) {
			url += "&autoplay=true";
		}

		jframe.append(_getIframe(url, playerID));

		this.iframe = $("iframe", jframe)[0];
		// bug depuis upgrade du player vimeo js, pb de récup de l'objet Vimeo après chargement en asynchrone
		//this.player = new Vimeo.Player(this.iframe);
		//this.player.ready().then(function(){refThis._onPlayerReady()});
	};

	VimeoInterface.prototype.extract = function (url) {
		// http://stackoverflow.com/questions/13286785/get-video-id-from-vimeo-url
		var vimeo_Reg = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
		var match = url.match(vimeo_Reg);
		return match ? match[3] : false;
	};

	// METHODES STATIQUES

	/**
  * est-ce une vidéo youtube
  */
	VimeoInterface.recognize = function (url) {
		return url.match(/vimeo\.com\//);
	};
	/**
  * indique que l'api js est dispo
  */
	VimeoInterface.apiReady = true; // = false;//bug depuis upgrade du player vimeo js, pb de récup de l'objet Vimeo après chargement en asynchrone

	/**
  * détection
  */
	VimeoInterface.detect = function () {

		var s = "https://player.vimeo.com/api/player.js";
		if ($("script[src='" + s + "']").length == 0) {

			var tag = document.createElement('script');
			tag.src = s;

			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}

		//detect(); // bug depuis upgrade du player vimeo js, pb de récup de l'objet Vimeo après chargement en asynchrone

		function detect() {
			if (typeof Vimeo == "undefined") {
				return setTimeout(detect, 80);
			}

			VimeoInterface.apiReady = true;
		}
	};

	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	// ------------------------- YOUTUBE ---------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------

	function YoutubeInterface(jframe, videoURL, settings) {

		// détection de la présence de l'api youtube
		YoutubeInterface.detect();

		this.settings = settings;

		// super
		PlayerInterface.apply(this, arguments);
		this.asyncInit();
	}

	YoutubeInterface.prototype = new PlayerInterface();

	YoutubeInterface.prototype.asyncInit = function () {
		if (!YoutubeInterface.apiReady) {
			var refThis = this;
			return setTimeout(function () {
				refThis.asyncInit();
			}, 100);
		}
		this._init();
	};

	YoutubeInterface.prototype.pause = function () {
		if (this.ready) {
			this.player.pauseVideo();
		} else {
			this.autoplay = false;
		}
	};
	YoutubeInterface.prototype.stop = function () {
		if (this.ready) {
			this.player.stopVideo();
		} else {
			this.autoplay = false;
		}
	};
	YoutubeInterface.prototype.play = function () {
		if (this.ready) {
			this.player.playVideo();
		} else {
			this.autoplay = true;
		}
	};
	YoutubeInterface.prototype._onPlayerReady = function () {
		this.ready = true;
		this.onReady();
		if (this.autoplay) {
			this.play();
		}
	};
	YoutubeInterface.prototype._init = function () {

		var refThis = this,
		    jframe = this.jframe,
		    videoID = this.videoID,
		    playerID = jframe.attr("id");

		this.player = new YT.Player(playerID, {
			height: '100%',
			width: '100%',
			videoId: videoID,
			playerVars: {
				autoplay: 0,
				controls: this.settings.interface ? 1 : 0,
				wmode: "opaque",
				// modestbranding:1,
				rel: 0,
				showinfo: 0
			},
			events: {
				'onReady': function onReady() {
					refThis._onPlayerReady();
				}
			}
		});
	};

	YoutubeInterface.prototype.extract = function (url) {
		// thx to http://lasnv.net/foro/839/Javascript_parsear_URL_de_YouTube
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match(regExp);
		return match && match[7].length == 11 ? match[7] : false;
	};

	// METHODES STATIQUES

	/**
  * est-ce une vidéo youtube
  */
	YoutubeInterface.recognize = function (url) {
		// https://youtu.be/zU_npsBDe4s
		// https://www.youtube.com/watch?v=zU_npsBDe4s
		// ->https://www.youtube.com/embed/zU_npsBDe4s?modestbranding=1&controls=0&wmode=opaque&rel=0&showinfo=0
		return url.match(/youtu\.be\/|youtube\.com\//);
	};
	/**
  * indique que l'api js est dispo
  */
	YoutubeInterface.apiReady = false;

	/**
  * détection
  */
	YoutubeInterface.detect = function () {

		if ($("script[src='https://www.youtube.com/iframe_api']").length == 0) {

			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";

			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}

		detectYT();

		function detectYT() {
			if (typeof YT == "undefined" || typeof YT.Player == "undefined") {
				return setTimeout(detectYT, 80);
			}
			YoutubeInterface.apiReady = true;
		}
	};

	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	// ------------------------- DAILYMOTION------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------

	function DailyMotionInterface(jframe, videoURL) {

		// détection de la présence de l'api youtube
		DailyMotionInterface.detect();

		// super
		PlayerInterface.apply(this, arguments);
		jframe.append('<div class="player"></div>');
		this.asyncInit();
	}

	DailyMotionInterface.prototype = new PlayerInterface();

	DailyMotionInterface.prototype.asyncInit = function () {
		if (!DailyMotionInterface.apiReady) {
			var refThis = this;
			return setTimeout(function () {
				refThis.asyncInit();
			}, 100);
		}
		this._init();
	};

	DailyMotionInterface.prototype.stop = DailyMotionInterface.prototype.pause = function () {
		if (this.ready) {
			this.player.pause();
		} else {
			this.autoplay = false;
		}
	};
	DailyMotionInterface.prototype.play = function () {
		if (this.ready) {
			this.player.play();
		} else {
			this.autoplay = true;
		}
	};
	DailyMotionInterface.prototype._onPlayerReady = function () {
		this.ready = true;
		this.onReady();
		if (this.autoplay) {
			this.player.play();
		}
	};
	DailyMotionInterface.prototype._init = function () {

		var refThis = this,
		    jframe = this.jframe,
		    videoID = this.videoID,
		    playerID = jframe.attr("id");

		this.player = DM.player($(".player", jframe)[0], {
			video: videoID, width: "100%", height: "100%",
			params: { html: 1, autoplay: 0, info: 0, logo: 0, related: 0, quality: 720 },
			events: {
				apiready: function apiready() {
					refThis._onPlayerReady();
				}
			}
		});
	};

	DailyMotionInterface.prototype.extract = function (url) {
		// http://stackoverflow.com/questions/12387389/how-to-parse-dailymotion-video-url-in-javascript
		var re = /(?:dailymotion\.com(?:\/video|\/hub)|dai\.ly)\/([0-9a-z]+)(?:[\-_0-9a-zA-Z]+#video=([a-z0-9]+))?/g;
		var m;

		while ((m = re.exec(url)) != null) {
			return m[2] ? m[2] : m[1];
		}
		return false;
	};

	// METHODES STATIQUES

	/**
  * est-ce une vidéo youtube
  */
	DailyMotionInterface.recognize = function (url) {
		/**
  http://www.dailymotion.com/video/x44lvd_rates-of-exchange-like-a-renegade_music
  http://www.dailymotion.com/video/x44lvd
  http://www.dailymotion.com/hub/x9q_Galatasaray
  http://www.dailymotion.com/login?restricted_action=1&urlback=%2Fupload
  http://www.dailymotion.com/hub/x9q_Galatasaray#video=xjw21s
  http://www.dailymotion.com/video/xn1bi0_hakan-yukur-klip_sport
  http://dai.ly/x44lvd
  /**/
		return url.match(/dailymotion\.com\/|dai\.ly\//);
	};
	/**
  * indique que l'api js est dispo
  */
	DailyMotionInterface.apiReady = false;

	/**
  * détection
  */
	DailyMotionInterface.detect = function () {

		var s = "http://api.dmcdn.net/all.js";
		if ($("script[src='" + s + "']").length == 0) {

			var tag = document.createElement('script');
			tag.src = s;

			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}

		detect();

		function detect() {
			if (typeof DM == "undefined" || typeof DM.player == "undefined") {
				return setTimeout(detect, 80);
			}
			DailyMotionInterface.apiReady = true;
		}
	};
})(jQuery);

},{}],17:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * JavaScript Cookie v2.0.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		module.exports = factory();
	} else {
		var _OldCookies = window.Cookies;
		var api = window.Cookies = factory(window.jQuery);
		api.noConflict = function () {
			window.Cookies = _OldCookies;
			return api;
		};
	}
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
			var result;

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				value = encodeURIComponent(String(value));
				value = value.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return document.cookie = [key, '=', value, attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
				attributes.path && '; path=' + attributes.path, attributes.domain && '; domain=' + attributes.domain, attributes.secure ? '; secure' : ''].join('');
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var name = parts[0].replace(rdecode, decodeURIComponent);
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				cookie = converter && converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

				if (this.json) {
					try {
						cookie = JSON.parse(cookie);
					} catch (e) {}
				}

				if (key === name) {
					result = cookie;
					break;
				}

				if (!key) {
					result[name] = cookie;
				}
			}

			return result;
		}

		api.get = api.set = api;
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init();
});

},{}]},{},[1])

//# sourceMappingURL=app.js.map
;
