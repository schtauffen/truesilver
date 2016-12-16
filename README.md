# truesilver
*truesilver* is a utility library for [mithril#rewrite](https://github.com/lhorie/mithril.js/tree/rewrite).  
It currently consists of the following utilities:  
* [component](#comonent)  
* [selectState](#selectState)  
* [bindActions](#bindActions)  
  
To Install:
```bash
npm install truesilver
```
  
  
## component
`component` is a utility which does two things:  
  
 1) Converts functional-components to valid mithril-components. Functional-components have form:  
```js
const Example = ({ vnode }) => {
  // oninit things

  return () => m('div', ... ) // render function
}
```
See [How I use Mithril](https://james-forbes.com/?/posts/how-i-use-mithril) for reference on this pattern. (note mithril#rewrite includes its own implementation of streams).  

 2) Injects a context object into created mithril components. This can be used to share information throughout your app.  
```js
// index.js
import m from 'mithril'
import stream from 'mithril/stream'
import { component } from 'truesilver'

import Root from './components/root'

const DOM = {
  clicks: stream(),
  blurs: stream(),
}

document.addEventListener('click', DOM.clicks)
document.addEventListener('blur', DOM.blurs, true)

component.context = { DOM }
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
```

### component API
#### context
Has a custom setter which `Object.assign`'s anything you assign to it:
```js
component.context = { DOM }
component.context = { LOG }
component.context = { ETC }

component.context.hasOwnProperty('DOM') //=>true
component.context.hasOwnProperty('LOG') //=>true
component.context.hasOwnProperty('ETC') //=>true
```
---
#### replaceContext
If you ever need to replace the existing context, `replaceContext` will do so:  
*Note: you should not use this after components have mounted*
```js
component.context = { DOM, LOG, ETC }
component.replaceContext({ FOO, BAR })

component.context.hasOwnProperty('DOM') //=>false
component.context.hasOwnProperty('LOG') //=>false
component.context.hasOwnProperty('ETC') //=>false
component.context.hasOwnProperty('FOO') //=>true
component.context.hasOwnProperty('BAR') //=>true
```
---
#### withContext
This creates a clone of `component` with its own context.  
This allows different parts of your apps to have different shared state.
```js
component.context = { FOO }
component2 = component.withContext({ BAR })

component.context.hasOwnProperty('FOO') //=>true
component.context.hasOwnProperty('BAR') //=>false

component2.context.hasOwnProperty('FOO') //=>false
component2.context.hasOwnProperty('BAR') //=>true
```
  
### instance methods
Mithril components created with the `component` function consist of the two mithril utilized functions, `oninit` and `view`.  
In addition, they have `getContext` which returns a shallow clone of the shared `context` and optionally accepts `vnode`-- when present, a reference to vnode will be added to the `context` clone.  
  
You can add lifecycle hooks to the resulting components, and use `getContext` to get the same object which is fed by default to function-components:  
*Note: in general, `this` usage should be frowned upon.*
```js
const Example = component( ... )
Example.onupdate = function (vnode) {
  const { DOM } = this.getContext() // optionally pass in vnode to get { ...context, vnode }
  ...
}
```
  
  
## selectState
`selectState` is a function which returns a selector for your component which selects from a redux store.  
See the Redux example  
  
## bindActions
`bindActions` is a function which returns a selector function which binds `actionCreators` to your components.  
Resulting `actions` are thunks, so they could be considered `actionCreatorCreators`  
See the Redux example  
  
  
## examples
* TODO - simple light box  
* TODO - hooking up to redux  
* TODO - random gif  
