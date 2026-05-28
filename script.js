const quizContainer = document.querySelector('.quiz-container');
const questionContainer = document.querySelector('.quiz-question');
const option1 = document.getElementById("option-1");
const option2 = document.getElementById("option-2");
const option3 = document.getElementById("option-3");
const option4 = document.getElementById("option-4");
const rightScoreContainer = document.getElementById("right-answer");
const wrongScoreContainer = document.getElementById("wrong-answer");

function renderQuestion(question){
    if(question === undefined){
        questionContainer.innerHTML = "End";
        option1.innerHTML = "";
        option2.innerHTML = "";
        option3.innerHTML = "";
        option4.innerHTML = "";
        return;
    }
    option1.style.backgroundColor = "";
    option2.style.backgroundColor = "";
    option3.style.backgroundColor = "";
    option4.style.backgroundColor = "";

    questionContainer.innerHTML = question.name;
    option1.innerHTML = question.options[0];
    option2.innerHTML = question.options[1];
    option3.innerHTML = question.options[2];
    option4.innerHTML = question.options[3];
}

const questionObject = (name , options , rightOption) =>{
    return {
    name,
    options,
    rightOption,
    };
}

let i = 0;
let isCurrentAnswered = false;
let rightScore = 0;
let wrongScore = 0;

const q1 = questionObject("What is a apple",["fruit","vegi","nothing","bogi"],"fruit");
const q2 = questionObject("Template",["1","2","3","4"],"2");

const questions = [q1,q2];


quizContainer.addEventListener("click",(e)=>{
    const clickedElement = e.target;
   
    if(clickedElement.tagName === "BUTTON"){

        const button = clickedElement;

         if(button.innerText != "start" && button.innerText != "next"){
           if(isCurrentAnswered){
            return;
            }};
   
        
        if(button.innerText === "start"){
            rightScore = 0;
            wrongScore = 0;
            renderScores("right",rightScore);
            renderScores("wrong",wrongScore);
            isCurrentAnswered = false;
            i = 0;
            renderQuestion(questions[0]);
            return;
        }

        if(button.innerText === "next"){
            if(isCurrentAnswered == false){
                wrongScore++;
                renderScores("wrong",wrongScore);
            }
            isCurrentAnswered = false;
            renderQuestion(questions[++i]);
            return;
        }


        const q = questions[i];
        if(!q){
            return;
        }
        const rightOption = q.rightOption;

        if(button.innerText === rightOption){
            rightScore++;
            renderScores("right",rightScore);
            renderOptionHighlight(button,"green");
            isCurrentAnswered = true;
        }else{
            renderOptionHighlight(button,"red");
        }
    }
});

function renderOptionHighlight(button,color){
    option1.style.backgroundColor = "";
    option2.style.backgroundColor = "";
    option3.style.backgroundColor = "";
    option4.style.backgroundColor = "";

    button.style.backgroundColor = color;
}

function renderScores(type,score){
    if(type === "right"){
        rightScoreContainer.innerText = score;
    }else{
        wrongScoreContainer.innerText = score;
    }
}


