document.addEventListener("DOMContentLoaded", function() {
  // 入力フィールドの要素の取得
  const nameInput = document.getElementById("name");
  const nameErrorMessage = document.getElementById("name-error-message");
  const emailInput = document.getElementById("email");
  const emailErrorMessage = document.getElementById("email-error-message");
  const passwordInput = document.getElementById("password");
  const passwordErrorMessage = document.getElementById("password-error-message");

  // ページロード時にリアルタイムでバリデーションを実行
  validateName();
  validateEmail();
  validatePassword();

  // フォーム入力時にリアルタイムでバリデーションを実行
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  passwordInput.addEventListener("input", validatePassword);

  // 名前のリアルタイムバリデーション
  function validateName() {
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
  function validateEmail() {
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
  function validatePassword() {
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
})
