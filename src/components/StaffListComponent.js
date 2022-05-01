import React, { Component } from 'react';
import { Card, CardTitle, CardImg, Form, Input, Row, Label, Col, Modal, ModalBody, ModalHeader, ModalFooter, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderStaffItem({ staff }) {
  return (
    <Card>
      <Link to={`/staffs/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardTitle className="text-center"> {staff.name} </CardTitle>
      </Link>
    </Card>
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
  handleSubmit() {
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      startDate: this.state.startDate,
      department: this.state.department,
      salaryScale: this.state.salaryScale,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: this.state.image
    };

    this.props.addStaff(newStaff);

  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
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
    name,
    doB,
    startDate,
    department,
    salaryScale,
    annualLeave,
    overTime
  ) {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
      department: "",
      salaryScale: "",
      annualLeave: "",
      overTime: ""
    };
    if (this.state.touched.name && name.length < 3)
      errors.name = "Tên phải dài hơn 3 ký tự";
    else if (this.state.touched.name && name.length > 30)
      errors.name = "Tên phải ngắn hơn 30 ký tự";
    if (this.state.touched.doB && doB.length < 1)
      errors.doB = "Yêu cầu nhập ngày sinh";
    if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = "Yêu cầu nhập ngày vào công ty";
    if (this.state.touched.department && department.length < 1)
      errors.department = "Yêu cầu nhập phòng ban";
    if (this.state.touched.salaryScale && salaryScale.length < 1)
      errors.salaryScale = "Yêu cầu nhập hệ số";
    if (this.state.touched.annualLeave && annualLeave.length < 1)
      errors.annualLeave = "Yêu cầu nhập số ngày";
    if (this.state.touched.overTime && overTime.length < 1)
      errors.overTime = "Yêu cầu nhập số ngày";


    return errors;
  }
  render() {

    let staffListOrigin = this.props.staffs;
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
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate,
      this.state.department,
      this.state.salaryScale,
      this.state.annualLeave,
      this.state.overTime
    );

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
            <Form onSubmit={this.handleSubmit}>
              <Row className="control-group">
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('name')}

                  />
                  <FormFeedback>{errors.name}</FormFeedback>
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
                  <Input
                    type="select"
                    name="department"
                    id="department"
                    className="form-control"
                    value={this.state.department}
                    valid={errors.department === ""}
                    invalid={errors.department !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('department')}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="salaryScale"
                    name="salaryScale"
                    className="form-control"
                    value={this.state.salaryScale}
                    valid={errors.salaryScale === ""}
                    invalid={errors.salaryScale !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('salaryScale')}
                  />
                  <FormFeedback>{errors.salaryScale}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    value={this.state.annualLeave}
                    valid={errors.annualLeave === ""}
                    invalid={errors.annualLeave !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('annualLeave')}
                  />
                  <FormFeedback>{errors.annualLeave}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="overTime"
                    name="overTime"
                    className="form-control"
                    value={this.state.overTime}
                    valid={errors.overTime === ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('overTime')}
                  />
                </Col>
                <FormFeedback>{errors.overTime}</FormFeedback>
              </Row>
              <ModalFooter>
                <button type="submit" className="btn btn-secondary">
                  Thêm
                </button>

              </ModalFooter>
            </Form>
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