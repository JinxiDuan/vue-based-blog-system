<template>
  <div class="lgPageBox">
    <div class="topRow">
      <div>{{ ifLogin ? '登录' : '注册' }}</div>
      <el-icon size="large">
        <User/>
      </el-icon>
    </div>

    <div class="formBox">
      <el-form
          :model="FormRef"
          ref="formRef"
          :rules="RulesRef"
          label-width="auto"
          :size="'large'"
          :style="{
            width: '460px',
          }"
      >
        <el-form-item label="用户ID" prop="userID">
          <el-input v-model="FormRef.userID"></el-input>
        </el-form-item>
        <el-form-item v-if="!ifLogin" label="用户名" prop="userName">
          <el-input v-model="FormRef.userName"></el-input>
        </el-form-item>
        <el-form-item v-if="!ifLogin" label="电子邮件" prop="email">
          <el-input v-model="FormRef.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" show-password v-model="FormRef.password"></el-input>
        </el-form-item>
        <el-form-item v-if="!ifLogin" label="再次输入密码" prop="passCheck">
          <el-input type=password show-password v-model="FormRef.passCheck"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginRegCheck.btn1Event" round>
            {{ loginRegCheck.button1 }}
          </el-button>
          <el-button @click="loginRegCheck.btn2Event(formRef)" round type="primary">
            {{ loginRegCheck.button2 }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {ElMessage, FormInstance, FormRules} from 'element-plus'
import axios from "axios";
import Cookies from 'js-cookie';
import {loginStatus} from "../../LogStatus.js";

let ifLogin = ref(true);
const formRef = ref<FormInstance>(null)
const emits = defineEmits(['loginSuccess'])


let loginForm = {
  userID: '',
  password: ''
}

let loginRules = {
  userID: [
    {required: true, message: '用户名不能为空', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'}
  ]
};

let regisForm = {
  userID: '',
  userName: '',
  email: '',
  password: '',
  passCheck: '',
}

const validateEmail = (rule: any, value: any, callback: any) => {
  let re = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$');
  if (re.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱不符合格式！"));
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if(value.length<6){
    callback(new Error('密码长度需大于6位'))
  }else{
    if (FormRef.value.passCheck !== '') {
      if (!formRef.value) return
      formRef.value.validateField('passCheck', () => null)
      //如果检查时未挂载则再次检查
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== FormRef.value.password) {
    callback(new Error("两次输入密码不一致"))
  } else {
    callback()
  }
}

let regisRules = {
  userID: [
    {required: true, message: '用户ID不能为空', trigger: 'blur'}
  ],
  userName: [
    {required: true, message: '用户名不能为空', trigger: 'blur'}
  ],
  email: [
    {required: true, message: '邮箱不能为空', trigger: 'blur'},
    {validator: validateEmail, trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {validator: validatePass, trigger: 'blur'}
  ],
  passCheck: [
    {required: true, message: '请再次输入密码验证', trigger: 'blur'},
    {validator: validatePass2, trigger: 'blur'}
  ]
}

let RulesRef = ref<FormRules>(loginRules);
let FormRef = ref(loginForm)
//FormRef 表单的model
//formRef 表单的ref


// onMounted(()=>{
//   console.log(1,!formRef.value)
// })

let changeToRegis = () => {
  ifLogin.value = !ifLogin.value;
}

let submitLogin = (formEl: FormInstance | undefined) => {
  console.log(formEl)
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log('loginOK')
      axios.post(
          'http://114.132.153.34:9200/api/auth/local',
          {
            "identifier": FormRef.value.userID,
            "password": FormRef.value.password
          }
      ).then((response) => {
        Cookies.set('jwt', response.data.jwt, {expires: 30})
        //响应式同步登录状态
        loginStatus.reloadProfile(() => {
        });
        ElMessage({
          message: '登录成功！',
          type: 'success',
        })
        emits('loginSuccess')
      }).catch(function (error) {
        console.log(error);
      });
      //将登录态同步到
    } else {
      console.log('error submit!')
    }
  })
}


let submitRegis = (formEl: FormInstance | undefined) => {
  //提交注册
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      axios.post(
          'http://114.132.153.34:9200/api/auth/local/register',
          {
            "username": FormRef.value.userID,
            "notUniqueName": FormRef.value.userName,
            "email": FormRef.value.email,
            "password": FormRef.value.password
          }
      ).then((response) => {
        Cookies.set('jwt', response.data.jwt, {expires: 30})
        //响应式同步登录状态
        loginStatus.reloadProfile(() => {
        });
        ElMessage({
          message: '注册成功，已为您自动登录！',
          type: 'success',
        })
        emits('loginSuccess')
      }).catch((err) => {
        console.log(err);
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

let changeToLogin = () => {
  ifLogin.value = !ifLogin.value;
}

let loginRegCheck = computed(() => {
  if (ifLogin.value) {
    RulesRef.value = loginRules;
    FormRef.value = loginForm;
    return {
      rules: regisRules,
      button1: "注册",
      btn1Event: changeToRegis,
      button2: "登录",
      btn2Event: submitLogin,

    }
  } else {
    FormRef.value = regisForm;
    RulesRef.value = regisRules;
    return {
      rules: regisRules,
      button1: "登录",
      btn1Event: changeToLogin,
      button2: "注册",
      btn2Event: submitRegis,
    }
  }
})
</script>

<style lang="scss" scoped>

.lgPageBox {
  height: 100vh;
  background: url("/src/assets/fred's logo.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.topRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  font-size: 24px;
  font-weight: bold;
}

.formBox {
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>