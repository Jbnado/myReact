# My React

### My react is my study to understand how react works.

So I'm using `Typescript` as my language (but you can choose it), using `Parcel` as web bundler and I will install all the packages and libraries that we will need with `Yarn`.

If you don't know Yarn yet, so let me try to explain this: Yarn is a package manager of JavaScript codes, so it allows us to use all the libraries that are available around the world and I can share my libraries too. Also using yarn we will be able to write some scripts to quickly use parcel build or whatever.

Typescript is a typed programming language, is a superset of JavaScript, recommended for large and scallable applications/software.

Parcel is a web bundler that will build our application fast as it can!

So I installed these as developer dependencies using Yarn.

```npm
yarn add typescript parcel -D
```

Okay, now that we have typescript let's create a tsconfig. The tsconfig indicates the root of our project and indicates that it's a Typescript project. It also specifies the compiler options required to compile the project.

Knowing this, let's say that we have some jsx and it's react using it and let's turn off strictness.

In `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "jsx": "react",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": false,
    "skipLibCheck": true
  }
}
```

I will need more two files: `index.html` and `index.tsx`.

In html no magic, just it for now:

```html
<script src="index.tsx"></script>
```

Ok, now let's serve this project so:

```yarn
yarn parcel index.html
```

Open it in your localhost and we will have a blank page!
![](https://github.com/Jbnado/screenshotsMyReact/blob/main/Blank_Page.png)

Now in index.tsx we can create some jsx lines:

```tsx
const div = <div>Hello World</div>;
```
