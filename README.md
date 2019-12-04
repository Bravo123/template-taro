[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### taro-template

bravo-fe-cli 下基于 taro 基础模版(TypeScript, Sass)

```
taro create --name [页面名称]  // 快速创建页面模版
```

> 首次使用 commitizen 需要执行以下命令

```
npm install commitizen -g

commitizen init cz-conventional-changelog --save-dev --save-exact
```

基础模版持续完善中 🏀🏀🏀

- 配置了`husky` `prettier` `commitizen` 来保证代码的规范统一
- `global.ts` 提供一个全局变量来存放数据，较`Redux`更轻巧
- 封装了统一的 request 请求
