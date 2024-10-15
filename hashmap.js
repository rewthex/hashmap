import { Node, LinkedList } from './linkedlist.js';

class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this.capacity = capacity;
		this.loadFactor = loadFactor;
		this.buckets = [];
	}

	hash(key) {
		let h = 5381;
		let i = 0;
		for (i = 0; i < key.length; i++) {
			const ascii = key.charCodeAt(i);
			h = ((h << 3) ^ h ^ ascii) % this.capacity;
		}
		return h & 0xffffffffff;
	}

	set(key, value) {
		let index = this.hash(key);
		let bucket = this.buckets[index];
		if (bucket) {
			let existingKeyIndex = bucket.find(key);
			if (existingKeyIndex === null) {
				bucket.append(key, value);
			} else {
				bucket.replace(value, existingKeyIndex);
			}
		} else {
			let linkedList = new LinkedList();
			linkedList.append(key, value);
			this.buckets[index] = linkedList;
		}
	}

	get(key) {}

	has(key) {}

	remove(key) {}

	length() {
		let length = 0;
		for (let bucket of Object.values(this.buckets)) {
			length += bucket.size();
		}
		return length;
	}
}

const test = new HashMap()

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('lioaasn', 'golden')
test.set('lioxn', 'golden')
test.set('lawion', 'golden')
test.set('lioncc', 'golden')
test.set('liong', 'golden')
test.set('lioern', 'golden')

console.log(test.length());