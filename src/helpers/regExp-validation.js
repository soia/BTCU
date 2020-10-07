const emailValid = value => !/[a-z0-9.]+@[a-z]+\.[a-z]+/.test(value.toLowerCase().trim());
const oneLowercaseChar = value => !/^(?=.*[a-z])/.test(value);
const oneUppercaseChar = value => !/^(?=.*[A-Z])/.test(value);
const oneNumber = value => !/^(?=.*[0-9])/.test(value);
const oneSpecialChar = value => !/^(?=.*\W)/.test(value);

export {
    emailValid,
    oneLowercaseChar,
    oneUppercaseChar,
    oneNumber,
    oneSpecialChar,
};
