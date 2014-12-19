---
---
{% include components/jquery/jquery-1.11.1.min.js %}
{% include components/isotope/isotope.pkgd.min.js %}
{% include components/glitch/glitch.jquery-mod.js %}
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
        bg: null,
        maxint: 7,
        minint: 2,
        maxglitch: 6,
        hshift: 3,
        vshift: 3,
        direction: 'random'
    });



    /*
     *    Hacktivism
     */

    var hacktivismIframe = $('#hacktivism').get(0),
        hacktivismPlayer = $f(hacktivismIframe),
        $scrambleElements = $('.offer__description').find('p').add('.testimonials p').add('.about p').add('h2').add('h3').add('h4').add('h5').add('h6');
        $clickGlitch = $('[data-js-glitcher-on-click]');

    $clickGlitch.bind('click.glitcher', function () {


        ga('send', 'signup', 'button', 'click', 'Sign up Button', null, {'Button Nr. ': $clickGlitch.index($(this)) });
        console.log('send', 'signup', 'button', 'click', 'Sign up Button', null, {'Button Nr. ': $clickGlitch.index($(this)) });

        $clickGlitch.unbind('click.glitcher');

        // State changes

        $(this).html('Signing up…')

        // Glitch it!
        $('.hacktivism-message').find('span')
            .add('.offer__description p')
            .add('.testimonials p')
            .add('.about p')
            .add('.about blockquote')
            .add('.logo')
            .glitch({
                bg: null,
                maxint: 4,
                minint: 2,
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

            // Invert
            $('body').css('background-color', '#222');

            // State change
            $('body').addClass('hacked');

            $('.hacktivism-video')
                .addClass('is-active');

            // Autoplay Vimeo
            hacktivismPlayer.api('play');

            // Glitch it!
            $('[data-js-glitch-hacktivism]')
                .glitch({
                    bg: null,
                    maxint: 1.3,
                    minint: 0.5,
                    maxglitch: 8,
                    hshift: 0.1,
                    vshift: 0.1,
                    direction: 'random'
                });

        }, 500+50);

    });



}(jQuery));