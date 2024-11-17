class BaseEvent {
	public async onLoad(): Promise<void> {
		throw new Error(
			"[NOT_IMPLEMENTED] The onLoad event was not implemented",
		);
	}

	public async onTrigger(): Promise<void> {
		throw new Error(
			"[NOT_IMPLEMENTED] The onTrigger event was not implemented",
		);
	}
}

export default BaseEvent;
