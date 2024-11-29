let currentMealIndex = 0;
let meals = [
    {"name": "Currywurst", "img": "meal_images/Currywurst.png", "description": "German sausage served with a tangy curry ketchup sauce.", "category": "German", "meatKind": "Pork", "taste": "Savory", "spicy": false},
    {"name": "Fettuccine Alfredo", "img": "meal_images/Fettuccine_Alfredo.png", "description": "Creamy pasta dish made with butter, cream, and Parmesan cheese.", "category": "Italian", "meatKind": "Vegetarian", "taste": "Savory", "spicy": false},
    {"name": "Samosas", "img": "meal_images/Samosas.png", "description": "Deep-fried pastries filled with spiced potatoes, peas, or meat.", "category": "Indian", "meatKind": "Vegetarian", "taste": "Savory", "spicy": true},
    {"name": "Pho Ga", "img": "meal_images/Pho_Ga.png", "description": "Vietnamese chicken noodle soup with aromatic herbs.", "category": "Vietnamese", "meatKind": "Chicken", "taste": "Savory", "spicy": false},
    {"name": "Carbonara", "img": "meal_images/Carbonara.png", "description": "Italian pasta with eggs, cheese, pancetta, and black pepper.", "category": "Italian", "meatKind": "Pork", "taste": "Savory", "spicy": false},
    {"name": "Gyros", "img": "meal_images/Gyros.png", "description": "Greek meat wrap with lamb or chicken, vegetables, and tzatziki.", "category": "Greek", "meatKind": "Lamb", "taste": "Savory", "spicy": false},
    {"name": "Couscous", "img": "meal_images/Couscous.png", "description": "North African steamed semolina grains served with vegetables or meat.", "category": "North African", "meatKind": "Varies", "taste": "Savory", "spicy": false},
    {"name": "Shrimp Tempura", "img": "meal_images/Shrimp_Tempura.png", "description": "Lightly battered and fried shrimp served with dipping sauce.", "category": "Japanese", "meatKind": "Shrimp", "taste": "Savory", "spicy": false},
    {"name": "Dolma", "img": "meal_images/Dolma.png", "description": "Grape leaves stuffed with rice and spices, sometimes with meat.", "category": "Middle Eastern", "meatKind": "Vegetarian", "taste": "Savory", "spicy": false},
    {"name": "Crab Cakes", "img": "meal_images/Crab_Cakes.png", "description": "Pan-fried patties made with lump crab meat and breadcrumbs.", "category": "American", "meatKind": "Seafood", "taste": "Savory", "spicy": false},
    {"name": "Bulgur Pilaf", "img": "meal_images/Bulgur_Pilaf.png", "description": "Turkish bulgur wheat cooked with tomatoes, onions, and spices.", "category": "Turkish", "meatKind": "Vegetarian", "taste": "Savory", "spicy": false},
    {"name": "Tonkatsu", "img": "meal_images/Tonkatsu.png", "description": "Japanese breaded and deep-fried pork cutlet served with cabbage.", "category": "Japanese", "meatKind": "Pork", "taste": "Savory", "spicy": false},
    {"name": "Polenta", "img": "meal_images/Polenta.png", "description": "Italian cornmeal porridge often served with cheese or sauces.", "category": "Italian", "meatKind": "Vegetarian", "taste": "Savory", "spicy": false},
    {"name": "Eton Mess", "img": "meal_images/Eton_Mess.png", "description": "British dessert made with meringue, cream, and strawberries.", "category": "British", "meatKind": "Vegetarian", "taste": "Sweet", "spicy": false},
    {"name": "Paneer Butter Masala", "img": "meal_images/Paneer_Butter_Masala.png", "description": "Creamy Indian curry made with paneer and a tomato-based sauce.", "category": "Indian", "meatKind": "Vegetarian", "taste": "Savory", "spicy": true},
    {"name": "Tuna Poke Bowl", "img": "meal_images/Tuna_Poke_Bowl.png", "description": "Hawaiian dish with raw tuna, rice, and fresh vegetables.", "category": "Hawaiian", "meatKind": "Fish", "taste": "Fresh", "spicy": false},
    {"name": "Crepes", "img": "meal_images/Crepes.png", "description": "Thin French pancakes served with sweet or savory fillings.", "category": "French", "meatKind": "Vegetarian", "taste": "Varies", "spicy": false},
    {"name": "Zucchini Fritters", "img": "meal_images/Zucchini_Fritters.png", "description": "Crispy pan-fried patties made with grated zucchini and herbs.", "category": "Mediterranean", "meatKind": "Vegetarian", "taste": "Savory", "spicy": false},
    {"name": "Meatloaf", "img": "meal_images/Meatloaf.png", "description": "American baked ground meat dish, often served with gravy.", "category": "American", "meatKind": "Beef", "taste": "Savory", "spicy": false},
    {"name": "Lobster Bisque", "img": "meal_images/Lobster_Bisque.png", "description": "Rich and creamy seafood soup made with lobster stock.", "category": "French", "meatKind": "Seafood", "taste": "Savory", "spicy": false}
]
;
let userPreferences = {
    origin: {},
    meatKind: {},
    type: {},
    taste: {},
    spicy: {},
};

const card = document.getElementById("card");
const mealImg = document.getElementById("meal-img");
const mealName = document.getElementById("meal-name");
const mealDescription = document.getElementById("meal-description");

const mealOfTheDayContainer = document.getElementById("meal-of-the-day");
const mealOfTheDayImg = document.getElementById("meal-of-the-day-img");
const mealOfTheDayName = document.getElementById("meal-of-the-day-name");
const mealOfTheDayDescription = document.getElementById("meal-of-the-day-description");

const popup = document.getElementById("popup");
const closePopupButton = document.getElementById("close-popup");
const mainContainer = document.getElementById("main-container");

// Updated event listener for closing the popup
closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
    mainContainer.style.display = "block";
    updateMeal();
});

function updateMeal() {
    if (meals.length === 0 || !mealOfTheDayContainer.classList.contains("hidden")) return;
    const meal = meals[currentMealIndex];
    mealImg.src = meal.img;
    mealName.textContent = meal.name;
    mealDescription.textContent = meal.description;
    card.classList.remove("swipe-left", "swipe-right");
}

function handleKey(e) {
    if (meals.length === 0 || !mealOfTheDayContainer.classList.contains("hidden")) return;
    if (e.key === "ArrowRight") {
        handleSwipe("right");
    } else if (e.key === "ArrowLeft") {
        handleSwipe("left");
    }
}

function handleSwipe(direction) {
    if (meals.length === 0 || !mealOfTheDayContainer.classList.contains("hidden")) return;
    if (direction === "right") {
        card.classList.add("swipe-right");
        setTimeout(() => {
            updatePreferences(meals[currentMealIndex], true);
            nextMeal();
        }, 500);
    } else if (direction === "left") {
        card.classList.add("swipe-left");
        setTimeout(() => {
            updatePreferences(meals[currentMealIndex], false);
            nextMeal();
        }, 500);
    }
}

function updatePreferences(meal, liked) {
    const weight = liked ? 1 : -1;
    userPreferences.origin[meal.category] = (userPreferences.origin[meal.category] || 0) + weight * 2;
    userPreferences.meatKind[meal.meatKind] = (userPreferences.meatKind[meal.meatKind] || 0) + weight * 3;
    userPreferences.type[meal.spicy ? "Spicy" : "Not Spicy"] = (userPreferences.type[meal.spicy ? "Spicy" : "Not Spicy"] || 0) + weight;
    userPreferences.taste[meal.taste] = (userPreferences.taste[meal.taste] || 0) + weight * 2;

    if (currentMealIndex >= 10) {
        recommendMeals();
        displayMealOfTheDay();
    }
}

function recommendMeals() {
    meals.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        scoreA += (userPreferences.origin[a.category] || 0) * 2;
        scoreA += (userPreferences.meatKind[a.meatKind] || 0) * 3;
        scoreA += (userPreferences.type[a.spicy ? "Spicy" : "Not Spicy"] || 0);
        scoreA += (userPreferences.taste[a.taste] || 0) * 2;

        scoreB += (userPreferences.origin[b.category] || 0) * 2;
        scoreB += (userPreferences.meatKind[b.meatKind] || 0) * 3;
        scoreB += (userPreferences.type[b.spicy ? "Spicy" : "Not Spicy"] || 0);
        scoreB += (userPreferences.taste[b.taste] || 0) * 2;

        return scoreB - scoreA;
    });
    console.log("Recommended meals have been updated based on user preferences.");
}

function nextMeal() {
    if (meals.length === 0 || !mealOfTheDayContainer.classList.contains("hidden")) return;
    currentMealIndex = (currentMealIndex + 1) % meals.length;
    updateMeal();
}

function displayMealOfTheDay() {
    if (meals.length === 0) return;
    const bestMatch = meals[0];
    mealOfTheDayImg.src = bestMatch.img;
    mealOfTheDayName.textContent = bestMatch.name;
    mealOfTheDayDescription.textContent = bestMatch.description;
    mealOfTheDayContainer.classList.remove("hidden");
    card.classList.add("hidden");
}

document.addEventListener("keydown", handleKey);

// Add touch event listeners for swipe functionality on mobile
let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
    if (touchendX < touchstartX - 50) {
        handleSwipe("left");
    }
    if (touchendX > touchstartX + 50) {
        handleSwipe("right");
    }
}

document.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
});

// Show popup when the page loads
window.onload = () => {
    updateMeal();
    popup.style.display = "flex";
};



