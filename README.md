# truesilver
*truesilver* is a utility library for [mithril#rewrite](https://github.com/lhorie/mithril.js/tree/rewrite).  
It currently consists of the following utilities:  
* [component](#component)  
* [connect](#connect)  
  
To Install:
```bash
npm install truesilver
```
  
**Note that truesilver is far from stable and should not be used in production.**
  
  
## component
`component` is a utility which converts functional-components to valid mithril-components. Functional-components have form:  

```js
const Example = (vnode) => {
  // oninit things

  return () => m('div', ... ) // render function
}
```
See [How I use Mithril](https://james-forbes.com/?/posts/how-i-use-mithril) for reference on this pattern. (note mithril#rewrite includes its own implementation of streams).  


## connect
Injects a context object into created mithril components. This can be used to share information throughout your app.  
It optionally allows you to work with [Redux](https://github.com/reactjs/redux).  

### connect API
`connect` can be used two ways:  
  
1) To add global state or references to your components:
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

connect.context = { DOM }
m.mount(document.getElementById('app'), Root)
```
```js
// some-component.js
import m from 'mithril'
import stream from 'mithril/stream'
import { connect } from 'truesilver'

export default connect({
  oninit () {
    this.open = true
    this.close = () => (this.open = false)

    // since this is a descendant of a stream outside of this component's context it needs
    // to be cleaned up. 'connect' automatically will clean up streams added to
    // 'vnode.state.streams' (which mithril binds to 'this' by default)
    this.streams = [
      this.DOM.clicks.map(close)
    ]

    // doesn't need to be in .streams since it will already
    // be garbage collected when instance is removed
    this.click = stream()
    this.click.map(e => e.stopPropagation())
  },

  view () {
    return m('div', { onclick: this.click }, [
      // modal-ly stuff here
    ])
  }
})
```
  
2) With Redux:  
```js
// configure-store.js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connect } from 'truesilver'

import * as reducers from './reducers'
improt middleware from './middleware'

connect.context = createStore(combineReducers(reducers), applyMiddleware(middleware))
```
```js
// counter-component
import m from 'mithril'
import { connect } from 'truesilver'
import { increment, decrement } from 'actions'

const mapStateToProps = ({ count }) => ({ count })
const mapDispatchToProps = { increment, decrement }

const Counter = connect(
  mapStateToProps,
  mapDispatchToProps
)({
  view () {
    return [
      m('button', { onclick: this.decrement() }, '-'),
      this.count,
      m('button', { onclick: this.increment() }, '+'),
    ]
  }
})

export default Counter
```
  
  
connect and component can, of course, be composed:  
```js
export default connect(component( ... ))
```
  
  
---
#### #context
Has a custom setter which `Object.assign`'s anything you assign to it:
```js
connect.context = { DOM }
connect.context = { LOG }
connect.context = { ETC }

connect.context.hasOwnProperty('DOM') //=>true
connect.context.hasOwnProperty('LOG') //=>true
connect.context.hasOwnProperty('ETC') //=>true
```
---
#### #replaceContext
If you ever need to replace the existing context, `replaceContext` will do so:  
*Note: you should not use this after components have mounted*
```js
connect.context = { DOM, LOG, ETC }
connect.replaceContext({ FOO, BAR })

connect.context.hasOwnProperty('DOM') //=>false
connect.context.hasOwnProperty('LOG') //=>false
connect.context.hasOwnProperty('ETC') //=>false
connect.context.hasOwnProperty('FOO') //=>true
connect.context.hasOwnProperty('BAR') //=>true
```
---
#### #withContext
This creates a clone of `connect` with its own context.  
This allows different parts of your apps to have different shared state.
```js
connect.context = { FOO }
connect2 = connect.withContext({ BAR })

connect.context.hasOwnProperty('FOO') //=>true
connect.context.hasOwnProperty('BAR') //=>false

connect2.context.hasOwnProperty('FOO') //=>false
connect2.context.hasOwnProperty('BAR') //=>true
```
---
### instance methods
`connect` adds the following methods to your component: `oninit`, `onbeforeupdate`, `onbeforeremove`, and `onremove` (wrapping existing ones if necessary)  
These ensure that their `vnode.state` is updated with context when appropriate.  
  
  
## examples
* TODO - simple light box  
* TODO - hooking up to redux  
* TODO - random gif  
