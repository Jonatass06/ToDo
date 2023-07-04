const { DataTypes, Model } = require('sequelize');
const connection = require("../../database/connection");

class Groups extends Model { }

Groups.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: "_Groups"
    }
);

Groups.sync()
    .then(() => {
        console.log("Groups Sincronizado");
    })
    .catch((e) => {
        console.log("Groups nao Sincronizado: ", e);
    });

module.exports = Groups;