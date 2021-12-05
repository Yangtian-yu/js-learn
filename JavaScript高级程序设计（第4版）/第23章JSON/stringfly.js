let book = {
  title: "Professional JavaScript",
  authors: ["Nicholas C. Zakas", "Matt Frisbie"],
  edition: 4,
  year: 2017,
};
let jsonText = JSON.stringify(book);
console.log(jsonText);
let bookCopy = JSON.parse(jsonText);
console.log(bookCopy);

// 过滤
let newjsonText = JSON.stringify(book, ["title", "edition"]);
console.log(newjsonText);
let jsonText1 = JSON.stringify(book, (key, value) => {
  switch (key) {
    case "authors":
      return value.join(",");
    case "year":
      return 5000;
    case "edition":
      return undefined;
    default:
      return value;
  }
});
console.log(jsonText1);

// 缩进
let jsonText2 = JSON.stringify(book, null, 4);
console.log(jsonText2);
let jsonText3 = JSON.stringify(book, null, "---");
console.log(jsonText3);

// toJSON()
let book2 = {
  title: "Professional JavaScript",
  authors: ["Nicholas C. Zakas", "Matt Frisbie"],
  edition: 4,
  year: 2017,
  toJSON: function () {
    return this.title;
  },
};

let jsonTex4 = JSON.stringify(book2);
console.log(jsonTex4);
