import Vue from 'vue';
import $store from '../store/store';

/**
 * 项目配置相关文件
 */
const projectConfig = {
    //  服务地址
    serverUrl: "http://localhost:3000/api/"
}

const methods = {
    /**
     * 获取类型名称根据类型id
     * @param {*} id 
     */
    getTypeNameById(id) {
        let answer = "";
        $store.state.articleTypeList.forEach(item => {
            if (item.id == id) {
                answer = item.name
            }
        });
        return answer;
    },
    /**
     * 获取标签名称根据id
     * @param {*} id 
     */
    getTagNameById(id) {
        let answer = [];
        $store.state.tagList.forEach(item => {
            id.split(",").forEach(i => {
                if (item.id == i) {
                    answer.push(item.name);
                }
            });
        });
        return answer.join(",");
    },
    /**
     * 从一个对象中寻找出嫌疑犯，并且干掉
     * @param {string} 等于多少
     * @param {string} 属性
     * @param {string} 数组
     */
    findObjectInArrayAndDelete(value, attr, arr) {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (item[attr] == value) {
                arr.splice(i, 1);
            }
        }
    },
    /**
     * 拼装数据键值对
     * @param {array} data 
     * @param {string} key 
     * @param {string} value 
     */
    returnDataKeyValue(data, key, value) {
        return data.map((item) => {
            const obj = {
                key: item["key"] || item[key],
                value: item["value"] || item[value]
            }
            return obj;
        });
    },
    /**
     * 事件中转，用于全部通用组件
     * @param {string} eventName 事件名称
     * @param {object} item 当前对象
     * @param {any} param 参数
     */
    eventsTransfer(eventName, item, param) {

        item['events'] = item['events'] || {};

        const event = item['events'][eventName];

        typeof event['fn'] == "function" ?
            event['fn'].apply(this, event['params'] ? [param, ...event['params']] : [param]) :
            (function () { })();
    }
}

/**
 * 设置Vue原型属性
 * @param {Array} objArr 
 */
function setAttrToVue(objArr) {
    objArr.forEach((item) => {
        for (let i in item) {
            Vue.prototype[i] ?
                window["console"].info(`${i}已经存在，类型是${typeof (Vue.prototype[i])}`) :
                Vue.prototype[i] = item[i];
        }
    });
}

setAttrToVue([projectConfig, methods]);

export { projectConfig }