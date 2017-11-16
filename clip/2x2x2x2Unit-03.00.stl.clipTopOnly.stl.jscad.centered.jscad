//
  // producer: OpenJSCAD.org Compatibility1.2.0 STL Binary Importer
  // date: Tue Nov 07 2017 11:55:31 GMT-0800 (PST)
  // source: undefined
  //
  function main() {

  let CHECK = function(cond) {
    if (cond !== true) {
      throw new Error("CHECK failed");
    }
  };

  let spec = { points: [
	[10.71753978729248,10.150710105895996,5.1],
	[10.718990325927734,10.22012996673584,5.1],
	[10.719969749450684,10.167969703674316,5.1],
	[10.718990325927734,10.22012996673584,5.1],
	[10.721019744873047,10.185359954833984,5.1],
	[10.719969749450684,10.167969703674316,5.1],
	[10.72068977355957,10.202790260314941,5.1],
	[10.721019744873047,10.185359954833984,5.1],
	[10.718990325927734,10.22012996673584,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.715909957885742,10.237279891967773,5.1],
	[10.718990325927734,10.22012996673584,5.1],
	[10.7114896774292,10.25413990020752,5.1],
	[10.715909957885742,10.237279891967773,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.7114896774292,10.25413990020752,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.705750465393066,10.270589828491211,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.69871997833252,10.286540031433105,5.1],
	[10.705750465393066,10.270589828491211,5.1],
	[10.690460205078125,10.3018798828125,5.1],
	[10.69871997833252,10.286540031433105,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.690460205078125,10.3018798828125,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.680999755859375,10.316519737243652,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.670419692993164,10.33036994934082,5.1],
	[10.680999755859375,10.316519737243652,5.1],
	[10.658769607543945,10.343330383300781,5.1],
	[10.670419692993164,10.33036994934082,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.658769607543945,10.343330383300781,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.646140098571777,10.355330467224121,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.632590293884277,10.366299629211426,5.1],
	[10.646140098571777,10.355330467224121,5.1],
	[10.618220329284668,10.376150131225586,5.1],
	[10.632590293884277,10.366299629211426,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.618220329284668,10.376150131225586,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.603110313415527,10.38484001159668,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.587369918823242,10.39231014251709,5.1],
	[10.603110313415527,10.38484001159668,5.1],
	[10.571080207824707,10.398500442504883,5.1],
	[10.587369918823242,10.39231014251709,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.571080207824707,10.398500442504883,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.554349899291992,10.403389930725098,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.5372896194458,10.406940460205078,5.1],
	[10.554349899291992,10.403389930725098,5.1],
	[10.520000457763672,10.409119606018066,5.1],
	[10.5372896194458,10.406940460205078,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.520000457763672,10.409119606018066,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.50259017944336,10.409939765930176,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.485179901123047,10.409370422363281,5.1],
	[10.50259017944336,10.409939765930176,5.1],
	[10.467860221862793,10.40742015838623,5.1],
	[10.485179901123047,10.409370422363281,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.467860221862793,10.40742015838623,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.450750350952148,10.404109954833984,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.4339599609375,10.399450302124023,5.1],
	[10.450750350952148,10.404109954833984,5.1],
	[10.417579650878906,10.39348030090332,5.1],
	[10.4339599609375,10.399450302124023,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.417579650878906,10.39348030090332,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.401729583740234,10.386240005493164,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.386509895324707,10.37775993347168,5.1],
	[10.401729583740234,10.386240005493164,5.1],
	[10.371999740600586,10.3681001663208,5.1],
	[10.386509895324707,10.37775993347168,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.371999740600586,10.3681001663208,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.358309745788574,10.357330322265625,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[10.345499992370605,10.345499992370605,5.1],
	[10.358309745788574,10.357330322265625,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.345499992370605,10.345499992370605,5.1],
	[10.71753978729248,10.150710105895996,5.1],
	[9.416271209716797,8.251805305480957,5.1],
	[10.345499992370605,10.345499992370605,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.416271209716797,8.251805305480957,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.45989990234375,8.212263107299805,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.507192611694336,8.1771879196167,5.1],
	[9.45989990234375,8.212263107299805,5.1],
	[9.557697296142578,8.146917343139648,5.1],
	[9.507192611694336,8.1771879196167,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.557697296142578,8.146917343139648,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.61092472076416,8.121742248535156,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.666364669799805,8.10190486907959,5.1],
	[9.61092472076416,8.121742248535156,5.1],
	[9.723481178283691,8.087597846984863,5.1],
	[9.666364669799805,8.10190486907959,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.723481178283691,8.087597846984863,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.78172492980957,8.078959465026855,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.840536117553711,8.076068878173828,5.1],
	[9.78172492980957,8.078959465026855,5.1],
	[9.892651557922363,8.078336715698242,5.1],
	[9.840536117553711,8.076068878173828,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.892651557922363,8.078336715698242,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.944374084472656,8.085123062133789,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[9.995311737060547,8.096376419067383,5.1],
	[9.944374084472656,8.085123062133789,5.1],
	[10.045080184936523,8.112010955810547,5.1],
	[9.995311737060547,8.096376419067383,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.045080184936523,8.112010955810547,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.093299865722656,8.13191032409668,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.139610290527344,8.155921936035156,5.1],
	[10.093299865722656,8.13191032409668,5.1],
	[10.183659553527832,8.18386459350586,5.1],
	[10.139610290527344,8.155921936035156,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.183659553527832,8.18386459350586,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.225119590759277,8.215530395507812,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.263669967651367,8.250675201416016,5.1],
	[10.225119590759277,8.215530395507812,5.1],
	[10.299019813537598,8.289036750793457,5.1],
	[10.263669967651367,8.250675201416016,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.299019813537598,8.289036750793457,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.330900192260742,8.330323219299316,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.35908031463623,8.374223709106445,5.1],
	[10.330900192260742,8.330323219299316,5.1],
	[10.383339881896973,8.420406341552734,5.1],
	[10.35908031463623,8.374223709106445,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.383339881896973,8.420406341552734,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.40349006652832,8.468520164489746,5.1],
	[10.430919647216797,8.569080352783203,5.1],
	[10.419400215148926,8.518203735351562,5.1],
	[10.40349006652832,8.468520164489746,5.1],
	[9.416271209716797,8.251805305480957,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[10.345499992370605,10.345499992370605,5.1],
	[8.105032920837402,6.9405670166015625,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[9.416271209716797,8.251805305480957,5.1],
	[8.036846160888672,6.878766059875488,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[8.105032920837402,6.9405670166015625,5.1],
	[7.962930202484131,6.823945999145508,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[8.036846160888672,6.878766059875488,5.1],
	[7.88399600982666,6.77663516998291,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.962930202484131,6.823945999145508,5.1],
	[7.80080509185791,6.737287998199463,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.88399600982666,6.77663516998291,5.1],
	[7.714158058166504,6.7062859535217285,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.80080509185791,6.737287998199463,5.1],
	[7.624889850616455,6.683925151824951,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.714158058166504,6.7062859535217285,5.1],
	[7.533860206604004,6.670422077178955,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.624889850616455,6.683925151824951,5.1],
	[7.441944122314453,6.66590690612793,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.533860206604004,6.670422077178955,5.1],
	[7.339578151702881,6.671511173248291,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.441944122314453,6.66590690612793,5.1],
	[7.238434791564941,6.6882548332214355,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.339578151702881,6.671511173248291,5.1],
	[7.139725208282471,6.715940952301025,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.238434791564941,6.6882548332214355,5.1],
	[7.0446271896362305,6.754237174987793,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.139725208282471,6.715940952301025,5.1],
	[6.954277992248535,6.802684783935547,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.0446271896362305,6.754237174987793,5.1],
	[6.869757175445557,6.8607048988342285,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.954277992248535,6.802684783935547,5.1],
	[6.792074203491211,6.927606105804443,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.869757175445557,6.8607048988342285,5.1],
	[6.722158908843994,7.002586841583252,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.792074203491211,6.927606105804443,5.1],
	[6.660847187042236,7.084752082824707,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.722158908843994,7.002586841583252,5.1],
	[6.608870983123779,7.1731181144714355,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.660847187042236,7.084752082824707,5.1],
	[6.5668511390686035,7.266630172729492,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.608870983123779,7.1731181144714355,5.1],
	[6.535289764404297,7.364171028137207,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.5668511390686035,7.266630172729492,5.1],
	[6.514565944671631,7.464573860168457,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.535289764404297,7.364171028137207,5.1],
	[6.504924774169922,7.566638946533203,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.514565944671631,7.464573860168457,5.1],
	[6.506484031677246,7.6691460609436035,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.504924774169922,7.566638946533203,5.1],
	[6.519223213195801,7.770871162414551,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.506484031677246,7.6691460609436035,5.1],
	[7.068117141723633,10.799759864807129,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[6.519223213195801,7.770871162414551,5.1],
	[8.389275550842285,10.56033992767334,5.1],
	[7.908758163452148,7.908758163452148,5.1],
	[7.068117141723633,10.799759864807129,5.1],
	[8.389275550842285,10.56033992767334,5.1],
	[7.068117141723633,10.799759864807129,5.1],
	[8.39824104309082,10.601730346679688,5.1],
	[7.068117141723633,10.799759864807129,5.1],
	[8.409998893737793,10.642419815063477,5.1],
	[8.39824104309082,10.601730346679688,5.1],
	[7.112602233886719,10.990500450134277,5.1],
	[8.409998893737793,10.642419815063477,5.1],
	[7.068117141723633,10.799759864807129,5.1],
	[8.424495697021484,10.682220458984375,5.1],
	[8.409998893737793,10.642419815063477,5.1],
	[7.112602233886719,10.990500450134277,5.1],
	[7.257238864898682,11.354029655456543,5.1],
	[8.424495697021484,10.682220458984375,5.1],
	[7.175851821899414,11.175869941711426,5.1],
	[8.424495697021484,10.682220458984375,5.1],
	[7.112602233886719,10.990500450134277,5.1],
	[7.175851821899414,11.175869941711426,5.1],
	[7.257238864898682,11.354029655456543,5.1],
	[8.441664695739746,10.720930099487305,5.1],
	[8.424495697021484,10.682220458984375,5.1],
	[7.355954170227051,11.523200035095215,5.1],
	[8.441664695739746,10.720930099487305,5.1],
	[7.257238864898682,11.354029655456543,5.1],
	[8.461424827575684,10.758390426635742,5.1],
	[8.441664695739746,10.720930099487305,5.1],
	[7.355954170227051,11.523200035095215,5.1],
	[8.483686447143555,10.79442024230957,5.1],
	[8.461424827575684,10.758390426635742,5.1],
	[7.471016883850098,11.681699752807617,5.1],
	[8.508344650268555,10.82886028289795,5.1],
	[8.483686447143555,10.79442024230957,5.1],
	[7.601284980773926,11.827969551086426,5.1],
	[8.535287857055664,10.861539840698242,5.1],
	[8.508344650268555,10.82886028289795,5.1],
	[7.745463848114014,11.960539817810059,5.1],
	[8.535287857055664,10.861539840698242,5.1],
	[7.745463848114014,11.960539817810059,5.1],
	[8.564390182495117,10.89231014251709,5.1],
	[7.745463848114014,11.960539817810059,5.1],
	[7.902122974395752,12.078100204467773,5.1],
	[8.564390182495117,10.89231014251709,5.1],
	[7.902122974395752,12.078100204467773,5.1],
	[8.595516204833984,10.921030044555664,5.1],
	[8.564390182495117,10.89231014251709,5.1],
	[8.628521919250488,10.947569847106934,5.1],
	[8.595516204833984,10.921030044555664,5.1],
	[7.902122974395752,12.078100204467773,5.1],
	[8.663256645202637,10.971810340881348,5.1],
	[8.628521919250488,10.947569847106934,5.1],
	[8.06970500946045,12.179490089416504,5.1],
	[8.69955825805664,10.993619918823242,5.1],
	[8.663256645202637,10.971810340881348,5.1],
	[8.246545791625977,12.263689994812012,5.1],
	[8.69955825805664,10.993619918823242,5.1],
	[8.246545791625977,12.263689994812012,5.1],
	[8.737257957458496,11.012920379638672,5.1],
	[8.246545791625977,12.263689994812012,5.1],
	[8.430890083312988,12.329870223999023,5.1],
	[8.737257957458496,11.012920379638672,5.1],
	[8.430890083312988,12.329870223999023,5.1],
	[8.77618408203125,11.029609680175781,5.1],
	[8.737257957458496,11.012920379638672,5.1],
	[8.816152572631836,11.043620109558105,5.1],
	[8.77618408203125,11.029609680175781,5.1],
	[8.430890083312988,12.329870223999023,5.1],
	[8.816152572631836,11.043620109558105,5.1],
	[8.430890083312988,12.329870223999023,5.1],
	[8.856983184814453,11.054880142211914,5.1],
	[8.430890083312988,12.329870223999023,5.1],
	[8.620905876159668,12.37738037109375,5.1],
	[8.856983184814453,11.054880142211914,5.1],
	[8.620905876159668,12.37738037109375,5.1],
	[8.898483276367188,11.063340187072754,5.1],
	[8.856983184814453,11.054880142211914,5.1],
	[8.940462112426758,11.068949699401855,5.1],
	[8.898483276367188,11.063340187072754,5.1],
	[8.620905876159668,12.37738037109375,5.1],
	[8.982726097106934,11.071700096130371,5.1],
	[8.940462112426758,11.068949699401855,5.1],
	[8.814706802368164,12.405730247497559,5.1],
	[9.20594596862793,12.404069900512695,5.1],
	[8.982726097106934,11.071700096130371,5.1],
	[9.010368347167969,12.414660453796387,5.1],
	[8.982726097106934,11.071700096130371,5.1],
	[8.814706802368164,12.405730247497559,5.1],
	[9.010368347167969,12.414660453796387,5.1],
	[9.025078773498535,11.07157039642334,5.1],
	[9.727556228637695,12.233240127563477,5.1],
	[9.775565147399902,12.197429656982422,5.1],
	[9.0673246383667,11.068559646606445,5.1],
	[9.025078773498535,11.07157039642334,5.1],
	[9.821059226989746,12.158470153808594,5.1],
	[9.90368938446045,12.071840286254883,5.1],
	[9.0673246383667,11.068559646606445,5.1],
	[9.863832473754883,12.11655044555664,5.1],
	[9.0673246383667,11.068559646606445,5.1],
	[9.821059226989746,12.158470153808594,5.1],
	[9.863832473754883,12.11655044555664,5.1],
	[9.940450668334961,12.024550437927246,5.1],
	[9.0673246383667,11.068559646606445,5.1],
	[9.90368938446045,12.071840286254883,5.1],
	[9.109269142150879,11.062689781188965,5.1],
	[9.0673246383667,11.068559646606445,5.1],
	[9.940450668334961,12.024550437927246,5.1],
	[10.004039764404297,11.923110008239746,5.1],
	[9.109269142150879,11.062689781188965,5.1],
	[9.973952293395996,11.974900245666504,5.1],
	[9.109269142150879,11.062689781188965,5.1],
	[9.940450668334961,12.024550437927246,5.1],
	[9.973952293395996,11.974900245666504,5.1],
	[9.109269142150879,11.062689781188965,5.1],
	[10.053449630737305,11.81406021118164,5.1],
	[9.150716781616211,11.053979873657227,5.1],
	[10.053449630737305,11.81406021118164,5.1],
	[9.191476821899414,11.04246997833252,5.1],
	[9.150716781616211,11.053979873657227,5.1],
	[9.23136043548584,11.028220176696777,5.1],
	[9.191476821899414,11.04246997833252,5.1],
	[10.053449630737305,11.81406021118164,5.1],
	[9.23136043548584,11.028220176696777,5.1],
	[10.053449630737305,11.81406021118164,5.1],
	[9.270181655883789,11.011289596557617,5.1],
	[10.053449630737305,11.81406021118164,5.1],
	[9.30776309967041,10.99176025390625,5.1],
	[9.270181655883789,11.011289596557617,5.1],
	[10.072540283203125,11.75728988647461,5.1],
	[9.30776309967041,10.99176025390625,5.1],
	[10.053449630737305,11.81406021118164,5.1],
	[10.087779998779297,11.699370384216309,5.1],
	[9.30776309967041,10.99176025390625,5.1],
	[10.072540283203125,11.75728988647461,5.1],
	[10.099089622497559,11.640549659729004,5.1],
	[9.30776309967041,10.99176025390625,5.1],
	[10.087779998779297,11.699370384216309,5.1],
	[10.095569610595703,11.342450141906738,5.1],
	[9.30776309967041,10.99176025390625,5.1],
	[10.099089622497559,11.640549659729004,5.1],
	[10.109740257263184,11.521300315856934,5.1],
	[10.095569610595703,11.342450141906738,5.1],
	[10.106419563293457,11.581110000610352,5.1],
	[10.095569610595703,11.342450141906738,5.1],
	[10.099089622497559,11.640549659729004,5.1],
	[10.106419563293457,11.581110000610352,5.1],
	[9.3439302444458,10.969719886779785,5.1],
	[9.962550163269043,11.011150360107422,5.1],
	[9.927884101867676,10.962309837341309,5.1],
	[9.3439302444458,10.969719886779785,5.1],
	[9.927884101867676,10.962309837341309,5.1],
	[9.378515243530273,10.945269584655762,5.1],
	[9.927884101867676,10.962309837341309,5.1],
	[9.890012741088867,10.915909767150879,5.1],
	[9.378515243530273,10.945269584655762,5.1],
	[9.890012741088867,10.915909767150879,5.1],
	[9.411357879638672,10.918530464172363,5.1],
	[9.378515243530273,10.945269584655762,5.1],
	[9.442307472229004,10.889619827270508,5.1],
	[9.411357879638672,10.918530464172363,5.1],
	[9.890012741088867,10.915909767150879,5.1],
	[9.654438972473145,10.67747974395752,5.1],
	[9.442307472229004,10.889619827270508,5.1],
	[9.849108695983887,10.872150421142578,5.1],
	[9.442307472229004,10.889619827270508,5.1],
	[9.890012741088867,10.915909767150879,5.1],
	[9.849108695983887,10.872150421142578,5.1],
	[9.3439302444458,10.969719886779785,5.1],
	[9.993853569030762,11.062219619750977,5.1],
	[9.962550163269043,11.011150360107422,5.1],
	[9.30776309967041,10.99176025390625,5.1],
	[9.993853569030762,11.062219619750977,5.1],
	[9.3439302444458,10.969719886779785,5.1],
	[10.021659851074219,11.115269660949707,5.1],
	[9.993853569030762,11.062219619750977,5.1],
	[9.30776309967041,10.99176025390625,5.1],
	[10.021659851074219,11.115269660949707,5.1],
	[9.30776309967041,10.99176025390625,5.1],
	[10.045829772949219,11.170069694519043,5.1],
	[9.30776309967041,10.99176025390625,5.1],
	[10.06626033782959,11.226369857788086,5.1],
	[10.045829772949219,11.170069694519043,5.1],
	[10.082869529724121,11.283920288085938,5.1],
	[10.06626033782959,11.226369857788086,5.1],
	[9.30776309967041,10.99176025390625,5.1],
	[10.082869529724121,11.283920288085938,5.1],
	[9.30776309967041,10.99176025390625,5.1],
	[10.095569610595703,11.342450141906738,5.1],
	[10.109740257263184,11.521300315856934,5.1],
	[10.104299545288086,11.401700019836426,5.1],
	[10.095569610595703,11.342450141906738,5.1],
	[10.109029769897461,11.461409568786621,5.1],
	[10.104299545288086,11.401700019836426,5.1],
	[10.109740257263184,11.521300315856934,5.1],
	[9.109269142150879,11.062689781188965,5.1],
	[10.030579566955566,11.869420051574707,5.1],
	[10.053449630737305,11.81406021118164,5.1],
	[10.004039764404297,11.923110008239746,5.1],
	[10.030579566955566,11.869420051574707,5.1],
	[9.109269142150879,11.062689781188965,5.1],
	[9.025078773498535,11.07157039642334,5.1],
	[9.775565147399902,12.197429656982422,5.1],
	[9.821059226989746,12.158470153808594,5.1],
	[9.025078773498535,11.07157039642334,5.1],
	[9.677248001098633,12.26574993133545,5.1],
	[9.727556228637695,12.233240127563477,5.1],
	[8.982726097106934,11.071700096130371,5.1],
	[9.677248001098633,12.26574993133545,5.1],
	[9.025078773498535,11.07157039642334,5.1],
	[9.624869346618652,12.2947998046875,5.1],
	[9.677248001098633,12.26574993133545,5.1],
	[8.982726097106934,11.071700096130371,5.1],
	[9.624869346618652,12.2947998046875,5.1],
	[8.982726097106934,11.071700096130371,5.1],
	[9.57065486907959,12.320260047912598,5.1],
	[8.982726097106934,11.071700096130371,5.1],
	[9.514852523803711,12.342020034790039,5.1],
	[9.57065486907959,12.320260047912598,5.1],
	[9.457715034484863,12.359979629516602,5.1],
	[9.514852523803711,12.342020034790039,5.1],
	[8.982726097106934,11.071700096130371,5.1],
	[9.457715034484863,12.359979629516602,5.1],
	[8.982726097106934,11.071700096130371,5.1],
	[9.399497985839844,12.374059677124023,5.1],
	[8.982726097106934,11.071700096130371,5.1],
	[9.20594596862793,12.404069900512695,5.1],
	[9.399497985839844,12.374059677124023,5.1],
	[8.940462112426758,11.068949699401855,5.1],
	[8.620905876159668,12.37738037109375,5.1],
	[8.814706802368164,12.405730247497559,5.1],
	[8.663256645202637,10.971810340881348,5.1],
	[8.06970500946045,12.179490089416504,5.1],
	[8.246545791625977,12.263689994812012,5.1],
	[8.628521919250488,10.947569847106934,5.1],
	[7.902122974395752,12.078100204467773,5.1],
	[8.06970500946045,12.179490089416504,5.1],
	[8.508344650268555,10.82886028289795,5.1],
	[7.601284980773926,11.827969551086426,5.1],
	[7.745463848114014,11.960539817810059,5.1],
	[8.483686447143555,10.79442024230957,5.1],
	[7.471016883850098,11.681699752807617,5.1],
	[7.601284980773926,11.827969551086426,5.1],
	[8.461424827575684,10.758390426635742,5.1],
	[7.355954170227051,11.523200035095215,5.1],
	[7.471016883850098,11.681699752807617,5.1]],
	polygons: [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[9,10,11],
	[12,13,14],
	[15,16,17],
	[18,19,20],
	[21,22,23],
	[24,25,26],
	[27,28,29],
	[30,31,32],
	[33,34,35],
	[36,37,38],
	[39,40,41],
	[42,43,44],
	[45,46,47],
	[48,49,50],
	[51,52,53],
	[54,55,56],
	[57,58,59],
	[60,61,62],
	[63,64,65],
	[66,67,68],
	[69,70,71],
	[72,73,74],
	[75,76,77],
	[78,79,80],
	[81,82,83],
	[84,85,86],
	[87,88,89],
	[90,91,92],
	[93,94,95],
	[96,97,98],
	[99,100,101],
	[102,103,104],
	[105,106,107],
	[108,109,110],
	[111,112,113],
	[114,115,116],
	[117,118,119],
	[120,121,122],
	[123,124,125],
	[126,127,128],
	[129,130,131],
	[132,133,134],
	[135,136,137],
	[138,139,140],
	[141,142,143],
	[144,145,146],
	[147,148,149],
	[150,151,152],
	[153,154,155],
	[156,157,158],
	[159,160,161],
	[162,163,164],
	[165,166,167],
	[168,169,170],
	[171,172,173],
	[174,175,176],
	[177,178,179],
	[180,181,182],
	[183,184,185],
	[186,187,188],
	[189,190,191],
	[192,193,194],
	[195,196,197],
	[198,199,200],
	[201,202,203],
	[204,205,206],
	[207,208,209],
	[210,211,212],
	[213,214,215],
	[216,217,218],
	[219,220,221],
	[222,223,224],
	[225,226,227],
	[228,229,230],
	[231,232,233],
	[234,235,236],
	[237,238,239],
	[240,241,242],
	[243,244,245],
	[246,247,248],
	[249,250,251],
	[252,253,254],
	[255,256,257],
	[258,259,260],
	[261,262,263],
	[264,265,266],
	[267,268,269],
	[270,271,272],
	[273,274,275],
	[276,277,278],
	[279,280,281],
	[282,283,284],
	[285,286,287],
	[288,289,290],
	[291,292,293],
	[294,295,296],
	[297,298,299],
	[300,301,302],
	[303,304,305],
	[306,307,308],
	[309,310,311],
	[312,313,314],
	[315,316,317],
	[318,319,320],
	[321,322,323],
	[324,325,326],
	[327,328,329],
	[330,331,332],
	[333,334,335],
	[336,337,338],
	[339,340,341],
	[342,343,344],
	[345,346,347],
	[348,349,350],
	[351,352,353],
	[354,355,356],
	[357,358,359],
	[360,361,362],
	[363,364,365],
	[366,367,368],
	[369,370,371],
	[372,373,374],
	[375,376,377],
	[378,379,380],
	[381,382,383],
	[384,385,386],
	[387,388,389],
	[390,391,392],
	[393,394,395],
	[396,397,398],
	[399,400,401],
	[402,403,404],
	[405,406,407],
	[408,409,410],
	[411,412,413],
	[414,415,416],
	[417,418,419],
	[420,421,422],
	[423,424,425],
	[426,427,428],
	[429,430,431],
	[432,433,434],
	[435,436,437],
	[438,439,440],
	[441,442,443],
	[444,445,446],
	[447,448,449],
	[450,451,452],
	[453,454,455],
	[456,457,458],
	[459,460,461],
	[462,463,464],
	[465,466,467],
	[468,469,470],
	[471,472,473],
	[474,475,476],
	[477,478,479],
	[480,481,482],
	[483,484,485],
	[486,487,488],
	[489,490,491],
	[492,493,494]] };
// objects: 1
// object #1: triangles: 165
  //let answer = union(polyhedron(spec));

  if (true) {
    let joinVerts = (pointsIn,polygonsIn) => {
      console.log("      joining verts...");
      console.log("        polygonsIn.length = "+polygonsIn.length);
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
      console.log("        polygonsOut.length = "+polygonsOut.length);
      console.log("      done joining verts.");
      return [pointsOut,polygonsOut];
    };  // joinVerts

    let joinPolygons = (polygonsIn) => {
      let verboseLevel = 1;
      if (verboseLevel >= 1) console.log("      joining polygons...");
      if (verboseLevel >= 1) console.log("        polygonsIn.length = "+polygonsIn.length);
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
                   if (verboseLevel >= 2) console.log("          joining "+i+":"+ii+" with "+j+":"+jj+"");
                   if (verboseLevel >= 2) console.log("              i="+i+": "+JSON.stringify(polygonsOut[i]));
                   if (verboseLevel >= 2) console.log("              j="+j+": "+JSON.stringify(polygonsOut[j]));
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

                   if (verboseLevel >= 2) console.log("              joined = "+JSON.stringify(joined));

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
      if (verboseLevel >= 1) console.log("        polygonsOut.length = "+polygonsOut.length);
      if (verboseLevel >= 1) console.log("      done.");
      return polygonsOut;
    };  // joinPolygons
    [spec.points,spec.polygons] = joinVerts(spec.points, spec.polygons);
    spec.polygons = joinPolygons(spec.polygons);

    if (spec.polygons.length === 1) {
      console.log("Hooray! a single polygon!");
      spec.points = spec.polygons[0].map(i => spec.points[i]);
      let xrange = n => {
        let answer = [];
        for (let i = 0; i < n; ++i) {
          answer.push(i);
        }
        return answer;
      };
      spec.polygons[0] = xrange(spec.polygons[0].length);
    }
  }


  let doRectangular = false;  // don't do this in the end, but it was the fastest way of getting something
  let clobberWithSimple = false;


  let points = spec.points;

  if (clobberWithSimple) {
    points = [[0,0],[1,0],[0,1]];  
    points = [[0,0],[1,0],[1,1],[.6,.4]];
  }

  let path;
  if (doRectangular) {
    path = new CSG.Path2D(points, /*closed=*/true);
  } else {
    path = polygon(points);
  }

  //console.log("path = "+JSON.stringify(path));

  return path.translate([-9.5,-9.5,0]);
}
