// Disable test button after clicked once
const testBtn = document.querySelector("#testBtn");
testBtn.addEventListener("click", () => {
  testBtn.setAttribute("disabled", "");
})

const NUM_OF_QUESTIONS = 20;
var main = document.querySelector("main");

class testElement {
  constructor(
    number,
    testQuestion,
    startRange,
    endRange,
    dimension
  ) {
    this.number = number;
    this.testQuestion = testQuestion;
    this.startRange = startRange;
    this.endRange = endRange;
    this.dimension = dimension;
  }
}

var testClassArr = [];
// Reading json file
const getQuestions = () => {
  return fetch("./questions.json")
    .then(response => {
      return response.json();
    })
    .then(jsondata => {
      for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
        testClassArr[i] = new testElement(
          jsondata.Questions[i].number,
          jsondata.Questions[i].test,
          jsondata.Questions[i].startRange,
          jsondata.Questions[i].endRange,
          jsondata.Questions[i].dimension
        );
      }
    })
}

var displayTest;

const AVERAGE_ARP_SCORE = 147.5
const resultSection = document.querySelector("#resultSection")
const scoreSpan = document.createElement("span");
const messageP = document.createElement("p");
const fbShare = document.createElement("div");
const explanationSection = document.createElement("section");
const computationSection = document.createElement("section");

getQuestions()
  .then(() => {
    displayTest = () => {
      // Create form
      var testForm = document.createElement("form")
      testForm.addEventListener("submit", handleSubmit);

      var testOl = document.createElement("ol");
      testOl.setAttribute("id", "testOl")
      var testClassLi = [];
      var range = [];

      for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
        testClassLi[i] = document.createElement("li");
        // testClassLi[i].classList.add("wholeItem");

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
          for (let j = 0; j < 5; j++) {
            radio[j] = document.createElement("input");
            radio[j].setAttribute("type", "radio");
            radio[j].setAttribute("name", `range${i + 1}`);
            radio[j].setAttribute("id", `radio${i + 1}-${j + 1}`);
            radio[j].setAttribute("value", `${j + 1}`);
            radio[j].setAttribute("onInput", "removeWarn(this)");
            if (j == 0) {
              radio[j].setAttribute("required", "");
              radio[j].setAttribute("oninvalid", "warn(this)");
            }
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
      finishBtn.setAttribute("id", "finishBtn");
      finishBtn.setAttribute("value", "Finish");
      testForm.append(finishBtn)
    }

    function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);
      showResult(formProps);
    };

    function showResult(formProps) {
      // Disable finish button after click
      finishBtn.addEventListener("click", () => {
        finishBtn.setAttribute("disabled", "");
      })

      // Collects dimension score and total score
      var total = 0;
      var control = 0;
      var ownership = 0;
      var reach = 0;
      var endurance = 0;
      for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
        if (testClassArr[i].dimension == "control") {
          control += parseInt(formProps[`range${i + 1}`]);
        } else if (testClassArr[i].dimension == "ownership") {
          ownership += parseInt(formProps[`range${i + 1}`]);
        } else if (testClassArr[i].dimension == "reach") {
          reach += parseInt(formProps[`range${i + 1}`]);
        } else if (testClassArr[i].dimension == "endurance") {
          endurance += parseInt(formProps[`range${i + 1}`]);
        }
        total += parseInt(formProps[`range${i + 1}`]);
      }
      total = total * 2;

      computationSection.innerHTML = `
                At every question, the first radio button equates to a score of one,
                while the fifth equates to five. Add all the scores from all the questions,
                then multiply it by two. The result is your ARP, or Adversity Response Profile.
            `;

      // Classifying into average, higher, or lower
      scoreSpan.innerHTML = `
                <p>Average score: ${AVERAGE_ARP_SCORE}</p>
                <p>Your score: <span>${total}</span></p>
                <p>CORE Score breakdown:</p>
                <div>
                    <span>Control:</span>
                    <span>Ownership:</span>
                    <span>Reach:</span>
                    <span>Endurance:</span>
                    <span>${control}</span>
                    <span>${ownership}</span>
                    <span>${reach}</span>
                    <span>${endurance}</span>
                </div>
            `;
      if (total > Math.ceil(AVERAGE_ARP_SCORE)) {
        messageP.innerHTML = "You have an Adversity Response Profile score higher than average!";
      } else if ((total < Math.ceil(AVERAGE_ARP_SCORE)) && (total > Math.floor(AVERAGE_ARP_SCORE))) {
        messageP.innerHTML = "You have an average Adversity Response Profile score!";
      } else if (total < Math.floor(AVERAGE_ARP_SCORE)) {
        messageP.innerHTML = "You have an Adversity Response Profile score lower than average.";
      }

      const explanation = `
                <h3>C = Control</h3>
                <p>
                    To what extent can you influence the situation?
                    How much control do you perceive you have?
                    Those with higher AQs perceive they have significantly more control and influence in adverse situations than do those with lower AQs.  Even in situations that appear overwhelming or out of their hands, those with higher AQs find some facet of the situation they can influence.  Those with lower AQs respond as if they have little or no control and often give up.
                </p>
                <h3>O = Ownership</h3>
                <p>
                    To what extent do you hold yourself responsible for improving this situation?
                    To what extent are you accountable to play some role in making it better?
                    Accountability is the backbone of action.  Those with higher AQs hold themselves accountable for dealing with situations regardless of their cause.  Those with lower AQs deflect accountability and most often feel victimized and helpless.
                </p>
                <h3>R = Reach</h3>
                <p>
                    How far does the fallout of this situation reach into other areas of your work or life?
                    To what extent does the adversity extend beyond the situation at hand?
                    Keeping the fallout under control and limiting the reach of adversity is essential for efficient and effective problem solving.  Those with higher AQs keep setbacks and challenges in their place, not letting them infest the healthy areas of their work and lives.  Those with lower AQs tend to catastrophize, allowing a setback in one area to bleed into other, unrelated areas and become destructive.
                </p>
                <h3>E = Endurance</h3>
                <p>
                    How long will the adversity endure?
                    Seeing beyond even enormous difficulties is an essential skill for maintaining hope.  Those with higher AQs have the uncanny ability to see past the most interminable difficulties and maintain hope and optimism.  Those with lower AQs see adversity as dragging on indefinitely, if not permanently.
                </p>
                <br/>
                <a href=http://www.winstonbrill.com/bril001/html/article_index/articles/501-550/article517_body.html?fbclid=IwAR1V6du7-E6MRCLfLfGhmeg4Z3gwbzq5H1hmtUQZ-0oSYx02n3yeusfgBx0> (www.winstonbrill.com) </a>
            `;
      explanationSection.innerHTML = explanation;

      // Facebook share button
      fbShare.innerHTML = `
                <a id="fbShareBtn" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmenchb.github.io%2Faq-test%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore block text-center">Share on Facebook</a>
            `;
      styleBtn(fbShare);

      resultSection.append(computationSection);
      resultSection.append(messageP);
      resultSection.append(scoreSpan);
      resultSection.append(fbShare);
      resultSection.append(explanationSection);

      styleResults();
    }
  })

function warn(rangeE) {
  rangeE.parentElement.parentElement.classList.add("bg-violet-300/50");
}

function removeWarn(rangeE) {
  rangeE.parentElement.parentElement.classList.remove("bg-violet-300/50");
}
