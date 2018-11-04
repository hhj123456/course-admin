import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}
const course =[
  {
    id:1,
    name:"c语言程序管理"
  },{
    id: 2,
    name:"web课程设计"
  },{
    id: 3,
    name:"计算机维修"
  }
];

const chapter1 = [
  {
    id:1,
    name:"认识c语言"
  },
  {
    id:2,
    name:"认识c++语言"
  }
];
const chapter2 = [
  {
    id:1,
    name:"认识web"
  },
   {
    id:2,
    name:"html知识"
  },
];
const chapter3 = [
  {
    id:1,
    name:"了解i7 8700"
  },
   {
    id:2,
    name:"了解GTX 1080"
  },
];

const Experimental = [
  {
    id:1,
    name:"C语言程序设计",
    children:[
      {
         id:1,
         name:"认识C语言",
         children:[
            {
              id:1,
              name:"print输出实验"
            },
            {
              id:2,
              name:"scanf输入实验"
            }
         ]
      },
      {
         id:2,
         name:"认识指针",
         children:[
            {
              id:1,
              name:"*指针的使用"
            },
            {
              id:2,
              name:"数组指针形式"
            }
         ]
      },
    ]
  },
  {
    id:2,
    name:"web课程设计",
    children:[
      {
         id:1,
         name:"认识HTML语言",
         children:[
            {
              id:1,
              name:"div+css实验"
            },
            {
              id:2,
              name:"语义化标签化实验"
            }
         ]
      },
      {
         id:2,
         name:"认识js语言",
         children:[
            {
              id:1,
              name:"javscript语言的使用"
            },
            {
              id:2,
              name:"ES6语言初识"
            }
         ]
      },
    ]
  },
  {
    id:3,
    name:"计算机维修",
    children:[
      {
         id:1,
         name:"认识计算机零件",
         children:[
            {
              id:1,
              name:"如何识别AMD和GTX显卡的区别"
            },
            {
              id:2,
              name:"如何识别处理器i7 8700"
            }
         ]
      },
      {
         id:2,
         name:"硬盘了解",
         children:[
            {
              id:1,
              name:"计算机硬盘速度"
            },
            {
              id:2,
              name:"固态硬盘速度"
            }
         ]
      },
    ]
  }
]

export { LoginUsers, Users , course ,chapter1,chapter2,chapter3,Experimental};
