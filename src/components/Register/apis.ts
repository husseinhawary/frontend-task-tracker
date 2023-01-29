import transformer from "../../units/transformer"
import API_URLS from "./apisUrls"

export const userRegisterAPI = (data) => {
    return transformer({
        method: "POST",
        url: API_URLS.userRegister,
        data,
    })
}