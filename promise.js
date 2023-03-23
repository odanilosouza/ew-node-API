/**
 * 0 - Obter um usuário
 * 1 - Obter o número de telefone de um usuário a partir do seu ID
 * 2 - Obter o endereço do usuário pelo ID
 */
//Importamos um módulo interno do node.js

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario() {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function (){
            //return reject(new Error('DEU RUIM DE VDD!'))
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNasc: new Date()
            })
        }, 1000)

    })

}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject){
        setTimeout(() =>{
            return resolve({
                ddd: 11,
                telefone: '11999999999'
                
            })
    
        },2000)

    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(()=> {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)

}

const usuarioPromise = obterUsuario()
/*
para manipular o sucesso usamos a função .then
para manipular erros, usamos o .catch

*/ 

usuarioPromise
.then(function(usuario){
    return obterTelefone(usuario.id)
    .then(function resolverTelefone(result){
        return {
            usuario: {
                nome: usuario.nome,
                id: usuario.id
            },
            telefone: result
        }
    })
})
.then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result){
        return {
            usuario: resultado.usuario,
            telefone: resultado.telefone,
            endereco: result
        }
    })
    
})
.then(function(resultado){
    console.log(`
    
    nome: ${resultado.usuario.nome}
    Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
    Telefone: (${resultado.telefone.ddd}), ${resultado.telefone.telefone}
    `)
})
.catch(function(error) {
    console.error('DEU RUIM', error)
})