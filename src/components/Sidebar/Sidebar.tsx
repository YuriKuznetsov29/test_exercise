import { useDeferredValue, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { selectUser } from "../../redux/slices/usersSlice";
import UsersList from "../UsersList/UsersList";
import cls from "./Sidebar.module.scss";

export default function Sidebar() {
    const [searchText, setSearchText] = useState("");
    const dispatch = useAppDispatch();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(selectUser(null));
        setSearchText(e.target.value);
    };

    const deferredQuery = useDeferredValue(searchText);

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
            <UsersList searchText={deferredQuery} />
        </div>
    );
}
