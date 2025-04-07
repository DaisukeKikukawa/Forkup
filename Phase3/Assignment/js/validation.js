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
  const form = document.querySelector("form");
  const resetButton = document.querySelector('button[type="reset"]');
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
  nameInput.addEventListener("input", () =>
    validateName(nameInput, nameErrorMessage)
  );
  emailInput.addEventListener("input", () =>
    validateEmail(emailInput, emailErrorMessage)
  );
  passwordInput.addEventListener("input", () =>
    validatePassword(passwordInput, passwordErrorMessage)
  );

  // リセットボタン
  resetButton.addEventListener("click", function () {
    if (confirm("入力内容をリセットしてよろしいですか？")) {
      form.reset();

      // バリデーションメッセージをクリア
      nameErrorMessage.classList.remove("message-valid", "message-invalid");
      nameErrorMessage.classList.add("message-invalid");
      nameErrorMessage.textContent = "お名前を入力してください";

      emailErrorMessage.classList.remove("message-valid", "message-invalid");
      emailErrorMessage.classList.add("message-invalid");
      emailErrorMessage.textContent = "メールアドレスを入力してください";

      passwordErrorMessage.classList.remove("message-valid", "message-invalid");
      passwordErrorMessage.classList.add("message-invalid");
      passwordErrorMessage.textContent =
        "パスワードは8文字以上で入力してください";

      // その他の国入力欄を非表示
      otherCountryInputArea.classList.add("hidden");
      console.log("フォームがリセットされました");
    }
  });

  // 登録ボタン
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;

    // ユーザー名のバリデーション
    if (name === "") {
      nameErrorMessage.classList.remove("message-valid", "message-invalid");
      nameErrorMessage.classList.add("message-invalid");
      nameErrorMessage.textContent = "お名前を入力してください";
      isValid = false;
    }

    // メールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailErrorMessage.classList.remove("message-valid", "message-invalid");
      emailErrorMessage.classList.add("message-invalid");
      emailErrorMessage.textContent = "有効なメールアドレスを入力してください";
      isValid = false;
    }

    // パスワードのバリデーション
    if (password.length < 8) {
      passwordErrorMessage.classList.remove("message-valid", "message-invalid");
      passwordErrorMessage.classList.add("message-invalid");
      passwordErrorMessage.textContent =
        "パスワードは8文字以上で入力してください";
      isValid = false;
    }

    // 全てのバリデーション通過時にデバッグ用コンソールログを出力
    if (isValid) {
      if (confirm(`名前：${name}\nメールアドレス：${email}`)) {
        form.submit();
        console.log("フォーム送信完了");
        alert("送信が完了しました");
        form.reset();
      }
      console.log(`名前：${name}`);
      console.log(`メールアドレス：${email}`);
      console.log(`パスワード：${password}`);
    }
  });
});
