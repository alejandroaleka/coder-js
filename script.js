fetch("./data.json")
  .then((response) => response.json())
  .then((products) => {
    //posicionarme en el DOM para luego renderizar
    let menuDelivery = document.getElementById("menuD");
    let deliveryCart = document.getElementById("deliveryCart");

    let onlineCart = [];

    let id = 1;

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
          onlineCart[indexProduct].quantity *
          onlineCart[indexProduct].pricePerUnit;
      } else {
        onlineCart.push({
          id: productToAdd.id,
          productName: productToAdd.productName,
          pricePerUnit: productToAdd.price,
          quantity: 1,
          subtotal: productToAdd.price,
        });
      }
      localStorage.setItem("onlineCart", JSON.stringify(onlineCart));
      renderCart(onlineCart);
      addAlert();
    }

    function removeFromCart(e) {
      localStorage.getItem("onlineCart");
      console.log(onlineCart);
      let productToRemove = onlineCart.find(
        (product) => product.id == e.target.id
      );
      let indexProduct = onlineCart.findIndex(
        (product) => product.id == productToRemove.id
      );
      if (indexProduct != -1) {
        onlineCart.splice(indexProduct, 1);
      }
      localStorage.setItem("onlineCart", JSON.stringify(onlineCart));
      renderCart(onlineCart);
      removeAlert();
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

    function addAlert() {
      Swal.fire({
        background: "#000000",
        color: "white",
        title: "Producto agregado!",
        text: "La pizza fue agregada al carrito",
        icon: "success",
        iconColor: "aquamarine",
        showConfirmButton: false,
        toast: true,
        timer: 1500,
      }).then(() => {
        dispatch(redirect("/"));
      });
    }

    function removeAlert() {
      Swal.fire({
        background: "#000000",
        color: "white",
        title: "Producto eliminado",
        text: "El producto se removió del carrito",
        iconHtml: `<span class="material-symbols-outlined">sentiment_dissatisfied</span>`,
        iconColor: "#ADFF2F",
        showConfirmButton: false,
        toast: true,
        timer: 1500,
      }).then(() => {
        dispatch(redirect("/"));
      });
    }
  });
