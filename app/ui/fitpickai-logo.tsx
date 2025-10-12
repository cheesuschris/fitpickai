import {montserrat} from "@/app/ui/fonts";
import Logo from "@/app/FitPickAI.svg";

export default function FitPickAILogo() {
    return (
        <div className = {`${montserrat.className} flex flex-row items-center leading-none text-white`}>
            <Logo className = "w-24 h-24"/>
            <p className = "text-[88px]">FitPickAI</p>
        </div>
    )
}