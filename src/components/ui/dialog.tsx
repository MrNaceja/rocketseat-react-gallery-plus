import * as RadixDialog from "@radix-ui/react-dialog"
import cx from "classnames"
import type { ComponentProps } from "react"

import CloseIcon from "@/assets/icons/x.svg?react"
import { Divider } from "@/components/ui/divider"
import { Icon } from "@/components/ui/icon"
import { Text } from "@/components/ui/text"

function Content({ className, ...contentProps }: RadixDialog.DialogContentProps) {
    return (
        <RadixDialog.Portal>
            <RadixDialog.Overlay
                className={`    
                    fixed inset-0 bg-background-secondary/25 backdrop-blur-xs   
                    data-[state=open]:animate-in 
                    data-[state=closed]:animate-out 

                    data-[state=open]:fade-in-0 
                    data-[state=closed]:fade-out-0
                `}
            />
            <RadixDialog.Content
                {...contentProps}
                className={cx(`
                    fixed top-1/2 left-1/2 -translate-1/2 bg-background-primary rounded-lg p-8
                    flex flex-col border border-border-primary/50

                    data-[state=open]:animate-in
                    data-[state=open]:fade-in-0
                    data-[state=open]:slide-in-from-bottom-25

                    data-[state=closed]:animate-out
                    data-[state=closed]:fade-out-0
                    data-[state=closed]:slide-out-from-bottom-25
                `, className)}
            />
        </RadixDialog.Portal>
    )
}

function Title({ children, ...titleProps }: RadixDialog.DialogTitleProps) {
    return (
        <RadixDialog.Title {...titleProps} asChild>
            <Text variant="heading-medium" className="text-heading">{children}</Text>
        </RadixDialog.Title>
    )
}

function Close(props: RadixDialog.DialogCloseProps) {
    return (
        <Dismiss {...props}>
            <Icon
                svg={CloseIcon}
                className="fill-placeholder hover:fill-heading"
            />
        </Dismiss>
    )
}

function Dismiss(props: RadixDialog.DialogCloseProps) {
    return (
        <RadixDialog.Close {...props} />
    )
}

function Header({ className, ...headerProps }: ComponentProps<"header">) {
    return (
        <>
            <header className={cx("flex items-center gap-3 justify-between", className)} {...headerProps} />
            <Divider className="my-2.5" />
        </>
    )
}

function Footer({ className, ...footerProps }: ComponentProps<"footer">) {
    return (
        <>
            <Divider className="my-2.5" />
            <footer className={cx("flex items-center gap-3 justify-end", className)} {...footerProps} />
        </>
    )
}

function Body(props: ComponentProps<"main">) {
    return (
        <main {...props} />
    )
}

export const Dialog = {
    Root: RadixDialog.Root,
    Trigger: RadixDialog.Trigger,
    Description: RadixDialog.Description,
    Close,
    Dismiss,
    Title,
    Header,
    Body,
    Footer,
    Content
}