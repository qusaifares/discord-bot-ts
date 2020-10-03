import { ClientWithCommands } from '../libs/client';
import { Command } from './../libs/command';
import { readdirSync } from 'fs';
// @ts-ignore
import ascii from 'ascii-table';

// Create a new Ascii table
let table = new ascii('Commands');
table.setHeading('Command', 'Load status');

console.log(readdirSync(`${__dirname}/../commands/`));

const handler = (client: ClientWithCommands) => {
  // Read every commands subfolder
  readdirSync(`${__dirname}/../commands/`).forEach(async (dir) => {
    // Filter so we only have .js command files
    const commands = readdirSync(`${__dirname}/../commands/${dir}/`).filter(
      (file) => file.endsWith('.js') || file.endsWith('.ts')
    );

    // Loop over the commands, and add all of them to a collection
    // If there's no name found, prevent it from returning an error,
    // By using a cross in the table we made.
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);
      let cmd: Command = pull.default;

      if (cmd.name) {
        client.commands.set(cmd.name, cmd);
        table.addRow(file, '✅');
      } else {
        table.addRow(
          file,
          `❌  -> missing a help.name, or help.name is not a string.`
        );
        continue;
      }

      // If there's an aliases key, read the aliases.
      if (cmd.aliases && Array.isArray(cmd.aliases))
        cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
    }
  });
  // Log the table
  console.log(table.toString());
};

export default handler;

/**
 * This is the basic command layout
 * Command {
 *  name: "Command name",
 *  aliases: ["array", "of", "aliases"]
 *  category: "Category name",
 *  description: "Command description"
 *  usage: "[args input]",
 *  run: (client, message, args) => {
 *      The code in here to execute
 *  }
 * }
 */
