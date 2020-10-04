import { Command, CommandInfo, CommandRun } from './../../libs/command';

const options: CommandInfo = {
  name: 'rolldice',
  category: 'fun',
  aliases: [],
  description: 'Rolls a die.',

  argNames: [],
  minArgs: 0,
  maxArgs: 0
};

const run: CommandRun = async (client, message, args) => {
  const num = Math.ceil(Math.random() * 6);
  message.reply(`You rolled a ${num}.`);
};

const rolldice = new Command(options, run);

export default rolldice;
