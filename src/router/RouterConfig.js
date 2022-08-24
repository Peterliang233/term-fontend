import Container from "../component/Container";
import Login from "../component/login/Login";

const RouterConfig = [
    {
        path : "/",
        component: Container,
        auth: true,
    },
    {
        path: "/login",
        component: Login,
        auth: false,
    }
];

export default RouterConfig;