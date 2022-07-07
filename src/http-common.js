import axios from "axios";
// import authHeader from "@/services/auth-header";

export default axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    // baseURL: "https://protected-meadow-53794.herokuapp.com/api/",
    // headers: authHeader()
});
