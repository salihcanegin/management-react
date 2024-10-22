import React, { useEffect, useState } from 'react';
import { listStudentsOfCourse, getCourseById, updateCourse } from '../../services/courseService';
import { updateStudent, createStudent, deleteStudent, addCourse } from '../../services/studentService';
import { useParams } from 'react-router-dom';
import EntityForm from "../common/Modal"

const Course = () => {
    const { courseId } = useParams();

    const [students, setStudents] = useState([]);
    const [course, setCourse] = useState(null);
    const [page, setPage] = useState(0);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        getCourseById(courseId).then((response) => {
            setCourse(response.data);
        }).catch(error => {
            console.error('Error fetching course:', error);
        });

        listStudentsOfCourse(courseId, page).then((response) => {
            setStudents(response.data.content);
        }).catch(error => {
            console.error(error);
        });

    }, [courseId, page]);

    useEffect(() => {
        setPage(0);
    }, [courseId]);

    const handleShowUpdateModal = (student) => {
        setSelectedStudent(student);
        setShowUpdateModal(true);
    };

    const handleShowUpdateCourseModal = () => {
        setShowUpdateCourseModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedStudent(null);
    };

    const handleCloseUpdateCourseModal = () => {
        setShowUpdateCourseModal(false);
    };

    const handleUpdateStudent = (updatedStudent) => {
        updateStudent(updatedStudent.id, updatedStudent)
            .then(() => {
                setStudents((prev) =>
                    prev.map((emp) => (emp.id === updatedStudent.id ? updatedStudent : emp))
                );
                setShowUpdateModal(false);
            })
            .catch((error) => {
                console.error('Error updating student:', error);
            });
    };

    const handleUpdateCourse = (course) => {
        updateCourse(course.id, course)
            .then(() => {
                setCourse(course);
                setShowUpdateCourseModal(false);
            })
            .catch((error) => {
                console.error('Error updating course:', error);
            });
    };

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleAddStudent = (newStudent) => {
        createStudent(newStudent)
            .then((response) => {
                setStudents([...students, response.data]);
                setShowAddModal(false);
            })
            .catch((error) => {
                console.error('Error adding student:', error);
            });
    };

    const handleDeleteStudent = (student) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            deleteStudent(student.id)
                .then(() => {
                    setStudents((prev) => prev.filter(emp => emp.id !== student.id));
                })
                .catch((error) => {
                    console.error('Error deleting student:', error);
                });
        }
    };

    const studentFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true }
    ];

    const courseFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'code', label: 'Code', type: 'text', required: true }
    ];

    return (
        <div className='container'>
            {/* Course Info Section */}
            {course && (
                <div className="course-info mb-4">
                    <h2>{course.name}</h2>
                    <p><strong>Id:</strong> {course.id}</p>
                    <p><strong>Name:</strong> {course.name}</p>
                    <p><strong>Code:</strong> {course.code}</p>
                    <button className='btn btn-primary mb-2' onClick={handleShowUpdateCourseModal}>Update Course</button>
                </div>
            )}

            {/* Students Section */}
            <h2 className='text-center'>Students</h2>
            <button className='btn btn-primary mb-2' onClick={handleShowAddModal}>Add Student</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student =>
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => handleShowUpdateModal(student)}>View / Update</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteStudent(student)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className='btn' onClick={() => setPage((prev) => prev - 1 || 0)}>Previous</button>
            <button className='btn' onClick={() => setPage((prev) => prev + 1)}>Next</button>

            <EntityForm
                isOpen={showUpdateModal}
                onClose={handleCloseUpdateModal}
                entity={selectedStudent}
                onSave={handleUpdateStudent}
                title="Update Student"
                fields={studentFields}
            />

            <EntityForm
                isOpen={showAddModal}
                onClose={handleCloseAddModal}
                onSave={handleAddStudent}
                title="Add New Student"
                fields={studentFields}
            />

            <EntityForm
                isOpen={showUpdateCourseModal}
                onClose={handleCloseUpdateCourseModal}
                entity={course}
                onSave={handleUpdateCourse}
                title="Update Course"
                fields={courseFields}
            />
        </div>
    );
}

export default Course;