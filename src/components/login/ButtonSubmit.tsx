'use client';

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function ButtonSubmit() {

    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            color="primary"
            isLoading={pending}
        >
            Entrar
        </Button>
    );
}