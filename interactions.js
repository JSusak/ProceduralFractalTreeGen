const position = { x: 0, y: 0 };
const draggable = interact(".draggable");

draggable.draggable({
  ignoreFrom: ".slidercontainer",
  inertia: true,
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: document.querySelector("#container"),
      endOnly: true,
    }),
  ],
  listeners: {
    start(event) {
      console.log(event.type, event.target);
    },
    move(event) {
      position.x += event.dx;
      position.y += event.dy;

      event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
    },
  },
});

draggable.on("tap", function (event) {
  // start a drag action to apply modifiers
  draggable.reflow({ name: "drag", axis: "xy" });
});
