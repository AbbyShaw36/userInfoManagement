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
				<tr>
					<td>{index + 1}</td>
					<td>{result.name}</td>
					<td>{result.age}</td>
					<td>{sex}</td>
					<td>
						<a href="#" onClick={o.handleUpdate.bind(this,index,result)}>修改</a>
						<a href="#" onClick={o.handleDelete.bind(this,index)}>删除</a>
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

function update(result,cb) {
	var UpdateBox = React.createClass({
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
				<div>
					<div className="shadow"></div>
					<div className="pop-ups" id="updateBox">
						<div>
							<label>
								<span>姓名</span>
								<input type="text" name="name" value={this.state.name} onChange={this.changeName}/>
							</label>
						</div>
						<div>
							<label>
								<span>年龄</span>
								<input type="text" name="age" value={this.state.age} onChange={this.chagneAge}/>
							</label>
						</div>
						<div>
							<label>
								<span>性别</span>
								<select name="sex" value={this.state.sex} onChange={this.chagneSex}>
									<option></option>
									<option value="1">男</option>
									<option value="2">女</option>
								</select>
							</label>
						</div>
						<div className="btnBox">
							<input type="button" value="保存" onClick={this.handleSave}/>
							<input type="button" value="取消" onClick={this.handleCancle} />
						</div>
					</div>
				</div>
			);
		}
	});

	ReactDOM.render(
		<UpdateBox />,
		document.getElementById("popupsBox")
	);
}