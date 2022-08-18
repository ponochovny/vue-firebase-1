export const messagesStucker = (messages) => {
	const colors = [
		'#c1a000',
		'#970000',
		'#5cc100',
		'#00c1b8',
		'#0071c1',
		'#6e00c1',
		'#c10086',
	]
	const filledColors = []

	const randomBg = (userId) => {
		const index = filledColors.findIndex((el) => el.userId === userId)

		if (index != -1) {
			return filledColors[index].color
		} else {
			const randomColor = colors[Math.floor(Math.random() * colors.length - 1)]

			filledColors.push({ userId, color: randomColor })
			return randomColor
		}
	}

	let tempId = ''
	const newArr = messages.map((message) => {
		if (message.sender === tempId) {
			return message
		} else {
			tempId = message.sender
			const bgColor = randomBg(message.sender)
			console.log('bgColor', bgColor)
			return {
				...message,
				avatar: true,
				bgColor,
			}
		}
	})

	console.log('exported messages: ', newArr)

	return newArr
}
