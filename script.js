const TG_TOKEN = '8013834057:AAFgJAmnPutdMRe1p-EVEfvH4RUxlsfy_jM';
const CHAT_ID = '5415190532';

// БАЗА ТОВАРОВ
const DB = [
    // Телефоны
    { id: 1, cat: 'Phones', name: 'iPhone 15 Pro', price: 110000, img: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800', size: '146.6 x 70.6 x 8.3 мм', weight: '187 г', cpu: 'A17 Pro' },
    { id: 2, cat: 'Phones', name: 'iPhone 14', price: 75000, img: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=800', size: '146.7 x 71.5 x 7.8 мм', weight: '172 г', cpu: 'A15 Bionic' },
    { id: 3, cat: 'Phones', name: 'Samsung S23 Ultra', price: 95000, img: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=800', size: '163.4 x 78.1 x 8.9 мм', weight: '234 г', cpu: 'Snapdragon 8 Gen 2' },
    // Наушники
    { id: 4, cat: 'Audio', name: 'AirPods Pro 2', price: 22000, img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800', size: 'Кейс: 45.2 x 60.6 мм', weight: '50 г', cpu: 'Apple H2' },
    { id: 5, cat: 'Audio', name: 'Sony WH-1000XM5', price: 35000, img: 'https://images.unsplash.com/photo-1648447226217-040248238db4?w=800', size: 'Полноразмерные', weight: '250 г', cpu: 'V1 Processor' },
    // Планшеты
    { id: 6, cat: 'Tablets', name: 'iPad Pro M2', price: 98000, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800', size: '11 дюймов', weight: '466 г', cpu: 'Apple M2' }
];

let cart = [];
let discount = 0;

// ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + pageId).classList.remove('hidden');
    window.scrollTo(0,0);
}

// ОТРИСОВКА КАТАЛОГА
function renderProducts(category) {
    const list = document.getElementById('products-list');
    const filtered = DB.filter(p => p.cat === category);
    
    list.innerHTML = filtered.map(p => `
        <div class="bg-white/5 rounded-[30px] p-6 border border-white/5 hover:border-indigo-500 transition cursor-pointer" onclick="viewProduct(${p.id})">
            <img src="${p.img}" class="h-48 w-full object-cover rounded-2xl mb-4">
            <h3 class="font-bold text-lg">${p.name}</h3>
            <p class="text-indigo-400 font-black mt-2">${p.price.toLocaleString()} ₽</p>
        </div>
    `).join('');
}

// СТРАНИЦА ТОВАРА
function viewProduct(id) {
    const p = DB.find(x => x.id === id);
    const container = document.getElementById('product-detail-container');
    
    container.innerHTML = `
        <div class="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <img src="${p.img}" class="rounded-[40px] w-full shadow-2xl">
            <div class="flex flex-col justify-center">
                <h2 class="text-5xl font-black mb-6">${p.name}</h2>
                <div class="space-y-4 mb-10">
                    <div class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-gray-500">Габариты</span><span>${p.size}</span>
                    </div>
                    <div class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-gray-500">Вес</span><span>${p.weight}</span>
                    </div>
                    <div class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-gray-500">Процессор</span><span>${p.cpu}</span>
                    </div>
                </div>
                <div class="flex items-center gap-6">
                    <span class="text-3xl font-black">${p.price.toLocaleString()} ₽</span>
                    <button onclick="addToCart(${p.id})" class="flex-grow bg-indigo-600 py-5 rounded-2xl font-black hover:bg-indigo-500 transition">В КОРЗИНУ</button>
                </div>
            </div>
        </div>
    `;
    showPage('item');
}

// КОРЗИНА
function addToCart(id) {
    const p = DB.find(x => x.id === id);
    cart.push(p);
    updateCartUI();
    alert('Товар добавлен!');
}

function updateCartUI() {
    document.getElementById('cart-count-badge').innerText = cart.length;
    const list = document.getElementById('cart-full-list');
    
    if(cart.length === 0) {
        list.innerHTML = '<p class="text-center py-20 text-gray-500">Корзина пуста</p>';
    } else {
        list.innerHTML = cart.map((p, idx) => `
            <div class="bg-white/5 p-6 rounded-3xl flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <img src="${p.img}" class="w-20 h-20 object-cover rounded-xl">
                    <h4 class="font-bold">${p.name}</h4>
                </div>
                <div class="flex items-center gap-6">
                    <span class="font-bold">${p.price.toLocaleString()} ₽</span>
                    <button onclick="removeItem(${idx})" class="text-red-500 text-xl">&times;</button>
                </div>
            </div>
        `).join('');
    }
    calculateTotal();
}

function calculateTotal() {
    let base = cart.reduce((s, p) => s + p.price, 0);
    let final = base - (base * discount);
    document.getElementById('final-price').innerText = final.toLocaleString() + ' ₽';
}

function applyPromo() {
    const code = document.getElementById('promo-input').value;
    if(code === 'Sale2026') {
        discount = 0.10;
        document.getElementById('promo-msg').innerText = 'Промокод применен: -10%';
        calculateTotal();
    } else {
        alert('Неверный промокод');
    }
}

function removeItem(idx) {
    cart.splice(idx, 1);
    updateCartUI();
}

// ОТПРАВКА
async function checkout() {
    const city = document.getElementById('cart-city').value;
    if(!city || cart.length === 0) return alert('Введите город и добавьте товары');

    let itemsText = cart.map(p => `• ${p.name}`).join('%0A');
    let total = document.getElementById('final-price').innerText;
    
    let msg = `🛍 **НОВЫЙ ЗАКАЗ — RE:STORE CLONE**%0A%0A`;
    msg += `📍 Город: ${city}%0A`;
    msg += `📦 Товары:%0A${itemsText}%0A%0A`;
    msg += `💰 **ИТОГО: ${total}**`;

    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${msg}&parse_mode=Markdown`);
    alert('Заказ отправлен!');
    cart = [];
    updateCartUI();
    showPage('home');
}
