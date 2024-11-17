import { existsSync, mkdirSync, writeFileSync, readFile } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { applicationCache, prepareLogMessage } from "@Constants";
import {
	LogLevelEnum,
	type TLoggerOptions,
	type TLogToFileOptions,
} from "Typings";

class FileLogger {
	public static async log(options: TLoggerOptions): Promise<void> {
		this.__checkIfDirectoryExists();

		const latestLogDirectory: string = applicationCache.logPaths.latest;
		const currentLogDirectory: string = applicationCache.logPaths.current;

		const modifiedMessage: string = prepareLogMessage({
			message: options.message,
			level: options.level,
			colorize: false,
		});

		switch (options.level) {
			case LogLevelEnum.INFO:
				this.__logToFile({
					file: resolvePath(`${latestLogDirectory}/info.log`),
					message: modifiedMessage,
				});
				this.__logToFile({
					file: resolvePath(`${currentLogDirectory}/info.log`),
					message: modifiedMessage,
				});
				break;
			case LogLevelEnum.ERROR:
				this.__logToFile({
					file: resolvePath(`${latestLogDirectory}/errors.log`),
					message: modifiedMessage,
				});
				this.__logToFile({
					file: resolvePath(`${currentLogDirectory}/errors.log`),
					message: modifiedMessage,
				});
				break;
			case LogLevelEnum.DEBUG:
				this.__logToFile({
					file: resolvePath(`${latestLogDirectory}/debug.log`),
					message: modifiedMessage,
				});
				this.__logToFile({
					file: resolvePath(`${currentLogDirectory}/debug.log`),
					message: modifiedMessage,
				});
				break;
			case LogLevelEnum.WARN:
				this.__logToFile({
					file: resolvePath(`${latestLogDirectory}/warnings.log`),
					message: modifiedMessage,
				});
				this.__logToFile({
					file: resolvePath(`${currentLogDirectory}/warnings.log`),
					message: modifiedMessage,
				});
				break;
			case LogLevelEnum.SUCCESS:
				this.__logToFile({
					file: resolvePath(`${latestLogDirectory}/success.log`),
					message: modifiedMessage,
				});
				this.__logToFile({
					file: resolvePath(`${currentLogDirectory}/success.log`),
					message: modifiedMessage,
				});
				break;
		}

		this.__logToFile({
			file: resolvePath(`${latestLogDirectory}/console_output.log`),
			message: modifiedMessage,
		});
		this.__logToFile({
			file: resolvePath(`${currentLogDirectory}/console_output.log`),
			message: modifiedMessage,
		});
	}

	private static __checkIfDirectoryExists(): void {
		if (!existsSync(applicationCache.logPaths.latest))
			mkdirSync(applicationCache.logPaths.latest, { recursive: true });
		if (!existsSync(applicationCache.logPaths.current))
			mkdirSync(applicationCache.logPaths.current, { recursive: true });
	}

	private static __logToFile(options: TLogToFileOptions): void {
		if (!applicationCache.isNewSession && existsSync(options.file)) {
			readFile(options.file, "utf-8", (error, data): void => {
				if (error) throw error;
				writeFileSync(options.file, `${data}\n${options.message}`);
			});
		} else {
			writeFileSync(options.file, options.message);
			applicationCache.isNewSession = false;
		}
	}
}
export default FileLogger;
