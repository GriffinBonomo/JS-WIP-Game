import Images from "./lib/Images.js";
import Fonts from "./lib/Fonts.js";
import StateMachine from "./lib/StateMachine.js";

export const canvas = document.createElement('canvas');
export const context = canvas.getContext('2d') || new CanvasRenderingContext2D();

export const CANVAS_WIDTH = 940;
export const CANVAS_HEIGHT = 480;

export const keys = {};
export const images = new Images(context);
export const fonts = new Fonts();
export const stateMachine = new StateMachine();