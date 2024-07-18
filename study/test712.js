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
