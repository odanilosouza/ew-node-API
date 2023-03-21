function obterUsuario(callback) {
    setTimeout(function (){
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNasc: new Date()
        })
    }, 1000)

}

function obterTelefone(idUsuario, callback) {
    setTimeout(() =>{
        return callback(null, {
            telefone: '11999999999',
            ddd: 11
        })

    },2000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(()=> {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)

}

function resolverUsuario(erro, usuario){
    console.log('Usuario', usuario)


}
obterUsuario(function resolverUsuario(erro, usuario){
    //Valor null || "" || 0 === false
    if(erro) {
        console.error('Deu ruim em Usuario', erro)
        return
    }

    obterTelefone(usuario.id, function resolverTelefone(error1,telefone ){
        if(error1) {
            console.error('Deu ruim em Telefone', error1)
            return
        }
        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
            if(erro2) {
                console.error('Deu ruim em endereço', erro2)
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereço: ${endereco.rua},${endereco.numero},
                Telefone: ${telefone.ddd},${telefone.telefone}


            
            
            `)
        })
    })
})
