import React, { Component } from "react";
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';

class RenderDept extends Component {
    render() {
        return (
            <Card>
                <Link to={`/departments/${this.props.dept.id}`}>

                    <CardTitle className="m-2">{this.props.dept.name}</CardTitle>
                    <CardBody>
                        <CardText>Số lượng nhân viên: {this.props.staffNo.length}</CardText>
                    </CardBody>

                </Link>
            </Card>
        );
    }


}

class Department extends Component {
    render() {
        const departments = this.props.departments.map((department) => {

            return (
                <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={department.id}>
                    <RenderDept dept={department} staffNo={this.props.staffs.filter(
                        (staff) => staff.departmentId === department.id
                    )} />
                </div>
            )
        })
        return (
            <div className="container">
                <div className="row shadow m-3">
                    {departments}
                </div>
            </div>
        );
    }
}

export default Department;