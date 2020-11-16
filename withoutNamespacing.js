// ***** Clean code - put functions in variables and have each function only serve 1 main purpose

// Impuzzible
// A landing page introducing the game and rules
// Point users to click link to go to game page
$(function () {
    for (let i = 0; i < 16; i++) {
        $('.piecesContainer').append(`<div class='piece jigsaw${i}'>
    <a href='' class='handle'></a></div>`);
    }
    // Create piece slots as <div>s in HTML
    for (let i = 0; i < 16; i++) {
        $('.puzzleContainer').append(`<div class='pieceSlot slot${i}'></div>`);
    }

        // Insert puzzle pieces into an array to assign index numbers to each piece
    const $piece = $('.piece');
    const piecesArray = Array.from($piece);
    // console.log(piecesArray);

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

    // Apply droppable state to total playing are to track each player move and add 1 total move to move counter 
    const totalDroppableArea = () => {
        $('.puzzleContainer').droppable({
            accept: $('.piece'),
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

    const removeCounterPulse = () => {
        $('.counter').removeClass('almostGameOver');
    }

    // Create difficulty level
    const moves = 6;
    // Create counter variable and function to keep track of the number to total moves remaining
    let movesRemainCount = moves;

    const movesRemainCounterFunk = () => {
        if (movesRemainCount <= 5 && movesRemainCount > 0) {
            $('.counter').addClass('almostGameOver');
        } else if (movesRemainCount === 0) {
            // Decrease counter font and show no moves left
            $('.counter').toggleClass('noMovesLeft');
            removeCounterPulse();
            // $('.counter').html('No moves left');
            // Notify player game is over if they have reached total moves allowed
            // alert('you lose!');
            // Notify player they have won if they have placed all pieces successfully
            $('.alert h2').text('Game over!');
            $('.alert').toggleClass('show');
            
            $('.counter').toggleClass('noMovesLeft');
            // reshuffle pieces using shuffle function
            shufflePieces();
            // Reset move counter and display on screen
            movesRemainCount = moves;
            $('.counter').html(movesRemainCount);
        }
    }

    // const pressureCounter = () => {
    //     if (movesRemainCount <= 15 && movesRemainCount > 0) {
    //         $('.counter').addClass('almostGameOver');
    //     }
    // }

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
            } else {
                const randomX = (Math.floor(Math.random() * 275) + 15);
                const randomY = (Math.floor(Math.random() * 50) + 10);
                $(eachPiece).css({
                    'left': `${randomX}px`,
                    'top': `${randomY}px`,
                })
            }

            
            $(eachPiece).draggable('enable');
        })
        $('button').mouseup(function () {
            this.blur()
        })

        removeCounterPulse();
        movesRemainCount = moves;
        $('.counter').html(moves);
        correctCount = 0;
    }

    const correctDropEvent = (correctPiece) => {
        $(slotArray[correctPiece]).on('drop', function (event, ui) {
            console.log('correct');
            // Disable dragging the puzzle piece once it has been dropped on the correct slot and lower z-index in case another piece is placed on top
            $(piecesArray[correctPiece]).draggable('disable').addClass('zIndexLower');
            // Increase correct move counter by 1
            correctCount++;
            console.log(correctCount);
            // Call correct move count checker function to see if all pieces have been correctly placed
            correctCountFunk();
        })
    }

    const keyboardPress = () => {
        for (let i = 0; i < 16; i++) {
            $(piecesArray[i]).on('keydown', (e) => {
                e.preventDefault();
                let position = '';
                const draggable = $(piecesArray[i]),
                    container = $('.piecesBoundary'),
                    distance = 3; // Distance in pixels the draggable should be moved

                position = draggable.position();
                console.log('piece was selected with the key');

                // Reposition if one of the directional keys is pressed
                switch (e.keyCode) {
                    case 9:
                        // draggable.toggleClass('box');
                        let next = $(piecesArray[i++]);
                        if (next > piecesArray.length) {
                            next = 0;
                        }
                        $(piecesArray[next]);
                        break;
                    case 66:
                        // draggable.toggleClass('box');
                        let back = $(piecesArray[i--]);
                        if (back > piecesArray.length) {
                            back = 0;
                        }
                        $(piecesArray[back]);
                        break;
                    case 37:

                        //     ({
                        //     border: '3px solid red'
                        // });
                        position.left -= distance; break; // Left
                    case 38:
                        // draggable.css({
                        //     border: '3px solid red'
                        // });
                        position.top -= distance; break; // Up
                    case 39:
                        // draggable.css({
                        //     border: '3px solid red'
                        // });
                        position.left += distance; break; // Right
                    case 40:
                        // draggable.css({
                        //     border: '3px solid red'
                        // });
                        position.top += distance; break; // Down
                    default: return true; // Exit and bubble
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


    // Display total move counter on screen
    const renderedCount = $('.counter').html(`${movesRemainCount}`);

    // 'Reset' button to reshuffle pieces and start puzzle over again
    const reShuffleButton = () => {
        $('.gameReplay').on('click', function () {
            shufflePieces();
        })
    }

    const replayButton = () => {
        $('.alertReplay').on('click', function () {
            $('.alert').toggleClass('show');
            shufflePieces();
        })
    }


    shufflePieces();
    totalDroppableArea();
    assignDroppableSlot();
    keyboardPress();
    reShuffleButton();
    replayButton();

});