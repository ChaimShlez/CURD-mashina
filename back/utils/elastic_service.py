import time
from codecs import replace_errors

from elasticsearch import Elasticsearch
from back.utils.config import *


class ElasticConn:
    def __init__(self):
        self.es: Elasticsearch= Elasticsearch(f'http://{ES_HOST}:9200')
        self.__check()


    def get_con(self):
        return self.es

    def __check(self):
        while True:
            try:
                print('info',self.es.info())
                if self.es.ping():
                    return "Elastic is ready"
            except ConnectionError:
                pass
            time.sleep(2)

if __name__ == "__main__":
    conn = ElasticConn()
    print(conn.get_con())
