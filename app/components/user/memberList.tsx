/** 
 * memberList.tsx
 * React component to show a list of user's avatars, current event status, their online status, & 
 * their username. It also contains types for the member object.
 */

import type { MemberEvent } from "../event/eventView";

/**
 * @type MemberStatus
 * @param username - string
 * @param displayName - string
 * @param image - string | null
 * @returns - Member object
 */
export type MemberStatus = {
    username: string;
    displayName: string;
    image: string | null;
};

/**
 * MemberList
 * @param props - members: Member[], currentEvent: MemberEvent | null, onlineMembers: string[]
 * @returns - React component to show a list of user's avatars, current event status, their online status, & 
 * their username.
 */
function MemberList(props: {
    members: MemberStatus[];
    currentEvent: MemberEvent | null;
    onlineMembers: string[];
}) {
    const { members, currentEvent, onlineMembers } = props;

    return (
        <div className="flex flex-col gap-2">
            {members.map((member) => {
                const isOnline = onlineMembers.includes(member.username);
                const isCurrentEventMember =
                    currentEvent?.members.includes(member.username) ?? false;

                return (
                    <div
                        key={member.username}
                        className="flex items-center gap-2 text-sm"
                    >
                        <div
                            className={`w-8 h-8 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-200"
                                }`}
                        />
                        <div className="flex flex-col gap-1">
                            <p className="font-bold">{member.username}</p>
                            <p
                                className={`${isCurrentEventMember ? "text-green-500" : "text-gray-400"
                                    }`}
                            >
                                {isCurrentEventMember ? "Attending" : "Not attending"}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MemberList;