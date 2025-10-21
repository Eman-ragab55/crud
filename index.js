var productNameInput = document.getElementById("product-name");
var productPriceInput = document.getElementById("product-price");
var productCategoryInput = document.getElementById("product-category");
var productDescriptionInput = document.getElementById("product-description");
var productImageInput = document.getElementById("product-images");
var searchInput = document.getElementById("productSearchInput");

var products = [];
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var demo;

if (localStorage.getItem("productsList") != null) {
  products = JSON.parse(localStorage.getItem("productsList"));
  displayProduct();
}

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: productImageInput.files[0]?.name,

  };

  products.push(product);
  displayProduct();
  localStorage.setItem("productsList", JSON.stringify(products));
  clearForm();
}

function displayProduct() {
  var cartona = "";
  for (var i = 0; i < products.length; i++) {
    cartona += `
    <tr>
      <th scope="row">${i + 1}</th>
      <td><img src=images/${products[i].image}"style="width :50px"</td>
      <td>${products[i].name}</td>
      <td>${products[i].price}</td>
      <td>${products[i].category}</td>
      <td>${products[i].description}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
        <button class="btn btn-success btn-sm" onclick="fillUpdateInputs(${i})">
          <i class="fa-solid fa-pen-to-square"></i> Update
        </button>
      </td>
    </tr>`;
  }
  document.getElementById("myBody").innerHTML = cartona;
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
  productImageInput.value = "";
}

function deleteProduct(index) {
  products.splice(index, 1);
  displayProduct();
  localStorage.setItem("productsList", JSON.stringify(products));
}

function fillUpdateInputs(index) {
  demo = index;
  productNameInput.value = products[index].name;
  productPriceInput.value = products[index].price;
  productDescriptionInput.value = products[index].description;
  productCategoryInput.value = products[index].category;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateProduct() {
  products[demo].name = productNameInput.value;
  products[demo].price = productPriceInput.value;
  products[demo].category = productCategoryInput.value;
  products[demo].description = productDescriptionInput.value;
  products[demo].image= productImageInput.files[0]?.name,

  displayProduct();
  localStorage.setItem("productsList", JSON.stringify(products));
  clearForm();

  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
}


// live search: on each input event
searchInput.addEventListener("input", function (e) {
  var q = e.target.value.trim().toLowerCase();
  filterAndDisplay(q);
});

// helper: filter products and render rows that match the query
function filterAndDisplay(query) {
 // نحول النص لــ regex آمن ونطبقه على النصوص
      var safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
       var regex = new RegExp(safeQuery, "i");
     if (regex.test(name) || regex.test(category) || regex.test(desc)) {
  }}

  var cartona = "";
  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    var name = (p.name || "").toLowerCase();
    var category = (p.category || "").toLowerCase();
    var desc = (p.description || "").toLowerCase();

   
    if (name.includes(query) || category.includes(query) || desc.includes(query)) {
      // use original index i for delete/update callbacks so they still work
      cartona += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${p.image ? `<img src="images/${p.image}" style="width:50px" />` : ""}</td>
        <td>${p.name || ""}</td>
        <td>${p.price || ""}</td>
        <td>${p.category || ""}</td>
        <td>${p.description || ""}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
          <button class="btn btn-success btn-sm" onclick="fillUpdateInputs(${i})">
            <i class="fa-solid fa-pen-to-square"></i> Update
          </button>
        </td>
      </tr>`;
    }
  }

  document.getElementById("myBody").innerHTML = cartona || `<tr><td colspan="7" class="text-center">No results</td></tr>`;
