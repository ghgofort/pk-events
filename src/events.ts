/** Events.js - Server for handling reqest to viewor update events. */

import type * as Party from "partykit/server";
import { json } from "./server/utils/response";
import type { User } from "./server/utils/auth";

export type MyEventRequest = {
    id: string;
    connections: number;
    action: "enter" | "leave";
    user?: User;
};

/** Information about an event party, used to connect to the party */
export type MyEvent = {
    id: string;
    title: string;
    connections: number;
    users: {
        username: string;
        joinedAt: string;
        isOnline: boolean;
        displayName?: string;
        image?: string;
    }[];
};

/** Event request to delete - notifies us when it's deleted  */
export type EventDeleteRequest = {
    id: string;
    action: "delete";
};

/**
 * @class EventsServer - Server for handling reqest to view or update events.
 */
export default class EventsServer implements Party.Server {
    options: Party.ServerOptions = {
        hibernate: true,
        // this opts the event server into hibernation mode, which
        // allows for a higher number of concurrent connections
    };

    constructor(public party: Party.Party) { }

    /** onConnect callback implemented per `Party.Server` interface */
    async onConnect(connection: Party.Connection) {
        // when a websocket connection is established, send them a list of thier
        // events.
        connection.send(JSON.stringify(await this.getMyEvents()));
    }

    /** Gets list of active events for the current user */
    async getMyEvents() {
        const myEvents = await this.party.storage.list<MyEvent>();
        return [...myEvents.values()];
    }

    /** onRequest is implemented per interface - returns list of active rooms */
    async onRequest(req: Party.Request) {
        return json(await this.getMyEvents());
    }

    /** Updates list of active rooms with information received from chatroom */
    async updateEventInfo(req: Party.Request) {
        const update = (await req.json()) as
            | MyEventRequest
            | EventDeleteRequest;

        if (update.action === "delete") {
            await this.party.storage.delete(update.id);
            return this.getMyEvents();
        }

        const persistedInfo = await this.party.storage.get<MyEvent>(update.id);
        if (!persistedInfo && update.action === "leave") {
            return this.getMyEvents();
        }

        const info = persistedInfo ?? {
            id: update.id,
            connections: 0,
            users: [],
        };

        info.connections = update.connections;

        const user = update.user;
        if (user) {
            if (update.action === "enter") {
                // bump user to the top of the list on entry
                info.users = info.users.filter((u) => u.username !== user.username);
                info.users.unshift({
                    username: user.username,
                    image: user.image,
                    joinedAt: new Date().toISOString(),
                    displayName: user.displayName || user.username,
                    isOnline: true,
                });
            } else {
                info.users = info.users.map((u) =>
                    u.username === user.username
                        ? { ...u, present: false, leftAt: new Date().toISOString() }
                        : u
                );
            }
        }
    }
};
