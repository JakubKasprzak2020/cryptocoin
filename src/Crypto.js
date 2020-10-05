import React, { Component } from 'react';
import axios from 'axios';
import CryptoList from './CryptoList';

class Crypto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cryptoList: [],
            filteredCryptoList: []
        }
    }

    getCryptoData = () => {
        axios.get('https://blockchain.info/pl/ticker')
            .then(response => {
                const data = response.data
                let lastCryptoList = this.state.cryptoList
                let cryptoListArray = []
                cryptoListArray = Object.keys(data).map(key => {
                    let cryptoObj = {}
                    cryptoObj.currency = key
                    cryptoObj.symbol = data[key].symbol
                    cryptoObj.buy = data[key].buy
                    cryptoObj.sell = data[key].sell
                    cryptoObj.lastRate = data[key].last
                    let lastObj = lastCryptoList.find(item => cryptoObj.currency === item.currency)
                    console.log (lastObj)
                    if (lastObj !== undefined){
                        if (cryptoObj.lastRate > lastObj.lastRate) {
                            cryptoObj.class = "green"
                        } else if (cryptoObj.lastRate < lastObj.lastRate) {
                            cryptoObj.class = "red"
                        } else {
                            cryptoObj.class = "blue"
                        }
                      } else {
                        cryptoObj.class = "blue"
                    }
                    return cryptoObj
                })
                this.setState({
                    cryptoList: cryptoListArray
                })
                this.filterCryptoList()
            })
    }
    filterCryptoList = () => {
        console.log(this.inputFilter)
        let filteredCryptoList = this.state.cryptoList
        let filtr = this.inputFilter.value.trim().toUpperCase()
        console.log("Crypto -> filterCryptoList -> filtr", filtr)
        filteredCryptoList = filteredCryptoList.filter(item =>{
            return (item.currency.search(filtr) !== -1)
        })
        this.setState({
            filteredCryptoList
        })
    }
    componentDidMount = () => {
        this.getCryptoData()
        this.timer = setInterval(() => this.getCryptoData(), 50000)
    }
    render = () => {
        return (
            <div>
                <input ref = {(data) => {this.inputFilter = data }} type="text" onChange={this.filterCryptoList} />
                <CryptoList cryptoList={this.state.filteredCryptoList}/>

            </div>
        )
    }


}
export default Crypto;