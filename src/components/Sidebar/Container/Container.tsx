import { ReactNode } from "react"
import cls from "./Container.module.scss"

interface ContainerProps {
    children: ReactNode
}

export default function Container({ children }: ContainerProps) {
    return <div className={cls.container}>{children}</div>
}
