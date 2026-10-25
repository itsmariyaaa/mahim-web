const CART_KEY = "vintageCupCart";


function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];

    } catch {

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();

}


function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) =>
            total + Number(item.qty || 0),
        0
    );


    document
        .querySelectorAll("#cartCount")
        .forEach(element => {

            element.textContent = count;

        });

}


function addToCart(name, price) {

    const cart = getCart();


    const existing = cart.find(
        item => item.name === name
    );


    if (existing) {

        existing.qty += 1;

    } else {

        cart.push({

            name: name,

            price: Number(price),

            qty: 1

        });

    }


    saveCart(cart);


    alert(
        name + " added to your order!"
    );

}


function changeQty(index, amount) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    cart[index].qty += amount;


    if (cart[index].qty <= 0) {

        cart.splice(index, 1);

    }


    saveCart(cart);

    renderOrder();

}


function removeItem(index) {

    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    renderOrder();

}


function renderOrder() {

    const container =
        document.getElementById("orderItems");


    if (!container) {
        return;
    }


    const cart = getCart();


    if (cart.length === 0) {

        container.innerHTML = `
            <p>
                Your cart is empty.
                <a href="menu.html">
                    <u>Browse the menu</u>
                </a>
            </p>
        `;

        updateTotals();

        return;

    }


    container.innerHTML = cart.map(
        (item, index) => `

        <div class="order-item">

            <div>

                <strong>
                    ${item.name}
                </strong>

                <div>
                    ৳${item.price}
                </div>

            </div>


            <div class="qty">

                <button
                    onclick="changeQty(${index}, -1)"
                >
                    −
                </button>

                <span>
                    ${item.qty}
                </span>

                <button
                    onclick="changeQty(${index}, 1)"
                >
                    +
                </button>

                <button
                    onclick="removeItem(${index})"
                >
                    🗑
                </button>

            </div>

        </div>

        `
    ).join("");


    updateTotals();

}


function updateTotals() {

    const cart = getCart();


    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.qty,
        0
    );


    const delivery =
        subtotal > 0 ? 50 : 0;


    const subtotalElement =
        document.getElementById("subtotal");


    const totalElement =
        document.getElementById("total");


    if (subtotalElement) {

        subtotalElement.textContent =
            "৳" + subtotal;

    }


    if (totalElement) {

        totalElement.textContent =
            "৳" + (subtotal + delivery);

    }


    const orderData =
        document.getElementById("orderData");


    if (orderData) {

        orderData.value =
            JSON.stringify(cart);

    }

}


/* ================= MENU FILTER ================= */

function setupMenu() {

    const buttons =
        document.querySelectorAll(".filter");


    const boxes =
        document.querySelectorAll(".menu-box");


    const search =
        document.getElementById("menuSearch");


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn =>
                    btn.classList.remove("active")
                );


                button.classList.add("active");


                const category =
                    button.dataset.filter;


                boxes.forEach(box => {

                    if (
                        category === "all" ||
                        box.dataset.category === category
                    ) {

                        box.style.display = "";

                    } else {

                        box.style.display = "none";

                    }

                });

            }
        );

    });


    if (search) {

        search.addEventListener(
            "input",
            () => {

                const value =
                    search.value.toLowerCase();


                boxes.forEach(box => {

                    if (
                        box.textContent
                            .toLowerCase()
                            .includes(value)
                    ) {

                        box.style.display = "";

                    } else {

                        box.style.display = "none";

                    }

                });

            }
        );

    }

}


/* ================= SEARCH ================= */

function setupSearch() {

    const button =
        document.getElementById("searchBtn");


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            const query =
                prompt(
                    "What would you like to search for?"
                );


            if (!query) {
                return;
            }


            window.location.href =
                "menu.html";

        }
    );

}


/* ================= PAGE LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        renderOrder();

        setupMenu();

        setupSearch();

    }
);