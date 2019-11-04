import Mock from 'mockjs'

// 生成数据列表
var lawyerList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  lawyerList.push(Mock.mock({
    'id': '@increment',
    'name': '@cname',
    'agency': '@ctitle(3, 5)', //网络平台
    'idCard': '@guid',
    'mobile': /^1[0-9]{10}$/,
    'address': '北京市海淀区知春路甲48号2号楼10A室', //网络平台
    'letter': ["@image('200x100', '#FF6600')"],
    'status': '@boolean()'
  }))
}
var paltList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  paltList.push(Mock.mock({
    'id': '@increment',
    'company': '@ctitle(3, 5)', //网络平台
    'email': '@email()',
    'platform': '@csentence(3, 5)', //作者账号
  }))
}
// 获取律师列表
export function lawyerList() {
  return {
    // isOpen: false,
    url: '/defend/lawyer/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': lawyerList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': lawyerList
      }
    }
  }
}

// 获取律师列表
export function platList() {
  return {
    // isOpen: false,
    url: '/defend/platform/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': paltList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': paltList
      }
    }
  }
}
