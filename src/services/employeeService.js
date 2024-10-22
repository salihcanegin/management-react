import axiosInstance from "./axiosInstance"; 

const BASE_URL = 'http://localhost:8080/v1/employees'

export const listEmployees = () => axiosInstance.get(BASE_URL);

export const createEmployee = (employee) => axiosInstance.post(BASE_URL, employee);

export const updateEmployee = (id, employee) => axiosInstance.patch(BASE_URL  + "/" + id, employee);

export const deleteEmployee = (id) => axiosInstance.delete(BASE_URL  + "/" + id);