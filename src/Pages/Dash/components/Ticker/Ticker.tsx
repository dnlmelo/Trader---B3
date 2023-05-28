import React, { FC } from 'react';
import './Ticker.scss';

const Ticker:FC = ()=>{
  return(
    <>
    <h2>Ticker Sales</h2>
    <table>
      <thead>
        <tr>

        <th>Time - $</th>
        <th>Quantity - $</th>
        <th>Price - $</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>time</td>
          <td>quantity</td>
          <td>Price</td>
        </tr>
      </tbody>
    </table>
    </>
  );
}
  
export default Ticker;