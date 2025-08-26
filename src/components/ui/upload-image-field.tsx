import {
    type ComponentProps,
    createContext,
    useContext,
    useRef,
    useState,
} from "react";

import ImageIcon from "@/assets/icons/image.svg?react";
import UploadIcon from "@/assets/icons/upload-file.svg?react";
import { Icon } from "@/components/ui/icon";
import { Text, textVariants } from "@/components/ui/text";

export const acceptedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

type UploadImageFieldErrors = {
    exceedMaxUploadSize: boolean
}

type UploadImageFieldContextState = {
    inputProps: ComponentProps<"input">
    value?: File;
    attach: (file?: File) => void;
    detach: () => void;
    errors: UploadImageFieldErrors
    setErrors: (errors: UploadImageFieldErrors) => void,
    maxUploadSizeMB: number
};

const UploadImageFieldContext = createContext(
    {} as UploadImageFieldContextState
);

const useUploadImageField = () => useContext(UploadImageFieldContext);

interface UploadImageFieldProps extends Omit<ComponentProps<"input">, "onChange" | "value"> {
    value?: File,
    onChange: (file?: File) => void,
    maxUploadSizeMB?: number
}
export function UploadImageField({ value, onChange, maxUploadSizeMB = 1, ...inputProps }: UploadImageFieldProps) {
    const [errors, setErrors] = useState<UploadImageFieldErrors>({
        exceedMaxUploadSize: false
    })

    const attach = (file?: File) => {
        onChange(file)
    };

    const detach = () => {
        onChange(undefined);
    };

    return (
        <UploadImageFieldContext.Provider
            value={{
                value,
                attach,
                detach,
                inputProps,
                errors,
                setErrors,
                maxUploadSizeMB
            }}
        >
            <section>
                {
                    (!value || errors.exceedMaxUploadSize)
                        ? <UploadArea />
                        : (
                            <>
                                <UploadPreview uploadedImageFile={value} />
                                <UploadedItemIndicator />
                            </>
                        )
                }
            </section>
        </UploadImageFieldContext.Provider>
    );
}

function UploadArea() {
    const { attach, inputProps, errors, setErrors, maxUploadSizeMB } = useUploadImageField();
    const inputFileRef = useRef<HTMLInputElement>(null)

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const maxFileSizeBytes = (maxUploadSizeMB * 1024 * 1024)
        const isExceededMaxUploadSize = (!!file && (file.size > maxFileSizeBytes))
        setErrors({
            exceedMaxUploadSize: isExceededMaxUploadSize
        })

        if (isExceededMaxUploadSize) {
            if (inputFileRef.current) {
                inputFileRef.current.value = ""
            }
            return;
        }

        attach(file);
    };

    return (
        <div
            className={`
                flex flex-col gap-1 border border-border-primary hover:border-border-active rounded-lg p-6 relative transition
                items-center w-full
            `}
        >
            <input
                {...inputProps}
                ref={inputFileRef}
                type="file"
                className="size-full opacity-0 absolute inset-0 cursor-pointer"
                accept={acceptedTypes.join(",")}
                onChange={handleUpload}
            />
            <Icon svg={UploadIcon} className="fill-placeholder size-8" />
            <Text variant="label-medium" className="text-placeholder text-center">
                Arraste o arquivo aqui
                <br />
                ou clique para selecionar
            </Text>

            {
                errors.exceedMaxUploadSize && (
                    <Text variant="label-small" className="text-accent-red">Tamanho do arquivo enviado excede o limite estipulado.</Text>
                )
            }
        </div>
    );
}

function UploadedItemIndicator() {
    const { value, detach } = useUploadImageField();

    const handleRemoveUpload = () => {
        detach();
    };

    return (
        <div className="rounded border border-border-primary p-3 flex items-center gap-3">
            <Icon svg={ImageIcon} className="fill-placeholder size-6" />
            <span className="flex flex-col items-start">
                <Text variant="label-medium" className="text-placeholder">
                    {value?.name}
                </Text>
                <button
                    onClick={handleRemoveUpload}
                    type="button"
                    className={textVariants({
                        variant: "label-small",
                        className:
                            "text-accent-red hover:text-accent-red/75 transition-colors",
                    })}
                >
                    Remover
                </button>
            </span>
        </div>
    );
}

function UploadPreview({ uploadedImageFile }: { uploadedImageFile: File }) {
    return (
        <img
            src={URL.createObjectURL(uploadedImageFile)}
            alt={uploadedImageFile.name}
            className="object-cover aspect-video rounded size-full my-3"
        />
    )
}
