const imagesArray = [];

for (let index = 1; index < 12; index++) {
  const element = `../assets/images/${index}.jpg`;
  imagesArray.push(`${element}${1}`);
}

console.log(imagesArray);

export default imagesArray;
