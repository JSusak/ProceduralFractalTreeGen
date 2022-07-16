const canvas = document.querySelector("canvas");
const button = document.querySelector(".generate");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

function draw(x, y, length, angle, width, col1, col2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = col1;
  ctx.fillStyle = col2;
  ctx.lineWidth = width;
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length);
  ctx.stroke();

  if (length < 10) {
    ctx.restore();
    return;
  }

  //Changing x in the angle changes the overall layout of the tree.
  draw(0, -length, length * 0.75, angle + 150, width, col1, col2);
  draw(0, -length, length * 0.75, angle - 5, width, col1, col2);
  ctx.restore();
}
draw(canvas.width / 2, canvas.height - 80, 220, 0, 1, "white", "red");
