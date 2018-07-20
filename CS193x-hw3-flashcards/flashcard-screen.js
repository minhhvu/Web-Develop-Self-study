// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement, outputScreen) {
    this.dictionary = null;
    this.currentCard = 0;
    this.card = null;

    this.outputScreen = outputScreen;

    //this.updateDictionary = this.updateDictionary.bind(this);


    this.containerElement = containerElement;
    this.nextFlashcard = this.nextFlashcard.bind(this);
    this.show = this.show.bind(this);
  }

  updateDictionary(dic){
    let newDic = dic;
    for (let i in dic){
      newDic[i] = [false, dic[i]];
    }
    this.dictionary = newDic;
    //console.log(this.dictionary);
  }

  show(again) {
    this.containerElement.classList.remove('inactive');
    if (!again){
      this.card.relearn();
      //console.log('Test'+this.currentCard);
      //this.setCurrentCard(-1);
      //console.log('TestAf'+this.currentCard);
      this.nextFlashcard(true);
      return;
    }
    const flashcardContainer = document.querySelector('#flashcard-container');
    //show up every flashcard one by one
      const dic = (Object.keys(this.dictionary));
      const word = dic[this.currentCard];
      const definition = (this.dictionary[word])[1];
    this.card = new Flashcard(flashcardContainer, word, definition, this.nextFlashcard);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  nextFlashcard(lastCard){
    const dic = (Object.keys(this.dictionary));
    console.log(this.dictionary);
    console.log(dic);

    //update the previous answer
      let word = null;
      console.log('CurrentCard '+this.currentCard);
      console.log(word);
      console.log('////');
      if (this.currentCard >=0) {
          word= dic[this.currentCard];
          (this.dictionary[word])[0] = lastCard;
      }
      //console.log(this.dictionary);
      //console.log(this.currentCard);
      //console.log(word);
      //console.log(dic);
    this.currentCard ++;
    word = dic[this.currentCard];
    while ( this.currentCard < dic.length && (this.dictionary[word])[0]){
      this.currentCard++;
    }
    if (this.currentCard === dic.length){
      //return;
      this.outputScreen();
    } else{
      const definition = (this.dictionary[word])[1];
      this.card.update(word, definition);
      console.log(this.dictionary);
      console.log(this.currentCard);
      console.log(word + definition);
    }
  }

  setCurrentCard(num){
    this.currentCard = -1;
  }
}
