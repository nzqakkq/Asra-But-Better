/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IClientEvents } from "Typings";
import { BaseEvent } from "./";

class ClientEvent<Key extends keyof IClientEvents> extends BaseEvent {
	public eventName: Key;

	public constructor(eventName: Key) {
		super();
		this.eventName = eventName;
	}

	public override async onTrigger(
		...params: IClientEvents[Key]
	): Promise<void> {
		throw new Error(
			"[NOT_IMPLEMENTED] The onTrigger method was not implemented",
		);
	}
}

export default ClientEvent;
