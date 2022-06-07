const products = [
  {
    id: 1,
    name: "New Balance Green",
    price: 50,
    image: "/img/img-1.jpg",
  },
  {
    id: 2,
    name: "Nike Brown",
    price: 60,
    image: "/img/img-2.jpg",
  },
  {
    id: 3,
    name: "Nike Pink",
    price: 70,
    image: "/img/img-3.jpg",
  },
  {
    id: 4,
    name: "Nike Red",
    price: 80,
    image: "/img/img-4.jpg",
  },
];

// function to select elements from the DOM
const select = (element) => document.querySelector(element);

// function to create DOM elements
const create = (element) => document.createElement(element);

// select element by ID in DOM
const productContainer = select("#products");

// iterate throught array of products
for (let product of products) {
  // create div element in DOM
  const div = create("div");

  // extract product properties
  const { id, name, price, image } = product;

  div.innerHTML = `
  <div class="product-container">
        <h3>${name}</h3>
        <img src="${image}" alt="" />
        <h3>$${price}</h3>
        <button class="button-add" id="addToCart-${id}">Add</button class = "button-add">
      </div>`;

  // add div to DOM
  productContainer.append(div);

  // select buttons by ID
  const buttonAdd = select(`#addToCart-${id}`);

  // add event listeners to buttons
  // give parameter to callback
  buttonAdd.addEventListener("click", () => addToCart(product));
}

function addToCart(product) {
  // get checkout from local storage
  const checkout = getCheckout();

  // find product in checkout by ID
  const productInCheckout = checkout.find((item) => item.id === product.id);

  // if product is already in checkout, increase amount
  if (productInCheckout) {
    productInCheckout.quantity++;
  } // if product is not in checkout, add
  else {
    product.quantity = 1;
    checkout.push(product);
  }

  //save checkout in local storage
  saveCheckout(checkout);

  // show checkout in DOM
  renderCheckout();
}

// function to get checkout from local storage, if not found return empty array
function getCheckout() {
  return JSON.parse(localStorage.getItem("checkout")) || [];
}

// function to save checkout in local storage
function saveCheckout(checkout) {
  localStorage.setItem("checkout", JSON.stringify(checkout));
}

// function to render checkout
function renderCheckout() {
  const checkout = getCheckout();
  const checkoutContainer = select("#checkout");
  const quantity = select("#quantity");
  const total = select("#total");

  quantity.innerText = calculateQuantity(checkout);
  total.innerText = "$" + calculateTotal(checkout);

  checkoutContainer.innerHTML = "";

  // iterate through product array in chekcout
  for (let product of checkout) {
    // extract product properties
    const { name, price, quantity } = product;
    const div = create("div");

    // template to show prod in checkout
    div.innerHTML = `
    <div class="checkout">
        <h5 id="quantity">Quantity: ${quantity}</h5>
        <h5 id="total">Total: $${total}</h5>
        <div id="checkout"></div>

      </div>
    `;

    // add div to DOM
    checkoutContainer.append(div);
  }
}

// function to calculate total
function calculateTotal(checkout) {
  return checkout.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
}

// function to calculate quantity
function calculateQuantity(checkout) {
  return checkout.reduce((total, item) => total + item.quantity, 0);
}
