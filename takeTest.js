// Disable button after clicked once
const testBtn = document.querySelector("#testBtn");
testBtn.addEventListener("click", ()=>{
    testBtn.setAttribute("disabled", "");
})

const NUM_OF_QUESTIONS = 20;
var main = document.querySelector("main");

// Reading json file
fetch("./questions.json")
.then(response => {
    return response.json();
})
.then(jsondata => keep(jsondata));

class testElement {
    constructor (
        number,
        testQuestion,
        startRange,
        endRange,
        dimension
    ){
        this.number = number;
        this.testQuestion = testQuestion;
        this.startRange = startRange;
        this.endRange = endRange;
        this.dimension = dimension;
    }
}

// Populate json data into individual objects in testClassArr
var testClassArr = [];
const keep = function (data) {
    for (let i=0; i<NUM_OF_QUESTIONS; i++){
        testClassArr[i] = new testElement();
        testClassArr[i].number =  data.Questions[i].number;
        testClassArr[i].testQuestion =  data.Questions[i].test;
        testClassArr[i].startRange =  data.Questions[i].startRange;
        testClassArr[i].endRange =  data.Questions[i].endRange;
        testClassArr[i].dimenson =  data.Questions[i].dimension;
    }
}


const displayTest = () => {

    // Create form
    var testForm = document.createElement("form")
    // testForm.setAttribute("action", "javascript:;");
    // testForm.setAttribute("onsubmit", "handleSubmit()");
    testForm.addEventListener("submit", handleSubmit);

    var testOl = document.createElement("ol");
    var testClassLi = [];
    var range = [];

    for (let i=0; i<NUM_OF_QUESTIONS; i++){
        testClassLi[i] = document.createElement("li");

        // Place test question in p 
        let p = document.createElement("p");
        p.innerHTML = testClassArr[i].testQuestion;
        testClassLi[i].append(p);

        // Create range div
        range[i] = document.createElement("div");
        {
            // Place start range label
            let labelStart = document.createElement("label");
            labelStart.setAttribute("for", "radio1");
            labelStart.innerHTML = testClassArr[i].startRange;
            range[i].append(labelStart);

            // Create 5 radio buttons
            let radio = [];
            for (let j=0; j<5; j++){
                radio[j] = document.createElement("input");
                radio[j].setAttribute("type", "radio");
                radio[j].setAttribute("name", `range${i+1}`)
                radio[j].setAttribute("id", `radio${i+1}-${j+1}`);
                radio[j].setAttribute("value", `${j+1}`);
                range[i].append(radio[j]);
            }

            // Place end range label
            let labelEnd = document.createElement("label");
            labelEnd.setAttribute("for", "radio5")
            labelEnd.innerHTML = testClassArr[i].endRange;
            range[i].append(labelEnd);
        
            testClassLi[i].append(range[i]);
            testOl.append(testClassLi[i]);
        }
    }
    main.append(testForm);
    testForm.append(testOl);

    // Create finish button
    const finishBtn = document.createElement("input");
    finishBtn.setAttribute("type", "submit");
    finishBtn.setAttribute("value", "Finish");
    testForm.append(finishBtn)
}

function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    // Algorithm for getting the score
    var total = 0;
    for (let i=0; i<NUM_OF_QUESTIONS; i++){
        total += parseInt(formProps[`range${i+1}`]);
    }
    total = total * 2;

    const AVERAGE_ARP_SCORE = 147.5
    const resultSection = document.createElement("section");
    const scoreSpan = document.createElement("span");
    const messageP = document.createElement("p");
    
    // Classifying into average, higher, or lower
    scoreSpan.innerHTML = `
        Your score: ${total}
        <br/>Average score: ${AVERAGE_ARP_SCORE}
    `;
    if (total > Math.ceil(AVERAGE_ARP_SCORE)) {
        messageP.innerHTML = "You have an Adversity Response Profile score higher than average!";
    } else if ((total < Math.ceil(AVERAGE_ARP_SCORE))&&(total > Math.floor(AVERAGE_ARP_SCORE))){
        messageP.innerHTML = "You have an average Adversity Response Profile score!";
    } else if (total < Math.floor(AVERAGE_ARP_SCORE)) {
        messageP.innerHTML = "You have an Adversity Response Profile score lower than average.";
    }
    console.log(Math.ceil(AVERAGE_ARP_SCORE)) // 148
    console.log(Math.floor(AVERAGE_ARP_SCORE)) // 147
    
    main.append(resultSection);
    resultSection.append(scoreSpan);
    resultSection.append(messageP);
  }