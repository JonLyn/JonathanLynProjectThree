// ***** Clean code - put functions in variables and have each function only serve 1 main purpose

// Impuzzible
// A landing page introducing the game and rules
// Point users to click link to go to game page
// Insert puzzle pieces into an array to assign index numbers to each piece
// app.CreatePiecesArray = () => {
const piece = document.getElementsByClassName('piece');
// const piecesArray = Array.from(piece);
console.log(piece);
const piecesArray = [];
piecesArray.push(piece);
// } 



console.log(piece);
console.log(piecesArray);


// Insert piece slots into an array to assign index numbers to each slot
const slot = document.getElementsByClassName('pieceSlot')
// const slotArray = Array.from(slot);
const slotArray = [];
slotArray.push(slot);

console.log(slotArray);
const app = {};

// Create puzzle pieces as <div>s holding an anchor tag to allow focus state in HTML
app.createPiece = () => {
    for (let i = 0; i < 16; i++) {
        $('.piecesContainer').append(`<div class='piece jigsaw${i}'>
    <a href="#"></a></div>`);
    }
} 
// Create piece slots as <div>s in HTML
app.createSlot = () => {
    for (let i = 0; i < 16; i++) {
        $('.puzzleContainer').append(`<div class='pieceSlot slot${i}'></div>`);
    }
} 
// *******************************************************************************************


// Assign draggable state and options to puzzle pieces so they can be dragged and snap to puzzle slots
app.draggablePiece = () => {
    $('.piece').draggable({
        snap: '.pieceSlot',
        snapMode: 'inner',
        snapTolerance: 50,
        containment: '.piecesBoundary',
        draggable: 'enable'
    });
}

// Apply droppable state to total playing are to track each player move and add 1 total move to move counter 
app.totalDroppableArea = () => {
    $('.puzzleContainer').droppable({
        accept: $('.piece'),
        drop: function (event, ui) {
            movesRemainCount -= 1;
            // Display total moves counter on screen
            $('.counter').html(movesRemainCount);
            // Call total moves count checker function to see if any moves remaining or if game is over
            app.movesRemainCounterFunk();
        }
    })
} 

// Create loop to assign droppable state to each puzzle slot and allow only the puzzle pice with the same array index number
app.assignDroppableSlot = () => {
    for (let i = 0; i < 16; i++) {
        $(slotArray[i]).droppable({
            accept: $(piecesArray[i]),
            drop: app.correctDropEvent(i),
        })
    }
} 

// Create difficulty level
const hardMode = 20;
// Create counter variable and function to keep track of the number to total moves remaining
let movesRemainCount = hardMode;

app.movesRemainCounterFunk = () => {   
    if (movesRemainCount < 0) {
        $('.counter').html('No moves left');
        // Notify player game is over if they have reached total moves allowed
        alert('you lose!');
        // reshuffle pieces using shuffle function
        app.shufflePieces();
        // Reset move counter and display on screen
        movesRemainCount = hardMode;
        $('.counter').html(movesRemainCount);
    }
}

// Create counter variable and function to keep track of the number of correctly placed pieces 
let correctCount = 0;

app.correctCountFunk = () => {
    // correctCount = 0;
    if (correctCount === 5) {
        // Notify player they have won if they have placed all pieces successfully
        alert('you win!');
        // reshuffle pieces using shuffle function
        app.shufflePieces();
        // Re-enable draggable state to pieces
        $(piece).draggable('enable');
        // Reset correct moves counter
        correctCount = 0;
    }
}

// Apply random start(x & y) positioning and positive z-index to each piece using for loop and shuffle pieces
app.shufflePieces = function () {
    piecesArray.map((eachPiece) => {
        eachPiece.forEach((piece) => {
            console.log(piece);
        } )
        // console.log(eachPiece);
        const randomX = (Math.floor(Math.random() * 50));
        const randomY = (Math.floor(Math.random() * 300));
        // $(eachPiece).css({
        //     'left': `${randomX}px`,
        //     'top': `${randomY}px`
        // })
        console.log(randomX);
        console.log(randomY);
        $(eachPiece).draggable('enable'); 
    })
    movesRemainCount = hardMode;
    $('.counter').html(hardMode);
    correctCount = 0;
}

app.correctDropEvent = (correctPiece) => {
    $(slotArray[correctPiece]).on('drop', function (event, ui) {
        console.log('correct');
        // Disable dragging the puzzle piece once it has been dropped on the correct slot and lower z-index in case another piece is placed on top
        $(piecesArray[correctPiece]).draggable('disable').addClass('zIndexLower');
        // Increase correct move counter by 1
        correctCount += 1;
        console.log(correctCount);
        // Call correct move count checker function to see if all pieces have been correctly placed
        app.correctCountFunk();
    })
}
app.createPiece(); //Create individual puzzle pieces
app.createSlot(); //Create an empty slot for puzzle piece
app.draggablePiece(); //Add draggable functionality to each piece
app.shufflePieces(); //Reshuffle pieces and return to random starting position
app.totalDroppableArea(); // Apply droppable state to total playing to track of each player move and subtract 1 move to the total move counter 
app.assignDroppableSlot(); // 
app.movesRemainCounterFunk(); //Checks to see if any moves remaining.  If not, execute shufflePieces function and resets counter
app.correctDropEvent();
app.correctCountFunk(); //Checks to see if all correct pieces have been placed.  If so, executes shufflePieces function and resets counter



// Display total move counter on screen
$('.counter').html(`${movesRemainCount}`);


// 'Reset' button to reshuffle pieces and start puzzle over again
$('button').on('click', function() {
    app.shufflePieces();
})

for(let i=0; i<16; i++) {
    $(piecesArray[i]).on('keydown', handleKeys);
    function handleKeys(e) {
        // Don't scroll page
        e.preventDefault();
        let position = '';
        const draggable = $(piecesArray[i]),
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
            case 13: app.correctDropEvent(i);

            console.log('release'); break;
            case 9: let next = $(piecesArray[i++]);
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

// $(function() {

// });
    



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