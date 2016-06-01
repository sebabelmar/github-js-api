'use strict';

var DIAGNOSIS_MESSAGE = 'Look into the console :D';

exports.diagnosis = function(req, res) {
  res.json({message: DIAGNOSIS_MESSAGE });   
};