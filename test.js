const str = "abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababa"

var longestPalindrome = function(s) {
  /** 最长公共子串-动态规划 */
  // 反转s,求s与反转后的最长公共子串

  /** 判断是否为回文串 */
  function isPalindrome(s) {
      let i=0, j=s.length-1;
      while (i<j) {
          if (s[i] !== s[j]) return false;
          i++;
          j--;
      }

      return true;
  }

  /** 求最长公共子串 */
  function longestStr(s1, s2) {
      /** 动态规划 */
      // 状态: dp[i][j]代表s1[0,i), s2[0,j)的最长公共子串
      // 状态转移：如果s1[i-1] === s1[j-1] dp[i][j] = dp[i-1][j-1] + s1[i-1];
      //          如果不相等，则dp[i][j] = ''

      function selectLongest(s1, s2) {
          return s1.length > s2.length ? s1 : s2
      }

      const l1 = s1.length+1;
      const l2 = s2.length+1;
      const dp = new Array(l1).fill('').map(() => new Array(l2).fill(''));
      let max = '';
      for (let i=1; i<l1; i++) {
          for (let j=1; j<l2; j++) {
              if (s1[i-1] === s2[j-1]) {
                  dp[i][j] = dp[i-1][j-1] + s1[i-1];
                  if (isPalindrome(dp[i][j])) {
                      max = selectLongest(max, dp[i][j]);
                  }
              }
          }
      }

      return max;
  }

  function reverse(s) {
      return s.split('').reverse().join('')
  }

  const s2 = reverse(s);
  const res = longestStr(s, s2)
  return res

};

console.log(longestPalindrome(str))