var user_scroll = false;

$(document).on('mousewheel',function() {
  user_scroll = true;
})

var hash_highlight;

check_scroll = function() {
  fromTop = 106;
  hash = window.location.hash
  if(hash.length > 1) {
    if($(hash).length > 0) { // If element exists
      $('html, body').scrollTop($(hash).offset().top - fromTop);
      if (!hash_highlight) {
        hash_highlight = $('<div id="hash_highlight"></div>');
        $('body').append(hash_highlight);
        hash_highlight.css({
          position: 'absolute',
          background: '#fcf8e3',
          'z-index': -1
        })
      }
      hash_highlight.show();
      hash_highlight.stop();
      hash_highlight.css({
        top: parseInt($(hash).position().top,10) + parseInt($(hash).css('margin-top'),10) -10,
        height: $(hash).height() + 20,
        left: $(hash).position().left - 10,
        width: $(hash).width() + 20
      })
      hash_highlight.css({
        display: 'block',
        opacity: 1,
      })
      setTimeout(function() {
        hash_highlight.fadeOut(2000);
      },1000)
    }
  }
  return false;
}
$(document).ready(check_scroll);
$(window).on('hashchange', check_scroll)
$(document).on('click', 'a', function() {
  if ($(this).attr('href').match(/^\#/)) {
    check_scroll();
  }
})
$(document).on('scroll', function () {
  if (user_scroll == false) {
    check_scroll()
  }
});