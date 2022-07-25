import React from 'react'
import ReactHtmlParser from "react-html-parser";

export default function InfoMain(props) {
    const {projectDetail} = props;
    const renderAvatar = () => {

        return projectDetail.members && projectDetail.members.map((user, index) => {
            return <div key={index} className="avatar">
                <img src={user.avatar} alt={user.avatar} />
            </div>
        })
    }
    return (
        <>
            <h3>{projectDetail.projectName}</h3>
            <section>
                {ReactHtmlParser(projectDetail.description)}
            </section>
            <div className="info" style={{ display: 'flex' }}>
                <label>Member Assgined:</label>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatar()}
                </div>
                
            </div>
        </>

    )
}