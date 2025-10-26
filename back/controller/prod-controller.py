import logging

from flask import Flask, request, jsonify
from back.dal.queries import Queries
from pydantic import BaseModel

app = Flask(__name__)
q = Queries()


class EmployeeModel(BaseModel):
    id: int
    name: str
    role: str
    salary: float
    isBonus: bool


@app.route("/addEmployee", methods=["POST"])
def add_employee_route():
    body = request.get_json()
    q.add_employee(body)
    return "OK"


@app.route("/getEmployees", methods=["GET"])
def get_employees_route():
    employees = []

    res = q.get_employees()
    for hit in res['hits']['hits']:
        employees.append(hit['_source'])
    return employees



@app.route("/deleteEmployee/<employeeId>", methods=["DELETE"])
def delete_employee_route(employeeId):
    try:
        q.delete_employee(employeeId)
        return jsonify({"status": "success", "deleted_id": employeeId})
    except Exception as e:
        logging.error(f"Failed to delete employee {employeeId}: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500



@app.route("/updateEmployee", methods=["UPDATE"])
def update_employee_route():
    try:
        body = request.get_json()
        # q.update_employee(body)

        return jsonify({"status": "success", "deleted_id": body['id']})
    except Exception as e:
        logging.error(f"Failed to delete employee {body['id']}: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
