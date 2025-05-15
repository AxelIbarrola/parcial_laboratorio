const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002
const reglas = require('./politica/reglas')
let usuarios = require('./data/usuarios.json')


app.get('/validador',
    (req, res) => {

    const clientesInvalidos = usuarios.filter(
        (usuario) => {
            const valido = !reglas.every(
                (regla) => regla['fn'](usuario.password)
            )
            return valido
        }
    ).map(
        (usuario) => { 
            return {'userName': usuario['userName'], 'email': usuario['email']}
        }
    )

    res.status(200).json(clientesInvalidos)
    } 
)

app.get('/validador/con-reglas', 
    (req, res) => {

        usuarios = usuarios.map(
            (usuario) => {
                const reglasIncumplidas = [];
                reglas.forEach(
                    (regla) => {
                        if (!regla['fn'](usuario.password)){
                            reglasIncumplidas.push(regla['regla'])
                        }
                    }
                )
                return {...usuario, 'reglasIncumplidas': reglasIncumplidas}
            }
        )

       const clientesInvalidos = usuarios.filter(
        (usuario) => {
            const valido = !reglas.every(
                (regla) => regla['fn'](usuario.password)
            )
            return valido
        }
    ).map(
        (usuario) => { 
            return {'userName': usuario['userName'], 'email': usuario['email'], 'reglasIncumplidas': usuario['reglasIncumplidas']}
        }
    )

    res.status(200).json(clientesInvalidos)

})

app.get('/usuarios-correctos', 
    (req, res) => {
        const clientesValidos = usuarios.filter(
        (usuario) => {
            const valido = reglas.every(
                (regla) => regla['fn'](usuario.password)
            )
            return valido
        }
    ).map(
        (usuario) => { 
            return {'userName': usuario['userName'], 'email': usuario['email']}
        }
    )

    res.status(200).json(clientesValidos)
    }
)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})




