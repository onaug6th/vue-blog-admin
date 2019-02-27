export default {
	recordToken(state, value) {
		state.token = value;
	},
	/**
	 * 更新文章类型列表
	 * @param {*} state 
	 * @param {array} value 
	 */
	updateArticleTypeList(state, value){
		state.articleTypeList = value;
	},
	/**
	 * 更新标签列表
	 * @param {*} state 
	 * @param {array} value 
	 */
	updateTagList(state, value){
		state.tagList = value;
	}
}
