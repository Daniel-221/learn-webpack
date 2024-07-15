// 前端常考编程题
// https://github.com/hovinghuang/fe-agorithm-interview/tree/main/src

//无重复字符的最长子串
//输入: s = "abcabcbb"
// 输出: 3 
/**
 * @param {string} s
 * @return {number}
 */
// 双指针+哈希表
// tag review
var lengthOfLongestSubstring = function (s) {

  const sLen = s.length
  const charMap = new Map()
  let maxLen = 0
  // 右指针右移 直到出现重复字符 左指针右移到没有重复字符
  for (let l = 0, r = 0; r < sLen; r++) {
    // 右字符加入map
    if (charMap.get(s[r])) {
      charMap.set(s[r], charMap.get(s[r]) + 1)
    } else {
      charMap.set(s[r], 1)
    }

    while (charMap.get(s[r]) > 1) {
      charMap.set(s[l], charMap.get(s[l]) - 1)
      l++
    }
    // console.log(charMap)
    maxLen = Math.max(maxLen, r - l + 1)
  }
  return maxLen
};


//reduce
var lengthOfLongestSubstring2 = function (s) {
  let maxLen = 0
  s.split('').reduce((total, char, index) => {
    const i = total.indexOf(char)
    if (i !== -1) {
      total = total.substring(i + 1)
    }
    total = total + char
    maxLen = Math.max(maxLen, total.length)
    return total
  }, '')
  return maxLen
}


//合并两个有序的数组
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// tag 考过
var merge = function (nums1, m, nums2, n) {
  const len = m + n
  let mIndex = m - 1, nIndex = n - 1, index = len - 1
  while (mIndex >= 0 || nIndex >= 0) {
    if ((nums1?.[mIndex] ?? -Infinity) >= (nums2?.[nIndex] ?? -Infinity)) {
      nums1[index--] = nums1[mIndex--]
    } else {
      nums1[index--] = nums2[nIndex--]
    }
  }
};

//给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// tag 考过
var addStrings = function (num1, num2) {
  let index1 = num1.length - 1, index2 = num2.length - 1
  const res = []
  let plus = 0
  while (index1 >= 0 || index2 >= 0) {
    const added = Number(num1?.[index1--] ?? 0) + Number(num2?.[index2--] ?? 0) + plus
    plus = Math.floor(added / 10)
    res.unshift(added % 10)
  }
  if (plus) {
    res.unshift(plus)
  }
  return res.join('')
};

// 给你两个 版本号字符串 version1 和 version2 ，请你比较它们。版本号由被点 '.' 分开的修订号组成。修订号的值 是它 转换为整数 并忽略前导零。
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  const arr1 = version1.split('.'), arr2 = version2.split('.')
  let i = 0, j = 0
  let res = 0
  while (i < arr1.length || j < arr2.length) {
    const v1 = Number(arr1?.[i] ?? 0), v2 = Number(arr2?.[j] ?? 0)
    if (v1 > v2) {
      res = 1
      break
    } else if (v1 < v2) {
      res = -1
      break
    }
    i++
    j++
  }
  return res
};


// 两数之和
//给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// n方的复杂度
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    let index = nums.lastIndexOf(target - nums[i])
    if (index !== -1 && index !== i) {
      return [i, index]
    }
  }
  return []
};

//O（n）借助哈希表
// tag review
// 
var twoSum2 = function (nums, target) {
  const hash = new Map()
  for (let i = 0; i < nums.length; i++) {
    const theNum = target - nums[i]
    const theIndex = hash.get(theNum)
    if (theIndex !== undefined && theIndex !== i) {
      return [i, theIndex]
    }
    hash.set(nums[i], i)
  }
  return []
};

//假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

// 1.DFS模拟
// 2.动态规划
// tag review
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  // 0~n-1   dp[i]表示从第i阶到n阶的方案数
  const dp = new Array(n + 1).fill(0)
  dp[n] = 1
  for (let i = n - 1; i >= 0; i--) {
    dp[i] = (dp?.[i + 1] ?? 0) + (dp?.[i + 2] ?? 0)
  }
  console.log(dp)
  return dp[0]
};

// 两个动态规划数组的定义不一样
/**
 * 解法三：动态规划
 * 思路：
 * 时间复杂度：O(n)
 * 空间复杂度：
 */
function climbStairsRef(n: number): number {
  const dp = new Array(n + 1)
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
};


// 三数之和
// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。
// 这个题看起来是两数之和多了一层 但还有一个点就是要输出所有三元组 且不可重复
// 对于上面两数之和 因为不要求所有结果，题目保证只有一个 所以很方便地建立了index-value的map来简化复杂度
// 对于该题 不重复用排序来规避 然后自然就有了两数之和用双指针的处理
// 排序后还需要跳过重复元素
// tag review



// 输入：nums = [-1,0,1,2,-1,-4]
// [-4,-1,-1,0,1,2]
// 输出：[[-1,-1,2],[-1,0,1]]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  // console.log(nums)
  const res = []
  for (let i = 0; i < nums.length; i++) {
    // 跳过重复元素
    if (nums[i] === nums?.[i - 1]) {
      continue;
    }
    const target = 0 - nums[i]
    // 转为两数之和
    let j = i + 1, k = nums.length - 1
    while (j < k) {
      // jk也需跳过重复元素
      // (j > i + 1 j和i可以重复 理解不了debug的时候发现也行

      // 我又写了个while⬇️ 没必要 外面有while了
      // if (j > i + 1 && nums[j] === nums?.[j - 1]) {
      //   while (nums[j] === nums?.[j - 1]) {
      //     j++
      //   }
      //   continue;
      // }

      // if (nums[k] === nums?.[k + 1]) {
      //   while (nums[k] === nums?.[k + 1]) {
      //     k--
      //   }
      //   continue;
      // }

      if (j > i + 1 && nums[j] == nums[j - 1]) {
        j++
        continue
      }
      if (nums[k] === nums[k + 1]) {
        k--
        continue
      }

      const sum = nums[j] + nums[k]
      if (sum === target) {
        res.push([nums[i], nums[j], nums[k]])
        j++;
        k--;
      } else if (sum > target) {
        k--
      } else {
        j++
      }
    }
  }
  return res
};



// 买卖股票的最佳时机

// 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
// 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
// 输入：[7,1,5,3,6,4]
// 输出：5
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let max = 0
  let pastMin = Infinity
  for (let i = 0; i < prices.length; i++) {
    max = Math.max(max, prices[i] - pastMin, max)
    pastMin = Math.min(prices[i], pastMin)
  }
  return max
};


// 升序排序数组
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 快排
// 把左右数组切出来 这个好记 但是消耗额外的栈内存 
var sortArray = function (nums) {
  function quick(arr) {
    if (arr.length > 1) {
      const pivot = Math.floor((arr.length) / 2)
      const pivotV = arr[pivot]

      const left = []
      const right = []

      arr.forEach((item, index) => {
        if (index !== pivot) {
          if (item >= pivotV) {
            right.push(item)
          } else {
            left.push(item)
          }
        }
      })

      const sortedLeft = quick(left)
      const sortedRight = quick(right)
      return [...sortedLeft, pivotV, ...sortedRight]

    } else {
      return arr
    }
  }
  return quick(nums)
};

// 用双指针
// 不切数组 不占用额外的数组空间 当然递归还是会占用栈空间  转而使用数组下标标识
// tag review！
var sortArray2 = function (nums) {
  function quick(arr, start, end) {
    if (end > start) {
      // 选定第一个作为基准值
      const pivot = arr[start]
      let l = start + 1, r = end
      while (l < r) {
        // 左右向中间靠拢 跟pivot相比 左边找大的右边找小的 找到后交换
        while (arr[l] < pivot) {
          l++
        }
        while (arr[r] > pivot) {
          r--
        }
        // 找到后交换
        if (l < r) {
          swap(arr, l, r)
          l++; r--
        }
      }
      // while中止 无非l==r或者l<r  
      // l<r就是两个指针都跑超了，此时r的位置是一个小于pivot的值，正好拿来和数组第一个位置的pivot换，而下面操作是把l === r的情况也统一用此操作处理
      if (l === r && arr[r] > pivot) {
        r--
      }
      swap(arr, start, r)
      // 继续分治 注意数组下标
      quick(arr, start, r - 1)
      quick(arr, r + 1, end)
    }
  }
  // 交换数组元素
  function swap(arr, l, r) {
    [arr[l], arr[r]] = [arr[r], arr[l]]
  }
  quick(nums, 0, nums.length - 1)
  return nums
};


// 关于快排和归并
// 都是分治的思想 平均都是nlogn 相对比较高效的算法
// 快排每次确定的是pivot在最终数组中的位置，所以他层层递归到最后一层，就排wanl
// 归并先是往下层层拆分数组，再往上层层合并，多一步
// 稳定性：归并排序是一种稳定的排序算法，而快速排序则不是稳定的。在排序的过程中，相等的元素可能会因为分割操作而改变相对顺序。
// 应用场景：归并排序适合于数据量大且对稳定性有要求的场景。快速排序则因其高效和低空间消耗，在很多场景下被广泛使用，尤其是在数组排序中。


// 环形链表

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 纯套路 快慢指针
var hasCycle = function (head) {
  if (head) {
    let slow = head.next, fast = head.next?.next
    while (fast) {
      if (slow === fast) {
        return true
      }
      slow = slow.next
      fast = fast.next?.next
    }
    return false
  } else {
    return false
  }
}



//最长回文子串
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
/**
 * @param {string} s
 * @return {string}
 */
// tag review

// 中心扩展算法  我看就是暴力方法 分类讨论
var longestPalindrome = function (s) {
  let max = 0
  let res = ''
  for (let i = 0; i < s.length; i++) {
    //奇数型
    let l = i - 1, r = i + 1
    while (l >= 0 && r <= s.length && s[l] === s[r]) {
      l--;
      r++
    }
    let curLen = r - 1 - (l + 1) + 1
    if (curLen > max) {
      max = curLen
      res = s.substring(l + 1, r)
    }
    // 偶数型
    l = i, r = i + 1
    while (l >= 0 && r <= s.length && s[l] === s[r]) {
      l--;
      r++
    }

    curLen = r - 1 - (l + 1) + 1
    if (curLen > max) {
      max = curLen
      res = s.substring(l + 1, r)
    }

  }
  return res
};


//求根节点到叶子结点的数字之和
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// 输入：root = [1,2,3]
// 输出：25
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
  const numbers = []
  function dfs(r, prefix = '') {
    if (r) {
      const { val, left, right } = r
      const curPrefix = prefix + val
      left && dfs(left, curPrefix)
      right && dfs(right, curPrefix)
      if (!left && !right) {
        numbers.push(Number(curPrefix))
      }
    }
  }
  dfs(root)
  return numbers.reduce((sum, item) => {
    return sum + item
  }, 0)
};


// 二分搜索
// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  function biSearch(nums, target, l, r) {
    if (l <= r && l >= 0 && r < nums.length) {
      // 这个中点算对了就行 没别的
      const index = l + Math.floor((r - l) / 2)
      if (nums[index] === target) {
        return index
      }
      else if (nums[index] >= target) {
        return biSearch(nums, target, l, index - 1)
      } else {
        return biSearch(nums, target, index + 1)
      }

    } else {
      return -1
    }
  }

  return biSearch(nums, target, 0, nums.length - 1)
};


//岛屿数量
// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
// 此外，你可以假设该网格的四条边均被水包围。
// 输入：grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// 输出：1


/**
 * @param {character[][]} grid
 * @return {number}
 */
// 大胆去做 时间复杂度：O(nm)  嵌套循环 至于里面的操作 其实 最终就是遍历整个矩阵 去过的再去 已经剪枝了
var numIslands = function (grid) {
  const yLen = grid.length, xLen = grid[0].length
  function markIslands(grid, [y, x]) {
    if (y < yLen && x < xLen && x >= 0 && y >= 0 && grid[y][x] === '1') {
      //标记
      // 直接在原数组标记 节省空间复杂度
      grid[y][x] = '2'
      markIslands(grid, [y + 1, x])
      markIslands(grid, [y, x + 1])
      markIslands(grid, [y - 1, x])
      markIslands(grid, [y, x - 1])
    }
  }
  let res = 0
  for (let j = 0; j < yLen; j++) {
    for (let i = 0; i < xLen; i++) {
      if (grid[j][i] === '1') {
        res++
        markIslands(grid, [j, i])
      }
    }
  }
  return res
};


// 括号生成
// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]
// tag review  难倒是不难，主要就是个思路 有时想不到  递归解决+左括号要>=右括号

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const res = []
  // 剩下的左右数量
  function recursion(leftNum, rightNum, curStr) {
    console.log(leftNum, rightNum, curStr)
    if (leftNum === 0 && rightNum === 0) {
      res.push(curStr)
    }
    // 左边剩的必右边少 可左可右
    if (leftNum < rightNum) {
      leftNum > 0 && recursion(leftNum - 1, rightNum, curStr + '(')
      rightNum > 0 && recursion(leftNum, rightNum - 1, curStr + ')')
    }
    // 左边剩的跟右边一样 只能加左括号！
    else if (leftNum === rightNum) {
      leftNum > 0 && recursion(leftNum - 1, rightNum, curStr + '(')
    }
  }
  recursion(n, n, '')
  return res
};



//合并两个有序链表
//将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let p1 = list1, p2 = list2
  let head = null, p = head
  while (p1 || p2) {
    // 这里 优先级老忘了
    // <= 的优先级高于 ??！必须得加上括号！！
    if ((p1?.val ?? Infinity) <= (p2?.val ?? Infinity)) {
      if (head) {
        p.next = p1
        p = p.next
      } else {
        head = p1
        p = head
      }
      p1 = p1.next
    } else {
      if (head) {
        p.next = p2
        p = p.next
      } else {
        head = p2
        p = head
      }
      p2 = p2.next
    }
  }
  return head
};

// 螺旋矩阵
// tag 考过 review
// 上下左右的加减关系 老是弄混了 比如想着是往下，往下那不减吗，应该是加！
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */

var spiralOrder = function (matrix) {
  const yLen = matrix.length
  const xLen = matrix[0].length
  const res = []
  // 螺旋矩阵问题 其实就是维护好这个边界 变成同心圆问题
  let l = 0, r = xLen - 1, t = 0, b = yLen - 1
  while (l <= r && t <= b) {
    console.log(l, r, t, b)
    for (let x = l; x <= r; x++) {
      res.push(matrix[t][x])
    }
    t++; //这个++ 之前写反了 注意
    //收缩边界后 检查是否继续
    if (b < t) { break; } //tag 这个逻辑 忘记写了
    for (let y = t; y <= b; y++) {
      res.push(matrix[y][r])
    }
    r--;
    if (l > r) { break }

    for (let x = r; x >= l; x--) {
      res.push(matrix[b][x])
    }
    b--;
    if (b < t) { break; }

    for (let y = b; y >= t; y--) {
      res.push(matrix[y][l])
    }
    l++;
    if (l > r) { break }
  }
  return res
};


//最长递增子序列
/**
 * @param {number[]} nums
 * @return {number}
 */

// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列

var lengthOfLIS = function (nums) {
  // dp[i]表示以i位置结尾的最长递增子序列之长度
  const dp = new Array(nums.length).fill(0)
  dp[0] = 1
  let maxVal = dp[0]
  for (let i = 1; i < nums.length; i++) {
    let dpVal = 1
    for (let k = 0; k < i; k++) {
      if (nums[k] < nums[i]) {
        dpVal = Math.max(dpVal, dp[k] + 1)
      }
    }
    dp[i] = dpVal
    maxVal = Math.max(maxVal, dp[i])
  }
  return maxVal
};