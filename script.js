    async function fetchRecipes(ingredient) {
        const apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

        try {
            const response = await fetch(`${apiUrl}${ingredient}`);
            if (!response.ok) {
                throw new Error("Error fetching recipes");
            }

            const data = await response.json();
            if (data.meals) {
                displayRecipes(data.meals);
            } else {
                alert("No recipes found for the given ingredient.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to fetch recipes. Please try again later.");
        }
    }

    function displayRecipes(recipes) {
        const recipesContainer = document.getElementById("recipes");
        recipesContainer.innerHTML = "";

        recipes.forEach((recipe) => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            recipeCard.innerHTML = `
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-image" />
                <h3 class="recipe-title">${recipe.strMeal}</h3>
                <a href="https://www.themealdb.com/meal/${recipe.idMeal}" target="_blank" class="recipe-link">View Recipe</a>
            `;

            recipesContainer.appendChild(recipeCard);
        });
    }

    document.querySelector(".searchButton").addEventListener("click", () => {
        const searchInput = document.querySelector(".searchInput").value.trim();
        if (searchInput) {
            fetchRecipes(searchInput);
        } else {
            alert("Please enter an ingredient.");
        }
    });

    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
  //suggestion
    const availableKeywords = [
        "pancakes", "rice", "chicken", "Chicken Curry", "beef",""
    ];

    const resultsBox = document.querySelector(".result-box");
    const searchInput = document.querySelector(".searchInput");

    searchInput.addEventListener("keyup", function () {
        const input = searchInput.value.trim();
        const result = input
            ? availableKeywords.filter((keyword) =>
                keyword.toLowerCase().includes(input.toLowerCase())
            )
            : [];
        displayAutocomplete(result);
    });

    function displayAutocomplete(result) {
        if (result.length > 0) {
            const content = result
                .map((keyword) => `<li onclick="selectInput(this)">${keyword}</li>`)
                .join("");
            resultsBox.innerHTML = `<ul>${content}</ul>`;
            resultsBox.style.display = "block";
        } else {
            resultsBox.innerHTML = "";
            resultsBox.style.display = "none";
        }
    }

    function selectInput(list) {
        searchInput.value = list.textContent;
        resultsBox.innerHTML = "";
        resultsBox.style.display = "none";
    }

    // loadar
document.addEventListener("DOMContentLoaded", function () {
    const counter3 = document.querySelector(".counter-3");

    function animate(counter, duration, delay = 0) {
        const numHeight = counter.querySelector(".num").clientHeight;
        const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;
        gsap.to(counter, { y: -totalDistance, duration: duration, delay: delay, ease: "power2.inOut" });
    }

    animate(counter3, 5);
    animate(document.querySelector(".counter-2"), 6);
    animate(document.querySelector(".counter-1"), 2, 4);
});

gsap.to(".digit", {
    top: "-150px",
    stagger: { amount: 0.25 },
    delay: 6,
    duration: 1,
    ease: "power4.inOut"
});

gsap.from(".loadar-1", { width: 0, duration: 2, ease: "power2.inOut" });

gsap.from(".loadar-2", { width: 0, delay: 1.9, duration: 2, ease: "power2.inOut" });

gsap.to(".loadar", { background: "none", delay: 5, duration: 0.1 });

gsap.to(".loadar-1", { rotate: 90, y: -50, duration: 0.5, delay: 5 });

gsap.to(".loadar-2", { x: -75, y: 75, duration: 0.5 }, "<");

gsap.to(".loadar", { scale: 40, duration: 1, delay: 7, ease: "power2.inOut" });

gsap.to(".loadar", { rotate: 45, y: 500, x: 2000, duration: 1, delay: 7, ease: "power2.inOut" });

gsap.to(".loading-screen", { opacity: 0, duration: 0.5, delay: 7, ease: "power1.inOut" });

gsap.to("h1", {
    delay: 7,
    y: -80,
    ease: "power4.inOut",
    stagger: { amount: 0.1 }
});

// filter
async function fetchByCategory() {
    const category = document.getElementById("category-filter").value;
    const area = document.getElementById("area-filter").value;
    
    let apiUrl = "";

    if (category) {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    } else if (area) {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    } else {
        document.getElementById("recipes").innerHTML = "<p>Please select a filter.</p>";
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            document.getElementById("recipes").innerHTML = "<p>No recipes found.</p>";
        }
    } catch (error) {
        console.error("Error fetching recipes", error);
        document.getElementById("recipes").innerHTML = "<p>Error fetching recipes. Please try again.</p>";
    }
}

