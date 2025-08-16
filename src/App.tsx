import SearchIcon from "@/assets/icons/search.svg?react"
import { Checkbox } from "@/components/checkbox";
import { TextField } from "@/components/text-field";

export function App() {
	return (
		<div>
			<TextField placeholder="Placeholder" leadingIcon={SearchIcon}/>
			<Checkbox />
		</div>
	)
}