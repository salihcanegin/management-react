import axiosInstance from "./axiosInstance"; 

const BASE_URL = '/v1/students'

export const listStudents = () => axiosInstance.get(BASE_URL);

export const createStudent = (student) => axiosInstance.post(BASE_URL, student);

export const updateStudent = (id, student) => axiosInstance.patch(BASE_URL  + "/" + id, student);

export const deleteStudent = (id) => axiosInstance.delete(BASE_URL  + "/" + id);

export const addCourse = (id, courseId) => axiosInstance.post(BASE_URL + "/" + id + "/courses" + "/" + courseId);

export const dropCourse = (id, courseId) => axiosInstance.delete(BASE_URL + "/" + id + "/courses" + "/" + courseId);