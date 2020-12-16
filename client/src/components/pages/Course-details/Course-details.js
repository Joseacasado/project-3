import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CoursesService from './../../../service/courses.service'
import AddComments from './../../shared/AddComments/AddComments'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './Course-details.css'

import Loader from './../../shared/Spinner/Loader'


class CourseDetails extends Component {
    constructor() {
        super()
        this.state = {
            course: undefined,
            showModal: false
        }

        this.coursesService = new CoursesService()
    }

    componentDidMount = () => {
        const course_id = this.props.match.params.course_id

        this.coursesService
            .getCourse(course_id)
            .then(res => this.setState({ course: res.data }))
            .catch(() => {
                this.props.history.push('/courses')
                this.props.handleToast(true, 'An error has occurred, please try again later', 'red')
            })
    }

    toggleInput = () => {
        //alert('funoncia!!!')
        //this.setState({ showInput: true })
        this.setState({ showInput: !this.state.showInput })
    }

    render() {
        return (
            <Container className="course-details ">
                {this.state.course
                    ?
                    <>
                        <section className="header">
                            <Row>
                                <Col md={{ span: 8 }} >
                                    <h1>{this.state.course.title}</h1>
                                    <p><em> {this.state.course.lead}</em></p>

                                    {this.state.course.owner ?
                                        <p style={{ color: '#73726c', fontWeight: 700 }}>Created by {this.state.course.owner.name} {this.state.course.owner.surname}</p>
                                        :
                                        null
                                    }
                                    <p><strong>Category:</strong> {this.state.course.category} | <strong>Difficulty Level:</strong>  {this.state.course.difficultyLevel} | <strong>Price:</strong>  {this.state.course.price} € | <strong>Duration:</strong>  {this.state.course.duration} hrs.</p>
                                </Col>
                                <Col md={{ span: 4 }} >
                                    <img className="mb-3 course-img" src={this.state.course.imageUrl} alt={this.state.course.title} />
                                </Col>
                            </Row>
                        </section>

                        <section className="course-bckg">
                            <Row>
                                <Col>
                                    <h3 className="mt-5 mb-3">Description</h3>
                                    <p>{this.state.course.description}</p>

                                    <h3 className="mt-5 mb-4">What you will learn:</h3>
                                    <ul className="whatYouWillLearn">
                                        {this.state.course.whatYouWillLearn.map(elm => <li key={elm._id}><img src="https://res.cloudinary.com/dodneiokm/image/upload/v1607883391/project3-ironhack/checked_ib75gx.png" /><p>{elm}</p></li>)}
                                    </ul>
                                    <h3 className="mt-4 mb-4">Requirements:</h3>
                                    <ul className="requirements mb-4">
                                        {this.state.course.requirements.map(elm => <li key={elm._id}><img src="https://res.cloudinary.com/dodneiokm/image/upload/v1607887317/project3-ironhack/double-check_tm7qmy.png" /><p>{elm}</p></li>)}
                                    </ul>

                                    <Button onClick={this.toggleInput} className="mt-3 mb-3 start-course" >Start the course</Button>

                                    {/* Videos */}
                                    {this.state.showInput ?
                                        this.state.course.videos.map(elm =>
                                            <Card.Header className="video-card" key={elm._id}>
                                                <img src="https://res.cloudinary.com/dodneiokm/image/upload/v1607893554/project3-ironhack/play_u6mma0.png" alt="play icon" />
                                                <a href={elm} target="_blank" >Video {elm._id}</a>
                                            </Card.Header>
                                        )
                                        : null
                                    }
                                </Col>
                            </Row>
                        </section>


                        <section>
                            <AddComments courseId={this.state.course._id} loggedUser={this.props.loggedUser} history={this.props.history} />
                        </section>


                        <Link to="/courses" className="btn btn-sm btn-outline-dark mt-5">Go back</Link>
                    </>
                    :
                    <Loader />
                }

            </Container>
        )
    }
}

export default CourseDetails


