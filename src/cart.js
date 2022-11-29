// Variables

var cart = [];

var removeCartItemBtn = document.getElementsByClassName('btn-remove');

for (var i = 0; i < removeCartItemBtn.length; i++) {
    var button = removeCartItemBtn[i];
    button.addEventListener('click', removeCartItem);
}

var qtyInputs = document.getElementsByClassName('cart-qty-input');

for (var i = 0; i < qtyInputs.length; i++) {
    var input = qtyInputs[i];
    input.addEventListener('change', qtyChanged);
}

var addToCartBtns = document.getElementsByClassName('btn-addToCart');

for (var i = 0; i < addToCartBtns.length; i++) {
    var button = addToCartBtns[i];
    button.addEventListener('click', addToCart);
}

// Functions 

// When 'Remove' button is clicked 
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    window.sessionStorage.setItem('shoppingCart',JSON.stringify(cart));
}

// When 'Qty' field is changed
function qtyChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
    window.sessionStorage.setItem('shoppingCart',JSON.stringify(cart));
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var qtyElement = cartRow.getElementsByClassName('cart-qty-input')[0];
        var price  = parseFloat(priceElement.innerText.replace('₱','').replace(',',''));
        var qty = qtyElement.value;
        total = total + (price * qty);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '₱' + total;
}

// When 'Add to Cart' button is clicked
function addToCart(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var productName = shopItem.getElementsByClassName('product-name')[0].innerText;
    var price = shopItem.getElementsByClassName('price')[0].innerText;
    var imgSrc = shopItem.getElementsByClassName('product-img')[0].src;

    var productAdded = {'productName': productName, 'price': price, 'imgSrc': imgSrc };

    cart = window.sessionStorage.getItem('shoppingCart')
    cart = JSON.parse(cart);
    cart.push(productAdded);
    alert(productName + " was added to your cart!");
    window.sessionStorage.setItem('shoppingCart',JSON.stringify(cart));
    console.log("Item added to cart.");
    console.log(cart);
}

// When Cart page loads
function loadToCart() {
    if(window.sessionStorage.getItem('shoppingCart')) {
        cart = window.sessionStorage.getItem('shoppingCart')
        cart = JSON.parse(cart);
        console.log(cart);
    }
    if (cart === null) {
        cart = [];
    }

    for (var i = 0; i < cart.length; i++) {
        var cartItems = document.getElementsByClassName('cart-items')[0];           // Find cart-row parent
        var cartRow = document.createElement('div');                                // Create new cart row
        var cartRowContents = `
            <div class="cart-item cart-column">
                <img src="` + cart[i].imgSrc + `" alt="" class="cart-item-img" width="250" height="250">
                <span class="cart-item-title">`+ cart[i].productName +`</span>
            </div>
            <span class="cart-price cart-column">` + cart[i].price + `</span>
            <div class="cart-qty cart-column">
                <input type="number" value="1" class="cart-qty-input">
                <button class="btn-3 btn-remove">Remove</button>
            </div>
        `
        cartRow.classList.add('cart-row');
        cartRow.innerHTML = cartRowContents;                                        // Add content to new row
        cartItems.append(cartRow);                              // Add new cart-row to cartItems container
        console.log(i);
    }
    window.sessionStorage.setItem('shoppingCart',JSON.stringify(cart));

}