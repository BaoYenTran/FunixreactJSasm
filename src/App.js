import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {STAFFS} from './shared/staffs.jsx'
import StaffList from './components/StaffListComponent'
class App extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      staffs: STAFFS
    };
  }
  render () {
  return (
    
    <StaffList staffs={this.state.staffs}/>
    
  );
};
}
export default App;
