import { Node, LinkedList } from './linkedlist.js';

class HashMap {
	constructor(capacity = 16, loadfactor = 0.75) {
		this.capacity = capacity;
		this.loadFactor = loadfactor;
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
			if (existingKeyIndex !== -1) {
				bucket.replace(value, existingKeyIndex);
			} else {
				bucket.append(key, value);
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

const hash = new HashMap();
hash.set('Aaron', 'Potatoes');
hash.set('Jerry', 'Potatoes');
hash.set('Jeffrey', 'Potatoes');
