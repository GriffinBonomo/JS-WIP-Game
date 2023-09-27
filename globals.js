import Images from "./lib/Images.js";

export const canvas = document.createElement('canvas');
export const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 720;

export const images = new Images(context);