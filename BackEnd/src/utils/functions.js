const { User } = require('../models');

module.exports = {
    // Verifica se uma string possui somente letras
    isOnlyLetters: async (name) => {
        const arrayName = name.trim().split(' ');
        let isCorrect = true;
        await Array.prototype.forEach.call(arrayName, (word) => {
            if (word.search(/[^A-zÁ-ù]/) !== -1) { isCorrect = false; }
        });
        return isCorrect;
    },
    // Procura por um User no sistema por meio do email
    searchEmail: async (value) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) { return true; }
        return false;
    },
    // Testa se a senha se enquadra nos padrões do sistema, 1 Maiúsculo, 1 minúsculo, 1 numero
    // 1 especial e entre 8 e 16 dígitos
    validatePassword: async (pass) => {
        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?$^+=!*@()%&]).{8,16}$/.test(pass)
        ) { return false; }
        return true;
    },
    isOnlyLettersNumberSpecials: async (text) => {
        if (text.search(/[^ A-zÀ-ú0-9,._#?ºª$^+=!@()%]/) !== -1) return false
        else return true
    }
};
