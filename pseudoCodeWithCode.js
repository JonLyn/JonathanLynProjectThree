// ***** Clean code - put functions in variables and have each function only serve 1 main purpose


// Impuzzible

// A landing page introducing the game and rules
// Point users to click link to go to game page

// Create puzzle pieces as <div>s holding an anchor tag to allow focus state in HTML
for (let i = 0; i < 16; i++) {
    $('.piecesContainer').append(`<div class='piece jigsaw${i}'>
    <a href="#"></a></div>`);
}
// Create piece slots as <div>s in HTML
for (let i = 0; i < 16; i++) {
    $('.puzzleContainer').append(`<div class='pieceSlot slot${i}'></div>`);
}


// Insert puzzle pieces into an array to assign index numbers to each piece
const piece = document.getElementsByClassName('piece');
const piecesArray = Array.from(piece);


// Insert piece slots into an array to assign index numbers to each slot
const slot = document.getElementsByClassName('pieceSlot')
const slotArray = Array.from(slot);


// Apply random start(x & y) positioning and positive z-index to each piece using for loop and shuffle pieces
const shufflePieces = function() {
    piecesArray.forEach((eachPiece) => {
        const randomX = (Math.floor(Math.random() * 50));
        const randomY = (Math.floor(Math.random() * 300));
        $(eachPiece).css({
            'left': `${randomX}px`,
            'top': `${randomY}px`
        })
    })
}   
shufflePieces();



// Assign draggable state and options to puzzle pieces so they can be dragged and snap to puzzle slots
$('.piece').draggable({
    snap: '.pieceSlot',
    snapMode: 'inner',
    snapTolerance: 50,
    containment: '.piecesBoundary',
});

// Create counter variable and function to keep track of the number of correctly placed pieces 
let correctCount = 0;
const correctCountFunc = () => {
    if (correctCount === 16) {
        // Notify player they have won if they have placed all pieces successfully
        alert('you win!');
        // reshuffle pieces using shuffle function
        shufflePieces();
        // Reset correct moves counter
        correctCount = 0;
    }
}


// Create counter variable and function to keep track of the number to total moves
let moveCount = 0;
const moveCounterFunc = () => {
    if (moveCount === 5) {
        // Notify player game is over if they have reached total moves allowed
        alert('you lose!');
        // reshuffle pieces using shuffle function
        shufflePieces();
        // Reset move counter and display on screen
        moveCount = 0;
        $('.counter').html(moveCount);
    }
}

// Create a counter to keep track of moves remaining
let movesRemainingCount = 30;

// Create loop to assign droppable state to each puzzle slot and allow only the puzzle pice with the same array index number
for (let i = 0; i < 16; i++) {
    $(slotArray[i]).droppable({
        accept: $(piecesArray[i]),
        // ***** maybe can remove the on method
        drop: $(slotArray[i]).on('drop', function (event, ui) {
            console.log('correct');
            // Disable dragging the puzzle piece once it has been dropped on the correct slot and lower z-index in case another piece is placed on top
            $(piecesArray[i]).draggable('disable').addClass('zIndexLower');
            // Increase correct move counter by 1
            correctCount += 1;
            // Alert player that they have won once all 16 pieces have been correctly placed
            
        })
    })
}


// Apply droppable state to total playing are to track each player move and add 1 total move to move counter 
$('.puzzleContainer').droppable({
    accept: $('.piece'),
    drop: function (event, ui) {
        moveCount += 1;
        // Display total move counter on screen
        $('.counter').html(moveCount);
        // Call move count checker function
        moveCounterFunc();
    }
})

// Display total move counter on screen
$('.counter').html(`${moveCount}`);



// 'Reset' button to reshuffle pieces and start puzzle over again
$('button').on('click', function() {
    shufflePieces();
})


// TEST CODE TO CHANGE FROM ABOVE INLINE SYTLES
// piecesArray.forEach(element => {
    // let baseOffset = piecesArray.offsetParent().offset();
    // piecesArray.offset({
    //      left: baseOffset.left + randomX,
    //      top: baseOffset.top + randomY
    //  })
// });