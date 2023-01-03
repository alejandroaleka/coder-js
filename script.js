let products = [];
let id = 1;
//Clase constructora de productos a la venta para luego definir array de objetos del menu de la pizzeria
class Menu {
  constructor(id, product, description, price, img) {
    this.id = id;
    this.productName = product;
    this.description = description;
    this.price = price;
    this.img = img;
  }
}

function addMenu(id, product, description, price, img) {
  let pizza = new Menu(id, product, description, price, img);
  products.push(pizza);
}

//Creacion de objetos del menu
addMenu(
  id++,
  "Margherita",
  "Tomates San Marzano, mozzarella de búfala, albahaca, aceite de oliva extra virgen, sal",
  2000,
  "./img/margherita.jpg"
);
addMenu(
  id++,
  "Porteña clásica",
  "Salsa de tomate, mozzarela, sal",
  1000,
  "./img/mozzarella.jpg"
);
addMenu(
  id++,
  "Napolitana",
  "Salsa de tomate, mozzarella, rodajas de tomate fresco, provenzal, aceite de oliva, sal",
  1500,
  "./img/napolitana.jpg"
);
addMenu(
  id++,
  "Jamón y Morrones",
  "Salsa de tomate, jamón cocido, mozzarella, condimento de la casa",
  1700,
  "./img/jamonMorron.jpg"
);
addMenu(
  id++,
  "Fugazza de la casa",
  "Mix de cebollas, queso reggianito rallado, aceite de oliva, sal",
  1500,
  "./img/fugazza.jpg"
);
addMenu(
  id++,
  "Fugazzetta de la casa",
  "Mix de cebollas, queso reggianito rallado, mozzarella de búfala, aceite de oliva, mix de pimientas",
  2300,
  "./img/fugazzetta.jpg"
);
addMenu(
  id++,
  "Jamón crudo",
  "Salsa de tomate, mozzarella, jamón crudo, rúcula, aceite de oliva, mix de pimientas",
  2500,
  "./img/crudoRucula.jpg"
);
addMenu(
  id++,
  "Clásica de anchoas",
  "Salsa de tomate, mozzarella, anchoas, aceituna negra, aceite de oliva, sal",
  1800,
  "./img/anchoa.png"
);
addMenu(
  id++,
  "Palmitos",
  "Salsa de tomate, mozzarella, jamón natural, palmito, aceite de oliva",
  2500,
  "./img/palmito.jpg"
);

let onlineCart = [];

//posicionarme en el DOM para luego renderizar
let menuDelivery = document.getElementById("menuD");
let deliveryCart = document.getElementById("deliveryCart");

renderMenu(products);

function renderMenu(arrayProducts) {
  menuDelivery.innerHTML = "";
  for (const product of arrayProducts) {
    let cardProduct = document.createElement("div");
    cardProduct.className = "col producto";
    cardProduct.id = product.id;
    cardProduct.innerHTML = `
      <h3>${product.productName}</h3>
      <p>${product.description}</p>
      <img src=${product.img}>
      <p>$ ${product.price}</p>
      <button class="btn btn-outline-light addCart" id=${product.id}>Agregar</button>
    `;
    menuDelivery.appendChild(cardProduct);
  }
  let addProducts = document.getElementsByClassName("addCart");
  for (const addProduct of addProducts) {
    addProduct.addEventListener("click", addToCart);
  }
}

function addToCart(e) {
  let productToAdd = products.find((product) => product.id == e.target.id);
  let indexProduct = onlineCart.findIndex(
    (product) => product.id == productToAdd.id
  );
  if (indexProduct != -1) {
    onlineCart[indexProduct].quantity++;
    onlineCart[indexProduct].subtotal =
      onlineCart[indexProduct].quantity * onlineCart[indexProduct].pricePerUnit;
  } else {
    onlineCart.push({
      id: productToAdd.id,
      productName: productToAdd.productName,
      pricePerUnit: productToAdd.price,
      quantity: 1,
      subtotal: productToAdd.price,
    });
    console.log(onlineCart);
  }
  localStorage.setItem("onlineCart", JSON.stringify(onlineCart));
  renderCart(onlineCart);
}

function removeFromCart(e) {
  localStorage.getItem("onlineCart");
  console.log(onlineCart);
  let productToRemove = onlineCart.find((product) => product.id == e.target.id);
  let indexProduct = onlineCart.findIndex(
    (product) => product.id == productToRemove.id
  );
  console.log(indexProduct);
  if (indexProduct != -1) {
    onlineCart.splice(indexProduct, 1);
  }
  localStorage.setItem("onlineCart", JSON.stringify(onlineCart));
  renderCart(onlineCart);
}

function renderCart(arrayProducts) {
  deliveryCart.innerHTML = `
  <p>Tu órden al momento es:</p>
  `;
  for (const product of arrayProducts) {
    deliveryCart.innerHTML += `
    <div class="cartItem">
      <p>Producto: ${product.productName}</p>
      <p>Precio: ${product.pricePerUnit}</p>
      <p>Cant: ${product.quantity}</p>
      <p>Subtotal: ${product.subtotal}</p>
      <button class="btn btn-outline-light removeCart" id=${product.id}>Remover</button>
      <br>
    </div>
    `;
  }
  let removeProducts = document.getElementsByClassName("removeCart");
  for (const removeProduct of removeProducts) {
    removeProduct.addEventListener("click", removeFromCart);
  }
}
