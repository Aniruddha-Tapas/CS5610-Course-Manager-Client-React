import React from 'react'

class TopicPills extends React.Component {
    render() {
        return (
            <div>
                <h3>Topic Pills</h3>
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