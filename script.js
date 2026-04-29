function login() {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("senha").value;
    const erro = document.getElementById("erro");

    
    if (user === "" || pass === "") {
        erro.innerText = "Digo... você esqueceu de preencher os campos!";
        erro.classList.add("text-danger");
        return;
    }

    
    if (user === "admin" && pass === "1234") {
        
        localStorage.setItem("usuarioAtivo", user);
        window.location.href = "home.html";
    } else {
        erro.innerText = "Tinha que ser o Chaves de novo! Usuário ou senha incorretos.";
        erro.classList.add("text-warning");
    }
}


window.onload = function () {
    if (document.getElementById("listaComentarios")) {
        mostrarComentarios();
    }
}


function adicionarComentario() {
    const nomeInput = document.getElementById("nome");
    const textoInput = document.getElementById("comentario");

    if (nomeInput.value === "" || textoInput.value === "") {
        alert("Não te dou outra apenas porque... você esqueceu de preencher tudo!");
        return;
    }

    
    let listaLocal = JSON.parse(localStorage.getItem("comentariosVila")) || [];

    
    listaLocal.push({
        autor: nomeInput.value,
        mensagem: textoInput.value,
        data: new Date().toLocaleDateString('pt-BR')
    });

    
    localStorage.setItem("comentariosVila", JSON.stringify(listaLocal));

    
    nomeInput.value = "";
    textoInput.value = "";

    mostrarComentarios();
}


function mostrarComentarios() {
    const listaExibicao = document.getElementById("listaComentarios");
    if (!listaExibicao) return;

    listaExibicao.innerHTML = "";

    let comentarios = JSON.parse(localStorage.getItem("comentariosVila")) || [];

    
    if (comentarios.length === 0) {
        listaExibicao.innerHTML = "<p class='text-muted text-center'>A vila está silenciosa... Seja o primeiro a comentar!</p>";
        return;
    }

    comentarios.forEach(item => {
        listaExibicao.innerHTML += `
            <div class="card mb-3 border-success shadow-sm">
                <div class="card-body">
                    <h6 class="card-title fw-bold text-success text-capitalize">
                        <i class="bi bi-person-fill"></i> ${item.autor}
                    </h6>
                    <p class="card-text">"${item.mensagem}"</p>
                    <div class="text-end">
                        <small class="text-muted" style="font-size: 0.8rem;">Enviado em: ${item.data}</small>
                    </div>
                </div>
            </div>
        `;
    });
}