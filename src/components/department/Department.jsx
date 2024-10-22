import React, { useEffect, useState } from 'react';
import { listEmployeesOfDepartment, getDepartmentById, updateDepartment } from '../../services/departmentService';
import { updateEmployee, createEmployee, deleteEmployee } from '../../services/employeeService';
import { useParams } from 'react-router-dom';
import Modal from "../common/Modal"

const Department = () => {
    const { departmentId } = useParams();
    const [employees, setEmployees] = useState([]);
    const [department, setDepartment] = useState(null);
    const [page, setPage] = useState(0);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showUpdateDepartmentModal, setShowUpdateDepartmentModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        getDepartmentById(departmentId).then((response) => {
            setDepartment(response.data);
        }).catch(error => {
            console.error('Error fetching department:', error);
        });

        listEmployeesOfDepartment(departmentId, page).then((response) => {
            setEmployees(response.data.content);
        }).catch(error => {
            console.error(error);
        });

    }, [departmentId, page]);

    useEffect(() => {
        setPage(0);
    }, [departmentId]);

    const handleShowUpdateModal = (employee) => {
        setSelectedEmployee(employee);
        setShowUpdateModal(true);
    };

    const handleShowUpdateDepartmentModal = () => {
        setShowUpdateDepartmentModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedEmployee(null);
    };

    const handleCloseUpdateDepartmentModal = () => {
        setShowUpdateDepartmentModal(false);
    };

    const handleUpdateEmployee = (updatedEmployee) => {
        updateEmployee(updatedEmployee.id, updatedEmployee)
            .then(() => {
                setEmployees((prev) =>
                    prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
                );
                setShowUpdateModal(false);
            })
            .catch((error) => {
                console.error('Error updating employee:', error);
            });
    };

    const handleUpdateDepartment = (department) => {
        updateDepartment(department.id, department)
            .then(() => {
                setDepartment(department);
                setShowUpdateDepartmentModal(false);
            })
            .catch((error) => {
                console.error('Error updating department:', error);
            });
    };

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleAddEmployee = (newEmployee) => {
        const request = {
            ...newEmployee,
            departmentId: departmentId
        };
        createEmployee(request)
            .then((response) => {
                setEmployees([...employees, response.data]);
                setShowAddModal(false);
            })
            .catch((error) => {
                console.error('Error adding employee:', error);
            });
    };

    const handleDeleteEmployee = (employee) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            deleteEmployee(employee.id)
                .then(() => {
                    setEmployees((prev) => prev.filter(emp => emp.id !== employee.id));
                })
                .catch((error) => {
                    console.error('Error deleting employee:', error);
                });
        }
    };

    const employeeFieldsForUpdate = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'departmentId', label: 'Department Id', type: 'number', required: false },
    ];

    const departmentFields = [
        { name: 'name', label: 'Name', type: 'text', required: true }
    ];

    const employeeFieldsForAdd = employeeFieldsForUpdate.filter(field => field.name !== 'departmentId');

    return (
        <div className='container'>
            {department && (
                <div className="department-info mb-4">
                    <h2>{department.name}</h2>
                    <p><strong>Id:</strong> {department.id}</p>
                    <p><strong>Name:</strong> {department.name}</p>
                    <button className='btn btn-primary mb-2' onClick={handleShowUpdateDepartmentModal}>Update Department</button>
                </div>
            )}

            <h2 className='text-center'>Employees</h2>
            <button className='btn btn-primary mb-2' onClick={handleShowAddModal}>Add Employee</button>
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
                    {employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => handleShowUpdateModal(employee)}>View / Update</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteEmployee(employee)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className='btn' onClick={() => setPage((prev) => prev - 1 || 0)}>Previous</button>
            <button className='btn' onClick={() => setPage((prev) => prev + 1)}>Next</button>

            <Modal
                isOpen={showUpdateModal}
                onClose={handleCloseUpdateModal}
                entity={selectedEmployee}
                onSave={handleUpdateEmployee}
                title="Update Employee"
                fields={employeeFieldsForUpdate}
            />

            <Modal
                isOpen={showAddModal}
                onClose={handleCloseAddModal}
                onSave={handleAddEmployee}
                title="Add New Employee"
                fields={employeeFieldsForAdd}
            />

            <Modal
                isOpen={showUpdateDepartmentModal}
                onClose={handleCloseUpdateDepartmentModal}
                entity={department}
                onSave={handleUpdateDepartment}
                title="Update Department"
                fields={departmentFields}
            />
        </div>
    );
}

export default Department;