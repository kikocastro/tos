App.Tecnico.Agenda.index = function(ordensDeServico) {
  console.log(ordensDeServico);
  ordensDeServico = ordensDeServico.map(function(ordemDeServico) {
    return {
      start: moment(ordemDeServico.inicio_da_execucao),
      end: moment(ordemDeServico.fim_da_execucao),
      color: '#ccc',
      ordemDeServico_id: ordemDeServico.id
    };
  });

  $(function() {
    var calendar = $("#calendar").fullCalendar({
      lang: "pt-br",
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek'
      },
      events: ordensDeServico,
      timezone: 'local',
      allDaySlot: false,
      slotDuration: '00:30:00',
      snapDuration: '01:00:00',
      minTime: "08:00:00",
      maxTime: "16:00:00",
      select: function( start, end, jsEvent, view ) {
        var duration = end.diff(start);
        if(view.name == 'agendaWeek') {
          if(duration != 3600000) {
            calendar.fullCalendar('unselect');
            return;
          }
          $('#myModal input.js-agendamento-dia').val(start.format("DD/MM/YYYY"));
          $('#myModal input.js-agendamento-horario').val(start.format("HH:mm"));
          $('#myModal input.js-agendamento-datetime').val(start.toJSON());
          $('#myModal').modal({});
        }
      },
      dayClick: function(date, jsEvent, view) {
        calendar.fullCalendar( 'gotoDate', date );
        calendar.fullCalendar( 'changeView', 'agendaWeek' );
        //- console.log(date);
        //- console.log(jsEvent);
        //- console.log(view);
        //- $(this).css('background-color', 'red');
        //- $('#myModal').modal({});
      },
       eventClick: function(event) {
        console.log("Event clicked");
        console.log(event.ordemDeServico_id);
        if (event.ordemDeServico_id) {
            window.location.href = "/tecnico/ordens-de-servico/" + event.ordemDeServico_id;
        }
      }

    });
  });
};
