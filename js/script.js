

var deck = [];
var placeInDeck = 0;
var bankroll = 500;
var bet = 0;
var prevBet = 0;
// IS A GAME BEING PLAYED
var won = false;
var draw = false;
var playing = false;
// AMOUNT OF CARDS FOR PLAYER
var playerTotalCards = 2;
var dealerTotalCards = 2;
// ARRAY FOR PLAYERS HANDS
var playerHand;
var dealerHand;
// IF PLAYER BUST BOOLEAN
var dealerBust = false;
var playerBust = false;
// IF PLAYER STANDS 
var playerStand = false;
// PLAYER TOTALS
var playerTotal = 0;
var dealerTotal = 0;
// SHORTCUTS FOR ELEMENT DIVS AND BUTTONS
var message = document.getElementById("message");
var buttons = document.getElementsByClassName("game-buttons");

// put cards in the deck array
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
		}
	}

	console.log(deck);
}

// randomize the deck array
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

// deal the starting hand 
function deal() {
	if (bet === 0) {
		message.innerHTML = "PLACE A BET!";
		return;
	} else if (bankroll <= 0) {
		message.innerHTML = "OUTTA MONEY!";
		return;
	}

	message.innerHTML = "";
	var deck = shuffleDeck();
	placeBet();
	playerHand = [ deck[0], deck[2] ];
	dealerHand = [ deck[1], deck[3] ];
	placeInDeck = 4;

	// place cards on the table using images
	placeCard(playerHand[0], 'player', 'one');
	placeCard(dealerHand[0], 'dealer', 'one');
	placeCard(playerHand[1], 'player', 'two');
	placeCard(dealerHand[1], 'dealer', 'two');

	if((playerTotal === 21) && (dealerTotal === 21)) {
		draw = true;
		checkWin();
		message.innerHTML = "IT'S A DRAW!";
		return;
	} else if(dealerTotal === 21) {
		checkWin();
		message.innerHTML = "DEALER HAS BLACKJACK!";
		return;
	} else if(playerTotal === 21) {
		won = true;
		checkWin();
		message.innerHTML = "BLACKJACK! YOU WIN!!";
		return;
	}
	
	// remove deal & clear bet button
	disableAllBtns();

	// show hit & stand button
	document.getElementById('hit-button').classList.remove("hidden");
	document.getElementById('hit-button').classList.add('active');
	document.getElementById('stand-button').classList.remove('hidden');
	document.getElementById('stand-button').classList.add('active');	

	// document
}

// calculate the total of a users hand
function calculateTotal(hand, player) {
	var total = 0;
	var AcesCount = 0;
	// get the valuel of each element in the user's hand array
	for(i=0;i < hand.length;i++) {
		// slice the letter of the array element
		var cardValue = hand[i].slice(0, hand[i].indexOf("<"));

		// check if card value is a face card or ace and set value
		if(isNaN(cardValue)){
			if(cardValue == 'A') {
				cardValue = 11;
				AcesCount++;
			} else {
				cardValue = 10;
			}
		}

		// make sure card value is number and add it to total
		cardValue = Number(cardValue);
		total += cardValue;

		// handle aces being 1 or 11
		while((AcesCount > 0) && (total > 21)){
			AcesCount--;
			total -= 10;
		}

	}

	var user = player + "-total";
	document.getElementById(user).innerHTML = total;

	// checkWin();

	return total;
}

// place the card on the screen
function placeCard(card, player, slot) {
	var currId = player + "-card-" + slot;
	var element = document.getElementById(currId);

	// place card in html element
	element.classList.remove("empty")
	element.innerHTML = card;

	// calc dealer total and check if they busted
	dealerTotal = calculateTotal(dealerHand, 'dealer');
	dealerBust = bust(dealerTotal);

	// calc player total and check if they busted
	playerTotal = calculateTotal(playerHand, 'player');
	playerBust = bust(playerTotal);

	checkWin();
}

// give player a new card
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

	// place card in players hand
	playerHand.push(deck[placeInDeck]);
	// place card on table for user to see
	placeCard(deck[placeInDeck],'player',slot);

	// increment players total #of cards & location in the deck
	playerTotalCards++;
	placeInDeck++;

	// calculate players total
	// calculateTotal(playerHand, 'player');
}

// check if a total is over 21
function bust(total) {
	if(total > 21) {
		// checkWin();
		return true;
	} else {
		return false;
	}
	// if(player) {
	// 	document.getElementById('message').innerHTML = "You have busted!  Better luck next time!";
	// } else {
	// 	document.getElementById('message').innerHTML = "The dealer busted!  You win!";
	// }
}

// automate dealer hand 
function stand() {
	// var dealerTotal = calculateTotal(dealerHand, 'dealer');
	// var playerTotal = calculateTotal(playerHand, 'player');
	var slot;
	

	while(dealerTotal <= 17) {
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

		// put card in dealer hand
		dealerHand.push(deck[placeInDeck]);
		// place card on board for user
		placeCard(deck[placeInDeck], 'dealer', slot);

		// increment place in deck and dealer cards
		placeInDeck++;
		dealerTotalCards++;
	}

	playerStand = true;
	checkWin();
	// Dealer has more than 17 
}

// check if someone won
function checkWin() {
	// If the player or the dealer has not busted 
	var gameOver = false;

	if(playerBust){
		message.innerHTML = "BUSTED!! YOU LOST!"
		gameOver = true;
	} else if(dealerBust) {
		message.innerHTML = "YOU WIN!! DEALER BUSTED"
		won = true;
		gameOver = true;
	} else {
		while(playerStand) {
			if (playerTotal > dealerTotal) {
				message.innerHTML = "YOU WIN! You have " + playerTotal + " and the dealer has " + dealerTotal;
				won = true;
			} else if (playerTotal === dealerTotal) {
				message.innerHTML = "IT'S A DRAW!"
				draw = true;
			} else {
				message.innerHTML = "YOU LOST! You have " + playerTotal + " and the dealer has " + dealerTotal;
			}
			gameOver = true;	
			playerStand = false;
		}
	}

	if(playerTotal === 21 || dealerTotal === 21){
		gameOver = true;
	}

	if(draw) {
		bankroll += bet;
		document.getElementById('bankroll').innerHTML = bankroll;
	} else if(won){
		bankroll += bet * 2;
		document.getElementById('bankroll').innerHTML = bankroll;
	}

	if(gameOver){
		disableAllBtns();
		document.getElementById('rebet-button').classList.remove('hidden');
		document.getElementById('rebet-button').classList.add('active');
		document.getElementById('new-hand-button').classList.remove('hidden');
		document.getElementById('new-hand-button').classList.add('active');
	}

	draw = false;
	won = false;
}

function disableAllBtns() {
	for(i = 0;i < buttons.length;i++){
			buttons[i].classList.remove('active');
			buttons[i].classList.add('hidden');
	}
}
////////////////////////////
// betting functions

// add bet to total bet being placed
function betValue(chipValue) {
	if(playing) {
		return;
	}
	if((bet + chipValue) <= bankroll) {
		bet += chipValue;
	}
	document.getElementById("total-bet").innerHTML = bet;
}

// place a bet
function placeBet() {
	playing = true;
	prevBet = bet;
	bankroll -= bet;
	document.getElementById("bankroll").innerHTML = bankroll
}

// rebet the previous bet
function rebet() {
	// playing = false;
	reset();
	bet = prevBet;
	document.getElementById("total-bet").innerHTML = bet;

}
// clear the bet
function clearBet() {
	bet = 0;
	document.getElementById("total-bet").innerHTML = bet;
}
// reset game function
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
    bet = 0;
	playerTotalCards = 2;
	dealerTotalCards = 2;
	playerHand = [];
	dealerHand = [];
	dealerBust = false;
	playerBust = false;
	document.getElementById('message').innerHTML = "Lets Play!";
	
	var cards = document.getElementsByClassName('card');

	for(i = 0;i < cards.length; i++){
		cards[i].classList.add("empty")
		cards[i].innerHTML = ""
	}

	// reset player totals
	document.getElementById('player-total').innerHTML = 0;
	document.getElementById('dealer-total').innerHTML = 0;
	document.getElementById('total-bet').innerHTML = bet;
	
	// reset playing buttons 
	disableAllBtns();
	document.getElementById('draw-button').classList.remove('hidden');
	document.getElementById('draw-button').classList.add('active');
	document.getElementById('rebet-button').classList.remove('hidden');
	document.getElementById('rebet-button').classList.add('active');
	document.getElementById('clear-bet-button').classList.remove('hidden');
	document.getElementById('clear-bet-button').classList.add('active');

	// for(i = 0;i < buttons.length;i++){
	// 	buttons[i].disabled = false;
	// }
	playing = false;
	playerStand = false;
}