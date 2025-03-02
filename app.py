from flask import Flask, render_template, request, redirect, url_for
import json

app = Flask(__name__)

# Load meal data from JSON file
with open("meals_data.json", "r") as file:
    meals = json.load(file)

# User preferences and tracking
user_preferences = {"origin": {}, "meatKind": {}, "type": {}, "taste": {}, "spicy": {}}
current_meal_index = 0

@app.route("/")
def index():
    """Render the main page with the current meal."""
    global current_meal_index
    if not meals:
        return "No meals available"

    meal = meals[current_meal_index]
    return render_template("index.html", meal=meal)

@app.route("/swipe/<action>", methods=["POST"])
def swipe(action):
    """Handle Like or Dislike button clicks (swipes)."""
    global current_meal_index
    meal = meals[current_meal_index]
    liked = (action == "like")

    # Update preferences
    weight = 1 if liked else -1
    user_preferences["origin"][meal["category"]] = user_preferences["origin"].get(meal["category"], 0) + weight * 2
    user_preferences["meatKind"][meal["meatKind"]] = user_preferences["meatKind"].get(meal["meatKind"], 0) + weight * 3
    user_preferences["type"]["Spicy" if meal["spicy"] else "Not Spicy"] = user_preferences["type"].get(
        "Spicy" if meal["spicy"] else "Not Spicy", 0
    ) + weight
    user_preferences["taste"][meal["taste"]] = user_preferences["taste"].get(meal["taste"], 0) + weight * 2

    # Move to next meal
    current_meal_index = (current_meal_index + 1) % len(meals)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)
