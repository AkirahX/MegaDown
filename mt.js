const fs = require('fs');
const { File } = require('megajs')


const file = File.fromURL('https://mega.nz/folder/PTZlGI6B#UcDjsRcuf_XIh6mOdWBPUg')

file.loadAttributes((error, file) => {
    console.log('Nome do arquivo: ' + file.name)
    console.log('Tamanho: ' + file.size)

    props = file.name.split('.')

    //console.log(props[0])
    //console.log(props[1])
    if(file.directory) {
        console.log('O download de pastas não é suportado! Ainda ;)')
        return
    }
    file.download((err, data) => {
        if(err) throw err
        fs.writeFile(`./${props[0]}.${props[1]}`, data, () => {
            console.log('Donwload concluído.')
        })
        
    })
})