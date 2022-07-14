const errorRquest = {
  auth: {
    checkIsAdmin: "Check role is failled",
    signUp: {
      error: "All field must not be empty",
    },
    name: {
      error: "Name must be 3-25 charecter",
    },
    password: {
      error: "Password must be 8 charecter",
    },
    email: {
      findEmailToSignup: {
        error: "Email already exists",
      },
      findEmailToSignIn: {
        error: "Can not fill email or password",
      },
      validateEmail: {
        error: "Email is not valid",
      },
    },
    createAccount: {
      error: "Create account failled",
    },
    login: {
      error: "You must be logged in",
    },
    authenticate: {
      error: "You are not authenticate",
    },
    
  },
};
module.exports = errorRquest;
