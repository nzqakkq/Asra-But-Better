import {
	type TLoggerOptions,
	LogLevelEnum,
	type TCustomEmbedBuilder,
} from "Typings";
import { type ThreadChannel } from "discord.js";
import {
	applicationCache,
	generateLogEmbed,
	prepareLogMessage,
} from "@Constants";

export default class DiscordLogger {
	public static async log(options: TLoggerOptions): Promise<void> {
		const errorLogsChannel: ThreadChannel | undefined =
			applicationCache.Channels.ThreadChannels.get(
				"CurrentErrorLogsThreadChannel",
			);
		const logsChannel: ThreadChannel | undefined =
			applicationCache.Channels.ThreadChannels.get(
				"CurrentLogsThreadChannel",
			);

		if (!errorLogsChannel) return; //throw new Error("[Undefined]: Error Log Channel Was Not Defined");
		if (!logsChannel) return; //throw new Error("[Undefined]: Log Channel Was Not Defined");

		const embed: TCustomEmbedBuilder = generateLogEmbed({
			message: prepareLogMessage({ ...options, colorize: false }),
			level: options.level,
		});

		if (options.level === LogLevelEnum.ERROR)
			await errorLogsChannel.send({ embeds: [embed.ToJSON()] });
		await logsChannel.send({ embeds: [embed.ToJSON()] });
	}
}
