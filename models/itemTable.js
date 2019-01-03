module.exports = function (sequelize, DataTypes) {
    var items = sequelize.define("itemTable", {

        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        item: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        item_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.DECIMAL,
        },
        bringer_id: {
            type: DataTypes.INTEGER,
        },
        bringer_name: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return items;
};