document.addEventListener("DOMContentLoaded", function() {
  // form要素の取得
  const form = document.querySelector("form");
  const resetButton = document.querySelector('button[type="reset"]');

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
  // リセットボタン
  resetButton.addEventListener("click", function (event) {
    if (confirm("入力内容をリセットしてよろしいですか？")) {
      form.reset();

      // バリデーションメッセージをクリア
      nameErrorMessage.style.color = "red";
      nameErrorMessage.textContent = "お名前を入力してください";
      emailErrorMessage.style.color = "red";
      emailErrorMessage.textContent = "メールアドレスを入力してください";
      passwordErrorMessage.style.color = "red";
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
      nameErrorMessage.style.color = "red";
      nameErrorMessage.textContent = "お名前を入力してください";
      isValid = false;
    }

    // メールアドレスのバリデーション
    if (!emailRegex.test(email)) {
      emailErrorMessage.style.color = "red";
      emailErrorMessage.textContent = "有効なメールアドレスを入力してください";
      isValid = false;
    }

    // パスワードのバリデーション
    if (password.length < 8) {
      passwordErrorMessage.style.color = "red";
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
})
