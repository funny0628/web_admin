module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/airbnb", "plugin:prettier/recommended"],
  rules: {
    radix: "off",
    "no-console": "off", //启用console
    "no-debugger": "off", //启用dubugger
    "func-names": "off", //使用命名式函数
    "no-underscore-dangle": "off", //标识符中有悬空下划线
    "no-unused-expressions": "off", //可以出现未使用过的表达式
    "prefer-spread": "off", //可以使用apply
    "no-plusplus": "off", //可以使用++ --
    "no-nested-ternary": "off", //三元表达式可以嵌套
    "import/prefer-default-export": "off",
    "linebreak-style": "off",
    "import/extensions": "off", // 取消对文件扩展名的验证
    "no-param-reassign": "off", //允许对function参数重新赋值，这里是因为vux里面的原因
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false
      }
    ], //因为iview原因所以标签不适用检测
    "arrow-parens": ["error", "as-needed"], // 箭头函数的参数可以不使用圆括号
    // 'comma-dangle': ['error', 'never'], // 不允许末尾逗号
    "global-require": "off", // 取消对require的验证，使得可以使用require来加载图片的相对路径
    "import/no-unresolved": "off", // 取消自动解析路径，以此开启alias的别名路径设置
    // "max-len": "off", // 取消行的最大长度的验证，使SVG不用重新调整格式
    // 'generator-star-spacing': 'off', // allow async-await
    // 'quotes': 'off',
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ],
    camelcase: "off",
    "vue/no-use-v-if-with-v-for": "off",
    "import/no-cycle": "off",
    "no-return-await": "off",
    "array-callback-return": "off",
    "no-restricted-syntax": "off",
    "guard-for-in": "off",
    "no-unused-vars": "off",
    "consistent-return": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
