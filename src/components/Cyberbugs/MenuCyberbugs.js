import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuCyberbugs() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require("../../assets/img/download.jfif")} alt="" />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <NavLink className="menu__link" to="/home">
                        <i className="fa fa-credit-card" />
                        <span> Home</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink className="menu__link" to="/createproject">
                        <i className="fa fa-cog" />
                        <span> Create Project</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink className="menu__link" to="/projectmanagement">
                        <i className="fa fa-cog" />
                        <span> Project Management</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink className="menu__link" to="/usermanagement">
                        <i className="fa fa-cog" />
                        <span> Management User</span>
                    </NavLink>
                </div>

            </div>

        </div>


    )
}