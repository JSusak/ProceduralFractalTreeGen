const canvas = document.querySelector("canvas");
const button = document.querySelector(".generate");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

/**
 * Draw a procedurally generated tree, based on given parameters.
 * @param {*} x The starting x position of the tree.
 * @param {*} y
 * @param {*} length
 * @param {*} angle
 * @param {*} width
 * @param {*} col1
 * @param {*} col2
 * @returns
 */
function draw(x, y, length, angle, width, col1, col2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = col1;
  ctx.fillStyle = col2;
  ctx.lineWidth = width;
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  //ctx.lineTo(0, -length);
  if (angle > 0) {
    ctx.quadraticCurveTo(10, -length / 2, 0, -length);
  } else {
    ctx.quadraticCurveTo(-10, -length / 2, 0, -length);
  }
  ctx.stroke();

  if (length < 10) {
    ctx.beginPath();
    //Third parameter is leaf size.
    ctx.arc(0, -length, 7, 50, Math.PI / 2);
    ctx.fill();
    ctx.restore();

    return;
  }

  //Changing x in the angle changes the overall layout of the tree.
  //For each recursive call, the branch width will go thinner.
  draw(0, -length, length * 0.75, angle + 30, width * 0.7, col1, col2);
  draw(0, -length, length * 0.75, angle - 30, width * 0.6, col1, col2);
  ctx.restore();
}
//Col 1 is branch colour, col 2 is leaf colour.
draw(canvas.width / 2, canvas.height - 80, 220, 0, 10, "grey", "pink");
