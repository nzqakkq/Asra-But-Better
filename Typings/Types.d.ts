import {
	type APIEmbed,
	type APIEmbedField,
	Client,
	Collection,
	type ColorResolvable,
	type EmbedData,
	ForumChannel,
	type Snowflake,
	type ThreadChannel,
} from "discord.js";
import { ApplicationCacheChannelsKeyEnum } from "./Enums";

export type TLogLevel = "error" | "warn" | "info" | "debug" | "success";
export type TApplicationCache = {
	logPaths: {
		latest: string;
		current: string;
	};
	Channels: {
		ThreadChannels: Collection<
			ApplicationCacheChannelsKeyEnum,
			ThreadChannel
		>;
		ForumChannels: Collection<
			ApplicationCacheChannelsKeyEnum,
			ForumChannel
		>;
		//guild_text_based_channels: Collection<string, GuildTextBasedChannel>;
	};
	isNewSession: boolean;
};

export type TExtendedClient = Client & {
	initialize: () => Promise<void>;
};

export type TLogger = {
	log: (options: TLoggerOptions) => Promise<void>;
};

export type TCustomEmbedBuilder = {
	modifyMessageEmbed: (
		options: TCustomEmbedBuilderOptions,
	) => TCustomEmbedBuilder;
	ToJSON: () => APIEmbed;
	spliceFields: (
		index: number,
		deleteCount: number,
		...fields: APIEmbedField[]
	) => TCustomEmbedBuilder;
	addFields: (fields: APIEmbedField[]) => TCustomEmbedBuilder;
};

export type TPrepareLogMessageOptions = {
	message: string;
	level: TLogLevel;
	colorize: boolean;
};

export type TLoggerOptions = {
	message: any; //eslint-disable-line @typescript-eslint/no-explicit-any
	level: TLogLevel;
};

export type TLogToFileOptions = {
	message: string;
	file: string;
};

export type TBotConfig = {
	ownerIds: Snowflake[];
	isLogDebug: boolean;
};

export type TChannelsConfig = {
	logsForumChannel: Snowflake;
	errorLogsForumChannel: Snowflake;
};

export type TEmbedColours = {
	main: ColorResolvable;
	red: ColorResolvable;
	green: ColorResolvable;
	yellow: ColorResolvable;
	blue: ColorResolvable;
	purple: ColorResolvable;
};

export type TMiscConfig = {
	embedColors: TEmbedColours;
};

export type TConfig = {
	bot: TBotConfig;
	channels: TChannelsConfig;
	misc: TMiscConfig;
};

export type TCustomEmbedBuilderOptions = Omit<
	EmbedData,
	"timestamp" | "type" | "image" | "color" | "thumbnail" | "fields"
> & {
	timestamp?: Date | number | null | "NoTimestamp";
	image?: string;
	color?: ColorResolvable | null;
	thumbnail?: string;
	fields?: APIEmbedField[];
};

export type TImportFileOptions = {
	filePath: string;
	default: boolean;
};
