function login() {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("senha").value;
    const erro = document.getElementById("erro");

    if (user.trim() === "" || pass.trim() === "") {
        erro.innerText = "Digo... você esqueceu de preencher os campos!";
        erro.className = "text-danger fw-bold animate__animated animate__shakeX";
        return;
    }

    if (user === "chaves" && pass === "elchavodel8") {
        localStorage.setItem("usuarioLogado", user);
        window.location.href = "home.html";
    } else {
        erro.innerText = "Tinha que ser o Chaves de novo! Usuário ou senha incorretos.";
        erro.className = "text-warning fw-bold";
        document.getElementById("senha").value = "";
    }
}

window.onload = function () {
    if (document.getElementById("listaComentarios")) {
        mostrarComentarios();
    }
    console.log("A Vila do Chaves está pronta!");
};

function adicionarComentario() {
    const nomeInput = document.getElementById("nome");
    const textoInput = document.getElementById("comentario");

    if (nomeInput.value.trim() === "" || textoInput.value.trim() === "") {
        alert("Não te dou outra apenas porque... você esqueceu de escrever algo!");
        return;
    }

    let comentariosDB = JSON.parse(localStorage.getItem("comentariosVila")) || [];

    const novoPost = {
        nome: nomeInput.value,
        mensagem: textoInput.value,
        data: new Date().toLocaleDateString('pt-BR')
    };

    comentariosDB.push(novoPost);
    localStorage.setItem("comentariosVila", JSON.stringify(comentariosDB));

    nomeInput.value = "";
    textoInput.value = "";

    mostrarComentarios();
}

function mostrarComentarios() {
    const mural = document.getElementById("listaComentarios");
    if (!mural) return; 

    mural.innerHTML = ""; 

    const dados = JSON.parse(localStorage.getItem("comentariosVila")) || [];

    if (dados.length === 0) {
        mural.innerHTML = "<p class='text-center text-muted'>Ainda não há fofocas na vila... Escreva algo!</p>";
        return;
    }

    dados.reverse().forEach(post => {
        mural.innerHTML += `
            <div class="card p-3 mb-3 shadow-sm border-start border-success border-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <strong class="text-success"><i class="bi bi-person-circle"></i> ${post.nome}</strong>
                    <span class="badge bg-light text-dark font-monospace" style="font-size: 0.7rem;">${post.data}</span>
                </div>
                <p class="mb-0 text-secondary">${post.mensagem}</p>
            </div>
        `;
    });
}