let getCommonArgs = function(argv) {
  let inputFileName = undefined;
  let outputFormat = undefined;
  let outputFileName = undefined;
  // process.argv[0] = '/path/to/node'
  // process.argv[1] = './isolateClip.js'
  // process.argv[2] = 'inputFileName.stl'
  //process.stderr.write("process.argv0 = "+JSON.stringify(process.argv0)+"\n");
  //process.stderr.write("process.argv = "+JSON.stringify(process.argv)+"\n");
  for (let argi = 2; argi < process.argv.length; argi++) {
    if (process.argv[argi] === '-o') {
      argi++;
      if (argi === process.argv.length) {
        process.stderr.write("Error: -o given without a following arg\n");
        process.exit(1);
      }
      outputFileName = process.argv[argi];
    } else if (process.argv[argi] === '-of') {  // TODO: just get rid of this
      argi++;
      if (argi === process.argv.length) {
        process.stderr.write("Error: -of given without a following arg\n");
        process.exit(1);
      }
      outputFormat = process.argv[argi];
    } else {
      if (inputFileName !== undefined) {
        process.stderr.write("Error: more than one input file name specified: "+JSON.stringify(inputFileName)+", "+JSON.stringify(process.argv[argi])+"\n");
        process.exit(1);
      }
      inputFileName = process.argv[argi];
    }
  }
  if (inputFileName === undefined) {
    process.stderr.write("Error: no input file name specified\n");
    process.exit(1);
  }
  if (outputFileName === undefined) {
    process.stderr.write("Error: no output file name specified\n");
    process.exit(1);
  }

  {
    // If prefixed by <format>:, extract format and strip it.
    const match = outputFileName.match(/^(\w+):(.+)$/);
    if (match != null) {
      if (outputFormat !== undefined) {
        console.error("ERROR: output format multiply defined");
        process.exit(1);
      }
      outputFormat = match[1].toLowerCase();
      outputFileName = match[2];
    }
  }

  if (outputFormat === undefined) {
    // It wasn't specified explicitly,
    // so it must be inferrable from the file name.
    const match = outputFileName.match(/\.(\w+)$/);
    if (match === null) {
      console.error("ERROR: Couldn't deduce output format from output filename "+JSON.stringify(outputFileName));
      process.exit(1);
    }
    outputFormat = match[1].toLowerCase();
  }
  return [inputFileName, outputFormat, outputFileName];
};  // getCommonArgs

module.exports = getCommonArgs;
