import { EmbedBuilder, type APIEmbed, type APIEmbedField } from "discord.js";
import type { TCustomEmbedBuilder, TCustomEmbedBuilderOptions } from "Typings";
import config from "@Config";

class CustomEmbedBuilder implements TCustomEmbedBuilder {
	private readonly __embed: EmbedBuilder;
	private readonly __NoTimestamp: boolean;

	public constructor(options: TCustomEmbedBuilderOptions) {
		this.__embed = new EmbedBuilder().setColor(
			config.misc.embedColors.main,
		);
		this.__NoTimestamp = options.timestamp === "NoTimestamp";
		this.modifyMessageEmbed(options);
		return this;
	}

	public modifyMessageEmbed(
		options: TCustomEmbedBuilderOptions,
	): TCustomEmbedBuilder {
		if (options.timestamp === "NoTimestamp")
			this.__embed.setTimestamp(null);
		else if (options.timestamp)
			this.__embed.setTimestamp(options.timestamp);
		else if (!options.timestamp && !this.__NoTimestamp) {
			this.__embed.setTimestamp(new Date());
		}

		if (options.color) this.__embed.setColor(options.color);
		if (options.author) this.__embed.setAuthor(options.author);
		if (options.description)
			this.__embed.setDescription(options.description);
		if (options.fields) this.__embed.setFields(options.fields);
		if (options.footer) this.__embed.setFooter(options.footer);
		if (options.image) this.__embed.setImage(options.image);
		if (options.thumbnail) this.__embed.setThumbnail(options.thumbnail);
		if (options.title) this.__embed.setTitle(options.title);
		if (options.url) this.__embed.setURL(options.url);
		return this;
	}

	public ToJSON(): APIEmbed {
		return this.__embed.toJSON();
	}

	public spliceFields(
		index: number,
		deleteCount: number,
		...fields: APIEmbedField[]
	): this {
		this.__embed.spliceFields(index, deleteCount, ...fields);
		return this;
	}

	public addFields(fields: APIEmbedField[]): this {
		this.__embed.addFields(fields);
		return this;
	}
}

export default CustomEmbedBuilder;
