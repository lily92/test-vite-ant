import 'ant-design-vue/dist/antd.css';
import {
    Tree,
    Layout,
    Menu,
    ConfigProvider,
    Dropdown,
    Button,
    message
} from 'ant-design-vue';

const components = [
    Tree,
    Layout,
    Menu,
    ConfigProvider,
    Dropdown,
    Button
]

export default {
    install(app){
        app.config.globalProperties.$message = message
        components.forEach((component) => {
            app.use(component);
        });
    }
}