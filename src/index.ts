import { type TExtendedClient } from "Typings";
import { ExtendedClient, Logger as LoggerClass } from "@Structures";
import { IntentsBitField } from "discord.js";

export const Logger: LoggerClass = new LoggerClass();
export const Asra: TExtendedClient = new ExtendedClient({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

await Asra.initialize();
