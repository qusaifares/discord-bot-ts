import { Command } from './../../libs/command';

const rolldice: Command = {
  name: 'rolldice',
  category: 'fun',
  aliases: [],
  description: 'Rolls a die.',
  run: async (client, message, args) => {
    const num = Math.ceil(Math.random() * 6);
    message.reply(`You rolled a ${num}.`);
  }
};

export default rolldice;
