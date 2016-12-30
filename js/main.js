(function (root) {
  var localStorageKey = "lastUsedPokemonNumber";
  var qrElements = document.querySelectorAll(".pokemon");

  var addSelectedClassToPokemon = function (index, skipRemovingClass) {
    if (!skipRemovingClass) {
      for (var i = 0; i < qrElements.length; i++) {
        qrElements[i].classList.remove("selected");
      }
    }

    qrElements[index].classList.add("selected");
  };

  var getIndex = function (element) {
    return Array.prototype.indexOf.call(qrElements, element);
  };

  var supportsLocalStorage = function () {
    var testString = "testString";

    try {
      localStorage.setItem(testString, testString);
      localStorage.removeItem(testString);

      return true;
    } catch(e) {
      console.log("localStorage is not supported");
      return false;
    }
  };

  if (supportsLocalStorage()) {
    var lastUsedPokemonNumber = localStorage.getItem(localStorageKey);

    if (lastUsedPokemonNumber) {
      addSelectedClassToPokemon(Number(lastUsedPokemonNumber), true);
    }
  }

  document.querySelector(".pokemons").addEventListener("click", function (event) {
    if (event.target) {
      var element;
      var nodeName = event.target.nodeName;
      if (nodeName === "LI") {
        element = event.target;
      } else if (nodeName === "IMG") {
        element = event.target.parentNode;
      } else {
        return;
      }

      var elementIndex = getIndex(element);
      if (elementIndex !== -1) {
        localStorage.setItem(localStorageKey, elementIndex);

        addSelectedClassToPokemon(elementIndex);
      }
    }
  });
})(this);
