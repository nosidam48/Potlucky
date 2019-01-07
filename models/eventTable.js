//Create the sequelize object for our Event table
module.exports = function(sequelize, DataTypes) {
    var events = sequelize.define("eventTable", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        host_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        event_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return events;
  };