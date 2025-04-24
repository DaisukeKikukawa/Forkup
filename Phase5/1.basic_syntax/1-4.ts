//4.関数を使用した温度変換（摂氏⇔華氏）

// 摂氏から華氏へ変換
function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9/5) + 32);
}

// // 華氏から摂氏へ変換
function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round((fahrenheit - 32) * 5/9);
}

const celsius = 21;
const fahrenheit = 13;

console.log(`${celsius}Cは ${celsiusToFahrenheit(celsius)}Fです。`);
console.log(`${fahrenheit}Fは ${fahrenheitToCelsius(fahrenheit)}Cです。`);
