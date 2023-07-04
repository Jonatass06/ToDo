const { DataTypes, Model } = require('sequelize');
const connection = require("../../database/connection");

class CardPermissions extends Model { }

CardPermissions.init(
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
        modelName: "_cardPermissions"
    }
);

CardPermissions.sync()
    .then(() => {
        console.log("CardPermissions Sincronizado");
    })
    .catch((e) => {
        console.log("CardPermissions nao Sincronizado: ", e);
    });

module.exports = CardPermissions;