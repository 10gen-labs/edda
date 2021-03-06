// Copyright 2014 MongoDB, Inc.
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

/*
 * Draw an arrow going from (x1, y1) to (x2, y2).
 */
var drawOneArrow = function(x1, y1, x2, y2, ctx) {
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var line_length = Math.sqrt(dx*dx + dy*dy);
    var ratio = .75;

    // move endpoints in along axis
    var x_difference = dx * ratio;
    var y_difference = dy * ratio;

    // TODO: a better way of doing this.
    if (line_length < 100) {
        x_difference = dx * .8;
        y_difference = dy * .8;
    }

    // There are 4 cases for the adjustments that need to be made.
    // Arrows going in each diagonal dirrection.
    if (x2 > x1) {
        if (y2 > y1) {
            // Case where arrow originates on the
            // bottom left and goes toward the bottom right.
            x1 += x_difference;
            y1 += y_difference;

            x2 -= x_difference;
            y2 -= y_difference;
        }
        else {
            // Case where arrow originates on the
            // top left and goes toward the bottom right.
            x1 += x_difference;
            y1 -= y_difference;

            x2 -= x_difference;
            y2 += y_difference;
        }
    }
    else {
        if (y2 > y1) {
            // Case where arrow originates on the
            // bottom right and goes towards the top left
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

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.strokeStyle = "#F0E92F";
    ctx.lineWidth = 3;
    ctx.lineTo(x2, y2);
    ctx.lineCap = "butt";
    ctx.stroke();
    drawArrowHead(x1, x2, y1, y2, ctx);
};

/*
 * Render an arrowhhead with its forward tip at (tox, toy) along an
 * axis that goes from (fromx, fromy) to (tox, toy).
 */
var drawArrowHead = function (fromx, tox, fromy, toy, ctx) {
     // adapted from http://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
    ctx.beginPath();

    var headlen = ICON_RADIUS < 18 ? 8 : 20;   // length of arrow head in pixels
    var angle = Math.atan2(toy - fromy, tox - fromx);

    ctx.strokeStyle = "#F0E92F";
    ctx.fillStyle = "#F0E92F";
    ctx.lineWidth = 4;

    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen*Math.cos(angle-Math.PI/8),
               toy - headlen*Math.sin(angle-Math.PI/8));
    ctx.lineTo(tox - headlen*Math.cos(angle+Math.PI/8),
               toy - headlen*Math.sin(angle+Math.PI/8));
    ctx.lineTo(tox, toy);
    ctx.stroke();
    ctx.fill();
};
