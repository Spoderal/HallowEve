const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const User = require("../schemas/profile-schema")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("trickortreat")
    .setDescription("Trick or treat, get candy!"),

    async execute(interaction) {
        let udata = await User.findOne({id: interaction.user.id}) || await new User({id: interaction.user.id})

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
      udata.stage++
      udata.save()

    }
}