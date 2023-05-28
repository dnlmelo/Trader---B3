import React from 'react';
import { useSelector } from 'react-redux';
import { IOrderBook } from './OrderBook.reducer';
import './OrderBook.scss';

const OrderBook = (props:{currency:string})=>{
    const orders:IOrderBook = useSelector((state:any)=>state.orderbook.value)
    const pair = props.currency.split('-')

    return <>
      <h2>Order Book</h2>
      <div className='h-300 d-flex flex-row gap-4 overflow-auto h-section'>
        <div className='w-100'>
          <table className='table-ask'>
            <thead>
              <tr>
                <th>Price ({pair[1].toUpperCase()})</th>
                <th>Quantity ({pair[0].toUpperCase()}) </th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-center'><td className='ask-label' colSpan={2}>ask</td></tr>
              {orders.asks?.map((v:any[], i)=>
              <tr key={i}>
                <td>{v[0]}</td>
                <td>{v[1]}</td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='w-100'>
          <table className='table-bid'>
            <thead>
              <tr>
              <th>Price ({pair[1].toUpperCase()})</th>
              <th>Quantity ({pair[0].toUpperCase()}) </th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-center'><td className='bid-label' colSpan={2}>bids</td></tr>
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
  