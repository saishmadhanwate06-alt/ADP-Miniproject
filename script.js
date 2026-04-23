let currentRating = 0;

// ================= CART =================
function addToCart(name, price){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let found = cart.find(item => item.name === name);

    if(found){
        found.qty += 1;
    } else {
        cart.push({name, price, qty: 1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart");
}

// ================= LOAD CART =================
function loadCart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let list = document.getElementById("cartItems");

    if(!list) return;

    list.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let qty = item.qty || 1;
        let price = item.price || 0;

        list.innerHTML += `<li>${item.name} x ${qty} - ₹${price * qty}</li>`;
        total += price * qty;
    });

    let totalBox = document.getElementById("total");
    if(totalBox){
        totalBox.textContent = "Total: ₹" + total;
    }
}

// ================= ORDER PAGE =================
function loadOrders(){
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let list = document.getElementById("orderList");

    if(!list) return;

    list.innerHTML = "";
    let total = 0;

    orders.forEach(order => {
        order.items.forEach(item=>{
            let qty = item.qty || 1;
            let price = item.price || 0;

            list.innerHTML += `<li>${item.name} x ${qty} - ₹${price * qty}</li>`;
            total += price * qty;
        });
    });

    let totalBox = document.getElementById("orderTotal");
    if(totalBox){
        totalBox.textContent = "Total: ₹" + total;
    }
}

// ================= CLEAR CART =================
function clearCart(){
    localStorage.removeItem("cart");
    loadCart();
}

// ================= FEEDBACK =================
function setRating(num){
    currentRating = num;

    let stars = document.querySelectorAll(".stars span");

    stars.forEach((star, index) => {
        if(index < num){
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }
    });
}

function submitFeedback(){
    if(currentRating === 0){
        alert("Please select rating ⭐");
        return;
    }

    let text = document.getElementById("feedbackText").value;

    let data = JSON.parse(localStorage.getItem("feedback")) || [];

    data.push({rating: currentRating, text});

    localStorage.setItem("feedback", JSON.stringify(data));

    alert("Feedback submitted ❤️");

    currentRating = 0;
    document.getElementById("feedbackText").value = "";

    document.querySelectorAll(".stars span").forEach(s => s.classList.remove("active"));

    loadAverage();
}

function loadAverage(){
    let data = JSON.parse(localStorage.getItem("feedback")) || [];

    if(data.length === 0){
        let el = document.getElementById("avgRating");
        if(el) el.textContent = "Average Rating: 0 ⭐";
        return;
    }

    let total = 0;
    data.forEach(f => total += f.rating);

    let avg = (total / data.length).toFixed(1);

    let el = document.getElementById("avgRating");
    if(el){
        el.textContent = "Average Rating: " + avg + " ⭐";
    }
}

// ================= PAYMENT =================
function loadSummary(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let list = document.getElementById("summary");

    if(!list) return;

    list.innerHTML = "";
    let total = 0;

    cart.forEach(item=>{
        let qty = item.qty || 1;
        let price = item.price || 0;

        list.innerHTML += `<li>${item.name} x ${qty} - ₹${price * qty}</li>`;
        total += price * qty;
    });

    let totalBox = document.getElementById("total");
    if(totalBox){
        totalBox.textContent = "Total: ₹" + total;
    }
}

function payNow(){
    let name = document.getElementById("custName").value;
    let mobile = document.getElementById("mobile").value;
    let address = document.getElementById("address").value;
    let method = document.getElementById("method").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        name,
        mobile,
        address,
        method,
        items: cart,
        date: new Date().toLocaleString(),
        status: "Pending"
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Payment Successful 🎉");
    window.location.href = "order.html";
}

// ================= AUTO LOAD =================
window.addEventListener("load", function(){

    if(document.getElementById("cartItems")){
        loadCart();
    }

    if(document.getElementById("orderList")){
        loadOrders();
    }

    if(document.getElementById("avgRating")){
        loadAverage();
    }

    if(document.getElementById("summary")){
        loadSummary();
    }

});
function goToPayment(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Cart is empty 🛒");
        return;
    }

    window.location.href = "payment.html";
}
function goToPayment(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Cart is empty 🛒");
        return;
    }

    window.location.href = "payment.html";
}