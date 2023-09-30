let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.cart-close');
let body = document.querySelector('body');
let cart = document.querySelector('.cart');



openShopping.addEventListener('click', () => {
  body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
})

if (document.readyState == "loading") {
  document.addEventListener('DOMContentLoaded', start);
}
else {
  start();
}

function start() {
  addEvents()
}

function update() {
  addEvents();
  updateTotal();
}

function addEvents() {
  let cartRemove_btns = document.querySelectorAll('.cart-remove');
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener('click', handle_removeCartItem);
  });
  let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
  cartQuantity_inputs.forEach(input => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  let addCart_btns = document.querySelectorAll('.add-to-cart');
  addCart_btns.forEach(btn => {
    btn.addEventListener('click', handle_addCartItem);
  });

  const buy_btn = document.querySelector('.btn-buy');
  buy_btn.addEventListener('click', handle_buyOrder);
}
let itemsAdded = [];

function handle_addCartItem() {

  let product = this.parentElement.parentElement;
  console.log(product); // Check the value of the parent element

  let title = product.getElementsByClassName("product-title")[0].textContent;
  let price = product.getElementsByClassName("product-price")[0].textContent;
  let imgSrc = product.getElementsByClassName("product-img")[0].getAttribute("src");
  console.log(title, price, imgSrc);
  // Create an object representing the product


  let newToAdd = {
    title,
    price,
    imgSrc,

  };
  if (itemsAdded.find(el => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  }
  else {
    itemsAdded.push(newToAdd);
  }
  let cartBoxElement = cartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector('.cart-content');
  cartContent.appendChild(newNode);

  update();

}
function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);
  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  update();
}
function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.")
    return
  }
  const cartContent = cart.querySelector('.cart-content');
  cartContent.innerHTML = "";
  alert("Your Order is Placed Successfully :)");
  itemsAdded = [];
  update();

}

function updateTotal() {
  let cartBoxes = document.querySelectorAll('.cart-box');
  const totalElement = cart.querySelector('.total-price');
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector('.cart-quantity').value;
    total += price * quantity;

  });
  total = total.toFixed(2);
  totalElement.innerHTML = "$" + total;
}

//**************

function cartBoxComponent(title, price, imgSrc) {
  return `<div class="cart-box">
    <img src=${imgSrc} alt="" class="cart-img">
      <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
      </div>
      <span class="material-symbols-outlined cart-remove">
        delete
      </span>
  </div>`;

}
