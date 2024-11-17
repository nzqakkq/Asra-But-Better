import { RestEvent } from "@Structures";
import { RESTEvents, type RateLimitData } from "discord.js";
import { Logger } from "@Constants";
import { LogLevelEnum } from "Typings";

export default class RateLimitEvent extends RestEvent<RESTEvents.RateLimited> {
	constructor() {
		super(RESTEvents.RateLimited);
	}

	public override async onTrigger(
		rateLimitInfo: RateLimitData,
	): Promise<void> {
		await Logger.log({ message: rateLimitInfo, level: LogLevelEnum.WARN });
	}

	public override async onLoad(): Promise<void> {
		await Logger.log({
			message: `Loaded Rest Event: ${this.eventName}`,
			level: LogLevelEnum.INFO,
		});
	}
}
