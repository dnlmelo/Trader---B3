import React, { FC } from 'react';
import './OrderBook.scss';

const OrderBook:FC = ()=>{
    return <>
        <h2>Order Book</h2>
        <div> 
          <select name="" id="">
            <option value="">Currency</option>
          </select>
        </div>
        <div className="">
          <h3>Sells</h3>
          <table>
            <thead>
              <tr>
                <th>Quantity - $</th>
                <th>Price - $</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>bitcoin</td>
                <td>preço</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
          <h3>Buys</h3>
          <table>
            <thead>
              <tr>
                <th>Quantity - $</th>
                <th>Price - $</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>bitcoin</td>
                <td>preço</td>
              </tr>
            </tbody>
          </table>
        </div>
    </>
}
  
export default OrderBook;
  