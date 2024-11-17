import { type TLoggerOptions } from "Typings";
import { prepareLogMessage } from "@Constants";

export default class ConsoleLogger {
	public static log(options: TLoggerOptions): void {
		const message: string = prepareLogMessage({
			message: options.message,
			level: options.level,
			colorize: true,
		});

		console.log(message);
	}
}
