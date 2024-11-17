/* eslint-disable @typescript-eslint/no-unused-vars */

import type { RestEvents } from "discord.js";
import { BaseEvent } from "./";

class RestEvent<Key extends keyof RestEvents> extends BaseEvent {
	public eventName: Key;

	public constructor(eventName: Key) {
		super();
		this.eventName = eventName;
	}

	public override async onTrigger(...params: RestEvents[Key]): Promise<void> {
		throw new Error(
			"[NOT_IMPLEMENTED] The onTrigger event was not implemented",
		);
	}
}

export default RestEvent;
