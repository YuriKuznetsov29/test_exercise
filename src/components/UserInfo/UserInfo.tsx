import Image from "../../assets/imgBig.svg"
import { useAppSelector } from "../../redux/hooks"
import { getSelectedUserData } from "../../redux/selectors"
import cls from "./UserInfo.module.scss"

export default function UserInfo() {
    const user = useAppSelector(getSelectedUserData)

    return (
        <div className={cls.container}>
            {user ? (
                <>
                    <img src={Image} alt="image" />
                    <div className={cls.info}>
                        <div className={cls.name}>{user.name}</div>
                        <div className={cls.dataWrapper}>
                            <div className={cls.title}>email:</div>
                            <div>{user.email}</div>
                        </div>
                        <div className={cls.dataWrapperPhone}>
                            <div className={cls.title}>phone:</div>
                            <div>{user.phone}</div>
                        </div>

                        <div className={cls.about}>О себе:</div>
                        <div className={cls.textContent}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
                            assumenda quos molestiae, impedit dolorem, odio quia error cum quam sint
                            doloremque voluptatibus quas minus. Rem veniam id nobis commodi
                            expedita.
                        </div>
                    </div>
                </>
            ) : (
                <div className={cls.textWrapper}>
                    <div className={cls.text}>
                        Выберите сотрудника, чтобы посмотреть его профиль
                    </div>
                </div>
            )}
        </div>
    )
}
