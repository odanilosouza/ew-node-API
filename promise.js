//importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
//Quando der algum problema =: reject (ERRO)
//Quando sucesso => Resolv
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function (){
           // return reject(new Error('Deu Ruim de vdd!'))
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNasc: new Date()
            })
        }, 1000)

    })

}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() =>{
            return resolve({
                telefone: '11999999999',
                ddd: 11
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
//Para manipular o sucesso usamos a function .then
//para manipular erros, usamos o .catch

//Usuario => telefone => telefone
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
.then(function(resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
        return {
            usuario: resultado.usuario,
            telefone: resultado.telefone,
            endereco: result
        }
    })
})
.then(function(resultado){
    console.log(`
        Nome: ${resultado.usuario.nome}
        Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
        Telefone: (${resultado.telefone.ddd}), ${resultado.telefone.telefone}

    
    `)

})
.catch(function(erro) {
    console.error('DEU RUiM',  erro)
})

// obterUsuario(function resolverUsuario(erro, usuario){
//     //Valor null || "" || 0 === false
//     if(erro) {
//         console.error('Deu ruim em Usuario', erro)
//         return
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1,telefone ){
//         if(error1) {
//             console.error('Deu ruim em Telefone', error1)
//             return
//         }
//         obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
//             if(erro2) {
//                 console.error('Deu ruim em endereço', erro2)
//             }

//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereço: ${endereco.rua},${endereco.numero},
//                 Telefone: ${telefone.ddd},${telefone.telefone}
        
//             `)
//         })
//     })
// })
