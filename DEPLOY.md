# Guia de Deploy - Jus IA Style Gen

## ✅ Deploy Concluído

O projeto está atualmente deployado no Vercel:

- **URL de Produção**: https://jus-ia-style-gen.vercel.app
- **Dashboard**: https://vercel.com/gabrielvazs-projects/jus-ia-writing-style-profile-gen

## 🚀 Como foi feito o Deploy

### 1. Preparação

#### Arquivo vercel.json
Criado com configurações otimizadas:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["gru1"]
}
```

**Configurações:**
- **regions**: `gru1` (São Paulo, Brasil) para melhor latência
- **framework**: Next.js auto-detectado
- **build**: Configuração padrão do Next.js

### 2. Variáveis de Ambiente

Adicionada via Vercel CLI:
```bash
vercel env add OPENROUTER_API_KEY production
```

**Variáveis configuradas:**
- `OPENROUTER_API_KEY`: Chave de API do OpenRouter

### 3. Deploy

Executado via Vercel CLI:
```bash
vercel --prod --yes
```

## 📊 Resultados do Build

### Build Successful ✅
```
✓ Compiled successfully in 15.1s
✓ Generating static pages (8/8) in 660.2ms
```

### Rotas Deployadas
- `○ /` - Página principal (Static)
- `○ /analyzing` - Tela de análise (Static)
- `○ /create` - Criação de perfil (Static)
- `○ /profile` - Visualização de perfil (Static)
- `ƒ /api/analyze-style` - API de análise (Dynamic)

### Métricas
- **Tempo de build**: ~40s
- **Arquivos estáticos**: 43 deployment files
- **Pacotes instalados**: 448 packages
- **Vulnerabilidades**: 0

## ⚠️ Avisos do Build

Durante o build, houve avisos sobre `@napi-rs/canvas` (usado pelo pdf-parse):
```
Warning: Cannot load "@napi-rs/canvas" package
Warning: Cannot polyfill `ImageData`, rendering may be broken
```

**Status**: ⚠️ **Não crítico**
- O pdf-parse funciona sem canvas
- Canvas é opcional para renderização de PDFs
- Extração de texto funciona normalmente

## 🔄 Novo Deploy

Para fazer um novo deploy:

### Via CLI
```bash
# Deploy para produção
vercel --prod

# Deploy para preview
vercel
```

### Via Git
O Vercel está configurado para auto-deploy:
- **Push para `main`**: Deploy automático para produção
- **Pull Requests**: Deploy de preview automático

## 🔧 Gerenciar Variáveis de Ambiente

### Adicionar nova variável
```bash
vercel env add VARIABLE_NAME production
```

### Listar variáveis
```bash
vercel env ls
```

### Fazer pull das variáveis localmente
```bash
vercel env pull .env.local
```

## 📍 URLs Importantes

### Produção
- **URL principal**: https://jus-ia-style-gen.vercel.app
- **Inspect**: https://vercel.com/gabrielvazs-projects/jus-ia-writing-style-profile-gen

### Preview
Cada pull request gera uma URL de preview única:
```
https://jus-ia-style-gen-{hash}.vercel.app
```

## 🛠️ Comandos Úteis

### Ver logs do último deployment
```bash
vercel logs
```

### Inspecionar deployment específico
```bash
vercel inspect [deployment-url] --logs
```

### Redeploy
```bash
vercel redeploy [deployment-url]
```

### Remover deployment
```bash
vercel remove [deployment-url]
```

## 🔍 Troubleshooting

### Build Failing

1. **Verificar logs**:
```bash
vercel logs --follow
```

2. **Build local**:
```bash
npm run build
```

3. **Limpar cache**:
```bash
vercel --force
```

### Variáveis de ambiente não funcionando

1. **Verificar variáveis**:
```bash
vercel env ls
```

2. **Redeploy após adicionar variável**:
```bash
vercel --prod
```

### 404 em rotas

- Verificar se a rota existe em `src/app/`
- Verificar build logs para erros
- Limpar cache do Vercel

## 📱 Domínio Customizado (Opcional)

Para adicionar domínio customizado:

1. **Via Dashboard**:
   - Acesse: https://vercel.com/gabrielvazs-projects/jus-ia-writing-style-profile-gen/settings/domains
   - Adicione o domínio desejado
   - Configure DNS conforme instruções

2. **Via CLI**:
```bash
vercel domains add seu-dominio.com
```

## 🔒 Segurança

### Variáveis de Ambiente
- ✅ Nunca commitar `.env.local`
- ✅ Usar Vercel Secrets para dados sensíveis
- ✅ Configurar apenas via CLI ou Dashboard

### API Routes
- ✅ Validação de entrada implementada
- ✅ CORS configurado via Next.js
- ✅ Rate limiting (considerar adicionar)

## 📈 Monitoramento

### Analytics (Vercel)
Habilitado automaticamente em:
https://vercel.com/gabrielvazs-projects/jus-ia-writing-style-profile-gen/analytics

### Métricas disponíveis:
- Page views
- Unique visitors
- Top pages
- Top referrers
- Device breakdown

## 🎯 Performance

### Core Web Vitals
Monitorar em:
https://vercel.com/gabrielvazs-projects/jus-ia-writing-style-profile-gen/speed-insights

### Otimizações implementadas:
- ✅ Next.js Image Optimization
- ✅ Static Generation onde possível
- ✅ React Compiler habilitado
- ✅ Turbopack no build

## 📝 Checklist de Deploy

- [x] Código commitado no GitHub
- [x] Variáveis de ambiente configuradas
- [x] Build bem-sucedido
- [x] Deploy em produção
- [x] Testes manuais realizados
- [x] URLs verificadas
- [x] Documentação atualizada

## 🆘 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: https://github.com/gabrielvaz/jus-ia-style-gen/issues

---

**Última atualização**: 2025-01-28
**Status**: ✅ Online
