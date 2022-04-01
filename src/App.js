import React, { Component } from 'react';
import './App.css';
import { STAFFS } from './shared/staffs.jsx'
import StaffList from './components/StaffListComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
    };
  }
  
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand className="text-center" href="/">ỨNG DỤNG QUẢN LÝ NHÂN SỰ  </NavbarBrand>
          </div>
        </Navbar>
        <StaffList staffs={this.state.staffs} col={this.state.className} />
      </div>
    );
  };
}
export default App;
