const canvas = document.getElementById("meuCanvas");
const ctx = canvas.getContext("2d");

// Classe Bola - com caracteristicas 
class Bola {
  constructor(x, y, dx, dy, raio, cor) {
    this.x = x; //eixo horizontal
    this.y = y; //eixo vertical 
    this.dx = dx; //velocidade no eixo x
    this.dy = dy; //velocidade no eixo y
    this.raio = raio; //tamanho do circulo
    this.cor = cor; 
  }

  // Desenha a bola
  desenharBola() {
    ctx.beginPath(); //começa a desenhar uma nova forma
    ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
    ctx.fillStyle = this.cor; //define a cor da bola
    ctx.fill(); //pinta a bola
  }

  // Faz a bola se mover e bater nas bordas
  moverBola() {
    if (this.x + this.raio > canvas.width || this.x - this.raio < 0) {
      this.dx = -this.dx;
      this.mudarColor(); 
      /*
      - verifica se a bola bateu na parede da direita ou esquerda.
      - Quando bate, a velocidade muda de sinal (this.dx = -this.dx), fazendo a bola ir para o outro lado. 
      - muda a cor da bola ao bater. */
    }
    if (this.y + this.raio > canvas.height || this.y - this.raio < 0) {
      this.dy = -this.dy;
      this.mudarColor(); 
      //verifica se a bola bateu no chão ou teto...
    }

    this.x += this.dx; //atualiza a posição da bola (movimento).
    this.y += this.dy;

    this.desenharBola(); //redesenha a bola na nova posição.
  }

  // Troca cor ao bater na parede - gera cor aleatoria 
  mudarColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    this.cor = `rgb(${r},${g},${b})`;
  }
}

// Criar várias bolas
let bolas = [];
for (let i = 0; i < 5; i++) {
  let raio = 30;
  let x = Math.random() * (canvas.width - raio * 2) + raio;
  let y = Math.random() * (canvas.height - raio * 2) + raio;
  let dx = (Math.random() - 0.5) * 6;
  let dy = (Math.random() - 0.5) * 6;
  let cor = "blue";
  bolas.push(new Bola(x, y, dx, dy, raio, cor));

  /*
  - Math.random() gera posições aleatórias no canvas
  - (Math.random() - 0.5) * 6 é a velocidade aleatória (pode ir para frente ou para trás)
  - bolas.push(...) adiciona cada nova bola no array
  */
}

// Função de animação
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
   // limpa a tela a cada frame

  bolas.forEach(bola => bola.moverBola());
  // atualiza todas as bolas (movimento + colisão)

  requestAnimationFrame(animar);
  // repete a função animar infinitamente (60x por segundo)
  
}
animar();
