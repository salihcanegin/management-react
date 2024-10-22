import React, { useEffect, useState } from 'react'
import { listDepartments, createDepartment } from '../../services/departmentService'
import { useNavigate } from 'react-router-dom'
import Modal from "../common/Modal"

const DepartmentList = ({ setDepartmentId }) => {
    const [departments, setDepartments] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        listDepartments().then((response) => {
            setDepartments(response.data.content)
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
        navigator(`/departments/${id}`);
    };

    const handleAddDepartment = (newDepartment) => {
        createDepartment(newDepartment)
            .then((response) => {
                setDepartments([...departments, response.data]);
                setShowAddModal(false);
            })
            .catch((error) => {
                console.error('Error adding department:', error);
            });
    };


    const departmentFields = [
        { name: 'name', label: 'Name', type: 'text', required: true }
    ];

    return (
        <div className='container'>
            <h2 className='text-center'>Departments</h2>
            <button className='btn btn-primary mb-2' onClick={handleShowAddModal}>Add Department</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(department =>
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.name}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => handleView(department.id)}>View</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Modal
                isOpen={showAddModal}
                onClose={handleCloseAddModal}
                onSave={handleAddDepartment}
                title="Add New Department"
                fields={departmentFields}
            />
        </div>
    )
}

export default DepartmentList