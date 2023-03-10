// var imageNit = new Array(width_16bit).fill(0).map(
//     () => new Array(height_16bit).fill(0).map(
//         () => new Array(movieFrames).fill(0)));
    
// for (let k = 0; k < movieFrames; k++){
//     for (let j = 0; j < height; j++) {
//         let cnt = 65535
//         for (let i = 0; i < width; i++) {
//             imageNit[i][j][k] = cnt;
//             cnt -= 65
//         }
//     }
// }

// import {im_ctrans} from './hdr_color.js';




export function generateTestImage(width_16bit,height_16bit){
// module.exports = function (width_16bit,height_16bit){
    let i = 0;
    let data = new Uint16Array(width_16bit * height_16bit * 3);
    let full = 65535;
    for (let y = 1; y <= height_16bit; y++) {
        let curr_width = width_16bit/4;
        for (let x = 0; x < width_16bit/4; x++) {
            // data[i++] = imageNit[x][y][t];
            // data[i++] = imageNit[x][y][t];
            // data[i++] = imageNit[x][y][t];
            // total = 65535 height = 0 -> 65535/2; height = height -> 65535
            if(y%2 != 0){
                if(x>=0 && x<curr_width/8){
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=curr_width/8 && x<2*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=2*curr_width/8 && x<3*curr_width/8){
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=3*curr_width/8 && x<4*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=4*curr_width/8 && x<5*curr_width/8){
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=5*curr_width/8 && x<6*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=6*curr_width/8 && x<7*curr_width/8){
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=7*curr_width/8 && x<8*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
            }
            else{
                if(x>=0 && x<curr_width/8){
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=curr_width/8 && x<2*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=2*curr_width/8 && x<3*curr_width/8){
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=3*curr_width/8 && x<4*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=4*curr_width/8 && x<5*curr_width/8){
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=5*curr_width/8 && x<6*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=6*curr_width/8 && x<7*curr_width/8){
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=7*curr_width/8 && x<8*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = 0;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
            }
        }
        curr_width = width_16bit/4;
        for (let x = width_16bit/4; x < width_16bit/2; x++) {
            if(y%2 == 0){
                if(x>=width_16bit/4 && x<width_16bit/4 + curr_width/8){
                    data[i++] = 0;
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4 + curr_width/8 && x<width_16bit/4+2*curr_width/8){
                    data[i++] = 0;
                    data[i++] = full/2;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4 + 2*curr_width/8 && x<width_16bit/4+3*curr_width/8){
                    data[i++] = 0;
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4+3*curr_width/8 && x<width_16bit/4+4*curr_width/8){
                    data[i++] = 0;
                    data[i++] = full/2;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4+4*curr_width/8 && x<width_16bit/4+5*curr_width/8){
                    data[i++] = 0;
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4+5*curr_width/8 && x<width_16bit/4+6*curr_width/8){
                    data[i++] = 0;
                    data[i++] = full/2;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4+6*curr_width/8 && x<width_16bit/4+7*curr_width/8){
                    data[i++] = 0;
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4+7*curr_width/8 && x<width_16bit/4+8*curr_width/8){
                    data[i++] = 0;
                    data[i++] = full/2;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
            }
            else{
                if(x>=width_16bit/4 && x<width_16bit/4 + curr_width/8){
                    data[i++] = 0;
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4 + curr_width/8 && x<width_16bit/4+2*curr_width/8){
                    data[i++] = 0;
                    data[i++] = full/2;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4 + 2*curr_width/8 && x<width_16bit/4+3*curr_width/8){
                    data[i++] = 0;
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4+3*curr_width/8 && x<width_16bit/4+4*curr_width/8){
                    data[i++] = 0;
                    data[i++] = full/2;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4+4*curr_width/8 && x<width_16bit/4+5*curr_width/8){
                    data[i++] = 0;
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4+5*curr_width/8 && x<width_16bit/4+6*curr_width/8){
                    data[i++] = 0;
                    data[i++] = full/2;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4+6*curr_width/8 && x<width_16bit/4+7*curr_width/8){
                    data[i++] = 0;
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/4+7*curr_width/8 && x<width_16bit/4+8*curr_width/8){
                    data[i++] = 0;
                    data[i++] = full/2;
                    data[i++] = 0;
                    // data[i++] = 65535;
                }
            }
        }
        curr_width = width_16bit/4;
        for (let x = width_16bit/2; x < 3*width_16bit/4; x++) {
            if(y%2 == 0){
                if(x>=width_16bit/2 && x<width_16bit/2 + curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2 + curr_width/8 && x<width_16bit/2+2*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2 + 2*curr_width/8 && x<width_16bit/2+3*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2+3*curr_width/8 && x<width_16bit/2+4*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2+4*curr_width/8 && x<width_16bit/2+5*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2+5*curr_width/8 && x<width_16bit/2+6*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2+6*curr_width/8 && x<width_16bit/2+7*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2+7*curr_width/8 && x<width_16bit/2+8*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
            }
            else{
                if(x>=width_16bit/2 && x<width_16bit/2 + curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = (full/2)*y/height_16bit;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2 + curr_width/8 && x<width_16bit/2+2*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2 + 2*curr_width/8 && x<width_16bit/2+3*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = (full/2)*y/height_16bit;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2+3*curr_width/8 && x<width_16bit/2+4*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2+4*curr_width/8 && x<width_16bit/2+5*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = (full/2)*y/height_16bit;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2+5*curr_width/8 && x<width_16bit/2+6*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2+6*curr_width/8 && x<width_16bit/2+7*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = (full/2)*y/height_16bit;
                    // data[i++] = 65535;
                }
                else if(x>=width_16bit/2+7*curr_width/8 && x<width_16bit/2+8*curr_width/8){
                    data[i++] = 0;
                    data[i++] = 0;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
            }
        }
        curr_width = width_16bit/4;
        for (let x = 3*width_16bit/4; x < width_16bit; x++) {
            if(y%2 == 0){
                if(x>=3*width_16bit/4 && x<3*width_16bit/4 + curr_width/8){
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + curr_width/8 && x<3*width_16bit/4+2*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = full/2;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 2*curr_width/8 && x<3*width_16bit/4+3*curr_width/8){
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 3*curr_width/8 && x<3*width_16bit/4 + 4*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = full/2;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 4*curr_width/8 && x<3*width_16bit/4 + 5*curr_width/8){
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 5*curr_width/8 && x<3*width_16bit/4 + 6*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = full/2;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 6*curr_width/8 && x<3*width_16bit/4 + 7*curr_width/8){
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    data[i++] = full - ((full/2)*(y/height_16bit));
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 7*curr_width/8 && x<3*width_16bit/4 + 8*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = full/2;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
            }
            else{
                if(x>=3*width_16bit/4 && x<3*width_16bit/4 + curr_width/8){
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = (full/2)*y/height_16bit;
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + curr_width/8 && x<3*width_16bit/4+2*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = full/2;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 2*curr_width/8 && x<3*width_16bit/4 + 3*curr_width/8){
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = (full/2)*y/height_16bit;
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 3*curr_width/8 && x<3*width_16bit/4 + 4*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = full/2;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 4*curr_width/8 && x<3*width_16bit/4 + 5*curr_width/8){
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = (full/2)*y/height_16bit;
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 5*curr_width/8 && x<3*width_16bit/4 + 6*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = full/2;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 6*curr_width/8 && x<3*width_16bit/4 + 7*curr_width/8){
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = (full/2)*y/height_16bit;
                    data[i++] = (full/2)*y/height_16bit;
                    // data[i++] = 65535;
                }
                else if(x>=3*width_16bit/4 + 7*curr_width/8 && x<3*width_16bit/4 + 8*curr_width/8){
                    data[i++] = full/2;
                    data[i++] = full/2;
                    data[i++] = full/2;
                    // data[i++] = 65535;
                }
            }
        }
    }
    return data;
}