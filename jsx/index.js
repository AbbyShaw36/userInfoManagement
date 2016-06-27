ReactDOM.render(
	<div id="formBox"></div>,
	document.getElementById("main")
);

var NameBox = function() {
	render : function() {
		return (
			<div>
				<label>
					<span></span>
					<input type="text"  />
				</label>
			</div>
		);
	}
}