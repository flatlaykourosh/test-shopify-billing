const axios = require("axios");
const getShopify = async path => {
    const base_url = "https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/shopify/proxy?path=";
    const method_url = "&method=Get";
    let config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    try {

        const response = await axios.post(base_url + path + method_url, null, config);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
};
const postShopify = async (path, body) => {
    const base_url = "https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/shopify/proxy?path=";
    const method_url = "&method=Post";
    let config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    try {

        const response = await axios.post(base_url + path + method_url, body, config);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getShopify: getShopify,
    postShopify: postShopify
}