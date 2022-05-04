//nho import baseurl va Loading component
import React, { Component } from 'react';
import { Card, CardTitle, CardImg, Form, Input, Row, Label, Col , Modal, ModalBody, ModalHeader, ModalFooter, FormFeedback} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform } from 'react-animation-components';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

function RenderStaffItem({ staff }) {
    return (
      <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
        <Card>
            <Link to={`/staffs/${staff.id}`}>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardTitle className="text-center"> {staff.name} </CardTitle>
            </Link>
        </Card>
        </FadeTransform>
    );
}
class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            strSearch: "",
            modalOpen: false,

            name: "",
            doB: "",
            salaryScale: 1,
            startDate: "",
            department: "Sale",
            annualLeave: 0,
            overTime: 0,
            salary: 0,
            image: "/assets/images/alberto.png",
            touched: {
              name: false,
              doB: false,
              salaryScale: false,
              startDate: false,
              department: false,
              annualLeave: false,
              overTime: false
            },
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
  
    }
    handleSearch(event) {
        
        event.preventDefault();
        this.setState({ strSearch: event.target.staffName.value })

    }
    toggleModal() {
        this.setState({
          modalOpen: !this.state.modalOpen
        });
      }
    handleSubmit(values) {
      console.log('Current State is: ' + JSON.stringify(values));
        const newStaff = {
            name: values.name,
            doB: this.state.doB,
            startDate: this.state.startDate,
            department: values.department,
            salaryScale: values.salaryScale,
            annualLeave: values.annualLeave,
            overTime: values.overTime,
            image: this.state.image
          };
          console.log(values);
        this.props.addStaff(newStaff);

        };
        handleInputChange(event){
          const target = event.target;
          const value =  target.value;
          const name = target.name;
      
          this.setState({
            [name]: value
          });
      }
      handleBlur = (field) => () => {
          this.setState({
              touched: { ...this.state.touched, [field]: true }
          });
      }
      validate(
          doB,
          startDate,
         
        ) {
          const errors = {
            doB: "",
            startDate: "",
          };
          
            if (this.state.touched.doB && doB.length < 1)
           errors.doB = "Yêu cầu nhập ngày sinh";
           if (this.state.touched.startDate && startDate.length < 1)
            errors.startDate = "Yêu cầu nhập ngày vào công ty";
          
          return errors;
        }
      
    render() {
      const errors = this.validate( 
        this.state.doB,
        this.state.startDate,
      
      );
        
        let staffListOrigin = this.props.staffs.staffs;//nho la truuyen staffs tu Main qua la staff nay :Staffs = (state = { 
      //     isLoading: true,
      //     errMess: null,
      //     staffs:[]
      // },  action) => 
        let staffListSearch = [];
        const search = this.state.strSearch;
        if (search.length > 0) {
            staffListOrigin.forEach((staff) => {
                if (staff.name.toLowerCase().indexOf(search) !== -1) {
                    staffListSearch.push(staff)
                }
            })
        }
        else {
            staffListSearch = staffListOrigin
        }

        const staffList = staffListSearch.map((staff) => {
            return (

                <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3" key={staff.id}>
                    <RenderStaffItem staff={staff} />
                </div>
            );
        });
        
        return (
            
            <div className="container">
                <div className="col-12 col-md-6 mt-3">
                    <form onSubmit={this.handleSearch} className="form-group row">
                        <div className="col-8 col-md-8">
                            <input
                                type="text"
                                name="staffName"
                                className="form-control"
                                placeholder="Tìm kiếm nhân viên ..."
                            />
                        </div>
                        <div className="col-4 col-md-4">
                            <button className="btn btn-secondary" type="submit">
                                Tìm kiếm
                            </button>
                            <button className="btn btn-secondary" onClick={this.toggleModal}> <span className="fa fa-plus fa-lg"></span></button>
                        </div>
                    </form>
                </div>
                {/* //form thêm nhăn viên */}
          
            <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                <Row className="form-group">            
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name" 
                    className="form-control"
                    id="name"
                    name="name"
                    defaultValue={this.state.name}
                    validators={{
                      required,
                      minLength:minLength(3),
                      maxLength:maxLength(30)
                  }}
                  />
                   <Errors 
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 3 characters',
                          maxLength: 'Must be 30 characters or less'
                      }}
                      />
        
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                <Input
                    type="date"
                    name="doB"
                    id="doB"
                    value={this.state.doB}
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('doB')}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>  
              </Row>
              <Row className="control-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={this.state.startDate}
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('startDate')}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
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
                    defaultValue={this.state.department}
                    validators={{
                      required,
                     
                  }}
                  >
                
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                  <Errors 
                      className="text-danger"
                      model=".department"
                      show="touched"
                      messages={{
                          required: 'Required',
                    
                      }}
                      />
        
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
                    validators={{
                      required,
                      isNumber
                    }}            
                  />
                  <Errors 
                      className="text-danger"
                      model=".salaryScale"
                      show="touched"
                      messages={{
                          required: 'Required',
                          isNumber: "Must be a number"
                      }}
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
                    validators={{
                      required,
                      isNumber
                    }}
                  />
                   <Errors 
                      className="text-danger"
                      model=".annualLeave"
                      show="touched"
                      messages={{
                          required: 'Required',
                          isNumber: "Must be a number"
                      }}
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
                    validators={{
                      required,
                      isNumber
                    }}
                  />
               
                <Errors 
                      className="text-danger"
                      model=".overTime"
                      show="touched"
                      messages={{
                          required: 'Required',
                          isNumber: "Must be a number"
                      }}
                      
                />
                 </Col>
  
              </Row>
              <ModalFooter>
                  <button type="submit" className="btn btn-secondary">
                    Thêm
                  </button>

              </ModalFooter>
              </LocalForm>
              </ModalBody>
              

           
               
            </Modal>
                
                    <div className="col-12">
                        <h3>Nhân viên </h3>
                        <hr />
                    </div>
                    <div className="row">
                        {staffList}
                    </div>
                </div>



        );
        
    }
    
}

export default StaffList;