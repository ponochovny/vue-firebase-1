<template>
	<div class="message" :class="{ 'from-user': owner }">
		{{ message.text }}
		<audio v-if="message.audioURL" preload="auto" controls>
			<source :src="message.audioURL" type="audio/ogg" />
			<source :src="message.audioURL" type="audio/mpeg" />
		</audio>
	</div>
</template>

<script>
export default {
	props: ['message', 'owner'],
}
</script>

<style scoped>
.message {
	background: #f7f7f7;
	color: black;
	margin-left: 10px;
	margin-right: auto;
	border-radius: 5px;
	padding: 12px;
	display: inline-block;
	width: 35%;
	min-width: 250px;
}
.from-user {
	margin-right: 10px;
	margin-left: auto;
	background: #cae6ff;
}
.sender {
	font-size: 0.5rem;
}
</style>
