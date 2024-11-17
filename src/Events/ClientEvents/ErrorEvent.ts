import { Logger } from "@Constants";
import { ClientEvent } from "@Structures";
import { Events } from "discord.js";
import { LogLevelEnum } from "Typings";

export default class ErrorEvent extends ClientEvent<Events.Error> {
	constructor() {
		super(Events.Error);
	}

	public override async onTrigger(error: Error): Promise<void> {
		await Logger.log({ message: error, level: LogLevelEnum.ERROR });
	}

	public override async onLoad(): Promise<void> {
		await Logger.log({
			message: `Loaded Client Event: ${this.eventName}`,
			level: LogLevelEnum.INFO,
		});
	}
}
