import { useState } from 'react';
import {
    useAuth,
    useDatabase,
    useDatabaseListData,
    useUser
} from 'reactfire';

export default function Chat() {
    const auth = useAuth();
    const { data: user } = useUser();
    const [ content, setContent] = useState('');
    const messagesRef = useDatabase().ref('messages');
    const { status, data: messages } = useDatabaseListData(messagesRef);
    let revertedMessages = [];
    if (status !== 'loading') {
        revertedMessages = [...messages].reverse();
    }

    function logout() {
        auth.signOut();
    }

    function submit(e) {
        e.preventDefault();
        messagesRef.push({
            email: user.email,
            content
        });
        setContent('');
    }

    return <>
        <div>
            {user.email}
            <button onClick={logout}>Logout</button>
        </div>
        <div>
            <form onSubmit={submit}>
                <input value={content} onChange={e => setContent(e.target.value)}/>
                <button type="submit">Send</button>
            </form>
        </div>
            {status !== 'loading' && (
                <ul>
                    {revertedMessages.map(message => (
                        <li key={message.NO_ID_FIELD}>
                            <b>
                                {message.email}:&nbsp;
                            </b>
                            {message.content}
                        </li>
                    ))}
                </ul>
            )}
    </>;
}
