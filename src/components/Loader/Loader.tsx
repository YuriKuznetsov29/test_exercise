import cls from "./Loader.module.scss"

export const Loader = () => {
    return (
        <div className={cls.lds_ring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
