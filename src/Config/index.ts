import type { TConfig } from "Typings";
import BotConfig from "./BotConfig";
import ChannelsConfig from "./ChannelsConfig";
import MiscConfig from "./MiscConfig";

const Config: TConfig = {
	bot: BotConfig,
	channels: ChannelsConfig,
	misc: MiscConfig,
};

export default Config;
