
interface State{
    book:any, 
    trades:any[]
}
  
  
export const reducer = function(state:State, action:{type:string, payload?:any}){
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