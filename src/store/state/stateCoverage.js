const stateCoverage = {
    // name:"coverage",
    // namespaced: true,
    state:{
        token:"",
        haha:"123",
        job:'00'
    },
    actions:{
        changeJob(cox,val){
            cox.commit('changeJob',val)
        }
    },
    mutations:{
        changeJob(state,val){
            state.job = val.job
        }
    },
    getters:{

    }
}

export default stateCoverage;