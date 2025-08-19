import { type ComponentProps, useId } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import CheckIcon from "@/assets/icons/check.svg?react"
import { Icon } from "@/components/ui/icon";

const checkboxWrapperVariants = tv({
    base: "rounded-xs border border-border-primary has-checked:border-accent-brand has-checked:bg-accent-brand grid place-items-center group hover:border-border-active",
    variants: {
        size: {
            md: "size-4"
        }
    },
    defaultVariants: {
        size: "md"
    }
})

interface CheckboxProps extends Omit<ComponentProps<'input'>, "size">, VariantProps<typeof checkboxWrapperVariants> { }
export function Checkbox({ id, size, ...inputProps }: CheckboxProps) {
    const defaultId = useId()
    id = id ?? defaultId

    return (
        <label htmlFor={id} className={checkboxWrapperVariants({ size })}>
            <input id={id} type="checkbox" {...inputProps} className="appearance-none peer" />
            <Icon
                svg={CheckIcon}
                className="fill-white size-3 not-peer-checked:hidden"
            />
        </label>
    )
}