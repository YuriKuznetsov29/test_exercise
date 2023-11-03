import cls from "./UserItem.module.scss"
import Image from "../../assets/ImgSmall.svg"
import { IUser, selectUser } from "../../redux/slices/usersSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getSelectedUserData } from "../../redux/selectors"

interface UserItem {
    user: IUser
}

export default function UserItem({ user }: UserItem) {
    const selectedUser = useAppSelector(getSelectedUserData)
    const dispatch = useAppDispatch()

    const onClickSelectUser = () => {
        dispatch(selectUser(user))
    }

    return (
        <div className={cls.userItem} onClick={onClickSelectUser}>
            <img src={Image} alt="image" />
            <div className={`${cls.info} ${selectedUser?.id === user.id && cls.selected}`}>
                <div className={cls.name}>{user.username}</div>
                <div className={cls.email}>
                    {user.email.length < 16 ? user.email : user.email.slice(0, 16) + "..."}
                </div>
            </div>
        </div>
    )
}
