const roundButton = document.querySelector("#roundButton");

let roundValue;
const matchScore = {human: 0, computer: 0};

roundButton.addEventListener('click', () => { 
  getRoundValue(); 
  });
  
const weaponButtons = document.querySelectorAll(".weapon > img");
for (const weaponButton of weaponButtons) {
  weaponButton.addEventListener('click', () => {
    playRound(Number(weaponButton.id));
  })
}




function getRoundValue() {
  const round = document.querySelector('input[name="round"]:checked');
  if (round == null) {
    const showError = document.querySelector("#roundError");
    if (showError == null) {
      const roundError = document.createElement("p");
      roundError.setAttribute("id","roundError");
      roundError.textContent = "You must select best of how many rounds you want to play!";
      roundError.style.color = "red";
      document.querySelector("#roundSelection").insertBefore(roundError, roundButton);
    }
  } else {
    roundValue = round.value;
  }
}

function playRound(humanChoice) {
  const computerChoice = Math.floor(Math.random() * 3);
  let resultMod = humanChoice - computerChoice;
  if (resultMod < 0) {
    resultMod = resultMod + 3;
  }
  switch (resultMod) {
    case 0:
      document.querySelector("#roundWinner").textContent = 'It\'s a draw!';
      break;
    case 1:
      document.querySelector("#roundWinner").textContent = 'You win!';
      matchScore.human += 1;
      break;
    case 2:
      document.querySelector("#roundWinner").textContent = 'Computer wins!';
      matchScore.computer += 1;
      break;
  }
  const humanImg = document.querySelector("#lastHumanImg");
  switch (humanChoice) {
    case 0:
      humanImg.setAttribute("src", "./images/rock.png");
      humanImg.setAttribute("alt", "rock");
      break;
    case 1:
      humanImg.setAttribute("src", "./images/paper.png");
      humanImg.setAttribute("alt", "paper");
      break;
    case 2:
      humanImg.setAttribute("src", "./images/scissors.png");
      humanImg.setAttribute("alt", "scissors");
      break;
  }
  const computerImg = document.querySelector("#lastComputerImg");
  switch (computerChoice) {
    case 0:
      computerImg.setAttribute("src", "./images/rock.png");
      computerImg.setAttribute("alt", "rock");
      break;
    case 1:
      computerImg.setAttribute("src", "./images/paper.png");
      computerImg.setAttribute("alt", "paper");
      break;
    case 2:
      computerImg.setAttribute("src", "./images/scissors.png");
      computerImg.setAttribute("alt", "scissors");
      break;
  }
  
  document.querySelector("#humanScore").textContent = matchScore.human;
  document.querySelector("#computerScore").textContent = matchScore.computer;
}
