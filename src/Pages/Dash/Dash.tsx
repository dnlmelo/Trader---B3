import React from 'react';
import './Dash.scss';
import OrderBook from './components/OrderBook/OrderBook'
import Ticker from './components/Ticker/Ticker';
import { useDispatch } from 'react-redux';
import { incrementByAmount as updateOrderBook } from './components/OrderBook/OrderBook.reducer';
import useWebSocket from 'react-use-websocket';
import { incrementByAmount } from './components/Ticker/Ticker.reduce';


export default function Dash() {
  const url = 'wss://ws.bitstamp.net'
  const dispatch = useDispatch()
  const { sendJsonMessage } = useWebSocket(url, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap['message']) => broadcastMessage(event)
  });

  const subscribe = (channel:string)=>{
    console.log('subscript', channel)

    sendJsonMessage({
        "event": "bts:subscribe",
        "data": {
          channel
        }
    })
  }

  const unsubscribe = (channel:string)=>{
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
        <select name="" id="">
          <option value="">Currency</option>
        </select>
      </div>
      <div className="row">
        <div className='col-6'>
          <OrderBook/>
        </div>

        <div className='col-6'>
          <Ticker />
        </div>
      </div>
    </div>
  );
}