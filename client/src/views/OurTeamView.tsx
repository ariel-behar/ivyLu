import { useLoaderData } from "react-router-dom"
import { User } from "../models/User";

function OurTeamView() {
	const hairdressers = useLoaderData() as User[];
	console.log('hairdressers:', hairdressers)

	return (
		<div>OurTeamView</div>
	)
}

export default OurTeamView