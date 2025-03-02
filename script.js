async function fetchMeal() {
    const response = await fetch('/get_meal');
    const meal = await response.json();

    document.getElementById("meal-img").src = meal.img;
    document.getElementById("meal-name").textContent = meal.name;
    document.getElementById("meal-description").textContent = meal.description;
}

async function updatePreferences(liked) {
    await fetch('/update_preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liked: liked })
    });
    fetchMeal();
}

document.getElementById("like-button").addEventListener("click", () => updatePreferences(true));
document.getElementById("dislike-button").addEventListener("click", () => updatePreferences(false));

window.onload = fetchMeal;
