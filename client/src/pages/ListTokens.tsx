import axios from "axios"
import { useState, useEffect } from "react";


export default function ListTokens() {
	// [STATE-VARIABLES]
	const [loading, setLoading] = useState(false);
	const [coinbaseAssets, set_coinbaseAssets] = useState<any[]>([]);

	
	useEffect(() => {
		setLoading(true);

		axios({
			method: 'GET',
			url: '/api/list-tokens',
			responseType: 'json'
		})
		.then((res) => {
			set_coinbaseAssets(res.data.coinbaseCurrencies);

			setLoading(false);
		});
	}, []);


	return (	
		<div>
			{
				!loading ? 
					<div className="row">
						<div className="col-2">
							<h6 className="text-primary">Id</h6>
						</div>

						<div className="col-10">
							<h6 className="text-primary">Name</h6>
						</div>

						{
							coinbaseAssets.map((s, i) => {
								return (
									<>
										<div className="col-2">
											<span>{s.id}</span>
										</div>

										<div className="col-10">
											<span>{s.name}</span>
										</div>
									</>
								) 
							})
						}
					</div>
				:
					<h6>Loading..</h6>
			}
		</div>
	);
}
