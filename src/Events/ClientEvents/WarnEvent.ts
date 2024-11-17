import { Logger } from "@Constants";
import { ClientEvent } from "@Structures";
import { Events } from "discord.js";
import { LogLevelEnum } from "Typings";

export default class WarnEvent extends ClientEvent<Events.Warn> {
	constructor() {
		super(Events.Warn);
	}

	public override async onTrigger(message: string): Promise<void> {
		await Logger.log({ message, level: LogLevelEnum.WARN });
	}

	public override async onLoad(): Promise<void> {
		await Logger.log({
			message: `Loaded Client Event: ${this.eventName}`,
			level: LogLevelEnum.INFO,
		});
	}
}
