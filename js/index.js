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
	handleClick : function(index) {
		var data = [];

		delete this.state.data[index];

		this.state.data.forEach(function(result,index) {
			data.push(result);
		});

		this.setState({
			data : data
		});
	},
	render : function() {
		var data = this.state.data;
		var rows = [];
		var o = this;

		data.forEach(function(result,index) {
			rows.push(
				React.createElement("tr", null, 
					React.createElement("td", null, index + 1), 
					React.createElement("td", null, result.name), 
					React.createElement("td", null, result.age), 
					React.createElement("td", null, result.sex), 
					React.createElement("td", null, 
						React.createElement("a", {href: "#"}, "修改"), 
						React.createElement("a", {href: "#", onClick: o.handleClick.bind(this,index)}, "删除")
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