<template>
  <div class="calendar-page">
    <div class="calendar-top"></div>
    <div class="calendar-container">
      <FullCalendar
        ref="calendar"
        defaultView="dayGridMonth"
        :plugins="calendarPlugins"
        selectable="true"
        :header="calendarHeader"
        height="parent"
        @select="handleSelect"
        @eventClick="handleEventClick"
        :events="getEvents"
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

import { db, Timestamp } from '../database'
import * as firebase from 'firebase/app'
import 'firebase/auth'

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
    handleSelect: function (selectionInfo) {
      const startDate = Timestamp.fromDate(selectionInfo.start)
      const endDate = Timestamp.fromDate(selectionInfo.end)
      const noteTitle = prompt(`You're creating an event between ${selectionInfo.startStr} and ${selectionInfo.endStr}.\nWhat do you want to title it?`, '')
      if (noteTitle) {
        this.addEvent(startDate, endDate, selectionInfo.allDay, noteTitle)
      }
    },
    addEvent: function (startDate, endDate, allDay, noteTitle) {
      const currUser = firebase.auth().currentUser
      if (currUser) {
        db.collection('notes').add({
          title: noteTitle,
          text: '',
          author: [db.doc(`users/${currUser.uid}`)],
          created: Timestamp.now(),
          isEvent: true,
          allDay: allDay,
          start: startDate,
          end: endDate
        }).then(success => {
          console.log('Event added') // TODO: Remove before prod
          this.$refs.calendar.getApi().refetchEvents()
        })
      }
    },
    inRange: function (start, end, note) {
      start = Timestamp.fromDate(start)
      end = Timestamp.fromDate(end)
      return start < note.start < end
    },
    getEvents: function (info, successCallback, failureCallback) {
      try {
        const notes = this.$store.state.notes
        const events = []
        notes.forEach((note) => {
          if (note.isEvent && this.inRange(info.start, info.end, note)) {
            events.push({
              title: note.title,
              text: note.text,
              start: note.start.toDate(),
              end: note.end.toDate(),
              allDay: note.allDay
            })
          }
        })
        successCallback(events)
      } catch (err) {
        failureCallback(err)
      }
    },
    handleEventClick: function (info) {
      info.jsEvent.preventDefault()
      // TODO: Docelowo tutaj przekierowujemy do editora, ale go nie ma xD
      alert(info.event.extendedProps.text)
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
