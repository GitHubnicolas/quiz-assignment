
//Defining variables and referencing the ids from the html file
var startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var questionContainerElement = document.getElementById("question-container")
var questionElement = document.getElementById("question")
var answerButtonsElement = document.getElementById("answer-buttons")

var scoreCard = document.getElementById("score-card")

//Setting the shuffledQuestions variable to shuffle through the questions array to select the next question at random
//currentQuestionIndex variable will be used so that the program knows which question from the array of questions the user is on
var shuffledQuestions, currentQuestionIndex

//Adding an event listener to the startButton variable, when the user clicks the start button the program runs the code inside startGame
startButton.addEventListener("click", startGame)
//console.log("Started")

//Adding an even listener to the next button, so that when it is clicked the next question is displayed for the user to view
nextButton.addEventListener("click", () => {
//Taking the current question index and adding one to it, because we are incrementing by one to move on to the next question    
  currentQuestionIndex++
//Calling setNextQuestion to set the next question after the user clicks on the Next button  
  setNextQuestion()
})

//Function to start the game, defines what happens when the user clicks the start button
function startGame() {
//This is to hide the Start button after the user clicks start and is taken to the first question
  startButton.classList.add("hide")
//This is used to randomly select the next question from the array of questions  
  shuffledQuestions = questions.sort(() => Math.random() - .5)
//This is to start on the first question of the shuffled questions array
  currentQuestionIndex = 0
  questionContainerElement.classList.remove("hide")
  setNextQuestion()
}

//Function to bring up the next question, when the user clicks the next button
function setNextQuestion() {
//This is so that the answers from the previous questions are cleared out - setting to default state every time the program displays a new question
  resetState()
//This takes the currentQuestion from the shuffledQuestions  
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

//This takes a question to display to the user from the questions array
function showQuestion(question) {

//questionElement references "questions" by id - takes the inner text from the questions array    
  questionElement.innerText = question.question

//This is to loop through the questions answers, forEach is to get a single answer for each one of the loops inside this function
  question.answers.forEach(answer => {
//Here we are creating a button for each answer, createElement is used to create the button element      
    const button = document.createElement("button")
//This is to populate the button elements with the answer text from the questions/answers array    
    button.innerText = answer.text
//This is adding the button class from the html file    
    button.classList.add("btn")
//Here we are checking if the answer is correct
    if (answer.correct) {
//If the answer is correct .dataset adds a data attribute onto the button element - here we are adding an attribute of correct - this will make it easier to check if the answer is correct        
      button.dataset.correct = answer.correct
    }
//Adding an even listener to this button - this event listener is ties to the selectAnswer function - this is going to the take in the selectAnswer event as a paramenter
    button.addEventListener("click", selectAnswer)
//Adding the event listener to the answerButtonsElement we are appending the button variable that is created here     
    answerButtonsElement.appendChild(button)
  })
}

//This is a function to reset the state of every new question to only contain the answers for the set question and not carry over the answers from the previous question
function resetState() {
//This is to clear the class for the next question, so that the background color and button colors don't carry over into the next question    
  clearStatusClass(document.body)

//Here we are hiding the next button when the new question with the new set of answers appears  - when the user clicks on an answer, we show the next button, but when the new question comes up we want to hide the next button
  nextButton.classList.add("hide")

//Here we are looping therough the children - if there is a child in the answer buttons element we want to remove it   
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

//Function defining what happens when the user selects an answer
function selectAnswer(e) {
//Creating a variable for the selected button, this is button that has been clicked on by the user to select an answer - the e.target is from the selectAnswer(e), this is what the user has clicked on
  var selectedButton = e.target

//Creating a variable here to check if the answer button that was clicked on, is the correct answer
  var correct = selectedButton.dataset.correct

//Setting the status class of the body checking if it should be set to correct or wrong
  setStatusClass(document.body, correct)
//This is to loop through all the other answer buttons that were not clicked on and select and set the class for them, turning this into an array because (answerButtonsElement.children) is returning a live collection which is technically not an Array. We need to convert it to an array so that we can use it with the .forEach loop
//forEach(button => creating a function that sets the status for them using setStatusClass - this takes the button and checks the button.dataset - because we want to set the status based on if the correct answer was chosen 
Array.from(answerButtonsElement.children).forEach(button => { 
    setStatusClass(button, button.dataset.correct)
  })
//This is to check if there are any more questions available to ask the user, we are checking if currentQuestionIndex.length is greater then currentQuestionIndex +1, essentially checking that we are not on the last question
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
//If the user is not on the last question the next button is to be show
    nextButton.classList.remove("hide")   
  } else {
//If the user is on the last question the inner text of the Start button is to turn into "Restart"    
    startButton.innerText = "Restart"
//If the user is on the last question the Start button with the innext text changed to "Restart" is to be shown to the user
    startButton.classList.remove("hide")
  }
}

//This is function used to determin if the user clicked on the correct or wrong answer
function setStatusClass(element, correct) {

//This is to first clear any status that it already has
  clearStatusClass(element)

//If the answer that is clicked on is correct the "correct" class is added onto it
  if (correct) {
    element.classList.add("correct")

//If the answer that is clicked on is correct the "wrong" class is added onto it    
  } else {
    element.classList.add("wrong")
  }

  //scoreCard.innerHTML = this.questions.length+"/"+this.score;
}

//This is to clear the or remove the classes from the element 
function clearStatusClass(element) {
  element.classList.remove("correct")
  element.classList.remove("wrong")
}

//List of questions with answers that is used for the quiz, it is set up as an array so that the program can circle through the different question
const questions = [
  {
    question: "Commonly used data types DO NOT include:",
//The answers are also set up as an array inside every question that is part of the questions array    
    answers: [
      { text: "Alerts", correct: true },
      { text: "Strings", correct: false },
      { text: "Booleans", correct: false },
      { text: "Numbers", correct: false }
    ]
  },
  {
    question: "The condition in an if / else statement is enclosed within _____." ,
    answers: [
      { text: "Quotes", correct: false },
      { text: "Curly Brackets", correct: false },
      { text: "Parentheses", correct: true },
      { text: "Square Brackets", correct: false }
    ]
  },
  {
    question: "Arrays in JavaScript can be used to store _____.",
    answers: [
      { text: "Numbers and String", correct: false },
      { text: "All", correct: true },
      { text: "Other Arrays", correct: false },
      { text: "Booleans", correct: false }
    ]
  },

  {
    question: "String value must be enslosed within _____ when being assigned to variables.",
    answers: [
      { text: "Commas", correct: false },
      { text: "Quotes", correct: true },
      { text: "Curly Brackets", correct: false },
      { text: "Prantheses", correct: false }
    ]
  },

  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "For Loops", correct: false },
      { text: 'Apples', correct: false },
      { text: "Console Log", correct: true }
    ]
  }
]


//ATTEMPT 1

// This is a questions array with all the questionsss for the quiz

// var questions = [
// {
//   prompt: "Commonly used data types DO NOT include:\n(a) String\n(b) Boolean\n(c) Alerts\n(d) Number",
//    answer: "c" 
// },
// {
//     prompt: "The condition in an if / else statement is enclosed within _____.:\n(a) Quotes\n(b) Curly Brackets \n(c) Parentheses\n(d) Square Brackets",
//      answer: "c" 
// },
// {
//     prompt: "Arrays in JavaScript can be used to store _____.:\n(a) Numbers and Strings\n(b) Other Arrays\n(c) Booleans\n(d) All of the above",
//      answer: "d" 
//   },
//   {
//     prompt: "String value must be enslosed within _____ when being assigned to variables.:\n(a) Commas\n(b) Curly Brackets\n(c) Quotes\n(d) Prantheses",
//      answer: "c" 
//   },
//   {
//     prompt: "A very useful tool used during development and debugging for printing content to the debugger is:\n(a) JavaScript\n(b) For Loops\n(c) Alerts\n(d) Console Log",
//      answer: "d" 
//   },

// ]

// //How many questions the user got correct
// var score = 0;

// for (var i=0; i < questions.length; i++){
//  var response = window.prompt(questionsss[i].prompt)
//  if (response == questions[i].answer){

//     score++;
//     alert("Correct!");
//  } else {
// alert ("incorrect :(");
//  }
// } 

// alert("you got" + score +"/" + questionsss.length);



//questions

//Coding Quiz Challenge
//Try to answer the following code-related questionsss with the time limit. Keep in mind that incorrect answers will penalize your score time by 10 seconds!
//Start Quiz

//Commonly used data types DO NOT include:
//1.String 
//2.Boolean
//3.Alerts - correct
//4.Number

//The condition in an if / else statement is enclosed within _____.
//1.Quotes
//2.Curly Brackets 
//3.Parentheses - correct
//4.Square Brackets 


//Arrays in JavaScript can be used to store _____.
//1.Numbers and Strings
//2.Other Arrays
//3.Booleans
//4.All of the above - correct

//String value must be enslosed within _____ when being assigned to variables.
//1.Commas
//2.Curly Brackets
//3.Quotes - correct
//4.Prantheses 

//A very useful tool used during development and debugging for printing content to the debugger is:
//1.JavaScript
//2.Terminal
//3.For Loops
//4.Console Log - correct 