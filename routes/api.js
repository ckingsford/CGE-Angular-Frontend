/*
 * Serve JSON to our AngularJS client
 */

exports.name2 = function (req, res) {
  res.json({
    name: 'Client Demo'
  });
};

exports.guy = function(req,res) {
  res.json({
    id: 'Guy'
  });
};

