import { sha512 } from "js-sha512";
export const hashCodeSHA = (value: any) => {
  return hexToBn(sha512(value));
};
function hexToBn(hex: any) {
  if (hex.length % 2) {
    hex = "0" + hex;
  }

  var highbyte = parseInt(hex.slice(0, 2), 16);
  var bn = BigInt("0x" + hex);

  if (0x80 & highbyte) {
    bn =
      BigInt(
        "0b" +
          bn
            .toString(2)
            .split("")
            .map(function (i) {
              return "0" === i ? 1 : 0;
            })
            .join("")
      ) + BigInt(1);
    bn = -bn;
  }

  return bn;
}
