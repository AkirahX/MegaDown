const {Telegraf} = require('telegraf')
const axios = require('axios')
const fs = require('fs')
const { File } = require('megajs')
const byteSize = require('byte-size')
const path = require('path')



const bot = new Telegraf('1943842646:AAHx9LYfHnCoeK6DaDuGyeQUQei3biVu5yA')


let startText = 'Mega NZ Downloader - v1.0.0'
bot.start((ctx) => ctx.reply(startText))
bot.launch((console.log('Iniciado')))

bot.on('message',  async (ctx) => {
    if(ctx.message.text.includes('mega.nz', 'mega.co.nz')){
        ctx.reply('Olá ' + ctx.chat.first_name + ', tudo bem? Estamos analisando seu link, aguarde um pouquinho...')
        console.log('[TIMESTAMP] New link received.')
        const file = File.fromURL(ctx.message.text)

        await file.loadAttributes((error, file) => {
            if(file.directory) {
                ctx.reply('Puts... infelizmente o download de diretórios ainda não é suportado...')
                console.log('[TIMESTAMP] Directory')
                return
            }
            size = byteSize(file.size)
            ctx.reply(`
Nome: ${file.name}

Tamanho: ${size}
            
Realizando download, enviaremos assim que possível.`)
            
            
            file.download(async (err, data) => {
                if(err) throw err
                let extension = path.extname(file.name)
                console.log('[TIMESTAMP] File is: ' + extension)
                //process.exit()
                await ctx.replyWithDocument({source: data, filename: `Downloaded with @MegaDownloads${extension}`})

                console.log('[TIMESTAMP] File sended')
                //ctx.replyWithPhoto({source: data})
            })
        })
        
    }
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
