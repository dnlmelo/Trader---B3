import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ITrades } from './Ticker.reduce';
import './Ticker.scss';

const Trades:FC = ()=> {
  const trades: ITrades[] = useSelector((state:any)=> state.ticker.value)
  console.log(trades)
  return(
    <>
    <h2>Ticker Sales</h2>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Price </th>
          <th>Quantity </th>
        </tr>
      </thead>
      <tbody>
        {trades && trades.map((v, i)=>
        <tr key={i}>
          <td>{new Date(Number(v.timestamp.concat('000'))).toLocaleDateString()}</td>
          <td>{v.price}</td>
          <td>{v.amount}</td>
        </tr>)}
      </tbody>
    </table>
    </>
  );
}
  
export default Trades;