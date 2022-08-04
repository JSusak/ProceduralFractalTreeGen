//Main Canvas Properties

const canvas = document.getElementById("container");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.top = canvas.offsetTop;
canvas.left = canvas.offsetLeft;
const ctx = canvas.getContext("2d");
const randButton = document.getElementById("random");
const dlButton = document.getElementById("download");
const sliders = document.querySelectorAll(".slider");

let opacityValue = document.getElementById("opacity");
let treeWidth = document.getElementById("tWidth");
let treeLength = document.getElementById("tLength");
let treeAngle = document.getElementById("tAngle");
let branchAngle = document.getElementById("bAngle");
let leafSize = document.getElementById("lSize");
let branchColour = document.getElementById("bCol");
let leafColour = document.getElementById("lCol");
let bezier = document.getElementById("checkbezier");
let shadowColour = document.getElementById("shCol");
let shadowIntensity = document.getElementById("sIntensity");

//Magnifying canvas properties
const magnify = document.getElementById("magnify");
const magCtx = magnify.getContext("2d");

//Undo Capabilities
const undoButton = document.getElementById("undo");
const redoButton = document.getElementById("redo");
let memStep = -1;
var memArray = new Array();
var valsArray = new Array([], [], [], [], [], [], [], [], [], [], []);

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
  ctx.shadowBlur = shadowIntensity.value;
  ctx.shadowColor = shadowColour.value;
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
generateRandomTree();

function push() {
  memStep++;
  if (memStep < memArray.length) {
    memArray.length = memStep;
  }
  memArray.push(document.getElementById("container").toDataURL());
  //Stores the values for that specific tree in array indexes to easily refer to.
  valsArray[0][memStep] = opacityValue.value;
  valsArray[1][memStep] = treeWidth.value;
  valsArray[2][memStep] = treeLength.value;
  valsArray[3][memStep] = treeAngle.value;
  valsArray[4][memStep] = branchAngle.value;
  valsArray[5][memStep] = leafSize.value;
  valsArray[6][memStep] = branchColour.value;
  valsArray[7][memStep] = leafColour.value;
  valsArray[8][memStep] = bezier.checked;
  valsArray[9][memStep] = shadowColour.value;
  valsArray[10][memStep] = shadowIntensity.value;
}

function undo() {
  if (memStep > 0) {
    memStep--;
    var savedImage = new Image();
    savedImage.src = memArray[memStep];
    savedImage.onload = function () {
      clearCanvas();
      ctx.drawImage(savedImage, 0, 0);
    };
    updateArrValues();
    updateSliderValues();
  }
}

function redo() {
  if (memStep < memArray.length - 1) {
    memStep++;
    var savedImage = new Image();
    savedImage.src = memArray[memStep];
    savedImage.onload = function () {
      clearCanvas();
      ctx.drawImage(savedImage, 0, 0);
    };
    updateArrValues();
    updateSliderValues();
  }
}

function updateArrValues() {
  opacityValue.value = valsArray[0][memStep];
  treeWidth.value = valsArray[1][memStep];
  treeLength.value = valsArray[2][memStep];
  treeAngle.value = valsArray[3][memStep];
  branchAngle.value = valsArray[4][memStep];
  leafSize.value = valsArray[5][memStep];
  branchColour.value = valsArray[6][memStep];
  leafColour.value = valsArray[7][memStep];
  bezier.checked = valsArray[8][memStep];
  shadowColour.value = valsArray[9][memStep];
  shadowIntensity.value = valsArray[10][memStep];
}

function generateNewTree() {
  //Clears current tree from view.
  modifySliderColours(branchColour.value);
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
  updateSliderValues();
  push();
}

/**
 * Creates a random integer between 1 and max value
 * @param {} maxValue The highest number generated.
 * @returns A random number between the boundaries of 1 and the max value.
 */
function generateRandomInt(maxValue) {
  return Math.floor(Math.random() * maxValue) + 1;
}

function generateRandomTree() {
  let newTreeWidth = generateRandomInt(40);
  let newTreeLength = generateRandomInt(800);
  let newTreeAngle = generateRandomInt(40);
  let newBranchAngle = generateRandomInt(100);
  let newLeafSize = generateRandomInt(15);
  let newBranchColour = Math.floor(Math.random() * 16777215).toString(16);
  let newLeafColour = Math.floor(Math.random() * 16777215).toString(16);
  let newShadowIntensity = generateRandomInt(30);

  let bezierProb = generateRandomInt(2);
  bezierProb == 1 ? (bezier.checked = true) : (bezier.checked = false);

  treeLength.value = newTreeLength;
  treeAngle.value = newTreeAngle;
  treeWidth.value = newTreeWidth;
  branchColour.value = "#" + newBranchColour;
  leafColour.value = "#" + newLeafColour;
  leafSize.value = newLeafSize;
  branchAngle.value = newBranchAngle;
  //When a tree is randomly generated the shadow colour should be the same as the leaf colour (looks nicer)
  shadowColour.value = "#" + newLeafColour;
  shadowIntensity.value = newShadowIntensity;

  generateNewTree();
}

function modifySliderColours(colourString) {
  sliders.forEach((slider) => {
    slider.style.backgroundColor = colourString;
    slider.style.setProperty("--sliderTick-background", shadowColour.value);
  });
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

function download() {
  var image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  dlButton.setAttribute("href", image);
}
//

canvas.addEventListener("click", function (e) {
  if (!document.getElementById("disZoom").checked) {
    //While not checked, provide the ability to zoom in.
    magCtx.fillStyle = "white";
    //magnify.clearRect(0,0, zoom.width, zoom.height);
    //magnify.fillStyle = "transparent";
    magCtx.fillRect(0, 0, magnify.width, magnify.height);

    magCtx.drawImage(canvas, e.x, e.y, 200, 100, 0, 0, 400, 200);
    magCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
    magnify.style.top = e.pageY + 10 + "px";
    magnify.style.left = e.pageX + 10 + "px";
    magnify.style.display = "block";
  } else {
    //Do nothing on click.
    return;
  }
});

canvas.addEventListener("mouseout", function () {
  magnify.style.display = "none";
});

//Updates and displays numeric range values
function updateSlider(sliderID) {
  var slider = document.getElementById(sliderID);
  var output = document.getElementById(sliderID + "Val");
  output.innerHTML = slider.value;
}

//This function should only be called once rather than every update.
//Provides the onchange and oninput changing capability.
function giveBaseCapability(sliderID) {
  var slider = document.getElementById(sliderID);
  var output = document.getElementById(sliderID + "Val");

  slider.oninput = function () {
    output.innerHTML = this.value;
  };
}

function updateSliderValues() {
  updateSlider("opacity");
  updateSlider("tWidth");
  updateSlider("tLength");
  updateSlider("tAngle");
  updateSlider("bAngle");
  updateSlider("lSize");
  updateSlider("sIntensity");
  updateSlider("bCol");
  updateSlider("lCol");
  updateSlider("shCol");
}

giveBaseCapability("opacity");
giveBaseCapability("tWidth");
giveBaseCapability("tLength");
giveBaseCapability("tAngle");
giveBaseCapability("bAngle");
giveBaseCapability("lSize");
giveBaseCapability("sIntensity");
//The value of a colour input IS its hex code.
//No need to write extra code to convert singular RGB values to hex.
giveBaseCapability("bCol");
giveBaseCapability("lCol");
giveBaseCapability("shCol");

dlButton.addEventListener("click", download);
randButton.addEventListener("click", generateRandomTree);
undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);
