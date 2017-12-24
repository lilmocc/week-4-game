$(document).ready(function() {

// array of objects for each character
var characterList = [
     {
     name: "Ronald",
     img: "assets/images/0.jpg",
     hp: 250,
     attackPower: 7,
     counterAttack: 12
  },
     {
     name: "Barney",
     img: "assets/images/1.jpg",
     hp: 180,
     attackPower: 9,
     counterAttack: 15
  },
    {
     name: "Big Bird",
     img: "assets/images/2.jpg",
     hp: 300,
     attackPower: 8,
     counterAttack: 12
  },
    {
     name: "Kermit",
     img: "assets/images/3.jpg",
     hp: 220,
     attackPower: 4,
     counterAttack: 20
  }
];

var characters = []; // array to hold all character buttons
var wins = 0; // to track wins - 3 wins means game is complete; CAN'T GET THIS TO WORK!!!
var clickToChoosePlayer = 0; // makes sure "your character" is only chosen once

var currentPlayer;
var currentOpponent;
var currentPlayerHP;
var currentOpponentHP;

// create array of "character" buttons
for (var i = 0; i < characterList.length; i++) {
  characters += "<button type='button' data-hp='" + characterList[i].hp + "' data-attack='" + characterList[i].attackPower + "' data-counter='" + characterList[i].counterAttack + "' class='nametext characters character" + i + "'><p>" + characterList[i].name + "</p><img class='pics' src='" + characterList[i].img + "'><p class='nametext'>HP: <span class='hptext'>" + characterList[i].hp + "</span></p></button>";
  }

// push "character" buttons to HTML
$("#character-list").html(characters);

// on click function to select your player
$("body").on("click", ".characters", function() {
    if (clickToChoosePlayer === 0) {
    currentPlayer = $(this).removeClass("characters").attr("id", "your-character");
    otherCharacters = $(this).siblings().attr("id", "other-opponents");
    $("#message").html("");
    $("#your-character").append("Your Character:" + "<div>");
    $("#your-character").append(currentPlayer);
    $("#character-list").text("");
    $("#character-list").prepend("Now choose your first opponent!" + "<div>");
    $("#character-list").append(otherCharacters);
    var opponents = $(this).siblings('div').detach();
    clickToChoosePlayer++;
    console.log(currentPlayer);
  }
});

// on click function to select first opponent, and place button to start round
$("body").on("click", "#other-opponents", function() {
  if ($("#opponent-character").is(':empty')) {
    currentOpponent = $(this).removeClass("characters").attr("id", "opponent-character");
    otherCharacters = $(this).siblings().attr("id", "other-opponents");
    $("#opponent-character").append("Your Opponent:");
    $("#opponent-character").append(currentOpponent);
    $("#character-list").html("");
    $("#character-list").append("Other Opponents" + "<div>");
    $("#character-list").append(otherCharacters);
    var startButton = $("<input type='button' value='START FIGHTING!'/>").addClass("start-button");
    $("#attack-area").html("");
    $("#attack-area").append(startButton);
    $("#attack-area").append("Click START FIGHTING! to begin");

    var opponents = $(this).siblings('div').detach();
    console.log(currentOpponent);
    console.log(otherCharacters);
  }
});

// on click function to start game & first attack
$("body").on("click", ".start-button", function() {
    var startPlayerHP = $(currentPlayer).attr('data-hp');
    var playerAttack = $(currentPlayer).attr('data-attack');

    var startOpponentHP = $(currentOpponent).attr('data-hp');
    var opponentCounter = $(currentOpponent).attr('data-counter');

    currentAttack = (playerAttack * (Math.floor(Math.random() * 6) + 1));
    currentOpponentHP = startOpponentHP - currentAttack;
    $("#attack-message").html("You damaged your opponent by " + currentAttack + " HP!");

    currentCounter = (opponentCounter* (Math.floor(Math.random() * 2) + 1));
    currentPlayerHP = startPlayerHP - currentCounter
    $("#attack-message").append("<div>" + "Your opponent damaged you by " + currentCounter + " HP!");

    console.log("current player HP: " + currentPlayerHP);
    console.log("current opponent HP: " + currentOpponentHP);
    $("button#your-character span").text(currentPlayerHP);
    $("button#opponent-character span").text(currentOpponentHP);

    var attackButton = $("<input type='button' value='ATTACK!'/>").addClass("attack-button");
    $("#attack-area").html(attackButton);
    $("#attack-area").append("Click ATTACK! to attack your opponent");

    //on click function to continue attacking
    $("body").on("click", ".attack-button", function() {
        if (currentOpponentHP > 0 && currentPlayerHP > 0) {

        currentAttack = (playerAttack * (Math.floor(Math.random() * 6) + 1));
        currentOpponentHP = currentOpponentHP - currentAttack;
        $("#attack-message").text("You damaged your opponent by " + currentAttack + " HP!");

        currentCounter = (opponentCounter* (Math.floor(Math.random() * 2) + 1));
        currentPlayerHP = currentPlayerHP - currentCounter;
        $("#attack-message").append("<div>" + "Your opponent damaged you by " + currentCounter + " HP!");

        $("button#your-character span").text(currentPlayerHP);
        $("button#opponent-character span").text(currentOpponentHP);
        console.log("current player HP: " + currentPlayerHP);
        console.log("current opponent HP: " + currentOpponentHP);
      }

        if (currentPlayerHP > 0) {
            if (currentOpponentHP <= 0) {
                $("#attack-message").text("YOU WIN!");
                $("#opponent-character").empty();
                $("#attack-area").html("");
                $("#attack-area").append("CHOOSE YOUR NEXT OPPONENT!");
                $("button#your-character span").text(startPlayerHP);
                  wins++;
                  console.log("current number wins: " + wins);
                      if (wins >= 3) {
                          var restartButton = $("<input type='button' value='PLAY AGAIN!'/>").addClass("restart-button");
                          $("#attack-area").html("<div>" + "YOU'VE WON THE ENTIRE GAME!!!");
                          $("#attack-area").append(restartButton);
                          $("#attack-area").append("Click PLAY AGAIN! to start over");
                          $("#character-list").html("");
                        }
                }
          }
        else if (currentPlayerHP <= 0) {
            console.log("you lose");
            $("#attack-area").text("");
            $("#attack-message").text("YOU LOSE!");
                    console.log("current number wins: " + wins);

            var restartButton = $("<input type='button' value='PLAY AGAIN!'/>").addClass("restart-button");
            $("#attack-area").html(restartButton);
            $("#attack-area").append("Click PLAY AGAIN! to start over");
          }
        })
});

// on click function to restart game, when player loses
$("body").on("click", ".restart-button", function() {
      clickToChoosePlayer = 0;
      currentPlayerHP = 0;
      currentOpponentHP = 0;
      opponentCounter = 0;
      wins = 0;

     $(currentPlayer).empty();
     $(currentOpponent).empty();
     $("#character-list").empty();
     $("#your-character").empty();
     $("#opponent-character").empty();
     $("#other-opponents").empty();

     $("#attack-area").empty();
     $("#attack-message").empty();

     $("#character-list").html("<div>" + characters);
     $("#character-list").prepend("To start playing, choose your character!");
    });

})

// ********** //
// MISC NOTES //
// ********** //

// clicked character becomes "main player"
// other characters moved to "enemies array"

// on screen instructions will tell user to choose an opponent from the "enemies array"
// on click function will choose first enemy
    // clicked player becomes "current opponent" and moves to "defender area"
    // remaining enemies added to "other opponents" array; moved off to side of screen

// on screen instructions will tell user to click "start" button to start game
// on click function will start the game
    // attack button will:
        // reduce current opponent HP (randomized # deducted)
        // trigger counterattack by current opponent, to reduce user HP

// when current opponent's HP is reduced to 0 or less, current opponent disappears
// user can choose new opponent
    // reset user HP (?)

// if user loses all HP, game over
// if user defeats all opponents, WINS GAME

// NOTES:
// Each character in the game has 3 attributes (different for each character)
    // Health Points
    // Attack Power - each time player attacks, attack power increases by base attack power
    // Counter Attack Power - enemy only has counter attack power. DOES NOT CHANGE
