const mutations = {
  setStateVal(state, obj) {//修改全局变量
    const arr = obj.state.split(".");
    if (arr.length > 2) {
      state[arr[0]][arr[1]][arr[2]] = obj.val;
    } else if (arr.length > 1) {
      state[arr[0]][arr[1]] = obj.val;
    } else {
      state[arr[0]] = obj.val;
    }
  },
}

export default mutations
