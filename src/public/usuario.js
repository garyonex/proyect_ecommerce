let carrito = [];
let total = 0;
const btn = document.getElementById('pay_user');



add = (productId, price) => {
    console.log(productId, price);
    carrito.push(productId);
    total = total + price;
    document.getElementById('pay_user').innerHTML = `Pagar $ ${total}`;

    if (carrito > 0) {
        btn.style.display = '';
    }
};
async function pay() {
    const listProduct = carrito.join(',');
    console.log(`Productos seleccionado ${listProduct}`);
    socket.emit('client:pay', listProduct);
}
