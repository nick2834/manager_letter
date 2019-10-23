import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  let name = Mock.Random.name()
  dataList.push(Mock.mock({
    'createTime': '@datetime',
    'source': name,
    'article': `《${"@ctitle(15)"}》`, //标题
    'status': '@boolean()', //状态
  }))
}
var message = Mock.mock({
  "onpending|1-100": 100,
  "newMsg|1-100": 100
})
// 获取定时任务列表
export function message() {
  return {
    // isOpen: false,
    url: '/dash/message/data',
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
        'message': message
      }
    }
  }
}
