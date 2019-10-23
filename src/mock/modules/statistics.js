import Mock from 'mockjs'

// 生成数据列表
var productList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  productList.push(Mock.mock({
    'id': '@increment',
    'category': '@ctitle(3, 5)',
    'tortnumber': '@natural(60, 100)',
    'sendnumber': '@natural(60, 100)',
    'delnumber': '@natural(60, 100)',
    'delrate': '@float(10, 60, 3, 5)',
  }))
}
var totalData = (Mock.mock({
  'tort': '@natural(60, 100)',
  'send': '@natural(60, 100)',
  'del': '@natural(60, 100)',
  'rate': '@float(10, 60, 3, 5)',
}))

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 20 + 1); i++) {
  dataList.push(Mock.mock({
    'id': '@increment',
    'platform': '@csentence(5)',
    'company': '@cparagraph(1, 3)',
    'sendrate': '@float(60, 100, 3, 5)',
    'delcount': '@natural(60, 100)',
    'delrate': '@float(10, 60, 3, 5)',
  }))
}
// 获取文件列表
export function datalist() {
  return {
    // isOpen: false,
    url: '/statistics/data/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList,
        'totalData': totalData
      }
    }
  }
}

// 获取文件列表
export function productlist() {
  return {
    // isOpen: false,
    url: '/statistics/product/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': productList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': productList,
        'totalData': totalData
      }
    }
  }
}
