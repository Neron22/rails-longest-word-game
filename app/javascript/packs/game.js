const letters = document.querySelectorAll(".letter");
const arrOfLetter = []
const link = document.querySelector("#link")
const effacer = document.getElementById("effacer")


// tableau des lettres en string
letters.forEach(element => {
  arrOfLetter.push(element.innerText);
});

// cacher la lettre quand on clique dessus
letters.forEach(element => {
  element.addEventListener("click", (e) => {
    link.value += e.currentTarget.innerText;
    e.currentTarget.style.visibility = "hidden"
  });
});

// afficher et cacher les lettres selon l'input
link.addEventListener("keyup", (e) => {
  letters.forEach(element => {
    if (element.innerText === e.key.toUpperCase()) {
      element.style.visibility = "hidden"
    }
  })

  // empecher d'ecrire d'autre lettres de celle proposer
  const keyCodeTouch = [8, 13, 16, 17, 18, 19, 20, 27, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46]
  // arr des lettres utilisées
  const lettersToRemoveArr = link.value.toUpperCase().split("")
  // make a Set to hold values from lettersToRemove
  const lettersToRemoveSet = new Set(lettersToRemoveArr);
  // use filter() method
  // to filter only those elements
  // that need not to be deleted from the array
  const newArr = arrOfLetter.filter((letter) => {
    // return those elements not in the namesToDeleteSet
    return !lettersToRemoveSet.has(letter);
  });
  // essayer de ne pouvoir utiliser qu'une seule fois la lettre
  // J'ai un probleme lie au fait que ma premiere condition est moins restrictive que la derniere du coup ça passe tout le temps
  if (!arrOfLetter.includes(e.key.toUpperCase()) && (!keyCodeTouch.includes(e.keyCode)) && (!newArr.includes(e.key.toUpperCase()))) {
    const correction = link.value.slice(0, -1)
    e.srcElement.value = correction
  }

  // faire effacer le contenu avec la touche backsapce
  if (e.keyCode == 8) {
    const arrOfLinkValue = link.value.split('')
    const arrayDifference = arrOfLetter.filter(x => arrOfLinkValue.indexOf(x) === -1);
    // faire réapparaitre les lettres lorsqu'elle sont effacer
    letters.forEach(element => {
      // recupere la seule lettre en majuscule du innerHTML (pour comparer avec les lettres restantes)
      const majWithWhite = element.innerHTML.replace(/[a-z]/g, '');
      const maj = majWithWhite.replace(/\s/g, '')
      if (arrayDifference.includes(maj)) {
        element.style.visibility = "visible"
      }
    })
  }
  // effacer avec le bouton effacer
})

effacer.addEventListener("click", () => {
  link.value = ""
  letters.forEach(element => {
  element.style.visibility = "visible"
  })
})
