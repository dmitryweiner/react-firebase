import { useState } from 'react';
import { useAuth } from 'reactfire';

export default function LogInForm() {
    const auth = useAuth();
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState('');
    const [result, setResult] = useState('');
    const [password, setPassword]= useState('');

    const submit = e => {
        e.preventDefault();
        setResult('');
        if (isRegistration) {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then(result => setResult(result.message))
                .catch(result => setResult(result.message));
        } else {
            auth
                .signInWithEmailAndPassword(email, password)
                .then(result => setResult(result.message))
                .catch(result => setResult(result.message));
        }
    };

    return <form onSubmit={submit}>
        <div>
            {result}
        </div>
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
