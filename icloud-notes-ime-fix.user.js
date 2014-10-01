// ==UserScript==
// @name icloud-notes-ime-fix.user.js
// @namespace http://www.robario.com/
// @version 0.1.1
// @author robario <webmaster@robario.com>
// @description Fix the IME problem of iCloud notes.
// @updateURL https://raw.githubusercontent.com/robario/icloud-notes-ime-fix/master/icloud-notes-ime-fix.user.js
// @match https://www.icloud.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==
jQuery(function($) {
    if (location.hash !== '#notes') {
        return;
    }

    setTimeout(function() {
        var context = $('iframe', $('iframe').get(0).contentDocument).get(0);
        if (!context) {
            setTimeout(arguments.callee, 1000);
            return;
        }

        var lastKeyDown = 0;
        $('#tinymce', context.contentDocument)
          .on('keydown', function(event) {
              lastKeyDown = event.which;
          })
          .on('keyup', function(event) {
              if (lastKeyDown == 229 && event.which == 32) {
                  event.stopPropagation();
              }
          });
    }, 1000);
});
