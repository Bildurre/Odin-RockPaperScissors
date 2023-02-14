const matchScreen = document.querySelector(".matchScreen");
const roundSelection = document.querySelector(".roundSelection");
const roundButton = document.querySelector(".roundButton");

let roundValue;
const matchScore = {human: 0, computer: 0, round: 1};

roundButton.addEventListener('click', () => { 
  if (!isNaN(getRoundValue())) {
    roundValue = Math.ceil(getRoundValue() / 2);
    matchScreen.classList.toggle("hidden");
    roundSelection.classList.toggle("hidden");
  };
  });
  
const weaponButtons = document.querySelectorAll(".weapon > img");
for (const weaponButton of weaponButtons) {
  weaponButton.addEventListener('click', () => {
    playRound(Number(weaponButton.id));
  });
};

const playAgainButton = document.querySelector(".playAgain");
playAgainButton.addEventListener('click', () => {
  document.location.reload();
});


function getRoundValue() {
  const round = document.querySelector('input[name="round"]:checked');
  if (round == null) {
    const showError = document.querySelector(".roundError");
    if (showError == null) {
      const roundError = document.createElement("p");
      roundError.setAttribute("class","roundError");
      roundError.textContent = "You must select best of how many rounds you want to play!";
      roundError.style.color = "red";
      document.querySelector(".roundSelection").insertBefore(roundError, roundButton);
    };
  } else {
    return round.value;
  };
};

function playRound(humanChoice) {
  const computerChoice = Math.floor(Math.random() * 3);
  let resultMod = humanChoice - computerChoice;
  if (resultMod < 0) {
    resultMod = resultMod + 3;
  };
  if (matchScore.round == 1) {
    document.querySelector(".choices").classList.toggle("hidden");
    document.querySelector(".roundResult").classList.toggle("hidden");
  }
  switch (resultMod) {
    case 0:
        document.querySelector(".roundWinner").textContent = 'Round ' + matchScore.round + ': It\'s a draw!';
      matchScore.round += 1;
      break;
    case 1:
        document.querySelector(".roundWinner").textContent = 'Round ' + matchScore.round + ': You win!';
      matchScore.human += 1;
      matchScore.round += 1;
      break;
    case 2:
        document.querySelector(".roundWinner").textContent = 'Round ' + matchScore.round + ': Computer wins!';
      matchScore.computer += 1;
      matchScore.round += 1;
      break;
  };
  const humanImg = document.querySelector(".lastHumanImg");
  showImage (humanImg, humanChoice);
  
  const computerImg = document.querySelector(".lastComputerImg");
  showImage(computerImg, computerChoice);
 
  const humanNode = document.querySelectorAll(".humanScore");
  for (const node of humanNode){
    node.textContent = matchScore.human;
  };
  const computerNode = document.querySelectorAll(".computerScore");
  for (const node of computerNode){
    node.textContent = matchScore.computer;
  };

  if (gameEnd(roundValue,matchScore.human, matchScore.computer )){
    document.querySelector(".weapons").classList.toggle("hidden");
    document.querySelector(".roundResult").classList.toggle("hidden");
    document.querySelector(".matchEnd").classList.toggle("hidden");
    document.querySelector(".choiceText").classList.toggle("hidden");
    if (matchScore.human > matchScore.computer) {
      document.querySelector(".matchEndWinner").textContent = "Human Wins!";
    } else {
      document.querySelector(".matchEndWinner").textContent = "Computer Wins!";
    }
  }
};

function showImage(img, choice) {
  switch (choice) {
    case 0:
      img.setAttribute("src", "./images/rock.png");
      img.setAttribute("alt", "rock");
      break;
    case 1:
      img.setAttribute("src", "./images/paper.png");
      img.setAttribute("alt", "paper");
      break;
    case 2:
      img.setAttribute("src", "./images/scissors.png");
      img.setAttribute("alt", "scissors");
      break;
  };
};

function gameEnd(limit, humanScore, computerScore) {
  if (humanScore >= limit || computerScore >= limit) {
    return true;
  } else {
    return false;
  };
};

