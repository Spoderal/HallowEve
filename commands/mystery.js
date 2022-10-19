const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const User = require("../schemas/profile-schema")
const {joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice")
const path = require("path")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("botinfo")
    .addStringOption((option) => option
    .setName("code")
    .setDescription("Enter a code to get more information on the mystery")
    .setRequired(false))
    .setDescription("Just check the mystery of this bot!"),

    async execute(interaction) {
        let udata = await User.findOne({id: interaction.user.id}) || await new User({id: interaction.user.id})
        const {voice} = interaction.member


        if(!voice.channelId){
            return interaction.reply("Please join a voice channel to play this game!")
        }
      if(udata.stage == 1 || udata.stage == 2) {
          let embed = new MessageEmbed()
          .setTitle("This bot is so cool isn't it!")
        .setDescription("Just keep getting candy! All you can do!")

        
        interaction.reply({embeds: [embed]})
        setTimeout(() => {
            embed.setDescription("**until I get out of this trap**")
            interaction.editReply({embeds:[embed]})
        }, 3000);
        setTimeout(() => {
            embed.setDescription("Just keep getting candy! All you can do! :)")
            interaction.editReply({embeds:[embed]})
        }, 5000);

      }
      else  if(udata.stage == 3) {
   
        const {voice} = interaction.member


        if(!voice.channelId){
            return interaction.reply("Join a voice channel, and run this command again... let me tell you a secret...")
        }

        const player = createAudioPlayer()
        let resource = createAudioResource("https://cdn.discordapp.com/attachments/942000340985872404/1032087440816623616/badguy.mp3");


      const connection = joinVoiceChannel(
            {
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })
            
            connection.subscribe(player)
            player.play(resource)
            player.on('error', error => {
                console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
                player.play(getNextResource());
            });
            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy()
            })


            
          

  
            

            

    

    }

    else if(udata.stage == 4){
        let code = interaction.options.getString("code")

        if(!code) return interaction.reply('Join a vc and tell me the code. Ill tell you something.')

        if(code !== "ghost" && udata.tries == 0) {
            interaction.reply("WRONG PASSCODE. DO THAT AGAIN AND ILL MAKE SURE YOU'RE NEVER SEEN AGAIN.")
            udata.tries += 1
            udata.save()
            return
        } 
       else if(code !== "ghost" && udata.tries == 1) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Your body will never be found")
        .setDescription("You died to GH0ST")
        .setImage("https://i.ibb.co/XbkYRHr/FU1-Pp-Bw-WUBYz-Lke.jpg")
        .setColor("#00000")
            interaction.reply({embeds: [embed]})
            udata.stage = 1;
            udata.tries = 0
            udata.candy = 0
            udata.save()
            const player = createAudioPlayer()
            let resource = createAudioResource("https://cdn.discordapp.com/attachments/942000340985872404/1032369990860537927/dead.mp3");
    
    
          const connection = joinVoiceChannel(
                {
                    channelId: interaction.member.voice.channel.id,
                    guildId: interaction.guild.id,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                })
                
                connection.subscribe(player)
                player.play(resource)
                player.on('error', error => {
                    console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
                    player.play(getNextResource());
                });
                player.on(AudioPlayerStatus.Idle, () => {
                    connection.destroy()
                })
            return
        } 

        if(code == "ghost"){
            const {voice} = interaction.member


        if(!voice.channelId){
            return interaction.reply("Correct, join a voice channel, and run this command again...")
        }

        const player = createAudioPlayer()
        let resource = createAudioResource("https://cdn.discordapp.com/attachments/942000340985872404/1032371803810705468/1666206865542wv3bjlg-voicemaker.in-speech.mp3");


      const connection = joinVoiceChannel(
            {
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })
            
            connection.subscribe(player)
            player.play(resource)
            player.on('error', error => {
                console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
                player.play(getNextResource());
            });
            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy()
            })

            udata.stage += 1

            udata.save()


            
        }


    }


    }
}