import {reactive} from "vue";
import Cookies from "js-cookie";
import axios from "axios";

export const loginStatus = reactive({
    logonStatus: false,
    urlStart: 'http://114.132.153.34:9200',
    logonProfile: {
        username: "未登录", userID: "undefined", userAvatar: {
            formats: {
                thumbnail: {
                    url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                }
            }
        }
    },
    reloadProfile(errCallback) {
        let jwtoken = Cookies.get("jwt");
        if (jwtoken) {
            let config = {
                method: 'get', url: 'http://114.132.153.34:9200/api/users/me?populate=*', headers: {
                    'Authorization': 'Bearer ' + jwtoken
                }
            };
            axios(config)
                .then((response) => {
                    let decodeData = this.nameIDReverse(response.data, 's2c')
                    console.log(decodeData)
                    this.logonProfile = decodeData;
                    this.logonStatus = true;
                }).catch((err) => {
                errCallback(err)
            })
        } else {
            this.logonStatus = false;
            this.logonProfile = {
                username: "未登录",
                userID: "undefined",
                userAvatar: {
                    formats: {
                        thumbnail: {
                            url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                        }
                    }
                }
            }
        }
    },
    logOut() {
        Cookies.remove("jwt");
        this.reloadProfile();
    },
    nameIDReverse(userP, mode) {
        if (mode == 'c2s') {
            userP.notUniqueName = userP.username
            userP.username = userP.userID;
            delete userP.userID;
            return userP
        } else if (mode == 's2c') {
            userP.userID = userP.username;
            userP.username = userP.notUniqueName;
            delete userP.notUniqueName;
            return userP
        }
    }
})