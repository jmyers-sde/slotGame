$(document).ready(function(){
//Booleans to run game functions properly
    let runGame = true;
    let play = true;
    let affectSound = true;

// containers for the reels array
    const reelConts = [$('#reel1Cont'), $('#reel2Cont'), $('#reel3Cont'), $('#reel4Cont'), $('#reel5Cont'), $('#reel6Cont'), $('#reel7Cont'), $('#reel8Cont'), $('#reel9Cont')];
    
//array of reels: reels = images on the machine face
    const reels = [$('.reel1'), $('.reel2'), $('.reel3'), $('.reel4'), $('.reel5'), $('.reel6'), $('.reel7'), $('.reel8'), $('.reel9')];
    
//array of the pictures to be randomly selected to be put into the individual containers  
    const pics = ['slot_images/cherrys.png', 'slot_images/plum.png', 'slot_images/apple.png', 'slot_images/lemon.png', 'slot_images/grapes.png', 'slot_images/orange.png', 'slot_images/watermellon.png', 'slot_images/bell.png', 'slot_images/clover.png', 'slot_images/heart.png', 'slot_images/horseShoe.png', 'slot_images/diamond.png', 'slot_images/coin.png', 'slot_images/bar.png', 'slot_images/question.png', 'slot_images/seven.png'];

//Variables to the game     
    let betting = 0;//number that gets mathematics added to it to be placed in the bet variable
    let creditCounting = 500;//Where the credits get calculated before being applied to the page
    let paidCounting = 0;//Where the paid get calculated befre befing applied to the page
    const credits = $('.credits');//where your total credits are displayed on the page
    const bet = $('.bet');//where your total bets you made are displayed on the page
    const paid = $('.paid');//where your total winnings for the spin are displayed on the page
    const jackpot = $('.jackpot')//where your winning for a jackpot is displayed on the page
    
    let row1 = 0;//top left reel to top right reel
    let row2 = 0;//middle left reel to middle right reel
    let row3 = 0;//bottom left reel to bottom right reel
    let col1 = 0;//top left reel to bottom left reel
    let col2 = 0;//top middle reel to bottom middle reel
    let col3 = 0;//top right reel to bottom right reel
    let diag1 = 0;//top left reel to bottom right reel
    let diag2 = 0;//top right reel to bottom left reel
    
//====Sounds to the game && their functions to make them run====//
    
//Background Sound
    const startGame = document.createElement('audio');
    startGame.setAttribute('src', './sounds/casinoAmbiance.mp3');
    startGame.setAttribute('loop', 'true');

//Sound when you spin
    const slotStart = document.createElement('audio');
    slotStart.setAttribute('src', './sounds/slot-machine.mov');

//Function that plays sound for spin
    function beginGame(){
        if(affectSound){
            slotStart.play();
        }
    }
    
//Sound when you get a jackpot
    const jackpotWinner = document.createElement('audio');
    jackpotWinner.setAttribute('src', './sounds/jackpot.mp3');
//Function that plays sound for Jackpot
    function bigWin(){
        if(affectSound){
            littleWinner.pause();
            jackpotWinner.play();
            play = false;
        }
    }
    jackpotWinner.onended = function(){
        play = true;
    }
    
//Sound of regular winner
    const littleWinner = document.createElement('audio');
    littleWinner.setAttribute('src', './sounds/slot_winner.mp3');
//Function that plays sound for regular win
    function smallWin(){
        if(affectSound){
            littleWinner.play();
            play = false;
        }
    }
    littleWinner.onended = function(){
        play = true;
    }

//The close button inside the Jackpot Modal
    $('.jackClose').on('click', function(){
        winnings = 0;
        betting = 0;
        bet.text(0);  
        paid.text(0);
        jackpot.text(0);
        reelConts[3].removeClass('winLight');
        reelConts[4].removeClass('winLight');
        reelConts[5].removeClass('winLight');   
        runGame = true;
    })
//Sound of losing all your credits
    const loseAll = document.createElement('audio');
    loseAll.setAttribute('src', './sounds/lostItAll.mp3');
//Button inside the losing modal and inside the dropdown button menu to restart the game
    $('.restart').on('click', function(){
        credits.text(500);
        paid.text(0);
        jackpot.text(0);
        bet.text(0);
        creditCounting = 500;

        reels[0].attr('src', 'slot_images/bar.png');
        reels[1].attr('src', 'slot_images/bar.png');
        reels[2].attr('src', 'slot_images/bar.png');
        reels[3].attr('src', 'slot_images/seven.png');
        reels[4].attr('src', 'slot_images/seven.png');
        reels[5].attr('src', 'slot_images/seven.png');
        reels[6].attr('src', 'slot_images/diamond.png');
        reels[7].attr('src', 'slot_images/diamond.png');
        reels[8].attr('src', 'slot_images/diamond.png');

        reelConts[0].removeClass('winLight');
        reelConts[1].removeClass('winLight');
        reelConts[2].removeClass('winLight');
        reelConts[3].removeClass('winLight');
        reelConts[4].removeClass('winLight');
        reelConts[5].removeClass('winLight');
        reelConts[6].removeClass('winLight');
        reelConts[7].removeClass('winLight');
        reelConts[8].removeClass('winLight');
    
    })

//===============Buttons && Keydowns to run game functions ===================//

//Function to make the tooltips work on the game functioning buttons
    $('[data-toggle="tooltip"]').tooltip();

//Button on the dropdown menu that brings up the game information inside of a modal
    $('.gmInfo').on('click', function(){
        $('#infoModal').modal();
    })

//button to start the game on load that starts the sound
    $('#startModal').modal({backdrop: 'static'});//Modal that comes up on load
    $('.playGame').on('click', function(){
        startGame.play();
    })
    
//====The background sound and sound effects functions====//
//background sound
    $('.soundOff').hide();//Hides the off image when the page is loaded
    
    $('.soundOn, .soundOff').on('click', function(){
        $('.soundOn').toggle(0);
        $('.soundOff').toggle(0);
    });//Toggles the images for the sound when they are on and off

    $('.soundOn').on('click', function(){
        startGame.pause();
    })//Turns the sound off when you click this image

    $('.soundOff').on('click', function(){
        startGame.play();
    })//Turns the sound on when you click this image

//sound effects
    $('.effectOff').hide();//Hides the off image when the page is loaded 

    $('.effectOn, .effectOff').on('click', function(){
        $('.effectOn').toggle(0);
        $('.effectOff').toggle(0);
    });//Toggles the images for the sound effects when they are on and off

    $('.effectOn').on('click', function(){
        affectSound = false;
    })//Turns the sound off when you click this image

    $('.effectOff').on('click', function(){
        affectSound = true;
    })//Turns the sound on when you click this image

//button that puts all your credits into the bet
    $('#betAll').on('click', function(){  
        if(runGame){
            if(betting < creditCounting){
                betting = creditCounting;
                bet.text(credits.text());
            } 
        }
    })
//bet all function that works when you press the M key
    $(document).keydown(function(e){ 
        switch(e.which){
            case 77:
                if(runGame){
                    if(betting < creditCounting){
                        betting = creditCounting;
                        bet.text(credits.text());
                    } 
                }
        }
    })

//button that adds +1 bet to slot machine to play
    $('#betOne').on('click', function(){  
        if(runGame){
            if(betting < creditCounting){
                bet.text(++betting);
                bet.text(bet.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));
            }
        }
    })
//bet +1 when you press the B key
    $(document).keydown(function(e){  
        switch(e.which){
            case 66:
                if(runGame){
                    if(betting < creditCounting){
                        bet.text(++betting);
                        bet.text(bet.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));
                    }
                }
        }
    })

//button that adds +10 bet to slot machine to play
    $('#betTen').on('click', function(){  
        if(runGame){
            if(betting < creditCounting){
                bet.text(betting += 10);
                bet.text(bet.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));
            } 
        }
    })
//bet +10 when you press the N key
    $(document).keydown(function(e){  
        switch(e.which){
            case 78:
                if(runGame){
                    if(betting < creditCounting){
                        bet.text(betting += 10);
                        bet.text(bet.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));
                    } 
                }
        }
    })

//button that spins the reels and runs the main game functions
    $('#spin').on('click', function(){
        if(runGame && play){
            if(creditCounting > 0 && betting > 0){
                beginGame();
//resets paid, jackpot, && rows, columns, and diagnals && removes winning celebration && makes ability to spin again stop until ready for the next bet 
                jackpot.text(0);
                paid.text(0); 
                row1 = 0; row2 = 0; row3 = 0; col1 = 0; col2 = 0; col3 = 0; diag1 = 0; diag2 = 0;
                gamePics();
                rolling()            
                reelConts[0].removeClass('winLight');
                reelConts[1].removeClass('winLight');
                reelConts[2].removeClass('winLight');
                reelConts[3].removeClass('winLight');
                reelConts[4].removeClass('winLight');
                reelConts[5].removeClass('winLight');
                reelConts[6].removeClass('winLight');
                reelConts[7].removeClass('winLight');
                reelConts[8].removeClass('winLight');
                runGame = false;
            }  
        }   
    });

//Spin function that works when you press ENTER key
    $(document).keydown(function(e){
        switch (e.which){
            case 13:
                if(runGame && play){
                    if(creditCounting > 0 && betting > 0){
                        beginGame();
//resets paid, jackpot, && rows, columns, and diagnals && removes winning celebration && makes ability to spin again stop until ready for the next bet 
                        jackpot.text(0);
                        paid.text(0); 
                        row1 = 0; row2 = 0; row3 = 0; col1 = 0; col2 = 0; col3 = 0; diag1 = 0; diag2 = 0;
                        gamePics();
                        rolling()            
                        reelConts[0].removeClass('winLight');
                        reelConts[1].removeClass('winLight');
                        reelConts[2].removeClass('winLight');
                        reelConts[3].removeClass('winLight');
                        reelConts[4].removeClass('winLight');
                        reelConts[5].removeClass('winLight');
                        reelConts[6].removeClass('winLight');
                        reelConts[7].removeClass('winLight');
                        reelConts[8].removeClass('winLight');
                        runGame = false;
                    }  
                }
        }   
    });

//==================Game Functions===================//

//random number function to pick through array of main pics
    function rand() {
        let num = Math.floor(Math.random() * 16);
        return num;
    } 
    
//function that chooses the pics at random with the rand() function
    function gamePics(){
        for(i = 0; i < reels.length; i++){
            $(reels[i]).attr('src', pics[rand()])
        }
    }

//random number function 2 for the percentage winnings
    function rand2() {
        let num = Math.ceil(Math.random() * 10);
        return num;
    } 
//Array of pics for the chance to win when you dont win
    const pics2 = ['slot_images/cherrys.png', 'slot_images/watermellon.png', 'slot_images/grapes.png'];
    const pics3 = ['slot_images/horseShoe.png', 'slot_images/clover.png', 'slot_images/heart.png'];
//random number function 3 to choose the pics that are selected in the percentage winnings
    function rand3() {
        let num = Math.floor(Math.random() * 3);
        return num;
    }

//function animates through images simulating reels rolling
    function rolling(){
        reels[0,1,2,3,4,5,6,7,8].hide();//hides reel images while animation occurs
//reel1 = top left image
        reelConts[0].addClass('rollReels1');
        reelConts[0].delay(1000).show(0, function(){
            reelConts[0].removeClass('rollReels1');
        })
        reels[0].hide().delay(1000).show(0);
//reel2 = top middle image
        reelConts[1].addClass('rollReels2'); 
        reelConts[1].delay(1200).show(0, function(){
            reelConts[1].removeClass('rollReels2');
        })
        reels[1].hide().delay(1200).show(0);
//reel3 = top right image
        reelConts[2].addClass('rollReels3'); 
        reelConts[2].delay(1400).show(0, function(){
            reelConts[2].removeClass('rollReels3');
        })
        reels[2].hide().delay(1400).show(0);
//reel4 = middle left image
        reelConts[3].addClass('rollReels4'); 
        reelConts[3].delay(1800).show(0, function(){
            reelConts[3].removeClass('rollReels4');
        })
        reels[3].hide().delay(1800).show(0);
//reel5 = middle middle image
        reelConts[4].addClass('rollReels5'); 
        reelConts[4].delay(2000).show(0, function(){
            reelConts[4].removeClass('rollReels5');
        })
        reels[4].hide().delay(2000).show(0);
//reel6 = middle right image
        reelConts[5].addClass('rollReels6'); 
        reelConts[5].delay(2200).show(0, function(){
            reelConts[5].removeClass('rollReels6');
        })
        reels[5].hide().delay(2200).show(0);
//reel7 = bottom left image
        reelConts[6].addClass('rollReels7'); 
        reelConts[6].delay(2400).show(0, function(){
            reelConts[6].removeClass('rollReels7');
        })
        reels[6].hide().delay(2400).show(0);
//reel8 = bottom middle image
        reelConts[7].addClass('rollReels8'); 
        reelConts[7].delay(2800).show(0, function(){
            reelConts[7].removeClass('rollReels8');
        })
        reels[7].hide().delay(2800).show(0);
//reel9 = bottom right image
//After image runs through its animation then the other game functions run the rest of the game
        reelConts[8].addClass('rollReels9');
        reelConts[8].delay(3000).show(0, function(){
            reelConts[8].removeClass('rollReels9');
            rcdCompare();
            calculation();
        })
        reels[8].hide().delay(3000).show(0);
    };

//variables for the compare function and the main game function
    let winner;//to compare pics with the switch statement
    let winnings;//the outcome of the comparison

// compares the images and gives them values to be used in the main game function
    function compare(){
        switch (winner) {
// winner gets three of any fruit that is the same as itself in line, bet multiplied by 3 && added to credits
            case pics[0]:
            case pics[1]:
            case pics[2]:
            case pics[3]:
            case pics[4]:
            case pics[5]: 
            case pics[6]:             
                winnings = betting * 3;
                smallWin();
                break;
// winner gets three bell || clover || heart || horshoe in line bet multiplied by 5 && added to credits         
            case pics[7]:
            case pics[8]:
            case pics[9]:
            case pics[10]:
                winnings = betting * 5;
                smallWin();
                break;
// winner gets three coins or diamonds in line, bet multiplied by 7 && added to credits
            case pics[11]:   
            case pics[12]:
                winnings = betting * 7;
                smallWin();
                break;
// winner gets three bars || question in line, small jackpot, bet multiplied by 10 && jackpot celebration && gets added to credits
            case pics[13]:
            case pics[14]:
                winnings = betting * 10;
                smallWin();
                break;
// winner gets three 7s in line, big jackpot, bet multiplied by 15, && jackpot celebration && gets added to credits
            case pics[15]:
                winnings = betting * 15;
                jackpot.text(winnings);
                jackpot.text(jackpot.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));//Jackpot Numbers get run through ajax to insert commas if needed
                $('#winModal').modal({backdrop: 'static'});
                if(affectSound){
                   bigWin(); 
                }
                break;  
        }        
    }
    

//the loop that compares all rows, columns, and diagnals. and sets them up for results of comparisons 
    function rcdCompare(){   
        pics.forEach(function(j){
//row1 scenarios of winning
            if(j === reels[0].attr('src') && j === reels[1].attr('src') && j === reels[2].attr('src')){
                winner = j;
                compare();
                row1 = winnings;
                reelConts[0].addClass('winLight');
                reelConts[1].addClass('winLight');
                reelConts[2].addClass('winLight');
            }
    //row1 conditional statement if there is a wild in play
            else if(pics[14] === reels[0].attr('src') && j === reels[1].attr('src') && j === reels[2].attr('src') || j === reels[0].attr('src') && pics[14] === reels[1].attr('src') && j === reels[2].attr('src') || j === reels[0].attr('src') && j === reels[1].attr('src') && pics[14] === reels[2].attr('src')){
                winner = j;
                compare();
                row1 = winnings;
                reelConts[0].addClass('winLight');
                reelConts[1].addClass('winLight');
                reelConts[2].addClass('winLight');
            }
                
//row2 scenarios of winning        
            if(j === reels[3].attr('src') && j === reels[4].attr('src') && j === reels[5].attr('src')){
                winner = j;               
                compare();               
                row2 = winnings; 
                reelConts[3].addClass('winLight');
                reelConts[4].addClass('winLight');
                reelConts[5].addClass('winLight');
            }
    //row2 conditional statement if there is a wild in play
            else if(pics[14] === reels[3].attr('src') && j === reels[4].attr('src') && j === reels[5].attr('src') || j === reels[3].attr('src') && pics[14] === reels[4].attr('src') && j === reels[5].attr('src') || j === reels[3].attr('src') && j === reels[4].attr('src') && pics[14] === reels[5].attr('src')){
                winner = j;
                compare();
                row2 = winnings;
                reelConts[3].addClass('winLight');
                reelConts[4].addClass('winLight');
                reelConts[5].addClass('winLight');
            }

//row3 scenarios of winning
            if(j === reels[6].attr('src') && j === reels[7].attr('src') && j === reels[8].attr('src')){
                winner = j;               
                compare();               
                row3 = winnings;  
                reelConts[6].addClass('winLight');
                reelConts[7].addClass('winLight');
                reelConts[8].addClass('winLight');             
            }
    //row3 conditional statement if there is a wild in play
            else if(pics[14] === reels[6].attr('src') && j === reels[7].attr('src') && j === reels[8].attr('src') || j === reels[6].attr('src') && pics[14] === reels[7].attr('src') && j === reels[8].attr('src') || j === reels[6].attr('src') && j === reels[7].attr('src') && pics[14] === reels[8].attr('src')){
                winner = j;
                compare();
                row3 = winnings;
                reelConts[6].addClass('winLight');
                reelConts[7].addClass('winLight');
                reelConts[8].addClass('winLight');
            }

//col1 scenarios of winning
            if(j === reels[0].attr('src') && j === reels[3].attr('src') && j === reels[6].attr('src')){
                winner = j;               
                compare();               
                col1 = winnings;
                reelConts[0].addClass('winLight');
                reelConts[3].addClass('winLight');
                reelConts[6].addClass('winLight');
            }
    //col1 conditional statement if there is a wild in play
            else if(pics[14] === reels[0].attr('src') && j === reels[3].attr('src') && j === reels[6].attr('src') || j === reels[0].attr('src') && pics[14] === reels[3].attr('src') && j === reels[6].attr('src') || j === reels[0].attr('src') && j === reels[3].attr('src') && pics[14] === reels[6].attr('src')){
                winner = j;
                compare();
                col1 = winnings;
                reelConts[0].addClass('winLight');
                reelConts[3].addClass('winLight');
                reelConts[6].addClass('winLight');
            }

//col2 scenarios of winning
            if(j === reels[1].attr('src') && j === reels[4].attr('src') && j === reels[7].attr('src')){
                winner = j;               
                compare();               
                col2 = winnings;
                reelConts[1].addClass('winLight');
                reelConts[4].addClass('winLight');
                reelConts[7].addClass('winLight');
            }
    //col2 conditional statement if there is a wild in play
            else if(pics[14] === reels[1].attr('src') && j === reels[4].attr('src') && j === reels[7].attr('src') || j === reels[1].attr('src') && pics[14] === reels[4].attr('src') && j === reels[7].attr('src') || j === reels[1].attr('src') && j === reels[4].attr('src') && pics[14] === reels[7].attr('src')){
                winner = j;
                compare();
                col2 = winnings;
                reelConts[1].addClass('winLight');
                reelConts[4].addClass('winLight');
                reelConts[7].addClass('winLight');
            }

//col3 scenarios of winning
            if(j === reels[2].attr('src') && j === reels[5].attr('src') && j === reels[8].attr('src')){
                winner = j;              
                compare();               
                col3 = winnings;  
                reelConts[2].addClass('winLight');
                reelConts[5].addClass('winLight');
                reelConts[8].addClass('winLight');             
            }
    //col3 conditional statement if there is a wild in play
            else if(pics[14] === reels[2].attr('src') && j === reels[5].attr('src') && j === reels[8].attr('src') || j === reels[2].attr('src') && pics[14] === reels[5].attr('src') && j === reels[8].attr('src') || j === reels[2].attr('src') && j === reels[5].attr('src') && pics[14] === reels[8].attr('src')){
                winner = j;
                compare();
                col3 = winnings;
                reelConts[2].addClass('winLight');
                reelConts[5].addClass('winLight');
                reelConts[8].addClass('winLight');
            }

//diag1 scenarios of winning
            if(j === reels[0].attr('src') && j === reels[4].attr('src') && j === reels[8].attr('src')){
                winner = j;
                compare();
                diag1 = winnings;
                reelConts[0].addClass('winLight');
                reelConts[4].addClass('winLight');
                reelConts[8].addClass('winLight');
            }
    //diag1 conditional statement if there is a wild in play
            else if(pics[14] === reels[0].attr('src') && j === reels[4].attr('src') && j === reels[8].attr('src') || j === reels[0].attr('src') && pics[14] === reels[4].attr('src') && j === reels[8].attr('src') || j === reels[0].attr('src') && j === reels[4].attr('src') && pics[14] === reels[8].attr('src')){
                winner = j;
                compare();
                diag1 = winnings;
                reelConts[0].addClass('winLight');
                reelConts[4].addClass('winLight');
                reelConts[8].addClass('winLight');
            }

//diag2 scenarios of winning
            if(j === reels[2].attr('src') && j === reels[4].attr('src') && j === reels[6].attr('src')){
                winner = j;                
                compare();               
                diag2 = winnings;
                reelConts[2].addClass('winLight');
                reelConts[4].addClass('winLight');
                reelConts[6].addClass('winLight');              
            }
    //diag2 conditional statement if there is a wild in play
            else if(pics[14] === reels[2].attr('src') && j === reels[4].attr('src') && j === reels[6].attr('src') || j === reels[2].attr('src') && pics[14] === reels[4].attr('src') && j === reels[6].attr('src') || j === reels[2].attr('src') && j === reels[4].attr('src') && pics[14] === reels[6].attr('src')){
                winner = j;
                compare();
                diag2 = winnings;
                reelConts[2].addClass('winLight');
                reelConts[4].addClass('winLight');
                reelConts[6].addClass('winLight');
            } 
        });//End of forEach loop 

//Statement that allows the player to win at least 30 percent of the time if they do not get a match and are below 250 credits       
        let percentage = rand2();
//Smaller winning
        if(creditCounting < 250){
            if(winnings === 0){
                if(percentage === 1 || percentage === 4){
                    let helper = rand3();
    //Changes the pics so that they are winners
                    $(reels[3]).attr('src', pics2[helper]);
                    $(reels[4]).attr('src', pics2[helper]);
                    $(reels[5]).attr('src', pics2[helper]);
    //Adds winning celebration and the beginning of the calculation
                    reelConts[3].addClass('winLight');
                    reelConts[4].addClass('winLight');
                    reelConts[5].addClass('winLight');
                    row2 = betting * 3;
                    smallWin();
                }
//Bigger winning            
                else if(percentage === 8){
                    let helper2 = rand3();
                    $(reels[2]).attr('src', pics3[helper2]);
                    $(reels[4]).attr('src', pics3[helper2]);
                    $(reels[6]).attr('src', pics3[helper2]);
                    reelConts[2].addClass('winLight');
                    reelConts[4].addClass('winLight');
                    reelConts[6].addClass('winLight');
                    diag2 = betting * 5;
                    smallWin();
                }
            }
        }
    };    

//resets the the bets and adds the results to be displayed on the page
    function calculation(){
        if(betting > 0) {
            creditCounting = creditCounting - betting;//subtracts the bets placed from credits before calculations are made
            credits.text(creditCounting);//puts the creditCounting number onto the credits on the screen
            creditCounting = creditCounting + row1 + row2 + row3 + col1 + col2 + col3 + diag1 + diag2;
            paidCounting = row1 + row2 + row3 + col1 + col2 + col3 + diag1 + diag2;
        }else{
            paid.text(0);
            jackpot.text(0);
        }
         
//Resets and inserting commas into numbers then putting them on the screen
        winnings = 0;
        betting = 0;
        bet.text(0);     
        runGame = true;
        paid.text(paidCounting);
        credits.text(creditCounting);
        credits.text(credits.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));
        paid.text(paid.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));

//If you lose all your credits then this modal pops up         
        if(credits.text() == 0){
            $('#loseModal').modal({backdrop: 'static'});
            if(affectSound){
               loseAll.play(); 
            }
        }
    }; 

//The cheat to automatically when a jackpot after you make a bet
    $(document).keydown(function(e){
        switch (e.which){
            case 82:
            if(runGame && play){
                if(creditCounting > 0 && betting > 0){
                    winnings = betting * 15;
                    creditCounting = creditCounting - betting;
                    creditCounting = creditCounting + winnings;
                    credits.text(creditCounting);
                    credits.text(credits.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));//Credits Numbers get run through ajax to insert commas if needed
                    paid.text(winnings);
                    paid.text(paid.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));//Paid Numbers get run through ajax to insert commas if needed
                    jackpot.text(winnings);
                    jackpot.text(jackpot.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&,'));//Jackpot Numbers get run through ajax to insert commas if needed
            //Changes row2 to sevens
                    reels[3].attr('src', 'slot_images/seven.png');
                    reels[4].attr('src', 'slot_images/seven.png');
                    reels[5].attr('src', 'slot_images/seven.png');
            //Adds the winning sounds and animations
                    reelConts[3].addClass('winLight');
                    reelConts[4].addClass('winLight');
                    reelConts[5].addClass('winLight');
            //Jackpot Modal and the winning sound        
                    $('#winModal').modal({backdrop: 'static'});
                    bigWin(); 
                }
            }
        }
    })
})