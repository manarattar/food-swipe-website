import json
from flask import Flask, jsonify, request

app = Flask(__name__)

# Load meal data from JSON file
with open("meals_data.json", "r") as file:
    meals = json.load(file)

# User preferences and meal tracking
user_preferences = {
    "origin": {},
    "meatKind": {},
    "type": {},
    "taste": {},
    "spicy": {},
}
current_meal_index = 0


@app.route('/get_meal', methods=['GET'])
def get_meal():
    """Returns the current meal."""
    global current_meal_index
    if not meals:
        return jsonify({"message": "No meals available"}), 404

    meal = meals[current_meal_index]
    return jsonify(meal)


@app.route('/update_preferences', methods=['POST'])
def update_preferences():
    """Updates user preferences based on likes/dislikes."""
    global current_meal_index
    data = request.json
    meal = meals[current_meal_index]
    liked = data.get('liked', False)

    weight = 1 if liked else -1
    user_preferences["origin"][meal["category"]] = user_preferences["origin"].get(meal["category"], 0) + weight * 2
    user_preferences["meatKind"][meal["meatKind"]] = user_preferences["meatKind"].get(meal["meatKind"], 0) + weight * 3
    user_preferences["type"]["Spicy" if meal["spicy"] else "Not Spicy"] = user_preferences["type"].get(
        "Spicy" if meal["spicy"] else "Not Spicy", 0
    ) + weight
    user_preferences["taste"][meal["taste"]] = user_preferences["taste"].get(meal["taste"], 0) + weight * 2

    current_meal_index = (current_meal_index + 1) % len(meals)

    return jsonify({"message": "Preferences updated", "next_meal": meals[current_meal_index]})


@app.route('/recommend_meal', methods=['GET'])
def recommend_meal():
    """Sorts meals based on user preferences and returns the best match."""
    def meal_score(meal):
        score = 0
        score += user_preferences["origin"].get(meal["category"], 0) * 2
        score += user_preferences["meatKind"].get(meal["meatKind"], 0) * 3
        score += user_preferences["type"].get("Spicy" if meal["spicy"] else "Not Spicy", 0)
        score += user_preferences["taste"].get(meal["taste"], 0) * 2
        return score

    sorted_meals = sorted(meals, key=meal_score, reverse=True)
    best_meal = sorted_meals[0] if sorted_meals else None

    return jsonify({"recommended_meal": best_meal})


if __name__ == '__main__':
    app.run(debug=True)
