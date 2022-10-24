// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

var timer = 0;
var questionsRight = 0;
var score = 0;
var name ="";
var scoreList = [
    {
        "name": "",
        "score": 0,
    }
];
var testBox = document.querySelector(".test");
var qBox = document.querySelector(".question");
var aBox = document.querySelector(".answer");
var countDown = document.querySelector(".countDown");
var showScore = document.querySelector(".showScore");

var quiz = [
    {
        "question": "How many years ago was the axe beleived to invented?",
        "answers": ["1.76m y/o", "300,000 y/o", "49,000 y/o", "3.3m y/o"],
        "answer": "1.76m y/o",

    },
    {
        "question": "Where is the worlds largest axe?",
        "answers": ["Shanghai, China", "Helsinki, Finland", "Philadelphia, USA", "New Brunswick, Canada"],
        "answer": "New Brunswick, Canada",

    },
    {
        "question": "Who is the oldest Axe Murderer?",
        "answers": ["Clementine Barnabet", "Elifasi Msomi", "Axeman of New Orleans", "Raymonde Jouhanno"],
        "answer": "Clementine Barnabet",

    },
    {
        "question": "Who is the first known serial killer?",
        "answers": ["Dennis Rader", "H.H. Holmes", "Sam Little", "Belle Gunness"],
        "answer": "H.H. Holmes",

    },
    {
        "question": "Which Word exists because of double axes?",
        "answers": ["labyrinth", "cleave", "axel", "crescent"],
        "answer": "labyrinth",

    },
    {
        "question": "",
        "answers": ["hurlbat", "nzappa zap", "hail mary", "all of the above"],
        "answer": "all of the above",

    },
]

console.log({ quiz });
console.log(scoreList.name);

function getHighScore() {
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores === null) {
        console.log("no data");
    } else {
        scoreList = storedScores;
    }
}

function setHighScore(name, score) {
    let newScore = {
        "name": name,
        "score": score,
    }
    scoreList.push(newScore);
    let sortedScores = scoreList.sort((c1, c2) => (c1.score < c2.score) ? 1 : (c1.score > c2.score) ? -1 : 0);
console.log(sortedScores);
    localStorage.setItem("highScores", JSON.stringify(scoreList));

}


console.log(scoreList);
getHighScore()

name = "billy";
score = 60;
setHighScore(name, score);
getHighScore()
name = "donny";
score = 70;
setHighScore(name, score);
getHighScore()
name = "joey";
score = 80;
setHighScore(name, score);
getHighScore()
console.log(scoreList);



// `get the variables off the page || gethighscore()

// `create object  question-answers-answer
// `write quiz

//  onclick button game init ||

// set timer()

// isRight() check answer function && display feedback

// testOver() check timerout || test completed

// testResult() display score enter initial

// store score local vairables ()

// display high scores ()

//return to quiz or restart quiz ()

