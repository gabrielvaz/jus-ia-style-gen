# Como Funciona a URL do Jus IA

## Formato da URL

A URL do Jus IA permite criar uma nova conversa com um prompt pré-preenchido através do parâmetro `q`:

```
https://ia.jusbrasil.com.br/conversa?q={PROMPT_URL_ENCODED}
```

## Exemplo Real Analisado

### URL Original
```
https://ia.jusbrasil.com.br/conversa?q=Oi,+Jus+IA!%0A%0AAnalise+detalhadamente+os+autos+do+processo+a+partir+dos+documentos+da+conversa,+com+foco+em+uma+due+diligence+jur%C3%ADdica.+%0A%0AAvalie:%0A%0A(i)+Informa%C3%A7%C3%B5es+gerais:+status,+valor+da+causa,+partes+e+representa%C3%A7%C3%B5es%3B%0A(ii)+Teses+jur%C3%ADdicas:+fundamentos+legais,+for%C3%A7a+dos+argumentos,+jurisprud%C3%AAncia+relacionada%3B%0A(iii)+Hist%C3%B3rico+processual:+decis%C3%B5es+importantes,+recursos+pendentes,+fase+atual%3B%0A(iv)+Provas:+tipo,+qualidade+e+validade+das+provas+apresentadas%3B%0A(v)+Riscos:+probabilidade+de+perda,+passivos+financeiros,+impactos+reputacionais+ou+estrat%C3%A9gicos%3B%0A(iv)+Conformidades+formais:+eventuais+nulidades,+v%C3%ADcios+ou+prazos+perdidos%3B%0A%0ARecomenda%C3%A7%C3%B5es+estrat%C3%A9gicas:+chance+de+%C3%AAxito,+oportunidade+de+acordo+ou+medidas+urgentes.%0AForne%C3%A7a+um+parecer+claro,+estruturado+e+objetivo,+destacando+os+principais+pontos+de+aten%C3%A7%C3%A3o+e+riscos+jur%C3%ADdicos+associados.
```

### Prompt Decodificado

```
Oi, Jus IA!

Analise detalhadamente os autos do processo a partir dos documentos da conversa, com foco em uma due diligence jurídica.

Avalie:

(i) Informações gerais: status, valor da causa, partes e representações;
(ii) Teses jurídicas: fundamentos legais, força dos argumentos, jurisprudência relacionada;
(iii) Histórico processual: decisões importantes, recursos pendentes, fase atual;
(iv) Provas: tipo, qualidade e validade das provas apresentadas;
(v) Riscos: probabilidade de perda, passivos financeiros, impactos reputacionais ou estratégicos;
(iv) Conformidades formais: eventuais nulidades, vícios ou prazos perdidos;

Recomendações estratégicas: chance de êxito, oportunidade de acordo ou medidas urgentes.
Forneça um parecer claro, estruturado e objetivo, destacando os principais pontos de atenção e riscos jurídicos associados.
```

## Regras de Codificação

### Mapeamento de Caracteres

| Texto Original | Codificação | Descrição |
|----------------|-------------|-----------|
| `espaço` | `+` | Espaços são convertidos em `+` |
| `quebra de linha` | `%0A` | Cada quebra de linha vira `%0A` |
| `,` | `,` | Vírgulas não precisam ser codificadas |
| `:` | `:` | Dois pontos não precisam ser codificados |
| `;` | `%3B` | Ponto e vírgula é codificado |
| `(` | `(` | Parênteses de abertura não precisa |
| `)` | `)` | Parênteses de fechamento não precisa |
| `ç` | `%C3%A7` | Cedilha é codificado em UTF-8 |
| `ã` | `%C3%A3` | Til sobre 'a' |
| `õ` | `%C3%B5` | Til sobre 'o' |
| `é` | `%C3%A9` | Acento agudo sobre 'e' |
| `ê` | `%C3%AA` | Acento circunflexo sobre 'e' |
| `á` | `%C3%A1` | Acento agudo sobre 'a' |
| `ó` | `%C3%B3` | Acento agudo sobre 'o' |
| `í` | `%C3%AD` | Acento agudo sobre 'i' |
| `ú` | `%C3%BA` | Acento agudo sobre 'u' |

### Análise do Exemplo

Vamos analisar partes específicas da URL:

**Exemplo 1: "Oi, Jus IA!"**
```
Texto: Oi, Jus IA!
URL:   Oi,+Jus+IA!
```
- Espaços viram `+`
- Vírgula permanece `,`
- Exclamação permanece `!`

**Exemplo 2: "jurídica."**
```
Texto: jurídica.
URL:   jur%C3%ADdica.
```
- `í` vira `%C3%AD` (UTF-8 encoding)
- Ponto permanece `.`

**Exemplo 3: "Informações gerais: status"**
```
Texto: Informações gerais: status
URL:   Informa%C3%A7%C3%B5es+gerais:+status
```
- `ç` vira `%C3%A7`
- `õ` vira `%C3%B5`
- Espaços viram `+`
- Dois pontos `:` permanece

**Exemplo 4: "representações;"**
```
Texto: representações;
URL:   representa%C3%A7%C3%B5es%3B
```
- `ç` vira `%C3%A7`
- `õ` vira `%C3%B5`
- `;` vira `%3B`

**Exemplo 5: Quebras de linha duplas**
```
Texto: [quebra][quebra]
URL:   %0A%0A
```
- Cada `\n` vira `%0A`
- Duas quebras consecutivas = `%0A%0A`

## Como Gerar a URL em JavaScript/TypeScript

### Método 1: Usando `encodeURIComponent` (Recomendado)

```typescript
function gerarURLJusIA(prompt: string): string {
  // encodeURIComponent já faz toda a codificação necessária
  const promptCodificado = encodeURIComponent(prompt);
  return `https://ia.jusbrasil.com.br/conversa?q=${promptCodificado}`;
}

// Exemplo de uso
const meuPrompt = `Oi, Jus IA!

Analise este contrato e identifique cláusulas abusivas.`;

const url = gerarURLJusIA(meuPrompt);
// Resultado: https://ia.jusbrasil.com.br/conversa?q=Oi%2C%20Jus%20IA!%0A%0AAnalise%20este%20contrato%20e%20identifique%20cl%C3%A1usulas%20abusivas.
```

### Método 2: Tratamento Manual (Não Recomendado)

```typescript
function gerarURLJusIAManual(prompt: string): string {
  let encoded = prompt
    .replace(/\n/g, '%0A')          // Quebras de linha
    .replace(/ /g, '+')             // Espaços
    .replace(/;/g, '%3B')           // Ponto e vírgula
    .replace(/ç/g, '%C3%A7')        // Cedilha
    .replace(/ã/g, '%C3%A3')        // Til a
    .replace(/õ/g, '%C3%B5')        // Til o
    // ... muitos outros caracteres
    ;

  return `https://ia.jusbrasil.com.br/conversa?q=${encoded}`;
}
```

**⚠️ Importante:** Use sempre `encodeURIComponent` do JavaScript. É mais seguro e completo.

## Diferenças entre `encodeURIComponent` e codificação manual

### encodeURIComponent
```javascript
const texto = "Olá, mundo!";
encodeURIComponent(texto);
// Resultado: "Ol%C3%A1%2C%20mundo!"
```
- Espaços viram `%20` (não `+`)
- Vírgula vira `%2C`
- Mais verboso, mas 100% correto

### Codificação "estilo URL de formulário"
```
"Olá, mundo!" → "Ol%C3%A1,+mundo!"
```
- Espaços viram `+`
- Vírgula permanece `,`
- Mais compacto

**Ambos funcionam no Jus IA!** Mas use `encodeURIComponent` para garantir compatibilidade.

## Implementação no Sistema de Perfil de Estilo

### Cenário: Botão "Testar no Jus IA"

```typescript
// Componente React
interface TestJusIAButtonProps {
  systemPrompt: string;
}

function TestJusIAButton({ systemPrompt }: TestJusIAButtonProps) {
  const abrirNoJusIA = () => {
    // Codifica o system prompt
    const promptCodificado = encodeURIComponent(systemPrompt);

    // Monta a URL
    const urlJusIA = `https://ia.jusbrasil.com.br/conversa?q=${promptCodificado}`;

    // Abre em nova aba
    window.open(urlJusIA, '_blank', 'noopener,noreferrer');
  };

  return (
    <button onClick={abrirNoJusIA}>
      Testar no Jus IA
    </button>
  );
}
```

### Cenário: System Prompt Gerado

Quando o sistema gera um prompt como:

```
Você é um assistente jurídico especializado em escrever no estilo do Dr. João Silva.

Características do estilo:
- Tom formal e técnico (formalidade: 85/100)
- Uso frequente de citações jurisprudenciais
- Frases longas e bem estruturadas
- Densidade técnica elevada

Regras fixas:
1. Sempre cite artigos de lei quando aplicável
2. Mantenha o tom formal mas acessível
3. Use a estrutura: Fatos → Fundamentação → Pedido

Nunca contradiga este estilo base, a menos que explicitamente solicitado.
```

Será convertido para:

```
https://ia.jusbrasil.com.br/conversa?q=Voc%C3%AA%20%C3%A9%20um%20assistente%20jur%C3%ADdico%20especializado%20em%20escrever%20no%20estilo%20do%20Dr.%20Jo%C3%A3o%20Silva.%0A%0ACaracter%C3%ADsticas%20do%20estilo%3A%0A-%20Tom%20formal%20e%20t%C3%A9cnico%20(formalidade%3A%2085%2F100)%0A-%20Uso%20frequente%20de%20cita%C3%A7%C3%B5es%20jurisprudenciais%0A-%20Frases%20longas%20e%20bem%20estruturadas%0A-%20Densidade%20t%C3%A9cnica%20elevada%0A%0ARegras%20fixas%3A%0A1.%20Sempre%20cite%20artigos%20de%20lei%20quando%20aplic%C3%A1vel%0A2.%20Mantenha%20o%20tom%20formal%20mas%20acess%C3%ADvel%0A3.%20Use%20a%20estrutura%3A%20Fatos%20%E2%86%92%20Fundamenta%C3%A7%C3%A3o%20%E2%86%92%20Pedido%0A%0ANunca%20contradiga%20este%20estilo%20base%2C%20a%20menos%20que%20explicitamente%20solicitado.
```

## Checklist de Implementação

Para integrar corretamente com o Jus IA:

- [ ] Usar `encodeURIComponent()` para codificar o prompt
- [ ] Construir URL no formato: `https://ia.jusbrasil.com.br/conversa?q={prompt_codificado}`
- [ ] Abrir em nova aba usando `window.open(url, '_blank', 'noopener,noreferrer')`
- [ ] Adicionar botão visível na tela de resultados
- [ ] Testar com prompts de diferentes tamanhos
- [ ] Verificar se caracteres especiais em português funcionam
- [ ] Garantir que quebras de linha são preservadas
- [ ] Adicionar tratamento de erro caso o prompt seja vazio

## Limitações e Considerações

### Tamanho da URL

- **Limite teórico:** ~2.000 caracteres (IE antigo)
- **Limite prático:** ~8.000 caracteres (navegadores modernos)
- **Prompts típicos:** 500-2.000 caracteres

Se o prompt for muito longo (>2.000 chars), considere avisar o usuário.

```typescript
function abrirNoJusIA(systemPrompt: string) {
  const promptCodificado = encodeURIComponent(systemPrompt);
  const urlJusIA = `https://ia.jusbrasil.com.br/conversa?q=${promptCodificado}`;

  // Aviso se a URL for muito longa
  if (urlJusIA.length > 2000) {
    console.warn('⚠️ URL pode ser muito longa para alguns navegadores');
  }

  window.open(urlJusIA, '_blank', 'noopener,noreferrer');
}
```

### Segurança

- Use sempre `noopener,noreferrer` ao abrir em nova aba
- Nunca inclua informações sensíveis na URL
- O prompt é visível no histórico do navegador

## Testes Recomendados

1. **Prompt simples em português**
   ```
   Texto: "Olá, analise este contrato."
   ```

2. **Prompt com acentuação**
   ```
   Texto: "Análise técnica de cláusulas contratuais."
   ```

3. **Prompt com quebras de linha**
   ```
   Texto: "Primeira linha\nSegunda linha\n\nQuarta linha"
   ```

4. **Prompt com caracteres especiais**
   ```
   Texto: "Itens: (i) primeiro; (ii) segundo; (iii) terceiro."
   ```

5. **Prompt longo (>1000 caracteres)**
   - Verificar se funciona em diferentes navegadores

## Resumo para LLMs

Quando precisar gerar uma URL do Jus IA com prompt pré-preenchido:

1. Use `encodeURIComponent(prompt)` em JavaScript/TypeScript
2. Construa: `https://ia.jusbrasil.com.br/conversa?q=${promptCodificado}`
3. Abra com: `window.open(url, '_blank', 'noopener,noreferrer')`

**Exemplo completo:**
```typescript
const prompt = "Seu prompt aqui";
const url = `https://ia.jusbrasil.com.br/conversa?q=${encodeURIComponent(prompt)}`;
window.open(url, '_blank', 'noopener,noreferrer');
```

Isso é tudo que você precisa saber para integrar com o Jus IA! 🚀
