
// FOODIE - Food Ordering System

// Food Database
const foods = [
    {
        id: 1,
        name: "Classic Burger",
        category: "Burger",
        price: 149,
        rating: 4.9,
        description: "Juicy burger with fresh vegetables.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
    },
    {
        id: 2,
        name: "Cheese Pizza",
        category: "Pizza",
        price: 299,
        rating: 4.8,
        description: "Delicious pizza with extra cheese.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
    },
    {
        id: 3,
        name: "Chicken Biryani",
        category: "Biryani",
        price: 199,
        rating: 4.9,
        description: "Aromatic biryani with tasty spices.",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600"
    },
    {
        id: 4,
        name: "French Fries",
        category: "Burger",
        price: 99,
        rating: 4.7,
        description: "Crispy golden potato fries.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600"
    },
    {
        id: 5,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 349,
        rating: 4.8,
        description: "Hot pizza with delicious toppings.",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600"
    },
    {
        id: 6,
        name: "Cold Coffee",
        category: "Drinks",
        price: 119,
        rating: 4.6,
        description: "Refreshing chilled coffee.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600"
    },
    {
        id: 7,
        name: "Chicken Burger",
        category: "Burger",
        price: 179,
        rating: 4.8,
        description: "Crispy chicken with creamy sauce.",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=600"
    },
    {
        id: 8,
        name: "Mutton Biryani",
        category: "Biryani",
        price: 279,
        rating: 4.9,
        description: "Rich and flavourful mutton biryani.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600"
    },
    {
        id: 9,
        name: "Fresh Orange Juice",
        category: "Drinks",
        price: 89,
        rating: 4.7,
        description: "Fresh and refreshing orange juice.",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600"
    }
];

// Cart
let cart = [];
let selectedCategory = "All";

// Elements
const foodGrid = document.getElementById("foodGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const cartModal = document.getElementById("cartModal");
const checkoutModal = document.getElementById("checkoutModal");

const searchInput = document.getElementById("searchInput");

// Display Food
function displayFoods() {
    const searchText = searchInput.value.toLowerCase();

    const filteredFoods = foods.filter(food => {
        const categoryMatch =
            selectedCategory === "All" ||
            food.category === selectedCategory;

        const searchMatch =
            food.name.toLowerCase().includes(searchText);

        return categoryMatch && searchMatch;
    });

    foodGrid.innerHTML = "";

    if (filteredFoods.length === 0) {
        foodGrid.innerHTML =
            '<p class="empty-message">No food found. Try another search!</p>';
        return;
    }

    filteredFoods.forEach(food => {
        const card = document.createElement("div");
        card.className = "food-card";

        card.innerHTML = `
            <img src="${food.image}" alt="${food.name}" loading="lazy">

            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>

                <div class="food-bottom">
                    <span class="price">₹${food.price}</span>

                    <button class="add-btn" data-id="${food.id}">
                        + Add
                    </button>
                </div>

                <small style="color:#ffca45">
                    ⭐ ${food.rating} | ${food.category}
                </small>
            </div>
        `;

        foodGrid.appendChild(card);
    });
}

// Add to Cart
function addToCart(id) {
    const food = foods.find(item => item.id === id);

    if (!food) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    updateCart();

    alert(food.name + " added to your cart!");
}

// Update Cart
function updateCart() {
    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    cartCount.textContent = totalQuantity;

    displayCart();
}

// Display Cart
function displayCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p style="color:#aaa;padding:20px 0">Your cart is empty!</p>';
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";

        const name = document.createElement("h4");
        name.textContent = item.name;

        const price = document.createElement("small");
        price.textContent = "₹" + item.price * item.quantity;

        const details = document.createElement("div");
        details.append(name, price);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const minus = document.createElement("button");
        minus.textContent = "−";
        minus.dataset.action = "decrease";
        minus.dataset.id = item.id;

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.dataset.action = "increase";
        plus.dataset.id = item.id;

        controls.append(minus, quantity, plus);
        div.append(details, controls);

        cartItems.appendChild(div);
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartTotal.textContent = "₹" + total;
}

// Change Quantity
function changeQuantity(id, action) {
    const item = cart.find(food => food.id === id);

    if (!item) return;

    if (action === "increase") {
        item.quantity++;
    } else if (action === "decrease") {
        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(food => food.id !== id);
        }
    }

    updateCart();
}

// Category Buttons
document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".category.active")
            ?.classList.remove("active");

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        displayFoods();
    });
});

// Search
searchInput.addEventListener("input", displayFoods);

// Food Add Button
foodGrid.addEventListener("click", event => {
    const button = event.target.closest(".add-btn");

    if (button) {
        addToCart(Number(button.dataset.id));
    }
});

// Cart Quantity Buttons
cartItems.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (button) {
        changeQuantity(
            Number(button.dataset.id),
            button.dataset.action
        );
    }
});

// Open Cart
document.getElementById("openCart").addEventListener("click", () => {
    cartModal.classList.add("show");
});

// Close Cart
document.getElementById("closeCart").addEventListener("click", () => {
    cartModal.classList.remove("show");
});

// Checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Please add some food to your cart first!");
        return;
    }

    cartModal.classList.remove("show");
    checkoutModal.classList.add("show");

    document.getElementById("checkoutForm").hidden = false;
    document.getElementById("orderSuccess").hidden = true;
});

// Close Checkout
document.getElementById("closeCheckout").addEventListener("click", () => {
    checkoutModal.classList.remove("show");
});

// Place Order
document.getElementById("checkoutForm").addEventListener("submit", event => {
    event.preventDefault();

    if (cart.length === 0) return;

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const payment = document.getElementById("paymentMethod").value;

    if (!name || !phone || !address) {
        alert("Please fill all details!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const orderNumber = "FD" + Date.now().toString().slice(-6);

    const orderDetails = document.getElementById("orderDetails");

    orderDetails.textContent =
        `Thank you, ${name}! Your demo order ${orderNumber} ` +
        `has been placed. Total: ₹${total}. Payment: ${payment}.`;

    document.getElementById("checkoutForm").hidden = true;
    document.getElementById("orderSuccess").hidden = false;

    cart = [];
    updateCart();
    event.target.reset();
});

// Finish Order
document.getElementById("finishOrder").addEventListener("click", () => {
    checkoutModal.classList.remove("show");
    document.getElementById("checkoutForm").hidden = false;
    document.getElementById("orderSuccess").hidden = true;
});

// Close modal by clicking outside
[cartModal, checkoutModal].forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

// Initial Load
displayFoods();
updateCart();

console.log("FOODIE Website Loaded Successfully!");
