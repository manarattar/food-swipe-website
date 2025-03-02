from flask import Flask, render_template, request, redirect, url_for, send_from_directory
import json
import os

app = Flask(__name__)

# Load meals from JSON file
with open("meals_data.json", "r") as file:
    meals = json.load(file)

# Track current meal index
current_meal_index = 0

# User preferences storage
user_preferences = {
    "origin": {},
    "meatKind": {},
    "type": {},
    "taste": {},
    "spicy": {},
}

@app.route("/")
def index():
    """Render the main page with the current meal."""
    global current_meal_index
    if not meals:
        return "No meals available"

    meal = meals[current_meal_index]

    # Ensure correct image path for Flask static serving
    meal["img"] = url_for("static", filename=f"meal_images/{os.path.basename(meal['img'])}")

    return render_template("index.html", meal=meal)

@app.route("/swipe/<action>", methods=["POST"])
def swipe(action):
    """Handle Like or Dislike button clicks (swipes)."""
    global current_meal_index
    meal = meals[current_meal_index]
    liked = (action == "like")

    # Update user preferences
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

@app.route("/static/meal_images/<filename>")
def meal_images(filename):
    """Serve images from the static folder."""
    return send_from_directory("static/meal_images", filename)

if __name__ == "__main__":
    app.run(debug=True)
