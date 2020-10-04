import { Message } from 'discord.js';
import { ClientWithCommands } from './client';
const { PREFIX } = process.env;

declare type CommandCategory = 'fun' | 'info' | 'chegg' | 'admin';

export interface CommandInfo {
  name: string;
  category: CommandCategory;
  description: string;
  aliases: string[];
  argNames: string[];
  minArgs: number;
  maxArgs: number;
}

export type CommandRun = (
  client: ClientWithCommands,
  message: Message,
  args: string[]
) => Promise<void>;

export class Command {
  public name: string;
  public category: string;
  public description: string;
  public aliases: string[];
  public argNames: string[];
  public minArgs: number;
  public maxArgs: number;
  run: CommandRun;

  constructor(
    {
      name,
      category,
      description,
      aliases,
      minArgs,
      maxArgs,
      argNames
    }: CommandInfo,
    run: CommandRun
  ) {
    this.name = name;
    this.category = category;
    this.description = description;
    this.aliases = aliases;
    this.minArgs = minArgs;
    this.maxArgs = maxArgs;
    this.argNames = argNames;

    this.run = async (client, message, args) => {
      try {
        if (args.length > this.maxArgs) {
          message.reply(
            `Include a maximum of ${this.maxArgs} arguments in the command.`
          );
          return;
        } else if (args.length < this.minArgs) {
          message.reply(
            `Include at least ${this.minArgs} arguments in the command.`
          );
          return;
        }
        await run(client, message, args);
      } catch (error) {
        console.log(error);
      }
    };
  }
  get helpString(): string {
    return `\`${PREFIX}${this.name} ${this.argNames
      .map((argName) => `<${argName}>`)
      .join(' ')}\``;
  }
}
