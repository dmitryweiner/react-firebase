import { useState } from 'react';
import { useAuth } from 'reactfire';

export default function LogInForm() {
    const auth = useAuth();
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');

    const submit = e => {
        e.preventDefault();
        if (isRegistration) {
            auth.createUserWithEmailAndPassword(email, password);
        } else {
            auth.signInWithEmailAndPassword(email, password);
        }
    };

    return <form onSubmit={submit}>
        <div>
            <label>
                Email:
                <input value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
        </div>
        <div>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
        </div>
        <div>
            <label>
                Registration:
                <input type="checkbox" value={isRegistration} onChange={e => setIsRegistration(e.target.checked)}/>
            </label>
        </div>
        <div>
            <button type="submit">{isRegistration ? 'Registration' : 'Login'}</button>
        </div>
    </form>;
}
