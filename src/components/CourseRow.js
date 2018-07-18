import React from 'react';
import {Link} from 'react-router-dom'

class CourseRow extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    <Link to={`/course/${this.props.course.id}/edit`}>
                        {this.props.course.title}
                    </Link>
                </td>

                < td>
                    {this.props.course.created.substr(0, 10)}
                </td>
                <td>
                    {this.props.course.modified.substr(0, 10)}
                </td>
                <td>
                    <button className="btn btn-outline-danger"
                            type="button"
                            onClick={() => this.props.delete(this.props.course.id)}>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}

export default CourseRow;