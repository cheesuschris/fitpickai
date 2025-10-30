"use client";

import Link from 'next/link';
import {Outfit} from '@/app/lib/definitions'
import {Button} from '@/app/ui/button';
import {updateOutfit, OutfitState} from '@/app/lib/actions';
import {useActionState} from 'react';

export default function EditOutfitForm({outfit}: {outfit: Outfit}) {
    const initialState: OutfitState = {message: null, errors: {}};
    const updateOutfitWithId = updateOutfit.bind(null, outfit.id);
    const [state, formAction] = useActionState(updateOutfitWithId, initialState);

    return (
        <form action = {formAction}>
            <div className = "rounded-md bg-gray-50 p-4 md:p-6">
                <div className = "mb-4">
                    <p className = "text-md">
                        Editing {outfit.name}
                    </p>
                </div>

                <div className = "mb-4">
                    
                </div>
            </div>
        </form>
    );
}