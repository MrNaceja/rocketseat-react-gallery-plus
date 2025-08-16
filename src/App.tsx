import SearchIcon from "@/assets/icons/search.svg?react"
import { TextField } from "@/components/text-field";

export function App() {
	return (
		<div>
			<TextField placeholder="Placeholder" leadingIcon={SearchIcon}/>
		</div>
	)
}