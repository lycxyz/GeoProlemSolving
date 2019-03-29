import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    // strict:true,
    state: {
        //data
        userInfo: {
            userState: false,
            userName: 'visitor',
            userId: '',
            avatar: '',
        },
        projectImg: '',
        project: {},
        subProject: {},
    },
    getters: {
        userState: state => {
            return state.userInfo.userState;
        },
        userName: state => {
            return state.userInfo.userName;
        },
        userId: state => {
            return state.userInfo.userId;
        },
        avatar: state => {
            return state.userInfo.avatar;
        },
        userInfo: state => {
            return state.userInfo;
        },
        project: state => {
            return state.project;
        },
        subProject: state => {
            return state.subProject;
        }
    },
    mutations: {
        getUserInfo: state => {
            if (!state.userInfo.userState){
                $.ajax({
                    url: "/GeoProblemSolving/user/state",
                    type: "GET",
                    async: false,
                    success: function (data) {
                        if (data) {
                            var userInfo = data;
                            userInfo.userState = true;
                            state.userInfo = userInfo;
                        }
                    },
                    error: function (err) {
                        console.log("Get user info fail.");
                    }
                });
            }
        },
        userLogin: (state, data) => {
            let userInfo = data;
            userInfo.userState = true;
            state.userInfo = userInfo;
            sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },
        userLogout: (state) => {
            state.userInfo = {
                userState: false,
                userName: 'visitor',
                userId: '',
                avatar: '',
            };
            sessionStorage.removeItem("userInfo");
        },
        uploadAvatar: (state, avatar) => {
            state.avatar = avatar;
        },
        setProjectInfo: (state,project) => {
            state.project = project;
        },
        setSubProjectInfo: (state,subProject) => {
            state.subProject = subProject;
        }
    },  
})
