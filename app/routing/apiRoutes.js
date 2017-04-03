var characters = require("../data/characters");

//Routing
module.exports = function(app) {

  app.get("/api/characters", function(req, res) {
    res.json(characters);
  });
  
  app.post("/api/characters", function(req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      scoreDifference: 1000
    };

    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference = 0;

    //Finding matching characterr in database
    for (var i = 0; i < characters.length; i++) {

      console.log(characters[i].name);
      totalDifference = 0;

      //Loop the scores
      for (var j = 0; j < characters[i].scores[j]; j++) {

        //Ugh math
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(characters[i].scores[j]));

        //Finding best match
        if (totalDifference <= bestMatch.scoreDifference) {

          // Reset the bestMatch to be the new friend.
          bestMatch.name = characters[i].name;
          bestMatch.photo = characters[i].photo;
          bestMatch.scoreDifference = totalDifference;
        }
      }
    }

    characters.push(userData);

    res.json(bestMatch);

  });

};