import React, { Component } from 'react';
import { STAFFS, DEPARTMENTS } from '../shared/staffs.jsx'
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS
    };
    this.addStaff = this.addStaff.bind(this);
  }
  addStaff = (staff) => {
    const id = uuidv4();
    const newStaff = { id, ...staff };
    this.setState({
      staffs: [...this.state.staffs, newStaff]
    });

  };

  render() {


    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
        />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          {/* <Route path="/home" component={HomePage} /> */}
          <Route exact path="/staffs" component={() => <StaffList addStaff={this.addStaff} staffs={this.state.staffs} />} />
          <Route exact path="/salary" component={() => <Salary staffs={this.state.staffs} />} />
          <Route path="/departments" component={() => <Department departments={this.state.departments} />} />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Redirect to="/staffs"></Redirect>
        </Switch>

        <Footer></Footer>
      </div>

    )
  }
}
export default Main;