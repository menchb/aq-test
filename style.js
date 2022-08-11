const links = document.querySelectorAll("a");
links.forEach((link) => {
    link.classList.add("underline", "underline-offset-4")
})

function styleBtn(button) {
    button.classList.add("container", "mx-auto", "my-3", "text-2xl", "font-light", "text-teal-900", "bg-teal-100", "rounded-lg", "border", "border-teal-700", "transition", "hover:bg-teal-600", "hover:text-teal-50", "hover:border-teal-600")
};

styleBtn(testBtn);

testBtn.addEventListener("click", () => {
    const testOl = document.querySelector("#testOl");
    testOl.classList.add("list-decimal", "ml-5");

    const testClassLi = document.querySelectorAll("#testOl li");
    testClassLi.forEach((testClassLi) => {
        testClassLi.classList.add("my-9");
    })

    const answerDivs = document.querySelectorAll("#testOl li div");
    answerDivs.forEach((div) => {
        div.classList.add("my-3")
    })

    const divChildren = document.querySelectorAll("#testOl li div > *");
    divChildren.forEach((child) => {
        child.classList.add("block", "mx-auto", "text-center", "my-3")
    })

    const radios = document.querySelectorAll("#testOl li div input")
    radios.forEach((radio) => {
        radio.classList.add("h-8", "w-full")
    })

    styleBtn(finishBtn);
})

function styleResults () {
    styleBtn(fbShare);
    messageP.classList.add("text-center");
    scoreSpan.classList.add("text-center");
    scoreSpan.querySelector("span p:nth-child(2)").classList.add("my-7");
    scoreSpan.querySelector("span p span").classList.add("font-light", "text-7xl", "block")
    scoreSpan.querySelector("span div").classList.add("grid", "grid-cols-4", "mb-7")
    const scores = scoreSpan.querySelectorAll("span div span");
    for (let i=0; i<8; i++){
        if (i<4){
            // scores[i].classList.add
        }
        else {
            scores[i].classList.add("text-4xl", "font-light");
        }   
    }
    explanationSection.querySelectorAll("h3").forEach((title) => {
        title.classList.add("font-light", "text-3xl", "mt-7")
    })
    
}