import { Sequelize, Model, DataTypes } from "sequelize";

import { sequelizeConnection } from "../config/database";

const sequelize = sequelizeConnection;

class Book extends Model {
  declare id: number;
  declare title: string;
  declare author: string;
  declare isbn: string;
  declare publisher: string;
  declare publishedDate: Date;
  declare status: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  static Status: any;
}

export const Status = {
  Available: 1,
  Borrowed: 2,
  Reserved: 3,
  Unavailable: 4,
} as const;
Book.Status = Status;

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    author: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    isbn: {
      type: new DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    publisher: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    published_date: {
      type: new DataTypes.DATE(),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1: 利用可能, 2: 貸出中, 3: 予約済み, 4: 利用不可",
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
    tableName: "books",
    sequelize,
    underscored: true,
    timestamps: false,
  }
);

export { Book };
