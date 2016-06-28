var InfoTable = React.createClass({
	render : function() {
		return (
			<table>
				<thead>
					<tr>
						<td>序号</td>
						<td>姓名</td>
						<td>年龄</td>
						<td>性别</td>
						<td>操作</td>
					</tr>
				</thead>
				<InfoList source="info.json"/>
			</table>
		);
	}
});

var InfoList = React.createClass({
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
				<tr>
					<td>{index + 1}</td>
					<td>{result.name}</td>
					<td>{result.age}</td>
					<td>{result.sex}</td>
					<td>
						<a href="#">修改</a>
						<a href="#" onClick={o.handleClick.bind(this,index)}>删除</a>
					</td>
				</tr>
			);
		});

		return (
			<tbody>
				{rows}
			</tbody>
		);
	}
});

ReactDOM.render(
	<InfoTable />,
	document.getElementById('infoTable')
);