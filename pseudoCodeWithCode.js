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


// Apply random start positioning to each piece
for (let i = 0; i < 16; i++) {
    const randomX = (Math.floor(Math.random() * 50));
    const randomY = (Math.floor(Math.random() * 300));
    $(piecesArray[i]).css({
        left: randomX + 'px',
        top: randomY + 'px'
    })
}  
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
    containment: '.wrapper',
    zIndex: 200
});

// Create counter to keep track of the number of correctly placed pieces. Alert player that they have won once all 16 pieces have been correctly placed
let correctCount = 0;
if (correctCount === 16) {
    alert('you win!');
}
// Create loop to assign droppable state to each puzzle slot and allow only the puzzle pice with the same array index number
for (let i = 0; i < 16; i++) {
    $(slotArray[i]).droppable({
        accept: $(piecesArray[i]),
        drop: $(slotArray[i]).on('drop', function (event, ui) {
            console.log('correct');
            // Disable dragging the puzzle piece once it has been dropped on the correct slot and lower z-index in case another piece is placed on top
            $(piecesArray[i]).draggable('disable').addClass('zIndexLower');
            // Increase correct move counter by 1
            console.log('move');
            correctCount += 1;
            
            // *****change this to addClass
            $(piecesArray[i]).css({
                // display: 'none'
            })
            console.log(correctCount);
        })
    })
}

// Count moves.  If moves = 20, game over
let moveCount = 0;
$('.puzzleContainer').droppable({
    accept: $('.piece'),
    drop: function (event, ui) {
        moveCount += 1;
        if (moveCount === 21) {
            alert('you lose!');
        }
        console.log(moveCount);
    }
})

// MAYBE USE MOVE COUNT - CORRECT COUNT TO COUNT LIVES









// Check if puzzle piece ID matches puzzle slot ID



// Alert player they have won when all pieces are correctly laid


// 'Reset' button to reshuffle pieces and start puzzle over again


