let Mock = require("mockjs");

function generateBook() {
    var charts = [
        {
            "stores": 3894,
            "name": "针织衫",
            "sales": 461,
            "id": 1
        },
        {
            "id": 2,
            "name": "羊毛衫",
            "sales": 155,
            "stores": 984
        },
        {
            "id": 3,
            "name": "雪纺衫",
            "sales": 258,
            "stores": 2510
        },
        {
            "id": 4,
            "name": "裤子",
            "sales": 560,
            "stores": 5247
        },
        {
            "id": 5,
            "name": "高跟鞋",
            "sales": 621,
            "stores": 5970
        },
        {
            "id": 6,
            "name": "袜子",
            "sales": 267,
            "stores": 2255
        }
    ]
    var role = [{
        name: '经理',
        id: 1
    }]
    var user = [{
        username: '张三',
        password: '123',
        phone: '15531036305',
        email: '1@qq.com',
        role_id: 1,
        id: 1

    }]
    return {charts, role, user};
}

module.exports = generateBook;
