import React, { Component } from 'react';
import { connect } from 'react-redux';

const NavBar = (props) => {
    const NavBar = 'navbar';

    const userLinks = (<ul className="nav navbar-nav pull-right">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Notifications</a></li>
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">Logout</a></li>
                        </ul>);

    const guestLinks = (<ul className="nav navbar-nav pull-right">
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Signup</a></li>
                        </ul>);

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                <a className="navbar-brand" href="#">Twaddler</a>
                </div>
                {props.auth.user.token ? userLinks : guestLinks}
                <form className="navbar-form navbar-left">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button className="btn btn-default" type="submit">
                    <i className="glyphicon glyphicon-search"></i>
                </button>
                </form>
            </div>
        </nav>
    )
}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(NavBar);