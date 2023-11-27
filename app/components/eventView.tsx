/**
 * eventView.tsx
 * React component to show the details of an event, including the event's name, description,
 * member list, and start time & end time. Also exported are types for the event object.
 */

import MemberList, { type Member } from "./memberList";

export type MemberEvent = {
    id: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    members: string[];
};

function EventView(props: {
    event: MemberEvent;
    members: Member[];
    onlineMembers: string[];
}) {
    const { event, members, onlineMembers } = props;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{event.name}</h1>
                <p>{event.description}</p>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Members</h2>
                <MemberList
                    members={members}
                    currentEvent={event}
                    onlineMembers={onlineMembers}
                />
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Time</h2>
                <p>
                    {new Date(event.startTime).toLocaleString()} -{" "}
                    {new Date(event.endTime).toLocaleString()}
                </p>
            </div>
        </div>
    );
}

export default EventView;