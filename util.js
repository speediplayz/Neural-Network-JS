let canvas = document.getElementById("canv");
let ctx = canvas.getContext("2d");

const { abs, acos, acosh, asin, asinh, atan, atan2, atanh, cbrt, ceil, clz32, cos, cosh, exp, expm1, floor, fround, hypot, imul, log, log1p, log2, log10, max, min, pow, random, round, sign, sin, sinh, sqrt, tan, tanh, trunc } = Math;
let { clearRect, fillRect, strokeRect, fillText, strokeText, measureText, getLineDash, setLineDash, createConicGradient, createLinearGradient, createRadialGradient, createPattern, beginPath, closePath, moveTo, lineTo, bezierCurveTo, quadraticCurveTo, arc, arcTo, ellipse, rect, fill, stroke, drawFocusIfNeeded, clip, isPointInPath, isPointInStroke, getTransform, rotate, scale, translate, transform, setTransform, resetTransform, drawImage, createImageData, getImageData, putImageData, save, restore, getContextAttributes } = ctx;

clearRect = clearRect.bind(ctx);
fillRect = fillRect.bind(ctx);
strokeRect = strokeRect.bind(ctx);
fillText = fillText.bind(ctx);
strokeText = strokeText.bind(ctx);
measureText = measureText.bind(ctx);
getLineDash = getLineDash.bind(ctx);
setLineDash = setLineDash.bind(ctx);
createConicGradient = createConicGradient.bind(ctx);
createLinearGradient = createLinearGradient.bind(ctx);
createRadialGradient = createRadialGradient.bind(ctx);
createPattern = createPattern.bind(ctx);
beginPath = beginPath.bind(ctx);
closePath = closePath.bind(ctx);
moveTo = moveTo.bind(ctx);
lineTo = lineTo.bind(ctx);
bezierCurveTo = bezierCurveTo.bind(ctx);
quadraticCurveTo = quadraticCurveTo.bind(ctx);
arc = arc.bind(ctx);
arcTo = arcTo.bind(ctx);
ellipse = ellipse.bind(ctx);
rect = rect.bind(ctx);
fill = fill.bind(ctx);
stroke = stroke.bind(ctx);
drawFocusIfNeeded = drawFocusIfNeeded.bind(ctx);
clip = clip.bind(ctx);
isPointInPath = isPointInPath.bind(ctx);
isPointInStroke = isPointInStroke.bind(ctx);
getTransform = getTransform.bind(ctx);
rotate = rotate.bind(ctx);
scale = scale.bind(ctx);
translate = translate.bind(ctx);
transform = transform.bind(ctx);
setTransform = setTransform.bind(ctx);
resetTransform = resetTransform.bind(ctx);
drawImage = drawImage.bind(ctx);
createImageData = createImageData.bind(ctx);
getImageData = getImageData.bind(ctx);
putImageData = putImageData.bind(ctx);
save = save.bind(ctx);
restore = restore.bind(ctx);
getContextAttributes = getContextAttributes.bind(ctx);

const E = Math.E;
const LN2 = Math.LN2;
const LN10 = Math.LN10;
const LOG2E = Math.LOG2E;
const LOG10E = Math.LOG10E;
const PI = Math.PI;
const SQRT1_2 = Math.SQRT1_2;
const SQRT2 = Math.SQRT2;

const lineWidth = a => ctx.lineWidth = a;
const lineCap = a =>  ctx.lineCap = a;
const lineJoin = a => ctx.lineJoin = a;
const miterLimit = a => ctx.miterLimit = a;
const font = a => ctx.font = a;
const textAlign = a => ctx.textAlign = a;
const textBaseline = a => ctx.textBaseline = a;
const direction = a => ctx.direction = a;
const fillStyle = a => ctx.fillStyle = a;
const strokeStyle = a => ctx.strokeStyle = a;
const shadowBlur = a => ctx.shadowBlur = a;
const shadowColor = a => ctx.shadowColor = a;
const shadowOffsetX = a => ctx.shadowOffsetX = a;
const shadowOffsetY = a => ctx.shadowOffsetY = a;
const globalAlpha = a => ctx.globalAlpha = a;
const globalCompositeOperation = a => ctx.globalCompositeOperation = a;
const imageSmoothingEnabled = a => ctx.imageSmoothingEnabled = a;
const imageSmoothingQuality = a => ctx.imageSmoothingQuality = a;
const filter = a => ctx.filter = a;

const randomOnScreen = () => new v2(Math.random() * WIDTH, Math.random() * HEIGHT);
const loadAudio = a => new Audio(a);
const loadImage = a => { let i = new Image(); i.src = a; return i; }
const playAudio = a => { a.currentTime = 0; a.play(); }
const clamp = (a, b, c) => a < min(b, c) ? min(b, c) : a > max(b, c) ? max(b, c) : a;
const inRange = (a, b, c) => a >= min(b, c) && a <= max(b, c);
const lerp = (a, b, t) => (1 - t) * a + t * b;
const inverseLerp = (a, b, t) => (t - a) / (b - a);
const map = (v, a1, a2, b1, b2) => (a - a1) / (a2 - a1) * (b2 - b1) + b1;
const cloneArray = a => [...a];
const drawCircle = (x, y, r, c, f=true) => { beginPath(); arc(x, y, r, 0, 2 * Math.PI); f ? fillStyle(c) : strokeStyle(c); f ? fill() : stroke(); }
const drawRect = (x, y, w, h, c, f=true) => { f ? fillStyle(c) : strokeStyle(c); f ? fillRect(x, y, w, h) : strokeRect(x, y, w, h) }
const drawLine = (a, b, c, d, cl, l) => { lineWidth(l); strokeStyle(cl); beginPath(); moveTo(a, b); lineTo(c, d); stroke(); }
const aabbOverlap = (a1, a2, b1, b2) => a1.x + a2.x > b1.x && a1.x < b1.x + b2.x && a1.y + a2.y > b1.y && a1.y < b1.y + b2.y;
const randomColor = () => `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
const pointOverlap = (p1, p2, a1, a2, b1, b2) => p1 > min(a1, b1) && p1 < max(a1, b1) && p2 > min(a2, b2) && p2 < max(a2, b2);
const dist = (a1, a2, b1, b2) => Math.sqrt(pow(b1 - a1, 2) + pow(b2 - a2, 2))

function rayRectCollision(o, d, b, bs){
    if(d.x == 0 || d.y == 0) return false;

    let cn = new V2(), cp = new V2();
    let id = new V2(1/d.x, 1/d.y);
    let tn = b.clone().subtract(o); tn = new V2(tn.x * id.x, tn.y * id.y);
    let tf = b.clone().add(bs.x, bs.y).subtract(o); tf = new V2(tf.x * id.x, tf.y * id.y);
    let temp;

    if(tn.y == "Infinity" || tn.x == "Infinity") return false;
    if(tf.y == "Infinity" || tf.x == "Infinity") return false;
    if(tn.x > tf.x) { temp = tn.x; tn.x = tf.x; tf.x = temp; }
    if(tn.y > tf.y) { temp = tn.y; tn.y = tf.y; tf.y = temp; }
    if(tn.x > tf.y || tn.y > tf.x) return false;

    let thn = Math.max(tn.x, tn.y);
    let thf = Math.min(tf.x, tf.y);

    if(thf < 0) return false;

    cp = o.clone().add(d.clone().multiply(thn));

    if(tn.x > tn.y){
        if(id.x < 0) cn = new V2(1, 0);
        else cn = new V2(-1, 0);
    }
    else if(tn.x < tn.y){
        if(id.y < 0) cn = new V2(0, 1);
        else cn = new V2(0, -1);
    }
    return { point: cp, normal: cn, time: thn };
}

function noise1d(size, seed, octaves, bias){
    let noise = new Array(size);
    let min = 1, max = 0;
    for(let i = 0; i < size; i++){
        let amplitude = 1;
        let noiseVal = 0;
        let maxVal = 0;
        for(let j = 0; j < octaves; j++){

            let pitch = Math.floor(size / Math.pow(2, j)); pitch = pitch == 0 ? 1 : pitch;
            let sample1 = Math.floor(i / pitch) * pitch;
            let sample2 = (sample1 + pitch) % size;
            let blend = (i - sample1) / pitch;
            let sample = (1 - blend) * seed[sample1] + blend * seed[sample2];

            maxVal += amplitude;
            noiseVal += sample * amplitude;
            amplitude /= bias;
        }
        noise[i] = noiseVal / maxVal;

        if(noise[i] < min) min = noise[i];
        if(noise[i] > max) max = noise[i];
    }

    for(let i = 0; i < size; i++){
        noise[i] = (noise[i] - min) / (max - min);
    }
    return noise;
}

const insertionSort = (input, center) => {
	let arr = cloneArray(input);
	if(arr.length <= 1) return arr;
	
	for(let i = 1; i < arr.length; i++){
		let j = i;
		let e = arr[i];

		while(j > 0 && arr[i-1] > e){
			arr[j] = arr[j-1];
			j--;
		}
		arr[j] = e;
	}
	return arr;
}

const bubbleSort = input => {
	let arr = clone(input);
	if(arr.length <= 1) return arr;
	
	for(let j = 0; j < arr.length-1; j++){
		for(let i = 1; i < arr.length; i++){
			let a = arr[i-1], b = arr[i];
			arr[i-1] = a > b ? b : a;
			arr[i]   = a > b ? a : b;
		}
	}
	
	return arr;
}

const binarySearch = (a,t,n,x) => {
	let m=n+Math.floor((x-n)/2);
	return x >= n ? a[m] == t ? m : a[m] > t ?binarySearch(a, t, n, m-1) : binarySearch(a, t, m+1, x): -1;
}