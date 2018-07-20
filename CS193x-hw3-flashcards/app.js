// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    //this.selectedDeck = null;
    this.changeScreenToFlashcard = this.changeScreenToFlashcard.bind(this);
    this.onClickContinue = this.onClickContinue.bind(this);
    this.onClick = this.onClick.bind(this);
    this.changeScreenToResult = this.changeScreenToResult.bind(this);

    this.menu = new MenuScreen(menuElement,this.changeScreenToFlashcard);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement,this.changeScreenToResult);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);


    // Uncomment this pair of lines to see the "flashcard" screen:
      //this.menu.hide();
    //this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
  }

  changeScreenToFlashcard(deck){
    this.selectedDeck = deck;
    this.menu.hide();
    this.flashcards.updateDictionary(deck.words);
    this.flashcards.show(true);
  }

  changeScreenToResult(){
    //console.log(this.flashcards.dictionary);
    this.flashcards.hide();

    let right =0, wrong = 0;
    const dic = this.flashcards.dictionary;
    for (let i in dic){
      if (dic[i][0]){
        right++;
      } else{
        wrong++;
      }
    }
    //console.log('Before'+ right + wrong);
    this.results.show(right,wrong);
    const continueBtn = document.querySelector('.continue');
    continueBtn.addEventListener('click', this.onClickContinue);

      const backToMenu = document.querySelector('.to-menu');
      backToMenu.addEventListener('click', this.onClick);
  }

  onClickContinue(){
    const container = document.querySelector('.continue');
    if (container.textContent === 'Continue'){
      this.results.hide();
      //this.flashcards.setCurrentCard(-1);
      this.flashcards.show(false);
    }
  }

  onClick(){
      window.location.reload('index.html');
  }
}
