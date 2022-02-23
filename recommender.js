const data = require("./restaurant-data.json")

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const similarity = (user_preference, restaurant_tags) => {
    // using cosine similarity - not yet ?
    // finding the similarity between restaurants_obj restaurant and the user preferences

    let similar = 0

    try {
        // use levenshtein distance to check similarity as well
        // otherwise it'll skip cases like
        // vegan and vegan friendly
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

const find_matches = (preferences, threshold, sub_loc, g_loc) => {

    // need to check if sub_loc and g_loc is in the data set i have

    // getting the specific local restaurant data rather than going through everything
    const local_data = data[g_loc][sub_loc]
    const restaurants_obj = {}

    for (let restaurant_index in local_data) {
        for (let restaurant_name in local_data[restaurant_index]) {
            const likeliness = similarity(preferences, local_data[restaurant_index][restaurant_name][0].tags)

            if (likeliness >= threshold) {
                // console.log(local_data[restaurant_index][restaurant_name][0])
                // restaurants.add(restaurant_name)
                restaurants_obj[restaurant_name] = local_data[restaurant_index][restaurant_name][0].items
            }
        }
    }
    // console.log(restaurants_obj)
    return restaurants_obj
}

const main = (user_preferences) => {
    const threshold = 0.6
    // verify if user is valid

    return find_matches(user_preferences.preferences, threshold, user_preferences.sub_loc, user_preferences.g_loc)
}

module.exports = main

// edge case/s?
// "vegan Friendly" and "vegan" -> capitalisation issue