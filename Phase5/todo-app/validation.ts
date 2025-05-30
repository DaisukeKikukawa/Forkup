// validation.ts
export function validateTodoData(title: string, description: string): string[] {
  const errors: string[] = [];

  // 必須チェック
  if (!title || title.trim() === "") {
    errors.push("タイトルは必須です。");
  }

  // 文字数チェック
  if (title && title.length > 10) {
    errors.push("タイトルは10文字以内で入力してください。");
  }

  if (description && description.length > 50) {
    errors.push("詳細は50文字以内で入力してください。");
  }

  return errors;
}
