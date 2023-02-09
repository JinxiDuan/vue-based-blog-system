<template>
  <div class="SDContainer">
    <div class="topRow">
      <div class="pageTitle">
        日志
      </div>
      <el-icon :size="'large'">
        <Grid/>
      </el-icon>
    </div>
    <el-calendar v-model="date">
      <template #date-cell="{ data }">

        <div :class="['dayCube',{'isSelected': data.isSelected}]">
          {{ Number(data.day.split('-')[2]) }}
          <el-icon v-if="arrangements[data.day]&&arrangements[data.day].length>1" size="small" style="color:orange">
            <List/>
          </el-icon>
        </div>
      </template>
    </el-calendar>
    <div class="addArrange">
      <el-input v-model="arrangeText" style="margin-right: 5px">

      </el-input>
      <el-button :icon="'Plus'" @click="addArrange">

      </el-button>
    </div>
    <div class="arrangeBox">
      <div v-for="(item,i) in arrangements[getSelectDate]" :key="i" class="arrangeItem">
        <div v-if="i" class="todoItem">
          {{ item }}
          <el-button :icon="'Delete'" text @click="deleteArrange(i)">

          </el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {computed, ref} from "vue";
import Cookies from "js-cookie";
import axios from "axios";
import {loginStatus} from "../../LogStatus.js";

let date = ref(new Date())
let arrangements = ref({})
let headerConfig = {}
let arrangeText = ref('')

//本地arrange数据格式：
// {
//    "2023-1-24": [ID, Events1, Events2......]
// }

if (loginStatus.logonStatus) {
  let header = {
    'Authorization': 'Bearer ' + Cookies.get('jwt'),
  }
}

axios.get("http://114.132.153.34:9200/api/schedules",
    {
      header: headerConfig,
    }
).then((response) => {
  arrangements.value = decodeResponse(response);
  //已经解包并传递data值
}).catch((err) => {
  console.log(err);
})

const ifArranged = computed(() => {
  return (date) => {
    for (let key in arrangements.value) {
      console.log(arrangements.value)
      if (arrangements.value[key].attributes.Date == date) {
        return true;
      }
    }
    return false;
  }
})//耗时较长

const getSelectDate = computed(() => {
  return date.value.getFullYear() + '-' + ((date.value.getMonth() + 1) < 10 ? '0' + (date.value.getMonth() + 1) : (date.value.getMonth() + 1)) + '-' + ((date.value.getDate()) < 10 ? '0' + (date.value.getDate()) : (date.value.getDate()))
})

const decodeResponse = (response) => {
  let data = response.data.data;
  let Iarrangements = {};
  for (let key in data) {
    Iarrangements[data[key].attributes.Date] = data[key].attributes.Arrangements;
    (Iarrangements[data[key].attributes.Date]).splice(0, 0, data[key].id)
  }
  return Iarrangements
}

const addArrange = () => {
  let AxiosConfig = {};
  if (arrangements.value[getSelectDate.value]) {
    arrangements.value[getSelectDate.value].push(arrangeText.value);
    AxiosConfig = {
      url: "http://114.132.153.34:9200/api/schedules/" + arrangements.value[getSelectDate.value][0],
      method: 'put',
      header: headerConfig,
      data: {
        data: {
          Arrangements: arrangements.value[getSelectDate.value].slice(1)
        }
      }
    }
  } else {
    arrangements.value[getSelectDate.value] = [arrangeText.value];
    AxiosConfig = {
      url: "http://114.132.153.34:9200/api/schedules",
      method: 'post',
      header: headerConfig,
      data: {
        data: {
          Date: getSelectDate.value,
          Arrangements: arrangements.value[getSelectDate.value]
        }
      }
    }
  }
  axios(AxiosConfig)
      .then((response) => {
        console.log(response.data)
        if(AxiosConfig.method=='post'){
          arrangements.value[getSelectDate.value].splice(0,0,response.data.data.id);
        }
      }).catch((err) => {
    console.log(err)
  })
  arrangeText.value = '';
}

const deleteArrange = (index) => {
  let AxiosConfig = {};
  arrangements.value[getSelectDate.value].splice(index, 1);
  AxiosConfig = {
    url: "http://114.132.153.34:9200/api/schedules/" + arrangements.value[getSelectDate.value][0],
    method: 'put',
    header: headerConfig,
    data: {
      data: {
        Arrangements: arrangements.value[getSelectDate.value].slice(1)
      }
    }
  }
  axios(AxiosConfig)
      .then((response)=>{
        console.log(response.data);
      })
      .catch((err)=>{
        console.log(err);
      })
}
//以上三个方法待更改，需要改成delete post 或put
</script>

<style scoped>
.topRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 6px;
}

.pageTitle {
  font-weight: bold;
  font-size: 24px;
}

.SDContainer {
  width: 100%;
}

.dayCube {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.isSelected {
  color: #67C23A
}

.addArrange {
  display: flex;
  flex-direction: row;
}

.arrangeBox {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.todoItem {
  color: #2c2c2c;
  margin-top: 5px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color);
}
</style>