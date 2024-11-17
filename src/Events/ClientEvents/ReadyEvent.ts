import {
	type Channel,
	ChannelType,
	Client,
	Events,
	type ForumChannel,
	TimestampStyles,
} from "discord.js";

import config from "@Config";
import { ClientEvent } from "@Structures";
import { applicationCache, Asra, Logger } from "@Constants";
import { LogLevelEnum } from "Typings";

export default class ReadyEvent extends ClientEvent<Events.ClientReady> {
	public constructor() {
		super(Events.ClientReady);
	}

	public override async onTrigger(client: Client<true>): Promise<void> {
		await this.__loadChannelsToCache();
		await this.__prepareLogChannel();
		await this.__prepareErrorLogChannel();

		await Logger.log({
			message: `${client.user.tag} Is Online`,
			level: LogLevelEnum.SUCCESS,
		});
	}

	private async __loadChannelsToCache(): Promise<void> {
		const ErrorLogsChannel: Channel | undefined = Asra.channels.cache.get(
			config.channels.errorLogsForumChannel,
		);
		if (!ErrorLogsChannel)
			throw new Error(
				"[CHANNEL_NOT_FOUND]: The Error Log Channel Was Not Found",
			);
		if (ErrorLogsChannel.type !== ChannelType.GuildForum)
			throw new Error(
				"[INCORRECT_CHANNEL_TYPE]: The Error Log Channel Type Was Not [ChannelType.GuildForum]",
			);

		const LogsChannel: Channel | undefined = Asra.channels.cache.get(
			config.channels.logsForumChannel,
		);
		if (!LogsChannel)
			throw new Error(
				"[CHANNEL_NOT_FOUND]: The Logs Channel Was Not Found",
			);
		if (LogsChannel.type !== ChannelType.GuildForum)
			throw new Error(
				"[INCORRECT_CHANNEL_TYPE]: The Logs Channel Type Was Not [ChannelType.GuildForum]",
			);

		applicationCache.Channels.ForumChannels.set(
			"ErrorLogsForumChannel",
			ErrorLogsChannel,
		).set("LogsForumChannel", LogsChannel);
	}

	private async __prepareLogChannel(): Promise<void> {
		const LogsChannel: ForumChannel | undefined =
			applicationCache.Channels.ForumChannels.get("LogsForumChannel");
		if (!LogsChannel)
			throw new Error("[UNDEFINED]: Logs Channel Was Not Defined");

		applicationCache.Channels.ThreadChannels.set(
			"CurrentLogsThreadChannel",
			await LogsChannel.threads.create({
				name: new Date().toLocaleString(),
				message: {
					content: `<t:${Math.round(Date.now() / 1000)}:${TimestampStyles.RelativeTime}>`,
				},
			}),
		);
	}

	private async __prepareErrorLogChannel(): Promise<void> {
		const ErrorLogsChannel: ForumChannel | undefined =
			applicationCache.Channels.ForumChannels.get(
				"ErrorLogsForumChannel",
			);
		if (!ErrorLogsChannel)
			throw new Error("[UNDEFINED]: Error Logs Channel Was Not Defined");

		applicationCache.Channels.ThreadChannels.set(
			"CurrentErrorLogsThreadChannel",
			await ErrorLogsChannel.threads.create({
				name: new Date().toLocaleString(),
				message: {
					content: `<t:${Math.round(Date.now() / 1000)}:${TimestampStyles.RelativeTime}>`,
				},
			}),
		);
	}

	public override async onLoad(): Promise<void> {
		await Logger.log({
			message: `Loaded Client Event: ${this.eventName}`,
			level: LogLevelEnum.INFO,
		});
	}
}
