import { Message } from 'discord.js';
import { ClientWithCommands } from './client';

declare type CommandCategory = 'fun' | 'info' | 'admin';

interface CommandInfo {
  name: string;
  category: CommandCategory;
  description: string;
  aliases: string[];
}

type CommandRun = (
  client: ClientWithCommands,
  message: Message,
  args: string[]
) => Promise<void>;

export class Command {
  public name: string;
  public category: string;
  public description: string;
  public aliases: string[];
  run: CommandRun;

  constructor(
    { name, category, description, aliases }: CommandInfo,
    run: CommandRun
  ) {
    this.name = name;
    this.category = category;
    this.description = description;
    this.aliases = aliases;
    this.run = run;
  }
}
