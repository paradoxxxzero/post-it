(function() {
  var add_row, new_row, rem_row;

  new_row = function() {
    return $('<tr>').hide().append($('<td>').append($('<input>')), $('<td>').append($('<input>')), $('<th>').append($('<a>').addClass('less')));
  };

  add_row = function() {
    $('tbody tr').last().find('a');
    return new_row().insertBefore($('tbody tr:last')).fadeIn().find('td input').first().focus();
  };

  rem_row = function(elt) {
    return $(elt).closest('tr').fadeOut(function() {
      return $(this).remove();
    }).prev().find('input').first().focus();
  };

  $(function() {
    $('table').on('keydown', 'tr', function(e) {
      if (e.keyCode === 38) $(this).find('a.less').click();
      if (e.keyCode === 40 || (!e.shiftKey && e.keyCode === 9 && $(e.target).is($(this).find('input:last')) && $(e.target).closest('tr').is($('table tr').eq(-2)))) {
        add_row();
        return e.preventDefault();
      }
    });
    $('#url').on('input', function() {
      return $('form').attr('action', $(this).val());
    });
    $('#url').trigger('input');
    $('table').on('input', 'tr td:first-child input', function() {
      return $(this).closest('tr').find('td:nth-child(2) input').attr('name', $(this).val());
    });
    $('table').on('click', 'a.more', add_row);
    $('table').on('click', 'a.less', function() {
      return rem_row(this);
    });
    return add_row();
  });

}).call(this);
