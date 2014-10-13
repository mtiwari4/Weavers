dust.helpers.iter = function(chk, ctx, bodies) {
	var obj = ctx.current();
	for ( var k in obj) {
		chk = chk.render(bodies.block, ctx.push({
			key : k,
			value : obj[k]
		}));
	}
	return chk;
};