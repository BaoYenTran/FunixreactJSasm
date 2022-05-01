import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem,NavbarToggler, Collapse, Nav } from 'reactstrap';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state ={
          isNavOpen:false
        }
        this.toggleNav= this.toggleNav.bind(this);
      }
      toggleNav() {
        this.setState({isNavOpen : !this.state.isNavOpen});
      }
    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/" ><span><img src='assets/images/logo.png' height="30" width="41" alt="logo.png"></img></span> </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link  mr-auto " to='/staffs'> <i className="fa fa-user-circle"></i>Nhân viên
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/departments'><span className="fa fa-id-card-o fa-lg"></span> Phòng ban
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/salary'><span className="fa fa-money fa-lg"></span> Bảng Lương
                            </NavLink>
                        </NavItem>
                        </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                    
            </React.Fragment>
        )
    }
}
export default Header;