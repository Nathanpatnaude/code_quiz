var timer;
var timerCount;
var feedBackTimer = 0;
var questionsRight = 0;
var testing = false;
var currentQuestion = 0;
var score = 0;
var name = "";
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
var answerList = document.querySelector("#answerList");
var feedBack = document.querySelector(".feedBack");

var quiz = [
    {
        "question": "Asking axe academic actions aquiescence.",
        "answers": ["Click to Start"],
        "answer": "Click to Start",

    },
    {
        "question": "How many years ago was the axe believed to invented?",
        "answers": ["1.76m y/o", "300,000 y/o", "49,000 y/o", "3.3m y/o"],
        "answer": "1.76m y/o",

    },
    {
        "question": "Where is the worlds largest axe?",
        "answers": ["Shanghai, China", "Helsinki, Finland", "Philadelphia, USA", "New Brunswick, Canada"],
        "answer": "New Brunswick, Canada",

    },
    {
        "question": "Who is the oldest axe murderer?",
        "answers": ["Clementine Barnabet", "Elifasi Msomi", "Axeman of New Orleans", "Raymonde Jouhanno"],
        "answer": "Clementine Barnabet",

    },
    {
        "question": "Who is the first known serial killer?",
        "answers": ["Dennis Rader", "H.H. Holmes", "Sam Little", "Belle Gunness"],
        "answer": "H.H. Holmes",

    },
    {
        "question": "Which word exists because of double axes?",
        "answers": ["labyrinth", "cleave", "axel", "crescent"],
        "answer": "labyrinth",

    },
    {
        "question": "Which of these is actually an axe?",
        "answers": ["hurlbat", "nzappa zap", "adze", "all of the above"],
        "answer": "all of the above",

    },
]



function getHighScore() {
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores === null) {
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
    localStorage.setItem("highScores", JSON.stringify(scoreList));

}

function startTimer() {
    testing = true
    timer = setInterval(function () {
        timerCount--;
        countDown.textContent = timerCount;
        if (timerCount >= 0) {
            if (currentQuestion === quiz.length) {
                clearInterval(timer);
                quizOver();
            }
            if (feedBackTimer > 0) {
                feedBackTimer--;
            } else {
                feedBack.textContent = "";
            }

        }
        if (timerCount <= 0) {
            currentQuestion = quiz.length;
            clearInterval(timer);
            quizOver();
        }
    }, 1000);
}

function quizOver() {
    var totalQ = quiz.length - 1;
    var excactScore = questionsRight / totalQ;
    totalQ = excactScore * 100;
    feedBack.textContent = "";
    score = Math.round(totalQ);
    qBox.textContent = "You scored: " + score + "/100. Please enter your intitials:";
    answerList.innerHTML = "";
    var hsform = document.createElement("form");
    hsform.setAttribute("method", "post");
    hsform.setAttribute("action", "submit.php");
    var FN = document.createElement("input");
    FN.setAttribute("type", "text");
    FN.setAttribute("name", "FullName");
    FN.setAttribute("placeholder", "Full Name");
    FN.setAttribute("id", "initials");
    var s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    hsform.appendChild(FN);
    hsform.appendChild(s);
    answerList.appendChild(hsform);
    testing = false

}

function resetQuiz() {
    timer = 0;
    questionsRight = 0;
    testing = false;
    currentQuestion = 0;
    score = 0;
}

function displayQuestion() {
    qBox.textContent = quiz[currentQuestion].question;
    answerList.innerHTML = "";
    for (var i = 0; i < quiz[currentQuestion].answers.length; i++) {
        var ans = quiz[currentQuestion].answers[i];

        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = ans;
        button.setAttribute("id", ans);
        button.setAttribute("class", "ans");
        li.appendChild(button);
        answerList.appendChild(li);

    }
}

function displayHighScore() {
    qBox.textContent = "High Scores:";
    getHighScore();
    answerList.innerHTML = "";
    for (var i = 0; i < scoreList.length; i++) {

        if (i === scoreList.length - 1) {
            var li = document.createElement("li");
            var goBack = document.createElement("button");
            goBack.textContent = "Go back";
            goBack.setAttribute("id", "goBack");
            var clearList = document.createElement("button");
            clearList.textContent = "Clear Highscores";
            clearList.setAttribute("id", "clear");
            li.appendChild(goBack);
            li.appendChild(clearList);
            answerList.appendChild(li);
            if (!testing) {
                resetQuiz();
            }
            clearList.addEventListener("click", resetScores);
            goBack.addEventListener("click", displayQuestion);
        } else {
            var li = document.createElement("li");
            li.textContent = i + 1 + ": " + scoreList[i].name + " - " + scoreList[i].score;
            answerList.appendChild(li);
        }
    }
}


function resetScores() {
    scoreList = [
        {
            "name": "",
            "score": 0,
        }];
    localStorage.setItem("highScores", JSON.stringify(scoreList));
    displayHighScore();

}
showScore.addEventListener("click", displayHighScore);

testBox.addEventListener("click", function (event) {
    var choice = event.target;
    var options = choice.getAttribute("class");
    var id = choice.getAttribute("id");
    if (choice.matches("button") === true && options === "ans") {
        
        if (id === quiz[currentQuestion].answer) {
            if (currentQuestion > 0) {
                questionsRight++;
                feedBack.textContent = "Correct!";
                feedBackTimer = 1;
            } else {
                timerCount = 60;
                startTimer();
            }
        } else if (currentQuestion > 0) {
            feedBackTimer = 1;
            timerCount -= 10;
            feedBack.textContent = "Wrong!";
        } else {
            currentQuestion = quiz.length - 1;
            quizOver();
        }
        currentQuestion++

        if (currentQuestion < quiz.length && timerCount > 0) {
            displayQuestion();
        }
        else {
            quizOver()

        }
    }
});

testBox.addEventListener("submit", function (event) {
    event.preventDefault();
    var input = document.querySelector("#initials");
    var inputText = input.value.trim();
    setHighScore(inputText, score);
    displayHighScore();

});
getHighScore();
displayQuestion();



