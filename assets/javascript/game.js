$(document).ready(function() {

var characterList = ["Ronald", "Barney", "Big Bird", "Kermit"];
var characterPic = ["assets/images/0.jpg", "assets/images/1.jpg", "assets/images/2.jpg", "assets/images/3.jpg"];
var characterHP = ["250", "150", "300", "200"];

var opponentList = [];
var chosenCharacter;

// create array of "character" buttons and push to HTML
for (var i = 0; i < characterList.length; i++) {
  var characters = $('<button>');
	var picture = $('<img>');
  picture.attr('src', characterPic[i]);
  picture.addClass('pics');
  picture.attr({'data-name': characterList[i]});
  picture.attr({'data-hp': characterHP[i]});
  var hp = $('<span>').addClass('hptext').html(picture.data('hp'));
  characters.append(characterList[i], picture, hp).addClass('nametext');
  $("#character-list").append(characters);

}

// on click function to allow user to choose their character
$("#character-list").on("click", function() {
  // var chosen = $(this);
  // if ("click" === true) {
  //   chosenCharacter.push(chosen)
  // }
  // else {
  //   opponentList.push;
  // $("#your-character").append(chosenCharacter);
});

    // clicked character becomes "main player"
    // other characters moved to "enemies array"

// on screen instructions will tell user to choose an opponent from the "enemies array"
// on click function will choose first enemy
    // clicked player becomes "current opponent" and moves to "defender area"
    // remaining enemies added to "other opponents" array; moved off to side of screen

// on screen instructions will tell user to click attack to start the game
// on click function will start the game
    // attack button will:
        // reduce current opponent HP (randomized # deducted)
        // trigger counterattack by current opponent, to reduce user HP

// when current opponent's HP is reduced to 0 or less, current oponent moves to "defender area"
// user can choose new opponent
    // reset user HP (?)

// if user loses all HP, game over
// if user defeats all opponents, WINS GAME

// NOTES:
// Each character in the game has 3 attributes (different for each character)
    // Health Points
    // Attack Power - each time player attacks, attack power increases by base attack power
    // Counter Attack Power - enemy only has counter attack power. DOES NOT CHANGE

  });
