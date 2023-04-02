import { Container, Col, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import FreeComponent from './FreeComponent';
/* Importing the Account component from the Account.js file. */
import Account from './Account';
import AuthComponent from './AuthComponent';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
	return (
		<Container>
			<Row>
				<Col className="text-center">
					<h1>React Authentication Tutorial</h1>

					<section id="navigation">
						<a href="/">Home</a>
						<a href="/free">Free Component</a>
						<a href="/auth">Auth Component</a>
					</section>
				</Col>
			</Row>
			<Routes>
				<Route path="/" element={Account} />
				<Route path="/free" element={FreeComponent} />
				<ProtectedRoutes path="/auth" element={AuthComponent} />
			</Routes>
		</Container>
	);
}

export default App;
