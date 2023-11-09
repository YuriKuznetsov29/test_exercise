import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    getUsersCount,
    getUsersData,
    loadingError,
    loadingUsers,
    startSearch,
} from "../../redux/selectors";
import { IUser, clearResults, findUsers } from "../../redux/slices/usersSlice";
import { Loader } from "../Loader/Loader";
import UserItem from "../UserItem/UserItem";
import Left from "../../assets/ArrowLeft.svg";
import Right from "../../assets/ArrowRight.svg";
import cls from "./UsersList.module.scss";

const transformNames = (names: string) => {
    return names
        .split(",")
        .map((name: string) => {
            if (isNaN(+name)) {
                return "username=" + name.trim();
            } else {
                return "id=" + name.trim();
            }
        })
        .join("&");
};

const ITEMS_ON_PAGE = 4;

interface UsersListProps {
    searchText: string;
}

export default function UsersList({ searchText }: UsersListProps) {
    const [page, setPage] = useState(1);
    const error = useAppSelector(loadingError);
    const start = useAppSelector(startSearch);

    const usersData = useAppSelector(getUsersData);
    const usersCount = useAppSelector(getUsersCount);
    const isLoading = useAppSelector(loadingUsers);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (searchText) {
            dispatch(
                findUsers({ names: transformNames(searchText), usersLimit: ITEMS_ON_PAGE, page })
            );
        } else {
            dispatch(clearResults());
        }
    }, [searchText, page]);

    const onClickShowNext = () => {
        if (page < Math.ceil(usersCount / ITEMS_ON_PAGE)) {
            setPage((prev) => prev + 1);
        }
    };

    const onClickShowPrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    if (isLoading)
        return (
            <div className={cls.container}>
                <Loader />
            </div>
        );

    if (error)
        return (
            <div className={cls.container}>
                <div className={cls.error}>{error}</div>
            </div>
        );

    return (
        <div className={cls.resultsWrapper}>
            <div className={cls.results}>
                {usersData?.length && !error ? (
                    usersData.map((user: IUser) => <UserItem key={user.id} user={user} />)
                ) : start ? (
                    <div className={cls.text}>Ничего не найдено</div>
                ) : (
                    <div className={cls.text}>Начните поиск</div>
                )}
            </div>

            {usersCount > ITEMS_ON_PAGE && (
                <div className={cls.btnContainer}>
                    <img className={cls.btn} src={Left} alt="left" onClick={onClickShowPrev} />
                    <div className={cls.pagesNumber}>
                        {page} / {Math.ceil(usersCount / ITEMS_ON_PAGE)}
                    </div>
                    <img className={cls.btn} src={Right} alt="right" onClick={onClickShowNext} />
                </div>
            )}
        </div>
    );
}
