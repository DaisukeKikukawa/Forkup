// 基本構文の練習
// 1.各データ型を使用した変数宣言と演算
// let age: number = 30;
// let height: number = 170.5;
// let sum: number = age + height;
// console.log(sum); // 200.5

// let firstName: string = "Taro";
// let lastName: string = "Yamada";
// let fullName: string = firstName + " " + lastName;
// console.log(fullName); // "Taro Yamada"

// let isAdult: boolean = true;
// let hasLicense: boolean = false;
// let canDrive: boolean = isAdult && hasLicense;
// console.log(canDrive); // false

// null型
// const x: null = null;

// any型
// let value: any;
// value = 1;
// value = "string";
// value = { name: "オブジェクト" };

// 配列
// let array: number[];
// array = [1, 2, 3];

// let array: Array<number>;
// array = [1, 2, 3];

// オブジェクト
// let box: { width: number; height: number };
// box = { width: 1080, height: 720 };


// 2.条件分岐を使用した年齢チェックプログラム
// function checkAge(age: number) {
//   if (age < 13) {
//     console.log("あなたは子供です。");
//   } else if (age < 20) {
//     console.log( "あなたは未成年です。");
//   } else if (age < 65) {
//     console.log("あなたは成人です。");
//   } else {
//     console.log("あなたは高齢者です。");
//   }
// }

// checkAge(26)

// 3.配列を使用した数値の合計計算;
// const numArray: number[] = [10, 20, 30, 40, 50];
// let totalNum: number = 0;

// for (let i = 0; i < numArray.length; i++) {
//   totalNum += numArray[i];
// }

// console.log(totalNum);

//4.関数を使用した温度変換（摂氏⇔華氏）

// 摂氏から華氏へ変換
// function celsiusToFahrenheit(celsius: number): number {
//   return Math.round((celsius * 9/5) + 32);
// }

// // 華氏から摂氏へ変換
// function fahrenheitToCelsius(fahrenheit: number): number {
//   return Math.round((fahrenheit - 32) * 5/9);
// }

// const celsius = 21;
// const fahrenheit = 13;

// console.log(`${celsius}Cは ${celsiusToFahrenheit(celsius)}Fです。`);
// console.log(`${fahrenheit}Fは ${fahrenheitToCelsius(fahrenheit)}Cです。`);

// 制御構造の練習
// FizzBuzzプログラムの実装
// for (let i = 1; i <= 20; i++) {
//   if (i % 3 === 0 && i % 5 === 0) {
//     console.log("FizzBuzz");
//   } else if (i % 3 === 0) {
//     console.log("Fizz");
//   } else if (i % 5 === 0) {
//     console.log("Buzz");
//   } else {
//     console.log(i);
//   }
// }

// 素数判定プログラムの実装
// function isPrime(inputNumber: number) {
// if (inputNumber < 2) {
//     return false;
// }
// for (let i = 2; i < inputNumber; i++) {
//     if (inputNumber % i === 0) {
// 	return false;
//     }
// }
// return true;
// };

// console.log(isPrime(13));

// 配列の要素を逆順にする処理
// const array: number[] = [1,2,3,4,5];
// let reverseArray: number[] = [];

// for(let i = array.length -1; i >= 0; i--) {
//   reverseArray.push(array[i]);
// }
// console.log(reverseArray);

// 例外処理を含む割り算プログラム
function divide(a: number, b: number): number {
  return a / b;
}

try {
  const result = divide(4, 2);
  console.log(result);
} catch (e) {
  console.error(e);
}
