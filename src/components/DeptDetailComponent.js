import React from "react";
import {
  CardImg,
  Card,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from 'dateformat';
import { Loading } from './LoadingComponent';

function RenderStaffInDept({ staff }) {
    return (
     <Card>
        
            <CardImg width="100%" src={staff.image} alt={staff.name} /> 
            <CardTitle>{staff.name}</CardTitle>
           
      </Card>
    );
}

const DeptDetail = (props) => {

    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  }
  //da filter ra duoc dept co id khop voi deptId params
  else if (props.dept != null && props.staff != null) {
    const staffs = props.staff.map((val) => (
        <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3" key={val.id}>
          <RenderStaffInDept staff={val} />
        </div>
    ))
    return (
        
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/departments">Phòng ban</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dept.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dept.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row mb-3">
          {staffs}
          
        </div>
      </div>
    );
  }
  else { return <div></div>} 
};

export default DeptDetail;
