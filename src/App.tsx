import { useState } from "react";

import SearchIcon from "@/assets/icons/search.svg?react"
import { Checkbox } from "@/components/checkbox";
import { TextField } from "@/components/text-field";
import { UploadImageField } from "@/components/upload-image-field";

export function App() {
	const [upload, setUpload] = useState<File | undefined>()

	return (
		<div>
			<TextField placeholder="Placeholder" leadingIcon={SearchIcon}/>
			<Checkbox />
			<div className="h-[300px] w-[400px]">
				<UploadImageField value={upload} onChange={setUpload}/>
			</div>
		</div>
	)
}