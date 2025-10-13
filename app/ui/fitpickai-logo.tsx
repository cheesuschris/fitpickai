import {montserrat} from "@/app/ui/fonts";
import Logo from "@/app/FitPickAI.svg";
import Image from "next/image";

export default function FitPickAILogo() {
    return (
        <div className = {`${montserrat.className} flex flex-row items-center leading-none text-white`}>
            <Image src = {Logo} alt = "FitPickAI Logo" width = {96} height = {96} className = "w-24 h-24"/>
            <p className = "text-[88px]">FitPickAI</p>
        </div>
    )
}