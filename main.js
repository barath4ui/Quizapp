"use strict";

(function(){

//step 0:
console.log("Step 0: Js Started!");
document.getElementById("btnStart").onclick = function(){startFun()};

//step 1:
function startFun(){
    console.log("Step 1: Quiz app Started.");
    document.getElementById("startQuiz").classList.add("d-none");
    document.getElementById("listQuiz").classList.add("d-block");
    document.getElementById("question_0").classList.add("d-block");
    startTimer();
}


//step 2:
var ts = document.getElementById("timespent");
function startTimer() {

  //Variables Declarations
  console.log("Step 2: Timer Started.");
  let min, sec, totalSeconds = 0;

  //Setinterval
  setInterval(setTime, 1000);
  
  //Set time
  function setTime() {
    ++totalSeconds;
    sec= addZero(totalSeconds % 60);
    min= addZero(parseInt(totalSeconds / 60));
  
    
    ts.value = `${min}:${sec}`;
  }
  
  //Add Zero
  function addZero(val) {
    var tcal = val + "";
    if (tcal.length < 2) {
      return "0" + tcal;
    }
    else {
      return tcal;
    }
  }
  
}



//step 3:let x =0;
document.getElementById("btnNext").addEventListener("click", nextQuiz);
let x =0;

//next btn
function nextQuiz(){
  x += 1;  
  
  if(x < myQuestions.length){

    console.log("Step 3: Btn cliked - "+ x);

    //Clicked Radio Function Call
    getAns(x);
    document.getElementById("currentPage").innerHTML = ""+(x+1);
    document.getElementById("question_"+(x-1)).classList.remove("d-block"); 
    document.getElementById("question_"+x).classList.add("d-block"); 


  }
  else{
    console.log("step 5: Success fully completed!");
    ansCheck();
    document.getElementById("listQuiz").classList.remove("d-block");
    document.getElementById("quizResults").classList.add("d-block"); 
  }
  
}

const ansFinal = document.getElementById("ans-final");
var finalAns = [];

//Display Radio
function getAns(x){
  let rad = document.getElementsByName("question"+(x-1));
  for(let i = 0; i < rad.length; i++) { 
    if(rad[i].checked) {
      console.log("step 4: Ans - "+rad[i].value);
      finalAns.push(rad[i].value);
      ansFinal.innerHTML = finalAns.join('');
    }
  } 
}


var ansCounts =0;
//Answer
function ansCheck(){
  console.log("step 6: ansChecked!");
  
  for(let i = 0; i < finalAns.length; i++){
      if (myQuestions[i].correctAnswer == finalAns[i])
      {
        ansCounts+=1;
        console.log("ANS: Right" + ansCounts);
        
      }
      else{
        console.log("ANS: Wrong");
      }
  }

  console.log("ANS: Total Counts -" +ansCounts);
  document.getElementById("finalAnscounts").innerHTML = ansCounts;
  document.getElementById("ans-final").innerHTML = (ansCounts*100/myQuestions.length)+"%";
  document.getElementById("time-taken").innerHTML = ts.value;
  
  var tips = document.getElementById("ans-tips");
  
  //Answer Tips
  switch (ansCounts){
    case 1:
      tips.innerHTML = 'Your score 20%. Failed in C grade.';
      tips.classList.add("red");
      break;
    case 2:
      tips.innerHTML = 'Your score 40%. Passed in B grade';
      tips.classList.add("green");
      break;
    case 3:
      tips.innerHTML = 'Your score 60%. Passed in A grade';
      tips.classList.add("green");
      break;
    case 4:
      tips.innerHTML = 'Your score 80%. Passed in A+ grade';
      tips.classList.add("green");
      break;
    case 5:
      tips.innerHTML = 'Your score 100%. Passed in A++ grade';
      tips.classList.add("green");
      break;
    default:
      tips.innerHTML = 'Sorry, your are not answering.';
      tips.classList.add("red");
  }

}

document.getElementById("tryAgain").onclick = function(){restart()};
var loads = document.getElementById("loading");


function restart(){
  loads.classList.add("d-block"); 
  setInterval(restartSec, 500);

  //Set time
  function restartSec() {
    
    location.reload();
  }
  
}



// Base works - Questions  creations

const quizContainer = document.getElementById("Quiz");
const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS"

      },
      correctAnswer: "b"
    },
    {
      question: "What does HTML stand for?",
      answers: {
        a: "Hyperlinks and Text Markup Language",
        b: "Hyper Text Markup Language",
        c: "Home Tool Markup Language"

      },
      correctAnswer: "a"
    },
    {
      question: "Who is making the Web standards?",
      answers: {
        a: "The World Wide Web Consortium",
        b: "Microsoft",
        c: "Google"

      },
      correctAnswer: "a"
    }
  ];

const output = [];

  myQuestions.forEach(
      (currentQuestion,questionNumber) => {
       
        const answers = [];

        for(let letter in currentQuestion.answers){
            // ...add an HTML radio button
            answers.push(
              `<label class="answer-label">
                <input type="radio" name="question${questionNumber}" value="${letter}" >
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );

          }

        output.push(
            `<div id="question_${questionNumber}" class="questionWrap d-none">
            <div class="question">${currentQuestion.question}</div>
            <div id="answers_${questionNumber}" class="answers">${answers.join('')}</div></div>`
          );
      }); 

      quizContainer.innerHTML = output.join('');

      

})();