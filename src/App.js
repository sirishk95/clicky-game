import React, { Component } from 'react';
import Navbar from './components/navbar/navbar.js';
import ClickCard from './components/clickcard/clickcard.js';
import Footer from './components/footer/footer.js';
import cards from './cards.json';
import Header from './components/header/header.js';
import Container from './components/container/container.js';

import './index.css';


class App extends Component {
  state = {
      cards: cards,
      score: 0,
      topScore: 0
    }

  componentDidMount() {
    this.setState({
      cards: this.shuffleCards(this.state.cards)
    });
  }



  handleItemClick = (id) => {
    const [pageBody] = document.getElementsByTagName('body');

    if (this.state.clickedCards.includes(id)) {
      this.setState({score: 0, clickedCards: []})

      pageBody.classList.add('shakeWrapper')
      this.setState({footerText: 'You picked that already! Start Over.'})
      setTimeout(() => {
        pageBody.classList.remove('shakeWrapper');
      }, 500);
      setTimeout(() => {
        this.setState({footerText: ""})
      }, 1800)

    } else {
      this.setState({clickedCards: [...this.state.clickedCards, id]})
      this.setState({score: this.state.score + 1})
      if (this.state.score >= this.state.topScore) {
        this.setState({topScore: this.state.score + 1})

      } 
      if (this.state.score === 11) {
        this.setState({footerText: 'You Won! Play again?'})
        this.setState({score: 0, clickedCards: [], cards: cards})
        setTimeout(() => {
          this.setState({footerText: ''})
        }, 1800)
      } 
    }
  }

  // I copy and pasted this randomize array function from 'Fisher-Yates Shuffle'
  shuffleCards = (array) => {
    let i = array.length-1;

    while (0 < i) {
      // Pick a remaining element...
      let randomNum = Math.floor(Math.random() * (i+1));
      
      // And swap it with the current element.
      let temporaryValue = array[i];
      array[i] = array[randomNum];
      array[randomNum] = temporaryValue;
      i--;      
    }

    return array;
  };


  renderCards = (array) => {
    return this.state.cards.map(card => (
      <section className='col s4 m3 l3' key={card.id} id={card.id}>
        <ClickCard
          name={card.name} 
          image={card.image} 
          reArrangeCards={() => {this.reArrangeCards(this.state.cards)}}
          clickedCharacter={() => {this.clickedCharacter(card.id)}}/>
      </section>
      )
    )
  }


  render() {
    return (
      <div>
        <Navbar score={this.state.score} topScore={this.state.topScore}/>
        <Header />
        <Container>
          {this.state.cards.map(item=>(
            <ClickCard
              shake={!this.state.score && this.state.topScore}
              key = {item.id}
              id = {item.id}
              handleclick = {this.handleItemClick}
              image = {item.image}
              />
          ))}
          </Container>
      
        <Footer />
      </div>
    );
  }
}





export default App;