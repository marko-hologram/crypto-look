import 'purecss/build/pure.css';
import 'purecss/build/grids-responsive-min.css';
import React, { Component } from 'react';
import './App.css';
import Title from './Components/Title/Title';
import CurrencyButton from './Components/Buttons/CurrencyButton';
import CoinTable from './Components/Table/CoinTable';

const api = 'https://api.coinmarketcap.com/v1/ticker/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      coinData: null,
      howMany: 10,
      currency: 'USD',
    };

    this.getCoinsData = this.getCoinsData.bind(this);
    this.changeNumberOfCoins = this.changeNumberOfCoins.bind(this);
    this.changeCurrencyFormat = this.changeCurrencyFormat.bind(this);
  }

  componentDidMount() {
    this.getCoinsData();
  }

  getCoinsData = (currencyFormat = 'USD') => {
    const howManyCoins = this.state.howMany;
    const apiString = `${api}?convert=${currencyFormat}&limit=${howManyCoins}`;
    const lowCurrency = currencyFormat.toLowerCase();
    return fetch(apiString, {
      mode: 'cors',
    })
      .then(response => response.json())
      .then((responseJson) => {
        const allKeys = Object.keys(responseJson);
        const allCoins = [];
        for (let i = 0; i < allKeys.length; i += 1) {
          const single = responseJson[i];
          allCoins.push({
            id: single.id,
            name: single.name,
            symbol: single.symbol,
            price: single[`price_${lowCurrency}`],
            marketCap: single[`market_cap_${lowCurrency}`],
          });
        }
        this.setState({
          coinData: allCoins,
          currency: currencyFormat,
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  changeCurrencyFormat(currency, e) {
    e.preventDefault();
    if (currency !== this.state.currency) {
      this.getCoinsData(currency);
    }
  }

  changeNumberOfCoins(e) {
    const numOfCoins = e.target.value;
    this.setState({
      howMany: numOfCoins,
    }, () => this.getCoinsData());
  }

  render() {
    return (
      <div className="pure-u-g">
        <Title appTitle="Crypto Look" />
        <form className="pure-form coin-form">
          <label htmlFor="coins-number">Number of coins: {' '}
            <select id="coins-number" onChange={this.changeNumberOfCoins}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </label>
          <div className="currency-buttons">
            <CurrencyButton currency="USD" changeFormat={this.changeCurrencyFormat} />
            <CurrencyButton currency="EUR" changeFormat={this.changeCurrencyFormat} />
          </div>
        </form>
        <CoinTable coinData={this.state.coinData} currencyType={this.state.currency} />
        <div className="footer">
          <p>API courtesy of <a href="https://coinmarketcap.com">Coinmarketcap.</a></p>
        </div>
      </div>
    );
  }
}

export default App;
