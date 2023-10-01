interface Secrets {
	apiHost: string;
}

interface Config {
	secrets: Secrets;
}

let cache: Config | null = null;

const environment = import.meta.env.VITE_APP_ENVIRONMENT || "development";

const config = (): Config => {
	if (!cache) {
		cache = Object.freeze({
			secrets: {
				apiHost:
					environment === "development"
						? "http://127.0.0.1:4010"
						: "http://127.0.0.1:4010",
			},
		});
	}
	return cache;
};

export default config;