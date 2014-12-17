---
---
{% include components/jquery/jquery-1.11.1.min.js %}
{% include components/isotope/isotope.pkgd.min.js %}
{% include components/glitch/glitch.jquery.js %}
{% include components/html2canvas/html2canvas.js %}
{% include components/glitch/glitch.js %}


(function ($) {

    $('[data-js-grid]').isotope({
        transitionDuration: 0,
        layoutMode: 'fitRows'
    });


    $('[data-js-glitch]').glitch({
        bg: null,    // background color
        maxint: 7,     // max interval between glitchings
        minint: 2,      // min interval between glitchings
        maxglitch: 6,   // max number of twitches
        hshift: 3,      // max horizontal shift
        vshift: 3,      // max vertical shift
        direction: 'random' // 'horizontal', 'vertical' or 'random'
    });

    // $('body').each(function () {
    //     var self = this;
    //     setTimeout(function () {
    //         $(self).glitcher('replace', {
    //             amount: 8
    //         });
    //     },2500);
    // });

}(jQuery));