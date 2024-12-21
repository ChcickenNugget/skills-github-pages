// Mechanizm ochrony hasłem
const password = "tajnehaslo"; // Ustaw hasło
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
let slidesToShow = 5; // Domyślnie 5 zdjęć na raz

// Funkcja ustawiania przesunięcia
function setSlidePosition(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const offset = -index * slideWidth;
    track.style.transform = `translateX(${offset}px)`;
}

// Funkcja, która dynamicznie ustawia liczbę zdjęć wyświetlanych na ekranie
const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width <= 480) {
        slidesToShow = 2; // 2 zdjęcia na telefonach
    } else if (width <= 768) {
        slidesToShow = 2; // 2 zdjęcia na tabletach
    } else {
        slidesToShow = 5; // 5 zdjęć na komputerach
    }
};

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
setSlidePosition(currentIndex);

// Aktualizacja liczby zdjęć na stronie po zmianie rozmiaru okna
window.addEventListener('resize', () => {
    updateSlidesToShow();
    setSlidePosition(currentIndex); // Dopasuj pozycję po zmianie rozmiaru
});

// Na początek ustawiamy odpowiednią liczbę zdjęć na podstawie rozmiaru okna
updateSlidesToShow();
