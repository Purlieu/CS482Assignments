class Card {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
    }
}
var deck, handCount;

function makeDeck()
{
    deck = [52];
    var hand = document.getElementById('cards');
    cards.innerHTML = "";
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 13; j++){
            let playCard = new Card(i, j);
            deck.push(playCard);
        }
    }
    return deck;
}

function shuffleDeck(deck)
{
    for(let i = 0; i < deck.length; i++){
        var randomNum = Math.floor(Math.random() * i);
        for(let j = 0; j < randomNum; j++){
            var t = deck[i];
            deck[i] = deck[j];
            deck[j] = t;
        }
    }
}

function createCardDiv(card)
{
    let div = document.createElement("DIV")
    div.setAttribute("class", "card");
    let img = document.createElement("IMG");
    let width = 73;
    let height = 98;
    img.style.backgroundImage = "url(cards.jpg)";
    img.style.backgroundPosition = -width * card.suit + "px " +  height * card.value + "px";
    img.width = width;
    img.height = height;
    div.appendChild(img);
    let playHand = document.getElementById('cards');
    playHand.appendChild(div);
}

function draw()
{
    var hitButton = document.getElementById('hit');
    hitButton.style.cursor = "pointer";
    hitButton.style.backgroundColor = "white";
    var hand = document.getElementById('cards');
    var count = hand.childNodes.length;
    console.log(count);
    if(count <= 4){
        var card = deck.pop();
        createCardDiv(card);
    }
    count = hand.childNodes.length;
    if(count == 5){
        hitButton.style.cursor = "not-allowed";
        hitButton.style.backgroundColor = "#eeeeee";
        var dealButton = document.getElementById('deal');
        dealButton.addEventListener('click', deal);
        dealButton.style.cursor = "auto";
        dealButton.style.backgroundColor = "white";
    }
    if(deck.length == 0){
        dealButton = document.getElementById('deal');
        dealButton.addEventListener('click', startup);
        dealButton.innerHTML = "Game Over";
        dealButton.style.cursor = "auto";
        dealButton.style.backgroundColor = "white";
        var hitButton = document.getElementById('hit');
        hitButton.style.cursor = "not-allowed";
        hitButton.style.backgroundColor = "#eeeeee";
        hitButton.removeEventListener('click', draw);
    }
}

function deal()
{
    var dealButton = document.getElementById('deal');
    dealButton.removeEventListener('click', deal);
    dealButton.style.cursor = "not-allowed";
    dealButton.style.backgroundColor = "#eeeeee";
    var hand = document.getElementById('cards');
    hand.innerHTML = "";
    console.log(deck);
    shuffleDeck(deck);
    if(deck.length > 0) {
        for (let i = 0; i < 3; i++) {
            draw();
        }
    }
    else{
        dealButton = document.getElementById('deal');
        dealButton.addEventListener('click', startup);
        dealButton.innerHTML = "Game Over";
        dealButton.style.cursor = "auto";
        dealButton.style.backgroundColor = "white";
        var hitButton = document.getElementById('hit');
        hitButton.style.cursor = "not-allowed";
        hitButton.style.backgroundColor = "#eeeeee";
        hitButton.removeEventListener('click', draw);

    }
}

function startup(){
    makeDeck();
    deal();
    var hit = document.getElementById('hit');

    hit.addEventListener('click', draw);
    var dealButton = document.getElementById('deal');
    dealButton.removeEventListener('click', startup);
    dealButton.innerHTML = "Deal";
    dealButton.style.cursor = "not-allowed";
    dealButton.style.backgroundColor = "#eeeeee";

}
window.addEventListener("load",startup);
