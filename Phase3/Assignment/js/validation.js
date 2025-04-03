document.addEventListener("DOMContentLoaded", function() {
  // 入力フィールドの要素の取得
  const form = document.querySelector("form");
  // メールアドレスの正規表現
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    if (name === "") {
      nameErrorMessage.style.color = "red";
      nameErrorMessage.textContent = "お名前を入力してください";
    } else {
      nameErrorMessage.style.color = "green";
      nameErrorMessage.textContent = "OK";
    }
  }

  // メールアドレスのリアルタイムバリデーション
  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      emailErrorMessage.style.color = "red";
      emailErrorMessage.textContent = "メールアドレスを入力してください";
    } else if (!emailRegex.test(email)) {
      emailErrorMessage.style.color = "red";
      emailErrorMessage.textContent = "有効なメールアドレスを入力してください";
    } else {
      emailErrorMessage.style.color = "green";
      emailErrorMessage.textContent = "OK";
    }
  }

  // パースワードのリアルタイムバリデーション
  function validatePassword() {
    const password = passwordInput.value.trim();
    if (password.length < 8) {
      passwordErrorMessage.style.color = "red";
      passwordErrorMessage.textContent =
        "パスワードは8文字以上で入力してください";
    } else if (password.length >= 8) {
      passwordErrorMessage.style.color = "green";
      passwordErrorMessage.textContent = "OK";
    }
  }
})
