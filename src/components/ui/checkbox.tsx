import { type ComponentProps, useId } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import CheckIcon from "@/assets/icons/check.svg?react"
import { Icon } from "@/components/ui/icon";

const checkboxWrapperVariants = tv({
    base: "rounded-xs border border-border-primary has-checked:border-accent-brand has-checked:bg-accent-brand grid place-items-center group hover:border-border-active bg-background-primary",
    variants: {
        size: {
            md: "size-4"
        },
        disabled: {
            false: "",
            true: "pointer-events-none"
        }
    },
    defaultVariants: {
        size: "md",
        disabled: false
    }
})

interface CheckboxProps extends Omit<ComponentProps<'input'>, "size" | "onChange">, VariantProps<typeof checkboxWrapperVariants> {
    onChange?: (checked: boolean) => void
}
export function Checkbox({ id, size, className, checked, onChange, disabled, ...inputProps }: CheckboxProps) {
    const defaultId = useId()
    id = id ?? defaultId

    const handleCheckChange = () => {
        onChange?.(!checked)
    }

    return (
        <label htmlFor={id} className={checkboxWrapperVariants({ size, disabled, className })}>
            <input id={id} type="checkbox" {...inputProps} disabled={disabled} className="appearance-none peer" onChange={handleCheckChange}/>
            <Icon
                svg={CheckIcon}
                className="fill-white size-3 not-peer-checked:hidden"
            />
        </label>
    )
}