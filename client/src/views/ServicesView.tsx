import { useEffect, useState } from "react";

import * as serviceServices from '../services/serviceServices'

function ServicesView() {
	let [services, setServices] = useState<object[]>([]);

	useEffect(() => {
		serviceServices.getAll()
			.then(data => {
				setServices(data)
			})

		return () => {
		}
	}, [])



	return (
		<div>

		</div>
	)
}

export default ServicesView