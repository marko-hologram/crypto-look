import React from 'react';

const CurrencyButton = (props) => {
  const currencySymbol = props.currency === 'USD' ? '\u0024' : '\u20AC';
  return (
    <button
      className="pure-button"
      onClick={e => props.changeFormat(props.currency, e)}
    >
      {currencySymbol}
    </button>
  );
};

export default CurrencyButton;
