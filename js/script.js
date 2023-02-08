let bag=document.querySelector(".bag");
let close=document.querySelector("#close");
let cart=document.querySelector(".cart");

if (bag){
    bag.addEventListener('click',()=>{
        cart.classList.add('active')
    })
}
if(close){
    close.addEventListener('click',()=>{
        cart.classList.remove('active')
    })
}

function ready(){
    var removeCartButton=document.getElementsByClassName("cart-remove");
    for(var i=0  ;i < removeCartButton.length;i++){
        var button=removeCartButton[i];
        button.addEventListener('click',removeCartItem)
    }

    var quantétéInput = document.getElementsByClassName('pro-quantété');
    for(var i=0;i < quantétéInput.length;i++){
        var input=quantétéInput[i];
        input.addEventListener('change',quantétéChange)
    }

    var addCart=document.getElementsByClassName("add-cart");
    for(var i=0; i<addCart.length;i++){
        var buttonAdd=addCart[i];
        buttonAdd.addEventListener('click',addCartClicked);

    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClick);

}


function removeCartItem(e){
    var buttonClicked=e.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantétéChange(e){
    var input = e.target;
    if(input.value<= 0){
        input.value=1
    }
    updateTotal();
}

function buyButtonClick(){
    alert("Your Order Is Placed");
    var cartContent=document.getElementsByClassName('content-cart')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}



function addCartClicked(e){
    var button = e.target; 
    var shopProuct =button.parentElement;
    var title=shopProuct.getElementsByClassName('product-title')[0].innerText;
    var price=shopProuct.getElementsByClassName('price')[0].innerText;
    var img=shopProuct.getElementsByClassName('product-img')[0].src;
    addProductTocart(title,price,img);
    updateTotal();
}


function addProductTocart(title,price,img){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add("cart-box");
    var cartItems =document.getElementsByClassName('content-cart')[0];
    var cartItemNames=cartItems.getElementsByClassName('cart-product-title');
    for(var i=0;i < cartItemNames.length;i++){
        if(cartItemNames[i].innerHTML==title){
            alert('You Have Already Add This Item To Cart')
            return;
        }

    }
    var cartBoxContent=`
            <img src="${img}" alt="" class="cart-img" />
            <div class="cart-detail">
            <h2 class="cart-product-title">${title}</h2>
            <span class="cart-price">${price}</span>
            <input type="number" class="pro-quantété" value="1" />
            </div>
            <i class="fa fa-trash-can cart-remove"></i>
    
    
    `;
cartShopBox.innerHTML=cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem)
cartShopBox.getElementsByClassName('pro-quantété')[0].addEventListener('change',quantétéChange)
}

function updateTotal(){
    var cartBoxs = document.getElementsByClassName('cart-box');
    var total = 0;
    for(var i=0;i < cartBoxs.length ; i++){
        var cartBox = cartBoxs[i];
        var priceElement = cartBox.querySelector('.cart-price');
        var quentétéElement = cartBox.querySelector('.pro-quantété');
        var price = parseFloat(priceElement.innerHTML.replace("$",""));
        var quantété=quentétéElement.value;
        total =total+ (price*quantété);
    }
        document.querySelector('.total-price').innerHTML="$"+total;   
}

ready();
