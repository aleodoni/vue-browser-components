<template>
	<div class="my-component">
		<p>Custom Component Version: {{version}}</p>
	</div>
</template>

<script>
export default {
	name : 'my-component',
	data() {
		return {
			version : 'rg-01'
		};
	}
};
</script>

<style lang="less" scoped>
.my-component {
	.title {
		font-weight: bold;
		text-transform: uppercase;
	}
}
</style>