const canvas = document.getElementById('canvas'); // Canvas para desenho
 const ctx = canvas.getContext('2d'); // Contexto 2D do canvas
 const statusEl = document.getElementById('status'); // Elemento para mostrar status
 const charInput = document.getElementById('charInput'); // Campo de entrada para o caractere
 const contextInput = document.getElementById('contextInput'); // Campo de entrada para o contexto
 const themeToggle = document.getElementById('themeToggle'); // Botão para alternar tema
 
 let isDrawing = false;
 let lastX = 0;
 let lastY = 0;
 
 // Configuração inicial do canvas
 function initCanvas() {
   ctx.fillStyle = getComputedStyle(document.documentElement)
     .getPropertyValue('--surface');
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   ctx.strokeStyle = getComputedStyle(document.documentElement)
     .getPropertyValue('--primary');
   ctx.lineWidth = 8;
   ctx.lineCap = 'round';
   ctx.lineJoin = 'round';
 }

 canvas.addEventListener('mousedown', startDrawing); // Inicia o desenho
 canvas.addEventListener('mousemove', draw); // Desenha no canvas
 canvas.addEventListener('mouseup', stopDrawing); // Para o desenho
 canvas.addEventListener('mouseout', stopDrawing); // Para o desenho ao sair do canvas
 
 function startDrawing(e) { // Inicia o desenho
   isDrawing = true; // Ativa o modo de desenho 
   [lastX, lastY] = [e.offsetX, e.offsetY]; // Captura a posição inicial do mouse
 }
 
 function draw(e) {
   if (!isDrawing) return; // Se não estiver desenhando, não faz nada
   
   ctx.beginPath(); // Inicia um novo caminho
   ctx.moveTo(lastX, lastY); // Move o cursor para a última posição
   ctx.lineTo(e.offsetX, e.offsetY); // Desenha uma linha até a nova posição do mouse
   ctx.stroke(); // Aplica o traço
   [lastX, lastY] = [e.offsetX, e.offsetY]; // Atualiza a última posição
 }
 
 function stopDrawing() { // Para o desenho
   isDrawing = false;
 }
 
 function limpar() { // Limpa o canvas
   initCanvas();
   showStatus("Canvas limpo", "info");
 }

  async function salvar() { // Salva o símbolo desenhado
    try {
        const char = charInput.value.trim();
        const contexto = contextInput.value.trim();

        if (!char) {
            showStatus("Por favor, insira um caractere para associar", "error");
            return;
        }

        if (!contexto) {
            showStatus("Por favor, insira um contexto para associar", "error");
            return;
        }

        // Primeiro verifica se já existe a combinação char+contexto
        const checkResponse = await fetch('http://localhost:5000/check_symbols', {
            method: 'POST',
            body: JSON.stringify({ 
                char: char, // Mantém o case sensitive
                contexto: contexto 
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!checkResponse.ok) {
            throw new Error("Erro ao verificar símbolo existente.");
        }

        const checkData = await checkResponse.json();
        
        if (checkData.exists) {
            throw new Error(`Já existe o caractere "${checkData.existingChar}" para o contexto "${checkData.existingContexto}".`);
        }

        // Se não existir, procede com o salvamento
        const img = canvas.toDataURL('image/png');
        const response = await fetch('http://localhost:5000/save_symbol', {
            method: 'POST',
            body: JSON.stringify({ image: img, char, contexto }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error("Erro ao salvar símbolo.");
        }

        const data = await response.json();
        showStatus(data.mensagem || "Símbolo salvo com sucesso!", "success");
        limpar();
        charInput.value = "";
        contextInput.value = "";

    } catch (error) {
        showStatus(error.message || "Erro inesperado.", "error");
    }
  }

 function showStatus(message, type = "") { // Mostra mensagens de status
   statusEl.textContent = message;
   statusEl.className = type;
   
   // Remove a mensagem após 10 segundos
   if (type) {
     setTimeout(() => {
       statusEl.className = "";
       statusEl.textContent = "Desenhe um símbolo acima e preencha os campos";
     }, 10000);
   }
 }
 
 // Tema escuro/claro
 themeToggle.addEventListener('click', () => {
   document.body.dataset.theme = 
     document.body.dataset.theme === "dark" ? "light" : "dark";
   
   // Atualiza o ícone
   const icon = themeToggle.querySelector('i');
   icon.className = document.body.dataset.theme === "dark" 
     ? "fas fa-sun" 
     : "fas fa-moon";
   
   // Reconfigura o canvas para o novo tema
   initCanvas();
});
 
 // Verifica preferência de tema do sistema
 if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
   document.body.dataset.theme = "dark";
   themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
 }
 
 // Inicializa o canvas
 initCanvas();