"use client";

import {UserField} from "@/app/lib/definitions";
import Link from 'next/link';
import {PauseCircleIcon, PlayCircleIcon} from '@heroicons/react/24/outline';
import {Button} from '@/app/ui/button';
import {createOutfit, OutfitState} from '@/app/lib/actions';
import {useActionState} from 'react';

export default function Form({users}: {users: UserField[]}) {
    const initialState: OutfitState = {message: "", errors: {}};
    const [state, formAction] = useActionState(createOutfit, initialState);
    return (
        <form action = {formAction}>
            <div className = "rounded-md bg-gray-50 p-4 md:p-6">
                
            </div>
        </form>
    );
}