import { useState } from 'react';
import 'firebase/firestore';
import {
    useAuth,
    useUser,
    useFirestore,
    useFirestoreCollectionData
} from 'reactfire';

export default function ChatFirestore() {
    const auth = useAuth();
    const { data: user } = useUser();
    const [ content, setContent] = useState('');
    const messagesRef = useFirestore().collection('messages');
    const { status, data: messages } = useFirestoreCollectionData(messagesRef);
    let revertedMessages = [];
    if (status !== 'loading') {
        revertedMessages = [...messages].reverse();
    }

    function logout() {
        auth.signOut();
    }

    function submit(e) {
        e.preventDefault();
        messagesRef.doc().set({
            uid: user.uid,
            email: user.email,
            content
        });
        setContent('');
    }

    function deleteMessage(id) {
        messagesRef.doc(id).delete();
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
                            {message.uid === user.uid && (
                                <button onClick={() => deleteMessage(message.NO_ID_FIELD)}>[x]</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
    </>;
}
