---
---
{% include components/jquery/jquery-1.11.1.min.js %}
{% include components/isotope/isotope.pkgd.min.js %}


(function ($) {

    $('[data-js-grid]').isotope({
        transitionDuration: 0,
        layoutMode: 'fitRows'
    });

}(jQuery));