import { useReducer, useState } from 'react';
import './Dash.scss';
import OrderBook from './components/OrderBook/OrderBook'
import Trades from './components/Ticker/Ticker';
import useWebSocket from 'react-use-websocket';

const CURRENCIES = [
  'btc-usd', 'btc-eur', 
]

interface State{
  book:any, 
  trades:any[]
}

const reducer = function(state:State, action:{type:string, payload?:any}){
  switch (action.type) {
    case 'clear-trades':
      return {
        ...state,
        trades: []
      }
    case 'clear-clearBook':
      return {
        ...state,
        trades: []
      }
    case 'update-book':
      return {
        ...state,
        book: action.payload
      }
    case 'update-trades':
      return {
        ...state,
        trades: [
          ...state.trades,
          action.payload
        ]
      }

    default:
      return state
  }
}
const url = 'wss://ws.bitstamp.net'

export default function Dash() {
  const [state, dispatch] = useReducer(reducer, {
    book: [],
    trades: []
  })
  const [currency, setCurrency] = useState(CURRENCIES[0])
  const { sendJsonMessage } = useWebSocket(url, {
    onOpen: () => subscribe(currency),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap['message']) => broadcastMessage(event)
  });


  function subscribe (currency:string){
    console.log('subscribe --', currency);
    
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
    dispatch({type: 'clear-book', payload: []})
    dispatch({type: 'clear-trades', payload: []})
    unsubscribe(currency)
    setCurrency(newCurrency)
    subscribe(newCurrency)
  }

  function unsubscribe(currency:string){
    console.log('unsubscribe --', currency );
    
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
    const response = JSON.parse(event.data);

    switch (response.event) {
      case 'data':
        dispatch({type:'update-book', payload: response.data});
        break;

      case 'trade':
        dispatch({type: 'update-trades', payload: response.data});
        break;
    }
  };

  return(
    <div className='container px-4 gx-5'>
      <div className='col-12 mb-4 d-flex'> 
        <select defaultValue={currency} onChange={(e)=>updateCurrency(e.target.value)}>
          {CURRENCIES.map((v, i)=>
            <option value={v} key={i}>{v.toUpperCase()}</option>
          )}
        </select>
      </div>
      <div className="row m-0">
        <div className='col p-0 me-5'>
          <OrderBook currency={currency} book={state.book}/>
        </div>

        <div className='col p-0'>
          <Trades currency={currency} trades={state.trades}/>
        </div>
      </div>
    </div>
  );
}