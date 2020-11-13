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
// console.log(piecesArray);

// Insert piece slots into an array to assign index numbers to each slot
const slot = document.getElementsByClassName('pieceSlot')
const slotArray = Array.from(slot);

// Assign draggable state and options to puzzle pieces so they can be dragged and snap to puzzle slots

const draggablePiece = $('.piece').draggable({
    snap: '.pieceSlot',
    snapMode: 'inner',
    snapTolerance: 50,
    containment: '.piecesBoundary'
});





const hardMode = 20;
// Create counter variable and function to keep track of the number to total moves remaining
let movesRemainCount = hardMode;
const movesRemainCounterFunk = () => {
    // console.log('asdffsd');
    // movesRemainCount = 10;
    
    if (movesRemainCount < 0) {
        $('.counter').html('No moves left');
        // Notify player game is over if they have reached total moves allowed
        alert('you lose!');
        // reshuffle pieces using shuffle function
        shufflePieces();
        // Reset move counter and display on screen
        movesRemainCount = hardMode;
        $('.counter').html(movesRemainCount);
    }
}


// Create counter variable and function to keep track of the number of correctly placed pieces 
let correctCount = 0;
const correctCountFunk = () => {
    // correctCount = 0;
    if (correctCount === 5) {
        // Notify player they have won if they have placed all pieces successfully
        alert('you win!');
        // reshuffle pieces using shuffle function
        shufflePieces();
        // Re-enable draggable state to pieces
        $(piece).draggable('enable');
        // Reset correct moves counter
        correctCount = 0;
    }
}

// Apply random start(x & y) positioning and positive z-index to each piece using for loop and shuffle pieces
const shufflePieces = function () {
    piecesArray.forEach((eachPiece) => {
        const randomX = (Math.floor(Math.random() * 50));
        const randomY = (Math.floor(Math.random() * 300));
        $(eachPiece).css({
            'left': `${randomX}px`,
            'top': `${randomY}px`
        })
        
    })
    // movesRemainCounterFunk();
    // correctCountFunk();
    movesRemainCount = hardMode;
    $('.counter').html(hardMode);
    correctCount = 0;
}
shufflePieces();



// Apply droppable state to total playing are to track each player move and add 1 total move to move counter 
$('.puzzleContainer').droppable({
    accept: $('.piece'),
    drop: function (event, ui) {
        movesRemainCount -= 1;
        // Display total moves counter on screen
        $('.counter').html(movesRemainCount);
        // Call total moves count checker function to see if any moves remaining or if game is over
        movesRemainCounterFunk();
    }
})





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
            console.log(correctCount);
            // Call correct move count checker function to see if all pieces have been correctly placed
            correctCountFunk();
        })
    })
}


// Display total move counter on screen
$('.counter').html(`${movesRemainCount}`);


// 'Reset' button to reshuffle pieces and start puzzle over again
$('button').on('click', function() {
    shufflePieces();
})

for(let i=0; i<16; i++) {

    $(piecesArray[i]).on('keydown', handleKeys);

    function handleKeys(e) {
        // Don't scroll page
        e.preventDefault();
        var position,
            draggable = $(piecesArray[i]),
            container = $('.piecesBoundary'),
            distance = 5; // Distance in pixels the draggable should be moved

        position = draggable.position();
        console.log('piece was selected with the key');

        // Reposition if one of the directional keys is pressed
        switch (e.keyCode) {
            case 37: position.left -= distance; break; // Left
            case 38: position.top -= distance; break; // Up
            case 39: position.left += distance; break; // Right
            case 40: position.top += distance; break; // Down
            case 13: $(piecesArray[i]).draggable('disable'); 
            console.log('release');
            break;
            case 9: let next = i++;
            if (next > piecesArray.length) {
                next = 0;
            }
            
            $(piecesArray[next]);
            break;
            default: return true; // Exit and bubble
        }

        // Keep draggable within container
        if (position.left >= 0 && position.top >= 0 &&
            position.left + draggable.width() <= container.width() &&
            position.top + draggable.height() <= container.height()) {
            draggable.css(position);
        }
    }
}
    



// TEST CODE TO CHANGE FROM ABOVE INLINE SYTLES
// piecesArray.forEach(element => {
    // let baseOffset = piecesArray.offsetParent().offset();
    // piecesArray.offset({
    //      left: baseOffset.left + randomX,
    //      top: baseOffset.top + randomY
    //  })
// });





// Apply random start(x & y) positioning and positive z-index to each piece using for loop and shuffle pieces
// const shufflePieces = function() {
//     piecesArray.forEach((eachPiece) => {
//         const randomX = (Math.floor(Math.random() * 50));
//         const randomY = (Math.floor(Math.random() * 300));
//         $(eachPiece).css({
//             'left': `${randomX}px`,
//             'top': `${randomY}px`
//         })
//     })
//     movesRemainCount = 40;
//     correctCount = 0;
// }   
// shufflePieces();