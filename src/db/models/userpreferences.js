module.exports = (sequelize, DataTypes) => {
  const UserPreferences = sequelize.define('UserPreferences', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    preferences: {
      allowNull: false,
      type: DataTypes.JSONB
    },
  }, {});

  return UserPreferences;
};