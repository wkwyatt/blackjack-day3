var deck = [];

function deal() {
	// var deck = [];
	var suit;
	for(s = 1;s <= 4;s++) {
		if(s === 1) {
			suit = "H";
		} else if(s === 2) {
			suit = "S";
		} else if(s === 3) {
			suit = "D";
		} else if(s === 4) {
			suit = "C";
		}
		for(i = 1;i <= 13; i++){
			deck.push(i+suit);
		}
	}
	console.log(deck);

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

	// document.getElementById("dealer-first-card") = "deck[0].toString";
	// document.getElementsByClassName(".dealer .firstCard") = deck[0];
}

function hit() {

}

function stand() {

}