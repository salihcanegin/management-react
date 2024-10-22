import axiosInstance from "./axiosInstance"; 

const BASE_URL = '/v1/departments'

export const listDepartments = () => axiosInstance.get(BASE_URL);

export const getDepartmentById = (departmentId) => axiosInstance.get(BASE_URL  + "/" + departmentId);

export const listEmployeesOfDepartment = (departmentId, page) => axiosInstance.get(BASE_URL + "/" + departmentId + "/employees" + "?page=" + page);

export const createDepartment = (department) => axiosInstance.post(BASE_URL, department);

export const updateDepartment = (id, department) => axiosInstance.patch(BASE_URL  + "/" + id, department);