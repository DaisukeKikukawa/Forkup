// 配列の要素を逆順にする処理
const array: number[] = [1,2,3,4,5];
let reverseArray: number[] = [];

for(let i:number = array.length -1; i >= 0; i--) {
  reverseArray.push(array[i]);
}
console.log(reverseArray);
