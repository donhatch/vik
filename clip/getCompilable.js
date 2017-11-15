// Reads from inputFileName, inferring the input format from the extension, and deserializes
// into the form suitable for input to compile().
// If inputFileName is <format>:-, then read from stdin using the specified format.
// verboseLevel = 0: prints nothing.
// verboseLevel >= 1: prints basic progress to stderr.
// verboseLevel >= 2: and prints major debugging output to stderr.
//   
const fs = require('fs')

const getCompilable = function(inputFileName,verboseLevel) {
  if (arguments.length != 2) {
    throw new Error("getCompilable called with "+arguments.length+" arguments, expected 2");
  }

  let inputFormat;

  {
    let match = inputFileName.toLowerCase().match(/^(\w+):(.*)$/);
    if (match != null) {
      inputFormat = match[1];
      inputFileName = match[2];
    } else {
      // similar to src/io/conversionWorker.js and src/cli/generateOutputData.js ...
      // try to get it from the extension.
      if (verboseLevel >= 1) process.stderr.write("inputFileName = "+JSON.stringify(inputFileName)+"\n");
      match = inputFileName.toLowerCase().match(/\.(\w+)$/i);
      if (match === null) {
        console.error("ERROR: Couldn't figure out input format from input filename");
        process.exit(1);
      }
      inputFormat = match[1];
    }
  }

  // This is essentially what the openjscad command uses for encoding.
  // I'm unclear on what the logic is or should be; maybe this is fine.
  const encoding = inputFormat==='stl' || inputFormat==='stlb' ? 'binary' : 'UTF8';
  let inputBytes;
  if (inputFileName === '-') {
    if (verboseLevel >= 1) process.stderr.write("Reading format "+inputFormat+" from stdin ...\n");
    // Note, /dev/stdin works, since this has been fixed:
    // https://github.com/nodejs/node/issues/1070
    // And I don't see a simpler way.
    // See https://github.com/mbostock/rw/issues/7 , looks like mbostock
    // has a lib that works even better for stdout, if I should ever need it.
    inputBytes = fs.readFileSync('/dev/stdin', {encoding:encoding});
    if (verboseLevel >= 1) process.stderr.write("    done.\n");
  } else {
    if (verboseLevel >= 1) process.stderr.write("Reading format "+inputFormat+" from file "+inputFileName+" ...\n");
    inputBytes = fs.readFileSync(inputFileName, {encoding:encoding});
    if (verboseLevel >= 1) process.stderr.write("    done.\n");
  }

  if (verboseLevel >= 2) process.stderr.write("inputBytes = "+JSON.stringify(inputBytes)+"\n");
  if (verboseLevel >= 1) process.stderr.write("inputBytes.length = "+JSON.stringify(inputBytes.length)+"\n");

  let compilable;
  switch(inputFormat) {
    case 'amf':
      if (verboseLevel >= 1) process.stderr.write("Deserializing AMF ...\n");
      compilable = require('@jscad/io').amfDeSerializer.deserialize(inputBytes, inputFileName, {});
      if (verboseLevel >= 1) process.stderr.write("    done.\n");
      break;
    case 'stl':
      if (verboseLevel >= 1) process.stderr.write("Deserializing STL ...\n");
      compilable = require('@jscad/io').stlDeSerializer.deserialize(inputBytes, inputFileName, {});
      if (verboseLevel >= 1) process.stderr.write("    done.\n");
      break;
    case 'js': case 'jscad':
      if (verboseLevel >= 1) process.stderr.write("No deserialization needed.\n");
      compilable = inputBytes;
      break;
    // TODO: more, if I care
    default:
      console.error('ERROR: Invalid file type in conversion (' + inputFormat + ')');
      process.exit(1);
      break;
  }

  // According to io/packages/stl-serializer/README.md,
  //   "This serializer outputs a 'blobable' array of data (from a CSG object)
  //   ie an array that can either be passed directly to a Blob (`new Blob(blobable)`)
  //   or converted to a Node.js buffer."
  // What the heck does that mean??
  // It actually returns a string which is apparently jscad source code.
  // All I know for sure is that it's suitable for passing to jscad.compile(),
  // so I'll call it `compilable`.

  if (verboseLevel >= 2) process.stderr.write("compilable = "+JSON.stringify(compilable)+"\n");
  if (verboseLevel >= 2) process.stderr.write("typeof(compilable) = "+JSON.stringify(typeof(compilable))+"\n");
  console.assert(typeof(compilable) === 'string');
  return compilable;
};  // getCompilable

module.exports = getCompilable;
