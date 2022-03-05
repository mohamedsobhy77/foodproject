let productsOnCart = JSON.parse(localStorage.getItem('shopping-cart'));
if(!productsOnCart){
	productsOnCart = [];
}
const parentElement = document.querySelector('#buyItems');
const product = document.querySelectorAll('.box');


const countTheSumPrice = function () { // 4
	let sum = 0;
	productsOnCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}

const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shopping-cart', JSON.stringify(productsOnCart));
	if (productsInCart.length > 0) {
		let result = productsOnCart.map(box => {
			return `
				<li class="buyItem">
					<img src="${box.img}">
					<div>
						<h5>${box.h3}</h5>
						<h6>$${box.span}</h6>
						<div>
							<button class="button-minus" data-id=${box.id}>-</button>
							<span class="countOfProduct">${box.count}</span>
							<button class="button-plus" data-id=${box.id}>+</button>
						</div>
					</div>
				</li>`
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		cartSumPrice.innerHTML = '$' + countTheSumPrice();

	}
	else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
	}
}

function updateProductsOnCart(box) { // 2
	for (let i = 0; i < productsOnCart.length; i++) {
		if (productsOnCart[i].id == box.id) {
			productsOnCart[i].count += 1;
			productsOnCart[i].price = productsOnCart[i].basePrice * productsOnCart[i].count;
			return;
		}
	}
	productsOnCart.push(box);
}

box-container.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.boxId;
			const productName = item.querySelector('.box-name').innerHTML;
			const productPrice = item.querySelector('.price').innerHTML;
			const productImage = item.querySelector('img').src;
			let box = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsOnCart(box);
			updateShoppingCartHTML();
		}
	});
});

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsOnCart.length; i++) {
			if (productsOnCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsOnCart[i].count += 1
				}
				else if (isMinusButton) {
					productsOnCart[i].count -= 1
				}
				productsOnCart[i].price = productsOnCart[i].basePrice * productsOnCart[i].count;

			}
			if (productsOnCart[i].count <= 0) {
				productsOnCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();