import { useEffect, useState } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { clearResults, findUsers, selectUser } from "../../redux/slices/usersSlice"
import cls from "./Sidebar.module.scss"

import UsersList from "../UsersList/UsersList"

const transformNames = (names: string) => {
    return names
        .split(",")
        .map((name: string) => {
            if (isNaN(+name)) {
                return "username=" + name.trim()
            } else {
                return "id=" + name.trim()
            }
        })
        .join("&")
}

export default function Sidebar() {
    const [searchText, setSearchText] = useState("")
    const dispatch = useAppDispatch()

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(selectUser(null))
        setSearchText(e.target.value)
    }

    useEffect(() => {
        if (searchText) {
            dispatch(findUsers({ names: transformNames(searchText) }))
        } else {
            dispatch(clearResults())
        }
    }, [searchText])

    return (
        <div className={cls.sidebar}>
            <div className={cls.title}>Поиск сотрудников</div>
            <input
                className={cls.input}
                value={searchText}
                onChange={onChangeHandler}
                type="search"
                placeholder="Введите Id или имя"
            />
            <div className={cls.title}>Результаты</div>
            <UsersList />
        </div>
    )
}
