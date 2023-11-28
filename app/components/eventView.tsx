/**
 * eventView.tsx
 * React component to show the details of an event, including the event's name, description,
 * member list, and start time & end time. Also exported are types for the event object.
 */

import { useState } from "react";
import MemberList, { type Member } from "./memberList";

/**
 * @type MemberEvent
 * @param id - string
 * @param name - string
 * @param description - string
 * @param startTime - string
 * @param endTime - string
 * @param members - string[]
 * @returns - MemberEvent object
 */
export type MemberEvent = {
    id: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    members: string[];
};

/**
 * EventView
 * @param props - event: MemberEvent, members: Member[], onlineMembers: string[]
 * @returns - React component to show the details of an event, including the event's name, description,
 * member list, and start time & end time.
 */
function EventView(props: {
    event: MemberEvent;
    members: Member[];
    onlineMembers: string[];
}) {
    const [ memberEvent, getMemberEvent ] = useState(props.event);
    const [ members, getMembers ] = useState(props.members);
    const [ onlineMembers, getOnlineMembers ] = useState(props.onlineMembers);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{memberEvent.name}</h1>
                <p>{memberEvent.description}</p>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Members</h2>
                <MemberList
                    members={members}
                    currentEvent={memberEvent}
                    onlineMembers={onlineMembers}
                />
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Time</h2>
                <p>
                    {new Date(memberEvent.startTime).toLocaleString()} -{" "}
                    {new Date(memberEvent.endTime).toLocaleString()}
                </p>
            </div>
        </div>
    );
}

export default EventView;