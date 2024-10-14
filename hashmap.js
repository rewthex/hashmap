class Node {
	constructor(value) {
		this.value = value || null;
		this.nextNode = null;
	}
}

class HashMap {
	constructor(length = 16) {
		this.length = length;
		this.buckets = Array.from({ length }, () => []);
	}

	hash(key) {
		let h = 5381;
		let i = 0;
		for (i = 0; i < key.length; i++) {
			const ascii = key.charCodeAt(i);
			h = ((h << 3) ^ h ^ ascii) % this.length;
		}
		return h & 0xffffffffff;
	}

	set(key, value) {
		let index = this.hash(key);
		let bucket = this.buckets[index];
		let existingKeyIndex = bucket.findIndex((entry) => entry[0] === key);
		if (existingKeyIndex === -1) {
			bucket.push([key, value]);
		} else {
			bucket[existingKeyIndex] = [key, value];
		}
	}

	get(key) {
		let index = this.hash(key);
		let bucket = this.buckets[index];
		let existingKeyIndex = bucket.findIndex((entry) => entry[0] === key);

		if (existingKeyIndex === -1) {
			return null;
		} else {
			return bucket[existingKeyIndex];
		}
	}
}

const hash = new HashMap(16);
hash.set('Aaron', 'Potatoes');
hash.set('Aaron', 'Corn-flakes')
console.log(hash.get('Aaron'))
