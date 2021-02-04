let Mock = require("mockjs");

function generateBook() {
    var charts = [
        {
            "stores": 38940,
            "name": "针织衫",
            "sales": 4601,
            "id": 1
        },
        {
            "id": 2,
            "name": "羊毛衫",
            "sales": 1550,
            "stores": 9840
        },
        {
            "id": 3,
            "name": "雪纺衫",
            "sales": 2580,
            "stores": 25100
        },
        {
            "id": 4,
            "name": "裤子",
            "sales": 5600,
            "stores": 52470
        },
        {
            "id": 5,
            "name": "高跟鞋",
            "sales": 6210,
            "stores": 59700
        },
        {
            "id": 6,
            "name": "袜子",
            "sales": 2670,
            "stores": 22550
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

    var bizLine = []
    var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let i = 0
    while (i < 3) {
        for (let id = 0; id < 12; id++) {
            let month = m[id]
            let a = id + Math.random() * 5 + 1;
            let city
            if (i === 0) {
                city = '北京'
            } else if (i === 1) {
                city = '上海'
            } else {
                city = '杭州'
            }

            bizLine.push({
                id,
                month,
                a,
                city
            });
        }
        i++
    }

    var bizBarSales = []
    for (let sale = 0; sale < 12; sale++) {
        let month = `${sale + 1}月`
        let s = sale + Math.random() * 1000 + 1;

        bizBarSales.push({
            id: sale,
            month,
            sales: s
        });
    }

    var bizPieAccess = []
    for (let access = 0; access < 12; access++) {
        let month = `${access + 1}月`
        let s = access + Math.random() * 100 + 1;

        bizPieAccess.push({
            id: access,
            month,
            sales: s
        });
    }
    return {charts, role, user, bizLine, bizPieAccess,bizBarSales};
}

module.exports = generateBook;
