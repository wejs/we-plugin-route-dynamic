/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/extend.plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);
  // set plugin configs
  plugin.setConfigs({
    permissions: {
      'find_route': {
        'title': 'Find one or find all routes',
        'description': ''
      },
      'create_route': {
        'title': 'Create one route',
        'description': ''
      },
      'update_route': {
        'title': 'Update one route',
        'description': ''
      },
      'delete_route': {
        'title': 'Delete one route',
        'description': ''
      }
    }
  });
  // ser plugin routes
  plugin.setRoutes({
    'get /api/v1/route/:id([0-9]+)': {
      controller    : 'route',
      action        : 'findOne',
      model         : 'route',
      permission    : 'find_route'
    },
    'get /api/v1/route/': {
      controller    : 'route',
      action        : 'find',
      model         : 'route',
      permission    : 'find_route'
    },
    'post /api/v1/route/': {
      controller    : 'route',
      action        : 'create',
      model         : 'route',
      permission    : 'create_route'
    },
    'put /api/v1/route/:id([0-9]+)': {
      controller    : 'route',
      action        : 'update',
      model         : 'route',
      permission    : 'update_route'
    },
    'delete /api/v1/route/:id([0-9]+)': {
      controller    : 'route',
      action        : 'destroy',
      model         : 'route',
      permission    : 'delete_route'
    }
  });

  // bind dynamic routes after static routes
  plugin.hooks.on('we:after:routes:bind', function(we, done) {
    we.db.models.route.findAll().then(function (droutes) {
      if (!droutes) return done();

      we.dynamicRoutes = droutes;

      for (var route in we.dynamicRoutes) {
        we.router.bindRoute(we, route, we.dynamicRoutes[route] );
      }

      done();
    }).catch(done);
  });

  return plugin;
};