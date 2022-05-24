const productsList = document.querySelector('#products-list');
const totalsList = document.querySelector('#totals-list');

const loadProducts = () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then((products) => {
            addProducts(products);
        });
}

function renderProduct(product) {
    return `
    <li class="list-group-item product">
      <div class="row align-items-center">
        <div class="col-1">
          <img src="${product.image}" alt="" class="img-fluid">
        </div>
        <div class="col-5">
          <h3 class="h5">${product.title}</h3>
          <p class="product-description lh-sm mb-0 text-muted"><small>${product.description}</small></p>
        </div>
        <div class="col-2 text-center">
          <span class="h4 my-0">&dollar;<span class="product-price">${product.price}</span></span>
        </div>
        <div class="col-1">
          <div class="input-group">
            <input type="number" class="form-control" value="${product.quantity}" min="1" max="999">
          </div>
        </div>
        <div class="col-2 text-center">
          <span class="h4 my-0">&dollar;<span class="product-total">${product.total}</span></span>
        </div>
        <div class="col-1">
          <button class="btn btn-secondary remove-product" title="Remove" aria-label="Remove">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </div>
      </div>
    </li>
  `;
}

function addProduct(product) {
    productsList.insertAdjacentHTML('beforeend', renderProduct(product));
}

function addProducts(products) {
    productsList.innerHTML = '';

    products.forEach(product => {
        product.quantity = 1;
        product.total = product.quantity * product.price;
        addProduct(product);
    });

    productsList.querySelectorAll('.remove-product').forEach((button) => {
        button.addEventListener('click', () => {
            button.closest('.product').remove();

            updateTotals();
        });
    });

    updateTotals();
}

function updateTotals() {
    let productsCost = 0;

    productsList.querySelectorAll('.product-total').forEach(totalElement => {
        productsCost += parseFloat(totalElement.innerHTML);
    });

    document.querySelector('#totals-products').textContent = productsCost.toFixed(2);

    const shippingCost = document.querySelector('#totals-shipping').textContent;
    const totalCost = Number(productsCost + Number(shippingCost));

    document.querySelector('#totals-total').textContent = totalCost.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});