import React, {Component} from "react";
import {
  CardImg,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal, ModalBody, ModalHeader, ModalFooter, Row, Label, Col
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from 'dateformat';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';
import {Control, LocalForm } from 'react-redux-form';

function RenderStaff({ staff, dept }) {
  console.log(dept);
  if (staff != null && dept != null) {
    console.log(dept.name)
    return (
      
      <div className="col-12">
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3 ">
            <CardImg width="100%" src={staff.image} alt={staff.name} />
          
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <CardTitle>Họ và tên: {staff.name}</CardTitle>
            <CardText>
              Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
            </CardText>
            <CardText>
              Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
            </CardText>
            <CardText>Phòng ban: {dept.name}</CardText>
            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
            <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
           
          </div>
         
        </div>
        </FadeTransform>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const StaffDetail = (props) => {
   
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
  else if (props.staff != null) {
    console.log(props.dept);
    return (
        
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.staff.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row mb-4">
          <RenderStaff staff={props.staff} dept={props.dept.filter(
                      (dp) => dp.id === props.staff.departmentId)[0]} />
                      {/* chu y can phai filter lai dept tuong ung voi nhan vien */}
          
        </div>
        <div className="mb-4">
          <UpdateStaff onUpdateStaff={props.onUpdateStaff} staff={props.staff}></UpdateStaff>
          
        </div>

      </div>
    );
  } else {
    return <div></div>;
  }
};
class UpdateStaff extends Component {
  constructor(props) {
    super(props);

    this.state = {
        modalOpen: false,
        staff:props.staff
        }
      
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  
  }
  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }
handleSubmit(values) {
  
  console.log('Current State is: ' + JSON.stringify(values));
    const updateStaff = {
        name: values.name,
        doB: values.doB,
        startDate: values.startDate,
        departmentId: this.state.departmentId,
        salaryScale: values.salaryScale,
        annualLeave: values.annualLeave,
        overTime: values.overTime,
        image: "/assets/images/alberto.png",
        salary: 3000000
      };
      console.log(updateStaff);
console.log(this.props.onUpdateStaff);
    this.props.onUpdateStaff(updateStaff);
console.log(this.props.staff);
    this.setState({
      modalOpen: !this.state.modalOpen
    });

    };
    handleInputChange(event){
      event.preventDefault();
      const target = event.target;
      const value =  target.value;
      const name = target.name;
  
      this.setState({
        staff: {...this.state.staff, [name] :value}
      });
  }


  render () {
return (
    <div>
    <button className="btn btn-secondary" onClick={this.toggleModal}> Update </button>
    <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>Chỉnh sửa Nhân Viên</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                <Row className="form-group">            
                <Label htmlFor="name" md={4}>
                  Họ Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name" 
                    className="form-control"
                    id="name"
                    name="name"
                    defaultValue={this.state.name}
                   
                  />
                   
  
        
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                <Control.text
                    type="date"
                    model=".doB"
                    name="doB"
                    id="doB"
                    value={this.state.doB}
                   
                    onChange={this.handleInputChange}
                 
                  />
                 
                </Col>  
              </Row>
              <Row className="control-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                <Control.text
                    type="date"
                    model=".startDate"
                    name="startDate"
                    id="startDate"
                    value={this.state.startDate}
                   
                    onChange={this.handleInputChange}
                  
                  />
            
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    name="department"
                    id="department"
                    className="form-control"
              
            
                  //chu y set lai deptId cho dung voi deparment chon bang cach gan value cho moi option
                  onChange={(e) =>
                    this.setState({ departmentId: e.target.value })
                  }
                  >
                
                    <option value="Dept01">Sale</option>
                    <option  value="Dept02">HR</option>
                    <option value="Dept03">Marketing</option>
                    <option value="Dept04">IT</option>
                    <option value="Dept05">Finance</option>
                  </Control.select>
                 
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    className="form-control"
                    defaultValue="1"  
                        
                  />
                 
              
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    defaultValue={this.state.annualLeave}
                   
                  />
                  
      
          
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                  model=".overTime"
                    id="overTime"
                    name="overTime"
                    className="form-control"
                    defaultValue={this.state.overTime}
                   
                  />
               
               
                  
                 </Col>
  
              </Row>
              <ModalFooter>
                  <button type="submit" className="btn btn-secondary">
                    Lưu lại
                  </button>

              </ModalFooter>
              </LocalForm>
              </ModalBody>
              

           
               
            </Modal>
            </div>
 ) }}
export default StaffDetail;
