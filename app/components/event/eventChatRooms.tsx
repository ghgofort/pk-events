/**
 * eventChat.tsx
 * React component to show a list of chat rooms associated with the event & a
 * brief status message for each chat room. Clicking on a chat room will open
 * the chat room.
 */

import { useState } from "react";

/**
 * @type ChatRoom
 * @param id - string
 * @param name - string
 * @param description - string
 * @param status - string
 * @returns - ChatRoom object
 */
export type ChatRoom = {
    id: string;
    name: string;
    description: string;
    status: string;
};

/**
 * EventChat
 * @param props - chatRooms: ChatRoom[]
 * @returns - React component to show a list of chat rooms associated with the event & a
 * brief status message for each chat room. Clicking on a chat room will open
 * the chat room.
 */
function EventChat(props: { chatRooms: ChatRoom[] }) {
    const [ chatRooms, getChatRooms ] = useState(props.chatRooms);

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Chat Rooms</h2>
            <div className="flex flex-col gap-2">
                {chatRooms.map((chatRoom) => (
                    <div
                        key={chatRoom.id}
                        className="flex flex-col gap-1 cursor-pointer"
                    >
                        <h3 className="text-base font-bold">{chatRoom.name}</h3>
                        <p>{chatRoom.description}</p>
                        <p>{chatRoom.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventChat;