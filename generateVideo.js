import {generateTestImage} from './generateImage.js';

import exifr from './node_modules/exifr/dist/full.esm.js';


let height_16bit = 240;
let width_16bit = 240;
let movieFrames = 1;
let icc = "00000223694343504943432050726f66696c65000028919d52bf6fd340187dc1408bc850894a2c0cae5416a89390060660a009a5027530a6ad80051cc7f98162e7643baadaad42483081c45f000b0b452cec1d100bdd908001212121c1c086c482aae3ddb921495b16ee93fdbd7bf7f9dde7770718df5d21dafb0b40102691335736afdfb8698e7c8381511c818583ae178b19db9e07472f0f8f5fef9151f99da5b4be5cbd7b34ffe2e152e1c3e6eae25ae1d9eefaa191adf9b10764c689e73d1125c4b789ede54428fc92783c6253c4af156ea4f8a3c2d514ffd0350b4e05d8a734c7bca65b231e239ef29a51407c9e78b216848aa77ee67e75a0be31808376d7dbee4dfd55d60f17af31d3211c83031f1e8a9ca9c7e2accdf0899650e2bb8153e47368b18a2affd02a69ad0a3a105841c4ea069a486062868cd08a262e23a4460e53c4e98ed3ea6c767adee79edf01e63a52cab53e77a245fe2b30b2dee74c0338bc0ebc95c28ddcbf2741bdb83e5d4c71b60c1cf82ce5cfe3fcf631b0f548cadf4fa4dc7a0a189f808d30f595c350af5717802b1bc0c97bc0e62160e201f778b3f7ff67da7b78691237e94507015c7aa11c6ce9ec23e66a7d7bcdd44e257429c659e419cb3a72babaab734894478dd5316eb1b28b2ae7e9ba459dbc765e7111d505b343dec12c6ce63216a85264947086f3a27e0a3c59856c5cc425e659d608ee51c7b9ffee29d20e0c77d6e3aababed75765a0afdeddebf7755adf3a8b376682b1bb43fc019d3faf5f857fe73d";


function applyPQTransferFunction(data,width_16bit,height_16bit) {
    const c1 = 0.8359375;
    const c2 = 18.8515625;
    const c3 = 0.1593017578125;
    const c4 = 18.6875;
    const c5 = 78.84375;
    let i = 0
    let j = 0
    let new_data = new Uint16Array(width_16bit * height_16bit * 3);
    for (let y = 0; y < height_16bit; y++){
        for (let x = 0; x < width_16bit; x++) {
            const r = data[i++] / 65535;
            const g = data[i++] / 65535;
            const b = data[i++] / 65535;
    
            const rPQ = ((c1 + c2 * (r ** c3)) / (1 + c4 * (r ** c3))) ** c5;
            const gPQ = ((c1 + c2 * (g ** c3)) / (1 + c4 * (g ** c3))) ** c5;
            const bPQ = ((c1 + c2 * (b ** c3)) / (1 + c4 * (b ** c3))) ** c5;

            new_data[j++] = Math.round(rPQ * 65535);
            new_data[j++] = Math.round(gPQ * 65535);
            new_data[j++] = Math.round(bPQ * 65535);
        }
    }
  
    return new_data;
}

function _base64ToArrayBuffer(base64) {
  var binary_string = atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}

function _base64ToHex(str) {
    const raw = atob(str);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += (hex.length === 2 ? hex : '0' + hex);
    }
    return result.toUpperCase();
  }

function _hexToBase64(hexstring) {
    return btoa(hexstring.match(/\w{2}/g).map(function(a) {
        return String.fromCharCode(parseInt(a, 16));
    }).join(""));
}

function add_icc_profile(image){
    let b64string = image.toBase64();
    let hexString = _base64ToHex(b64string);
    let new_hex_string = hexString.substring(0, 66) + icc + hexString.substring(66);


    let base64String = _hexToBase64(new_hex_string);
    let new_image = _base64ToArrayBuffer(base64String);
    return [base64String,new_image];
}

let uIntArray_16bit = [];
for (let t = 0; t < movieFrames; t++) {
    let data = generateTestImage(width_16bit,height_16bit);
    let pq_data = applyPQTransferFunction(data,width_16bit,height_16bit);

    var image = new IJS.Image(width_16bit, height_16bit, data, {
        kind: "RGB",
        bitDepth: 16,
      });

    var pq_image = new IJS.Image(width_16bit, height_16bit, pq_data, {
        kind: "RGB",
        bitDepth: 16,
      });

    // Normal generated image 
    let img = document.getElementById('image');
    img.src = image.toDataURL();

    // Normal iamge with ICC
    let [base64String,new_image] = add_icc_profile(image)
    uIntArray_16bit.push(new_image);
    let new_image_html = document.getElementById('new_image');
    new_image_html.src = 'data:image/png;base64,' + base64String;

    // PQ image without ICC
    let pq_image_icc_html = document.getElementById('pq_image_icc');
    pq_image_icc_html.src = pq_image.toDataURL();

    // PQ image with ICC
    let [pqbase64String,pqnew_image] = add_icc_profile(pq_image)

    let pq_image_html = document.getElementById('pq_image');
    pq_image_html.src = 'data:image/png;base64,' + pqbase64String;


}

const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });
let movieHz = 1;
await ffmpeg.load();
let countImages16 = uIntArray_16bit.length;
for (let i = 0; i < countImages16; i += 1) {
    var num = `newfile${i}`;
    ffmpeg.FS("writeFile", `tmp${num}.png`, uIntArray_16bit[i]);
}

await ffmpeg.run(
    "-pattern_type",
    "glob",
    "-framerate",
    String(movieHz),
    "-i",
    "tmp*.png",
    "-tag:v",
    "hvc1",
    "-c:v",
    "libx265",
    "-qp",
    "0",
    "-color_range",
    "tv",
    "-color_trc",
    "linear",
    "-color_primaries",
    "bt2020",
    "-colorspace",
    "bt2020nc",
    "-pix_fmt",
    "yuv444p10le",
    "out16PQ.mp4"
);
await ffmpeg.run(
    "-pattern_type",
    "glob",
    "-framerate",
    String(movieHz),
    "-i",
    "tmp*.png",
    "-tag:v",
    "avc1",
    "-c:v",
    "libx264",
    "-qp",
    "0",
    "-color_range",
    "tv",
    "-color_trc",
    "linear",
    "-color_primaries",
    "bt2020",
    "-colorspace",
    "bt2020nc",
    "-pix_fmt",
    "yuv444p10le",
    "out16Linear.mp4"
);
const data16PQ = ffmpeg.FS("readFile", "out16PQ.mp4");
const data16Linear = ffmpeg.FS("readFile", "out16Linear.mp4");

for (let i = 0; i < countImages16; i += 1) {
    var num = `newfile${i}`;
    ffmpeg.FS("unlink", `tmp${num}.png`);
}

ffmpeg.FS("unlink", "out16PQ.mp4");
ffmpeg.FS("unlink", "out16Linear.mp4");

await ffmpeg.exit();
let videoBlob_16PQ = URL.createObjectURL(
    new Blob([data16PQ.buffer], { type: "video/mp4" })
);
let videoBlob_16Linear = URL.createObjectURL(
    new Blob([data16Linear.buffer], { type: "video/mp4" })
);
document.getElementById('video_16_PQ').src = videoBlob_16PQ;
document.getElementById('video_16_Linear').src = videoBlob_16Linear;

exifr.parse(image.toDataURL(), {tiff: false, icc: true}).then(console.log)