// 名前のリアルタイムバリデーション
function validateName(nameInput, nameErrorMessage) {
  const name = nameInput.value.trim();
  nameErrorMessage.classList.remove("message-valid", "message-invalid");
  if (name === "") {
    nameErrorMessage.classList.add("message-invalid");
    nameErrorMessage.textContent = "お名前を入力してください";
  } else {
    nameErrorMessage.classList.add("message-valid");
    nameErrorMessage.textContent = "OK";
  }
}

// メールアドレスのリアルタイムバリデーション
function validateEmail(emailInput, emailErrorMessage) {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailErrorMessage.classList.remove("message-valid", "message-invalid");
  if (email === "") {
    emailErrorMessage.classList.add("message-invalid");
    emailErrorMessage.textContent = "メールアドレスを入力してください";
  } else if (!emailRegex.test(email)) {
    emailErrorMessage.classList.add("message-invalid");
    emailErrorMessage.textContent = "有効なメールアドレスを入力してください";
  } else {
    emailErrorMessage.classList.add("message-valid");
    emailErrorMessage.textContent = "OK";
  }
}

// パースワードのリアルタイムバリデーション
function validatePassword(passwordInput, passwordErrorMessage) {
  const password = passwordInput.value.trim();
  passwordErrorMessage.classList.remove("message-valid", "message-invalid");
  if (password.length < 8) {
    passwordErrorMessage.classList.add("message-invalid");
    passwordErrorMessage.textContent =
      "パスワードは8文字以上で入力してください";
  } else {
    passwordErrorMessage.classList.add("message-valid");
    passwordErrorMessage.textContent = "OK";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // 入力フィールドの要素の取得
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // 各エラーメッセージ要素を取得
  const validationMessages = document.querySelectorAll(".validation-message");
  const nameErrorMessage = Array.from(validationMessages).find((message) =>
    message.classList.contains("name")
  );
  const emailErrorMessage = Array.from(validationMessages).find((message) =>
    message.classList.contains("email")
  );
  const passwordErrorMessage = Array.from(validationMessages).find((message) =>
    message.classList.contains("password")
  );

  // ページロード時にリアルタイムでバリデーションを実行
  validateName(nameInput, nameErrorMessage);
  validateEmail(emailInput, emailErrorMessage);
  validatePassword(passwordInput, passwordErrorMessage);

  // フォーム入力時にリアルタイムでバリデーションを実行
  nameInput.addEventListener("input", () => validateName(nameInput, nameErrorMessage));
  emailInput.addEventListener("input", () => validateEmail(emailInput, emailErrorMessage));
  passwordInput.addEventListener("input", () => validatePassword(passwordInput, passwordErrorMessage));
  });
