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
export interface Point {
  x: any;
  y: any;
}
const isElqual = (point_1: Point, point_2: Point) =>
  point_2.x === point_1.x && point_1.y === point_2.y;
export const multiplyPoint = (point: Point, k: any, p: any, a: any) => {
  let result = point;
  let i = 1;
  while (i < k) {
    if (checkIndentyPoint(result)) {
      result = point;
    } else {
      result = plusPoint(result, point, a, p);
    }

    i++;
  }
  return result;
};
export const plusPoint = (point_1: Point, point_2: Point, a: any, p: any) => {
  let lamda;
  if (checkIndentyPoint(point_1)) {
    return point_2;
  }
  if (checkIndentyPoint(point_2)) {
    return point_1;
  }
  try {
    if (isElqual(point_1, point_2)) {
      let tu_so = bigInt(point_1.x).pow(2).multiply(3).add(a).mod(p);
      if (tu_so.lesser(0)) {
        tu_so = tu_so.add(p);
      }
      let mau_so = bigInt(point_1.y).multiply(2).modInv(p);
      if (mau_so.lesser(0)) {
        mau_so = mau_so.add(p);
      }

      lamda = bigInt(bigInt(tu_so).multiply(bigInt(mau_so))).mod(p);
      if (lamda.lesser(0)) {
        lamda = lamda.add(p);
      }
    } else {
      if (point_1.x === point_2.x) {
        return { x: null, y: null };
      }
      let tu_so = bigInt(point_2.y).minus(point_1.y).mod(p);
      if (tu_so.lesser(0)) {
        tu_so = tu_so.add(p);
      }
      let mau_so = bigInt(point_2.x).minus(point_1.x).modInv(p);
      if (mau_so.lesser(0)) {
        mau_so = mau_so.add(p);
      }
      lamda = bigInt(bigInt(tu_so).multiply(bigInt(mau_so))).mod(p);
      if (lamda.lesser(0)) {
        lamda = lamda.add(p);
      }
    }
    let x = lamda.pow(2).minus(point_1.x).minus(point_2.x).mod(p);
    if (x.lesser(0)) {
      x = x.add(p);
    }

    let y = lamda.multiply(bigInt(point_1.x).minus(x)).minus(point_1.y).mod(p);
    if (y.lesser(0)) {
      y = y.add(p);
    }

    return {
      x: x.toString(),
      y: y.toString(),
    };
  } catch (e) {
    return {
      x: null,
      y: null,
    };
  }
};
const checkIndentyPoint = (point: Point) =>
  point.x === null && point.y === null;
export const getK = (point: Point, point_A: Point, p: any, a: any) => {
  if (isElqual(point, point_A)) {
    return 1;
  } else {
    let k = 1;
    let point_temp = point_A;

    while (k < p && !isElqual(point, point_temp)) {
      k++;
      point_temp = multiplyPoint(point_A, k, p, a);
    }
    return k;
  }
};
