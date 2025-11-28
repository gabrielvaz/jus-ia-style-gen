# Integração com Jus IA - Documentação Técnica

## Visão Geral

Esta documentação descreve como integrar o sistema de perfil de estilo de escrita com o Jus IA, permitindo que usuários testem seus prompts personalizados diretamente na plataforma.

## Formato da URL

### Estrutura Base

```
https://ia.jusbrasil.com.br/conversa?q={PROMPT_CODIFICADO}
```

### Componentes

- **Base URL:** `https://ia.jusbrasil.com.br/conversa`
- **Query Parameter:** `q` (obrigatório)
- **Valor:** Prompt completo URL-encoded

## Codificação de URL (URL Encoding)

### Regras de Codificação

| Caractere | Codificação | Observação |
|-----------|-------------|------------|
| Espaço | `+` ou `%20` | Ambos funcionam |
| Quebra de linha | `%0A` | Essencial para formatação |
| `ç` | `%C3%A7` | |
| `ã` | `%C3%A3` | |
| `á` | `%C3%A1` | |
| `é` | `%C3%A9` | |
| `ê` | `%C3%AA` | |
| `í` | `%C3%AD` | |
| `ó` | `%C3%B3` | |
| `õ` | `%C3%B5` | |
| `ú` | `%C3%BA` | |
| `:` | `%3A` | |
| `;` | `%3B` | |
| `(` | `%28` | |
| `)` | `%29` | |
| `?` | `%3F` | |
| `=` | `%3D` | |

### Função JavaScript para Codificação

```typescript
/**
 * Codifica um prompt para ser usado na URL do Jus IA
 * @param prompt - O texto do prompt a ser codificado
 * @returns URL completa do Jus IA com o prompt codificado
 */
function encodePromptForJusIA(prompt: string): string {
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://ia.jusbrasil.com.br/conversa?q=${encodedPrompt}`;
}
```

## Exemplo Prático

### Prompt Original

```
Oi, Jus IA!

Analise detalhadamente os autos do processo a partir dos documentos da conversa, com foco em uma due diligence jurídica.

Avalie:

(i) Informações gerais: status, valor da causa, partes e representações;
(ii) Teses jurídicas: fundamentos legais, força dos argumentos, jurisprudência relacionada;
```

### URL Resultante

```
https://ia.jusbrasil.com.br/conversa?q=Oi%2C+Jus+IA!%0A%0AAnalise+detalhadamente+os+autos+do+processo+a+partir+dos+documentos+da+conversa%2C+com+foco+em+uma+due+diligence+jur%C3%ADdica.%0A%0AAvalie%3A%0A%0A(i)+Informa%C3%A7%C3%B5es+gerais%3A+status%2C+valor+da+causa%2C+partes+e+representa%C3%A7%C3%B5es%3B%0A(ii)+Teses+jur%C3%ADdicas%3A+fundamentos+legais%2C+for%C3%A7a+dos+argumentos%2C+jurisprud%C3%AAncia+relacionada%3B
```

## Implementação no Sistema de Perfil

### Componente React (TypeScript)

```typescript
import { Button } from '@/components/ui/Button';

interface JusIAButtonProps {
  systemPrompt: string;
}

export function JusIAButton({ systemPrompt }: JusIAButtonProps) {
  const handleSendToJusIA = () => {
    // Codifica o prompt
    const encodedPrompt = encodeURIComponent(systemPrompt);

    // Constrói a URL
    const jusIAUrl = `https://ia.jusbrasil.com.br/conversa?q=${encodedPrompt}`;

    // Abre em nova aba
    window.open(jusIAUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      onClick={handleSendToJusIA}
      className="bg-primary hover:bg-primary-dark text-white"
    >
      Testar no Jus IA
    </Button>
  );
}
```

### Com Tratamento de Erros

```typescript
export function JusIAButton({ systemPrompt }: JusIAButtonProps) {
  const handleSendToJusIA = () => {
    try {
      if (!systemPrompt || systemPrompt.trim().length === 0) {
        console.error('System prompt vazio');
        return;
      }

      const encodedPrompt = encodeURIComponent(systemPrompt);
      const jusIAUrl = `https://ia.jusbrasil.com.br/conversa?q=${encodedPrompt}`;

      // Verifica se a URL não está muito longa (limite ~2000 caracteres para compatibilidade)
      if (jusIAUrl.length > 2000) {
        console.warn('URL muito longa, pode haver problemas em alguns navegadores');
      }

      window.open(jusIAUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Erro ao abrir Jus IA:', error);
    }
  };

  return (
    <Button onClick={handleSendToJusIA}>
      Testar no Jus IA
    </Button>
  );
}
```

## Fluxo de Usuário Completo

1. **Usuário completa análise de estilo**
   - Upload de documentos
   - Processamento via LLM
   - Geração do system prompt personalizado

2. **Visualização dos resultados**
   - Resumo do estilo de escrita
   - Gráficos de perfil
   - System prompt gerado (em textarea)

3. **Integração com Jus IA**
   - Botão "Testar no Jus IA" visível
   - Ao clicar:
     - System prompt é codificado
     - Nova aba abre no Jus IA
     - Prompt aparece pré-preenchido
     - Usuário pode começar a usar imediatamente

## Considerações de UX

### Posicionamento do Botão

Sugestões de onde colocar o botão "Testar no Jus IA":

1. **Ao lado do botão "Copiar"** do system prompt
2. **Logo abaixo** da textarea do system prompt
3. **Em um card destacado** com call-to-action

### Texto do Botão

Opções de texto:
- ✅ "Testar no Jus IA" (recomendado)
- "Usar este prompt no Jus IA"
- "Experimentar agora no Jus IA"
- "Abrir no Jus IA"

### Feedback Visual

- Usar cor primária do Farol (`#007A5F`)
- Ícone de link externo ou seta
- Tooltip explicativo: "Abre uma nova conversa no Jus IA com seu prompt personalizado"

## Limitações Técnicas

### Comprimento da URL

- Limite teórico: ~2000 caracteres (navegadores antigos)
- Limite prático: ~8000 caracteres (navegadores modernos)
- System prompts típicos: 500-2000 caracteres
- **Recomendação:** Monitorar o comprimento e avisar se ultrapassar 2000 caracteres

### Alternativa para Prompts Longos

Se o prompt for muito longo, considerar:

1. **Opção 1:** Copiar para clipboard + instruções
2. **Opção 2:** Encurtar o prompt automaticamente
3. **Opção 3:** Armazenar no backend e usar URL curta

## Exemplo de Implementação Completa

```typescript
// src/components/JusIAIntegration.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ExternalLink, Copy, Check } from 'lucide-react';

interface JusIAIntegrationProps {
  systemPrompt: string;
}

export function JusIAIntegration({ systemPrompt }: JusIAIntegrationProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenJusIA = () => {
    const encodedPrompt = encodeURIComponent(systemPrompt);
    const jusIAUrl = `https://ia.jusbrasil.com.br/conversa?q=${encodedPrompt}`;
    window.open(jusIAUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Prompt de sistema para o Jus IA
        </h3>
        <p className="text-neutral-700 mb-4">
          Use este prompt para fazer o Jus IA escrever com o seu estilo
        </p>
      </div>

      <textarea
        readOnly
        value={systemPrompt}
        className="w-full h-48 p-4 border border-neutral-200 rounded-lg font-mono text-sm"
      />

      <div className="flex gap-3">
        <Button
          onClick={handleCopy}
          variant="secondary"
          className="flex items-center gap-2"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? 'Copiado!' : 'Copiar prompt'}
        </Button>

        <Button
          onClick={handleOpenJusIA}
          className="flex items-center gap-2 bg-primary text-white"
        >
          <ExternalLink size={18} />
          Testar no Jus IA
        </Button>
      </div>

      <p className="text-sm text-neutral-500">
        O botão acima abre uma nova conversa no Jus IA com seu prompt personalizado já configurado.
      </p>
    </div>
  );
}
```

## Testing

### Testes Manuais

1. Gerar um system prompt
2. Clicar em "Testar no Jus IA"
3. Verificar se nova aba abre
4. Verificar se prompt está pré-preenchido no Jus IA
5. Testar com prompts de diferentes tamanhos

### Testes de Edge Cases

- Prompt vazio
- Prompt muito longo (>2000 chars)
- Caracteres especiais variados
- Emojis (se aplicável)
- Múltiplas quebras de linha

## Próximos Passos

- [ ] Implementar componente `JusIAIntegration`
- [ ] Adicionar ao Screen 4 (Results)
- [ ] Adicionar analytics para rastrear uso
- [ ] Testar em diferentes navegadores
- [ ] Adicionar loading state durante abertura
