// Ejecutar el código una vez que el DOM se haya cargado completamente
document.addEventListener('DOMContentLoaded', () => {

    // Array de objetos que representa las cartas del juego
    const cardArray = [
        { name: 'A', img: 'images/agustina.jpg' },
        { name: 'A', img: 'images/agustina.jpg' },
        { name: 'B', img: 'images/chispita.jpg' },
        { name: 'B', img: 'images/chispita.jpg' },
        { name: 'C', img: 'images/anto.jpg' },
        { name: 'C', img: 'images/anto.jpg' },
        { name: 'D', img: 'images/gonza.jpg' },
        { name: 'D', img: 'images/gonza.jpg' },
        { name: 'E', img: 'images/emmily.jpg' },
        { name: 'E', img: 'images/emmily.jpg' },
        { name: 'F', img: 'images/sofi.jpg' },
        { name: 'F', img: 'images/sofi.jpg' },
        { name: 'G', img: 'images/vicky.png' },
        { name: 'G', img: 'images/vicky.png' },
        { name: 'H', img: 'images/emiliano.jpg' },
        { name: 'H', img: 'images/emiliano.jpg' }
    ];

    // Seleccionar el elemento del tablero del juego en el DOM
    let gameBoard = document.querySelector('#game-board');

    // Arrays para almacenar las cartas seleccionadas y las ganadas
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    // Función para crear el tablero del juego
    function createBoard() {
        gameBoard.innerHTML = ''; // Limpiar el tablero antes de crear uno nuevo
        cardArray.sort(() => 0.5 - Math.random()); // Mezclar las cartas

        // Crear las cartas en el tablero
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('div'); // Crear un div para cada carta
            card.setAttribute('class', 'card'); // Asignar la clase 'card'
            card.setAttribute('data-id', i); // Asignar un atributo data-id con el índice de la carta
            card.addEventListener('click', flipCard); // Agregar evento click para voltear la carta
            gameBoard.appendChild(card); // Añadir la carta al tablero
        }
    }

    // Función para verificar si las cartas seleccionadas son iguales
    function checkForMatch() {
        const cards = document.querySelectorAll('.card'); // Seleccionar todas las cartas
        const optionOneId = cardsChosenId[0]; // Obtener el ID de la primera carta seleccionada
        const optionTwoId = cardsChosenId[1]; // Obtener el ID de la segunda carta seleccionada

        // Verificar si las cartas seleccionadas son iguales
        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].classList.add('flipped'); // Marcar la primera carta como volteada
            cards[optionTwoId].classList.add('flipped'); // Marcar la segunda carta como volteada
            cardsWon.push(cardsChosen); // Añadir las cartas ganadas al array
        } else {
            cards[optionOneId].style.backgroundImage = 'none'; // Volver a ocultar la primera carta
            cards[optionTwoId].style.backgroundImage = 'none'; // Volver a ocultar la segunda carta
        }

        // Vaciar los arrays de cartas seleccionadas
        cardsChosen = [];
        cardsChosenId = [];

        // Verificar si todas las cartas han sido encontradas
        if (cardsWon.length === cardArray.length / 2) {
            alert('¡Felicidades! ¡Has encontrado todos los pares!'); // Mostrar mensaje de felicitaciones
        }
    }

    // Función para voltear una carta
    function flipCard() {
        const cardId = this.getAttribute('data-id'); // Obtener el ID de la carta seleccionada

        // Verificar que la carta no haya sido seleccionada previamente y que solo haya dos cartas seleccionadas
        if (!cardsChosenId.includes(cardId) && cardsChosenId.length < 2) {
            cardsChosen.push(cardArray[cardId].name); // Añadir el nombre de la carta al array de seleccionadas
            cardsChosenId.push(cardId); // Añadir el ID de la carta al array de IDs seleccionados
            this.style.backgroundImage = `url(${cardArray[cardId].img})`; // Mostrar la imagen de la carta
            this.style.backgroundSize = 'cover'; // Ajustar el tamaño de la imagen

            // Verificar si se han seleccionado dos cartas
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 1000); // Esperar un segundo antes de verificar si las cartas son iguales
            }
        }
    }

    // Función para reiniciar el juego
    function resetGame() {
        cardsChosen = []; // Vaciar el array de cartas seleccionadas
        cardsChosenId = []; // Vaciar el array de IDs de cartas seleccionadas
        cardsWon = []; // Vaciar el array de cartas ganadas
        createBoard(); // Volver a crear el tablero del juego
    }

    // Seleccionar el botón de reinicio y añadir evento click para reiniciar el juego
    const resetButton = document.querySelector('#reset-button');
    resetButton.addEventListener('click', resetGame);

    // Crear el tablero del juego al cargar la página
    createBoard();
});
