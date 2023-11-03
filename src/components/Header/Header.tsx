import cls from "./Header.module.scss"

export default function Header() {
    return (
        <div className={cls.container}>
            <div className={cls.title}>Жилфонд</div>
            <div className={cls.user}>Пользователь</div>
        </div>
    )
}
