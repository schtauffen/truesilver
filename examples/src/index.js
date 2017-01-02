import m from 'mithril'
import { component } from 'truesilver'
import styles from 'main.styl'

import LightboxExample from 'lightbox'

m.route.prefix('')

const Link = component(() => ({ attrs, children }) => {
  const classname = m.route.get() === attrs.href ?
    styles.navlink_active : styles.navlink
  return m(`a.${classname}`, { oncreate: m.route.link, ...attrs }, children)
})

// layout helper
const L = Cmp => component(() => () => [
  m('nav',
    m(`ul.${styles.navlist}`, ['lightbox', 'redux', 'random-gif'].map(path =>
      m(`li.${styles.navitem}`, m(Link, { href: '/' + path }, path))
    ))
  ),
  m('main', m(Cmp))
])

const Home = component(() => () => 'Choose an example')

const routes = {
  '/': L(Home),
  '/lightbox': L(LightboxExample),
}

m.route(document.querySelector('#app'), '/', routes)
