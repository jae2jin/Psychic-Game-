$(document).ready(function () {

  // start the game when user clicks on Start button
  $("#button").on("click", gameStart.startTime);
  console.log(gameStart.startTime);
});
// Need to make a variable to display the array of objects with the 
// question, answer bank, and the final correct answer
var triviaQuestions =
  [
    {
      question: "What is the biggest country in Asia?",
      answers: ["China", "Russia", "India"],
      correct: "Russia"
    },
    {
      question: "What Country is know for Sushi?",
      answers: ["Singapore", "Bahrain", "Japan"],
      correct: "Japan"
    },
    {
      question: "What dog from China is known to be one of the biggest and dangerous in the world?",
      answers: ["Tibetan Mastiff", "Kangal", "rottweiler"],
      correct: "Tibetan Mastif"
    },
    {
      question: "What is the most famous soup dish from Vietnam?",
      answers: ["Pho", "Tom Yum", "Ramen"],
      correct: "Pho"
    },
    {
      question: "What side dish is known to be a tradtional dish to eat with in Korea?",
      answers: ["Basil and Beansprouts", "Kimchi", "Pickles"],
      correct: "Kimchi"
    },
    {
      question: "Which country is known for a variety of teamed dumpling prepared in small, almost bite-sized portions? ",
      answers: ["Japan", "China", "Korea"],
      correct: "China"
    },
    {
      question: "Which Country is known for Samurais?",
      answers: ["Korea", "Cambodia", "Japan"],
      correct: "Japan"
    },
    {
      question: "Who was The Great Wall of China trying to prevent to enter?",
      answers: ["The Japanese", "The Mongols", "The Russians"],
      correct: "The Mongols"
    },
    {
      question: "Who was known as the greatest Emperor of Asia?",
      answers: ["Alexander The Great", "Genghis Khan", "The Hans"],
      correct: "Genghis Khan"
    },
    {
      question: "What Country did America dropped the Atomic Bomb on and ended World War 2?",
      answers: ["China", "Japan", "Vietnam"],
      correct: "Japan"
    }
  ]

// Make a variable to start game with the timer starting at 90
var gameStart = {
  timeRemaining: 90,

  // followed by creating a function to display the questions and remove the start button
  startTime: function () {
    $("button").remove();
    $("#time").text("Time remaining: " + gameStart.timeRemaining);
    setInterval(gameStart.countdown, 1000);
    $("#start").hide();
    trivia.displayQuestions();
  },

  // Make a function to stop the timer at 0
  countdown: function () {
    gameStart.timeRemaining--;
    $("#time").text("Time remaining: " + gameStart.timeRemaining);
    if (gameStart.timeRemaining === 0) {
      gameStart.stopTime();
      $("#time").empty();
    }
  },

  // stop the timer and check for final results of scores
  stopTime: function () {
    clearInterval();
    trivia.checkResults();
  },

  // hide the quetions and display the end page with results
  finalResults: function(numCorrect, numIncorrect, numSkipped) {
    $("#time").empty();
    $("#time").hide();
    $("#results").show();
    $("#questions").empty();
    $("#correctAnswers").text("Correct answers (Xiexie): " + numCorrect);
    $("#incorrectAnswers").text("Incorrect answers (You need to study more Young Grasshopper): " + numIncorrect);
    $("#skippedAnswers").text("Skipped questions (If you don't ever try you can never succeed): " + numSkipped);
  }
}

// create a functions to display the results and scores
var trivia = {

  displayQuestions: function () {
    var divQuestions = $("#questions");
    divQuestions.append('<h2>Answer the following questions:</h2>');
            
    for (var i = 0; i < triviaQuestions.length; i++) {

      divQuestions.append('<div id="question">' + triviaQuestions[i].question + '</div>');

      var answer1 = triviaQuestions[i].answers[0];
      var answer2 = triviaQuestions[i].answers[1];
      var answer3 = triviaQuestions[i].answers[2];

      divQuestions.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
      divQuestions.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
      divQuestions.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
    }

    // add a Done button to the end of the page and register its click handler
    var submitButton ='<button class="btn btn-primary btn-lg btn-block" id="submit-button" type="submit">Submit</button>';
    divQuestions.append(submitButton);
    $("#submit-button").on("click", gameStart.stopTime);
  },

  // Displaying the scores into three sections correct incorrect or skipped
  checkResults: function () {
    var numCorrect = 0;
    var numIncorrect = 0;
    var numSkipped = 0;
    var correctAnswer;
    var playerChoice;

    // Keep track of scores by adding to corrects answers or adding to skipped or incorrect answers
    for (var i = 0; i < triviaQuestions.length; i++) {
      correctAnswer = triviaQuestions[i].correct;
      playerChoice = $('input[id=radio' + i + ']:checked + label').text();

      if (playerChoice === correctAnswer) {
        numCorrect++;
      } else if (playerChoice === "") {
        numSkipped++;
      } else if (playerChoice !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }
    gameStart.finalResults(numCorrect, numIncorrect, numSkipped);
  },
}

