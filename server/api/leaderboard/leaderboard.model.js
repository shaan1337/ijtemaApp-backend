'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Leaderboard', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    team: DataTypes.STRING,
    score: DataTypes.INTEGER
  });
}
