// 条件分岐を使用した年齢チェックプログラム
function checkAge(age: number) {
  if (age < 13) {
    console.log("あなたは子供です。");
  } else if (age < 20) {
    console.log( "あなたは未成年です。");
  } else if (age < 65) {
    console.log("あなたは成人です。");
  } else {
    console.log("あなたは高齢者です。");
  }
}

checkAge(26);
