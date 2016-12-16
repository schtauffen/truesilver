module.exports = {
  selectState: selectState,
  bindActions: bindActions,
  component: Component()
}

function selectState (selector) {
  return function (context) {
    return selector(context.getState())
  }
}

function bindActions (actions) {
  return function (context) {
    var i
    var keys = Object.keys(actions)
    var il = keys.length
    var out = {}

    for (i = 0; i < il; ++i) {
      out[keys[i]] = function (val) {
        return function () {
          context.dispatch(actions[keys[i]](val))
        }
      }
    }

    return out
  }
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

    if (Array.isArray(selector) || arguments.length > 2) {
      var i
      var il = arguments.length
      var selectors = []

      for (i = 1; i < il; ++i) {
        selectors = selectors.concat(arguments[i])
      }

      selector = function (context) {
        var i
        var il = selectors.length
        var out = {}

        for (i = 0; i < il; ++i) {
          Object.assign(out, selectors[i](context))
        }

        return out
      }
    }

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
