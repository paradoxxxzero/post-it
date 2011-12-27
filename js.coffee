new_row = () ->
    $('<tr>')
        .hide()
        .append(
            $('<td>').append($('<input>'))
            $('<td>').append($('<input>'))
            $('<th>').append(
                $('<a>').addClass('less')))

add_row = () ->
    $('tbody tr')
        .last()
        .find('a')

    new_row()
        .insertBefore(
            $('tbody tr:last'))
        .fadeIn()
        .find('td input')
        .first()
        .focus()

rem_row = (elt) ->
    $(elt)
        .closest('tr')
        .fadeOut () ->
            $(this).remove()
        .prev()
        .find('input')
        .first()
        .focus()

$ () ->
    $('table').on('keydown', 'tr', (e) ->
        if e.keyCode == 38 # up
            $(this).find('a.less').click()
        if e.keyCode == 40 or ( # down
            not e.shiftKey and
            e.keyCode == 9 and
            $(e.target).is($(this).find('input:last')) and
            $(e.target).closest('tr').is($('table tr').eq(-2))) # or tab
            add_row()
            e.preventDefault()
    )

    $('#url').on('input', () -> $('form').attr('action', $(this).val()))
    $('#url').trigger('input')

    $('table').on('input', 'tr td:first-child input', () ->
        $(this).closest('tr').find('td:nth-child(2) input').attr('name', $(this).val()))
    $('table').on('click', 'a.more', add_row)
    $('table').on('click', 'a.less', () -> rem_row(this))
    add_row()
