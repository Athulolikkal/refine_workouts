import axios from "axios"
const BaseUrl = "http://localhost:3000"
const instance= axios.create({
    baseURL:BaseUrl,
    headers: {
        "Content-Type": "application/json", 
      },
})
 export default instance