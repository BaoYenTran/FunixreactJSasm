//b6 import fetchstaffs vaomain component, mapStatetoProps va dispatchtoprops, loading moi khi ra staff moi, errmess neu load ko ra, nho doi thanh props
import React, { Component} from 'react';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import DeptDetail from './DeptDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchStaffs } from '../redux/ActionCreators';
import { fetchDepartments } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//import { STAFFS, DEPARTMENTS } from '../shared/staffs.jsx'
//import { v4 as uuidv4 } from 'uuid';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,//lay staffs tu store ve
   departments:state.departments,
  }
}
const mapDispatchToProps = dispatch => ({

  fetchStaffs: () => { dispatch(fetchStaffs()) },
  fetchDepartments: () => { dispatch(fetchDepartments()) },

});
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          // staffs: STAFFS,
          //departments:DEPARTMENTS
        };
        // khong can nua vi lay tu server ve
        // this.addStaff = this.addStaff.bind(this);
      }

      componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartments()

        
      }
      
    // // addStaff = (staff) => {
    // //   const id = this.props.staffs.length;
    // //   const newStaff = { id, ...staff };
    // //   this.setState({
    // //     staffs: [...this.state.staffs, newStaff]
    // //   });
      
    // };
  
    render() {

      //staffwithid render ra staffdetail gom nhung staff co id khop voi params.staffId
      const StaffWithId = ({ match }) => {
        return (
          <StaffDetail
            staff={
              this.props.staffs.staffs.filter(
                (staff) => staff.id === parseInt(match.params.staffId, 10)
              )[0]}
              isLoading={this.props.staffs.isLoading}//xem action creator dong cuoi
              errMess={this.props.staffs.errMess}
          />
        );
          }
        //depwithid render ra dept co id khop voi param deptId
        //va staff co departmentId khop voi deptId
        //sau do vao DeptDetail
          const DeptWithId = ({ match }) => {
            return (
              <DeptDetail
               dept={
                  this.props.departments.departments.filter(
                    (dept) => dept.id === match.params.deptId//ghi chu deptId o day khong phai la so ma la dang dept01...
                  )[0]}
                  isLoading={this.props.departments.isLoading}//xem action creator dong cuoi
                  errMess={this.props.departments.errMess}
                staff={this.props.staffs.staffs.filter(
                  (staff) => staff.departmentId === match.params.deptId
                )}
              />
            );
              }

return (
    <div>
        <Header/>
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
        <Switch>
        {/* <Route path="/home" component={HomePage} /> */}
        <Route exact path="/staffs" component={ () =><StaffList addStaff={this.addStaff} staffs={this.props.staffs}/>}/>
        <Route exact path="/staffsSalary" component={ () =><Salary staffs={this.props.staffs.staffs}/>}/>
        <Route exact path="/departments" component={ () =><Department departments={this.props.departments.departments}/>}/>
        {/* chu y exact path cho departments */}
        <Route path="/staffs/:staffId" component={StaffWithId}/>
        <Route path="/departments/:deptId" component={DeptWithId}/>
        <Redirect to="/staffs" />
      </Switch>
      </CSSTransition>
      </TransitionGroup>
        
        <Footer></Footer>
      </div>
      
)
}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));