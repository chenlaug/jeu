import kaboom from "kaboom"

kaboom()

loadSprite("bean", "sprites/bean.png")

scene("game", () => {
	setGravity(1600)


	const Player = add([
		sprite("bean"),
		pos(180, 80),
		area(),
		body(),
	])

	add([
		rect(width(), 48),
		pos(0, height() - 48),
		outline(4),
		area(),
		body({ isStatic: true }),
		color(127, 200, 255),
	])

	const Jump = () => {
		if (Player.isGrounded()) {
			Player.jump()
		}
	}
	onKeyPress("space", Jump);
	onClick(Jump);

	const spawnTree = () => {
		add([
			rect(48, rand(24, 64)),
			area(),
			outline(4),
			pos(width(), height() - 48),
			anchor("botleft"),
			color(255, 180, 255),
			move(LEFT, 240),
			"tree",
		]);
		wait(rand(0.5, 1.5), spawnTree);
	}

	spawnTree();
	Player.onCollide("tree", () => {
		addKaboom(Player.pos);
		shake();
		burp();
		go("lose", score);
	});

	let score = 0;

	const scoreLabel = add([
		text(score),
		pos(24, 24),
	]);

	onUpdate(() => {
		score++;
		scoreLabel.text = score;
	});

});

scene("lose", (score) => {
	add([
		sprite("bean"),
		pos(width() / 2, height() / 2 - 80),
		scale(2),
		anchor("center"),
	]);

	add([
		text(score),
		pos(width() / 2, height() / 2 + 80),
		scale(2),
		anchor("center"),
	]);

	onKeyPress("space", () => go("game"));
	onClick(() => go("game"));
})

go("game")
// scene("game", () => {
// 	setGravity(1600)

// 	const Player = add([
// 		sprite("bean"),
// 		pos(180, 80),
// 		area(),
// 		body(),
// 	])

// 	add([
// 		rect(width(), 48),
// 		pos(0, height() - 48),
// 		outline(4),
// 		area(),
// 		body({ isStatic: true }),
// 		color(127, 200, 255),
// 	])

// 	function spawnTree() {
// 		add([
// 			rect(48, rand(24, 64)),
// 			area(),
// 			outline(4),
// 			pos(width(), height() - 48),
// 			anchor("botleft"),
// 			color(255, 180, 255),
// 			move(LEFT, 240),
// 			"enemy",
// 		]);
// 		wait(rand(0.5, 1.5), () => {
// 			spawnTree();
// 		});
// 	}

// 	spawnTree();

// 	Player.onCollide("enemy", () => {
// 		addKaboom(Player.pos);
// 		shake();
// 	});

// 	onKeyPress("space", () => {
// 		if (Player.isGrounded()) {
// 			Player.jump()
// 		}
// 	})
// })


// scene("lose", () => {
// 	add([
// 		text("Game Over"),
// 		pos(center()),
// 		anchor("center"),
// 	])
// })

// go("game")