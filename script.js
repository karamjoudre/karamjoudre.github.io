// 🛒 السلة
let cart = [];
let selectedSizes = {};

// 📌 اختيار الحجم + عرض السعر
function selectSize(select, name){

let price = select.value;
selectedSizes[name] = price;

// عرض السعر تحت الصنف
let priceBox = document.getElementById("price-" + name);
if(priceBox){
priceBox.innerText = price + " جنيه";
}
}

// ➕ إضافة صنف بحجم
function addToCart(name){

let price = selectedSizes[name];

if(!price){
alert("اختار الحجم الأول ❗");
return;
}

addItem(name, parseInt(price));
}

// ➕ صنف بسعر ثابت
function addSingle(name, price){
addItem(name, price);
}

// 🧠 إضافة للسلة
function addItem(name, price){

let item = cart.find(i => i.name === name && i.price === price);

if(item){
item.qty++;
}else{
cart.push({
name,
price,
qty:1
});
}

updateCart();
showToast();
}

// 🔄 تحديث السلة
function updateCart(){

let container = document.getElementById("cartItems");
container.innerHTML = "";

let total = 0;
let count = 0;

cart.forEach((item, index)=>{

total += item.price * item.qty;
count += item.qty;

container.innerHTML += `
<div class="cart-item">

<div>
<b>${item.name}</b><br>
${item.price} × ${item.qty}
</div>

<div>
<button onclick="changeQty(${index},1)">➕</button>
<button onclick="changeQty(${index},-1)">➖</button>
<button onclick="removeItem(${index})">❌</button>
</div>

</div>
`;
});

document.getElementById("total").innerText = "الإجمالي: " + total + " جنيه";
document.getElementById("count").innerText = count;
}

// ➕➖ تعديل الكمية
function changeQty(index, change){

cart[index].qty += change;

if(cart[index].qty <= 0){
cart.splice(index,1);
}

updateCart();
}

// ❌ حذف
function removeItem(index){
cart.splice(index,1);
updateCart();
}

// 🛒 فتح/إغلاق السلة
function toggleCart(){
document.getElementById("cart").classList.toggle("show");
}

// 🔔 إشعار احترافي
function showToast(){

let toast = document.getElementById("toast");

toast.classList.add("show");

setTimeout(()=>{
toast.classList.remove("show");
},2000);
}

// 📲 إرسال الطلب واتساب
function sendOrder(){

if(cart.length === 0){
alert("السلة فاضية ❗");
return;
}

let msg = "طلب جديد:%0A------------------%0A";

cart.forEach(item=>{
msg += `• ${item.name} (${item.price}) × ${item.qty}%0A`;
});

let note = document.getElementById("note").value;
let address = document.getElementById("address").value;

if(note){
msg += `%0A📝 ملاحظات: ${note}`;
}

if(address){
msg += `%0A📍 العنوان: ${address}`;
}

msg += "%0A------------------";

// رقمك
window.open(`https://wa.me/201550691337?text=${msg}`);
}

// 🔍 البحث
function searchItem(){

let value = document.getElementById("search").value.toLowerCase();

document.querySelectorAll(".item").forEach(item=>{

let name = item.querySelector("h3").innerText.toLowerCase();

item.style.display = name.includes(value) ? "flex" : "none";
});
}