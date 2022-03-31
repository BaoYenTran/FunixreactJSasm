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
      className: "col-12 col-md-6 col-lg-4 mt-1"
    };
    this.split2Columns = this.split2Columns.bind(this)
    this.split3Columns = this.split3Columns.bind(this)
    this.split6Columns = this.split6Columns.bind(this)
  }
  split2Columns() {
    this.setState({ className: "col-12 col-md-6 col-lg-6 mt-0" })
  };

  split3Columns() {
    this.setState({ className: "col-12 col-md-6 col-lg-4 mt-0" })
  };
  split6Columns() {
    this.setState({ className: "col-12 col-md-6 col-lg-2 mt-0" })
  };
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand className="text-center" href="/">ỨNG DỤNG QUẢN LÝ NHÂN SỰ  </NavbarBrand>
          </div>
        </Navbar>
        <div>
                <button onClick={this.split2Columns} className="btn-warning">Chia 2 cột</button>
                <button onClick={this.split3Columns} className="btn-danger">Chia 3 cột </button>
                <button onClick={this.split6Columns} className="btn-info"  >Chia 6 cột </button>
            </div>


        <StaffList staffs={this.state.staffs} col={this.state.className} />
      </div>
    );
  };
}
export default App;
