import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelizeConnection } from "../config/database";
import { Book } from "./book";
import { User } from "./user";

const sequelize = sequelizeConnection;

export const ReservationStatus = {
  Active: 1,
  Fulfilled: 2,
  Cancelled: 3,
  Expired: 4,
} as const;

export type ReservationStatusType =
  (typeof ReservationStatus)[keyof typeof ReservationStatus];

class Reservation extends Model {
  declare id: number;
  declare bookId: number;
  declare userId: number;
  declare status: ReservationStatusType;
  declare reservedDate: Date;
  declare expireDate: Date;
  declare createdAt: Date;
  declare updatedAt: Date;

  declare book?: Book;
  declare user?: User;

  static readonly Status = ReservationStatus;

  generateReservationNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const idPart = this.id.toString().padStart(4, "0");
    return `R${year}${month}${day}-${idPart}`;
  }

  getStatusName(): string {
    switch (this.status) {
      case ReservationStatus.Active:
        return "予約中";
      case ReservationStatus.Fulfilled:
        return "貸出済み";
      case ReservationStatus.Cancelled:
        return "キャンセル";
      case ReservationStatus.Expired:
        return "期限切れ";
      default:
        return "不明";
    }
  }

  isActive(): boolean {
    return (
      this.status === ReservationStatus.Active && this.expireDate > new Date()
    );
  }

  isExpired(): boolean {
    return this.expireDate < new Date();
  }
}

Reservation.init(
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
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: ReservationStatus.Active,
      comment: "1: 予約中, 2: 貸出済み, 3: キャンセル, 4: 期限切れ",
    },
    reserved_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    expire_date: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: "reservations",
    sequelize,
    underscored: true,
    timestamps: false,
  }
);

Reservation.belongsTo(Book, { foreignKey: "book_id", as: "book" });
Reservation.belongsTo(User, { foreignKey: "user_id", as: "user" });

Book.hasMany(Reservation, { foreignKey: "book_id", as: "reservations" });
User.hasMany(Reservation, { foreignKey: "user_id", as: "reservations" });

export { Reservation };
