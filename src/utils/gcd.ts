import bigInt from "big-integer";

// euclid algorithm
export function gcd(a: any, b: any) {
  a = a || 0;
  b = b || 0;
  if (a < b) {
    var tmp = a;
    a = b;
    b = tmp;
  }

  while (b !== 0) {
    var r = a % b;
    a = b;
    b = r;
  }
  return a;
}

export function egcd(a: any, b: any) {
  return bigInt(a).modInv(bigInt(b));
}

export function mod(x: number, y: number) {
  return x - y * Math.floor(x / y);
}
