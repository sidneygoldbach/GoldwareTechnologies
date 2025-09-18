# 🔒 Configuração SSL no Kamatera - Passo 4

## 📋 Como incluir o Passo 4: Configuração Nginx

O **Passo 4** da configuração SSL é a implementação da configuração do servidor Nginx no seu servidor Kamatera.

### 🚀 Implementação no Servidor Kamatera:

#### 1. **Acesse seu servidor Kamatera via SSH:**
```bash
ssh root@seu-servidor-kamatera.com
```

#### 2. **Copie o arquivo nginx.conf para o servidor:**
```bash
# Opção A: Via SCP (do seu computador local)
scp nginx.conf root@seu-servidor:/etc/nginx/sites-available/goldware

# Opção B: Criar diretamente no servidor
sudo nano /etc/nginx/sites-available/goldware
# Cole o conteúdo do arquivo nginx.conf
```

#### 3. **Ative a configuração:**
```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/goldware /etc/nginx/sites-enabled/

# Remover configuração padrão (se necessário)
sudo rm /etc/nginx/sites-enabled/default
```

#### 4. **Criar diretório do site:**
```bash
sudo mkdir -p /var/www/goldware-technologies
sudo chown -R www-data:www-data /var/www/goldware-technologies
```

#### 5. **Fazer upload dos arquivos do site:**
```bash
# Via SCP (do seu computador local)
scp -r * root@seu-servidor:/var/www/goldware-technologies/

# Ajustar permissões
sudo chown -R www-data:www-data /var/www/goldware-technologies
sudo chmod -R 755 /var/www/goldware-technologies
```

#### 6. **Testar e aplicar configuração:**
```bash
# Testar configuração
sudo nginx -t

# Se OK, recarregar nginx
sudo systemctl reload nginx

# Verificar status
sudo systemctl status nginx
```

### 🔧 Sequência Completa de Comandos:

```bash
# 1. Parar nginx temporariamente
sudo systemctl stop nginx

# 2. Gerar certificado SSL para ambos os domínios
sudo certbot certonly --standalone -d relation.goldbach.com.br -d 1.goldbach.com.br

# 3. Copiar configuração nginx
sudo cp nginx.conf /etc/nginx/sites-available/goldware

# 4. Ativar site
sudo ln -s /etc/nginx/sites-available/goldware /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# 5. Criar diretório e fazer upload dos arquivos
sudo mkdir -p /var/www/goldware-technologies
# Upload dos arquivos do projeto aqui

# 6. Ajustar permissões
sudo chown -R www-data:www-data /var/www/goldware-technologies
sudo chmod -R 755 /var/www/goldware-technologies

# 7. Testar e iniciar nginx
sudo nginx -t
sudo systemctl start nginx
sudo systemctl enable nginx
```

### ✅ Verificação:

```bash
# Verificar certificados
sudo certbot certificates

# Testar domínios
curl -I https://relation.goldbach.com.br
curl -I https://1.goldbach.com.br

# Verificar logs
sudo tail -f /var/log/nginx/goldware_access.log
sudo tail -f /var/log/nginx/goldware_error.log
```

### 📝 Notas Importantes:

1. **DNS**: Certifique-se que ambos os domínios apontam para o IP do seu servidor Kamatera
2. **Firewall**: Libere as portas 80 e 443 no firewall
3. **Renovação**: O Let's Encrypt renova automaticamente a cada 90 dias
4. **Backup**: Sempre faça backup da configuração antes de alterações

### 🔄 Renovação Automática:

```bash
# Adicionar ao crontab para renovação automática
sudo crontab -e

# Adicionar linha:
0 12 * * * /usr/bin/certbot renew --quiet
```

Este é o **Passo 4** completo para implementar a configuração SSL no seu servidor Kamatera!