---
---
{% include components/jquery/jquery-1.11.1.min.js %}
{% include components/isotope/isotope.pkgd.min.js %}
{% include components/glitch/glitch.jquery-mod.js %}
{% include components/html2canvas/html2canvas.js %}
{% include components/html2canvas/html2canvas.svg.js %}
{% include components/glitch/glitch-mod.js %}
{% include components/vimeo/frogaloop.js %}

{% include components/chuffle/jquery.chuffle.js %}


(function ($) {


    /*
     *    Isotope / Grid
     */

    $('[data-js-grid]').isotope({
        transitionDuration: '0.4s',
        layoutMode: 'fitRows'
    });



    /*
     *    Glitch / Hack Indicators
     */

    $('[data-js-glitch]').glitch({
        bg: null,    // background color
        maxint: 7,     // max interval between glitchings
        minint: 2,      // min interval between glitchings
        maxglitch: 6,   // max number of twitches
        hshift: 3,      // max horizontal shift
        vshift: 3,      // max vertical shift
        direction: 'random' // 'horizontal', 'vertical' or 'random'
    });



    /*
     *    Hacktivism
     */

    var hacktivismIframe = $('#hacktivism').get(0),
        hacktivismPlayer = $f(hacktivismIframe),
        $scrambleElements = $('.offer__description').find('p').add('h2').add('h3').add('h4').add('h5').add('h6');

    $('[data-js-glitcher-on-click]').bind('click.glitcher', function () {

        $('[data-js-glitcher-on-click]').unbind('click.glitcher');

        // State changes
        $('body').addClass('hacked');

        $(this).html('Signing up…')

        // Glitch it!
        $('.hacktivism-message').find('span')
            .add('.offer__description p')
            .add('.logo')
            .glitch({
                bg: null,
                maxint: 0.5,
                minint: 0.1,
                maxglitch: 8,
                hshift: 4,
                vshift: 4,
                direction: 'random'
            });

        // Scramble page text
        $scrambleElements.add(this).each(function (i) {
            var $item = $(this);
            // setTimeout(function() {
                $item.chuffle({ lang: "en", minTime: 5 })
            // }, 50*i);
        });


        $('.hacktivism-message')
            .addClass('is-active');

        // Remove iframe before glitch
        $('#glitch-wrapper').find('iframe').remove();


        // After Scrambling Glitch the whole page
        setTimeout(function () {
            $('#glitch-wrapper').glitcher('replace', {
                amount: 24,
                complete: function () {

                    // Invert
                    invertCanvas($('body').find('canvas').first().get(0));
                    $('body').css('background-color', '#222');

                    // State change
                    $('.hacktivism-video')
                        .addClass('is-active');

                    // Autoplay Vimeo
                    hacktivismPlayer.api('play');

                    // Glitch it!
                    $('.hacktivism-message').find('span')
                        .glitch({
                            bg: null,
                            maxint: 1.3,
                            minint: 0.5,
                            maxglitch: 8,
                            hshift: 0.1,
                            vshift: 0.1,
                            direction: 'random'
                        });
                }
            });
        }, 500+50);

    });



    /*
     *    Invert Canvas
     */

    function invertCanvas (canvas) {
        var context = canvas.getContext('2d');

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;

        for(var i = 0; i < data.length; i += 4) {
          // red
          data[i] = 255 - data[i];
          // green
          data[i + 1] = 255 - data[i + 1];
          // blue
          data[i + 2] = 255 - data[i + 2];
        }

        // overwrite original image
        context.putImageData(imageData, 0, 0);
      }


}(jQuery));