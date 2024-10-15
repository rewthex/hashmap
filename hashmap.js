import { LinkedList } from './linkedlist.js';

class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this.capacity = capacity;
		this.loadFactor = loadFactor;
		this.buckets = [];
	}

	hash(key) {
		let h = 5381;
		for (let i = 0; i < key.length; i++) {
			const ascii = key.charCodeAt(i);
			h = ((h << 3) ^ h ^ ascii) % this.capacity;
		}
		return h & 0xffffffffff;
	}

	rehash() {
		let entries = {};

		for (let bucket of Object.values(this.buckets)) {
			let currentNode = bucket.head;
			while (currentNode) {
				entries[currentNode.key] = currentNode.value;
				currentNode = currentNode.nextNode;
			}
		}

		this.buckets = [];

		for (let key in entries) {
			this.set(key, entries[key]);
		}

		return;
	}

	set(key, value) {
		if (this.length() > this.capacity * this.loadFactor) {
			this.capacity = this.capacity * 2;
			this.rehash();
		}

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

	get(key) {
		let index = this.hash(key);
		let bucket = this.buckets[index];
		if (!bucket) return null;
		return bucket.find(key);
	}

	has(key) {
		let index = this.hash(key);
		let bucket = this.buckets[index];
		if (!bucket) return false;
		return bucket.contains(key);
	}

	remove(key) {}

	length() {
		let length = 0;
		for (let bucket of Object.values(this.buckets)) {
			length += bucket.size();
		}
		return length;
	}
}

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('apple', 'blue');

console.log(test.has('applssse'));
