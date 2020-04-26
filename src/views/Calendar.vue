<template>
  <div class="calendar-page">
    <div class="calendar-top"></div>
    <div class="calendar-container">
      <FullCalendar
        defaultView="dayGridMonth"
        :plugins="calendarPlugins"
        selectable="true"
        :header="calendarHeader"
        height="parent"
        :dateClick="handleDateClick"
        class="calendar-view"
      />
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import '../fullcalendarOverrides.css'

export default {
  name: 'Calendar.vue',
  components: {
    FullCalendar
  },
  data () {
    return {
      calendarPlugins: [
        dayGridPlugin,
        interactionPlugin,
        timeGridPlugin,
        listPlugin
      ],
      calendarHeader: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth,listWeek'
      }
    }
  },
  methods: {
    setViewMonth: function () {

    },
    handleDateClick: function () {
      // handle date click
    }
  }
}
</script>

<style scoped>
.calendar-page {
  /*float: right;*/
}

.calendar-container {
  height: 100%;
}

.calendar-view {
  float: right;
  margin-left: 7rem;
  margin-top: 3rem;
  margin-right: 2rem;
}
</style>
