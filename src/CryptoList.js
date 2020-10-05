import React, { Component } from 'react';
import './cryptoList.css'

class CryptoList extends Component {
render(){
let cryptoRate = this.props.cryptoList

let currency = cryptoRate.map(crypto => {
let arrow = ' '
if (crypto.class === "green") {
    arrow = String.fromCharCode(8593)
} else if( crypto.class === "red") {
    arrow = String.fromCharCode(8595);
} else {
    arrow = String.fromCharCode(8596)
}
return(
    <li key={crypto.currency}>
        <span>Last Rate: </span>
        <span className={crypto.class}>{crypto.lastRate} {arrow}</span>
        <span>{crypto.currency}</span>
        <span>{crypto.symbol}</span>
    </li>
)

})


return (
    <div>
        <ul>{currency}</ul>
    </div>
)


}


}
export default CryptoList