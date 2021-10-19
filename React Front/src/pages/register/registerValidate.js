export default function validateRegister(values) {
    let errors = {}
    if (!values.name.trim()) {
        errors.name = 'Username is required';
    } else if (!/^[a-zA-Z ]+$/.test(values.name.trim())) {
        errors.name = 'Username must have only letters';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Minimum length of password is 8 characters';
    } else if (values.password.length > 16) {
        errors.password = 'Maximum length of password is 16 characters'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?$^+=!*@()%&]).{8,16}$/.test(values.password)) {
        errors.password = 'Require Capital, Tiny, Numbers and one of: [#?$^+=!*@()%&]'
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirmed Password is required';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match';
    }
    return [Object.keys(errors).length !== 0, errors];
}