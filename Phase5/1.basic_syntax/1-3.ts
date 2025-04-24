// 配列を使用した数値の合計計算
const numArray: number[] = [10, 20, 30, 40, 50];
let totalNum: number = 0;

for (let i = 0; i < numArray.length; i++) {
  totalNum += numArray[i];
}

console.log(totalNum);
