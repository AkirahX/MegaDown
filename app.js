const {Telegraf} = require('telegraf')
const axios = require('axios')
const fs = require('fs')
const { File } = require('megajs')
const byteSize = require('byte-size')



const bot = new Telegraf('1943842646:AAHx9LYfHnCoeK6DaDuGyeQUQei3biVu5yA')


let startText = 'Mega NZ Downloader - v1.0.0'
bot.start((ctx) => ctx.reply(startText))
bot.launch((console.log('Iniciado')))

bot.on('message',  async (ctx) => {
    if(ctx.message.text.includes('mega.nz', 'mega.co.nz')){
        ctx.reply('Olá ' + ctx.chat.first_name + ', tudo bem? Estamos analisando seu link, aguarde um pouquinho...')

        const file = File.fromURL(ctx.message.text)

        file.loadAttributes((error, file) => {
            if(file.directory) {
                ctx.reply('Puts... infelizmente o download de diretórios ainda não é suportado...')
                return
            }
            size = byteSize(file.size)
            ctx.reply(`
Nome: ${file.name}

Tamanho: ${size}
            
Realizando download, enviaremos assim que possível.`)
            
            extension = file.name.split('.')
            file.download((err, data) => {
                if(err) throw err
                //if(extension === 'mp4'){ctx.replyWithVideo(data)}
                ctx.reply(extension[1])
             //else if(extension === 'jpg' && extension === 'png' && extension === 'jpeg') {ctx.replyWithPhoto(data)}
                if(extension[1] === 'mp4'){
                    ctx.replyWithVideo({
                        source: data
                    })
                }
                else if(extension[1] === 'jpg'){
                    ctx.replyWithPhoto({
                        source: data
                    })
                }
                else {
                    ctx.reply('O formato do arquivo não foi reconhecido, enviando como arquivo.')
                    ctx.replyWithDocument({
                        source: data
                    })
                }
            })
        })
        
    }
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
