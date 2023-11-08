/** Events.js - Server for handling reqest to viewor update events. */
import type * as Party from "partykit/server";
import { json } from "./utils/response";
import type { User } from "./utils/auth";

export type MyEventRequest = {
    id: string;
    connections: number;
    action: "enter" | "leave";
    user?: User;
};

export type MyEvent = {
    id: string;
    title: string;
    connections: number;
    users: {
        id: string;
        joinedAt: string;
        isOnline: boolean;
    }

};

export default class EventsServer implements Party.Server {
    options: Party.ServerOptions = {
        hibernate: true,
        // this opts the chat room into hibernation mode, which
        // allows for a higher number of concurrent connections
    };

    constructor(public party: Party.Party) { }

    async onConnect(connection: Party.Connection) {
        // when a websocket connection is established, send them a list of rooms
        connection.send(JSON.stringify(await this.getMyEvents()));
    }

    async getMyEvents() {
        const myEvents = await this.party.storage.list<MyEvent>();
        return [...myEvents.values()];
    }

    async onRequest(req: Party.Request) {
        return json(await this.getMyEvents());
    }

}