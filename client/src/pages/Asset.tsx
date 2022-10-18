import axios from "axios"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
import "../sass-variables.scss";



export default () => {
	// [PARAMS]
	const { product_id } = useParams();
	
	// [STATE-VARIABLES]
	const [loading, setLoading] = useState(true);
	const [data, set_data] = useState<any>();

	// [chart.js] Register
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	useEffect(() => {
		const fetchData = async () =>{
			setLoading(true);
		
			const res = await axios.get(`/api/candles/${product_id}?granularity=300`);
			
			set_data({
				labels: res.data.candles.map((c: any) => new Date(c[0]).toLocaleTimeString()),
				datasets: [
					{
						label: 'Low',
						data: res.data.candles.map((c: any) => c[1]),
						borderColor: 'red'
					},
					{
						label: 'High',
						data: res.data.candles.map((c: any) => c[2]),
						borderColor: 'green'
					},
					{
						label: 'Close',
						data: res.data.candles.map((c: any) => c[4]),
						borderColor: 'white'
					},
				],
			});
			
			setLoading(false);
		}
		
		fetchData();
	}, []);


	return (	
		<div>
			<h3>{product_id}</h3>
			{
				!loading ? <>
					<Line
						className="mb-3"
						options={
							{
								responsive: true,
								plugins: {
									legend: {
										position: 'bottom' as const,
									},
									title: {
										display: true,
										text: product_id,
									},
								},
							}
						}
						data={data}
					/>

					<table className="table table-striped table-dark">
						<thead>
							<tr>
								<td>Exchange</td>
								<td>Price</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Coinbase</td>
								<td>{
									data.datasets[2].data[
										data.datasets[2].data.length - 1
									]
								}</td>
							</tr>
						</tbody>
					</table>
				</>
				:
					<h6 className="text-center text-warning">Loading..</h6>
			}

			
		</div>
	);
}