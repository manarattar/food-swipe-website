const BACKEND_URL = "https://food-swipe-website.onrender.com"; // Update this with your Render URL

async function fetchMeal() {
    try {
        const response = await fetch(`${BACKEND_URL}/get_meal`);
        if (!response.ok) throw new Error("Failed to fetch meal");
        
        const meal = await response.json();
        document.getElementById("meal-img").src = meal.img;
        document.getElementById("meal-name").textContent = meal.name;
        document.getElementById("meal-description").textContent = meal.description;
    } catch (error) {
        console.error("Error fetching meal:", error);
    }
}

async function updatePreferences(liked) {
    try {
        const response = await fetch(`${BACKEND_URL}/update_preferences`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ liked: liked })
        });

        if (!response.ok) throw new Error("Failed to update preferences");
        fetchMeal();
    } catch (error) {
        console.error("Error updating preferences:", error);
    }
}

document.getElementById("like-button").addEventListener("click", () => updatePreferences(true));
document.getElementById("dislike-button").addEventListener("click", () => updatePreferences(false));

window.onload = fetchMeal;
