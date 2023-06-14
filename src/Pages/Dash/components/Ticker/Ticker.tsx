import { subtagsLanguage } from '../../../../utils/utils';
import './Ticker.scss';

const Trades = (props:{currency: string, trades: any[]})=> {
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
        {props.trades?.map((v, i)=>
        <tr key={i}>
          <td>{new Date(Number(v.timestamp.concat('000'))).toLocaleTimeString()}</td>
          <td>{
            new Intl.NumberFormat(
              subtagsLanguage[props.currency], 
              {style: 'currency', currency: pair[1].toUpperCase()}
            ).format(v.price)}
          </td>
          <td>{v.amount}</td>
        </tr>)}
      </tbody>
    </table>

    </div>
    </>
  );
}
  
export default Trades;