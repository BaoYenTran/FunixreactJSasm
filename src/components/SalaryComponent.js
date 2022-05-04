import React from "react";
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';
const luongCB = 3000000;
const luongOT = 200000;
function RenderSalary({ salary }) {

    return (
        <Card className=" bg-white">
            <CardTitle className="p-3">{salary.name}</CardTitle>
            <CardBody className="p-3">
                <CardText>Mã nhân viên: {salary.id}</CardText>
                <CardText>Hệ số lương: {salary.salaryScale}</CardText>
                <CardText>Số giờ làm thêm: {salary.overTime}</CardText>
                <CardText className="bg-light shadow"><i>Lương: {(luongCB * salary.salaryScale + luongOT * salary.overTime).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</i></CardText>
            </CardBody>
        </Card>
    );

}

const Salary = (props) => {

    const salary = props.staffs.map((staff) => {
        return (
            <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={staff.id}>
                <RenderSalary salary={staff} />
            </div>
        )
    })
    return (
        <div className="container">
            <div className="row shadow m-3">
                {salary}
            </div>
        </div>
    );
}


export default Salary;