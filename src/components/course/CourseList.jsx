import React, { useEffect, useState } from 'react'
import { listCourses, createCourse } from '../../services/courseService'
import { useNavigate } from 'react-router-dom'
import EntityForm from "../common/Modal"

const CourseList = ({ setCourseId }) => {
    const [courses, setCourses] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        listCourses().then((response) => {
            setCourses(response.data.content)
        }).catch(error => {
            console.error(error);
        })

    }, []);

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleView = (id) => {
        navigator(`/courses/${id}`);
    };

    const handleAddCourse = (newCourse) => {
        createCourse(newCourse)
            .then((response) => {
                setCourses([...courses, response.data]);
                setShowAddModal(false);
            })
            .catch((error) => {
                console.error('Error adding course:', error);
            });
    };


    const courseFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'code', label: 'Code', type: 'text', required: true }
    ];

    return (
        <div className='container'>
            <h2 className='text-center'>Courses</h2>
            <button className='btn btn-primary mb-2' onClick={handleShowAddModal}>Add Course</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course =>
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course.code}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => handleView(course.id)}>View</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <EntityForm
                isOpen={showAddModal}
                onClose={handleCloseAddModal}
                onSave={handleAddCourse}
                title="Add New Course"
                fields={courseFields}
            />
        </div>
    )
}

export default CourseList