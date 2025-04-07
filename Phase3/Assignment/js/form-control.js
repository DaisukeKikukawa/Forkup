document.addEventListener("DOMContentLoaded", function () {
  // 興味のある分野（チェックボックス）関連の要素の取得
  const interestCheckboxes = document.querySelectorAll('[name="interest"]');

  // 居住国選択（ドロップダウンリスト）関連の要素の取得
  const countrySelect = document.getElementById("country");
  const otherCountryInputArea = document.getElementById(
    "otherCountryInputArea"
  );

  // 興味のある分野（チェックボックス）の選択時にリアルタイムバリーでションを実行
  interestCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("input", validateInterest);
  });

  // 居住国選択（ドロップダウンリスト）の選択時にリアルタイムバリデーションを実行
  countrySelect.addEventListener("change", function (event) {
    validateCountry(event);
    console.log(event.target.value);
  });

  // 興味のある分野（チェックボックス）のリアルタイムバリデーション
  function validateInterest(event) {
    let checkboxCheckedCount = 0;
    interestCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkboxCheckedCount += 1;
      }
      if (checkboxCheckedCount >= 4) {
        alert("興味のある分野は最大3つまで選択できます");
        event.target.checked = false;
      }
    });
  }

  // 居住国選択（ドロップダウンリスト）のリアルタイムバリデーション
  function validateCountry(event) {
    if (event.target.value === "other") {
      console.log("その他の国が選択されました");
      otherCountryInputArea.classList.remove("hidden");
    } else {
      otherCountryInputArea.classList.add("hidden");
    }
  }
});
