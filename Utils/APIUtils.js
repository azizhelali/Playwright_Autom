class APiUtils {

    constructor(apiContext,loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad=loginPayLoad;
    }

    async getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            }
        )
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }
    async createOrder(OrderPayLoad) {
        let response={};
        response.token=await this.getToken();
        const OrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: OrderPayLoad,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            }
        )
        const OrderResponseJson = await OrderResponse.json();
        const orderId = OrderResponseJson.orders[0];
        response.orderId=orderId;
        return response;
    }
}
module.exports = {APiUtils};