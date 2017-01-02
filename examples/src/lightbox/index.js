import m from 'mithril'
import stream from 'mithril/stream'
import { component, connect } from 'truesilver'

import Portal from 'lightbox/portal'

const DOM = {
  click: stream(),
  blur: stream(),
}
document.addEventListener('click', DOM.click)
document.addEventListener('blur', DOM.blur, true)
connect.context = { DOM }

let inner = component(({ attrs, state }) => {
  state.close = e => {
    console.log('close')
    attrs.active(false)
  }

  const onclick = () => {
    console.log('div click')
    state.close()
  }

  return () => m('div', { onclick }, 123)
})
inner.oncreate = ({ state }) => {
  state.streams = [
    state.DOM.click.map(e => {
      console.log('click')
      state.close()
      m.redraw()
    })
  ]
}
inner.onremove = () => console.log('removing')
inner = connect(inner)

export default component(() => {
  const active = stream(false)
  const onclick = e => {
    e.preventDefault()
    e.stopPropagation()
    console.log('open')
    active(true)
  }

  return () => [
    m('button', { onclick }, 'open lightbox'),
    active() ? m(Portal, {
      component: inner,
      attrs: { active }
    }) : null
  ]
})
