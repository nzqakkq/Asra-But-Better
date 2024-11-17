/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection Annotator

import {
	EventTypeEnum,
	type TExtendedClient,
	type TImportFileOptions,
} from "Typings";
import type { ClientOptions } from "discord.js";
import { Client } from "discord.js";
import { glob } from "glob";
import { relative as relativePath, resolve as resolvePath } from "node:path";
import { ClientEvent, RestEvent } from "@Structures";

export default class ExtendedClient extends Client implements TExtendedClient {
	public constructor(options: ClientOptions) {
		super(options);
	}

	public async initialize(): Promise<void> {
		await this.__loadEvents(EventTypeEnum.CLIENT_EVENT);
		await this.__loadEvents(EventTypeEnum.REST_EVENT);
		await this.login(
			Bun.env["ENVIRONMENT"] == "production"
				? Bun.env["PRODUCTION_TOKEN"]
				: Bun.env["DEVELOPMENT_TOKEN"],
		);
	}

	private async __importFile<T>(options: TImportFileOptions): Promise<T> {
		let file;

		if (options.filePath.endsWith(".json"))
			file = await import(options.filePath, {
				assert: { type: "json" },
			});
		else file = await import(options.filePath);

		file = options.default ? file.default : file;
		return file;
	}

	private async __loadEvents(option: EventTypeEnum): Promise<void> {
		let path = `${__dirname}/../Events`;
		if (option === EventTypeEnum.CLIENT_EVENT)
			path = resolvePath(`${path}/ClientEvents`);
		else if (option === EventTypeEnum.REST_EVENT)
			path = resolvePath(`${path}/RestEvents`);

		const eventFiles: string[] = await glob(`${path}/*.ts`);
		for (const eventFile of eventFiles) {
			const filePath: string = relativePath(
				__dirname,
				resolvePath(eventFile),
			).replaceAll("\\", "/");
			this.__importFile<any>({
				filePath,
				default: true,
			}).then((Event: any): void => {
				const event = new Event();
				if (!event.EventName) return;

				if (event instanceof RestEvent)
					this.rest.on(event.eventName, event.onTrigger.bind(event));
				else if (event instanceof ClientEvent)
					this.on(event.eventName, event.onTrigger.bind(event));

				event.onLoad();
			});
		}
	}
}
