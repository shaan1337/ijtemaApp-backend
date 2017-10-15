'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Personaldetails', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    token: DataTypes.STRING,
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    majlis: DataTypes.STRING,
    halqa: DataTypes.STRING,    
    date: DataTypes.DATE
  });
}
