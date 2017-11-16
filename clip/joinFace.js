#!/usr/bin/env node

// This was supposed to just be a function to join a face,
// but I can't seem to dump that out without getting it weirdly retessellated.
// So, added the extrusion and subtraction here too.

let CHECK = function(cond) {
  if (arguments.length !== 1) {
    throw new Error("bad CHECK");
  }
  if (cond !== true) {
    throw new Error("CHECK failed");
  }
};

if (process.argv.length < 3) {
  process.stderr.write("Usage: joinFace.js inputFileName.stl -o [outputFormat:]outputFileName.amf (or whatever)\n");
  process.exit(1);
}

const getCommonArgs = require('./getCommonArgs');
let [inputFileName, outputFormat, outputFileName] = getCommonArgs(process.argv);

const jscad = require('@jscad/openjscad');
const csg = require('@jscad/csg').CSG;
const cag = require('@jscad/csg').CAG;
const scad_api = require('@jscad/scad-api');

const fs = require('fs')

const getCompilable = require('./getCompilable.js');
const compilable = getCompilable(inputFileName, /*verboseLevel=*/1);
process.stderr.write("compilable = "+JSON.stringify(compilable)+"\n");

jscad.compile(compilable, {}).then(compiled => {
  //process.stderr.write("compiled = "+JSON.stringify(compiled)+"\n");
  //process.stderr.write("csg.cube() = "+JSON.stringify(csg.cube())+"\n");
  console.assert(compiled.length === 1);

  let answer = compiled[0];
  process.stderr.write("answer = "+JSON.stringify(answer)+"\n");

  if (true) {
    // Note that running openjscad `foo.stl -o bar.jscad`
    // produces a .jscad file with a nice spec: an array of points,
    // and an array of polygons indexing into the points.
    // But even if our input was that .jscad file, we've now been converted
    // into something more obfuscated.  But, we can convert back, I think.

    let spec;
    {
      let spec_points = [];
      let spec_polygons = [];
      for (let polygon of answer.polygons) {
        process.stderr.write("          polygon = "+JSON.stringify(polygon)+"\n");
        // seems to have: vertices, shared, plane.  ignore shared and plane for now.
        let spec_polygon = []
        for (let vertex of polygon.vertices) {
          let pos = vertex.pos;
          let x = pos._x;
          let y = pos._y;
          let z = pos._z;
          spec_polygon.push(spec_points.length);
          spec_points.push([x,y,z]);
        }
        spec_polygons.push(spec_polygon);
      }
      spec = {points: spec_points, polygons: spec_polygons};
    }


    // Input must consist of triangles that form a single face.
    let joinVerts = (pointsIn,polygonsIn) => {
      process.stderr.write("      joining verts...\n");
      process.stderr.write("        polygonsIn.length = "+polygonsIn.length);
      let pointsOut = [];
      let polygonsOut = [];
      let in2out = {};
      for (let polygonIn of polygonsIn) {
        let polygonOut = [];
        for (let iVertIn of polygonIn) {
          let pointIn = pointsIn[iVertIn];
          let key = pointIn[0]+' '+pointIn[1]+' '+pointIn[2];
          let iVertOut = in2out[key];
          if (iVertOut === undefined) {
            in2out[key] = iVertOut = pointsOut.length;
            pointsOut.push(pointIn);
          }
          polygonOut.push(iVertOut);
        }
        polygonsOut.push(polygonOut);
      }
      process.stderr.write("        polygonsOut.length = "+polygonsOut.length+"\n");
      process.stderr.write("      done joining verts.\n");
      return [pointsOut,polygonsOut];
    };  // joinVerts

    let joinPolygons = (polygonsIn) => {
      let verboseLevel = 2;
      if (verboseLevel >= 1) process.stderr.write("      joining polygons...\n");
      if (verboseLevel >= 1) process.stderr.write("        polygonsIn.length = "+polygonsIn.length+"\n");
      let polygonsOut = polygonsIn.slice();
      while (true) {
        let didSomething = false;
        // Find two polygons that share a common edge, and join them.
        for (let i = 0; !didSomething && i < polygonsOut.length; ++i) {
          for (let ii = 0; !didSomething && ii < polygonsOut[i].length; ++ii) {
            for (let j = 0; !didSomething && j < polygonsOut.length; ++j) {
              for (let jj = 0; !didSomething && jj < polygonsOut[j].length; ++jj) {
                if (polygonsOut[i][ii] == polygonsOut[j][(jj+1)%polygonsOut[j].length]
                 && polygonsOut[i][(ii+1)%polygonsOut[i].length] == polygonsOut[j][jj]) {
                   if (verboseLevel >= 2) process.stderr.write("          joining "+i+":"+ii+" with "+j+":"+jj+"\n");
                   if (verboseLevel >= 2) process.stderr.write("              i="+i+": "+JSON.stringify(polygonsOut[i])+"\n");
                   if (verboseLevel >= 2) process.stderr.write("              j="+j+": "+JSON.stringify(polygonsOut[j])+"\n");
                   CHECK(i !== j);
                   CHECK(i < j);

                   // The joined polygon is:
                   //   polygonsOut[i] up to i
                   //   [i][ii] = [j][jj+1]
                   //   polygonsOut[j] after jj+1
                   //   polygonsOut[j] up to jj
                   //   [j][jj] = [i][ii+1]
                   //   polygonsOut[i] after ii+1

                   let joined = [];
                   if (jj == polygonsOut[j].length-1) {
                     for (let ind = 1; ind < polygonsOut[j].length; ++ind) joined.push(polygonsOut[j][ind]);
                   } else {
                     for (let ind = jj+2; ind < polygonsOut[j].length; ++ind) joined.push(polygonsOut[j][ind]);
                     for (let ind = 0; ind < jj+1; ++ind) joined.push(polygonsOut[j][ind]);
                   }
                   if (ii == polygonsOut[i].length-1) {
                     for (let ind = 1; ind < polygonsOut[i].length; ++ind) joined.push(polygonsOut[i][ind]);
                   } else {
                     for (let ind = ii+2; ind < polygonsOut[i].length; ++ind) joined.push(polygonsOut[i][ind]);
                     for (let ind = 0; ind < ii+1; ++ind) joined.push(polygonsOut[i][ind]);
                    }

                   if (verboseLevel >= 2) process.stderr.write("              joined = "+JSON.stringify(joined)+"\n");

                   polygonsOut[i] = joined;
                   polygonsOut[j] = polygonsOut[polygonsOut.length-1];
                   polygonsOut.pop();

                   didSomething = true;
                }
              }
            }
          }
        }
        if (!didSomething) break;
      }
      if (verboseLevel >= 1) process.stderr.write("        polygonsOut.length = "+polygonsOut.length+"\n");
      if (verboseLevel >= 1) process.stderr.write("      done.\n");
      return polygonsOut;
    };  // joinPolygons

    if (true) {
      [spec.points,spec.polygons] = joinVerts(spec.points, spec.polygons);
      spec.polygons = joinPolygons(spec.polygons);
    }

    process.stderr.write("final joined spec = "+JSON.stringify(spec)+"\n");
    process.stderr.write("spec.points.length = "+spec.points.length+"\n");
    process.stderr.write("spec.polygons.length = "+spec.polygons.length+"\n");


    if (spec.polygons.length === 1) {
      process.stderr.write("Hooray! a single polygon! Untangling it.\n");
      spec.points = spec.polygons[0].map(i => spec.points[i]);
      let xrange = n => {
        let answer = [];
        for (let i = 0; i < n; ++i) {
          answer.push(i);
        }
        return answer;
      };
      spec.polygons[0] = xrange(spec.polygons[0].length);
      process.stderr.write("    done.\n");

      if (true) {
        for (let iPass = 0; iPass < 2; ++iPass) {
          // Find the single vertex who has the largest sum-of-incident-edge-lengths,
          // and make that vertex 0.
          let indexOfMaxSum = -1;
          let maxSum = -1.;
          let n = spec.points.length;
          let sqr = x => x*x;
          let dist = (a,b) => Math.sqrt(sqr(b[0]-a[0]) + sqr(b[1]-a[1]) + sqr(b[2]-a[2]));
          for (let i = 0; i < n; ++i) {
            let d0 = dist(spec.points[(i-1+n)%n], spec.points[i]);
            let d1 = dist(spec.points[i], spec.points[(i+1)%n]);
            let sum = d0 + d1;
            if (sum > maxSum) {
              indexOfMaxSum = i;
              maxSum = sum;
            }
          }
          process.stderr.write("max sum = "+maxSum+" at "+indexOfMaxSum+"\n");
          spec.points = spec.points.slice(indexOfMaxSum).concat(spec.points.slice(0,indexOfMaxSum));

          if (iPass == 1) console.assert(indexOfMaxSum === 0);
        }
      }

      if (true) {
        // Print out radii.
        // Circumradius of a triangle formed by 2 vectors and the origin is:
        // ||a||||b||||a-b||/(2*||axb||)

        let n = spec.points.length;
        let len2 = v => (v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
        let len = v => Math.sqrt(len2(v));
        let vmv = (a,b) => [a[0]-b[0], a[1]-b[1], a[2]-b[2]];
        let dist2 = (a,b) => len2(vmv(a,b))
        let dist = (a,b) => len(vmv(a,b))
        let vxv = (a,b) => [
          a[1]*b[2]-a[2]*b[1],
          a[2]*b[0]-a[0]*b[2],
          a[0]*b[1]-a[1]*b[0],
        ];
        for (let i = 0; i < n; ++i) {
          let a = spec.points[(i-1+n)%n];
          let b = spec.points[i];
          let c = spec.points[(i+1)%n];
          a = vmv(a, c);
          b = vmv(b, c);
          let circumRadius = Math.sqrt(len2(a)*len2(b)*dist2(a,b)) / (2*len(vxv(a,b)));
          process.stderr.write("      i="+i+": circumRadius="+circumRadius+"\n");
          process.stderr.write("                              edge length = "+len(b)+"\n");
        }
      }
    } else {
      process.stderr.write("Boo! "+spec.polygons.length+" polygons! Can't untangle.\n");
    }

    if (false) {
      // strange, inside a jscad program, polyhedron() takes a spec with "points" and "polygons".
      // but csg.polyhedron() seems to require "faces".
      //answer = csg.polyhedron(spec.points, spec.polygons);
      answer = csg.polyhedron({points:spec.points, faces:spec.polygons});
      process.stderr.write("result of csg.polyhedron = "+JSON.stringify(answer));
    } else {
      const pgon = cag.fromPoints(spec.points);  // inside a .jscad, this is called polygon()
      let heightOfTheExtrusion = 2.5; // in the z direction

      //answer = linear_extrude({height: heightOfTheExtrusion}, pgon); // this is what works inside jscad. but outside jscad, height isn't the right thing!
      answer = pgon.extrude({offset: [0,0,heightOfTheExtrusion]}); // this is what works outside .jscad

      if (true) {
        // want heights (bottom, shelf, top): 2.6, 3.4, 5.1
        // so made extrusion height 5.1-2.6 = 2.5
        // and subtract something whose top is 3.4.
        answer = answer.translate([0,0,2.6]);
        //let knife = cube({size:20}).rotateZ(45).translate([0,0,-20+3.4]);  // this is what it is in jscad.  But outside jscad, I have the impression (1) size isn't understood, (2) it's centered by default, (3) its radius is 1 by default (i.e. size is 2), (3) setting center:true or center:false causes it to run out of memory or go crazy.
        let knife = csg.cube().translate([1,1,1]).scale(10).rotateZ(45).translate([0,0,-20+3.4]);

        //knife = cube().subtract(cube());  // empty csg


        if (false) {
          //answer = csg.cube({center:false});
          answer = csg.cube({center:true}).translate([1,1,1]);
        }
        if (false) {
          process.stderr.write("Unioning with cube ...\n");
          answer = answer.union(knife);
          process.stderr.write("    done.\n");
        }
        if (true) {
          process.stderr.write("Subtracting cube ...\n");
          answer = answer.subtract(knife);
          process.stderr.write("    done.\n");
        }

        // Interesting-- when we do this,
        // it adds a whole bunch of useless verts... same useless verts I was getting previously.
        // In fact it happens even if I subtract an empty csg.
      }

      if (true) {
        answer = answer.translate([-9.5,-9.5,0]);
      }

      if (true) {
        answer = answer.union(answer.rotateZ(180).setColor([1,.5,0,.5]));
        //answer = answer.intersect(answer.rotateZ(180).setColor([1,.5,0,.5]));
      }

    }
  }

  // (The following turns out to be futile if we did csg operations, anyway)
  // This is the only way I know of to prevent weird retesselation, at the moment.
  // And, the colors have to be *different*; if they are all the same, its the same as doing nothing... apparently.
  if (false) {
    for (let i = 0; i < answer.polygons.length; ++i) {
      answer.polygons[i].setColor([1-i/answer.polygons.length,0,i/answer.polygons.length,1]);
      //answer.polygons[i].setColor([1,.5,0,1]);
    }
  }
  if (false) {
    // Randomly colorize in place.
    process.stderr.write("Randomly colorizing it ...\n");
    for (let polygon of answer.polygons) {
      polygon.setColor([Math.random(),Math.random(),Math.random(),1]);
      //polygon.setColor([1,.5,0,1]);
    }
    process.stderr.write("    done.\n");
  }

  // XXX TODO: if result is empty, then jscad.generateOutput gives the following error.  handle it? report bug?
  //   (node:90955) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): TypeError: cag._toCSGWall is not a function
  // XXX TODO: converting to jscad produces empty output??

  process.stderr.write("Generating format "+outputFormat+" output ...\n");
  const outputData = jscad.generateOutput(outputFormat, answer);
  process.stderr.write("    done.\n");
  process.stderr.write("outputData.asBuffer().length = "+JSON.stringify(outputData.asBuffer().length)+"\n");
  console.assert(outputData.asBuffer().length > 0);
  if (outputFileName === '-') {
    process.stderr.write("Writing output to standard output ...\n");
    process.stdout.write(outputData.asBuffer());
    process.stderr.write("    done.\n");
  } else {
    process.stderr.write("Writing output to file "+outputFileName+" ...\n");
    fs.writeFileSync(outputFileName, outputData.asBuffer());
    process.stderr.write("    done.\n");
  }
}).catch(reason => {
  console.error("Oh no! Caught: "+reason);
});
