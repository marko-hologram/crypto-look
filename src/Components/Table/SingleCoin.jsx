import React from 'react';

const SingleCoin = (props) => {
  const locale = props.currency === 'USD' ? 'en-US' : 'de-DE';
  const fractionDigits = parseFloat(props.coinPrice) < 10 ? '4' : '2';
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: props.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: fractionDigits,
  });

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>
        <a
          href={`https://coinmarketcap.com/currencies/${props.coinID}`}
          target="_blank"
          title={`Check full ${props.coinName} data.`}
        >
          {props.coinName}
        </a>
      </td>
      <td>{props.coinSymbol}</td>
      <td>{formatter.format(parseFloat(props.coinPrice))}</td>
      <td>{formatter.format(parseFloat(props.marketCap))}</td>
    </tr>
  );
};

export default SingleCoin;
