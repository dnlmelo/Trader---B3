import React, { useState } from 'react';
import './Dash.scss';
import OrderBook from './components/OrderBook/OrderBook'
import Trades from './components/Ticker/Ticker';
import { useDispatch } from 'react-redux';
import { updateOrderBook, clearBook } from './components/OrderBook/OrderBook.reducer';
import useWebSocket from 'react-use-websocket';
import { clearTrades, updateTrades } from './components/Ticker/Ticker.reduce';

const CURRENCIES = [
  'btc-usd', 'btc-eur', 'btc-gbp', 'btc-pax', 'eth-btc', 'eth-usd',  'eth-eur', 'eth-gbp'
]
export default function Dash() {
  const url = 'wss://ws.bitstamp.net'
  const dispatch = useDispatch()
  const [currency, setCurrency] = useState(CURRENCIES[0])
  const { sendJsonMessage } = useWebSocket(url, {
    onOpen: () => subscribe(currency),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap['message']) => broadcastMessage(event)
  });

  function subscribe (currency:string){
    const c = currency.replace('-', '')
    const book = `order_book_${c}`
    const trades = `live_trades_${c}`

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

  function updateCurrency(newCurrency:string){
    dispatch(clearTrades([]))
    dispatch(clearBook())
    unsubscribe(currency)
    setCurrency(newCurrency)
    subscribe(newCurrency)
  }

  function unsubscribe(currency:string){
    const c = currency.replace('-', '')
    const book = `order_book_${c}`
    const trades = `live_trades_${c}`

    sendJsonMessage({
      "event": "bts:unsubscribe",
      "data": {
        channel: book
      }
    })
    sendJsonMessage({
        "event": "bts:unsubscribe",
        "data": {
          channel: trades
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
        dispatch(updateTrades(response.data));
        break;
    }
  };

  return(
    <div className='container px-4 gx-5'>
      <div className='col-12 mb-4'> 
        <select defaultValue={currency} onChange={(e)=>updateCurrency(e.target.value)}>
          {CURRENCIES.map((v, i)=>
            <option value={v} key={i}>{v.toUpperCase()}</option>
          )}
        </select>
      </div>
      <div className="row m-0">
        <div className='col p-0 me-5'>
          <OrderBook currency={currency}/>
        </div>

        <div className='col p-0'>
          <Trades currency={currency} />
        </div>
      </div>
    </div>
  );
}