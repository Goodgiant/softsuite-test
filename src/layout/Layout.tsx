import { Outlet } from "react-router-dom";
import "./Layout.scss";

const Layout = () => {


    return (
        <div id="layout-container">
            <header className="top">

            </header>
            <section className="center">
                <aside className="left">

                </aside>
                <div className="right">
                    <Outlet />
                </div>
            </section>
            <footer className="bottom">

            </footer>
        </div>
    )
}

export default Layout;