import { Command, CommandInfo, CommandRun } from './../../libs/command';

const options: CommandInfo = {
  name: 'ping',
  category: 'info',
  aliases: ['checkping'],
  description: 'Checks ping.',
  argNames: [],
  minArgs: 0,
  maxArgs: 0
};

const run: CommandRun = async (client, message, args) => {
  const pongMsg = await message.reply('Pong!');
  const ping = pongMsg.createdTimestamp - message.createdTimestamp;
  console.log(message.createdTimestamp);
  pongMsg.edit(`Pong! ${ping}ms`);
};

const ping = new Command(options, run);

export default ping;
