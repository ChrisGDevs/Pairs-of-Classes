(function(){
	//array that holds the objects with src and id 1 - 8
	var images = [];

	//image for every match
	var matchSign = document.querySelector("#match");

	//game over image
	var modal = document.querySelector("#gameOver");

	//array that holds the flippedCards
	var flippedCards = [];

	//match counter, at 8 it's game over
	var matches = 0;

	//image structure for the cards
	for(var i = 0; i < 16; i++){
		//creates a object img with a src and id
		var img = {
			src: "img/" + i + ".png",
			id: i%8
		};

		//inserts the created object into the array
		images.push(img);
	}

	//calls the start game function
	startGame();

	//function to start the game
	function startGame(){
		//clears array flippedCards
		flippedCards = [];

		//clears match counter
		matches = 0;

		//shuffles the image's array
		images = randomSort(images);

		//lists divs with back and front classes
		var backFaces = document.getElementsByClassName("back");
		var frontFaces = document.getElementsByClassName("front");

		//cards positioning and adding the click event
		for(var i = 0; i < 16; i++){
			//clears flippedCards
			backFaces[i].classList.remove("match","flipped");
			frontFaces[i].classList.remove("match","flipped");

			//position of the cards on the table
			var card = document.querySelector("#card" + i);
			card.style.left = (i % 8) === 0 ? 5 + "px" : 5 + ((i % 8) * 180) + "px";
			card.style.top = i/8 >= 1 ? 259 + "px" : 5 + "px";

			//adds click event to flip the cards
			card.addEventListener("click",flipCard,false);

			//adds images to the cards
			frontFaces[i].style.background = "url('" + images[i].src + "')";
			frontFaces[i].setAttribute("id",images[i].id);
		}

		//throws the game over image to the background
		modal.style.zIndex = "-2";

		//removes click event of the game over image
		modal.removeEventListener('click',function(){
			startGame();
		},false);
	}//ends startGame function


	//function to flip the cards
	function flipCard(){
		//verify if the flippedCards are less than 2
		if(flippedCards.length < 2){
			//picks the clicked cards faces
			var faces = this.getElementsByClassName("face");

			//verify if the card is already flipped, stopping it from being flipped 2 times
			if(faces[0].classList[2]){
				return;
			}

			//adds the class flipped to the faces so it can be flipped
			faces[0].classList.toggle("flipped");
			faces[1].classList.toggle("flipped");

			//adds flipped card to the flippedCards array
			flippedCards.push(this);

			//verify if the number of flipped cards on the array is equal to 2
			if(flippedCards.length === 2){
				//compares the flippedCards id to see if they are a match
				if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
					//in case of match adds class match to every face of the 2 cards on the flippedCards array
					flippedCards[0].childNodes[1].classList.toggle("match");
					flippedCards[0].childNodes[3].classList.toggle("match");
					flippedCards[1].childNodes[1].classList.toggle("match");
					flippedCards[1].childNodes[3].classList.toggle("match");

					//calls the function to show MATCH message
					matchCardsSign();

					//clears array flippedCards
					flippedCards = [];

					//adds to the match counter
					matches++;

					//verify if the match counter reached 8
					if(matches >= 8){
						//caso haja 8 acertos, chama a função que finaliza o jogo
						//if there are 8 matches, calls gameOver function
						gameOver();
					}
				}
			}
		} else {
			//in case 2 cards are on the flippedCards array, on the third click removes the flipped class of the cards on flippedCards array
			flippedCards[0].childNodes[1].classList.toggle("flipped");
			flippedCards[0].childNodes[3].classList.toggle("flipped");
			flippedCards[1].childNodes[1].classList.toggle("flipped");
			flippedCards[1].childNodes[3].classList.toggle("flipped");

			//clears flipped cards array
			flippedCards = [];
		}
	}


	//function that shuffles the cards receiving an array of cards per parameter
	function randomSort(array){
		//criates an empty array
		var newArray = [];

		//executes the structure while the new array doesn't reach the same number of elements from the old array
		while(newArray.length !== array.length){
			//creates a variable i receiving a random number between 0 and the number of elements on array -1
			var i = Math.floor(Math.random()*array.length);

			//verify if the pointed element i already exists on the new array
			if(newArray.indexOf(array[i]) < 0){
				//if it doesn't exist, it's inserted
				newArray.push(array[i]);
			}
		}

		//returns the new array, that has the elements of the old array with shuffled parameters
		return newArray;
	}//ends function to shuffle cards


	//function to generate the MATCH signal
	function matchCardsSign(){
		//throws the MATCH message to the front
		matchSign.style.zIndex = "1";

		//makes the message transparent
		matchSign.style.opacity = "0";

		//moves the message up
		matchSign.style.top = "100px";

		//function executed after 1.5 seconds
		setTimeout(function(){
			//thows the message back to the background
			matchSign.style.zIndex = "-1";

			//removes image transparency
			matchSign.style.opacity = "1";

			//moves message on screen
			matchSign.style.top = "150px";
		},1500);
	}//ends function to show match message

	//function to end the game
	function gameOver(){
		//throws game over message to the front
		modal.style.zIndex = "99";

		//adds click event to the game over
		modal.addEventListener('click',function(){
			//chama a função que reinicia o jogo
			//restarts by callyng a new game
			startGame();
		},false);
	}
}());
