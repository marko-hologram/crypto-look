import React from 'react';
import SingleCoin from './SingleCoin';
import './coin-table.css';

const CoinTable = props =>
  (
    <table className="pure-table pure-table-horizontal pure-table-striped coins-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Market Cap</th>
        </tr>
      </thead>
      <tbody>
        {props.coinData &&
          props.coinData.map((singleItem, index) => (
            <SingleCoin
              index={index}
              key={singleItem.id}
              coinID={singleItem.id}
              coinName={singleItem.name}
              coinSymbol={singleItem.symbol}
              coinPrice={singleItem.price}
              marketCap={singleItem.marketCap}
              currency={props.currencyType}
            />
          ))}
      </tbody>
    </table>
  );

export default CoinTable;
