import { Events } from "discord.js";
import { ClientEvent } from "@Structures";
import { Logger } from "@Constants";
import { LogLevelEnum } from "Typings";
import config from "@Config";

export default class DebugEvent extends ClientEvent<Events.Debug> {
	constructor() {
		super(Events.Debug);
	}

	public override async onTrigger(message: string): Promise<void> {
		if (config.bot.isLogDebug)
			await Logger.log({ message, level: LogLevelEnum.DEBUG });
	}

	public override async onLoad(): Promise<void> {
		await Logger.log({
			message: `Loaded Client Event: ${this.eventName}`,
			level: LogLevelEnum.INFO,
		});
	}
}
