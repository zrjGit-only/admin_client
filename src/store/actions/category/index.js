import {ADD_CATEGORY, GET_CATEGORY1, GET_CATEGORY2, GET_CATEGORY_ALL} from '../../actions-type/category'
import {getCategory, addCategory, upDataCategory} from '../../../api/http'
import {message} from 'antd';

export const add_category = function (payload) {
    return {
        type: ADD_CATEGORY,
        payload
    }
}
export const get_category1 = function (payload) {
    return {
        type: GET_CATEGORY1,
        payload
    }
}
export const get_category_all = function (payload) {
    return {
        type: GET_CATEGORY_ALL,
        payload
    }
}
export const get_category2 = function (payload) {
    return {
        type: GET_CATEGORY2,
        payload

    }
}
export default {
    //获取一级或二级分类
    getCategory(parentId) {
        return async (dispatch) => {
            const categoryInfo = await getCategory(parentId)
            if (categoryInfo.status !== 0) {
                message.error('获取分类列表失败');
                return
            }
            parentId === '0'
                ?//获取一级分类
                dispatch(get_category1(categoryInfo.data))
                ://获取二级分类
                dispatch(get_category2(categoryInfo.data))

        }
    },
    getCategoryAll() {
        return async (dispatch) => {
            const categoryInfo = await getCategory('0')
            let arr = categoryInfo.data.map(item=>({
                label: item.name,
                value:item._id,
            }))
            for (let item of arr) {
                const res = await getCategory(item.value)
                item.children = res.data.map(i=>({
                    label: i.name,
                    value:i._id,
                }))
            }
            dispatch(get_category_all(arr))
        }
    },
    //添加一级或二级分类
    addCategory(categoryId, categoryName) {
        //因为要传参所以返回需要的函数,外部函数用来接收参数
        return async (dispatch) => {
            console.log(categoryId, categoryName);
            const categoryInfo = await addCategory(categoryId, categoryName)
            if (categoryInfo.status !== 0) {
                message.error(categoryInfo.msg);
            }
        }
    },
    //修改一级或二级分类
    upDataCategory(categoryId, categoryName) {
        return async (dispatch) => {
            const categoryInfo = await upDataCategory(categoryId, categoryName)
            if (categoryInfo.status !== 0) {
                message.error('更新失败');
                return
            }

        }
    }

}
