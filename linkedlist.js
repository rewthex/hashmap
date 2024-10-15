export class Node {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.nextNode = null;
	}
}

export class LinkedList {
	constructor() {
		this.head = null;
	}

	append(key, value) {
		const newNode = new Node(key, value);

		if (!this.head) {
			this.head = newNode;
			return;
		}

		let currentNode = this.head;
		while (currentNode) {
			if (!currentNode.nextNode) {
				currentNode.nextNode = newNode;
				return;
			}
			currentNode = currentNode.nextNode;
		}
	}

	size() {
		let size = 0;
		if (!this.head) return size;

		let currentNode = this.head;
		while (currentNode) {
			size += 1;
			currentNode = currentNode.nextNode;
		}

		return size;
	}

	at(index) {
		if (index > this.size() - 1 || index < 0 || !this.head) return null;

		let currentNode = this.head;
		while (index > 0) {
			currentNode = currentNode.nextNode;
			index--;
		}

		return currentNode;
	}

	find(key) {
		if (!this.head) return null;

		let index = 0;
		let currentNode = this.head;
		while (currentNode) {
			if (currentNode.key === key) return currentNode.value;
			currentNode = currentNode.nextNode;
			index += 1;
		}

		return null;
	}

	contains(key) {
		if (!this.head) return false;

		let index = 0;
		let currentNode = this.head;
		while (currentNode) {
			if (currentNode.key === key) return true;
			currentNode = currentNode.nextNode;
			index += 1;
		}

		return false;
	}

	replace(value, index) {
		let nodeToReplace = this.at(index);
		nodeToReplace.value = value;
		return;
	}

}
