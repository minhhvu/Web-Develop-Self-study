// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    //this.hide = this.hide.bind(this);
  }

  show(numberCorrect, numberWrong) {
    //console.log(numberCorrect + numberWrong);
    this.containerElement.classList.remove('inactive');
    const correct = document.querySelector('.correct');
    const incorrect = document.querySelector('.incorrect');
    const percent = document.querySelector('.percent');
    correct.textContent = numberCorrect;
    incorrect.textContent = numberWrong;
    const percentage = numberCorrect*100/(numberCorrect+numberWrong);
    percent.textContent = percentage;
    if (percentage === 100){
      const startOver = document.querySelector('.continue');
      startOver.textContent = 'Start over?';
    } else{
      const reFlashcard = document.querySelector('.continue');
      reFlashcard.textContent = 'Continue';
    }
  }

  hide() {
    console.log('I am here to log Result screen');
    this.containerElement.classList.add('inactive');
  }

}
