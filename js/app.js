/*

<li class="producto-item">
    <div class="producto-header">
        <span class="producto-nombre">
            Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
        </span>
    </div>
    <p class="producto-precio">109.95</p>
    <p class="producto-descripcion">
        Your perfect pack for everyday use and walks in the forest. Stash your
        laptop (up to 15 inches) in the padded sleeve, your everyday
    </p>
    <div class="producto-footer">
        <button class="btn-eliminar">Eliminar</button>
    </div>
</li>;
*/

// Referencias al DOM
const form = document.getElementById("form-product");
const inputName = document.querySelector("#form-product input[name='name']");
const inputPrice = document.querySelector("#form-product input[name='price']");
const inputDescription = document.querySelector(
    "#form-product textarea[name='description']"
);
const errorMessage = document.getElementById("mensaje-error");

// Petición GET para products
const getProducts = async () => {
    let response = await fetch(
        `https://javascript25g-nuevo-default-rtdb.firebaseio.com/products/.json`
    );
    let data = await response.json();
    return data;
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = inputName.value.trim();
    const price = inputPrice.value.trim();
    const description = inputDescription.value.trim();

    if (!name || !price || !description) {
        errorMessage.textContent =
            "El nombre del producto, precio y dscripción son campos obligatorios";
        return;
    }
    errorMessage.textContent = "";

    const saveProduct = async () => {
        let newProduct = {
            name,
            price,
            description,
        };

        let response = await fetch(
            `https://javascript25g-nuevo-default-rtdb.firebaseio.com/products/.json`,
            {
                method: "POST",
                body: JSON.stringify(newProduct),
            }
        );
        let data = await response.json();
        return data;
    };

    saveProduct();
    printProducts();
    form.reset();
    inputName.focus();
});

const createProductListItem = (productListId, itemProductData) => {
    let { name, price, description } = itemProductData;
    let productWrapper = document.createElement("li");
    productWrapper.classList.add("producto-item");
    let productHeader = document.createElement("div");
    productHeader.classList.add("producto-header");
    let productName = document.createElement("span");
    productName.classList.add("producto-nombre");
    let productNameText = document.createTextNode(name);
    productName.appendChild(productNameText);
    productHeader.appendChild(productName);

    let productPrice = document.createElement("p");
    productPrice.classList.add("producto-precio");
    let productPriceText = document.createTextNode(`$${price} USD`);
    productPrice.appendChild(productPriceText);

    let productDescription = document.createElement("p");
    productDescription.classList.add("producto-descripcion");
    let productDescriptionText = document.createTextNode(description);
    productDescription.appendChild(productDescriptionText);

    let productFooter = document.createElement("div");
    productFooter.classList.add("producto-footer");
    let btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-eliminar");
    btnText = document.createTextNode("Eliminar");
    btnDelete.append(btnText);

    productFooter.appendChild(btnDelete);

    productWrapper.appendChild(productHeader);
    productWrapper.appendChild(productPrice);
    productWrapper.appendChild(productDescription);
    productWrapper.appendChild(productFooter);

    let productList = document.getElementById(productListId);
    productList.append(productWrapper);
};

const printProducts = async () => {
    let products = await getProducts();
    let productList = document.getElementById("lista-productos");
    productList.innerHTML = ""; // Limpiar la lista antes de renderizar
    for (key in products) {
        let productObject = products[key];
        createProductListItem("lista-productos", productObject);
    }
};

printProducts();
