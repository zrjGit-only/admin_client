import axiosApi from './axiosApi'
//获取角色列表
export const getRoleInfo = () => axiosApi.get('/manage/role/list')
//修改角色
export const upDataRoleInfo = (roleInfo) => axiosApi.post('/manage/role/update',roleInfo)
//添加角色
export const addRoleInfo = (roleName) => axiosApi.post('/manage/role/add', {roleName})

//获取用户列表
export const getUserInfo = () => axiosApi.get('/manage/user/list')
//删除用户
export const delUserInfo = (userId) => axiosApi.post('/manage/user/delete',{userId})
//添加/修改用户
export const addOrUpDataUserInfo = (userInfo) => axiosApi.post(!userInfo._id?'/manage/user/add':'/manage/user/update',userInfo)


//登录
export const login = (username, password) => axiosApi.post('/login', {username, password})


//获取一二级列表
export const getCategory = (parentId) => axiosApi.get(' /manage/category/list', {params: {parentId}})
//添加一级/二级分类
export const addCategory = (parentId, categoryName) => axiosApi.post('/manage/category/add', {parentId, categoryName})
//更新一级/二级分类
export const upDataCategory = (categoryId, categoryName) => axiosApi.post('/manage/category/update', {categoryId, categoryName})


//获取商品分页列表
export const getProductLimit = (pageNum,pageSize) => axiosApi.get('/manage/product/list', {params: {pageNum, pageSize}})

//根据ID/Name搜索产品分页列表
export const getSearchProductName = (pageNum,pageSize,productName) => axiosApi.get('/manage/product/search', {params: {pageNum, pageSize,productName}})
export const getSearchProductDesc = (pageNum,pageSize,productDesc) => axiosApi.get('/manage/product/search', {params: {pageNum, pageSize,productDesc}})
//根据分类ID获取分类
export const getCategoryInfo = (categoryId) => axiosApi.get(`/manage/category/info?categoryId=${categoryId}`)

// 删除指定名称的图片
export const reqDeleteImg = (name) => axiosApi.post(  '/manage/img/delete', {name}, )

//对商品进行上架/下架处理http://localhost:5000/manage/product/updateStatus
export const ProductUpOrDown = (productId,status) => axiosApi.post('/manage/product/updateStatus', {productId,status})
// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => axiosApi.post('/manage/product/' + ( product._id?'update':'add'), product)