const data = require("./restaurant-data.json")
const axios = require("axios")

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// to generate an _id
String.prototype.hashCode = function () {
    var hash = 0;
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

const similarity = (user_preference, restaurant_tags) => {
    // using cosine similarity - not yet ?
    // finding the similarity between restaurants restaurant and the user preferences

    let similar = 0

    try {
        user_preference.forEach(tag => {
            if (restaurant_tags.includes(capitalizeFirstLetter(tag))) {
                similar++
            }
        })
    } catch (err) {
        console.log(err)
    }

    return similar / user_preference.length
}

const get_matching_item = (items) => {
    const index = Math.round(Math.random() * items.length)
    const item = items[index]
    return item
}

const get_item_image = (item) => {
    // confusion
}

const find_matches = (preferences, threshold, sub_loc, g_loc) => {

    // need to check if sub_loc and g_loc is in the data set i have

    // getting the specific local restaurant data rather than going through everything
    const local_data = data[g_loc][sub_loc]
    // const total_restaurants_matched = []

    for (let restaurant_index in local_data) {
        for (let restaurant_name in local_data[restaurant_index]) {
            const likeliness = similarity(preferences, local_data[restaurant_index][restaurant_name][0].tags)

            if (likeliness >= threshold) {
                // console.log(local_data[restaurant_index][restaurant_name][0])
                // restaurants.add(restaurant_name)
                ``
                // 1. change format of object - done
                // 2. only add 20 items randomly - not doing now
                // - this is dependent on restaurants matched
                // - so divide the restaurants matched with food items needed
                // 3. only add food that matches the culninary requirement - ?
                // 4. and with a food image - ?

                const item = get_matching_item(local_data[restaurant_index][restaurant_name][0].items)
                const img_url = get_item_image(item)

                const data = {
                    "_id": "",// hash all the following to create an id
                    "restaurantName": restaurant_name,
                    "name": item,
                    "img_url": img_url
                }

                return data
            }
        }
    }

}

const main = (user_preferences) => {
    const threshold = 0.6

    // verify if user is valid
    // HOW???? -> login sys

    return find_matches(user_preferences.preferences, threshold, user_preferences.sub_loc, user_preferences.g_loc)
}

module.exports = main

// issues
// "vegan Friendly" and "vegan" -> capitalisation issue -> fixed
// to make it more efficient and reduce api calls i should send more information but for now this is alright