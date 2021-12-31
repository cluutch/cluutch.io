FROM python:3.10.1-buster

WORKDIR /opt
COPY requirements.py .
COPY get_strains_from_otreeba.py .
RUN pip3 install -r requirements.py

ENTRYPOINT ["python3", "get_strains_from_otreeba.py"]