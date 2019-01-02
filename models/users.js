module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return users;
  };