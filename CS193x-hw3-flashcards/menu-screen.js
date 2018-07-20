// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement,selectedDeck) {
    this.containerElement = containerElement;
    this.decks = [];
    this.selectedDeck = selectedDeck;

    this.goToSelectedDeck = this.goToSelectedDeck.bind(this);

    const deckContainer = document.querySelector('#choices');
    for (let i =0; i<FLASHCARD_DECKS.length; i++){
      this.decks.push(new ButtonDeck(deckContainer,FLASHCARD_DECKS[i],this.goToSelectedDeck));
    }
  }

  goToSelectedDeck(deck){
    this.selectedDeck (deck);
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}

class ButtonDeck {
  constructor(container, content, onClickedCallback){
    this.container = container;
    this.content = content;
    this.onClickedCallback = onClickedCallback;

    this.onClick = this.onClick.bind(this);

    const button = document.createElement('div');
    button.textContent = content.title;
    button.addEventListener('click', this.onClick);
    this.container.append(button);
  }

  onClick(){
    this.onClickedCallback(this.content);
  }
}
