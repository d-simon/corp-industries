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

    $('[data-js-grid]').isotope({
        transitionDuration: '0.4s',
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



    var iframe = $('#hacktivism').get(0),
        player = $f(iframe),
        $scrambleElements = $('p'); // .add('h1').add('h2').add('h3').add('h4').add('h5').add('h6');

    $('[data-js-glitcher-on-click]').bind('click.glitcher', function () {

        $scrambleElements.add(this).each(function (i) {
            var $item = $(this);
            setTimeout(function() {
                $item.chuffle({ lang: "en" })
            }, 50*i);
        });

        $('body').addClass('hacked');

        $(this).html('Signing up…')

        $('#glitch-wrapper').find('iframe').remove();

            setTimeout(function () {
                $('#glitch-wrapper').glitcher('replace', {
                    amount: 24,
                    complete: function () {
                        console.log(arguments, this);
                        drawImage();

                        $('body').css('background-color', '#222');

                        $('.hacktivism-video')
                            .add('.hacktivism-message')
                            .addClass('is-active');

                        $('.hacktivism-message').find('span')
                            .add($scrambleElements)
                            .add('.logo')
                            .glitch({
                                bg: null,    // background color
                                maxint: 1.1,     // max interval between glitchings
                                minint: 0.5,      // min interval between glitchings
                                maxglitch: 8,   // max number of twitches
                                hshift: 0.1,      // max horizontal shift
                                vshift: 0.1,      // max vertical shift
                                direction: 'random' // 'horizontal', 'vertical' or 'random'
                            });



                        player.api('play');
                    }
                });
            }, 500+50*$scrambleElements.length);

    });


    function drawImage() {
        var canvas = $('body').find('canvas').first().get(0);
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