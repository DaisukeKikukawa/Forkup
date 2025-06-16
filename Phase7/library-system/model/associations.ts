import { User } from "./user";
import { Book } from "./book";
import { LendingHistory } from "./lendingHistory";

User.hasMany(LendingHistory, { foreignKey: "user_id", as: "lendingHistories" });
LendingHistory.belongsTo(User, { foreignKey: "user_id", as: "user" });

Book.hasMany(LendingHistory, { foreignKey: "book_id", as: "lendingHistories" });
LendingHistory.belongsTo(Book, { foreignKey: "book_id", as: "book" });
