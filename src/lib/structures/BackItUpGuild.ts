import type BackItUpClient from "../Client.js";
import type { BackItUpSettings } from "./type.js";

export class BackItUpGuild {
	public backUpIds: string[];

	public constructor(public client: BackItUpClient, data: BackItUpSettings) {
		this.backUpIds = data.backUpIds;
	}
}
