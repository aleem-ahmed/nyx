import { Routes, Route } from "react-router-dom";

import './App.scss';
import Root from "./pages/Root";
import Asset from "./pages/Asset";
import ListTokens from "./pages/ListTokens";

function App() {
	return (
		<div className="App">
			<div className="container">
				<header className="py-4">
					<h6>NYX</h6>
				</header>

				<div className="row">
					<div className="col-12">
						<Routes>
							<Route path="/" element={<Root />} />
							<Route path="/list-tokens" element={<ListTokens />} />
							<Route path="/asset/:product_id" element={<Asset />} />
						</Routes>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
