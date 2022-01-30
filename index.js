
var app = new Vue({
    el: '#app',
    data: {
      field: {width: 900, height: 700},
      name: '',
      user: {name: 'alina'},
      fishArr: [],
      records: [],
      scores: 0,
      end: false,
      seconds: 60
    },
    methods: {
        timer() {
            setInterval(() => {
                this.seconds--
                if (this.seconds === 0) {
                    this.end = true
                }
            }, 1000)
            
        },
        createUser() {
            this.user.name = this.name
            this.name = ''
            this.createFish()
        },
        createFish() {
            const type = Math.floor(Math.random() * (3 - 1) + 1)
            const fish = {
                type,
                photo: type === 1 ? 'f1.png' : 'f2.png',
                top: Math.floor(Math.random() * (this.field.height - 100)),
                left: Math.floor((Math.random() * (this.field.width - 200)) + 100),
                back: false
            }
            this.fishArr.push(fish)
            this.swim()
        },
        catchFish(index) {
                this.scores += this.fishArr[index].type === 1 ? 200 : 100
                this.fishArr.splice(index, 1)
                if (this.fishArr[index].type === 1) {
                    this.createFish()

                } else {
                    this.createFish()
                    this.createFish()
                }
        },
        start() {
            if (!this.seconds) this.end = true
            this.timer()
            for(let i = 0; i < 5; i++) {
                this.createFish()
            }
        },
        swim() {
            this.fishArr.forEach(fish => {
                setInterval(() => {
                    if (fish.left === 0) {
                        fish.back = true
                    }
                    if (fish.left === this.field.width - 100) fish.back = false
                    if (!fish.back) {
                        fish.left -= 1
                    } else {
                        fish.left += 1
                    }   
                }, 20)
            });
        }
    },
  })