import { flowerData } from "./data.js";

const orderBtn = document.getElementById('orderbtn');
const paymentBtn = document.getElementById('paymentSubmit');

function checkDiscount(){
    if(Number(document.getElementById("total-sum").innerText) >50){
        document.getElementById('coupon').style.display='block';
        const currentPrice = Number(document.getElementById("total-sum").innerText);
        const discountAmt = Number(document.getElementById('coupon-amt').innerText);
        document.getElementById("total-sum").innerText= currentPrice-discountAmt
        
    }else{
        document.getElementById('coupon').style.display='none';
    }
}

orderBtn.addEventListener('click',function(){
    document.getElementById('paymentModel').style.display='block'
})

paymentBtn.addEventListener('click',function(){
    const thankyouDiv = document.getElementById('thankyouModel');
    const name = document.getElementById('fullname').value;

    document.getElementById('paymentModel').style.display='none'
    thankyouDiv.style.display='block';
    document.getElementById("book").style.display='none';
    document.getElementById('orderitemrow').innerHTML=''
    document.getElementById("total-sum").innerText=''
    thankyouDiv.innerText=`Thanks ${name}! Your order is on its way!`;
})

document.addEventListener('click',function(e){
    if(e.target.dataset.remove){
        const productidRow =`productid-${e.target.dataset.remove}`
        const deductPrice = Number(document.getElementById(`amt${e.target.dataset.remove}`).innerText)
        const totalAmt = Number(document.getElementById("total-sum").innerText);
        const discountAmt = Number(document.getElementById('coupon-amt').innerText);
        
        if(document.getElementById('coupon').style.display == 'block'){
            document.getElementById("total-sum").innerText=totalAmt+discountAmt-deductPrice;
        }else{
            document.getElementById("total-sum").innerText=totalAmt-deductPrice;
        }
        
        document.getElementById(productidRow).remove()
        let image_x = document.getElementById(`${e.target.dataset.remove}`);
        image_x.setAttribute('src','./assets/add.png')
        image_x.setAttribute('data-add',`${e.target.dataset.remove}`)
        checkDiscount()
    }
    if(e.target.dataset.add){
        const price = Number(document.getElementById(`price-${e.target.dataset.add}`).innerText);
        const title = document.getElementById(`product-${e.target.dataset.add}`).innerText;
        document.getElementById("book").style.display='block';
        let productHTML = document.getElementById('orderitemrow').innerHTML

        productHTML += `<div id="productid-${e.target.dataset.add}">
                        <section class="item-row">
                            <p>${title} <btn data-remove="${e.target.dataset.add}" class="removelink">remove</btn></p>
                            <p><span id="amt${e.target.dataset.add}">${price}</span>$</p>
                        </section><div>`;
        
        document.getElementById('orderitemrow').innerHTML=productHTML
        document.getElementById("total-sum").innerText=Number(document.getElementById("total-sum").innerText)+price
        checkDiscount()
        let image_x = document.getElementById(`${e.target.dataset.add}`);
        image_x.setAttribute('src','./assets/out-of-stock.png')
        image_x.setAttribute('data-add','')
    }
})

function getHTML(){
    let flowerHTML ='';
    flowerData.forEach(function(item){
        flowerHTML = flowerHTML + `<section class="flower-item" >
        <img src="${item.pic}" class="flower-img">
        <div id="description">
            <h3 class="productname" id="product-${item.uuid}">${item.name}</h3>
            <p class="descriptionPara">${item.description}</p>
            <h4><span id="price-${item.uuid}">${item.price}</span><span>$</span></h4>
        </div>
        <img src="assets/add.png" class="addtocart" data-add="${item.uuid}" id="${item.uuid}">
    </section>`
    });
    return flowerHTML
}

function render(){
    const flowerHTML = getHTML();
    const floweritemsEle = document.getElementById('floweritems');
    floweritemsEle.innerHTML = flowerHTML
}
render();