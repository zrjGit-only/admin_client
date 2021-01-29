import axios from 'axios'

export default function getWeather(cityname) {
    return new Promise(((resolve, reject) => {
        axios.get('http://v.juhe.cn/weather/index', {
            params:{
                cityname,
                dtype: 'json',
                format:1,
                key:'7ab12cba7635a5ccaf4b4b5239017902'
            }

        }).then(res => {
            resolve(res.data.result)
            console.log(res);
        }).catch(e => {
            reject(e)
        })
    }))
}
//http://v.juhe.cn/weather/index?cityname=%E5%8C%97%E4%BA%AC&dtype=json&format=&key=7ab12cba7635a5ccaf4b4b5239017902