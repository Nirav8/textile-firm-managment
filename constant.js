//! save messages and send from hear
//TODO

const base_url = "http://localhost:3000";
const s_key = "452@213))nkjdls_+"

const message = {
    mobile_require: "Please Enter Mobile Number.",
    name_require: "Please Enter User Name",
    password_length: "please Enter 6-10 Digit password",
    password_validate: "Include Digit, special character and Alfabets",//TODO create regx for validate password
    mobile_length: "Please, Enter valid Mobile Number",
    order_quantity_require: "Please Enter Order Quantity",
    user_not_available: "Entered userId is not available in dataset",
    firm_name_unique: "same firm is available"
}

const responce_message = {
    order_forward_succsess: "Order added sucsess fully...",
    order_forward_fail: "Error in forwarding order",
    order_is_more_than_quantity: "order is exciding from there quantity",
    delivery_forward_succsess: "delivery detail added sucsess fully...",
    delivery_forward_fail: "Error in delivery detail update",
}

const server_error = {
    internale_error: "internal server Error"
}

module.exports = { base_url, message, responce_message, server_error };
