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

/**
 * 1º Passo: Adicionar a palavra Async e ela automaticamente retornará uma promise
 */
main()
async function main() {
    try {
        console.time('Medida-Promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome},
            Telefone (${telefone.ddd}), ${telefone.telefone}
            Endereco: ${endereco.rua}, ${endereco.numero}
        
        `)
        console.timeEnd('Medida-Promise')

    }catch(error) {
        console.error('DEU RUIM', error)
    }

}



