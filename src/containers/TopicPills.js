import React from 'react'

class TopicPills extends React.Component {
    render() {
        return (

            <div className="container-fluid" style={{width: '100%', height: '100%'}}>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>


            </div>
        )
    }
}

export default TopicPills;