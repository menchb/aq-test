function styleBtn(button) {
   button.classList.add("w-72", "flex", "justify-center", "mx-auto", "text-2xl", "font-light", "text-cyan-900", "bg-cyan-100", "rounded-full", "drop-shadow", "border", "border-cyan-700", "transition", "hover:bg-cyan-600", "hover:text-cyan-50", "hover:border-cyan-600", "hover:drop-shadow-xl")
};

styleBtn(testBtn);

testBtn.addEventListener("click", () => {
   const testOl = document.querySelector("#testOl");
   testOl.classList.add("list-decimal", "ml-5");

   const testClassLi = document.querySelectorAll("#testOl li");
   testClassLi.forEach((testClassLi) => {
      testClassLi.classList.add("my-9", "pt-3", "px-3", "rounded-lg", "bg-neutral-900");
   })

   const answerDivs = document.querySelectorAll("#testOl li div");
   answerDivs.forEach((div) => {
      div.classList.add("my-3", "grid", "justify-items-center", "md:flex", "md:justify-center")
   })

   const divChildren = document.querySelectorAll("#testOl li div > *");
   divChildren.forEach((child) => {
      child.classList.add("block", "my-3", "md:inline")
   })

   const radios = document.querySelectorAll("#testOl li div input")
   radios.forEach((radio) => {
      radio.classList.add("h-8", "w-8", "mx-2")
   })

   styleBtn(finishBtn);
})

function styleResults() {
   styleBtn(fbShare);
   resultSection.classList.add("my-9")
   computationSection.classList.add("my-9");
   messageP.classList.add("text-center");
   scoreSpan.classList.add("text-center");
   scoreSpan.querySelector("span p:nth-child(2)").classList.add("my-7");
   scoreSpan.querySelector("span p span").classList.add("font-light", "text-7xl", "block")
   scoreSpan.querySelector("span div").classList.add("grid", "grid-cols-4", "mb-7")
   const scores = scoreSpan.querySelectorAll("span div span");
   for (let i = 0; i < 8; i++) {
      if (i < 4) {
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