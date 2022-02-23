const express = require("express")
const app = express()
const main = require("./recommender")

const PORT = process.env.PORT || 8080

app.route("/")
    .get((req, res) => {
        res.send("hellooo")
    })

app.route("/:userID/:preferences/:sub_loc/:g_loc")
    .get((req, res) => {
        const user_preferences = {
            id: req.params.userID,
            preferences: req.params.preferences.replace("[", "").replace("]", "").split(","),
            sub_loc: req.params.sub_loc,
            g_loc: req.params.g_loc
        }
        const recommendations = main(user_preferences)

        res.send(recommendations)
    })

app.listen(PORT, () => {
    console.log(`Port : ${PORT}`)
})