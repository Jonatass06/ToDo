const { DataTypes, Model } = require('sequelize');
const connection = require("../../database/connection");

class propertyPermissions extends Model { }

propertyPermissions.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //fazer isso
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
              model: '_users',
              key: 'id'
            }
          }
    },
    {
        sequelize: connection,
        modelName: "_propertyPermissions"
    }
);

propertyPermissions.sync()
    .then(() => {
        console.log("propertyPermissions Sincronizado");
    })
    .catch((e) => {
        console.log("propertyPermissions nao Sincronizado: ", e);
    });

module.exports = propertyPermissions;