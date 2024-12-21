// Mechanizm ochrony hasłem
const password = "MrsClaus"; // Ustaw hasło
let userInput = prompt("Wpisz hasło, aby wejść na stronę:");
if (userInput !== password) {
    document.write("<h1>Błędne hasło!</h1>");
    throw new Error("Nieprawidłowe hasło!");
}

// Mechanizm karuzeli
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

let currentIndex = 0;
let slidesToShow = 5; // Domyślna liczba zdjęć na stronie (komputer)

// Funkcja do ustawienia liczby zdjęć wyświetlanych na stronie w zależności od szerokości okna
function updateSlidesToShow() {
    if (window.innerWidth >= 1200) {
        slidesToShow = 5;
    } else if (window.innerWidth >= 768) {
        slidesToShow = 4;
    } else if (window.innerWidth >= 480) {
        slidesToShow = 2;
    } else {
        slidesToShow = 2;
    }
}

// Funkcja ustawiania przesunięcia
function setSlidePosition(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const offset = -index * slideWidth;
    track.style.transform = `translateX(${offset}px)`;
}

// Obsługa przycisku "następny"
nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - slidesToShow) {
        currentIndex += slidesToShow;
        setSlidePosition(currentIndex);
    }
});

// Obsługa przycisku "poprzedni"
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= slidesToShow;
        setSlidePosition(currentIndex);
    }
});

// Inicjalizacja pozycji
updateSlidesToShow();
setSlidePosition(currentIndex);

// Nasłuchuj na zmianę rozdzielczości, aby dostosować liczbę widocznych zdjęć
window.addEventListener('resize', () => {
    updateSlidesToShow();
    setSlidePosition(currentIndex);
});

// Mechanizm lightboxa
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxDescription = document.getElementById('lightbox-description');
const closeBtn = document.getElementById('close-btn');
const images = document.querySelectorAll('.carousel-image');

images.forEach(img => {
    img.addEventListener('click', (e) => {
        const clickedImage = e.target;
        lightboxImg.src = clickedImage.src;
        lightboxDescription.textContent = clickedImage.nextElementSibling.textContent; // Pobierz tekst z podpisu
        lightbox.style.display = 'flex';
    });
});

// Zamknięcie lightboxa
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Zamknięcie lightboxa klikając poza obrazem
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
