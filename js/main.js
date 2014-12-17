---
---
{% include components/jquery/jquery-1.11.1.min.js %}
{% include components/isotope/isotope.pkgd.min.js %}
{% include components/glitch/glitch.jquery-mod.js %}
{% include components/html2canvas/html2canvas.js %}
{% include components/html2canvas/html2canvas.svg.js %}
{% include components/glitch/glitch-mod.js %}
{% include components/vimeo/frogaloop.js %}


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



    var iframe = $('#hacktivism').get(0),
        player = $f(iframe);

    $('[data-js-glitcher-on-click]').bind('click.glitcher', function () {

        $(this).html('Signing up…')

        $('#glitch-wrapper').find('iframe').remove();

        $('#glitch-wrapper').glitcher('replace', {
            amount: 24,
            complete: function () {
                console.log(arguments, this);
                drawImage();
                $('body').css('background-color', '#222');
                $('.hacktivism-video').add('.hacktivism-message').addClass('is-active');

                player.api('play');
            }
        });

        // $('body').find('canvas').first().glitcher('replace', { amount: 4 })
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