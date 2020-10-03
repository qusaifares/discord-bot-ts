import { Command } from './../../libs/command';

const ping: Command = {
  name: 'ping',
  category: 'info',
  aliases: ['checkping'],
  description: 'Checks ping.',
  run: async (client, message, args) => {
    const pongMsg = await message.reply('Pong');
    const ping = pongMsg.createdTimestamp - message.createdTimestamp;
    console.log(message.createdTimestamp);
    pongMsg.edit(`Pong! ${ping}ms`);
  }
};

export default ping;
