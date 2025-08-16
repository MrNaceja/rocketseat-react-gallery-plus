import type { ComponentProps } from "react";

import { Icon, type IconType } from "@/components/icon";

interface TextFieldProps extends ComponentProps<'input'> {
    leadingIcon?: IconType
}
export function TextField({ leadingIcon: LeadingIcon, ...inputProps }: TextFieldProps) {
    return (
        <div className="flex items-center p-3 rounded-sm border border-border-primary w-fit focus-within:border-border-active gap-3">
            {
                LeadingIcon && (
                    <Icon
                        svg={LeadingIcon}
                        className="fill-placeholder"
                    />
                )
            }
            <input type="text" {...inputProps} className="ring-0 outline-0 caret-placeholder placeholder:text-placeholder placeholder:text-sm" />
        </div>
    )
}