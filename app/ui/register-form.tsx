"use client";
import {montserrat} from "@/app/ui/fonts";
import {AtSymbolIcon, KeyIcon, ExclamationCircleIcon, UserIcon} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import {Button} from "./button";
import {useActionState} from "react";
import {createUser} from "@/app/lib/actions";
import {useSearchParams} from "next/navigation";

export async function checkName(name: string): Promise<{isValid: boolean; message? : string}> {
    if (!name || name.trim().length < 1) {
        return {isValid: false, message: "Name required"};
    }
    try {
        const response = await fetch('@/api/check-name', {
            method: 'POST',
            headers: {'Content-Type': '/application/json'},
            body: JSON.stringify({name: name.trim()})
        });
        const data = await response.json();
        const {exists} = data.exists;
        if (exists) {
            return {isValid: false, message: "Name is already taken"};
        }
        return {isValid: true};
    } catch (error) {
        console.error("Error checking name availability: ", error);
        return {isValid: false, message: "Error checking name availability"};
    }
}
export function checkPassword(password: string, repassword: string): {isValid: boolean; message?: string} {
    if (!password || password.length < 11) {
        return {isValid: false, message: "Password must be at least 11 characters"};
    }
    if (password !== repassword) {
        return {isValid: false, message: "Passwords don't match"};
    }
    return {isValid: true};
}

export default function RegisterForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const [errorMessage, formAction, isPending] = useActionState(createUser, null);
    return (
        <form action = {formAction} className = "space-y-3">
            <div className = "flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className = {`${montserrat.className} mb-3 text-2xl`}>
                    Register to create your stylish outfits today!
                </h1>
                <div className = "w-full">
                    <div>
                        <label className = "mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor = "name">
                            Name
                        </label>
                        <div className = "relative">
                            <input
                                className = "peer block w-full rounded-md border border-gray-200 py-[9x] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id = "name"
                                type = "text"
                                name = "name"
                                placeholder = "Choose a name to be remembered by!"
                                required
                            />
                            <UserIcon className = "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div className = "mt-4">
                        <label className = "mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor = "email">
                            Email
                        </label>
                        <div className = "relative">
                            <input
                                className = "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id = "email"
                                type = "email"
                                name = "email"
                                placeholder = "Enter your email address"
                                required
                            />
                            <AtSymbolIcon className = "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div className = "mt-4">
                        <label className = "mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor = "password">
                            Password
                        </label>
                        <div className = "relative">
                            <input
                                className = "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id = "password"
                                type = "password"
                                name = "password"
                                placeholder = "Enter password"
                                required
                                minLength={11}
                            />
                            <KeyIcon className = "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div className = "mt-4">
                        <label className = "mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor = "repassword">
                            Re-Enter Password
                        </label>
                        <div className = "relative">
                            <input
                                className = "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id = "repassword"
                                type = "password"
                                name = "repassword"
                                placeholder = "Re-Enter password"
                                required
                                minLength={11}
                            />
                            <KeyIcon className = "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <input type = "hidden" name = "redirectTo" value = {callbackUrl}/>
                    <Button className = "mt-4 w-full" aria-disabled = {isPending}>
                        Register <ArrowRightIcon className = "ml-auto h-5 w-5 text-gray-50"/>
                    </Button>
                    <div className = "flex h-8 items-end space-x-1">
                        {errorMessage && (
                            <>
                                <ExclamationCircleIcon className = "h-5 w-5 text-red-500"/>
                                <p className = "text-sm text-red-500">{errorMessage}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}