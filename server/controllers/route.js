module.exports = {
  create: function(req, res) {
    var we = req.getWe();

    req.body.creatorId = req.user.id;

    return res.locals.Model.create(req.body)
    .then(function (record) {

      var route = record.method + ' ' + record.path;

      we.routes[route] = record.get();
      we.routes[route].isDynamicRoute = true;

      we.router.liveBindRoute(we, route, we.routes[route] );

      return res.created(record);
    });
  }
};