const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const User = require("../schemas/profile-schema")
const {joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice")
const path = require("path")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("trickortreat")
    .setDescription("Trick or treat, get candy!"),

    async execute(interaction) {
        let udata = await User.findOne({id: interaction.user.id}) || await new User({id: interaction.user.id})
        const {voice} = interaction.member
        
        if(!voice.channelId){
          return interaction.reply("Please join a voice channel to play this game!")
        }
        let player = createAudioPlayer()
        const connection = joinVoiceChannel(
          {
              channelId: interaction.member.voice.channel.id,
              guildId: interaction.guild.id,
              adapterCreator: interaction.guild.voiceAdapterCreator
          })
          
          connection.subscribe(player)


      if(udata.stage == 1 || udata.stage == 2) {
          let embed = new MessageEmbed()
          .setTitle("Trick or Treat!")
          .setDescription(`You earned 🍬 1 candy`)
          .setColor("FFA500")
        udata.candy += 1
    
          interaction.reply({embeds: [embed]})

      }
      else if(udata.stage == 3){
        let embed = new MessageEmbed()
        .setTitle("Trick or Treat!")
        .setDescription(`You earned 🍬 1 candy`)
        .setColor("FFA500")
        udata.candy += 1
        
  
        interaction.reply({embeds: [embed], fetchReply: true})
        embed.setTitle("tRiC oR Tr3a1")
        embed.setImage("https://i.ibb.co/RvzfDK7/stitch-1.png")
        .setColor("FFA500")
        setTimeout(async () => {
          let msg = await interaction.editReply({embeds: [embed], fetchReply: true})
            
        }, 1000);
        
        setTimeout(async () => {
            embed.setTitle("Trick or Treat!")
            embed.setImage()
            await interaction.editReply({embeds: [embed]})
             
         }, 2000);
      }

      else if(udata.stage == 5){
        
        interaction.reply("Mark is speaking...")

        let player = createAudioPlayer()
        let resource = createAudioResource("https://cdn.discordapp.com/attachments/942000340985872404/1032545734542757948/lastone.mp3");


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

      else if(udata.stage == 6){

        let row = new MessageActionRow()

        row.addComponents(
          new MessageButton()
          .setLabel("Left")
          .setCustomId("left")
          .setStyle("SECONDARY"),
          new MessageButton()
          .setLabel("Right")
          .setCustomId("right")
          .setStyle("SECONDARY")

        )
        
        let msg = await interaction.reply({content: "Go left or right?", components: [row], fetchReply: true})


        let filter = (btnInt) => {
          return interaction.user.id === btnInt.user.id
      }
      
        const collector = msg.createMessageComponentCollector({
          filter: filter,
          max: 1
      })

      collector.on("collect", async (i) => {
        if(i.customId.includes("right")){
          let player = createAudioPlayer()
          let resource = createAudioResource("https://cdn.discordapp.com/attachments/942000340985872404/1032545734542757948/lastone.mp3");
    
    
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
                  i.update("You chose the correct path. More coming to this story in the future.")
              })

        }
        else if(i.customId.includes("left")){
          let player = createAudioPlayer()
          let resource = createAudioResource("https://cdn.discordapp.com/attachments/942000340985872404/1032550632919404565/jumpscare2.mp3");
    
    
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
                  let embed = new Discord.MessageEmbed()
                  .setTitle("Died")
                  .setDescription("You died to S3NTRY")
                  .setImage("https://i.ibb.co/8YN4dcb/7qn9-Qx-Bmm-V.png")
                  .setColor("#00000")
                      i.channel.send({embeds: [embed]})
                      udata.stage = 1;
                      udata.tries = 0
                      udata.candy = 0
                      udata.save()
              })

        }
      })


      }


    }
}