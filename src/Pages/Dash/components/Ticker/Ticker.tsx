import React from 'react';
import { useSelector } from 'react-redux';
import { ITrades } from './Ticker.reduce';
import './Ticker.scss';

const Trades = (props:{currency: string})=> {
  const trades: ITrades[] = useSelector((state:any)=> state.ticker.value)
  const pair = props.currency.split('-')

  return(
    <>
    <h2>Trades</h2>
    <div className='h-section'>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Price ({pair[1].toUpperCase()})</th>
          <th>Quantity ({pair[0].toUpperCase()}) </th>
        </tr>
      </thead>
      <tbody>
        {trades && trades.map((v, i)=>
        <tr key={i}>
          <td>{new Date(Number(v.timestamp.concat('000'))).toLocaleString()}</td>
          <td>{v.price}</td>
          <td>{v.amount}</td>
        </tr>)}
      </tbody>
    </table>

    </div>
    </>
  );
}
  
export default Trades;