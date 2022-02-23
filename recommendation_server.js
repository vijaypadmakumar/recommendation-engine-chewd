const express = require("express")
const app = express()
const main = require("./recommender")

app.route("/")
    .get((req, res) => {
        res.send("hellooo")
    })

app.route("/:userID/:preferences/:sub_loc/:g_loc")
    .get((req, res) => {
        const user_preferences = {
            id: req.params.userID,
            preferences: req.params.preferences.replace("[", "").replace("]", "").replace("%20", "").split(","),
            sub_loc: req.params.sub_loc,
            g_loc: req.params.g_loc
        }
        const recommendations = main(user_preferences)

        res.send(recommendations)
    })

app.listen(process.env.PORT || 3000, () => {
    console.log(`Port : ${PORT}`)
})