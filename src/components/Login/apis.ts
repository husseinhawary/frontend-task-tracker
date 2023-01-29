import transformer from "../../units/transformer"
import API_URLS from "./apisUrls"

export const userLoginAPI = (data) => {
    return transformer({
        method: "POST",
        url: API_URLS.userLogin,
        data,
    })
}