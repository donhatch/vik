#!/usr/bin/env node

// ./clipify.js vik.jscad clip/2x2x2x2Unit-03.00.clip.centered.floored.amf -o RMME.amf
// Note that converting to vik.jscad.amf or something first does not work :-( it runs out of memory trying to union

if (process.argv.length < 3) {
  process.stderr.write("Usage: clipify.js inputFileName.stl clipFileName.stl -o [outputFormat:]outputFileName.amf (or whatever)\n");
  process.exit(1);
}

const getCommonArgs = require('./clip/getCommonArgs');
let [inputFileNames, outputFormat, outputFileName] = getCommonArgs(process.argv, 2, 2);
let [inputFileName, clipFileName] = inputFileNames;

if (outputFormat === 'stl' || outputFormat === 'stla' || outputFormat === 'stlb') {
  console.error("ERROR: stl output does not support colors (use amf or something)");
  process.exit(1);
}

const jscad = require('@jscad/openjscad');
const csg = require('@jscad/csg').CSG;
const fs = require('fs')

const getCompilable = require('./clip/getCompilable.js');
const compilable = getCompilable(inputFileName, /*verboseLevel=*/1);
const compilableClip = getCompilable(clipFileName, /*verboseLevel=*/1);

Promise.all([jscad.compile(compilable, {}), jscad.compile(compilableClip, {})]).then(compiled_and_compiledClip => {
  let [compiled, compiledClip] = compiled_and_compiledClip;
  //process.stderr.write("compiled = "+JSON.stringify(compiled)+"\n");
  //process.stderr.write("csg.cube() = "+JSON.stringify(csg.cube())+"\n");
  console.assert(compiled.length === 1);
  console.assert(compiledClip.length === 1);

  let answer = compiled[0];
  //process.stderr.write("answer = "+JSON.stringify(answer)+"\n");

  let clip = compiledClip[0];

  let modelWidth = 20; // hard-coded in vik.jscad
  let t = modelWidth * Math.sqrt(.5);  // modelWidth=20 -> t=14.142135623730951
  if (true) {  // TODO: the above isn't quite right, so fudge it.  TODO: figure out what the hell modelWidth meant.  OH I see, it empirically fitted it.
     // just happens to be the amount vik.jscad reported that it scaled by?
     t = 13.73866987452534;
  }

  clip = clip.translate([t,t,1.5]);

  let clips = clip;
  if (true) {
    clips = clip.union(clip.rotateZ(90).rotateY(90))
                .union(clip.rotateZ(90).rotateY(90).rotateZ(90).rotateY(90));
  }

  let rotate60about111 = object => {
    // rotate 60 degrees about 1,1,1, the stupid way:
    //     rotate 1,1,1 to z axis
    //     rotate 60 degrees about z axix
    //     rotate z axis to 1,1,1
    object = object.rotateZ(45);  // rotate axis 1,1,1 to yz plane
    object = object.rotateX(Math.atan2(Math.sqrt(2),1)/Math.PI*180); // rotate axis to +z
    object = object.rotateZ(-60);
    object = object.rotateX(-Math.atan2(Math.sqrt(2),1)/Math.PI*180);
    object = object.rotateZ(-45);
    return object;
  };

  if (true) {
    clips = rotate60about111(clips);
  }

  if (false) {
    // just kill it.
    process.stderr.write("Killing it...\n");
    answer = answer.subtract(answer);
    process.stderr.write("    done.\n");
  }

  if (true) {
    process.stderr.write("Unioning with clips...");
    answer = answer.union(clips);
    process.stderr.write("    done.\n");
  }

  if (false) {
    // To get a sense of what modelWidth is, since I forgot,
    // put in a transparent cube.
    //let theCube = cube(); // inside .jscad
    let theCube = csg.cube().translate([1,1,1]).scale([.5,.5,.5]); // outside .jscad
    theCube = theCube.setColor([1,.5,0,.1]);
    theCube = theCube.scale([modelWidth,modelWidth,modelWidth]);
    theCube = theCube.scale([Math.sqrt(.5),Math.sqrt(.5),Math.sqrt(.5)]);
    theCube = rotate60about111(theCube);
    answer = answer.union(theCube);
  }


  if (false) {
    // Randomly colorize in place.
    // Note that *not* doing this causes the answer to get retesselated,
    // with extra fineness (in case of clip top example)... !?  That's weird.
    process.stderr.write("Randomly colorizing it ...\n");
    for (let polygon of answer.polygons) {
      polygon.setColor([Math.random(),Math.random(),Math.random(),1]);
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
