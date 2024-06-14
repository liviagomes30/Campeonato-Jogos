var usuarios = [
  {
    nome: "Mary",
    email: "mary@gmail.com",
    celular: "(18)996XX-XXXX",
    rg: "XXXXXXXXX",
    cpf: "505.090.428-56",
    data: "2004-01-29",
    genero: "Feminino",
    escolaridade: "Ensino médio completo",
  },
  {
    nome: "Livia",
    email: "livia@gmail.com",
    celular: "(18)998XX-XXXX",
    rg: "XXXXXXXXX",
    cpf: "312.789.146-77",
    data: "2004-02-14",
    genero: "Feminino",
    escolaridade: "Ensino médio completo",
  },
  {
    nome: "Charlotte",
    email: "charlie@gmail.com",
    celular: "(18)997XX-XXXX",
    rg: "XXXXXXXXX",
    cpf: "794.645.722-64",
    data: "2010-01-06",
    genero: "Feminino",
    escolaridade: "Ensino superior completo",
  },
  {
    nome: "Pyke",
    email: "pyke@gmail.com",
    celular: "(18)997XX-XXXX",
    rg: "XXXXXXXXX",
    cpf: "541.653.755-88",
    data: "2016-07-1",
    genero: "Masculino",
    escolaridade: "Ensino superior completo",
  },
];
var tabela = document.getElementById("exibirDados");

var buttonExibir = document.getElementById("button-exibir");
buttonExibir.addEventListener(
  "click",
  function () {
    if (buttonExibir.textContent == "Exibir dados") {
      event.preventDefault();
      carregarTabela(usuarios);
      tabela.style.opacity = 1;
      buttonExibir.textContent = "Ocultar dados";
    } else {
      event.preventDefault();
      tabela.innerHTML = "";
      tabela.style.opacity = 0;
      buttonExibir.textContent = "Exibir dados";
    }
  },
  false
);

const modalOk2 = document.getElementById("dialog-ok2");
const okButton2 = document.getElementById("bt-ok2");
const continueButton = document.getElementById("continue-button");
const modalEmpty  = document.getElementById("dialog-empty");
const emptyButton = document.getElementById("bt-empty");

const bt_close_excluir = document.getElementById("bt-excluir");
const bt_excluir_select = document.getElementById("button-excluir-selecionados");
const modalExcluir = document.getElementById("dialog-excluir");

bt_excluir_select.addEventListener("click",excluirSelecionados,false);

bt_close_excluir.addEventListener("click",function()
{
  modalExcluir.close();
},false);

emptyButton.addEventListener("click",function()
{
  modalEmpty.close();
},false);

function carregarTabela(dados) {
  let html = `<tr> <th><input type="checkbox" id="ckTodos" onclick="selecionarTodos()"></th>
      <th> Nome </th> <th >E-mail </th> <th> Celular </th>
      <th> CPF </th><th> Ação </th> 
  </tr>`;
  //percorrer o vetor usando for each
  for (let usuario of dados) {
    html += `
      <tr> 
          <td><input type="checkbox" data-id="${usuario.cpf}"></td> 
          <td>${usuario.nome}</td>
          <td>${usuario.email}</td>
          <td>${usuario.celular}</td>
          <td>${usuario.cpf}</td>
          <td><a class="btnExcluir" onclick="excluirItem('${usuario.cpf}')">&#9746;</a></td>
      </tr>
    `;
  }
  tabela.innerHTML = html;
  event.preventDefault();
  tabela.style.opacity = 1;
}

//exclusões

function excluirItem(idDel) {
  let listaAux = [];
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].cpf !== idDel) {
      listaAux.push(usuarios[i]);
    }
  }
  usuarios = listaAux;
  carregarTabela(usuarios);
}

function selecionarTodos(){
  let listaCheckbox = document.querySelectorAll('[data-id]');
  let ckCabec = document.querySelector('#ckTodos');
  for (let ck of listaCheckbox)
     ck.checked = ckCabec.checked; 

}

function excluirSelecionados() {
  // pegar todos os checkbox da tabela
  let listaCheckbox = document.querySelectorAll('[data-id]');
  let algumSelecionado = false;

  if (listaCheckbox.length > 0) { // verificando se a lista está vazia
    for (let ck of listaCheckbox) {
      if (ck.checked) {
        excluirItem(ck.dataset.id);
        algumSelecionado = true;
      }
    }
    let ckCabec = document.querySelector('#ckTodos');
    if (ckCabec) {
      ckCabec.checked = false;
    }
  }
  if (!algumSelecionado) {
    modalExcluir.showModal();
    event.preventDefault();
  }
}



continueButton.addEventListener(
  "click",
  function () {
    var Vnome = document.getElementById("firstname").value;
    var Vemail = document.getElementById("email").value;
    var Vcelular = document.getElementById("number").value;
    var Vrg = document.getElementById("rg").value;
    var Vcpf = document.getElementById("cpf").value;
    var Vdata = document.getElementById("data_nasc").value;
    var Vgenero = document.getElementById("genero").value;
    var Vescolaridade = document.getElementById("escolaridade").value;
    if (
      Vnome == "" ||
      Vemail == "" ||
      Vcelular == "" ||
      Vrg == "" ||
      Vcpf == "" ||
      Vdata == "" ||
      Vgenero == "" ||
      Vescolaridade == ""
    ) {
      modalEmpty.showModal();
    } else {
      modalOk2.showModal();
      event.preventDefault();

      okButton2.onclick = function (event) {
        modalOk2.close();
        event.preventDefault();
      };
      usuarios.push({
        nome: Vnome,
        email: Vemail,
        celular: Vcelular,
        rg: Vrg,
        cpf: Vcpf,
        data: Vdata,
        genero: Vgenero,
        escolaridade: Vescolaridade,
      });
      carregarTabela(usuarios);
      let form = document.getElementById("formulario").reset();
    }
  },
  false
);

/* VALIDAÇÕS */

function validarNome(nome) {
  var nomes = nome.trim().split(" ");
  var nomeValido = true;

  // Verificar se há mais de uma palavra
  if (nomes.length <= 1) {
    nomeValido = false;
  }

  // Verificar cada palavra individualmente
  nomes.forEach(function (nomeItem) {
    if (nomeItem.length < 2) {
      nomeValido = false;
    }
  });

  if (!nomeValido) {
    document.getElementById("firstname-error").style.display = "block";
    console.log("Nome inválido");
  } else {
    document.getElementById("firstname-error").style.display = "none";
  }
}

function validarSenhas() {
  var senha = document.getElementById("password").value;
  var confirmarSenha = document.getElementById("con-password").value;
  var regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#&^~><.,=£¢+-/])[A-Za-z\d@$!%*?&#&^~><.,=£¢+-/]{8,}$/;

  if (senha !== confirmarSenha) {
    document.getElementById("senha-error").style.display = "block";
  } else if (
    regex.test(senha) == false ||
    (senha == confirmarSenha && regex.test(senha) == false)
  ) {
    document.getElementById("senha-error").style.display = "none";
    document.getElementById("senha-invalid").style.display = "block";
  } else {
    document.getElementById("senha-error").style.display = "none";
    document.getElementById("senha-invalid").style.display = "none";
  }
}

function validarRg(value) {
  document.getElementById("rg-error").style.display = "none";
  let rg = value;
  var valido = false;
  rg = rg.replace(/\./g, "");
  rg = rg.replace("-", "");

  if (/^(?=.*\d)[A-Za-z0-9]{7,11}$/g.test(rg)) {
    valido = true;
  }
  if (!valido) {
    document.getElementById("rg-error").style.display = "block";
  } else {
    document.getElementById("rg-error").style.display = "none";
  }
}

function validarCPF(Objcpf) {
  var cpf = Objcpf.value;
  cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) {
    document.getElementById("cpf-error").style.display = "block";
    return false;
  }

  var soma = 0;
  var resto;

  for (var i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) {
    resto = 0;
  }

  if (resto != parseInt(cpf.substring(9, 10))) {
    document.getElementById("cpf-error").style.display = "block";
    return false;
  }

  soma = 0;

  for (var i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) {
    resto = 0;
  }

  if (resto != parseInt(cpf.substring(10, 11))) {
    document.getElementById("cpf-error").style.display = "block";
    return false;
  }

  document.getElementById("cpf-error").style.display = "none";
  return true;
}

function validarEmail(email) {
  var valido = false;
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(email)) {
    valido = true;
  }
  if (!valido) {
    document.getElementById("email-error").style.display = "block";
  } else {
    document.getElementById("email-error").style.display = "none";
  }
}

function validarIdade(dataNasc) {
  var dataAtual = new Date();
  var idade = dataAtual.getFullYear() - dataNasc.getFullYear();
  if (
    new Date(dataAtual.getFullYear(), dataNasc.getMonth(), dataNasc.getDate()) <
    dataAtual
  ) {
    idade--;
  }
  if (idade < 10 || idade > 110) {
    document.getElementById("idade-error").style.display = "block";
  } else {
    document.getElementById("idade-error").style.display = "none";
  }
}

/*
fonte: https://github.com/FlavioALeal/MascaraJS

Parametros da função mascara
A função máscara tem 3 parametros.

1º - o Modelo da máscara utilizado no input, como explicado acima, informe sempre a máscara entre aspas simples ou aspas duplas, parametro obrigatório
2º - não mude, sempre deve ser this, parametro obrigatório
3º - não mude, sempre deve ser event, parametro obrigatório
*/
function mascara(m, t, e) {
  var cursor = t.selectionStart;
  var texto = t.value;
  texto = texto.replace(/\D/g, "");
  var l = texto.length;
  var lm = m.length;
  if (window.event) {
    id = e.keyCode;
  } else if (e.which) {
    id = e.which;
  }
  cursorfixo = false;
  if (cursor < l) cursorfixo = true;
  var livre = false;
  if (id == 16 || id == 19 || (id >= 33 && id <= 40)) livre = true;
  ii = 0;
  mm = 0;
  if (!livre) {
    if (id != 8) {
      t.value = "";
      j = 0;
      for (i = 0; i < lm; i++) {
        if (m.substr(i, 1) == "#") {
          t.value += texto.substr(j, 1);
          j++;
        } else if (m.substr(i, 1) != "#") {
          t.value += m.substr(i, 1);
        }
        if (id != 8 && !cursorfixo) cursor++;
        if (j == l + 1) break;
      }
    }
  }
  if (cursorfixo && !livre) cursor--;
  t.setSelectionRange(cursor, cursor);
}

function validarUsername(user) {
  var div = document.getElementById("username-error");
  var username = user.split(" ");
  if (username.length > 1) {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}
