/**
 * Route Model
 *
 * @module      :: Model
 * @description :: Route model
 *
 */

module.exports = function Model(we) {
  // set sequelize model define and options
  var model = {
    definition: {
      creatorId: { type: we.db.Sequelize.BIGINT },
      method: {
        type: we.db.Sequelize.STRING(10),
        allowNull: false,
      },
      path: {
        type: we.db.Sequelize.STRING(1500),
        allowNull: false,
      },
      controller: {
        type: we.db.Sequelize.STRING,
        allowNull: false,
      },
      action: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      model: {
        type: we.db.Sequelize.STRING
      },
      // json, datatable, html ...
      responseType: {
        type: we.db.Sequelize.STRING(30)
      },
      permission: {
        type: we.db.Sequelize.STRING,
        defaultValue: 'public'
      },

      // express template and layout
      template: {
        type: we.db.Sequelize.STRING(1500)
      },
      layout: {
        type: we.db.Sequelize.STRING(1500)
      }

      // - upload routes
      // dest
      // upload: {
      //   type: we.db.Sequelize.STRING,
      //   defaultValue: false
      // }
    },

    associations: {},

    options: {
      classMethods: {},
      instanceMethods: {},
      hooks: {}
    }
  }

  return model;
}