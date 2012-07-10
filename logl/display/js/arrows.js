// Copyright 2009-2012 10gen, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


one_arrow = function(x1, y1, x2, y2, ctx) {

    dx = Math.abs(x2 - x1);
    dy = Math.abs(y2 - y1);

    console.log("dx: ");
    console.log(dx);
    console.log("dy: ");
    console.log(dy);

    console.log("Original values: ");
    console.log(x1, x2, y1, y2);

    cx = x1 + dx/2 - dy/4;
    cy = y1 + dy/2 + dx/4;

    
    //ctx.quadraticCurveTo(cx, cy, x2, y2);

    var h = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    console.log("h: ");
    console.log(h);
    var h_prime = 30.0000;
    console.log("h_prime: ");
    console.log(h_prime);
    var ratio = h_prime / h;
    console.log("ratio: ");
    console.log(ratio);
    var x_difference, y_difference;

    x_difference = dx * ratio;
    y_difference = dy * ratio;

    console.log("X, Y, Differences");
    console.log(x_difference, y_difference);


    //There are 4 cases for the adjustments that need to be made. Arrows going in each diagonal dirrection.
    if (x2 > x1) {
        if (y2 > y1) { //Case where arrow originates on the bottom left and goes toward the bottom right.
            x1 += x_difference;
            y1 += y_difference;

            x2 -= x_difference;
            y2 -= y_difference;
        }
        else { //Case where arrow originates on the top left and goes toward the bottom right.
            x1 += x_difference;
            y1 -= y_difference;

            x2 -= x_difference;
            y2 += y_difference;
        }
    }
    else {
        if (y2 > y1) { //Case where arrow originates on the bottom right and goes towards the top left
            x1 -= x_difference;
            y1 += y_difference;

            x2 += x_difference;
            y2 -= y_difference;
        }
        else {
            x1 -= x_difference;
            y1 -= y_difference;

            x2 += x_difference;
            y2 += y_difference;
        }
    }
    console.log("New values: ");
    console.log(x1, x2, y1, y2);

    ctx.moveTo(x1, y1);
    ctx.lineWidth = 2;
    ctx.lineTo(x2, y2);
    ctx.stroke();

    /*
    // adapted from http://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
    var headlen = 20;   // length of head in pixels
    var angle = Math.atan2(y2 - y1,x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2-headlen*Math.cos(angle),y2-headlen*Math.sin(angle));
    ctx.lineTo(x2-headlen*Math.cos(angle),y2-headlen*Math.sin(angle));
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.fill();*/
};
