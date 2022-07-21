const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

//
let opacityValue = document.getElementById("opacity").value;
let treeWidth = document.getElementById("tWidth").value;
let treeLength = document.getElementById("tLength").value;
let treeAngle = document.getElementById("tAngle").value;
let branchAngle = document.getElementById("bAngle").value;
let leafSize = document.getElementById("lSize").value;
let branchColour = document.getElementById("bCol").value;
let leafColour = document.getElementById("lCol").value;
let bezier = document.getElementById("checkbezier");

function updateSliderValues() {
  opacityValue = document.getElementById("opacity").value;
  treeWidth = document.getElementById("tWidth").value;
  treeLength = document.getElementById("tLength").value;
  treeAngle = document.getElementById("tAngle").value;
  branchAngle = document.getElementById("bAngle").value;
  leafSize = document.getElementById("lSize").value;
  branchColour = document.getElementById("bCol").value;
  leafColour = document.getElementById("lCol").value;
}
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
  ctx.globalAlpha = opacityValue;
  ctx.strokeStyle = branchColour;
  ctx.shadowBlur = 15;
  ctx.shadowColor = leafColour;
  ctx.fillStyle = leafColour;
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
    ctx.arc(0, -length, leafSize, 50, Math.PI / 2);
    ctx.fill();
    ctx.restore();

    return;
  }
  curve = branchAngle * 10 + 10;

  //Changing x in the angle changes the overall layout of the tree.
  //For each recursive call, the branch width will go thinner.
  draw(0, -length, length * 0.75, angle + branchAngle, width * 0.7);
  draw(0, -length, length * 0.75, angle - branchAngle, width * 0.6);
  ctx.restore();
}
draw(canvas.width / 2, canvas.height - 80, 300, 10, 10);

function generateNewTree() {
  //Clears current tree from view.
  updateSliderValues();
  clearCanvas();
  draw(
    canvas.width / 2,
    canvas.height - 80,
    treeLength,
    treeAngle,
    treeWidth,
    branchColour,
    leafColour,
    leafSize
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
