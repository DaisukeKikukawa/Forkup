document.addEventListener("DOMContentLoaded", function() {
  // 入力フィールドの要素の取得
  const form = document.querySelector("form");
  const resetButton = document.getElementById("reset-button");
  const nameInput = document.getElementById("name");
  const nameErrorMessage = document.getElementById("name-error-message");
  const emailInput = document.getElementById("email");
  const emailErrorMessage = document.getElementById("email-error-message");
  const passwordInput = document.getElementById("password");
  const passwordErrorMessage = document.getElementById("password-error-message");
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
      // emailErrorMessage.classList.add("validate-error-color");
      emailErrorMessage.style.color = "red";
      emailErrorMessage.textContent = "メールアドレスを入力してください";
    } else if (!emailRegex.test(email)) {
      // emailErrorMessage.classList.add("validate-error-color");
      emailErrorMessage.style.color = "red";
      emailErrorMessage.textContent = "有効なメールアドレスを入力してください";
    } else {
      emailErrorMessage.style.color = "green";
      emailErrorMessage.textContent = "OK";
    }
  }
})
