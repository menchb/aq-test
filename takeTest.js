const NUM_OF_QUESTIONS = 20;

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
    var main = document.querySelector("main");
    console.log(main)

    var testClassLi = [];
    var testForm = document.createElement("form")
    var testOl = document.createElement("ol");
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
                radio[j].setAttribute("name", `range${i}`)
                radio[j].setAttribute("id", `radio${j+1}`);
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
}