import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelizeConnection } from "../config/database";
import { Book } from "./book";
import { User } from "./user";

const sequelize = sequelizeConnection;

class LendingHistory extends Model {
  declare id: number;
  declare bookId: number;
  declare userId: number;
  declare borrowedDate: Date;
  declare dueDate: Date;
  declare returnedDate: Date | null;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare book?: Book;
  declare user?: User;
}

LendingHistory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    book_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "books",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    borrowed_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returned_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "lending_records",
    sequelize,
    underscored: true,
    timestamps: false,
  }
);

LendingHistory.belongsTo(Book, { foreignKey: "book_id", as: "book" });
LendingHistory.belongsTo(User, { foreignKey: "user_id", as: "user" });

Book.hasMany(LendingHistory, { foreignKey: "book_id", as: "lendingHistories" });
User.hasMany(LendingHistory, { foreignKey: "user_id", as: "lendingHistories" });

export { LendingHistory };
