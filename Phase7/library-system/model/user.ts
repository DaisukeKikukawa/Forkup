import { Sequelize, Model, DataTypes } from 'sequelize';

import { sequelizeConnection } from '../config/database';

const sequelize = sequelizeConnection;
class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare passwordHash: string;
  declare phone: string;
  declare address: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    phone: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    address: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    created_at: {
      type: new DataTypes.DATE(),
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: new DataTypes.DATE(),
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
    underscored: true,
    timestamps: false,
  }
);

export {
  User,
}
