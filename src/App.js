import React, { Component } from 'react';
import logo from './ga.png';

import Account from './Account';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkingBalance: 0,
      savingsBalance: 0,
    }
    this.handleDepositClick = this.handleDepositClick.bind(this)
    this.handleWithdrawalClick = this.handleWithdrawalClick.bind(this)
  }

  handleDepositClick(e, amount, name) {
    e.preventDefault();
    if (isNaN(amount) || amount < 0) {
      console.log("Not a number");
    } else {
      const inputAmount = parseInt(amount)
      let newBalance = 0
      if (name === 'Checking') {
        newBalance = +this.state.checkingBalance + inputAmount
        this.setState({
          checkingBalance: newBalance
        })
      } else {
        newBalance = +this.state.savingsBalance + inputAmount
        this.setState({
          savingsBalance: newBalance
        })
      }
    }
  }

  handleWithdrawalClick(e, amount, name) {
    e.preventDefault();
    if (isNaN(amount) || amount < 0) {
      console.log("Not a number");
    } else {
      const inputAmount = parseInt(amount)
      let newBalance = 0
      if (name === 'Checking') {
        newBalance = +this.state.checkingBalance - inputAmount
        this.setState({
          checkingBalance: newBalance
        })
      } else {
        newBalance = +this.state.savingsBalance - inputAmount
        this.setState({
          savingsBalance: newBalance
        })
      }
    }
  }

  handleTransferClick = (transAmount, name) => {
    console.log("handleTransferClick works!")
    name = name.toLowerCase(name)
    let current = ''
    name === 'checking' ? current = this.state.checkingBalance : current = this.state.savingsBalance
    if (transAmount <= current && transAmount > 0) {
      if (name === 'checking') {
        this.setState({
          checkingBalance: this.state.checkingBalance - parseInt(transAmount),
          savingsBalance: this.state.savingsBalance + parseInt(transAmount)
        })
      } else {
        this.setState({
          checkingBalance: this.state.checkingBalance + parseInt(transAmount),
          savingsBalance: this.state.savingsBalance - parseInt(transAmount)
        })
      }
    }
  }

  render() {
    return (
      <div>
        <div id="nav">
          <div id="logo"><img src={logo} alt="General Assembly logo" /></div>
          <div id="title">Bank of GA</div>
        </div>
        <Account name="Checking"
          balance={this.state.checkingBalance}
          handleWithdrawalClick={this.handleWithdrawalClick}
          handleDepositClick={this.handleDepositClick}
          transfer={this.state.transferToChecking}
          handleTransferClick={this.handleTransferClick}
        />
        <Account name="Savings"
          balance={this.state.savingsBalance}
          handleWithdrawalClick={this.handleWithdrawalClick}
          handleDepositClick={this.handleDepositClick}
          transfer={this.state.transferToSavings}
          handleTransferClick={this.handleTransferClick}
        />
        <div className="clear"></div>
      </div>
    );
  }
}

export default App;
