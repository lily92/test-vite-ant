import { useRequest } from "vue-request";
import ky from "ky";
import { message } from 'ant-design-vue';
export default (url, data, coverData = {}) =>
  new Promise((resolve, reject) => {
    console.log(url, data, coverData);
    let api = "https://yy.weilian.city";

    // 后台的接口都需要在登录状态下
    let extraData = {
      token: "59c80cbccbf24893198164327b9891ce",
      beid: "45947",
    };
    // const objectService = {
    //   url: coverData.url ? coverData.url : api + url,
    //   method: !method ? "GET" : method,
    //   body: new URLSearchParams({ ...data, ...extraData, ...coverData }),
    //   headers: new Headers({
    //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    //   }),
    // };
    // const { datas } = useRequest(objectService);

    const request = () => {
      return ky.post(api+ url+ "?" + new URLSearchParams({ ...data, ...extraData, ...coverData })).then((res) =>
        res.json()
      );
    };

    const { data:a } = useRequest(request, {
      formatResult: (data) => {
        return data;
      },
      onSuccess: (data) => {
        if(data.code < 0 ){
            message.error(data.msg);
        }
        resolve(data);

      },
      onError:(error,params) =>{
        message.error("网络错误，或者服务器发生了点小意外");
       reject(error,params)
      }
    });


    return () => data;
  });
