
define(['handlebarsLib'],
  function(Handlebars) {

    Handlebars.registerHelper('timeToDate',
      function(time) {
        var date = (time) ? new Date(time) : new Date(),
            month = ((date.getMonth() + 1 < 10) ? '0' : '') + (date.getMonth() + 1),
            day = ((date.getDate() < 10) ? '0' : '') + date.getDate();

        return date.getFullYear() + '-' + month + '-' + day;
      });

    return Handlebars;
  });