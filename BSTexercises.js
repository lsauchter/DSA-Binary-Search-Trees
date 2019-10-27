const BinarySearchTree = require("./binarySearchTree");

function main() {
  const BST = new BinarySearchTree();
  BST.insert(3, 3);
  BST.insert(1, 1);
  BST.insert(4, 4);
  BST.insert(6, 6);
  BST.insert(9, 9);
  BST.insert(2, 2);
  BST.insert(5, 5);
  BST.insert(7, 7);
  console.log(BST);
  const EST = new BinarySearchTree();
  EST.insert("E", "E");
  EST.insert("A", "A");
  EST.insert("S", "S");
  EST.insert("Y", "Y");
  EST.insert("Q", "Q");
  EST.insert("U", "U");
  EST.insert("E", "E");
  EST.insert("S", "S");
  EST.insert("T", "T");
  EST.insert("I", "I");
  EST.insert("O", "O");
  EST.insert("N", "N");
  console.log(EST);
  console.log(height(BST));
  console.log(checkBST(BST));
  console.log(nthLargest(BST, 3));
  console.log(balanced(BST));
  console.log(identical([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]));
}

main();

function height(node) {
  if (node == null) {
    return 0;
  } else {
    let ldepth = height(node.left);
    let rdepth = height(node.right);

    if (ldepth > rdepth) {
      return ldepth + 1;
    } else {
      return rdepth + 1;
    }
  }
}

function checkBST(node) {
  if (node == null) {
    return true;
  } else if (node.left && node.left.value > node.value) {
    return false;
  } else if (node.right && node.right.value < node.value) {
    return false;
  }
  let right = checkBST(node.right);
  let left = checkBST(node.left);
  if (right && left) {
    return true;
  }
  return false;
}

function nthLargest(node, num) {
  let count = 0;
  let resultNode;
  const counter = foundNode => {
    count++;
    if (count === num) {
      return (resultNode = foundNode.value);
    }
  };
  function reverse(node, cb) {
    if (node.right !== null) {
      reverse(node.right, cb);
    }
    cb(node);
    if (node.left !== null) {
      reverse(node.left, cb);
    }
  }

  reverse(node, counter);

  return resultNode;
}

function balanced(node) {
  let rheight = 0;
  let lheight = 0;
  if (node == null) {
    return true;
  } else {
    if (node.right) {
      rheight = height(node.right);
    }
    if (node.left) {
      lheight = height(node.left);
    }
    if (Math.abs(rheight - lheight) <= 2) {
      return true;
    } else return false;
  }
}

function identical(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  } else if (arr1[0] !== arr2[0]) {
    return false;
  } else {
    const root1 = arr1[0];
    const root2 = arr2[0];
    let same = true;
    function checkTree(val1, subArr1, val2, subArr2) {
      if (subArr1.length === 0 && subArr2.length === 0) {
        return true;
      } else {
        let higher1, higher2, lower1, lower2;
        if (val1 === root1 && val2 === root2) {
          higher1 = subArr1.find(num => num > root1 && num > val1);
          higher2 = subArr2.find(num => num > root2 && num > val2);
          lower1 = subArr1.find(num => num < root1 && num < val1);
          lower2 = subArr2.find(num => num < root2 && num < val2);
        } else if (val1 > root1 && val2 > root2) {
          higher1 = subArr1.find(num => num > root1 && num > val1);
          higher2 = subArr2.find(num => num > root2 && num > val2);
          lower1 = subArr1.find(num => num > root1 && num < val1);
          lower2 = subArr2.find(num => num > root2 && num < val2);
        } else {
          higher1 = subArr1.find(num => num < root1 && num > val1);
          higher2 = subArr2.find(num => num < root2 && num > val2);
          lower1 = subArr1.find(num => num < root1 && num < val1);
          lower2 = subArr2.find(num => num < root2 && num < val2);
        }
        if (higher1 !== higher2 || lower1 !== lower2) {
          return (same = false);
        } else {
          subArr1.splice(subArr1.indexOf(higher1), 1);
          subArr1.splice(subArr1.indexOf(lower1), 1);
          subArr2.splice(subArr2.indexOf(higher2), 1);
          subArr2.splice(subArr2.indexOf(lower2), 1);
          checkTree(higher1, subArr1, higher2, subArr2);
          checkTree(lower1, subArr1, lower2, subArr2);
        }
      }
    }
    checkTree(root1, arr1.slice(1), root2, arr2.slice(1));
    return same;
  }
}
