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

// Petición GET para products
const getProducts = async () => {
    let response = await fetch(
        `https://javascript25g-nuevo-default-rtdb.firebaseio.com/products/.json`
    );
    let data = await response.json();
    return data;
};

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
    let productPriceText = document.createTextNode(price);
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
    for (key in products) {
        let productObject = products[key];
        createProductListItem("lista-productos", productObject);
    }
};

printProducts();
