
O projeto para o frontend foi feito em ReactJS e o Backend/API com o Django + DRF.
O Projeto frontend está localizado em uma branch separada, branch `master`.

O projeto Django e React podem ser testados separadamente, desde que inicializados o `virtual enviroment` e server do Django, bem como o do React.

A consulta da lista dos endpoints pode ser feita em `http://127.0.0.1:8000/api/`

Para rodar este projeto baixe o os arquivos da branch 'main', e rode o comando 'npm run build' dentro do diretório 'frontend'.
Para rodar este projeto em conjunto com o Django, adicione o diretório 
'frontend' na raiz do projeto Django, ao diretório 'attendance_management/frontend', acesse o 
diretório 'frontend', rode o comando 'npm run build' e inicie o servidor Django 
com 'manage runserver'. A aplicação ficará disponível em `http://127.0.0.1:8000/`


```
OBS: todas as configurações e urls já estão feitas
```


Instruções para rodar este projeto em ambiente LINUX:
```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py makemigrations
python manage.py runserver
```


Instruções para rodar este projeto em ambiente WINDOWS:

```
python3 -m venv .venv OR py -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py makemigrations
python manage.py runserver

```