/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/no-empty-function */

import { type TLogger, type TLoggerOptions } from "Typings";
import { ConsoleLogger, DiscordLogger } from "@Structures";
import FileLogger from "./FileLogger";

export default class Logger implements TLogger {
	constructor() {}
	public async log(options: TLoggerOptions): Promise<void> {
		const { message, level }: TLoggerOptions = options;
		ConsoleLogger.log({ message, level });
		await DiscordLogger.log({ message, level });
		await FileLogger.log({ message, level });
	}
}
