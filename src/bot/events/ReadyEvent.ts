import { ApplyOptions, EventListener, EventListenerOptions } from "@snowcrystals/iglo";
import { bold } from "colorette";

@ApplyOptions<EventListenerOptions>({
	name: "ready",
	once: true
})
export default class extends EventListener {
	public override run() {
		this.client.logger.info(`${bold(this.client.user!.tag)} is up and running.`);
	}
}
