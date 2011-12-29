init_postit = =>
    size = 50
    padding = 0
    @postitbk = ->
        $('form[method=post]').each ->
            that = $(this)
            $('body').append(
                postit = $('<div>')
                    .hide()
                    .addClass('_postit_box')
                    .append(
                        $('<div>')
                            .text("Post-it")
                            .css(
                                fontSize: 12
                                fontWeight: 'bold'
                                marginTop: 18
                                '-webkit-transform': 'rotate(45deg)'
                                )
                    )
                    .css(
                        position: 'absolute'
                        top: that.offset().top + padding
                        left: that.offset().left + that.width() - padding - size
                        height: size
                        width: size
                        textAlign: 'center'
                        backgroundColor: 'yellow'
                        boxShadow: '0 4px 6px #000'
                        opacity: 0.7
                        zIndex: 1337
                    )
                    .click ->
                        action = that.attr('action')
                        if action.indexOf('/') == 0
                            action = "#{location.origin}#{action}"
                        url = "http://paradoxxxzero.github.com/post-it/#__postit_url=#{action}"
                        that.find('input,select,textarea').each ->
                            name = encodeURIComponent($(this).attr 'name')
                            val = encodeURIComponent $(this).val()
                            if name
                                url += "&#{name}=#{val}"
                        window.open url
                    )
            that.mouseenter(->
                postit.fadeIn()
            )
            that.mouseleave((e)->
                if not (e.pageX > that.offset().left and e.pageX < that.offset().left + that.width() and e.pageY > that.offset().top and e.pageY < that.offset().top + that.height())
                    postit.fadeOut()
            )

v = "1.7"
if window.jQuery is `undefined` or window.jQuery.fn.jquery < v
    done = false
    script = document.createElement("script")
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js"
    script.onload = script.onreadystatechange = ->
        if not done and (not @readyState or @readyState is "loaded" or @readyState is "complete")
            done = true
            init_postit()()
    document.getElementsByTagName("head")[0].appendChild script
else
    init_postit()()
