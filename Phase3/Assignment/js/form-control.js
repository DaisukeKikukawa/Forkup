document.addEventListener("DOMContentLoaded", function () {
  // 興味のある分野（チェックボックス）関連の要素の取得
  const interestCheckboxes = document.querySelectorAll('[name="interest"]');
  // 興味のある分野（チェックボックス）の選択時にリアルタイムバリーでションを実行
  interestCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("input", function (event) {
      validateInterest(event);
    });
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
});
