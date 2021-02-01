import {GET_PRODUCT,GET_SEARCH_PRODUCT} from '../../actions-type/product'
import {getProductLimit,getSearchProductName,getSearchProductDesc} from '../../../api/http'

export const get_product = function (payload) {
    return {
        type: GET_PRODUCT,
        payload
    }
}
export const get_search_product = function (payload) {
    return {
        type: GET_SEARCH_PRODUCT,
        payload
    }
}

export default {
    //获取商品分页列表
    addProduct(pageNum,pageSize) {
        //因为要传参所以返回需要的函数,外部函数用来接收参数
        return async (dispatch) => {
            const productInfo = await getProductLimit(pageNum,pageSize)
            dispatch(get_product(productInfo.data))
        }
    },
    //根据ID/Name搜索产品分页列表
    getSearchProduct(pageNum, pageSize, content,search) {
        //因为要传参所以返回需要的函数,外部函数用来接收参数
        return async (dispatch) => {
            let productInfo
            console.log(search);
            if(search==='1'){
                productInfo = await getSearchProductName(pageNum,pageSize,content)
            }else{
                productInfo = await getSearchProductDesc(pageNum,pageSize,content)
            }
            dispatch(get_search_product(productInfo.data))
        }
    },
}
