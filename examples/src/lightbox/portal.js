import m from 'mithril'

export default {
  oncreate ({ attrs }) {
    this.portal = document.createElement('div')
    document.body.appendChild(this.portal)
    m.mount(this.portal, {
      view () {
        return m(attrs.component, attrs.attrs || {})
      }
    })
  },
  onremove () {
    m.mount(this.portal, null)
    setTimeout(() => document.body.removeChild(this.portal), 0)
  },
  view () { return null },
}
