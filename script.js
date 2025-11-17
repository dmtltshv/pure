let products = [
  { name: "AirPods", price: 19990 },
  { name: "Новый iPhone", price: 109990 },
  { name: "Аренда квартиры на месяц", price: 35000 }
];

// FORM SCROLL
const formEl = document.querySelector(".hero-form");
const firstInput = formEl.querySelector("input");

document.querySelectorAll(".scroll-to-form").forEach(btn => {
  btn.addEventListener("click", () => {
    formEl.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      firstInput.focus();
    }, 600);
  });
});

document.querySelector(".scroll-to-jobs").addEventListener("click", () => {
  document.getElementById("jobs").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});


// ===== CAROUSEL WITH DOTS =====
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const dotsContainer = document.getElementById('carouselDots');

let index = 0;

// Создание точек
items.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("carousel-dot");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".carousel-dot");

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");
}

function autoSlide() {
  index = (index + 1) % items.length;
  updateCarousel();
}

// Автопрокрутка
setInterval(autoSlide, 4000);


// ===== CALCULATOR =====
const hourButtons = document.querySelectorAll('#hours-options .calc-btn');
const shiftButtons = document.querySelectorAll('#shifts-options .calc-btn');

const sumEl = document.getElementById('calc-sum');
const descEl = document.getElementById('calc-desc');
const progressBar = document.getElementById('calc-progress-bar');

const affordBlock = document.getElementById("affordBlock");
const affordList = document.getElementById("affordList");

let selectedHours = null;
let selectedShifts = null;
let total = 0;

function updateResult() {
  if (selectedHours && selectedShifts) {
    const basePerShift = 7000;
    const hourFactor = selectedHours / 7;
    const perShift = Math.round(basePerShift * hourFactor);
    total = perShift * selectedShifts;

    sumEl.textContent = total.toLocaleString('ru-RU') + ' ₽';
    descEl.innerHTML = `Посчитано на основе реальной статистики доходов наших моделей за последний год`;

    const max = 100000;
    const progress = Math.min((total / max) * 100, 100);
    progressBar.style.width = progress + '%';
  } else {
    total = 0;
    sumEl.textContent = '0 ₽';
    descEl.textContent = 'Выберите часы и смены';
    progressBar.style.width = '0%';
  }

  // Возможные покупки
  if (total > 0) {
    affordBlock.style.display = "block";
    affordList.innerHTML = "";

    products.forEach(product => {
      const weeks = product.price / total;
      const formattedWeeks = weeks.toFixed(1).replace('.', ',');

      const li = document.createElement("li");
      li.innerHTML = `<span>${product.name}</span><b>${formattedWeeks} недель</b>`;
      affordList.appendChild(li);
    });
  } else {
    affordBlock.style.display = "none";
  }
}

// Часы
hourButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    hourButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    selectedHours = parseInt(btn.dataset.hours);
    updateResult();
  });
});

// Смены
shiftButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    shiftButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    selectedShifts = parseInt(btn.dataset.shifts);
    updateResult();
  });
});

// Добавление своего продукта
document.getElementById("addCustomBtn").addEventListener("click", () => {
  const name = document.getElementById("customName").value.trim();
  const price = Number(document.getElementById("customPrice").value);

  if (!name || !price || price <= 0) {
    showAlert("Введите корректные данные.");
    return;
  }

  products.push({ name, price });

  document.getElementById("customName").value = "";
  document.getElementById("customPrice").value = "";

  updateResult();
});

// BURGER MENU
const burger = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

// Custom alert
function showAlert(message) {
  const alertBox = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");

  alertMessage.textContent = message;
  alertBox.style.display = "flex";

  document.getElementById("alertOk").onclick = () => {
    alertBox.style.display = "none";
  };
}
