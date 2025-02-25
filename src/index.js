import { Application, Assets, Container, Graphics, Text } from "pixi.js";
import Star from "./star";
import { ButtonContainer, Slider } from "@pixi/ui";
import { sound } from "@pixi/sound";
import { Layout } from "@pixi/layout";

const fontStyle = {
  textAlign: "center",
  align: "center",
  verticalAlign: "middle",
  color: "white",
  fill: "white",
  overflow: "hidden",
  fontFamily: "Lexend",
  fontWeight: "bold",
  wordWrap: true,
  wordWrapWidth: 300,
  stroke: { color: "black", width: 4, join: "round" },
};

const LAYOUT_WIDTH = 360;
const LAYOUT_PADDING = 10;
const MAX_N = 50;

const globalStyles = {
  root: {
    color: "#000000",
    width: LAYOUT_WIDTH,
    minWidth: 300,
    minHeight: "90%",
    height: "90%",
    position: "center",
    padding: LAYOUT_PADDING,
  },
  header: {
    display: "block",
    position: "top",
    background: "red",
    height: "10%",
    borderRadius: 20,
    ...fontStyle,
  },
  layoutContent: {
    display: "block",
    position: "center",
    height: "80%",
    overflow: "hidden",
    background: "white",
    borderRadius: 20,
  },
  starContent: {
    display: "block",
    width: "100%",
    height: "50%",
    align: "center",
    background: "yellow",
    borderRadius: 20,
  },
  controlsContent: {
    display: "block",
    width: "100%",
    height: "50%",
    padding: 40,
    borderRadius: 20,
    background: "blue",
    ...fontStyle,
  },
  footer: {
    display: "block",
    position: "bottom",
    background: "white",
    height: 50,
    borderRadius: 20,
    ...fontStyle,
  },
  wiki: {
    display: "block",
    background: "red",
    height: "100%",
    width: "80%",
    borderRadius: 20,
    ...fontStyle,
  },
  credits: {
    display: "block",
    background: "green",
    height: "100%",
    width: "20%",
    borderRadius: 20,
    ...fontStyle,
  },
};

const getSliderStyle = () => ({
  bg: new Graphics()
    .roundRect(0, 0, LAYOUT_WIDTH - LAYOUT_PADDING * 8, 20, 8)
    .fill("lightgray"),
  fill: new Graphics()
    .roundRect(0, 0, LAYOUT_WIDTH - LAYOUT_PADDING * 8, 20, 8)
    .fill("red"),
  slider: new Graphics()
    .roundRect(-16, -16, 32, 32, 8)
    .fill("green")
    .stroke({ color: "black", width: 2, join: "round", alignment: 0.5 }),
  valueTextStyle: {
    fill: "white",
    fontSize: 24,
    fontFamily: "Lexend",
    fontWeight: "bold",
    stroke: { color: "black", width: 4, join: "round" },
  },
});

const createButton = (text, color, width, height, onPress) => {
  const button = new ButtonContainer(buttonView);

  button.onPress.connect(onPress);

  const buttonView = new Container();
  const buttonBg = new Graphics()
    .roundRect(0, 0, width, height, 20)
    .fill(color);
  const buttonText = new Text({ text, style: { fontSize: 20, ...fontStyle } });

  buttonText.anchor.set(0.5);
  buttonText.x = buttonBg.width / 2;
  buttonText.y = buttonBg.height / 2;

  buttonView.addChild(buttonBg, buttonText);

  button.addChild(buttonView);

  return button;
};

const createSlider = (min, max, value, step, onUpdate) => {
  const slider = new Slider({
    showValue: true,
    min,
    max,
    value,
    step,
    ...getSliderStyle(),
  });
  slider.onUpdate.connect(onUpdate);
  return slider;
};

(async () => {
  const starParameters = { n: 5, k: 2 };

  await Assets.load("assets/fonts/Lexend.ttf");

  const app = new Application();
  await app.init({
    backgroundColor: 0xffffff,
    resizeTo: window,
  });

  document.body.appendChild(app.canvas);

  sound.add("click", "assets/sound/click.ogg");

  const starContainer = new Container();
  const star = new Star(starContainer);

  const nSlider = createSlider(5, MAX_N, starParameters.n, 1, (value) => {
    if (starParameters.n === value) return;
    starParameters.n = value;
    kSlider.max = Math.ceil(value / 2) - 1;
    star.drawStar(nSlider.value, kSlider.value);
    sound.volume = (Math.floor(Math.random() * 10) + 1) / 10;
    sound.play("click");
  });

  const kSlider = createSlider(1, 5, starParameters.k, 1, (value) => {
    if (starParameters.k === value) return;
    starParameters.k = value;
    nSlider.min = Math.max(value * 2 + 1, 5);
    if (value * 2 + 1 > nSlider.value) nSlider.value = value * 2 + 1;
    star.drawStar(nSlider.value, kSlider.value);
    sound.volume = (Math.floor(Math.random() * 10) + 1) / 10;
    sound.play("click");
  });

  const layout = new Layout({
    id: "root",
    content: {
      header: {
        content: "Star Polygons",
      },
      layoutContent: {
        content: {
          starContent: {
            content: starContainer,
          },
          controlsContent: {
            content: [{ nSlider, styles: { margin: 200 } }, { kSlider }],
          },
        },
      },
      footer: {
        content: {
          wiki: {
            content: createButton(
              "Learn more on Wikipedia",
              "green",
              LAYOUT_WIDTH * 0.8,
              50,
              () => {
                window.open(
                  "https://en.wikipedia.org/wiki/Star_polygon",
                  "_blank"
                );
              }
            ),
          },
          credits: {
            content: createButton("Me", "red", LAYOUT_WIDTH * 0.2, 50, () => {
              window.open("https://alperdagli.me", "_blank");
            }),
          },
        },
      },
    },
    globalStyles,
  });

  app.stage.addChild(layout);

  star.drawStar(starParameters.n, starParameters.k);

  window.addEventListener("load", () => {
    layout.resize(app.renderer.width, app.renderer.height);
    layout
      .getChildByID("controlsContent")
      .content.children.forEach((control) => {
        const { bg, fill } = control.options;
        const scaleFactor = control.parent.width / LAYOUT_WIDTH;
        bg.scale.set(scaleFactor);
        fill.scale.set(scaleFactor);
      });
  });

  window.addEventListener("resize", () => {
    layout.resize(app.renderer.width, app.renderer.height);
  });
})();
