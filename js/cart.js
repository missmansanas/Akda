if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else { ready(); }

// Variables

var cart = [];

function ready() {

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
}

// Functions 

// When 'Remove' button is clicked 
function removeCartItem(event) {
    var cart = JSON.parse(window.sessionStorage.getItem('shoppingCart'));
    var buttonClicked = event.target;
    var rowClicked = buttonClicked.parentElement.parentElement;
    var itemClicked = rowClicked.getElementsByClassName('cart-item-title')[0].innerText;
    var index = cart.map(function(o) { return o.productName; }).indexOf(itemClicked);

    if (index > -1) { // only splice array when item is found
        cart.splice(index, 1);
    }
    console.log('Item ' + index + ' removed from cart:');
    console.log(cart);
    window.sessionStorage.setItem('shoppingCart',JSON.stringify(cart));
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

// When 'Qty' field is changed
function qtyChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function updateCartTotal() {
    var cart = JSON.parse(window.sessionStorage.getItem('shoppingCart'));
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var qtyElement = cartRow.getElementsByClassName('cart-qty-input')[0];
        var price  = parseFloat(priceElement.innerText.replace('???','').replace(',',''));
        var qty = qtyElement.value;
        total = total + (price * qty);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '???' + total;

    window.sessionStorage.setItem('shoppingCart',JSON.stringify(cart));
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

    // for (i = 0; i < cart.length; i++) {
    //     if (cart[i] === productAdded) {
    //         alert('Item is already in your cart.');
    //     } else {
    //         cart.push(productAdded);
    //         if (cart.push(productAdded)) { alert(productName + " was added to your cart!"); 
    //          console.log('Item added to cart.');
    //         }
    //     }
    // }
    // window.sessionStorage.setItem('shoppingCart',JSON.stringify(cart));
    console.log(cart);
}

// When Cart page loads
function loadToCart() {
    var cart = [];
    
    if(window.sessionStorage.getItem('shoppingCart')) {
        cart = window.sessionStorage.getItem('shoppingCart')
        cart = JSON.parse(cart);
        console.log(cart);
    } else if(cart === null) { cart = []; } 
    else { var cart = []; }

    for (var i = 0; i < cart.length; i++) {
        // Find cart container
        var cartItems = document.getElementsByClassName('cart-items')[0];

        // Create a new row
        var cartRow = document.createElement('div');     
        cartRow.classList.add('cart-row');

        // Create new item group
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item','cart-column');

        // Create item img
        var rowImg = document.createElement('img');
            rowImg.setAttribute('src',cart[i].imgSrc);
            rowImg.classList.add('cart-item-img');

        // Create item name span
        var rowTitle = document.createElement('span');
            rowTitle.classList.add('cart-item-title');
            rowTitle.innerHTML = cart[i].productName;

        // Create item price span
        var rowPrice = document.createElement('span');
            rowPrice.classList.add('cart-price', 'cart-column');
            rowPrice.innerHTML = cart[i].price;

        // Create QTY input + REMOVE btn
        var rowQty = document.createElement('div');
            rowQty.classList.add('cart-qty','cart-column');
            var rowQtyInput = document.createElement('input'); // Qty input
                rowQtyInput.setAttribute('type','number');
                rowQtyInput.setAttribute('value',1);
                rowQtyInput.classList.add('cart-qty-input');
            var rowBtn = document.createElement('button');
                rowBtn.classList.add('btn-3', 'btn-remove');
                rowBtn.innerText = 'Remove';

        // Append all new elements
        cartItems.appendChild(cartRow);       
        cartRow.appendChild(cartItem);

        cartItem.appendChild(rowImg);
        cartItem.appendChild(rowTitle);

        cartRow.appendChild(rowPrice);
        cartRow.appendChild(rowQty);
        rowQty.appendChild(rowQtyInput);
        rowQty.appendChild(rowBtn);

        cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-qty-input')[0].addEventListener('change', qtyChanged);
    }
    window.sessionStorage.setItem('shoppingCart',JSON.stringify(cart));
    updateCartTotal();

}