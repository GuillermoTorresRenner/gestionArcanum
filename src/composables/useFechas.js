const date = new Date();
let d, m, y, h, min, s;
function getFechaActual() {
  d =
    date.getDate().toString().length > 1
      ? date.getDate().toString()
      : "0" + date.getDate();
  m =
    (date.getMonth() + 1).toString.length > 1
      ? (date.getMonth() + 1).toString()
      : "0" + (date.getMonth() + 1).toString();
  y = date.getFullYear();

  h =
    date.getHours().toString().length > 1
      ? date.getHours().toString()
      : "0" + date.getHours().toString();
  min =
    date.getMinutes().toString().length > 1
      ? date.getMinutes().toString()
      : "0" + date.getMinutes().toString();
  s =
    date.getSeconds().toString() > 1
      ? date.getSeconds().toString()
      : "0" + date.getSeconds().toString();

  const fecha = d + "/" + m + "/" + y;
  return fecha;
}
export { getFechaActual };
