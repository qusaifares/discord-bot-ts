import { Command } from './command';
import { Client, Collection, Message } from 'discord.js';

export class ClientWithCommands extends Client {
  public commands: Collection<Command['name'], Command> = new Collection();
  public aliases: Collection<
    Command['aliases'][0],
    Command['name']
  > = new Collection();
}
