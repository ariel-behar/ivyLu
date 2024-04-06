import { Container } from "@mui/material";
import { useRouteError } from "react-router-dom"
import Header from "../components/Header/Header"

function ErrorView() {
	const error = useRouteError() as { message: string };

	return (
		<>
			<Header />

			<Container>
				<div>ErrorView</div>

				<h1>Under Construction</h1>

				<h1>{error?.message}</h1>
			</Container>
		</>
	)
}

export default ErrorView