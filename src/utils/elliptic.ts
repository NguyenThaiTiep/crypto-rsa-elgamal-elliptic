import bigInt from "big-integer";

export const getQ = (q: any) => {
  let Q = [];
  for (let i = 1; i <= (q - 1) / 2; i++) {
    //(x^2)modp
    Q.push({
      qValue: bigInt(i).modPow(2, q).toString(),
      y: bigInt(i).toString(),
    });
  }

  return Q;
};

// y^2 = x^3 + ax + b mod (r)
// x^3 mod
export const getPowY = (
  q: any,
  a: number,
  b: number,
  Q: { qValue: string; y: any }[]
) => {
  let Z = [];
  for (let i = 0; i < q; i++) {
    //(x^2)modp
    let powYValue = bigInt(i)
      .modPow(3, q)
      .add(bigInt(i).multiply(a).mod(q))
      .add(bigInt(b).mod(q))
      .mod(q)
      .toString();

    let inQ = checkInQ(powYValue, Q, q);
    if (i == 0) {
      console.log(powYValue);
      console.log(inQ);
    }
    Z.push({
      powYValue,
      x: i,
      ...inQ,
    });
  }

  return Z;
};
export const getPoints = (
  powValue: {
    powYValue?: any;
    x: any;
    y_1?: any;
    y_2?: any;
    inQ?: boolean;
  }[]
) => {
  let result = [] as any[];
  powValue.forEach((value, index) => {
    if (value.inQ) {
      result.push({ x: value.x, y: value.y_1 });
      result.push({ x: value.x, y: value.y_2 });
    }
  });
  return result;
};
const checkInQ = (value: any, Q: { qValue: string; y: any }[], q: any) => {
  let finds = Q.find((i) => i.qValue.toString() == value.toString());

  if (finds) {
    let res = {
      inQ: true,
      y_1: finds.y,
      y_2: bigInt(q).minus(bigInt(finds.y)).toString(),
    } as any;

    return res;
  } else {
    let res = {
      inQ: false,
    } as any;
    return res;
  }
};
