import "toolcool-range-slider";
import SurferCoreGpu from "@imaginary-maths/surfer-js-core-gpu";

const sliderCssUrl = new URL("slider.scss", import.meta.url);

function createSliders() {
  const container = document.getElementById("sliders");

  const commonSliderAttributes = {
    //    type: "vertical",
    generateLabels: "false",
    "animate-onclick": "false",
    "css-links": sliderCssUrl.href,
    theme: "surfer",
    "slider-width": "256px",
    "slider-height": "0.7rem",
    //    "slider-height": "512px",
    //    "slider-width": "0.7rem",
  };

  const paramASlider = document.createElement("tc-range-slider");
  paramASlider.setAttribute("min", "0.4");
  paramASlider.setAttribute("max", "1.2");
  paramASlider.setAttribute("step", "0.0001");
  paramASlider.setAttribute("value", "1.0");

  const opacitySlider = document.createElement("tc-range-slider");
  opacitySlider.setAttribute("min", "0.3");
  opacitySlider.setAttribute("max", "1");
  opacitySlider.setAttribute("step", "0.0001");
  opacitySlider.setAttribute("value", "0.75");

  const zoomSlider = document.createElement("tc-range-slider");
  zoomSlider.setAttribute("min", "-3");
  zoomSlider.setAttribute("max", "0.5");
  zoomSlider.setAttribute("step", "0.0001");
  zoomSlider.setAttribute("value", "-1");

  const sliders = [paramASlider, opacitySlider, zoomSlider];
  const attrs = Object.entries(commonSliderAttributes);
  sliders.forEach((s) => {
    attrs.forEach(([name, value]) => s.setAttribute(name, value));
    container.append(s);
  });

  return {
    paramASlider,
    opacitySlider,
    zoomSlider,
  };
}

const lights = [
  {
    // light emulating a front side material #1
    direction: [0, 0, -1],
    color: [231 / 255, 49 / 255, 77 / 255],
    gamma: 1,
    cameraSpace: true,
  },
  {
    // light emulating a front side material #2
    direction: [0, 0, -1],
    color: [243 / 255, 179 / 255, 41 / 255],
    gamma: 10,
    cameraSpace: true,
  },
  {
    // light emulating a back side material #1
    direction: [0, 0, 1],
    color: [46 / 255, 127 / 255, 186 / 255],
    gamma: 1,
    cameraSpace: true,
  },
  {
    // light emulating a back side material #2
    direction: [0, 0, 1],
    color: [98 / 255, 177 / 255, 114 / 255],
    gamma: 10,
    cameraSpace: true,
  },
  {
    // light that is fixed in the scene #1
    direction: [-10, 10, -2],
    color: [0.63, 0.72, 0.27],
    gamma: 5,
    cameraSpace: false,
  },
  {
    // light that is fixed in the scene #2
    direction: [10, -8, 3],
    color: [0.54, 0.09, 0.54],
    gamma: 5,
    cameraSpace: false,
  },
];

async function init() {
  const form = document.getElementById("formula-form") as HTMLFormElement;
  const input = document.getElementById("formula") as HTMLTextAreaElement;
  const button = document.getElementById("go");

  const { paramASlider, opacitySlider, zoomSlider } = createSliders();

  const im = new SurferCoreGpu.IlluminationModels.Montag(lights);

  const container = document.getElementById("surfer-container");
  const surferCoreGpu = await SurferCoreGpu.create(container, 512, 512);
  surferCoreGpu.setExpression(input.value);
  surferCoreGpu.setParameter("a", paramASlider.value);
  surferCoreGpu.setZoom(Math.pow(2, zoomSlider.value));
  surferCoreGpu.setAlpha(opacitySlider.value);
  surferCoreGpu.element.classList.add("surface");
  surferCoreGpu.setIlluminationModel(im);

  paramASlider.addEventListener("change", (evt) => {
    surferCoreGpu.setParameter("a", evt.detail.value);
  });

  opacitySlider.addEventListener("change", (evt) => {
    surferCoreGpu.setAlpha(evt.detail.value);
  });

  zoomSlider.addEventListener("change", (evt) => {
    surferCoreGpu.setZoom(Math.pow(2, evt.detail.value));
  });

  const submit = () => surferCoreGpu.setExpression(input.value);
  const submitByKey = (e) => (e.code === "Enter" ? submit() : undefined);
  form.addEventListener("submit", submit);
  button.addEventListener("click", submit);
  input.addEventListener("keydown", submitByKey);

  window.addEventListener("message", (evt) =>
    surferCoreGpu.setExpression(evt.data)
  );
}
init().then();
