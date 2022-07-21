const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

//
let opacityValue = document.getElementById("opacity");
let treeWidth = document.getElementById("tWidth");
let treeLength = document.getElementById("tLength");
let treeAngle = document.getElementById("tAngle");
let branchAngle = document.getElementById("bAngle");
let leafSize = document.getElementById("lSize");
let branchColour = document.getElementById("bCol");
let leafColour = document.getElementById("lCol");
let bezier = document.getElementById("checkbezier");
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
function draw(x, y, length, angle, width) {
  //Retrieve slider values (which may have changed from last drawing)
  ctx.beginPath();
  ctx.save();
  ctx.globalAlpha = opacityValue.value;
  ctx.strokeStyle = branchColour.value;
  ctx.shadowBlur = 15;
  ctx.shadowColor = leafColour.value;
  ctx.fillStyle = leafColour.value;
  ctx.lineWidth = width;
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);

  angle > 0
    ? bezier.checked
      ? ctx.bezierCurveTo(30, -length / 2, 30, -length / 2, 0, -length)
      : ctx.quadraticCurveTo(10, -length / 2, 0, -length)
    : bezier.checked
    ? ctx.bezierCurveTo(30, -length / 2, -30, -length / 2, 0, -length)
    : ctx.quadraticCurveTo(-10, -length / 2, 0, -length);
  ctx.stroke();

  if (length < 10) {
    ctx.beginPath();
    //Third parameter is leaf size.
    ctx.arc(0, -length, leafSize.value, 50, Math.PI / 2);
    ctx.fill();
    ctx.restore();

    return;
  }
  curve = branchAngle.value * 10 + 10;

  //Changing x in the angle changes the overall layout of the tree.
  //For each recursive call, the branch width will go thinner.
  draw(0, -length, length * 0.75, angle + branchAngle.value, width * 0.7);
  draw(0, -length, length * 0.75, angle - branchAngle.value, width * 0.6);
  ctx.restore();
}
draw(canvas.width / 2, canvas.height - 80, 300, 10, 10);

function generateNewTree() {
  //Clears current tree from view.
  clearCanvas();
  draw(
    canvas.width / 2,
    canvas.height - 80,
    treeLength.value,
    treeAngle.value,
    treeWidth.value,
    branchColour.value,
    leafColour.value,
    leafSize.value
  );
}
/**
 * Removes all visible content from the canvas, sets up initialisation of new tree.
 */
function clearCanvas() {
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0, 255)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
}
