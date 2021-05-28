addLayer("p", {
    name: "prestige",
    startData() {return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#31aeb0",
    row: 0,
    resource: "prestige points",
    hotkeys: [
        {
            key: "p",
            description: "p: reset your points for prestige points",
            onPress() {if (player.p.unlocked && canReset("p")) {doReset("p")}}
        }
    ],
    symbol: "P",
    position: 0,
    type: "normal",
    baseResource: "points",
    baseAmount() {return player.points},
    requires: new Decimal(10),
    exponent() {
        let exp = new Decimal(0.5)
        if (player.g.upgrades.includes(13)) {exp = exp.add(0.06)}
        if (player.b.unlocked) {exp = exp.mul(tmp.b.effect)}
        if (player.b.upgrades.includes(13)) {exp = exp.mul(tmp.b.upgrades[13].effect)}
        if (player.inf.milestones.includes("1")) {exp = exp.div(new Decimal(2).pow(player.inf.milestones.length))}
        return exp
    },
    doReset(layer) {
        if (tmp[layer].row == 0) {return}
        if (layer === "b") {
            player.p.points = new Decimal(0)
            player.p.best = new Decimal(0)
            if (!(player.b.milestones.includes("0"))) {
                player.p.upgrades = []
            }
        }
        if (layer === "g") {
            player.p.points = new Decimal(0)
            player.p.best = new Decimal(0)
            player.p.upgrades = []
        }
        if (layer === "inf") {
            player.p.points = new Decimal(0)
            player.p.best = new Decimal(0)
            player.p.upgrades = []
        }
    },
    update(diff) {
        if (player.b.milestones.includes("0")) {
            let gain = player.p.points.pow(0.01)
            player.p.points = player.p.points.add(getResetGain("p").mul(gain.div(100)).mul(diff))
            if (player.p.points.gt(player.p.best)) {player.p.best = player.p.points}
        }
    },
    upgrades: {
        11: {
            fullDisplay() {
                return `<h3>Begin</h3><br>
                Generate 1 point per second.<br>
                Cost: 1 prestige point`
            },
            canAfford() {return player.p.points.gte(1)},
            pay() {player.p.points = player.p.points.sub(1)}
        },
        12: {
            fullDisplay() {
                return `<h3>Prestige Boost</h3><br>
                Prestige points boost point gain.<br>
                Cost: 1 prestige point<br>
                Currently: ${format(tmp.p.upgrades[12].effect, 2)}x`
            },
            effect() {
                let base = player.p.points.add(10).log10()
                let pow = new Decimal(2)
                if (player.p.upgrades.includes(13)) {pow = pow.mul(2)}
                if (player.p.upgrades.includes(14)) {pow = pow.mul(2)}
                if (player.inf.milestones.includes("0")) {pow = pow.mul(2)}
                return base.pow(pow)
            },
            unlocked() {return player.p.upgrades.includes(11)},
            canAfford() {return player.p.points.gte(1)},
            pay() {player.p.points = player.p.points.sub(1)}
        },
        13: {
            fullDisplay() {
                return `<h3>Prestige Booster</h3><br>
                <h3>Prestige Boost</h3> is squared.<br>
                Cost: 5 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(12)},
            canAfford() {return player.p.points.gte(5)},
            pay() {player.p.points = player.p.points.sub(5)}
        },
        14: {
            fullDisplay() {
                return `<h3>Prestige Boostest</h3><br>
                <h3>Prestige Boost</h3> is squared.<br>
                Cost: 10 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(13)},
            canAfford() {return player.p.points.gte(10)},
            pay() {player.p.points = player.p.points.sub(10)}
        },
        15: {
            fullDisplay() {
                return `<h3>Booster Prestige</h3><br>
                Unlock boosters.<br>
                Cost: 1,000 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(14)},
            canAfford() {return player.p.points.gte(1000)},
            pay() {player.p.points = player.p.points.sub(1000)}
        },
        21: {
            fullDisplay() {
                return `<h3>Booster Boost</h3><br>
                The booster effect boosts itself.<br>
                Cost: 1e150 prestige points<br>
                Currently: ${format(tmp.p.upgrades[21].effect, 2)}x`
            },
            effect() {
                let base = tmp.b.effect.add(10).log10()
                if (player.p.upgrades.includes(22)) {base = base.mul(2)}
                if (player.p.upgrades.includes(23)) {base = base.mul(4)}
                return base
            },
            unlocked() {return player.b.upgrades.includes(11)},
            canAfford() {return player.p.points.gte(1e150)},
            pay() {player.p.points = player.p.points.sub(1e150)}
        },
        22: {
            fullDisplay() {
                return `<h3>Booster Booster</h3><br>
                <h3>Booster Boost</h3> is doubled.<br>
                Cost: 1e750 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(21)},
            canAfford() {return player.p.points.gte("1e750")},
            pay() {player.p.points = player.p.points.sub("1e750")}
        },
        23: {
            fullDisplay() {
                return `<h3>Booster Boostest</h3><br>
                <h3>Booster Boost</h3> is quadrupled.<br>
                Cost: 1e2,000 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(22)},
            canAfford() {return player.p.points.gte("1e2000")},
            pay() {player.p.points = player.p.points.sub("1e2000")}
        },
        24: {
            fullDisplay() {
                return `<h3>Point Boost</h3><br>
                Point gain x10.<br>
                Cost: 1e33,333 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(23)},
            canAfford() {return player.p.points.gte("1e33333")},
            pay() {player.p.points = player.p.points.sub("1e33333")}
        },
        25: {
            fullDisplay() {
                return `<h3>Generator Boost</h3><br>
                Unlock generators.<br>
                Cost: 1e126,666 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(24)},
            canAfford() {return player.p.points.gte("1e126666")},
            pay() {player.p.points = player.p.points.sub("1e126666")}
        }
    }
})
addLayer("b", {
    name: "boosters",
    startData() {return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#6e64c4",
    row: 1,
    resource: "boosters",
    hotkeys: [
        {
            key: "b",
            description: "b: reset your points for boosters",
            onPress() {if (player.b.unlocked && canReset("b")) {doReset("b")}}
        }
    ],
    effect() {
        let base = new Decimal(2)
        if (player.b.milestones.includes("0")) {
            let gain = new Decimal(0.1)
            if (player.g.unlocked) {gain = gain.mul(tmp.g.effect)}
            base = base.add(gain)
        }
        if (player.g.upgrades.includes(12)) {base = base.add(5)}
        let effective = player.b.points
        if (effective.gte(10)) {
            effective = effective.log10().mul(10)
        }
        let mult = new Decimal(1)
        if (player.p.upgrades.includes(21)) {mult = mult.mul(tmp.p.upgrades[21].effect)}
        if (player.b.upgrades.includes(14)) {mult = mult.mul(tmp.b.upgrades[14].effect)}
        return base.pow(effective).mul(mult)
    },
    effectDescription() {return `which are multiplying prestige point exponent by ${format(tmp.b.effect, 2)} ${player.b.points.gte(10) ? "(softcapped)" : ""}`},
    layerShown() {return player.p.upgrades.includes(15) || player.b.unlocked},
    symbol: "B",
    position: 0,
    branches: ["p"],
    type: "static",
    baseResource: "points",
    baseAmount() {return player.points},
    requires: new Decimal(1e6),
    exponent() {
        let exp = new Decimal(2)
        return exp
    },
    base() {
        let base = new Decimal(10)
        return base
    },
    doReset(layer) {
        if (layer === "inf") {
            player.b.points = new Decimal(0)
            player.b.best = new Decimal(0)
            player.b.upgrades = []
        }
    },
    upgrades: {
        11: {
            fullDisplay() {
                return `<h3>Boosted</h3><br>
                The booster effect applies to point gain.<br>
                Cost: 4 boosters`
            },
            canAfford() {return player.b.points.gte(4)},
            pay() {player.b.points = player.b.points.sub(4)}
        },
        12: {
            fullDisplay() {
                return `<h3>Booster Generation</h3><br>
                Product of booster and generator effect multiplies point gain.<br>
                Cost: e2.8e28 prestige points`
            },
            unlocked() {return player.g.points.gte(10)},
            canAfford() {return player.p.points.gte("e2.8e28")},
            pay() {player.p.points = player.p.points.sub("e2.8e28")}
        },
        13: {
            fullDisplay() {
                return `<h3>Prestige Generation</h3><br>
                Points boost prestige point exponent.<br>
                Cost: e1.105e29 prestige points<br>
                Currently: ${format(tmp.b.upgrades[13].effect, 2)}x`
            },
            effect() {
                let base = player.points.add(1).log10().add(10).log10()
                return base
            },
            unlocked() {return player.b.upgrades.includes(12)},
            canAfford() {return player.p.points.gte("e1.105e29")},
            pay() {player.p.points = player.p.points.sub("e1.105e29")}
        },
        14: {
            fullDisplay() {
                return `<h3>Generator Generation</h3><br>
                Generators boost booster effect.<br>
                Cost: e9.15e29 prestige points<br>
                Currently: ${format(tmp.b.upgrades[14].effect, 2)}x`
            },
            effect() {
                let base = new Decimal(1.1).pow(player.g.points)
                return base
            },
            unlocked() {return player.b.upgrades.includes(13)},
            canAfford() {return player.p.points.gte("e9.15e29")},
            pay() {player.p.points = player.p.points.sub("e9.15e29")}
        },
        15: {
            fullDisplay() {
                return `<h3>Infinity</h3><br>
                Unlock infinity.<br>
                Cost: 1.8e308 points`
            },
            unlocked() {return player.b.upgrades.includes(14)},
            canAfford() {return player.points.gte("1.8e308")},
            pay() {player.points = player.points.sub("1.8e308")}
        }
    },
    milestones: {
        0: {
            requirementDescription: "7 best boosters",
            effectDescription: "Gain (prestige points^0.01)% of prestige points per second, keep all prestige upgrades on booster reset, and booster base +0.1",
            done() {return player.b.best.gte(7)}
        },
    }
})
addLayer("g", {
    name: "generators",
    startData() {return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#a3d9a5",
    row: 1,
    resource: "generators",
    hotkeys: [
        {
            key: "g",
            description: "g: reset your points for generators",
            onPress() { if (player.g.unlocked && canReset("g")) {doReset("g")} }
        }
    ],
    effect() {
        let base = new Decimal(2)
        if (player.g.upgrades.includes(11)) {base = base.add(0.01)}
        let effective = player.g.points
        if (effective.gte(10)) {effective = new Decimal(10)}
        let mult = new Decimal(1)
        return base.pow(effective).mul(mult)
    },
    effectDescription() {return `which are multiplying booster milestone's last effect's by ${format(tmp.g.effect, 2)} ${player.g.points.gte(10) ? "(hardcapped)" : ""}`},
    layerShown() {return player.p.upgrades.includes(25) || player.g.unlocked},
    symbol: "G",
    position: 1,
    branches: ["p", "b"],
    type: "static",
    baseResource: "points",
    baseAmount() {return player.points},
    requires: new Decimal(1e48),
    exponent() {
        let exp = new Decimal(2)
        return exp
    },
    base() {
        let base = new Decimal(10)
        return base
    },
    doReset(layer) {
        if (layer === "inf") {
            player.g.points = new Decimal(0)
            player.g.best = new Decimal(0)
        }
    },
    upgrades: {
        11: {
            fullDisplay() {
                return `<h3>Infinite Generation</h3><br>
                Generator base +0.01.<br>
                Req: 15 generators`
            },
            unlocked() {return player.inf.points.gte(1)},
            canAfford() {return player.g.points.gte(15)},
            pay() {return}
        },
        12: {
            fullDisplay() {
                return `<h3>Infinite Boosters</h3><br>
                Booster base +5.<br>
                Req: e4.625e29 prestige points`
            },
            unlocked() {return player.g.upgrades.includes(11)},
            canAfford() {return player.p.points.gte("e4.625e29")},
            pay() {return}
        },
        13: {
            fullDisplay() {
                return `<h3>Infinite Prestige</h3><br>
                Base prestige point exponent +0.06.<br>
                Req: 16 generators`
            },
            unlocked() {return player.g.upgrades.includes(12)},
            canAfford() {return player.g.points.gte(16)},
            pay() {return}
        },
        14: {
            fullDisplay() {
                return `<h3>Infinite Points</h3><br>
                Point gain ^1.115.<br>
                Req: e4.422e30 prestige points`
            },
            unlocked() {return player.g.upgrades.includes(13)},
            canAfford() {return player.p.points.gte("e4.422e30")},
            pay() {return}
        }
    }
})
addLayer("inf", {
    name: "infinity",
    startData() {return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#ffffff",
    row: 69420,
    displayRow: "side",
    resource: "infinity points",
    hotkeys: [
        {
            key: "I",
            description: "shift+i: reset your points for infinity points",
            onPress() { if (player.inf.unlocked && canReset("inf")) {doReset("inf")} }
        }
    ],
    layerShown() {return player.b.upgrades.includes(15) || player.inf.unlocked},
    symbol: "I",
    position: 0,
    type: "static",
    baseResource: "points",
    baseAmount() {return player.points},
    requires: new Decimal(2).pow(1024),
    exponent() {
        let exp = new Decimal(2).pow(4)
        return exp
    },
    base() {
        let base = new Decimal(2).pow(32)
        return base
    },
    milestones: {
        0: {
            requirementDescription: "1 infinity point",
            effectDescription: "Point gain ^0.5 per milestone. Keep booster milestone on infinity reset. <h3>Begin</h3> is 69420x stronger. <h3>Prestige Boost</h3> is squared.",
            done() {return player.inf.best.gte(1)}
        },
        1: {
            requirementDescription: "2 infinity point",
            effectDescription: "Prestige point exponent /2 per milestone. Keep generator upgrades on infinity reset. <h3>Begin</h3> is 69420x stronger.",
            done() {return player.inf.best.gte(2)}
        }
    }
})