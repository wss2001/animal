import Home from '@/pages/Home'
import CwBaseInfo from '@/pages/CwBaseInfo'
import CwInfo from '@/pages/CwInfo'
import UserLogin from '@/pages/User/UserLogin.vue'
import UserRegister from '@/pages/User/UserRegister.vue'
import AdminLogin from '@/pages/Admin/AdminLogin.vue'
import Admin from '@/pages/Admin/index.vue'
import CwBaseAdminLogin from '@/pages/CwBaseAdmin/CwBaseAdminLogin.vue'
import User from '@/pages/User/MyMain.vue'
import MyMessage from '@/pages/User/MyMessage.vue'
import MyCertificate from '@/pages/User/MyCertificate.vue'
import MyPet from '@/pages/User/MyPet.vue'
import CwBaseAdmin from '@/pages/CwBaseAdmin/index.vue'
import PetCount from '@/pages/CwBaseAdmin/PetCount.vue'
import LoginMessage from '@/pages/CwBaseAdmin/LoginMessage.vue'
import AddPet from '@/pages/CwBaseAdmin/AddPet.vue'

export default [
    {
        path:'/',
        name:'home',
        component:Home,
        meta:{showFooter:true,showHeader:true,content:'首页'}
    },
    {
        path:'/CwBaseInfo',
        name:'cwBaseInfo',
        component:CwBaseInfo,
        meta:{showFooter:true,showHeader:true,content:'动物基地详情'}
    },
    {
        path:'/cwInfo',
        name:'cwInfo',
        component:CwInfo,
        meta:{showFooter:false,showHeader:true,content:'流浪动物详情'}
    },
    {
        path:'/user',
        name:'user',
        component:User,
        meta:{showFooter:false,showHeader:true,content:'用户首页'},
        children:[
            {
                path:'message',
                name:'MyMessage',
                component:MyMessage,
                meta:{showFooter:false,showHeader:true,content:'用户信息'}
            },
            {
                path:'myCertificate',
                name:'MyCertificate',
                component:MyCertificate,
                meta:{showFooter:false,showHeader:true,content:'用户证书'}
            },
            {
                path:'myPet',
                name:'MyPet',
                component:MyPet,
                meta:{showFooter:false,showHeader:true,content:'用户宠物'}
            },
            
        ]
    },
    {
        path:'/userLogin',
        name:'userLogin',
        component:UserLogin,
        meta:{showFooter:false,showHeader:true,content:'用户登录'}
    },
    {
        path:'/userRegister',
        name:'userRegister',
        component:UserRegister,
        meta:{showFooter:false,showHeader:true,content:'用户注册'}
    },
    {
        path:'/adminLogin',
        name:'adminLogin',
        component:AdminLogin,
        meta:{showFooter:false,showHeader:true,content:'后台登录'}
    },
    {
        path:'/admin',
        name:'admin',
        component:Admin,
        meta:{showFooter:false,showHeader:true,content:'后台管理'}
    },
    {
        path:'/cwBaseAdminLogin',
        name:'cwBaseAdminLogin',
        component:CwBaseAdminLogin,
        meta:{showFooter:false,showHeader:true,content:'基地管理人员登录'}
    },
    {
        path:'/cwUser',
        name:'cwUser',
        component:CwBaseAdmin,
        meta:{showFooter:false,showHeader:true,content:'基地管理人员登录'},
        children: [{
            path: 'message',
            name: 'LoginMessage',
            component: LoginMessage,
            meta:{showFooter:false,showHeader:true,content:'管理员信息'}
        }, {
            path: 'add',
            name: 'AddPet',
            component: AddPet,
            meta:{showFooter:false,showHeader:true,content:'新增宠物'}
        }, {
            path: 'count',
            name: 'PetCount',
            component: PetCount,
            meta:{showFooter:false,showHeader:true,content:'宠物情况'}
        }]
    },
    
]
