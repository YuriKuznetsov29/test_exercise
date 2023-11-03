import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import { getUsersData, loadingError, loadingUsers, startSearch } from "../../redux/selectors"
import { IUser } from "../../redux/slices/usersSlice"
import { Loader } from "../Loader/Loader"
import UserItem from "../UserItem/UserItem"
import Left from "../../assets/ArrowLeft.svg"
import Right from "../../assets/ArrowRight.svg"
import cls from "./UsersList.module.scss"

const ITEMS_ON_PAGE = 3

export default function UsersList() {
    const usersData = useAppSelector(getUsersData)
    const [users, setUsers] = useState<IUser[] | null>(null)
    const [page, setPage] = useState(0)
    const [usersQty, setUsersQty] = useState(0)
    const isLoading = useAppSelector(loadingUsers)
    const error = useAppSelector(loadingError)
    const start = useAppSelector(startSearch)

    useEffect(() => {
        setUsers(usersData.slice(0, ITEMS_ON_PAGE))
        setUsersQty(usersData.length)
    }, [usersData])

    useEffect(() => {
        if (usersQty - page * ITEMS_ON_PAGE < ITEMS_ON_PAGE) {
            setUsers(usersData.slice(-ITEMS_ON_PAGE))
        } else {
            setUsers(usersData.slice(page * ITEMS_ON_PAGE, (page + 1) * ITEMS_ON_PAGE))
        }
    }, [page])

    if (isLoading)
        return (
            <div className={cls.container}>
                <Loader />
            </div>
        )

    if (error)
        return (
            <div className={cls.container}>
                <div className={cls.error}>{error}</div>
            </div>
        )

    const onClickShowNext = () => {
        if ((page + 1) * ITEMS_ON_PAGE < usersQty) {
            setPage((prev) => prev + 1)
        }
    }

    const onClickShowPrev = () => {
        if (page * ITEMS_ON_PAGE > 0) {
            setPage((prev) => prev - 1)
        }
    }

    return (
        <>
            {users?.length && !error ? (
                users.map((user: IUser) => <UserItem key={user.id} user={user} />)
            ) : start ? (
                <div className={cls.text}>Ничего не найдено</div>
            ) : (
                <div className={cls.text}>Начните поиск</div>
            )}

            {usersQty > ITEMS_ON_PAGE && (
                <div className={cls.btnContainer}>
                    <img className={cls.btn} src={Left} alt="left" onClick={onClickShowPrev} />
                    <div className={cls.pagesNumber}>
                        {page + 1} / {Math.ceil(usersQty / ITEMS_ON_PAGE)}
                    </div>
                    <img className={cls.btn} src={Right} alt="right" onClick={onClickShowNext} />
                </div>
            )}
        </>
    )
}
