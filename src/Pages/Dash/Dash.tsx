import React from 'react';
import './Dash.scss';
import OrderBook from './components/OrderBook/OrderBook'
import Trades from './components/Ticker/Ticker';
import { useDispatch } from 'react-redux';
import { incrementByAmount as updateOrderBook } from './components/OrderBook/OrderBook.reducer';
import useWebSocket from 'react-use-websocket';
import { incrementByAmount } from './components/Ticker/Ticker.reduce';

const CURRENCIES = [
  'btcusd', 'btceur', 'btcgbp', 'btcpax', 'ethbtc', 'ethusd',  'etheur', 'ethgbp'
]
export default function Dash() {
  const url = 'wss://ws.bitstamp.net'
  const dispatch = useDispatch()
  const { sendJsonMessage } = useWebSocket(url, {
    onOpen: () => subscribe(CURRENCIES[0]),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap['message']) => broadcastMessage(event)
  });

  function subscribe (currency:string){
    console.log('subscript', currency)
    const book = `order_book_${currency}`
    const trades = `live_trades_${currency}`

    sendJsonMessage({
        "event": "bts:subscribe",
        "data": {
          channel: book
        }
    })
    sendJsonMessage({
      "event": "bts:subscribe",
      "data": {
        channel: trades
      }
  })
  }

  function unsubscribe(channel:string){
    console.log('unsubscribe')
    sendJsonMessage({
        "event": "bts:subscribe",
        "data": {
            channel
        }
    })
  }


  const broadcastMessage = (event: { data: string; }) => {
    console.log('broadcastMessage', event)

    const response = JSON.parse(event.data);
    switch (response.event) {
      case 'data':
        dispatch(updateOrderBook(response.data));
        break;

      case 'trade':
        dispatch(incrementByAmount(response.data));
        break;
    }
  };

  return(
    <div className='container px-4 gx-5'>
      <div> 
        <select defaultValue={CURRENCIES[0]} onChange={(e)=>subscribe(e.target.value)}>
          {CURRENCIES.map((v, i)=>
            <option value={v} key={i}>{v.toUpperCase()}</option>
          )}
        </select>
      </div>
      <div className="row">
        <div className='col-6'>
          <OrderBook/>
        </div>

        <div className='col-6'>
          <Trades />
        </div>
      </div>
    </div>
  );
}