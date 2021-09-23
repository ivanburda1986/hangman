function hangmanGame () {
  const words = [
    ['javascript', 'The best programming language'], 
    ['raiffeisen', 'The yellow austrian bank'], 
    ['schnitzel', 'A favourite austrian dish'], 
    ['typescript', 'The slightly better javascript'], 
    ['bitcon', 'This can make you rich or poor fast'], 
    ['dogecoin', 'Elon Musks favourite pet'], 
    ['frankenstein', 'the classical horror movie'], 
    ['terminator', 'He has come back already several times'], 
    ['curiosity', 'Every scientist must have this'], 
    ['antarctis','A continent'],
    ['cryptocurrency','Even your taxidriver has invested into it']
  ];
  const hangmanLifeStates = {
    5: `
    |---------
    |    |
    |    O
    |
    |
    |
    |
    `,
    4: `
    |---------
    |    |
    |    O
    |    |
    |
    |
    |
    `,
    3:`
    |---------
    |    |
    |    O
    |    |-
    |
    |
    |
    `,
    2:`
    |---------
    |    |
    |    O
    |   -|-
    |
    |
    |
    `,
    1:`
    |---------
    |    |
    |    O
    |   -|-
    |     \\
    |
    |
    `,
    0:`
    |---------
    |    |
    |    O
    |   -|-
    |   / \\
    |
    |
    `,
  };
  const hangmanVictory = `
  ,d88b.d88b,
  88888888888
  'Y8888888Y'
    'Y888Y'
      'Y'
  `;

  let word = '';
  let help = '';
  let remainingAttempts= 6;
  let promptedLetters = [];
  let wordState = Array(word.length).fill('_');

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function restartGame (){
    const randomNumber = Math.floor(Math.random() * 10)
    word = words[randomNumber][0];
    help = words[randomNumber][1];
    remainingAttempts= 6;
    promptedLetters = [];
    wordState = Array(word.length).fill('_');
    promptLetter();
  };

  function promptLetter() {
    console.log('------------------------------------------------');
      readline.question("What's your letter?\n", (letter) => {
          guessLetterEvaluation(letter.toLowerCase());
      });
  };

  function guessLetterEvaluation(letter) {
    //Letter already attempted
    if (promptedLetters.includes(letter)) {
        console.log('------------------------------------------------');
        console.log(`You've already guessed this letter: ${letter.toUpperCase()}!`);
        promptLetter();
        return;
    };
    promptedLetters.push(letter);
    
    //Wrong: Guess again or Gameover!
    if (!word.includes(letter)) {
        remainingAttempts-=1;
        if(remainingAttempts > 0){
          console.log('------------------------------------------------');
          console.log(`No, guess again! Remaining attempts left: ${remainingAttempts}`);
          console.log(hangmanLifeStates[remainingAttempts]);
          console.log(`${help}:  ${wordState.join(' ')}`);
          promptLetter();
          return;
        }else{
          console.log('------------------------------------------------');
          console.log(`Game over! The word was: "${word}". Let's play again!`);
          console.log(hangmanLifeStates[remainingAttempts]);
          restartGame();
          return;
        }
    };

    //Correct: Update the word state and give feedback
    for (const [currentIndex, currentLetter] of [...word].entries()) {
        if (currentLetter === letter) {
            wordState[currentIndex] = letter;
        }
    };

    //Correct
    console.log('------------------------------------------------');
    console.log('Yes, you are right!');
    console.log(`${help}:  ${wordState.join(' ')}`);

    //Correct -> Victory!
    if (!wordState.includes('_')) {
      console.log('------------------------------------------------');
        console.log("Congratulations, you've won!");
        console.log(`The word was: "${word}". Let's play again!`);
        console.log(hangmanVictory);
        restartGame();
        //readline.close();
        return;
    };

    promptLetter();
} 

restartGame();
};

hangmanGame();
