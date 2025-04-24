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
