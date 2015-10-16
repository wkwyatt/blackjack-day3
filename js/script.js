// TODO:check if card value is a face card or ace and set value
// TODO: set deck function
// TODO: If the player or the dealer has not busted check to see who has the higher value
// TODO: reset game function

var deck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var playerHand;
var dealerHand;
var dealerBust = false;
var playerBust = false;

function setDeck(){
	var suit;
	for(s = 1;s <= 4;s++) {
		if(s === 1) {
			// suit = "H";
			// hearts suit
			suit = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRnoX6Anc9Yz80CPF8mbBun9QgYiCzJ52yckKTPZLriDxiO7CUz">';
		} else if(s === 2) {
			// suit = "S";
			// spades suit
			suit = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQb67elR6XlBtqYoxI55eFZu9t78COJeEPX71Wm2Y_Pb8w4x19">';
		} else if(s === 3) {
			// suit = "D";
			// diamonds suit
			suit = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgqOmctz_qmRiH4VB_19djpmvaUeEtyGWBei_aZM1TlgQeju0K">';
		} else if(s === 4) {
			// suit = "C";
			// clubs suit
			suit = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRP6Mgkux8OzT1mfIt-hV0jvhYX9xpA9I1V-rJzXonNnjxquIEfJQ">';
		}
		for(i = 1;i <= 13; i++){
			switch (true) {
				case (i === 1):
					deck.push("A"+suit)
				break;
				case ((i > 1) && (i < 11)):
					deck.push(i+suit);
				break;
				case ((i >= 11) && (i <=13)):
					switch(i) {
						case 11:
							deck.push("J"+suit);
							break;
						case 12:
							deck.push("Q"+suit);
							break;
						case 13:
							deck.push("K"+suit);
							break;
					}
				break;
				default:
					alert("Error out of deck array index!");
					break;
			}
			// deck.push(i+suit);
		}
	}

	console.log(deck);
}

function shuffleDeck() {
	// set deck function
	setDeck();

	var numberOfTimesToShuffle = Math.floor(Math.random() * 500 + 500);
	// Shuffle the deck
	for(i = 0;i < numberOfTimesToShuffle;i++) {
		// Pick 2 random cards in the deck and switch them
		var card1 = Math.floor(Math.random() * 52);
		var card2 = Math.floor(Math.random() * 52);

		var temp = deck[card2];
		deck[card2] = deck[card1];
		deck[card1] = temp;
	}	
	console.log(deck);

	// return deck array
	return deck;
}

function deal() {
	var deck = shuffleDeck();
	playerHand = [ deck[0], deck[2] ];
	dealerHand = [ deck[1], deck[3] ];
	placeInDeck = 4;

	// place cards on the table using images
	placeCard(playerHand[0], 'player', 'one');
	placeCard(dealerHand[0], 'dealer', 'one');
	placeCard(playerHand[1], 'player', 'two');
	placeCard(dealerHand[1], 'dealer', 'two');

	calculateTotal(playerHand, 'player');
	calculateTotal(dealerHand, 'dealer');

	document.getElementById('draw-button').disabled = true;
}

function calculateTotal(hand, player) {
	var total = 0;
	// get the valuel of each element in the user's hand array
	for(i=0;i < hand.length;i++) {
		// slice the letter of the array element
		var cardValue = hand[i].slice(0, -1);

		// TODO:check if card value is a face card or ace and set value

		cardValue = Number(cardValue);
		total += cardValue;
	}

	var user = player + "-total";
	document.getElementById(user).innerHTML = total;

	// check for bust 
	if(total > 21) {
		bust(player);
	} 
	return total;
}

function placeCard(card, player, slot) {
	var currId = player + "-card-" + slot;
	var element = document.getElementById(currId);

	element.className = "card";
	element.innerHTML = card;
}

function hit() {
	// set the slot label based from the total number of players cards
	var slot;
	switch (playerTotalCards) {
		case 2: 
			slot = "three";
		break;
		case 3:
			slot = "four";
		break;
		case 4:
			slot = "five";
		break;
		case 5:
			slot = "six";
		break;
	}

	// place next card in deck
	placeCard(deck[placeInDeck],'player',slot);
	playerHand.push(deck[placeInDeck]);
	// increment players total #of cards & location in the deck
	playerTotalCards++;
	placeInDeck++;

	// calculate players total
	calculateTotal(playerHand, 'player');
}

function bust(player) {
	if(player) {
		document.getElementById('message').innerHTML = "You have busted!  Better luck next time!";
	} else {
		document.getElementById('message').innerHTML = "The dealer busted!  You win!";
	}
}

function blackJack(player) {
	if(player === 'player') {
		document.getElementById('message').innerHTML = "BLACKJACK! YOU WIN!";
	} else {
		document.getElementById('message').innerHTML = "The dealer has BLACKJACK! YOU LOST!";
	}
}

function stand() {
	var dealerTotal = calculateTotal(dealerHand, 'dealer');
	var playerTotal = calculateTotal(playerHand, 'player');
	var slot;
	while((dealerTotal < playerTotal) && (dealerTotal < 21)) {
		switch (dealerTotalCards) {
			case 2: 
				slot = "three";
			break;
			case 3:
				slot = "four";
			break;
			case 4:
				slot = "five";
			break;
			case 5:
				slot = "six";
			break;
		}

		placeCard(deck[placeInDeck], 'dealer', slot);
		dealerHand.push(deck[placeInDeck]);
		placeInDeck++;
		dealerTotalCards++;
		dealerTotal = calculateTotal(dealerHand, 'dealer');
	}
	// Dealer has more than 17 

	// check who won
	checkWin();
}

function checkWin() {
	// TODO: If the player or the dealer has not busted 
	// check to see who has the higher value
	var dealerTotal = calculateTotal(dealerHand, 'dealer');
	var playerTotal = calculateTotal(playerHand, 'player');
	var winner;


	if (((playerTotal > dealerTotal) && (playerTotal < 21)) || ((dealerTotal > 21) && (playerTotal < 21))) {
		playerBust = true;
	} else {
		if(playerTotal > dealerTotal) {
			document.getElementById('message').innerHTML = "YOU WIN! You have " + playerTotal + " and the dealer has " + dealerTotal;
		} else {
			document.getElementById('message').innerHTML = "YOU LOST! You have " + dealerTotal + " and the dealer has " + playerTotal;
		}
	}
}

// TODO: reset game function
function reset() {
    //empty the deck
    //reset the place in the deck
    //reset the players total cards
    //reset the dealers total cards
    //reset the players hand array
    //reset the dealers hand array
    //reset the message
    //reset all the cards (divs and the empty class)

    deck = [];
    placeInDeck = 0;
	playerTotalCards = 2;
	dealerTotalCards = 2;
	playerHand = [];
	dealerHand = [];
	dealerBust = false;
	playerBust = false;
	document.getElementById('message').innerHTML = "Play Again!";
	
	var cards = document.getElementsByClassName('card');

	for(i = 0;i < cards.length; i++){
		cards[i].className = cards[i].className + " empty";
		cards[i].innerHTML = ""
	}

	document.getElementById('player-total').innerHTML = 0;
	document.getElementById('dealer-total').innerHTML = 0;
	document.getElementById('draw-button').disabled = false;

}