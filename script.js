// =========================
// PRODUCTS DATA
// =========================

const products = [

{
id:1,
name:"Google Pixel 9",
category:"mobile",
price:69999,
rating:4.8,
reviews:245,
image:"images/google_pixel.png"
},

{
id:2,
name:"iPhone 14",
category:"mobile",
price:79999,
rating:4.9,
reviews:430,
image:"images/iphone_14.png"
},

{
id:3,
name:"Samsung Galaxy",
category:"mobile",
price:58999,
rating:4.7,
reviews:210,
image:"images/samsung_galaxy.png"
},

{
id:4,
name:"Canon EOS Camera",
category:"camera",
price:94999,
rating:4.9,
reviews:132,
image:"images/cannon_eos_camera.png"
},

{
id:5,
name:"Sony A7 Camera",
category:"camera",
price:129999,
rating:5.0,
reviews:94,
image:"images/sony_a7_camera.png"
},

{
id:6,
name:"Sony ZV1F",
category:"camera",
price:54999,
rating:4.8,
reviews:140,
image:"images/sony_zv1f_camera.png"
},

{
id:7,
name:"PlayStation 5",
category:"gaming",
price:54990,
rating:5.0,
reviews:650,
image:"images/playstation_5.png"
},

{
id:8,
name:"Xbox Series X",
category:"gaming",
price:52990,
rating:4.9,
reviews:312,
image:"images/xbox_series_x.png"
},

{
id:9,
name:"Nintendo Switch",
category:"gaming",
price:28999,
rating:4.7,
reviews:280,
image:"images/nintendo_switch.png"
},

{
id:10,
name:"Samsung Smart TV",
category:"tv",
price:45999,
rating:4.6,
reviews:110,
image:"images/samsung_tv.png"
},

{
id:11,
name:"LG Smart TV",
category:"tv",
price:55999,
rating:4.8,
reviews:125,
image:"images/lg_tv.png"
},

{
id:12,
name:"Toshiba Smart TV",
category:"tv",
price:39999,
rating:4.5,
reviews:76,
image:"images/toshiba_tv.png"
}

];

// =========================
// DOM ELEMENTS
// =========================

const productsWrapper =
document.getElementById("products-wrapper");

const searchInput =
document.getElementById("search");

const sortSelect =
document.getElementById("sort");

const categoryInputs =
document.querySelectorAll("input[name='category']");

const cartCount =
document.getElementById("cart-count");

const wishlistCount =
document.getElementById("wishlist-count");

const cartItems =
document.getElementById("cart-items");

const cartTotal =
document.getElementById("cart-total");

const cartSidebar =
document.getElementById("cart-sidebar");

const closeCart =
document.getElementById("close-cart");

const darkModeBtn = document.getElementById("dark-mode-btn");

const wishlistSidebar = document.getElementById("wishlist-sidebar");
const closeWishlist = document.getElementById("close-wishlist");
const wishlistButton = document.querySelector(".fa-heart").parentElement;
const cartButton = document.querySelector(".fa-cart-shopping").parentElement;
const wishlistItems = document.getElementById("wishlist-items");

// =========================
// VARIABLES
// =========================

let filteredProducts = [...products];

let cart = [];
let wishlist=[];

// =========================
// CREATE PRODUCT CARD
// =========================

function displayProducts(productArray) {

productsWrapper.innerHTML = "";

if(productArray.length===0){

productsWrapper.innerHTML=`

<div class="col-span-full text-center py-20">

<h2 class="text-3xl font-bold">

No Products Found

</h2>

<p class="text-gray-500 mt-3">

Try another category.

</p>

</div>

`;

return;

}

productArray.forEach(product=>{

const card=document.createElement("div");

card.className=
"bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300";

card.innerHTML=`

<img
src="${product.image}"
alt="${product.name}"
class="w-full h-64 object-contain bg-gray-100 p-5">

<div class="p-5">

<span
class="text-sm text-blue-600 font-semibold uppercase">

${product.category}

</span>

<h2
class="text-2xl font-bold mt-2">

${product.name}

</h2>

<div
class="flex justify-between items-center mt-4">

<h3
class="text-blue-600 text-2xl font-bold">

₹${product.price.toLocaleString()}

</h3>

<span
class="text-yellow-500">

⭐ ${product.rating}

</span>

</div>

<p
class="text-gray-500 text-sm mt-2">

${product.reviews} Reviews

</p>

<div class="flex justify-end mb-2">
    <button
        class="wishlist-btn text-2xl"
        data-id="${product.id}">
        🤍
    </button>
</div>

<button
class="add-cart mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
data-id="${product.id}">

Add To Cart

</button>

</div>

`;

productsWrapper.appendChild(card);

});

}

// =========================
// FIRST LOAD
// =========================

displayProducts(filteredProducts);

// =========================
// ADD TO CART
// =========================

productsWrapper.addEventListener("click", (e) => {

    // Wishlist
if (e.target.classList.contains("wishlist-btn")) {

    const id = Number(e.target.dataset.id);

    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);

        e.target.innerHTML = "🤍";
        e.target.classList.add("animate");

setTimeout(() => {
    e.target.classList.remove("animate");
}, 200);

    } else {
        wishlist.push(id);

         e.target.innerHTML = "❤️";

         e.target.classList.add("animate");

setTimeout(() => {
    e.target.classList.remove("animate");
}, 200);

    }
    wishlistCount.textContent = wishlist.length;
    updateWishlist();

    return;
}

// Add To Cart
if (!e.target.classList.contains("add-cart")) return;

    const id = Number(e.target.dataset.id);

    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
         return;

    } 
     cart.push({
            ...product,
            quantity: 1
        });

    

    updateCart();

});

function updateCart() {

    cartItems.innerHTML = "";
    if (cart.length === 0) {

    cartItems.innerHTML = `
        <div class="text-center mt-20">
            <h2 class="text-2xl font-bold">🛒 Your Cart is Empty</h2>
            <p class="text-gray-500 mt-2">
                Add some products to get started.
            </p>
        </div>
    `;

    cartCount.textContent = "0";
    cartTotal.textContent = "0";

    return;
}


    let total = 0;
    let count = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;

        cartItems.innerHTML += `
<div class="bg-gray-100 rounded-xl p-4 mb-4 text-center">

    <img
        src="${item.image}"
        alt="${item.name}"
        class="w-40 h-40 object-contain mx-auto">

    <h3 class="text-xl font-bold mt-3">
        ${item.name}
    </h3>

    <p class="text-blue-600 font-bold mt-2">
        ₹${item.price.toLocaleString()}
    </p>

    <div class="flex justify-center items-center gap-4 mt-3">

    <button
        class="decrease bg-gray-300 hover:bg-gray-400 w-8 h-8 rounded-full"
        data-id="${item.id}">
        -
    </button>

    <span class="font-bold text-lg">
        ${item.quantity}
    </span>

    <button
        class="increase bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full"
        data-id="${item.id}">
        +
    </button>

</div>


    <button
        class="remove-item mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        data-id="${item.id}">
        Remove
    </button>

</div>
`;


    });

    cartCount.textContent = count;

    cartTotal.textContent = total.toLocaleString();
    cartSidebar.classList.remove("translate-x-full");
    cartSidebar.classList.add("translate-x-0");


}

function updateWishlist() {
    wishlistItems.innerHTML = "";

if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
        <div class="text-center mt-20">
            <h2 class="text-2xl font-bold">❤️ Your Wishlist is Empty</h2>
            <p class="text-gray-500 mt-2">
                Add your favorite products.
            </p>
        </div>
    `;
    return;
}

wishlist.forEach((id) => {

    const product = products.find(item => item.id === id);

    wishlistItems.innerHTML += `
        <div class="flex items-center gap-4 border-b pb-4 mb-4">
            <img src="${product.image}" class="w-28 h-28 object-contain mx-auto">

            <div>
                <h3 class="font-semibold">${product.name}</h3>
                <p class="text-blue-600 font-bold">₹${product.price.toLocaleString("en-IN")}</p>
            </div>
        </div>
    `;

});

}

cartItems.addEventListener("click", (e) => {

    const id = Number(e.target.dataset.id);

    // Remove Item
    if (e.target.classList.contains("remove-item")) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
        return;
    }

    // Increase Quantity
    if (e.target.classList.contains("increase")) {
        const item = cart.find(item => item.id === id);

        if (item) {
            item.quantity++;
            updateCart();
        }
        return;
    }

    // Decrease Quantity
    if (e.target.classList.contains("decrease")) {
        const item = cart.find(item => item.id === id);

        if (item && item.quantity > 1) {
            item.quantity--;
            updateCart();
        }
    }

});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("translate-x-0");
    cartSidebar.classList.add("translate-x-full");
});

cartButton.addEventListener("click", () => {
    cartSidebar.classList.remove("translate-x-full");
    cartSidebar.classList.add("translate-x-0");
});

wishlistButton.addEventListener("click", () => {
    wishlistSidebar.classList.remove("translate-x-full");
    wishlistSidebar.classList.add("translate-x-0");
});

closeWishlist.addEventListener("click", () => {
    wishlistSidebar.classList.remove("translate-x-0");
    wishlistSidebar.classList.add("translate-x-full");
});

// =========================
// FILTER + SEARCH + SORT
// =========================

function updateProducts() {

let result = [...products];

// Search

const keyword = searchInput.value.toLowerCase().trim();

if(keyword !== ""){

result = result.filter(product =>
product.name.toLowerCase().includes(keyword)
);

}

// Category

const selectedCategory =
document.querySelector("input[name='category']:checked").value;

if(selectedCategory !== "all"){

result = result.filter(product =>
product.category === selectedCategory
);

}

// Sort
// Sort (Category Wise)

const categories = ["mobile", "camera", "gaming", "tv"];

let sortedResult = [];

categories.forEach(category => {

    let items = result.filter(product => product.category === category);

    if (sortSelect.value === "low") {
        items.sort((a, b) => a.price - b.price);
    }

    else if (sortSelect.value === "high") {
        items.sort((a, b) => b.price - a.price);
    }

    sortedResult.push(...items);

});

result = sortedResult;

filteredProducts=result;

displayProducts(filteredProducts);

}

// =========================
// EVENTS
// =========================

searchInput.addEventListener("input",updateProducts);

sortSelect.addEventListener("change",updateProducts);

categoryInputs.forEach(input=>{

input.addEventListener("change",updateProducts);

});

// First Load

updateProducts();

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (darkModeBtn.textContent === "🌙") {
        darkModeBtn.textContent = "☀️";
    } else {
        darkModeBtn.textContent = "🌙";
    }

});