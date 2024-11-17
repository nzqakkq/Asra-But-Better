/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { ClientEvents } from "discord.js";
import type { TExtendedClient } from "./";

export interface IClientEvents extends Omit<ClientEvents, "ready"> {
	ready: [client: TExtendedClient<true>];
}
