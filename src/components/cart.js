let cart = [
	{name: 'João', id: 1},
	{name: 'Maria', id: 2},
	{name: 'Carlos', id: 3},
	{name: 'Vanessa', id: 4},
];

// const carlos = usersList.find((user, index, array) => user.name === 'Carlos');


console.log('CARRINHO',cart)

function addToCart(comic,cart){
    const add = cart.some((item) => item.id === comic.id)
    if(add === false){
        cart.push(comic)
    }
}

function removeToCart(comic){
    const newcart = cart.filter((item) => item.id !== comic.id);
    cart = newcart
}

removeToCart({name: 'Pedro', id: 4},cart)

console.log('CARRINHO',cart)



