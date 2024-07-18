// 找不到模块“./assets/poi-pic.png”或其相应的类型声明
// import image from './assets/poi-pic.png'

// 这通常是因为 TypeScript 默认不知道如何处理非代码资源，如图片、样式表等。为了解决这个问题，你需要告诉 TypeScript 如何理解这些导入的资源。

//在项目的根目录或任何包含在 tsconfig.json 的 include 字段中的目录下，创建一个类型声明文件，如 custom.d.ts。

declare module '*.png' {
  const value: any;
  export = value;
}