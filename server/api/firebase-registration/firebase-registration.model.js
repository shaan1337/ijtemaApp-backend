'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('FirebaseRegistration', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    token: DataTypes.STRING,
    date: DataTypes.DATE
  });
}
