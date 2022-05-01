import React, { Component} from 'react';
import { Card, CardTitle,CardImg  } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderStaffItem({staff}) {
    return (
    <Card>
        <Link to={`/staffs/${staff.id}`}>
            <CardImg width="100%" src = {staff.image} alt= {staff.name} />
            <CardTitle className="text-center"> {staff.name} </CardTitle>               
        </Link>
    </Card>
    );
}
const StaffList = (props) => {
    const staffList = props.staffs.map((staff) => {
    return (
        <div key={staff.id  } className="col-6 col-md-4 col-lg-2 mt-1">
            <RenderStaffItem staff={staff} />
        </div>
    )
});

return (


        <div className="container">
            <div className ="col-12">
                <h3>Nhân viên </h3>
                <hr/>
            </div>
            <div className="row">
                {staffList}
            </div>
            

        </div>
    

);
}

export default StaffList;