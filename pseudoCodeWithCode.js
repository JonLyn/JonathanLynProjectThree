

// Impuzzible

// A landing page introducing the game and rules
// Point users to click link to go to game page

// Create puzzle pieces
for (let i = 0; i < 16; i++) {
    $('.piecesContainer').append(`<div class='piece jigsaw${i}'></div>`);
}

// Create piece slots
for (let i = 0; i < 16; i++) {
    $('.puzzleContainer').append(`<div class='pieceSlot slot${i}'></div>`);
}

// Shuffle puzzle pieces in the piece container using a randomizer
// Get random x and y positioning 
// Apply random positioning to each piece 


// Add draggable state to puzzle pieces so they can be dragged and snap to puzzle slots
$('.piece').draggable({
    snap: '.pieceSlot',
    containment: '.wrapper',
    snapTolerance: 50,
    zIndex: 100
});

// Apply a unique ID/index to each puzzle piece
const piece = document.getElementsByClassName('piece');
const piecesArray = Array.from(piece);

// Apply a unique ID/index to each puzzle slot
const slot = document.getElementsByClassName('pieceSlot')
const slotArray = Array.from(slot);

// Add droppable state to puzlze slots so they can accept correct puzzle piece
let correctCount = 0;
for (let i = 0; i <= 16; i++) {
    $(slotArray[i]).droppable({
        accept: $(piecesArray[i]),
        drop: $(slotArray[i]).on('drop', function (event, ui) {
            console.log('works');
            $(piecesArray[i]).draggable('disable');
            correctCount += 1;
            if (correctCount === 16) {
                alert('you win!');
            }
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


