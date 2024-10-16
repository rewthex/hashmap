import { LinkedList } from './linkedlist.js';

export class HashMap {
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
		let entries = this.entries();

		this.buckets = [];

		for (let index in entries) {
			this.set(entries[index][0], entries[index][1]);
		}

		return;
	}

	set(key, value) {
		if (this.exceedsLoadFactor()) {
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

	remove(key) {
		let index = this.hash(key);
		let bucket = this.buckets[index];

		if (!bucket || !bucket.contains(key)) return false;

		if (bucket.head.key === key && bucket.head.nextNode) {
			bucket.head = bucket.head.nextNode;
			return true;
		} else if (bucket.head.key === key) {
			this.buckets[index] = undefined;
			return true;
		}

		let currentNode = bucket.head;
		let nextNode = currentNode.nextNode;

		while (nextNode) {
			if (nextNode.key === key) {
				currentNode.nextNode = nextNode.nextNode || null;
				return true;
			}
			currentNode = nextNode;
			nextNode = nextNode.nextNode;
		}
	}

	exceedsLoadFactor() {
		return (this.length() > this.capacity * this.loadFactor);
	}

	length() {
		let length = 0;
		for (let bucket of Object.values(this.buckets)) {
			length += bucket.size();
		}
		return length;
	}

	clear() {
		this.buckets = [];
	}

	keys() {
		let keys = [];
		for (let bucket of Object.values(this.buckets)) {
			let currentNode = bucket.head;
			while (currentNode) {
				keys.push(currentNode.key);
				currentNode = currentNode.nextNode;
			}
		}
		return keys;
	}

	values() {
		let values = [];
		for (let bucket of Object.values(this.buckets)) {
			let currentNode = bucket.head;
			while (currentNode) {
				values.push(currentNode.value);
				currentNode = currentNode.nextNode;
			}
		}
		return values;
	}

	entries() {
		let entries = [];
		for (let bucket of Object.values(this.buckets)) {
			let currentNode = bucket.head;
			while (currentNode) {
				entries.push([currentNode.key, currentNode.value]);
				currentNode = currentNode.nextNode;
			}
		}
		return entries;
	}
}
