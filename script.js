const quizContainer = document.querySelector('.quiz-container');
const questionContainer = document.querySelector('.quiz-question');
const option1 = document.getElementById("option-1");
const option2 = document.getElementById("option-2");
const option3 = document.getElementById("option-3");
const option4 = document.getElementById("option-4");
const rightScoreContainer = document.getElementById("right-answer");
const wrongScoreContainer = document.getElementById("wrong-answer");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");

nextBtn.style.display = "none";

function renderQuestion(question){
    if(question === undefined){
        questionContainer.innerHTML = "You finished the quiz!!!";
        option1.innerHTML = "";
        option2.innerHTML = "";
        option3.innerHTML = "";
        option4.innerHTML = "";
        startBtn.style.display = "flex";
        startBtn.innerHTML = "start";
        nextBtn.style.display = "none";
        return;
    }
    option1.style.backgroundColor = "";
    option2.style.backgroundColor = "";
    option3.style.backgroundColor = "";
    option4.style.backgroundColor = "";
    option1.style.color = "black";
    option2.style.color = "black";
    option3.style.color = "black";
    option4.style.color = "black";

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

let questions = [];


async function fetchQuestionsFromAPI() {
    questionContainer.innerHTML = "Loading questions...";
    const url = 'https://opentdb.com/api.php?amount=5&category=9&type=multiple';

    try{
        const response = await fetch(url);
        if(!response.ok) throw new Error("Network response failedd");

        const data = await response.json();

        return data.results.map(apiQ => {
            const correctAnswer = apiQ.correct_answer;

            const allOptions = [...apiQ.incorrect_answers,correctAnswer];
            allOptions.sort(()=>Math.random() - 0.5);

            return questionObject(apiQ.question,allOptions,correctAnswer);
        });
    }catch(err){
        console.error("Failed to fetch trivia : ",err);
        questionContainer.innerHTML = "Error loading questions. Try again";
        return[];
    }

}


quizContainer.addEventListener("click",async (e)=>{
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
            startBtn.style.display = "none";
            nextBtn.style.display = "flex";

            questions = await fetchQuestionsFromAPI();

        if(questions.length > 0){
            renderQuestion(questions[0]);
        }
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
    option1.style.color = "black";
    option2.style.color = "black";
    option3.style.color = "black";
    option4.style.color = "black";


    button.style.backgroundColor = color;
    button.style.color = "white";
}

function renderScores(type,score){
    if(type === "right"){
        rightScoreContainer.innerText = score;
    }else{
        wrongScoreContainer.innerText = score;
    }
}


