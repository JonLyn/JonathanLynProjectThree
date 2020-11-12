// ***** Clean code - put functions in variables and have each function only serve 1 main purpose


// Impuzzible

// A landing page introducing the game and rules
// Point users to click link to go to game page

// Create puzzle pieces as <div>s in HTML
for (let i = 0; i < 16; i++) {
    $('.piecesContainer').append(`<div class='piece jigsaw${i}'></div>`);
}
// Create piece slots as <div>s in HTML
for (let i = 0; i < 16; i++) {
    $('.puzzleContainer').append(`<div class='pieceSlot slot${i}'></div>`);
}


// Get random x and y positioning 
const randomX = (Math.floor(Math.random() * 150));
const randomY = (Math.floor(Math.random() * 400));


// Insert puzzle pieces into an array to assign index numbers to each piece
const piece = document.getElementsByClassName('piece');
const piecesArray = Array.from(piece);


// Insert piece slots into an array to assign index numbers to each slot
const slot = document.getElementsByClassName('pieceSlot')
const slotArray = Array.from(slot);


// Apply random start positioning and positive z-index to each piece using for loop and shuffle pieces
const shufflePieces = function() {
    for (let i = 0; i < 16; i++) {
        const randomX = (Math.floor(Math.random() * 50));
        const randomY = (Math.floor(Math.random() * 300));
        const randomZ = (Math.floor(Math.random() * 1000) + 1);
        console.log(randomZ);
        $(piecesArray[i]).css({
            'left': randomX + 'px',
            'top': randomY + 'px',
            'z-index': randomZ
        })
    } 
}   
shufflePieces();
// TEST CODE TO CHANGE FROM ABOVE INLINE SYTLES
// piecesArray.forEach(element => {
    // let baseOffset = piecesArray.offsetParent().offset();
    // piecesArray.offset({
    //      left: baseOffset.left + randomX,
    //      top: baseOffset.top + randomY
    //  })
// });


// Assign draggable state and options to puzzle pieces so they can be dragged and snap to puzzle slots
$('.piece').draggable({
    snap: '.pieceSlot',
    snapMode: 'inner',
    snapTolerance: 50,
    containment: '.piecesBoundary',
});

// Create counter to keep track of the number of correctly placed pieces 
let correctCount = 0;

// Create counter to keep track of the number to total moves
let moveCount = 0;
// *****MAYBE USE MOVE COUNT minus CORRECT COUNT TO COUNT LIVES

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
            if (correctCount === 16) {
                alert('you win!');
            }
            // console.log('move');
            // console.log(correctCount);
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
        // Alert player they have lost if they have used all moves allowed
        if (moveCount === 25) {
            alert('you lose!');
        }
        // console.log(moveCount);
    }
})

// Display total move counter on screen
$('.counter').html(`${moveCount}`);



// 'Reset' button to reshuffle pieces and start puzzle over again
$('button').on('click', function() {
    shufflePieces();
})


