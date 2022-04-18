export const COLORS = {
  red: "",
  blue: "",
  orange: "",
  yellow: "",
  green: "",
  navy: "",
};

const THEME_HEX_COLOR = {
  Nickel: "706c61",
  MorningBlue: "899e8b",
  CambridgeBlue: "99c5b5",
  Celeste: "afece7",
  LightGreen: "81f499"
};



//pie chart percentage formatter




//hex to rgba color
//string hex and alpha or just hex
export function hexToRgb(hex, alpha) {
  hex = hex.replace("#", "");
  var r = parseInt(
    hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2),
    16
  );
  var g = parseInt(
    hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4),
    16
  );
  var b = parseInt(
    hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6),
    16
  );
  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

