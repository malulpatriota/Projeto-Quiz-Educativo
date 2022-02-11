const categories = [astronomia,geografia,geral,historia,corpo_humano];

var actualQuestions;

let points = 0;
let totalQuestions = 0;
let number_of_questions = 10;

let inQuestionDelay = false;


function change_screen(screen){
    document.getElementById("main-menu").style.display = "none";

    switch (screen) {
        case "main-menu":
            document.getElementById("main-menu").style.display = "grid";
            document.getElementById("credits").style.display = "none";
            document.getElementById("instructions").style.display = "none";
            document.getElementById("options").style.display = "none";
            document.getElementById("select-category").style.display = "none";
            document.getElementById("title").innerText = "Quiz Educativo";
            break;

        case "instructions":
            document.getElementById("instructions").style.display = "block";
            document.getElementById("title").innerText = "Instruções";
            break;

        case "options":
            document.getElementById("options").style.display = "block";
            document.getElementById("title").innerText = "Opções";
            break;

        case "credits":
            document.getElementById("credits").style.display = "flex";
            document.getElementById("title").innerText = "Créditos";
            break;

        case "select-category":
            document.getElementById("select-category").style.display = "flex";
            document.getElementById("game-container").style.display = "none";
            document.getElementById("title").innerText = "Quiz Educativo";
            select_category_HTML();
            break;

        case "game-bootstrap":
            document.getElementById("select-category").style.display = "none";
            document.getElementById("game-container").style.display = "block";
            question_HTML();
            break;

        case "end":
            document.getElementById("game-container").style.display = "none";
            document.getElementById("end-screen").style.display = "flex";
            break;
    }
}

function select_category_HTML(){
    document.getElementById("select-category-options").innerHTML = "";

    for(let i = 0; i < categories.length; i++){
        const element = categories[i];

        document.getElementById("select-category-options").innerHTML += `
            <button onclick="LoadCategory('${element[0]}')"">
                <p>${element[0]}</p>
            </button>
        `;
    }
}

function question_HTML(){
    let html = `
        <h3>Pergunta ${totalQuestions-actualQuestions.length+1} de ${totalQuestions}</h3>
        <h2>${actualQuestions[0].pergunta}</h2>
    `;

    if(actualQuestions[0].nome_imagem != ""){
        html += `<img src="img/questions/${actualQuestions[0].nome_imagem}.jpg">`;
    }

    html += `
        <div id="question-options">
            <button id="btn1" onclick="ChoiceQuestion('A')">
                <p>${actualQuestions[0].A}</p>
            </button>

            <button id="btn2" onclick="ChoiceQuestion('B')">
                <p>${actualQuestions[0].B}</p>
            </button>

            <button id="btn3" onclick="ChoiceQuestion('C')">
                <p>${actualQuestions[0].C}</p>
            </button>

            <button id="btn4" onclick="ChoiceQuestion('D')">
                <p>${actualQuestions[0].D}</p>
            </button>
        </div>
    `;
    
    document.getElementById("question").innerHTML = html;
    inQuestionDelay = false;
}

function ChoiceQuestion(selected){
    if(inQuestionDelay)
        return;

    let correct = false;

    if(actualQuestions[0].Correta == "A" || actualQuestions[0].Correta == "a"){
        document.querySelector("#question-options #btn1").classList.add("correct");

        if(selected == "A")
            correct = true;
        else if(selected == "B")
            document.querySelector("#question-options #btn2").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#question-options #btn3").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#question-options #btn4").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "B" || actualQuestions[0].Correta == "b"){
        document.querySelector("#question-options #btn2").classList.add("correct");

        if(selected == "B")
            correct = true;
        else if(selected == "A")
            document.querySelector("#question-options #btn1").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#question-options #btn3").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#question-options #btn4").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "C" || actualQuestions[0].Correta == "c"){
        document.querySelector("#question-options #btn3").classList.add("correct");

        if(selected == "C")
            correct = true;
        else if(selected == "B")
            document.querySelector("#question-options #btn2").classList.add("wrong");
        else if(selected == "A")
            document.querySelector("#question-options #btn1").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#question-options #btn4").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "D" || actualQuestions[0].Correta == "d"){
        document.querySelector("#question-options #btn4").classList.add("correct");

        if(selected == "D")
            correct = true;
        else if(selected == "B")
            document.querySelector("#question-options #btn2").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#question-options #btn3").classList.add("wrong");
        else if(selected == "A")
            document.querySelector("#question-options #btn1").classList.add("wrong");
    }

    if(correct == true){
        points++;
        PlaySound("correct");
    }
    else{
        PlaySound("wrong");
    }

    actualQuestions.splice(0, 1);
    inQuestionDelay = true;
    if(actualQuestions.length == 0){
        setTimeout(EndScreen, 2000);
    }
    else{
        setTimeout(question_HTML, 2000);
    }
}

function EndScreen(){
    change_screen("end");

    if(points == totalQuestions){
        document.getElementById("end-screen").innerHTML += `<h2>Parabéns!!! Você acertou todas as questões!</h2><h2>Você é Fera!!!</h2>`;
    }
    else if(points == 0){
        document.getElementById("end-screen").innerHTML += `<h2>Infelizmente você não acertou nenhuma questão :(</h2>`;
    }
    else{
        document.getElementById("end-screen").innerHTML += `<h2>Você acertou ${points} de ${totalQuestions} questões (${parseInt((points/totalQuestions)*100)}%)!</h2>`;
    }

    document.getElementById("end-screen").innerHTML += `<button onclick='document.location.reload("true")'>Reiniciar</button>`;
}

function LoadCategory(category){
    let data = get_questions(category);
    actualQuestions = data;
    totalQuestions = actualQuestions.length;

    change_screen("game-bootstrap");
}

function get_questions(category){
    let data;
    for(let i = 0; i < categories.length; i++){
        const element = categories[i];

        if(element[0] == category){
            data = element;
            break;
        }
    }

    data.splice(0, 1);
    data = shuffleArray(data);

    number_of_questions = document.querySelector("#number-of-questions input").value;
    if(data.length > number_of_questions)
        data = data.splice(0, number_of_questions)

    return data;
}

function shuffleArray(array){
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function PlaySound(name){
    const sound = new Audio("sound/"+name+".mp3");
    sound.volume = 0.2;
    sound.play();
}

//Events

window.addEventListener("load", function(){
    document.querySelector("#number-of-questions input").value = parseInt(localStorage.getItem("number-of-questions"));
    document.querySelector("#number-of-questions p").innerText = document.querySelector("#number-of-questions input").value;
});

document.querySelector("#number-of-questions input").addEventListener("input", function() {
    document.querySelector("#number-of-questions p").innerText = this.value;
});

document.querySelector("#number-of-questions input").addEventListener("change", function() {
    localStorage.setItem('number-of-questions', this.value);
});