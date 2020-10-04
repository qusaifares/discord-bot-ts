import { ClientWithCommands } from './libs/client';
import { config } from 'dotenv';
config();

const client = new ClientWithCommands();

const { TOKEN, PREFIX } = process.env;

const handlerNames = ['command'];

handlerNames.forEach(async (handlerName) => {
  const { default: handler } = await import(`./handlers/${handlerName}`);
  handler(client);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  // Set the user presence
  if (client.user) {
    client.user.setPresence({
      status: 'online',
      activity: {
        name: 'with your heart',
        type: 'PLAYING'
      }
    });
  }
});

client.on('message', async (msg) => {
  if (PREFIX === undefined) return;
  // If author is bot, return
  if (msg.author.bot) return;
  // If message isn't in a server, return
  if (!msg.guild) return;
  // If message doesn't start with prefix, return
  if (!msg.content.startsWith(PREFIX)) return;

  // If message.member is uncached, cache it.
  // @ts-expect-error
  if (!msg.member) msg.member = await msg.guild.members.fetch(msg);

  const args = msg.content.slice(PREFIX.length).trim().split(/ +/g);
  const cmd = args.shift()?.toLowerCase();

  if (!cmd) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) {
    const alias = client.aliases.get(cmd);
    if (alias) {
      command = client.commands.get(alias);
    }
  }

  // If a command is finally found, run the command
  if (command) command.run(client, msg, args);
});

client.login(TOKEN);
