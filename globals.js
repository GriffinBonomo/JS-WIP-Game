import Images from "./lib/Images.js";
import Fonts from "./lib/Fonts.js";
import StateMachine from "./lib/StateMachine.js";
import Sounds from "./lib/Sounds.js";
import Timer from "./lib/Timer.js";

export const canvas = document.createElement('canvas');
export const context = canvas.getContext('2d') || new CanvasRenderingContext2D();

export const CANVAS_WIDTH = 928;
export const CANVAS_HEIGHT = 480;

export const keys = {};
export const images = new Images(context);
export const fonts = new Fonts();
export const sounds = new Sounds();
export const timer= new Timer();
export const stateMachine = new StateMachine();

export const DEBUG = false;