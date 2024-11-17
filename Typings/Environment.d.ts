/* eslint-disable @typescript-eslint/naming-convention */

declare module "bun" {
	type Env = {
		ENVIRONMENT: "production" | "development";
		PRODUCTION_TOKEN: string;
		DEVELOPMENT_TOKEN: string;
	};
}

export {};
