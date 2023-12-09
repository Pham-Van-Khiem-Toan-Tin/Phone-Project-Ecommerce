export default function Validation(values) {
    const errors = {}
    const email_pattern = /^[A-Z0-9. _%+-]+@[A-Z0-9. -]+\. [A-Z]{2,}$/i;
    const name_pattern = /^[a-zA-Z]{2,16}$/;
    if (values.name === "") {
        errors.name = "Name is required!";
    }
    if(!name_pattern.test(values.name)) {
        errors.name = "Name is not correct";
    }
    if (values.email === "") {
        errors.email = "Email is required!";
    }
    if(!email_pattern.test(values.email)) {
        errors.email = "Email is not correct";
    }
    return errors;
}