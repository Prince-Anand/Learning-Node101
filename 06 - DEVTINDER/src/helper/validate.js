const validator = require("validator")
const validateSignUpData = (req) =>{
    const {firstName, lastName, email, password} = req.body;

    if (!firstName || !lastName){
        throw new Error("Name fields cant be empty.")
    }
    else if (!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }

}
const validateProfileData = (req) => {
    const ALLOWED_UPDATES = [
        "photoUrl",
        "about",
        "skills",
        "firstName",
        "lastName",
        "age"
    ];
    const data = req.body;
    const isAllowed = Object.keys(data).every(key => ALLOWED_UPDATES.includes(key));
    return isAllowed;
}

module.exports = {
    validateSignUpData,
    validateProfileData
}