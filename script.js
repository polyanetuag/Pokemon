let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  //bloqueia o comportamento padrão do formulário(refresh da página)
  e.preventDefault();
  
  let urlForm = "https://pokeapi.co/api/v2/pokemon/";
  let name = document.getElementById("name");

  urlForm = urlForm + name.value;
  urlForm = urlForm.toLocaleLowerCase();

  let response = document.getElementById("content");
  let image = document.getElementById("imgPokemon");
  let html = "";

  fetch(urlForm)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      html = 'Nome: ' + firstCapital(data.name) + "<br>";
      html = html + 'Tipo: ' + firstCapital(data.types[0].type.name) + "<br>";
      response.innerHTML = html;

      //para as imagens do pokemon
      image.innerHTML = '<img src="' + data.sprites.front_default + '"><img src="' + data.sprites.back_default + '">';
      form.reset();
    })
    .catch(function (error) {
      if(error == 'SyntaxError: Unexpected token N in JSON at position 0'){
        html = 'Não existe esse pokemon';
      } else {
        html = 'Erro ao buscar o pokemon';
      }
      response.innerHTML = html;
    });
});

function firstCapital (val) {
  return val[0].toUpperCase() + val.substr(1);
}


