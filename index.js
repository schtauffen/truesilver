module.exports = {
    component: Component()
}

function Component (context) {
  context = typeof context === 'undefined' ? {} : context

  component.replaceContext = function (pContext) {
    context = pContext
  }

  Object.defineProperty(component, 'context', {
    get: function () {
      return context
    },
    set: function (props) {
      return Object.assign(context, props)
    }
  })

  component.withContext = Component

  return component

  function component (initializor, selector) {
    return {
      oninit: function (vnode) {
        this.view = initializor(this.getContext(vnode))
      },
      getContext: function (vnode) {
          var ctx = selector ? selector(context) : context
          vnode = vnode ? { vnode: vnode } : {}
          return Object.assign({}, ctx, vnode)
      },
      view: function (vnode) {
        return this.view(this.getContext(vnode))
      }
    }
  }
}
