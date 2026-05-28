const quizContainer = document.querySelector('.quiz-container');
const questionContainer = document.querySelector('.quiz-question');
const option1 = document.getElementById("option-1");
const option2 = document.getElementById("option-2");
const option3 = document.getElementById("option-3");
const option4 = document.getElementById("option-4");

function renderQuestion(question){
    if(question === undefined){
        questionContainer.innerHTML = "End";
        option1.innerHTML = "";
        option2.innerHTML = "";
        option3.innerHTML = "";
        option4.innerHTML = "";
        return;
    }
    console.log("rendered")
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

const q1 = questionObject("What is a apple",["fruit","vegi","nothing","bogi"],"fruit");
const q2 = questionObject("Template",["1","2","3","4"],"2");

const questions = [q1,q2];


quizContainer.addEventListener("click",(e)=>{
    const clickedElement = e.target;
    const q = questions[i];
    const rightOption = q.rightOption;
    console.log(rightOption);
    
    if(clickedElement.tagName === "BUTTON"){
        const button = clickedElement;
        console.log("You clicked",button.innerText);
        console.log("i : ",i)
        if(button.innerText === rightOption){
            alert("You clicked the right option");
            renderQuestion(questions[++i]);
        }else{
            alert("You clicked wrong option");
        }
    }
});

quizContainer.addEventListener("click",(e)=>{
    const clickedElement = e.target;
    if(clickedElement.tagName === "BUTTON"){
        const button = clickedElement;
        if(button.innerText=== "start"){
            i = 0;
            renderQuestion(questions[0]);
        }
    }
})



