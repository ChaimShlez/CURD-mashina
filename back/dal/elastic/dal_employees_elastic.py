from back.utils.elastic_service import ElasticConn
from back.dal.config import *
import logging


class Queries:
    def __init__(self):
        self.con= ElasticConn().get_con()

        self.index_name=INDEX_EMPLOYEES
        self.__create_index()

    def __create_index(self):
        try:
            exists = self.con.indices.exists(index=self.index_name).body
            if not exists:
                self.con.indices.create(index=self.index_name, ignore=400)
                logging.info(f"Index '{self.index_name}' created successfully.")
            else:
                logging.info(f"Index '{self.index_name}' already exists.")
        except Exception as e:
            logging.error(f"Error creating index '{self.index_name}': {e}")

    def add_employee(self,body:dict):
        try:
            res= self.con.index(index=self.index_name, id=body["id"], document=body)

            self.con.indices.refresh(index=self.index_name)
            return res
        except Exception as e:
            logging.error(f"Error insert body: {e}")

    def get_employees(self):
        try:
            query = {
                "query": {
                    "match_all": {}
                }
            }

            response = self.con.search(index=self.index_name, body=query)
            return response

        except Exception as e:
            logging.error(f"Error fetching documents from {self.index_name}: {e}")
            return None

    def get_employee(self,employee_id):
        try:
            res=self.con.get(index=self.index_name,id=employee_id)
            return res['_source']


        except Exception as e:
            logging.error(f'Error get by id{employee_id}')


    def delete_employee(self,employee_id):
        try:
            self.con.delete(index=self.index_name,id=employee_id)
            self.con.indices.refresh(index=self.index_name)
        except Exception as e:
            logging.error(f'Deleted by {employee_id} filed')

    def update_employee(self,employee):

        try:
           employee_id=employee['id']
           employee_body=employee
           if self.is_exist(employee_id):
               response = self.con.update(
                   index=self.index_name,
                   id=employee_id,
                   doc=employee
               )
               self.con.indices.refresh(index=self.index_name)
               print(response.body)

               return response
        except Exception as a:
            logging.error(f'Updateed by {employee_id}')


    def is_exist(self, employee_id):
        try:

            return self.con.exists(index=self.index_name, id=employee_id)
        except Exception as e:
            logging.error(f"Exist check failed for {employee_id}: {e}")
            return False







