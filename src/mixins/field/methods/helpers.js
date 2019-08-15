import { EVENT_UI_FIELDS_UPDATE } from '../../../constants'

const helpers = {
  vjsFieldHelperAddListener(el, event) {
    el.addEventListener(event, this.vjsFieldHelperStateEventHandler)
  },
  vjsFieldHelperRemoveListener(el, event) {
    el.removeEventListener(event, this.vjsFieldHelperStateEventHandler)
  },
  vjsFieldHelperStateEventHandler(event) {
    if (event && event.type === 'blur') {
      const initialBlur = this.vjsFieldState.vjsFieldBlur
      this.setVjsFieldState({
        ...this.vjsFieldState,
        vjsFieldBlur: true
      })

      if (!initialBlur) {
        this.vjsBus.emit(EVENT_UI_FIELDS_UPDATE)
      }
    }
  },
  vjsFieldHelperFormatEvents(events) {
    if (!events) {
      return {}
    }

    let eventsObj = events

    if (Array.isArray(events)) {
      eventsObj = events.reduce((obj, event) => ({ ...obj, [event]: true }), {})
    } else if (typeof events === 'string') {
      eventsObj = { [events]: true }
    }

    return this.vjsFieldHelperFormatEventsReducer(eventsObj)
  },
  vjsFieldHelperFormatClasses(classes) {
    if (!classes) {
      return {}
    }

    if (typeof classes === 'string') {
      return {
        [classes]: true
      }
    }

    if (Array.isArray(classes)) {
      return classes.reduce(
        (classesObj, key) => ({
          ...classesObj,
          [key]: true
        }),
        {}
      )
    }

    if (typeof classes === 'string') {
      if (classes.indexOf(',') !== -1) {
        return classes.split(',')
      }

      if (classes.indexOf(' ') !== -1) {
        return classes.split(' ')
      }
    }

    return classes
  },
  vjsFieldHelperEventHandler(key, cb) {
    return data => {
      if (typeof cb === 'function') {
        return this.setVjsFieldModel(cb(data))
      }

      if (data instanceof Event) {
        if (data.target && data.target.value) {
          return this.setVjsFieldModel(data.target.value)
        }

        return this.setVjsFieldModel(undefined)
      }

      return this.setVjsFieldModel(data)
    }
  },
  vjsFieldHelperFormatEventsReducer(events = {}) {
    return Object.keys(events).reduce(
      (formattedEvents, key) => ({
        ...formattedEvents,
        [key]: this.vjsFieldHelperEventHandler(key, events[key])
      }),
      {}
    )
  }
}

export default helpers
