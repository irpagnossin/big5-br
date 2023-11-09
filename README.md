# Big5 em Português brasileiro

Instrumento de avaliação de traços de personalidade conforme o modelo _Big Five_ (Big5) adaptado para o Português brasileiro por Josemberg Moura de Andrade: [aqui](https://repositorio.unb.br/handle/10482/1751?locale=en).

## Instalação

1. Faça o _upload_ do arquivo [inventory.csv](./inventory.csv) para o seu Google Drive e abra-o como uma planilha do Google.
1. No menu "Extensions", opte por "Apps Script".
1. Na nova aba que foi aberta, cole o conteúdo do arquivo [create_form.js](./create_form.js), **substituindo** o código existente. Esse conteúdo compõe o arquivo `Code.gs`, que aparece na seção "Files" do editor de script.
1. Clique em "+", ao lado de "Files", para adicionar um arquivo HTML, nomeando-o `feedback_template.html`.
1. Copie e cole o conteúdo do arquivo [feedback_template](./feedback_template.html), **substituindo** o código existente, e salve-o.
3. Execute manualmente a função `create_inventory()` desse script (pressione o botão "run", no menu no topo da área de edição). Isso gerará o formulário de pesquisa com nome `IGFP-5-xxxx`, onde `xxxx` é um código.
3. Abra o menu de configurações, no canto superior direito da tela, e escolha o _Script editor_.
4. Na janela do editor, vá até a seção "Files", à esquerda, e clique no botão "+" para adicionar um arquivo de _Script_. Copie para ele o conteúdo do arquivo [form_script](./form_script.js).
5. Configure os parâmetros conforme a necessidade:
    - `INVENTORY_SPREADSHEET_ID`: ID da planilha criada no primeiro passo (veja [abaixo](#id-da-planilha) como encontrá-lo).
    - `DEFAULT_RECIPIENTS`: emails para onde enviar os resultados, além do respondente. Tipicamente, para as pessoas que estão acompanhando a pesquisa.
    - `SEND_FEEDBACK_TO_RESPONDENT`: indica se é para enviar o resultado para o respondente imediatamente. O remetente será o dono do Google Forms. Ou seja, se você criou o Google Forms com a conta `eu@gmail.com`, esse será o remetente do email de resultado.
6. Adicione mais um arquivo; dessa vez, um HTML, e copie nele o conteúdo do arquivo [feedback_template](./feedback_template.html) (edite-o conforme a necessidade antes disso, se quiser).
6. Execute manualmente a função `createTrigger`.

Pronto. Agora, basta responder o formulário para obter uma avaliação do Big5 conforme o IGFP-5.


## ID da planilha

O ID da planilha está contido no endereço dela, no navegador (URL):
```
https://docs.google.com/spreadsheets/d/ID/edit
```

Por exemplo, o ID da planilha abaixo é `1nMrDW7f8ufrLhnSH6uPEO_dMl79DN8GD0kZcOHu_yCg`:
```
https://docs.google.com/spreadsheets/d/1nMrDW7f8ufrLhnSH6uPEO_dMl79DN8GD0kZcOHu_yCg/edit#gid=0
```

## Licença

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
