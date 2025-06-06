let gameSeq = [];   //to store what game sequence follows
let userSeq = [];   //to store users inputs for calculating score

let colors = ["red","green","yellow","purple"];
let start = false;       //to check is game started or not
let level = 0;        //for calculating score
let Highest = 0;

let heading = document.querySelector("h2");

document.addEventListener("keypress", () => {
    if(start == false){
        start = true;

        levelUp();
    }
});

let gameFlash = (btn) => {                         // our work is to flash the button for a ms and then  go to normal state for that add a new class which having background color white
      btn.classList.add("flash");
      setTimeout(()=> {                           //for light flashing we are setting a time
         btn.classList.remove("flash");
      },250);
};

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=> {
        btn.classList.remove("userflash");
    },250)
}

function levelUp() {  
    userSeq = [];                    //updating h2 i.e level value and display and selecting a random button to flash
    level++;
    heading.innerText = `Level ${level}`;
    // random button selection process
    let rdmIdx = Math.floor(Math.random()*3);
    let rdmColor = colors[rdmIdx];
    let rdmBut = document.querySelector(`.${rdmColor}`);
    //      console.log(rdmIdx);
   // console.log(rdmColor);
   // console.log(rdmBut);
   gameSeq.push(rdmColor);
   //console.log(gameSeq);
    gameFlash(rdmBut);
};

function btnPress() {
    let btn = this;
    //console.log(btn);
    //console.log("button was Pressed");
    userFlash(btn);
    let color = btn.getAttribute("id");
    //console.log(color);
    userSeq.push(color);
   // console.log(userSeq);
   checkAns(userSeq.length-1);
}

function checkAns(idx){
    if(gameSeq[idx] == userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        heading.innerHTML = `Game Over Your score <b> ${level}</b>.<br> Press Any key to Start Again`;
        if(level > Highest){
            Highest = level;
            heading.innerHTML = `You broke your record. <br> This was your Highest Score ${Highest}. <br> Press any key to Start`;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        resetGame();
    }
}

let btns = document.querySelectorAll('.boxes');
for(btn of btns){
    btn.addEventListener("click",btnPress)
}

function resetGame(){
    userSeq = [];
    gameSeq = [];
    level = 0;
    start = false;
}