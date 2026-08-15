const products = [
 {id:1,name:"گیفت کارت دیجیتال",desc:"مناسب برای خریدهای دیجیتال و سرویس‌های آنلاین.",price:250000,cat:"digital",icon:"🎁"},
 {id:2,name:"CP کالاف دیوتی",desc:"شارژ CP برای Call of Duty Mobile.",price:320000,cat:"gaming",icon:"🎮"},
 {id:3,name:"سرویس تلگرام",desc:"خدمات ویژه و کاربردی برای تلگرام.",price:180000,cat:"telegram",icon:"✈️"},
 {id:4,name:"اکانت گیمینگ",desc:"اکانت‌های منتخب و آماده استفاده.",price:750000,cat:"gaming",icon:"🕹️"},
 {id:5,name:"اشتراک دیجیتال",desc:"اشتراک سرویس‌های محبوب دیجیتال.",price:420000,cat:"digital",icon:"💎"},
 {id:6,name:"خدمات کانال",desc:"خدمات رشد و مدیریت کانال تلگرام.",price:290000,cat:"telegram",icon:"📣"},
 {id:7,name:"آیتم بازی",desc:"آیتم و اعتبار برای بازی‌های محبوب.",price:210000,cat:"gaming",icon:"⚔️"},
 {id:8,name:"کد فعال‌سازی",desc:"کد دیجیتال با تحویل سریع.",price:150000,cat:"digital",icon:"🔑"}
];
let cart = JSON.parse(localStorage.getItem("mastershop_cart") || "[]");
let category="all";
const $=s=>document.querySelector(s);
const format=n=>new Intl.NumberFormat("fa-IR").format(n)+" تومان";

function renderProducts(){
 const q=($("#searchInput")?.value||"").trim().toLowerCase();
 const list=products.filter(p=>(category==="all"||p.cat===category)&&(!q||p.name.toLowerCase().includes(q)));
 $("#productsGrid").innerHTML=list.map(p=>`
 <article class="product">
  <div class="product-cover">${p.icon}</div>
  <div class="product-body">
   <h3>${p.name}</h3><p>${p.desc}</p>
   <div class="price"><strong>${format(p.price)}</strong><button class="buy" onclick="addToCart(${p.id})">افزودن +</button></div>
  </div>
 </article>`).join("") || '<p style="color:#888">محصولی پیدا نشد.</p>';
}
function addToCart(id){
 const p=products.find(x=>x.id===id); const item=cart.find(x=>x.id===id);
 item?item.qty++:cart.push({id,qty:1});
 saveCart(); toast("محصول به سبد خرید اضافه شد.");
}
function saveCart(){localStorage.setItem("mastershop_cart",JSON.stringify(cart));renderCart();}
function renderCart(){
 $("#cartCount").textContent=new Intl.NumberFormat("fa-IR").format(cart.reduce((s,x)=>s+x.qty,0));
 $("#cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-item"><div class="mini">${p.icon}</div><div><strong>${p.name}</strong><br><small>${x.qty} عدد · ${format(p.price*x.qty)}</small></div><button class="remove" onclick="removeItem(${p.id})">حذف</button></div>`}).join(""):'<p style="color:#777;text-align:center;padding:40px 0">سبد خرید خالی است.</p>';
 const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0); $("#cartTotal").textContent=format(total);
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart();toast("محصول حذف شد.");}
function openCart(){ $("#overlay").classList.remove("hidden"); $("#cartDrawer").classList.add("open");}
function closeAll(){ $("#overlay").classList.add("hidden"); $("#cartDrawer").classList.remove("open"); $("#authModal").classList.add("hidden");}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2300);}
$("#filters").addEventListener("click",e=>{if(e.target.matches("button")){$("#filters .active").classList.remove("active");e.target.classList.add("active");category=e.target.dataset.category;renderProducts();}});
$("#searchBtn").onclick=()=>{$("#searchWrap").classList.toggle("hidden");$("#searchInput").focus()};
$("#searchInput").oninput=renderProducts;
$("#cartBtn").onclick=openCart;
$("#overlay").onclick=closeAll;
document.querySelectorAll("[data-close]").forEach(x=>x.onclick=closeAll);
$("#loginBtn").onclick=()=>{$("#overlay").classList.remove("hidden");$("#authModal").classList.remove("hidden")};
let register=false;
$("#switchAuth").onclick=()=>{register=!register;$("#authTitle").textContent=register?"ساخت حساب":"ورود به حساب";$("#switchAuth").textContent=register?"حساب دارم؛ وارد می‌شوم":"حساب ندارم؛ ثبت‌نام می‌کنم";$("#authForm button").textContent=register?"ثبت‌نام":"ورود"};
$("#authForm").onsubmit=e=>{e.preventDefault();closeAll();toast(register?"حساب با موفقیت ثبت شد.":"ورود آزمایشی انجام شد.");};
$("#supportForm").onsubmit=e=>{e.preventDefault();e.target.reset();toast("پیام شما ثبت شد.");};
$("#checkoutBtn").onclick=()=>{if(!cart.length)return toast("سبد خرید خالی است.");toast("در نسخه دمو، پرداخت واقعی متصل نیست.");};
renderProducts();renderCart();
