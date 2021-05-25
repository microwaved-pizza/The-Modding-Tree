addLayer("c", {
    name: "chemistree 2",
    startData() {return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#234567",
    row: 0,
    resource: "chemicals",
    symbol: "C",
    position: 0,
    clickables: {
        11: {
            title: "The Chemistree 2",
            display() {
                return "The sequel to a tree that doesn't exist anymore."
            },
            canClick() {return true},
            onClick() {
                window.location.href = "https://raw.githack.com/microwaved-pizza/The-Modding-Tree/chem2/index.html"
            }
        }
    },
    upgrades: {}
})