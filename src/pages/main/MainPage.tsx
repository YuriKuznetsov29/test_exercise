import Header from "../../components/Header/Header"
import Container from "../../components/Sidebar/Container/Container"
import Sidebar from "../../components/Sidebar/Sidebar"
import UserInfo from "../../components/UserInfo/UserInfo"
import cls from "./MainPage.module.scss"

export default function MainPage() {
    return (
        <div className={cls.mainPage}>
            <Header />
            <Container>
                <Sidebar />
                <UserInfo />
            </Container>
        </div>
    )
}
