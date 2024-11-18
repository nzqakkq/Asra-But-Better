import { EmbedBuilder, type APIEmbed, type APIEmbedField } from "discord.js";
import type { TCustomEmbedBuilder, TCustomEmbedBuilderOptions } from "Typings";
import config from "@Config";

class CustomEmbedBuilder implements TCustomEmbedBuilder {
    private readonly embed: EmbedBuilder;
    private readonly noTimestamp: boolean;

    // Constructor with default values
    public constructor(options: Partial<TCustomEmbedBuilderOptions> = {}) {
        this.embed = new EmbedBuilder()
            .setColor(options.color ?? config.misc.embedColors.main);
        
        this.noTimestamp = options.timestamp === "NoTimestamp";
        this.applyOptions(options);
    }

    // Private method to handle timestamp logic
    private handleTimestamp(timestamp?: Date | "NoTimestamp"): void {
        if (timestamp === "NoTimestamp") {
            this.embed.setTimestamp(null);
        } else if (timestamp) {
            this.embed.setTimestamp(timestamp);
        } else if (!this.noTimestamp) {
            this.embed.setTimestamp(new Date());
        }
    }

    // Private method to apply embed options
    private applyOptions(options: Partial<TCustomEmbedBuilderOptions>): void {
        const {
            color,
            author,
            description,
            fields,
            footer,
            image,
            thumbnail,
            title,
            url,
            timestamp
        } = options;

        // Using optional chaining and nullish coalescing
        this.handleTimestamp(timestamp);
        
        if (color) this.embed.setColor(color);
        if (author) this.embed.setAuthor(author);
        if (description) this.embed.setDescription(description);
        if (fields?.length) this.embed.setFields(fields);
        if (footer) this.embed.setFooter(footer);
        if (image) this.embed.setImage(image);
        if (thumbnail) this.embed.setThumbnail(thumbnail);
        if (title) this.embed.setTitle(title);
        if (url) this.embed.setURL(url);
    }

    // Method to modify embed with new options
    public modifyMessageEmbed(
        options: Partial<TCustomEmbedBuilderOptions>
    ): this {
        this.applyOptions(options);
        return this;
    }

    // Method to convert to JSON
    public toJSON(): APIEmbed {
        return this.embed.toJSON();
    }

    // Method to splice fields with type safety
    public spliceFields(
        index: number,
        deleteCount: number,
        ...fields: APIEmbedField[]
    ): this {
        this.embed.spliceFields(index, deleteCount, ...fields);
        return this;
    }

    // Method to add fields with validation
    public addFields(fields: APIEmbedField[]): this {
        if (!Array.isArray(fields)) {
            throw new TypeError('Fields must be an array of APIEmbedField');
        }
        this.embed.addFields(fields);
        return this;
    }

    // Getter for the underlying EmbedBuilder
    public getEmbed(): EmbedBuilder {
        return this.embed;
    }

    // Method to create a clone of the embed
    public clone(): CustomEmbedBuilder {
        const newEmbed = new CustomEmbedBuilder();
        newEmbed.embed.data = { ...this.embed.data };
        newEmbed.noTimestamp = this.noTimestamp;
        return newEmbed;
    }

    // Static factory method for common embed types
    public static createBasicEmbed(
        title: string, 
        description: string
    ): CustomEmbedBuilder {
        return new CustomEmbedBuilder({
            title,
            description
        });
    }
}

export default CustomEmbedBuilder;
