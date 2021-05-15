import 'ant-design-vue/dist/antd.css';
import {
    Tree,
    Layout,
    Menu,
    ConfigProvider,
    Dropdown,
    Button,
    message,
    Table,
    Space,
    DatePicker,
    Select,
    Input
    
} from 'ant-design-vue';

const components = [
    Tree,
    Layout,
    Menu,
    ConfigProvider,
    Dropdown,
    Button,
    Table,
    Space,
    DatePicker,
    Select,
    Input
    

]

export default {
    install(app){
        app.config.globalProperties.$message = message
        components.forEach((component) => {
            app.use(component);
        });
    }
}