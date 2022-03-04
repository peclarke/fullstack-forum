const error_codes = {
    "auth/email-already-in-use" : "This email already exists",
    "auth/wrong-password" : "Invalid password and/or username",
    "auth/user-not-found" : "This user was not found",
};

export function return_helper_text(code) {
    try {
        return error_codes[code];
    }
    catch (err) {
        console.log("Error Code: ["+code+"] does not have a formatted equivalent.")
        return "An error occurred";
    }
}