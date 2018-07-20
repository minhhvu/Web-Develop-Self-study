// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText, nextFlashcard) {
    this.containerElement = containerElement;
    this.nextFlashcard = nextFlashcard;

    this.rightAnswer = document.querySelector('.correct');
    this.right = Number(this.rightAnswer.textContent);
    this.wrongAnswer = document.querySelector('.incorrect');
    this.wrong = Number(this.wrongAnswer.textContent);

    this.originX = null;
    this.originY = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragStart = false;

    this._flipCard = this._flipCard.bind(this);
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerdown', this._onDragStart);
    this.flashcardElement.addEventListener('pointermove', this._onDragMove);
    this.flashcardElement.addEventListener('pointerup', this._flipCard);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
    this.dragStart = false;
    const deltaX = event.clientX - this.originX;
    this.offsetX =0;//+= event.clientX - this.originX;
    this.offsetY =0;
    if (deltaX <150 && deltaX > -150){
        event.currentTarget.style.transform = 'translate('+ this.offsetX + 'px, ' + this.offsetY + 'px)';
    } else if (deltaX <= - 150){
      this.wrong += 1;
      this.wrongAnswer.textContent = String(this.wrong);
      event.currentTarget.style.transform = 'translate('+ this.offsetX + 'px, ' + this.offsetY + 'px)';
      this.nextFlashcard(false);
    } else {
        this.right += 1;
        this.rightAnswer.textContent = String(this.right);
        event.currentTarget.style.transform = 'translate('+ this.offsetX + 'px, ' + this.offsetY + 'px)';
        this.nextFlashcard(true);
    }
    //this.offsetX =0;//+= event.clientX - this.originX;
    //this.offsetY =0;//+= event.clientY - this.originY;
    //console.log('Position end' + this.originX +' '+ this.originY);
  }

  _onDragStart(event){
    this.originX = event.clientX;
    this.originY = event.clientY;
    //console.log('Position begin' + this.originX +' '+ this.originY);
    this.dragStart = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  _onDragMove(event){
    if (!this.dragStart){
      return;
    }
    event.preventDefault();
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    const translateX = this.offsetX + deltaX;
    const translateY = this.offsetY + deltaY;
    const rotateX = 0.2 * (this.offsetX + deltaX);
    const appscreen = document.querySelector('body');
      if (deltaX >=150){ // if drag to the right
        event.currentTarget.style.transform = 'translateX('+ translateX+ 'px) ' + 'rotate(' + rotateX + 'deg)';
        appscreen.style.backgroundColor = '#97b7b7';
        this.rightAnswer.textContent = String(this.right+1);
        //return;

      } else if (deltaX <= -150){ // drag to to the left
        event.currentTarget.style.transform = 'translateX('+ translateX+ 'px) ' + 'rotate(' + rotateX + 'deg)';
        appscreen.style.backgroundColor = '#97b7b7';
        this.wrongAnswer.textContent = String(this.wrong+1);
        //return;
      } else { // in the middle
          event.currentTarget.style.transform = 'translate('+ translateX+ 'px, ' + translateY + 'px)';
          appscreen.style.backgroundColor = '#d0e6df';
          this.wrongAnswer.textContent = String(this.wrong);
          this.rightAnswer.textContent = String(this.right);
      }
      //console.log('pointermove Ending:');
  }

  update(front,back){
    this.flashcardElement.classList.add('show-word');
    const frontCard = document.querySelector('.word');
    const backCard = document.querySelector('.definition');
    frontCard.textContent = front;
    backCard.textContent = back;
  }

  relearn(){
    this.flashcardElement.classList.add('show-word');
    this.wrong = 0;
    this.right = 0;
    this.rightAnswer.textContent = this.right;
    this.wrongAnswer.textContent = this.wrong;
  }
}
