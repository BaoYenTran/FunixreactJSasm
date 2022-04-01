import React, { Component} from 'react';
import { Card, CardTitle, CardText,CardImg } from 'reactstrap';
import dateFormat from 'dateformat';

class StaffList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStaff: null
        }

    }
    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff })
    }
    renderStaff(staff) {
        if (staff != null) {
            return (
                <div className="col-12 col-md-6 col-lg-4 mt-1">
                    <Card >
                        <CardTitle> Họ và Tên : {staff.name} </CardTitle>
                        <CardText> Ngày sinh : {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText> Ngày vào công ty : {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText> Phòng ban : {staff.department.name}</CardText>
                        <CardText> Số ngày nghỉ còn lại : {staff.annualLeave}</CardText>
                        <CardText> Số ngày đã làm thêm : {staff.overTime}</CardText>
                    </Card>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
    render() {
    
        const staffList = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-1">
                    <Card onClick={() => this.onStaffSelect(staff)}>
                        <CardTitle className="text-center"> {staff.name} </CardTitle>
                        <CardImg width="100%" src = {staff.image} alt= {staff.name} />
                        
                    </Card>
                </div>
            )
        });

        return (
            <div>

                <div className="container-fluid">
                    <div className="row">
                        {staffList}
                    </div>
                    <div className="row">
                        {this.renderStaff(this.state.selectedStaff)}
                    </div>

                </div>
            </div>

        );
    }
}
export default StaffList;