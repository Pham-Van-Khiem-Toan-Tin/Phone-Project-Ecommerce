const validateEmail = ({email, setEmailError}) => {
    const emailRegular = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
    return email && !email.match(emailRegular)
        ? setEmailError('Email is not valid')
        : setEmailError('');
};

const validatePhone = ({phone, setPhoneError}) => {
    const phoneRegular = '/(84|0[3|5|7|8|9])+([0-9]{8})\b/g';
    return phone && !phone.match(phoneRegular)
        ? setPhoneError('Phone is not valid')
        : setPhoneError('');
}

const validateName = ({name, setNameError}) => {
    
    return name && name.length < 5
        ? setNameError('name is too short')
        :name && name.length > 50 ?setNameError('Name is too long')
        : setNameError('');
}

export {validateEmail, validatePhone, validateName};
