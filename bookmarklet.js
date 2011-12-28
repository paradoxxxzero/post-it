(function() {
  var done, init_postit, script, v;
  var _this = this;

  init_postit = function() {
    var padding, size;
    size = 50;
    padding = 0;
    return _this.postitbk = function() {
      return $('form[method=post]').each(function() {
        var postit, that;
        that = $(this);
        $('body').append(postit = $('<div>').hide().addClass('_postit_box').append($('<div>').text("Post-it").css({
          fontSize: 12,
          fontWeight: 'bold',
          marginTop: 18,
          '-webkit-transform': 'rotate(45deg)'
        })).css({
          position: 'absolute',
          top: that.offset().top + padding,
          left: that.offset().left + that.width() - padding - size,
          height: size,
          width: size,
          textAlign: 'center',
          backgroundColor: 'yellow',
          boxShadow: '0 4px 6px #000',
          opacity: 0.7,
          zIndex: 1337
        }).click(function() {
          var action, url;
          action = that.attr('action');
          if (action.indexOf('/') === 0) action = "" + location.origin + action;
          url = "http://paradoxxxzero.github.com/post-it/#__postit_url=" + action;
          that.find('input,select,textarea').each(function() {
            var name;
            name = $(this).attr('name');
            if (name) return url += "&" + name + "=" + ($(this).val());
          });
          return window.open(url);
        }));
        that.mouseenter(function() {
          return postit.fadeIn();
        });
        return that.mouseleave(function(e) {
          if (!(e.pageX > that.offset().left && e.pageX < that.offset().left + that.width() && e.pageY > that.offset().top && e.pageY < that.offset().top + that.height())) {
            return postit.fadeOut();
          }
        });
      });
    };
  };

  v = "1.7";

  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    done = false;
    script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
    script.onload = script.onreadystatechange = function() {
      if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
        done = true;
        return init_postit()();
      }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    init_postit()();
  }

}).call(this);
