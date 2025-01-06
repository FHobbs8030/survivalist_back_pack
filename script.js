document.addEventListener("DOMContentLoaded", () => {
    displayItems();
});

const items = [
    { name: "Tent", category: "Shelter", weight: 5, volume: 10, description: "A lightweight two-person tent.", image: "tent.png" },
    { name: "Sleeping Bag", category: "Shelter", weight: 3, volume: 8, description: "Keeps you warm in cold conditions.", image: "sleeping_bag.png" },
    { name: "Water Filter", category: "Water", weight: 1, volume: 1, description: "Filters 1000 liters of water.", image: "water_filter.png" },
    { name: "Water Bottle", category: "Water", weight: 0.5, volume: 1, description: "Reusable water bottle.", image: "water_bottle.png" },
    { name: "First Aid Kit", category: "First Aid", weight: 2, volume: 3, description: "Basic first aid supplies.", image: "first_aid.png" },
    { name: "Compass", category: "Navigation", weight: 0.2, volume: 0.1, description: "Essential for navigation.", image: "compass.png" },
    { name: "Knife", category: "Tools", weight: 0.5, volume: 0.1, description: "Multi-purpose knife", image: "knife.png" },
    { name: "Lighter", category: "Fire Starting", weight: 0.1, volume: 0.05, description: "Butane lighter.", image: "lighter.png" },
    { name: "Matches (Waterproof)", category: "Fire Starting", weight: 0.2, volume: 0.1, description: "Waterproof matches in a sealed container.", image: "matches.png" },
    { name: "Ferro Rod", category: "Fire Starting", weight: 0.3, volume: 0.1, description: "Produces sparks for fire starting.", image: "ferro_rod.png" },
    { name: "Dried Fruit", category: "Food", weight: 0.5, volume: 0.5, description: "Lightweight and high-energy snack.", image: "dried_fruit.png" },
    { name: "Trail Mix", category: "Food", weight: 1, volume: 1, description: "Mix of nuts, seeds, and dried fruit.", image: "trail_mix.png" },
    { name: "Ramen Noodles", category: "Food", weight: 0.3, volume: 0.5, description: "Lightweight and easy to prepare.", image: "ramen.png" },
    { name: "Energy Bars", category: "Food", weight: 0.25, volume: 0.2, description: "Provides quick energy.", image: "energy_bar.png" },
    { name: "Canned Beans", category: "Food", weight: 1.5, volume: 0.75, description: "Good source of protein", image: "canned_beans.png" }
];

const backpack = document.getElementById('backpack');
const totalWeightDisplay = document.getElementById('totalWeight');
const totalVolumeDisplay = document.getElementById('totalVolume');
const itemDetailsModal = document.getElementById('itemDetails');
const detailName = document.getElementById('detailName');
const detailImage = document.getElementById('detailImage');
const detailDescription = document.getElementById('detailDescription');
const closeButton = document.querySelector('.close-button');

let totalWeight = 0;
let totalVolume = 0;

function displayItems() {
    const categories = {};
    items.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });

    backpack.innerHTML = ""; // Clear existing items

    for (const category in categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = "category";
        categoryDiv.innerHTML = `<h2>${category}</h2>`;
        categories[category].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = "item";
            itemDiv.dataset.itemName = item.name; // Store item name for modal
            itemDiv.innerHTML = `<img src="${item.image}" alt="${item.name}"><span>${item.name} (${item.weight} lbs, ${item.volume} L)</span>`;
            categoryDiv.appendChild(itemDiv);

            itemDiv.addEventListener('click', () => showItemDetails(item));
        });
        backpack.appendChild(categoryDiv);
    }

    updateTotals();
}

function updateTotals() {
    totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    totalVolume = items.reduce((sum, item) => sum + item.volume, 0);

    totalWeightDisplay.textContent = `Total Weight: ${totalWeight} lbs`;
    totalVolumeDisplay.textContent = `Total Volume: ${totalVolume} L`;
}

function showItemDetails(item) {
    detailName.textContent = item.name;
    detailImage.src = item.image;
    detailDescription.textContent = item.description;
    itemDetailsModal.style.display = "block";
}

closeButton.onclick = function() {
    itemDetailsModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == itemDetailsModal) {
        itemDetailsModal.style.display = "none";
    }
};

displayItems(); // Initialize the item display
