const reglas = [
    {
        'regla': 'La longitud mínima de dicho password debe ser de 8 caracteres.',
        'fn': (password) => password.length >= 8

    },

    {
        'regla': 'La longitud máxima de dicho password debe ser de 12 caracteres.',
        'fn': (password) => password.length <= 12

    },

    {
        'regla': 'La contraseña no puede contener espacios en blanco.',
        'fn': (password) => {
            return !password.includes(' ')
        }
    },

    {
        'regla': 'La contraseña debe contener al menos uno de los siguiente caracteres !#$%&=',
        'fn': (password) => {
            const caracteres = ['!', '#', '$', '%', '&', '='];

            return caracteres.some(
                (caracter) => password.includes(caracter)
            )
        }

    },

    {
        'regla': 'La contraseña  debe contener al menos un dígito número.',
        'fn': (password) => {
            const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            return numeros.some(
                (numero) => password.includes(numero)
            )
        }

    },

    {
        'regla': 'El último caracter no puede ser ninguno de los definidos en la regla 4',
        'fn': (password) => {
            const caracteres = ['!', '#', '$', '%', '&', '='];
            return !caracteres.some(
                (caracter) => password[password.length - 1] == caracter
            )
        }

    }
]

module.exports = reglas