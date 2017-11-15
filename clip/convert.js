#!/usr/bin/env node

if (process.argv.length < 3) {
  process.stderr.write("Usage: center.js inputFileName.stl -o [outputFormat:]outputFileName.amf (or whatever)\n");
  process.exit(1);
}

const getCommonArgs = require('./getCommonArgs');
let [inputFileName, outputFormat, outputFileName] = getCommonArgs(process.argv);

const jscad = require('@jscad/openjscad');
const csg = require('@jscad/csg').CSG;
const fs = require('fs')

const getCompilable = require('./getCompilable.js');
const compilable = getCompilable(inputFileName, /*verboseLevel=*/1);

jscad.compile(compilable, {}).then(compiled => {
  //process.stderr.write("compiled = "+JSON.stringify(compiled)+"\n");
  //process.stderr.write("csg.cube() = "+JSON.stringify(csg.cube())+"\n");
  console.assert(compiled.length === 1);

  let answer = compiled[0];
  //process.stderr.write("answer = "+JSON.stringify(answer)+"\n");

  if (true) {
    // Do nothing!  Pure conversion.
    process.stderr.write("Doing nothing (pure conversion!) ...\n");
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
