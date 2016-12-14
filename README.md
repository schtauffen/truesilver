# truesilver
*truesilver* is a utility library for [mithril#rewrite](https://github.com/lhorie/mithril.js/tree/rewrite).  
It currently consists of the following utilities:  
* component  
  
To Install:
```bash
npm install truesilver
```
  
  
## component
`component` is a utility which does two things:  
  
1. Converts functional-components to valid mithril-components. Functional-components have form:  
```js
const Example = ({ vnode }) => {
  // oninit things

  return () => m('div', ... ) // render function
}
```
See [How I use Mithril](https://james-forbes.com/?/posts/how-i-use-mithril) for reference on this pattern. (note mithril#rewrite includes its own implementation of streams).  
  
  
2. Injects a context object into created mithril components. This can be used to share information throughout your app.  
```js
// index.js
import m from 'mithril'
import stream from 'mithril/stream'
import { component } from 'truesilver'

import Root from './components/root'

component.context.DOM = {
  clicks: stream(),
  blurs: stream(),
}

document.addEventListener('click', DOM.clicks)
document.addEventListener('blur', DOM.blurs, true)

m.mount(document.getElementById('app'), Root)
```
```js
// some-component.js
import m from 'mithril'
import stream from 'mithril/stream'
import { component } from 'truesilver'

export default component(({ DOM, vnode }) => {
  const open = true
  const close = () => (open = false)

  DOM.clicks.map(close)
  DOM.blurs.map(e => !vnode.dom.contains(document.activeElement) && close())

  const onclick = stream()
  onclick.map(e => e.stopPropagation())

  return () => m('div', { onclick }, ... )
})
  
### component API
TODO  
  
  
```
  

### Examples
* TODO - simple light box  
* TODO - hooking up to redux  
* TODO - random gif  
