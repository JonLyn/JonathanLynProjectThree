$(function () {

// Impuzzible

// A landing page introducing the game and rules


// Point users to click link to go to game page


// Shuffle puzzle pieces in the piece container using a randomizer
    // Get random x and y positioning 
    // Apply random positioning to each piece 


// Add draggable state to puzzle pieces so they can be dragged and snap to puzzle slots
    $('.piece').draggable({
        snap: ".pieceSlot",
        containment: '.wrapper',
        revert: function(dropOkay) {
            if (dropOkay) {
                console.log('good');
            } else {
                count += 1;
                console.log(count);

                if (count === 3) {
                    console.log('dead');
                }
            }
        }
    });

// Apply a unique ID/index to each puzzle piece
    

    const piece = document.getElementsByClassName('piece');
    let piecesArray = Array.from(piece);
    // console.log(piecesArray);

// Apply a unique ID/index to each puzzle slot
    const slot = document.getElementsByClassName('pieceSlot')
    const slotArray = Array.from(slot);
    console.log(slotArray);

// Check if puzzle piece ID matches puzzle slot ID
    let count = 0;

    for (let i = 0; i <= 16; i++) {
        // console.log($(piecesArray[i]));
        $(slotArray[i]).droppable({
            accept: $(piecesArray[i]),
            drop: function (event, ui) {
                // $(this).find('p').html('dropped');
                // console.log('yes');
                console.log('works');
                
            
                }
            })

        // $('.s1').droppable({
        //     // accept: '.a1',
        //     accept: function () {
        //         if ($('.a1').hasClass(`a1`) == true) {
        //             console.log('yessss');
        //             return '.a1';
        //         }  
        //     },    
            // function () {
            //     if (true) {
            //         console.log('yay');
            //     }
            // },
        //     drop: function (event, ui) {
        //         $(this).find('p').html('dropped');
        //         console.log('yes');
        //         count += 1;
        //         console.log(count);
        //         if (count === 3) {
        //             console.log('dead');
        //         }
        //     }
        // })
    }


// Alert player they have won when all pieces are correctly laid


// 'Reset' button to reshuffle pieces and start puzzle over again



// STRETCH GOAL
    // Player clicks on 'Start' button to begin playing
    // Timer starts countdown when player clicks on 'Start' button 
    // Display 'Game Over' message if timer reaches zero

// STRETCH GOAL 
// Check if piece was applied to the correct spot by applying dropped accept state
    // Reduce incorrect guesses by 1 
    // Check if player still has lives remaining
    // Display 'Game Over' message if player reaches 3 incorrect guesses

// STRETCH GOAL
// Image changes when reset button pressed

// ERROR HANDLING
// Contain puzzle pieces within playing area





// Declare global death counter variable

// const puzzlePiece = ['a1, a2'];



// Apply droppable property to piece slot
    // $('.s1').droppable({
    //     accept: '.a1, a2, - .a1',
    //     drop: function (event, ui) {
    //         $(this).find('p').html('dropped');
    //         console.log('yes');
    //         count += 1;
    //         console.log(count);
    //         if (count === 3) {
    //             console.log('dead');
    //         }
    //     }    
    // })

    // $('.s2').droppable({
    //     accept: '.a2',
    //     drop: function (event, ui) {
    //         $(this).find('p').html('dropped');
    //         console.log('yes');
    //         count += 1;
    //         console.log(count);
    //         if (count === 3) {
    //             console.log('dead');
    //         }
    //     }
    // })

    
    // if (count === 3) {
    //     console.log('asdfasdf');
    // }
});

    
// Shuffle puzzle pieces with a randomizer


// ERROR HANDLING
// Contain puzzle pieces within playing area


// Have pieces snap to the pieces slots


// Check if piece was applied to the correct spot
    // Reduce incorrect guesses by 1 
    // Check if player still has lives remaining
    // Game over if player reaches 3 incorrect guesses

// Reset button restarts puzzle


// STRETCH GOAL
    // Add timer

// `.a1, .a2, .a3, .a4, .a5, .a6, .a7, .a8, .a9, .a10, .a11, a12, .a13, .a14, .a15, .a16 - .a1`,