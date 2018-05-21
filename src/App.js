import React, { Component } from 'react';
import Navbar from './components/navbar/navbar.js';
import ClickCard from './components/clickcard/clickcard.js';
import Footer from './components/footer/footer.js';
import cards from './cards.json';
import Header from './components/header/header.js';
import Container from './components/container/container.js';

//import './index.css';


class App extends Component {
  state = {
    cards,
    score: 0,
    topScore: 0
  };

  componentDidMount() {

    this.setState({
      cards: this.shuffleCards(this.state.cards)
    });
    console.log(cards);
  }

  handleCorrectGuess = (newCardsArray) => {
    const topScore = this.state.topScore;
    const score = this.state.score;

    const newScore = score + 1;
    const newTopScore = newScore > topScore ? newScore : topScore;

    this.setState({
      cards: this.shuffleCards(newCardsArray),
      score: newScore,
      topScore: newTopScore
    });

  };

  handleIncorrectGuess = (newCardsArray) => {
    this.setState({
      cards: this.reset(newCardsArray),
      score: 0

    });
  };

  reset = (newCardsArray) => {
    const resetCardsArray = newCardsArray.map(item => ({ ...item, clicked: false }));
    return this.shuffleCards(resetCardsArray);
  };

  shuffleCards = (array) => {
    let i = array.length - 1;
  
    while (0 < i) {
      // Pick a remaining element...
      let randomNum = Math.floor(Math.random() * (i + 1));
  
      // And swap it with the current element.
      let temporaryValue = array[i];
      array[i] = array[randomNum];
      array[randomNum] = temporaryValue;
      i--;
    }
  
    console.log(array);
  
    return array;
  };



  handleItemClick = (id) => {
    var guessedCorrectly = false;

    const newCardsArray = this.state.cards.map(item => {
      const newItem = { ...item };
      if (newItem.id === id) {
        if (!newItem.clicked) {
          newItem.clicked = true;
          guessedCorrectly = true;
        }
      }
      return newItem;
    });
    guessedCorrectly ? this.handleCorrectGuess(newCardsArray) : this.handleIncorrectGuess(newCardsArray);
  };



render() {

  return (
    <div>
      <Navbar score={this.state.score} topScore={this.state.topScore} />
      <Header />
      <Container>
        {this.state.cards.map(item => (
          <ClickCard
            shake={!this.state.score && this.state.topScore}
            key={item.id}
            id={item.id}
            handleClick={this.handleItemClick}
            image={item.image}
          />
        ))}
      </Container>

      <Footer />
    </div>
  );
}
}





export default App;