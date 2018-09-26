class Card {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
    }
}
let deck;
let playerHandCount, computerHandCount;
let computerScore, playerScore;
let hitListener, stayListener;
let doneDealing, gameOver, computerDone;
let playerContainsAce, computerContainsAce;
let cScore, pScore;
let width = 73, height = 98;
let dealButton, hitButton, stayButton, winStatus;

function makeDeck()
{
    deck = [];
    for(let i = 0; i < 13; i++){
        for(let j = 0; j < 4; j++){
            let playCard = new Card(i, j);
            deck.push(playCard);
            console.log(playCard);
        }
    }
    return deck;
}

function shuffleDeck(deck)
{
    for(let i = 0; i < deck.length; i++){
        let randomNum = Math.floor(Math.random() * i);
        for(let j = 0; j < randomNum; j++){
            let t = deck[i];
            deck[i] = deck[j];
            deck[j] = t;
        }
    }
}

function createCardDiv(card, hand){
    let div = document.createElement("DIV")
    div.setAttribute("class", "card");
    div.style.backgroundImage = "url(cards.jpg)";
    div.style.backgroundPosition = "-" + width * card.value + "px " +  "-" + height * card.suit + "px";
    let playHand = document.getElementById(hand.id);
    playHand.appendChild(div);
}

function getCardValue(card, hand){
    let cardVal;
    if(card.value >= 10){
        cardVal = 10;
    }
    else if(card.value === 0){
        if(hand.id === "player-cards") {
            playerContainsAce++;
            cardVal = 11;
        }
        else if(hand.id === 'computer-cards'){
            computerContainsAce++;
            cardVal = 11;
        }
    }
    else{
        cardVal = card.value;
        cardVal++;
    }
    if(hand.id === "player-cards" && playerContainsAce > 0) {
        if(playerScore + cardVal > 21) {
            if(card.value === 0){
                cardVal = 1;
            }
            else {
                cardVal = -10 + card.value;
                cardVal++;
            }
            playerContainsAce   --;
        }
    }
    if(hand.id === "computer-cards" && computerContainsAce > 0) {
        if(computerScore + cardVal > 21) {
            if(card.value === 0){
                cardVal = 1;
            }
            else {
                cardVal = -10 + card.value;
                cardVal++;
            }
            computerContainsAce--;
        }
    }
    return cardVal;
}

function checkBlackJackWinner(){
    pScore.innerHTML = playerScore;
    cScore.innerHTML = computerScore;

    if(doneDealing || playerHandCount >= 4 || playerScore >= 21){
        if(computerScore <= 17 || computerHandCount < 5) {
            document.getElementById('stay').click();
            computerDone = true;
        }
    }

    if(playerScore === 21){
        gameOver = true;
        pScore.innerHTML = " BlackJack!!!!!";
        winStatus.innerHTML = "Player Wins";
    }
    if(computerScore === 21){
        gameOver = true;
        cScore.innerHTML = " BlackJack!!!!";
        winStatus.innerHTML = "Player Loses";
    }

    if(computerScore > 21){
        gameOver = true;
        cScore.innerHTML = " Bust!";
        winStatus.innerHTML = "Player Wins";
    }

    if(playerScore > 21){
        gameOver = true;
        pScore.innerHTML = " Bust!";
        winStatus.innerHTML = "Player Loses";
    }

    else if(computerScore < 21 && playerScore < 21 && doneDealing){
        if(computerScore >= playerScore){
            winStatus.innerHTML = "House Wins";
            gameOver = true;
        }
        else{
            winStatus.innerHTML = "Player Wins";
            gameOver = true;
        }
    }
    if(gameOver){
        stayButton.disabled = true;
        dealButton.disabled = false;
    }
}

function drawComputerListener(hand){
    doneDealing = true;
    hitButton.disabled = true;
    if(computerDone){
        while(computerScore <= 17 && computerHandCount <= 4){
            drawComputer(hand);
        }
    }
    else {
        drawComputer(hand);
    }
}

function drawComputer(hand){
    computerHandCount = hand.childNodes.length;
    if (computerHandCount <= 4 || computerScore < 17) {
        if(computerScore > 17){
            computerDone = true;
        }
        let card = deck.pop();
        computerScore += getCardValue(card, hand);
        createCardDiv(card, hand);
        checkBlackJackWinner();
    }
    computerHandCount = hand.childNodes.length;
}

function drawPlayerListener(hand){
    drawPlayer(hand);
}
function drawPlayer(hand){
    playerHandCount = hand.childNodes.length;
    if ((playerHandCount <= 4 || playerScore < 21) && !doneDealing){
        let card = deck.pop();
        playerScore += getCardValue(card, hand);;
        createCardDiv(card, hand);
        if(hand.childNodes.length >= 5){
            hitButton.disabled = true;
        }
        checkBlackJackWinner();
    }
    playerHandCount = hand.childNodes.length;
}

function resetGame(){
    let hand = document.getElementById('player-cards');
    let computerHand = document.getElementById('computer-cards');
    computerHand.innerHTML = "";
    hand.innerHTML = "";
    doneDealing = false;

    let winStatus = document.getElementById('status');
    winStatus.innerHTML = "";
    cScore.innerHTML = computerScore;
    pScore.innerHTML = playerScore;
    playerScore = 0;
    playerHandCount = 0;
    computerHandCount = 0;
    computerScore = 0;
    gameOver = false;
    playerContainsAce = false;
    computerContainsAce = false;
    stayButton.disabled = false;
    hitButton.disabled = false;
    dealButton.disabled = true;
}


function deal()
{
    let playerHand = document.getElementById('player-cards');
    let computerHand = document.getElementById('computer-cards');
    resetGame();
    makeDeck();
    shuffleDeck(deck);
    for (let i = 0; i < 2; i++) {
        drawPlayer(playerHand);
    }
    drawComputer(computerHand);
    computerDone = true;

    let winStatus = document.getElementById('status');
    winStatus.innerHTML = "";
    checkBlackJackWinner();

}

function start(){
    cScore = document.getElementById('computer-score');
    pScore = document.getElementById('player-score');
    dealButton = document.getElementById('deal');
    hitButton = document.getElementById('hit');
    stayButton = document.getElementById('stay');
    winStatus = document.getElementById('status');

    let playerHand = document.getElementById('player-cards');
    let computerHand = document.getElementById('computer-cards');
    hitListener = function(){
        drawPlayerListener(playerHand);
    };
    hitButton.addEventListener('click', function(){
        drawPlayer(playerHand)
    });

    stayListener = function(){
        drawComputerListener(computerHand);
    };
    stayButton.addEventListener('click', stayListener);

    dealButton.addEventListener('click', deal);

    deal();
}
window.addEventListener("load", start);