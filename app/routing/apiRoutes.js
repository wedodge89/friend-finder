var data = require("./../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(data);
    }
    )

    app.post("/api/friends", function(req, res) {
        var newFriend = req.body;
        var surveyScores = newFriend.scores;
        var closestFriend = {name: "", photo: "", scoreDiff: 100}
        for (i = 0; i < data.length; i ++) {
            console.log(data[i].name)
            let difference = 0;
            for (j = 0; j < data[i].scores.length; j ++) {
                difference += Math.abs(parseInt(newFriend.scores[j]) - parseInt(data[i].scores[j]))
            }
            console.log(difference);
            if (difference <= closestFriend.scoreDiff) {
                closestFriend.name = data[i].name;
                closestFriend.photo = data[i].photo;
                closestFriend.scoreDiff = difference
            }
        }
        data.push(newFriend);
        res.json(closestFriend);
    })
}