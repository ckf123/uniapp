const install = (Vue, vm) => {
	gender: {
	    dataSource: [{ name: "男", code: "1" }, { name: "女", code: "0" }],
	    key: "gender",
	    name: "性别"
	},
	vm.$u.enuminfo={gender,}
}

export default {
	install
}