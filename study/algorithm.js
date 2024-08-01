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


// 全排列
//给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 自己写的 递归 额外数组存储
var permute = function (nums) {
  const res = []
  function loop(ns, curRes) {
    console.log(ns, curRes)
    if (ns.length === 0) {
      res.push(curRes.slice())
    } else {
      for (let i = 0; i < ns.length; i++) {
        curRes.push(ns[i])
        const newNums = ns.slice(0)
        newNums.splice(i, 1)
        loop(newNums, curRes)
        curRes.pop()
      }
    }
  }
  loop(nums, [])
  return res
};


// 优化空间复杂度
// 用nums原空间 左边是排好的，右边是待排的  123｜456   
// 可视为全排列问题的一个公用思路
// tag review
var permute2 = function (nums) {
  const res = []
  // recursion完成对index位置 用右侧数字进行所有尝试
  function recursion(nums, index) {
    if (index === nums.length - 1) {
      res.push(nums.slice())
      return
    }
    for (let j = index; j < nums.length; j++) {
      swap(nums, index, j)
      recursion(nums, index + 1)
      swap(nums, index, j)
    }
  }
  function swap(nums, a, b) {
    [nums[a], nums[b]] = [nums[b], nums[a]]
  }
  recursion(nums, 0)
  return res
};



// 最大连续子数组的和
// tag review 直接套公式
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length === 1) {
    return nums[0]
  }
  else {//动态规划 dp[i]表示以i为 终点 的最大连续数组和

    const dp = []
    dp[0] = nums[0]
    let max = dp[0]
    for (let i = 1; i < nums.length; i++) {
      dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
      max = Math.max(max, dp[i])
    }
    return max
  }
};
// 空间优化 很简单
/**
 * 解法三：动态规划空间优化
 * 思路：
 *   我们注意到方法一的动态规划在状态转移的时候只用到了i一1的信息，没有使用整个数组的信息。
 *   我们可以使用两个变量迭代来代替数组。
 *   状态转移的时候更新变量y,该轮循环结束的再更新x为y即可做到每次迭代都是上一轮的dp。
 *   遍历数组，每次只要比较取最大值即可。
 * 时间复杂度：O(n)，遍历一遍。
 * 空间复杂度：O(1)，常数变量
 */
function maxSubArray(nums: number[]): number {
  const len = nums.length
  if (len === 0) return 0

  let x = nums[0]
  let y = 0
  let maxSum = x

  for (let i = 1; i < len; i++) {
    y = Math.max(nums[i], x + nums[i])
    maxSum = Math.max(maxSum, y)
    x = y
  }

  return maxSum
};



// 二叉树层序遍历
// 自己写的 比较啰嗦
var levelOrder = function (root) {
  if (root) {
    let queue = [];
    queue.push(root);
    const res = [];
    while (queue.length > 0) {
      const newQueue = [];
      const r = []
      for (let i = 0; i < queue.length; i++) {
        const cur = queue[i];
        const { left, right, val } = cur;
        r.push(val);
        if (left) newQueue.push(left);
        if (right) newQueue.push(right);
      }
      res.push(r)
      queue = newQueue; // 更新队列为下一层的节点  
    }
    return res;
  } else {
    return [];
  }
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
// 不顺利 改来改去
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
// tag review  状态转移方程记一下

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

//94. 二叉树的中序遍历

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归
var inorderTraversal = function (root) {
  const res = []

  function dfs(node) {
    if (node) {
      const { left, val, right } = node
      left && dfs(left)
      res.push(val)
      right.push(right)
    }
  }
  dfs(root)
  return res
};
// 非递归的
// var inorderTraversal2 = function (root) {
//   const res = []

//     const queue = []
//     queue.unshift(root)
//     while(queue.length){

//     }
// };

// 二叉树的最大深度
// 用的非递归

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) {
    return 0
  }
  let queue = []
  let res = 0
  queue.push(root)
  while (queue.length) {
    res++
    const newQueue = []
    for (let i = 0; i < queue.length; i++) {
      const { left, right } = queue[i]
      left && newQueue.push(left)
      right && newQueue.push(right)
    }
    queue = newQueue
  }
  return res
};


//岛屿的最大面积
/**
 * @param {number[][]} grid
 * @return {number}
 */

// 输入：grid = [
//   [0,0,1,0,0,0,0,1,0,0,0,0,0],
//   [0,0,0,0,0,0,0,1,1,1,0,0,0],
//   [0,1,1,0,1,0,0,0,0,0,0,0,0],
//   [0,1,0,0,1,1,0,0,1,0,1,0,0],
//   [0,1,0,0,1,1,0,0,1,1,1,0,0],
//   [0,0,0,0,0,0,0,0,0,0,1,0,0],
//   [0,0,0,0,0,0,0,1,1,1,0,0,0],
//   [0,0,0,0,0,0,0,1,1,0,0,0,0]]
// 输出：6
// DFS&标记
var maxAreaOfIsland = function (grid) {
  const yLen = grid.length, xLen = grid[0].length
  function markLand(grid, [y, x]) {
    if (x >= 0 && y >= 0 && x < xLen && y < yLen && grid[y][x] === 1) {
      //来过标记为2
      grid[y][x] = 2
      return (1 + markLand(grid, [y + 1, x])
        + markLand(grid, [y, x + 1])
        + markLand(grid, [y - 1, x])
        + markLand(grid, [y, x - 1]))
    } else {
      return 0
    }
  }

  let res = 0
  for (let j = 0; j < yLen; j++) {
    for (let i = 0; i < xLen; i++) {
      if (grid[j][i] === 1) {
        const area = markLand(grid, [j, i])
        res = Math.max(res, area)
      }
    }
  }
  return res
};



//LRU缓存
// 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

// tag review
// 不顺利

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cache = new Map()
  this.capacity = capacity
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const value = this.cache.get(key)
  if (value !== undefined) {
    // get后删掉注意
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  } else {
    return -1
  }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (!this.cache.has(key) && this.cache.size === this.capacity) {
    // tip 迭代器用法 注意
    this.cache.delete(this.cache.keys().next().value)
  }
  this.cache.delete(key)
  this.cache.set(key, value)
  console.log(key, value, this.cache)
};


// 零钱兑换
// 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
// 你可以认为每种硬币的数量是无限的。

// 输入：coins = [1, 2, 5], amount = 11
// 输出：3 
// 解释：11 = 5 + 5 + 1
// tag 思路
// 顺利

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // dp[i]表示i元最少硬币个数
  const dp = new Array(amount + 1).fill(-1)
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    let minCost = Infinity
    coins.forEach(coin => {
      const index = i - coin
      if (index >= 0 && dp[index] !== -1) {
        minCost = Math.min(minCost, dp[index] + 1)
      }
    })
    dp[i] = minCost === Infinity ? -1 : minCost
  }
  return dp[amount]
};


// 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

// tag 思路 快慢指针
// 顺利 一遍过
// 三年前 用map存的index到node的映射 好像也可以
var removeNthFromEnd = function (head, n) {
  if (head) {
    let slow = head
    let prev = null
    let fast = slow
    for (let i = 0; i < n; i++) {
      fast = fast?.next
    }
    while (fast) {
      fast = fast.next
      prev = slow
      slow = slow.next
    }
    console.log(prev, slow)

    // 在对链表进行操作时，一种常用的技巧是添加一个哑节点（dummy node），它的 next 指针指向链表的头节点。这样一来，我们就不需要对头节点进行特殊的判断了。
    // 这里还有这种操作 可以借鉴

    if (slow === head) {
      const newHead = slow.next
      slow.next = null
      return newHead
    } else {
      prev.next = slow.next
      slow.next = null
      return head
    }
  } else {
    return head
  }
};


//LCR 126. 斐波那契数
/**
 * @param {number} n
 * @return {number}
 */
// 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
// F(0) = 0，F(1) = 1
// F(n) = F(n - 1) + F(n - 2)，其中 n > 1

// 递归 超时间 缓存也没用
var fib = function (n) {
  const map = new Map()
  function fibFunc(n) {
    if (n < 2) {
      return n
    } else {
      if (map.has(n)) {
        return map.get(n)
      }
      let res = fib(n - 1) + fib(n - 2)
      map.set(n, res)
      return res
    }
  }
  const res = fibFunc(n)
  console.log(map)
  return res
};
// 动态规划 也不是要用数组
// tag review
var fib2 = function (n) {
  if (n < 2) {
    return n
  }
  let L1 = 1, L2 = 0
  let cur = L1 + L2
  for (let i = 2; i <= n; i++) {
    // 题目要求的 他要取模 而且是每一步都取 不然最终会超精度 直接用最后结果取模会不准确
    cur = (L1 + L2) % 1000000007
    L2 = L1
    L1 = cur
  }
  return cur
};

//翻转二叉树

var mirrorTree = function (root) {
  function dfs(node) {
    if (node) {
      [node.left, node.right] = [node.right, node.left]
      node.left && dfs(node.left)
      node.right && dfs(node.right)
      return node
    } else {
      return node
    }
  }
  return dfs(root)
};

//LCR 008. 长度最小的子数组
// 给定一个含有 n 个正整数的数组和一个正整数 target 。
// 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
// 输入：target = 7, nums = [2,3,1,2,4,3]
// [2, 5, 6, 8, 12, 15]
// 输出：2



// 方法一：前缀和 + 二分查找
// tag review 这个题很容易想到暴力两层循环On方的方法，进一步可以用二分降低时间复杂度

var minSubArrayLen = function (target, nums) {
  //前缀和
  // tag 前缀和 实际长度为len+1 通过在前面加一位 避免麻烦
  const sums = [0]
  for (let i = 0; i < nums.length; i++) {
    sums[i + 1] = (sums[i]) + nums[i]
  }
  let res = Infinity
  console.log('sums', sums)
  for (let i = 0; i < sums.length; i++) {
    //sums【ℹ】作为起点 二分查找终点
    const t = target + sums[i]
    const index = findJustLarger(sums, t)
    console.log('findJustLarger', t, index)
    if (index !== -1) {
      console.log('refresh res', index - i)
      res = Math.min(res, index - i)
    }
  }
  return res === Infinity ? 0 : res
};

// 二分查找 刚好大于等于
// tag review

function findJustLarger(arr, target) {
  const len = arr.length
  // 通过更新res找到justlager
  let res = -1

  let left = 0, right = len - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const midValue = arr[mid]
    if (midValue >= target) {
      // 更新结果 但不急着返回 接着往左找
      res = mid
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return res
}


// 放法二 滑动窗口 两个指针startend从左到右 小于目标值end右移 大于目标值记录该值 并start右移
// tag 这更好
// 顺利
var minSubArrayLen = function (target, nums) {
  const len = nums.length
  // left [ xx   xx  right]
  //[子数组长度] = right-left 为了简便 初始值设为-1了
  let left = -1, right = -1
  let res = Infinity, curSum = 0

  while (right < len) {
    if (curSum >= target) {
      res = Math.min(res, right - left)
      left++
      curSum -= nums?.[left] ?? 0
    } else {
      right++
      curSum += nums[right]
    }
  }
  return res === Infinity ? 0 : res
}


// 实现二分查找 等于某值
function biSearch(arr, target, left, right) {
  console.log(left, right)
  if (left <= right) {
    // tag注意这里 老是忘了加left
    const pv = left + Math.floor((right - left) / 2)
    //   let mid = Math.floor((left+right)/2)  奥  可以这么算的么
    if (arr[pv] === target) {
      return pv
    } else if (arr[pv] > target) {
      return biSearch(arr, target, left, pv - 1)
    } else {
      return biSearch(arr, target, pv + 1, right)
    }
  } else {
    return -1
  }
}

// ｜。。。｜--。。。-

//接雨水
//给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
// 我的失败代码:
// var trap = function (height) {
//   let res = 0
//   let i = 0
//   while (i < height.length) {
//     const left = height[i]
//     let water = 0
//     let j = i + 1
//     let hasWater = false

//     for (j = i + 1; j < height.length; j++) {
//       const cur = height[j]
//       if (cur >= left) {
//         console.log(i, j, '   +   ', water)
//         res += water
//         hasWater = true
//         break;
//       } else {
//         water += left - cur
//       }
//     }
//     if (hasWater) {
//       i = j
//     } else {
//       i++
//     }
//   }
//   console.log(i, height.length)
//   return res
// };

// tag 就是个思路
// 某一位置存水量取决于左右的最大高度
// 遍历两边维护左右最大高度数组
// curWater = min(leftMax,rightMax) - height[i]


// 二叉树蛇形遍历
class Node {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}
const root = new Node(1)
const a = new Node(2)
const b = new Node(3)
const c = new Node(4)
const d = new Node(5)
root.left = a
root.right = b
b.left = c
b.right = d

function snakeTraverse(root) {
  if (root) {
    let queue = []
    const res = []
    queue.push(root)
    let flag = true
    while (queue.length > 0) {
      const newQueue = []
      const cur = []
      for (let i = 0; i < queue.length; i++) {
        const { val, left, right } = queue[i]
        cur.push(val)
        left && newQueue.push(left)
        right && newQueue.push(right)
      }
      if (!flag) {
        cur.reverse()
      }
      res.push(...cur)
      queue = newQueue
      flag = !flag
    }
    return res
  }

}

// 帕瓦多数列
// 第0项 ( P_0 ) = 0
// 第1项 ( P_1 ) = 1
// 从第2项开始，每一项都是前两项的和的两倍，即 ( P_n = 2P_{n-1} + P_{n-2} ) 对于 ( n \geq 2 )
function powado(n) {
  if (n < 2) {
    return n
  } else {
    let n2 = 0, n1 = 1
    let i = 2
    let cur = 0
    for (i = 2; i <= n; i++) {
      cur = 2 * n1 + n2
      n2 = n1
      n1 = cur
    }
    return cur
  }
}



// find-peak-element 找峰值元素
// tag review  二分 logn
function findPeakElement(arr) {
  let left = 0; right = arr.length - 1
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] > arr[mid + 1]) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
}


const first = () =>
  new Promise((resolve, reject) => {
    console.log(3)
    let p = new Promise((resolve, reject) => {
      console.log(7)
      setTimeout(() => {
        console.log(5)
        resolve(6)
      }, 0)
      resolve(1)
    })
    resolve(2)
    p.then((arg) => {
      console.log(arg)
    })
  })
first().then((arg) => {
  console.log(arg)
})
console.log(4)

// 3  7  4  1  2  5


//最长公共子串
// const str1 = "abcdef";
// const str2 = "zabcf";
// tag review
// 二维动态规划
// dp[i][j]表示以str1[i]和str2[j]结尾的最长公共子串长度
function findLongestCommonSubsting(str1, str2) {
  const len1 = str1.length, len2 = str2.length
  const dp = new Array(len1)
  let res = 0
  for (let i = 0; i < len1; i++) {
    dp[i] = new Array(len2).fill(0)
  }
  for (let i = 0; i < len1; i++) {
    dp[i][0] = str1[i] === str2[0] ? 1 : 0
    res = Math.max(res, dp[i][0])
  }
  for (let j = 0; j < len2; j++) {
    dp[0][j] = str2[j] === str1[0] ? 1 : 0
    res = Math.max(res, dp[0][j])
  }

  for (let i = 1; i < len1; i++) {
    for (let j = 1; j < len2; j++) {
      dp[i][j] = str1[i] === str2[j] ? dp[i - 1][j - 1] + 1 : 0
      res = Math.max(res, dp[i][j])
    }
  }
  console.log(dp)
  return res
}
