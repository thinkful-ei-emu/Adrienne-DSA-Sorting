// 1
/*
21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40
1st call: 21 1 26 45 29 28 2 9 16   49 39 27 43 34 46 40
2nd call: 21 1 26 45    29 28 2 9 16
3rd call: 21 1    26 45
16th call: 2 9 16 28 29
first 2 lists to merge: 21 and 1 would merge to 1 21
7th merge: 2 9 16 28 29

4: 21   1
5: 1 21           1st merge
6: 26   45
7: 26 45          2nd merge
8: 1 21 26 45     3rd merge
8: 29 28 2    9 16
9: 29 28    2
10: 29  28
11: 28 29         4th merge
12: 2
13: 2 28 29       5th merge
14: 9   16
15: 9 16          6th merge
16: 2 9 16 28 29  7th merge
*/


// 2
// The pivot could have been either 14 or 17 because all the values to the left of those numbers are less than 14 and 17 and all of the numbers to the right are greater than 14 and 17
/*
                                  pivot
14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
ij
14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
i   j
14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
i       j
14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
i           j
14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
i               j
14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
i                   j                 10 swaps with 14
10, 17, 13, 15, 19, 14, 3, 16, 9, 12 
    i                   j             3 swaps with 17
10, 3, 13, 15, 19, 14, 17, 16, 9, 12 
       i                   j
10, 3, 13, 15, 19, 14, 17, 16, 9, 12 
       i                       j      9 swaps with 13
10, 3, 9, 15, 19, 14, 17, 16, 13, 12 
          i                       j   12 swaps with 15
10, 3, 9, 12, 19, 14, 17, 16, 13, 15
        new pivot is 9
10, 3, 9
ij
10, 3, 9
i   j     3 swaps with 10
3, 10, 9
   i   j  9 swaps with 10
3, 9, 10

*/

/*
pivot
14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
                                      1st move pivot to the end
17, 13, 15, 19, 10, 3, 16, 9, 12, 14 
ij      
17, 13, 15, 19, 10, 3, 16, 9, 12, 14
i   j                                 13 swaps with 17
13, 17, 15, 19, 10, 3, 16, 9, 12, 14
i       j
13, 17, 15, 19, 10, 3, 16, 9, 12, 14
    i       j
13, 17, 15, 19, 10, 3, 16, 9, 12, 14
    i           j                     10 swaps with 17
13, 10, 15, 19, 17, 3, 16, 9, 12, 14
        i           j                 3 swaps with 15
13, 10, 3, 19, 17, 15, 16, 9, 12, 14
           i           j
13, 10, 3, 19, 17, 15, 16, 9, 12, 14
           i               j         9 swaps with 19
13, 10, 3, 9, 17, 15, 16, 19, 12, 14
              i               j      12 swaps with 17
13, 10, 3, 9, 12, 15, 16, 19, 17, 14
                  i               j  14 swaps with 15
13, 10, 3, 9, 12, 14, 16, 19, 17, 15
              new pivot is 12
13, 10, 3, 9, 12
ij
13, 10, 3, 9, 12
i   j             10 swaps with 13
10, 13, 3, 9, 12
    i   j         3 swaps with 13
10, 3, 13, 9, 12
       i   j      9 swaps with 13
10, 3, 9, 13, 12
          i   j   12 swaps with 13
10, 3, 9, 12, 13  
*/


// first partition, does second partition only go through first half of the array or does it do the whole thing again?
// last item: 3, 9, 10, 12, 19, 14, 17, 16, 13, 15
// first item: 10, 3, 9, 12, 13, 14, 16, 19, 17, 15


// 3
const arr = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];
function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function partition(array, start, end) {
  const pivot = array[end -1];
  let j = start;
  for(let i = start; i < end -1 ; i++) {
    if(array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end-1, j);
  return j;
}

function quickSort(array, start = 0, end = array.length) {
  if(start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}
quickSort(arr);


// 4
function mergeSort(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while(leftIndex < left.length && rightIndex < right.length) {
    if(left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }
  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }
  for(let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}
mergeSort(arr[0], arr.length, arr);


// 5
class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) { 
    this.head = new _Node(item, this.head);
  }

  insertLast(item) { 
    if(this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  find(item) { 
    let currNode = this.head;
    if(!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  remove(item) { 
    if(!this.head) {
      return null;
    }
    if(this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let previousNode = this.head;
    while((currNode !== null) && (currNode.value !== item)) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if(currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }

  insertBefore(item, itemAfter) { 
    let after = this.find(itemAfter);
    if(this.head === null) {
      this.insertFirst(item);
    } else {
      let currNode = this.head;
      let previousNode;
      while(currNode.value !== after.value) {
        previousNode = currNode;
        currNode = currNode.next;
      }
      previousNode.next = new _Node(item, after);
    }
  }

  insertAfter(item, itemBefore) { 
    let before = this.find(itemBefore);
    let currNode = this.head;
    while(currNode.value !== before.value) {
      currNode = currNode.next;
    }
    currNode.next = new _Node(item, currNode.next);
  }

  insertAt(item, position) { 
    let counter = 0;
    let currNode = this.head;
    if(position === 0) {
      this.head = new _Node(item, currNode.next);
    }
    while(counter < position - 1) {
      currNode = currNode.next;
      counter++;
    }
    currNode.next = new _Node(item, currNode.next);
  }
}



// 6


// 7


// 8