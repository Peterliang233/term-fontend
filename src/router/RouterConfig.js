import Container from "../component/Container";
import Login from "../component/login/Login";

const RouterConfig = [
    {
        path : "/",
        component: Container,
        auth: false,
    },
    {
        path: "/login",
        component: Login,
        auth: false,
    }
];

export default RouterConfig;