from back.dal.elastic.dal_employees_elastic import Queries
from flask import jsonify


class EmployeeLogic:

    def __init__(self):
        self.queries = Queries()



    def inset_employee(self,employee):
        if not self.queries.is_exist(employee['id']):
            res=self.queries.add_employee(employee)
            return jsonify({"status": "success", "message": f"add employee {res['_id']} successes"})

        else:
             return jsonify({"status": "error", "message": "employee exist"})

