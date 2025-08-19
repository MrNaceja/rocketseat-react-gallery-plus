import cx from "classnames";
import type { ComponentProps } from "react";

import { Icon, type IconType } from "@/components/ui/icon";

interface TextFieldProps extends ComponentProps<'input'> {
    leadingIcon?: IconType
}
export function TextField({ leadingIcon: LeadingIcon, className, ...inputProps }: TextFieldProps) {
    return (
        <div className={cx("flex items-center p-3 rounded-sm border border-border-primary w-fit focus-within:border-border-active gap-3", className)}>
            {
                LeadingIcon && (
                    <Icon
                        svg={LeadingIcon}
                        className="fill-placeholder"
                    />
                )
            }
            <input type="text" {...inputProps} className="size-full ring-0 outline-0 caret-placeholder placeholder:text-placeholder placeholder:text-sm" />
        </div>
    )
}