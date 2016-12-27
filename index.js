(function () {
  var truesilver = {
    component: component,
    connect: Connector(),
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = truesilver
  } else {
    window.truesilver = truesilver
  }

  function Connector (context ) {
    context = typeof contextr === 'undefined' ? {} : context

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
        addConnectedProps = function (props) {
          return Object.assign(props, context)
        }
        return connectedComponent(mapStateToProps)
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

      // TODO - optimize this (only do typechecking once, etc)
      function addConnectedProps (props) {
        // should context, mergProps, etc clobber props? seems backwards
        return Object.assign(props, context,  updateStateProps(), updateDispatchProps(), mergeProps || {})
      }

      function updateStateProps () {
        /* jshint eqnull: true */
        if (mapStateToProps == null) return {}

        if (typeof mapStateToProps !== 'function')
          throw new TypeError('connect param1 (mapStateToProps) expects a Function')

        return mapStateToProps(context.getState())
      }

      function updateDispatchProps () {
        /* jshint eqnull: true */
        if (mapDispatchToProps == null) return {}

        if (typeof mapDispatchToProps === 'object')
          return Object.keys(mapDispatchToProps).reduce(function (out, key) {
            out[key] = val => () => context.dispatch(mapDispatchToProps[key](val))
            return out
          }, {})

        if (typeof mapDispatchToProps !== 'function')
          throw new TypeError('connect param2 (mapDispatchToProps) expects an Object or a Function')

        return mapDispatchToProps(context.dispatch)
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
})();
