import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { env } from './utils/env';
import { useDispatch } from 'react-redux';
import { authActions } from './redux/auth-slice';
import { userActions } from './redux/user-slilce';

export default function App() {
	const { getInfo } = useLocalStorage();
	const dispatch = useDispatch();
	useEffect(() => {
		const username = getInfo(env.localStorageKey);
		if(username){
			dispatch(authActions.login());
			dispatch(userActions.setUsername({ username }));
		}
	}, []);
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignUp />} />
				<Route path='/home' element={<Home />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
