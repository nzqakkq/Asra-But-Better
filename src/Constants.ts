import {
	LogLevelEnum,
	type TApplicationCache,
	type TCustomEmbedBuilder,
	type TLoggerOptions,
	type TPrepareLogMessageOptions,
} from "Typings";
import { Collection, ForumChannel, ThreadChannel } from "discord.js";
import chalk from "chalk";
import config from "@Config";
import { CustomEmbedBuilder } from "@Structures";

export const applicationCache: TApplicationCache = {
	logPaths: {
		current: `./Logs/${Date.now()}`,
		latest: "./Logs/latest",
	},
	Channels: {
		ThreadChannels: new Collection<string, ThreadChannel>(),
		ForumChannels: new Collection<string, ForumChannel>(),
		//guildTextBasedChannels: new Collection<string, GuildTextBasedChannel>(),
	},
	isNewSession: true,
};

export const prepareLogMessage = (
	options: TPrepareLogMessageOptions,
): string => {
	const date: string = options.colorize
		? chalk.grey(new Date().toLocaleTimeString())
		: new Date().toLocaleTimeString();
	let level = "";
	switch (options.level) {
		case LogLevelEnum.SUCCESS:
			level = options.colorize
				? chalk.underline.greenBright("✅ Success")
				: "✅ Success";
			break;
		case LogLevelEnum.WARN:
			level = options.colorize
				? chalk.underline.yellowBright("⚠️ Warning")
				: "⚠️ Warning";
			break;
		case LogLevelEnum.INFO:
			level = options.colorize
				? chalk.underline.blueBright("ℹ️ Info")
				: "ℹ️ Info";
			break;
		case LogLevelEnum.DEBUG:
			level = options.colorize
				? chalk.underline.magentaBright("🐛 Debug")
				: "🐛 Debug";
			break;
		case LogLevelEnum.ERROR:
			level = options.colorize
				? chalk.underline.redBright("❌ Error")
				: "❌ Error";
			break;
	}

	return `[${date}] ${level} >> ${options.message}`;
};

export const generateLogEmbed = (
	options: TLoggerOptions,
): TCustomEmbedBuilder => {
	const embed: CustomEmbedBuilder = new CustomEmbedBuilder({
		timestamp: "NoTimestamp",
	});
	switch (options.level) {
		case LogLevelEnum.ERROR:
			embed.modifyMessageEmbed({
				color: config.misc.embedColors.red,
			});
			break;
		case LogLevelEnum.DEBUG:
			embed.modifyMessageEmbed({
				color: config.misc.embedColors.purple,
			});
			break;
		case LogLevelEnum.INFO:
			embed.modifyMessageEmbed({
				color: config.misc.embedColors.blue,
			});
			break;
		case LogLevelEnum.WARN:
			embed.modifyMessageEmbed({
				color: config.misc.embedColors.yellow,
			});
			break;
		case LogLevelEnum.SUCCESS:
			embed.modifyMessageEmbed({
				color: config.misc.embedColors.green,
			});
			break;
	}

	return embed.modifyMessageEmbed({
		description: `\`\`\`\n${options.message}\`\`\``,
	});
};

export { Logger, Asra } from "./";
