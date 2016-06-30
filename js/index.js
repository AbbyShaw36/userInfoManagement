var InfoTable = React.createClass({displayName: "InfoTable",
	render : function() {
		return (
			React.createElement("table", null, 
				React.createElement("thead", null, 
					React.createElement("tr", null, 
						React.createElement("td", null, "序号"), 
						React.createElement("td", null, "姓名"), 
						React.createElement("td", null, "年龄"), 
						React.createElement("td", null, "性别"), 
						React.createElement("td", null, "操作")
					)
				), 
				React.createElement(InfoList, {source: "info.json"})
			)
		);
	}
});

var InfoList = React.createClass({displayName: "InfoList",
	getInitialState : function() {
		return {
			data : []
		};
	},
	componentDidMount : function() {
		this.serverRequest = $.get(this.props.source,function(result) {
			this.setState({
				data : result
			});
		}.bind(this));

		$("#formBtnBox input").on("click",function() {
			var name = $("#nameBox input").val();
			var age = $("#ageBox input").val();
			var sex = $("#sexBox select").val();

			if (!name) {
				alert("姓名不能为空！");
				return;
			}

			if (!age) {
				alert("年龄不能为空！");
				return;
			}

			if (!sex) {
				alert("性别不能为空！");
				return;
			}

			var data = [];

			data.push({
				name : name,
				age : age,
				sex : sex
			})

			this.state.data.forEach(function(result) {
				data.push(result);
			});

			this.setState({
				data : data
			});
		}.bind(this));
	},
	componentWillUnmount : function() {
		this.serverRequest.abort();
	},
	handleDelete : function(index) {
		var data = [];

		delete this.state.data[index];

		this.state.data.forEach(function(result,index) {
			data.push(result);
		});

		this.setState({
			data : data
		});
	},
	handleUpdate : function(index,result) {
		var that = this;
		update(result,function(newData) {
			var rows = [];

			that.state.data.forEach(function(result,index) {
				rows.push(result);
			});

			rows[index] = newData;

			that.setState({
				data : rows
			});
		});
	},
	render : function() {
		var data = this.state.data;
		var rows = [];
		var o = this;

		data.forEach(function(result,index) {
			var sex = "";
			if (result.sex === "1") {
				sex = "男";
			} else if (result.sex === "2") {
				sex = "女";
			}
			rows.push(
				React.createElement("tr", null, 
					React.createElement("td", null, index + 1), 
					React.createElement("td", null, result.name), 
					React.createElement("td", null, result.age), 
					React.createElement("td", null, sex), 
					React.createElement("td", null, 
						React.createElement("a", {href: "#", onClick: o.handleUpdate.bind(this,index,result)}, "修改"), 
						React.createElement("a", {href: "#", onClick: o.handleDelete.bind(this,index)}, "删除")
					)
				)
			);
		});

		return (
			React.createElement("tbody", null, 
				rows
			)
		);
	}
});

ReactDOM.render(
	React.createElement(InfoTable, null),
	document.getElementById('infoTable')
);

function update(result,cb) {
	var UpdateBox = React.createClass({displayName: "UpdateBox",
		getInitialState : function() {
			return {
				name : result.name,
				age : result.age,
				sex : result.sex,
			}
		},
		handleCancle : function() {
			$("#popupsBox").html("");
		},
		handleSave : function() {
			var name = this.state.name;
			var age = this.state.age;
			var sex = this.state.sex;

			if (!name) {
				alert("姓名不能为空！");
				return;
			}

			if (!age) {
				alert("年龄不能为空！");
				return;
			}

			if (!sex) {
				alert("性别不能为空！");
				return;
			}

			cb({
				name : name,
				age : age,
				sex : sex
			});

			$("#popupsBox").html("");
		},
		changeName : function(ev) {
			this.setState({
				name : ev.target.value
			});
		},
		chagneAge :function(ev) {
			this.setState({
				age : ev.target.value
			});
		},
		chagneSex : function(ev) {
			this.setState({
				sex : ev.target.value
			})
		},
		render: function() {
			return (
				React.createElement("div", null, 
					React.createElement("div", {className: "shadow"}), 
					React.createElement("div", {className: "pop-ups", id: "updateBox"}, 
						React.createElement("div", null, 
							React.createElement("label", null, 
								React.createElement("span", null, "姓名"), 
								React.createElement("input", {type: "text", name: "name", value: this.state.name, onChange: this.changeName})
							)
						), 
						React.createElement("div", null, 
							React.createElement("label", null, 
								React.createElement("span", null, "年龄"), 
								React.createElement("input", {type: "text", name: "age", value: this.state.age, onChange: this.chagneAge})
							)
						), 
						React.createElement("div", null, 
							React.createElement("label", null, 
								React.createElement("span", null, "性别"), 
								React.createElement("select", {name: "sex", value: this.state.sex, onChange: this.chagneSex}, 
									React.createElement("option", null), 
									React.createElement("option", {value: "1"}, "男"), 
									React.createElement("option", {value: "2"}, "女")
								)
							)
						), 
						React.createElement("div", {className: "btnBox"}, 
							React.createElement("input", {type: "button", value: "保存", onClick: this.handleSave}), 
							React.createElement("input", {type: "button", value: "取消", onClick: this.handleCancle})
						)
					)
				)
			);
		}
	});

	ReactDOM.render(
		React.createElement(UpdateBox, null),
		document.getElementById("popupsBox")
	);
}