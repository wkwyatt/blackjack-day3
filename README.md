# BlackJack Game
<!-- [Live Demo](wkwyatt.com/blackjack/) -->

## Summary
Javascript blackjack game displaying basic Javascript, HTML, and CSS skills:

## Screenshots
![](https://github.com/wkwyatt/blackjack-day3/blob/gh-readme/gh-readme/game.png)
![](https://github.com/wkwyatt/blackjack-day3/blob/gh-readme/gh-readme/main.png)

##### Array manipulation
```javascript
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
	// return deck array
	return deck;
}
```

##### Conditionals & Dynamically Updating the Browser
```javascript
	if(playerBust){
		message.innerHTML = "BUSTED!! YOU LOST!"
		gameOver = true;
	} else if(dealerBust) {
		message.innerHTML = "YOU WIN!! DEALER BUSTED"
		won = true;
		gameOver = true;
	} else {
		while(playerStand) {
		...
		}
	}
```

##### Custom CSS Styling
```css
.chip {
		display: inline-block;
		width: 50px;
		height: 50px;
		color: white;
		border-radius: 200%;
		border:4px dashed black;
		/*background-color: white;*/
		line-height: 300%;
		vertical-align: middle;
}	
	.chip .inner-chip  {
			border:1px solid black;
			border-radius: 200%;
	}
```

## Existing Features
* User & Computer can bust out
* BlackJack wins when drawn
* Wagering system
* Game reset 

## Next Step
* Make the game persistant so that users can leave the site and when they return keep the same gameplay balance
* Animate card shuffle and deal


