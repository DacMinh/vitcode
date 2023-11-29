import axios from "./axiosConfig"

const getDataAll = () => {
    return axios.get('/api/v1/users/all')
}

const createNewUser = (formData) => {
    return axios.post("/api/v1/users", { ...formData })
};
const updateCrurrentUser = (formData) => {
    return axios.patch("/api/v1/users", { ...formData })
}

const DeleteUser = (deleteModal) => {
    return axios.delete(`/api/v1/users/${deleteModal._id}`);
}
const login = () => {
    return axios.post("/api/v1/auth/login")
}

export { createNewUser, updateCrurrentUser, getDataAll, DeleteUser }