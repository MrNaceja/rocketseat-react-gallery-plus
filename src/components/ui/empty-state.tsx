import cx from "classnames"
import type { ComponentProps } from "react"

import EmptyStateIlustration from "@/assets/images/select-checkbox.svg?react"
import { Text } from "@/components/ui/text"

export function EmptyState({ children, className, ...props }: ComponentProps<"div">) {
    return (
        <div 
            className={cx("flex flex-col size-full gap-3 items-center justify-center", className)} 
            {...props}
        >
            <EmptyStateIlustration />
            <Text variant="paragraph-medium" className="text-accent-paragraph">
                {children}
            </Text>
        </div>
    )
}