/*!
 * chuffle v1.0.0
 *
 * Licensed under MIT
 * Author : d-simon
 *
 */
(function($) {
    var namespace = "chuffle";
    var methods = {
        init: function(options) {

            options = $.extend({
                speed: 40,
                time: 500,
                minTime: 20,
                lang: "random" // "en"
            }, options);

            return this.each(function() {
                var _this = this;
                var $this = $(this);
                var data = $this.data(namespace);
                if (!data) {
                    options = $.extend({}, options);
                    $this.data(namespace, {
                        options: options
                    });
                }
                var $text = $this.text();
                var shuffleStr;
                var shuffle_timer;
                var shuffle_timer_delay;
                var remainingTextLength;
                var remainingText;
                var lang = $this.data("lang") || options.lang;
                var shuffle = function() {

                    shuffleStr = "";

                    if (remainingTextLength > 0) {
                        for (i = 0; i < $text.length - remainingTextLength; i++) {
                            shuffleStr += random_text.call(this, lang);
                        }
                        $this.text(shuffleStr + remainingText);
                    } else {
                        clearInterval(shuffle_timer);
                    }
                };
                var shuffle_delay = function() {
                    if (remainingTextLength > 0) {

                        remainingTextLength--;

                        remainingText = $text.substr($text.length - remainingTextLength, $text.length);
                    } else {
                        clearInterval(shuffle_timer_delay);
                        // Finally, shuffle one last time to ensure a fully shuffled text
                        remainingTextLength = 1;
                        shuffle.call(_this);
                        remainingTextLength--;
                    }
                };
                var random_text = function(lang) {
                    var str;
                    var lang = lang || "en";
                    switch (lang) {
                        case "random":
                            str = (Math.random() > 0.2) ? random_text("en") : random_text(["en", "ja", "ja-hiragana", "ja-katakana"][Math.floor(Math.random()*4)]);
                            break;
                        case "en":
                            str = String.fromCharCode(33 + Math.round(Math.random() * 99));
                            break;

                        case "ja":
                            str = String.fromCharCode(19968 + Math.round(Math.random() * 80));
                            break;

                        case "ja-hiragana":
                            str = String.fromCharCode(12352 + Math.round(Math.random() * 50));
                            break;

                        case "ja-katakana":
                            str = String.fromCharCode(12448 + Math.round(Math.random() * 84));
                            break;
                    }
                    return str;
                };
                var start = function() {
                    remainingTextLength = $text.length;
                    remainingText = $text;
                    clearInterval(shuffle_timer);
                    clearInterval(shuffle_timer_delay);
                    shuffle_timer = setInterval(function() {
                        shuffle.call(_this);
                    }, options.speed);
                    shuffle_timer_delay = setInterval(function() {
                        shuffle_delay.call(this);
                    }, Math.min(options.time/($text.length/3),options.minTime));
                };

                // $this.unbind("mouseover." + namespace).bind("mouseover." + namespace, function() {
                //     start.call(_this);
                // });

                start.call(_this);

            });
        },
        destroy: function() {
            return this.each(function() {
                var $this = $(this);
                $(window).unbind("." + namespace);
                $this.removeData(namespace);
            });
        }
    };
    $.fn.chuffle = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jQuery." + namespace);
        }
    };
})(jQuery);
