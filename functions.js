// Impuzzible

// Document ready
$(function () {

    // Create puzzle pieces as <div>s in HTML
    for (let i = 0; i < 16; i++) {
        $('.piecesContainer').append(`<div class='correctNotification piece jigsaw${i}'>
    <a href='' class='handle' aria-label='puzzle piece.  Image from www.lorempixel.com'></a></div>`);
    }

    // Create piece slots as <div>s in HTML
    for (let i = 0; i < 16; i++) {
        $('.puzzleContainer').append(`<div class='pieceSlot slot${i}'></div>`);
    }

    // Insert puzzle pieces into an array to assign index numbers to each piece
    const $piece = $('.piece');
    const piecesArray = Array.from($piece);

    // Insert piece slots into an array to assign index numbers to each slot
    const $slot = $('.pieceSlot')
    const slotArray = Array.from($slot);

    // Remove click function on <a> tag within the puzzle pieces
    $('.handle').on('click', (e) => {
        e.preventDefault();
    })

    // Assign draggable state and options to puzzle pieces so they can be dragged and snap to puzzle slots
    $piece.draggable({
        snap: '.pieceSlot',
        snapMode: 'inner',
        snapTolerance: 50,
        containment: '.piecesBoundary'
    });

    // Apply droppable state to total playing are to track each player move and add 1 move to move counter (unable to get counter to reduce when work with keyboard functionality)
    const totalDroppableArea = () => {
        $('.puzzleContainer').droppable({
            accept: $piece,
            drop: function (event, ui) {
                movesRemainCount--;
                // Display total moves counter on screen
                $('.counter').html(movesRemainCount);
                // Call total moves count checker function to see if any moves remaining or if game is over
                movesRemainCounterFunk();
            }
        })
    }

    // Create loop to assign droppable state to each puzzle slot and allow only the puzzle pice with the same array index number
    const assignDroppableSlot = () => {
        for (let i = 0; i < 16; i++) {
            $(slotArray[i]).droppable({
                accept: $(piecesArray[i]),
                drop: correctDropEvent(i),
            })
        }
    }

    // Variable to store the number of moves allowed
    const moves = 50;
    
    // Create counter variable and function to keep track of the number to total moves remaining
    let movesRemainCount = moves;

    const movesRemainCounterFunk = () => {
        // Check to see if only 5 moves left to change move counter styling
        if (movesRemainCount <= 5 && movesRemainCount > 0) {
            $('.counter').addClass('almostGameOver');
        } else if (movesRemainCount === 0) {
            // Notify player game is over if they have reached total moves allowed
            $('.alert h2').text('Game over!');
            $('.alert').toggleClass('show');
            // reshuffle pieces using shuffle function
            shufflePieces();
            // Reset move counter 
            movesRemainCount = moves;
            $('.counter').html(movesRemainCount);
        }
    }

    // Function to remove the pulsing font when moves are almost done
    const removeCounterPulse = () => {
        $('.counter').removeClass('almostGameOver');
    }

    // Create counter variable and function to keep track of the number of correctly placed pieces 
    let correctCount = 0;
    const correctCountFunk = () => {
        // correctCount = 0;
        if (correctCount === 16) {
            // Notify player they have won if they have placed all pieces successfully
            $('.alert h2').text('You win!');
            $('.alert').toggleClass('show');
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
            if ($(window).width() > 960) {
                const randomX = (Math.floor(Math.random() * 40) + 15);
                const randomY = (Math.floor(Math.random() * 275) + 10);
                $(eachPiece).css({
                    'left': `${randomX}px`,
                    'top': `${randomY}px`,
                })
            // Adjusting start positioning to match changes in responsive piece container 
            } else if ($(window).width() < 525) {
                const randomX = (Math.floor(Math.random() * 200) + 15);
                const randomY = (Math.floor(Math.random() * 75) + 10);
                $(eachPiece).css({
                    'left': `${randomX}px`,
                    'top': `${randomY}px`,
                })
                
            } else {
                const randomX = (Math.floor(Math.random() * 275) + 15);
                const randomY = (Math.floor(Math.random() * 50) + 10);
                $(eachPiece).css({
                    'left': `${randomX}px`,
                    'top': `${randomY}px`,
                })
            }

            // Re-enable draggable state and remove border around correctly laid pieces
            $(eachPiece).draggable('enable').removeClass('correctNotification keyBorder');
        })

        // Remove stuck focus state  
        $('button').mouseup(function () {
            this.blur()
        })

        // Remove pulse from counter and reset the number of correctly laid pieces to 0
        removeCounterPulse();
        movesRemainCount = moves;
        $('.counter').html(moves);
        correctCount = 0;
    }

    // Function to run when a correct piece is laid
    const correctDropEvent = (correctPiece) => {
        $(slotArray[correctPiece]).on('drop', function (event, ui) {
            // Disable dragging the puzzle piece once it has been dropped on the correct slot and lower z-index in case another piece is placed on top
            $(piecesArray[correctPiece]).draggable('disable').addClass('zIndexLower').addClass('correctNotification');
            // Increase correct move counter by 1
            correctCount++;
            // Call correct move count checker function to see if all pieces have been correctly placed
            correctCountFunk();
        })
    }

    // Keyboard control functionality
    const keyboardPress = () => {
        for (let i = 0; i < 16; i++) {
            $(piecesArray[i]).on('keydown', (e) => {
                e.preventDefault();
                let position = '';
                const draggable = $(piecesArray[i]),
                    container = $('.piecesBoundary'),
                    distance = 3; 
                position = draggable.position();
                // Add border to piece being moved (was unable to remove border after keypress)
                draggable.addClass('keyBorder');

                // Reposition if one of the directional keys is pressed
                switch (e.keyCode) {
                    // Allows player to tab through pieces
                    case 9:
                        let next = $(piecesArray[i++]);
                        if (next > piecesArray.length) {
                            next = 0;
                        }
                        $(piecesArray[next]);
                        break;
                    // Allows player to select previous piece
                    case 66:
                        let back = $(piecesArray[i--]);
                        if (back > piecesArray.length) {
                            back = 0;
                        }
                        $(piecesArray[back]);
                        break;
                    // Move left
                    case 37: position.left -= distance; break; 
                    // Move up
                    case 38: position.top -= distance; break; 
                    // Move right
                    case 39: position.left += distance; break;
                    // Move down 
                    case 40: position.top += distance; break;
                    // Restart
                    case 82: shufflePieces(); 
                    // Exit and loop
                    default: return true; 
                }

                // Keep draggable within container
                if (position.left >= 0 && position.top >= 0 &&
                    position.left + draggable.width() <= container.width() &&
                    position.top + draggable.height() <= container.height()) {
                    draggable.css(position);
                }
            })
        }
    }

    // 'Reset' button functionality to reshuffle pieces and start puzzle over again
    const reShuffleButton = () => {
        $('.gameReplay').on('click', function () {
            shufflePieces();
        })
    }

    // Replay button shown on win or lose alert
    const replayButton = () => {
        $('.alertReplay').on('click', function () {
            $('.alert').toggleClass('show');
            shufflePieces();
        })
    }

    // Calling functions
    shufflePieces();
    totalDroppableArea();
    assignDroppableSlot();
    keyboardPress();
    reShuffleButton();
    replayButton();

});