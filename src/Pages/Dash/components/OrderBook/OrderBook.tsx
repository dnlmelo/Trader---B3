import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IOrderBook } from './OrderBook.reducer';
import './OrderBook.scss';

const OrderBook:FC = ()=>{
    const orders:IOrderBook = useSelector((state:any)=>state.orderbook.value)
console.log(orders);

    return <>
        <h2>Order Book</h2>
        <div className="row">
          <div className="">
            <h3>Sells</h3>
            <table>
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orders.asks?.map((v:any[], i)=>
                <tr key={i}>
                  <td>{v[0]}</td>
                  <td>{v[1]}</td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="">
            <h3>Buys</h3>
            <table>
              <thead>
                <tr>
                  <th>Price </th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orders.bids?.map((v:any[], i)=>
                <tr key={i}>
                  <td>{v[0]}</td>
                  <td>{v[1]}</td>
                </tr>)
                }
              </tbody>
            </table>
          </div>
        </div> 

    </>
}
  
export default OrderBook;
  