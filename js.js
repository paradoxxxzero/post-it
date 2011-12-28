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
    var data, k, v, _results;
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
    add_row();
    if ($.param.fragment()) {
      data = $.deparam($.param.fragment());
      if (data['__postit_url']) {
        $("#url").val(data['__postit_url']);
        $('#url').trigger('input');
      }
      _results = [];
      for (k in data) {
        v = data[k];
        if (k === '__postit_url') continue;
        $('table tr td:first-child input:last').val(k).trigger('input');
        $('table tr td:nth-child(2) input:last').val(v);
        _results.push(add_row());
      }
      return _results;
    }
  });

}).call(this);
