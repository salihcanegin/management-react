import axiosInstance from "./axiosInstance"; 

const BASE_URL = '/v1/courses'

export const listCourses = () => axiosInstance.get(BASE_URL);

export const getCourseById = (courseId) => axiosInstance.get(BASE_URL  + "/" + courseId);

export const listStudentsOfCourse = (courseId, page) => axiosInstance.get(BASE_URL + "/" + courseId + "/students" + "?page=");

export const createCourse = (course) => axiosInstance.post(BASE_URL, course);

export const updateCourse = (id, course) => axiosInstance.patch(BASE_URL  + "/" + id, course);