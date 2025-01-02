"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { InviewType, InViewWrapper } from "../hero-section/InView";

export enum AlertType {
    SUCCESS,
    ERROR,
};

type AlertProps = {
    message?: string;
    hasCloseButton?: boolean;
    type: AlertType;
};


export function AuthAlert({ message, hasCloseButton = false, type}: AlertProps) {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        if (message) {
            setVisible(true);
        }
    }, [message]);

    if (!message || !visible) return null;

    return (
        <InViewWrapper type={InviewType.NORMAL}>
            <Alert variant={type === AlertType.ERROR? "destructive" : "success"}>
                <div className="flex items-center">
                    <AlertCircle className="h-4 w-4" />
                    <div className="flex flex-col ml-3">
                        <AlertTitle>{type === AlertType.ERROR? "Error" : "Success"}</AlertTitle>
                        <AlertDescription>
                            {message}
                        </AlertDescription>
                    </div>
                    {hasCloseButton && (
                        <button
                            onClick={() => setVisible(!visible)}
                            className="ml-auto text-destructive-500 hover:text-destructive-700"
                        >
                            &times;
                        </button>
                    )}
                </div>
            </Alert>
        </InViewWrapper>
    )
}