(function () {
  var truesilver = {
    component: component,
    connect: Connector(),
    pure: pure
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = truesilver
  } else {
    window.truesilver = truesilver
  }

  function Connector (context ) {
    var refs = []
    context = typeof context === 'undefined' ? {} : context

    connect.replaceContext = function (pContext) {
      context = pContext
    }

    Object.defineProperty(connect, 'context', {
      get: function () {
        return context
      },
      set: function (props) {
        return Object.assign(context, props)
      }
    })

    connect.withContext = Connector

    return connect

    function connect (mapStateToProps, mapDispatchToProps, mergeProps) {
      if (typeof mapStateToProps === 'object' && mapStateToProps.hasOwnProperty('view')) {
        refs = [context]
        return connectedComponent(mapStateToProps)
      }

      if (typeof mapStateToProps === 'function') {
        refs.push(function () {
          return mapStateToProps(context.getState())
        })
      } else if (typeof mapStateToProps != null) {
        refs.push(function () {
          return context.getState()
        })
      }

      if (typeof mapDispatchToProps === 'object') {
        refs.push(Object.keys(mapDispatchToProps).reduce(function (out, key) {
          out[key] = function (val) {
            return function () {
              return context.dispatch(mapDispatchToProps[key](val))
            }
          }
          return out
        }, {}))
      } else if (typeof mapDispatchToProps === 'function') {
        refs.push(mapDispatchToProps(context.dispatch))
      }

      return connectedComponent

      function connectedComponent (component) {
        return Object.assign({}, component, {
          oninit (vnode) {
            this.streams = []
            addConnectedProps(vnode.state)

            if (component.oninit) {
              component.oninit.call(vnode.state, vnode)
            }
          },
          onbeforeupdate (vnode, old) {
            addConnectedProps(vnode.state)

            if (component.onbeforeupdate)
              return component.onbeforeupdate.call(vnode.state, vnode, old)

            return true
          },
          onbeforeremove (vnode) {
            addConnectedProps(vnode.state)

            if (component.onbeforeremove)
              return component.onbeforeremove.call(vnode.state, vnode)

            return null
          },
          onremove (vnode) {
            if (Array.isArray(this.streams))
              this.streams.forEach(s => s.end(true))

            if (component.onremove)
              component.onremove.call(vnode.state, vnode)
          },
        })
      }

      function addConnectedProps (props) {
        var toAdd = refs.map(function (f) {
          if (typeof f === 'function') return f()
          return f
        })

        return Object.assign.apply(null, [props].concat(toAdd))
      }
    }
  }

  function component (initializor) {
    return {
      oninit: function (vnode) {
        this.view = initializor(vnode)
      },
      view: function (vnode) {
        return this.view(vnode)
      }
    }
  }

  function pure (view) {
    return {
      view: function (vnode) {
        return view(Object.assign({}, vnode.attrs, { children: vnode.children }))
      }
    }
  }
})();
