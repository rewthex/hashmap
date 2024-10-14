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
	prepend(key, value) {
		const newNode = new Node(key, value);

		if (!this.head) {
			this.head = newNode;
			return;
		}

		newNode.nextNode = this.head;
		this.head = newNode;
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
	head() {
		return this.head;
	}
	tail() {
		if (!this.head) return null;
		if (this.size() === 1) return this.head;

		let currentNode = this.head;
		while (currentNode.nextNode !== null) {
			currentNode = currentNode.nextNode;
		}

		return currentNode;
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
	pop() {
		if (!this.head) return null;
		if (this.head.nextNode === null) {
			let removedNode = this.head;
			this.head = null;
			return removedNode;
		}

		let secondToLastIndex = this.size() - 2;
		let secondToLastNode = this.at(secondToLastIndex);
		let removedNode = secondToLastNode.nextNode;
		secondToLastNode.nextNode = null;
		return removedNode;
	}
	contains(key) {
		if (!this.head) return false;

		let currentNode = this.head;
		while (currentNode) {
			if (currentNode.key === key) return true;
			currentNode = currentNode.nextNode;
		}

		return false;
	}
	find(key) {
		if (!this.head) return null;

		let index = 0;
		let currentNode = this.head;
		while (currentNode) {
			if (currentNode.key === key) return index;
			currentNode = currentNode.nextNode;
			index += 1;
		}

		return null;
	}
	replace(value, index) {
		let nodeToReplace = this.at(index);
		nodeToReplace.value = value;
		return;
	}
	toString() {
		if (!this.head === null) return '';
		let linkedListString = '';
		let currentNode = this.head;

		while (currentNode.nextNode !== null) {
			linkedListString += `( ${currentNode.value} ) -> `;
			currentNode = currentNode.nextNode;
		}

		linkedListString += 'null';
		return linkedListString;
	}
	insertAt(key, value, index) {
		if (index > this.size() || index < 0) return null;

		let newNode = new Node(key, value);
		let currentNodeAtIndex = this.at(index);
		if (!currentNodeAtIndex) {
			newNode.nextNode = null;
		} else {
			newNode.nextNode = currentNodeAtIndex;
		}

		let nodeBeforeIndex = this.at(index - 1);
		if (!nodeBeforeIndex) {
			this.head = newNode;
		} else {
			nodeBeforeIndex.nextNode = newNode;
		}

		return newNode;
	}

	removeAt(index) {
		if (!this.at(index)) return null;

		let nodeToRemove = this.at(index);

		if (index === 0) {
			this.head = this.head.nextNode || null;
			return nodeToRemove;
		}

		let nodeBeforeIndex = this.at(index - 1);
		let nodeAfterIndex = this.at(index + 1);
		nodeBeforeIndex.nextNode = nodeAfterIndex || null;

		return nodeToRemove;
	}
}